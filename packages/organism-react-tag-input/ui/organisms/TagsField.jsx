import React, {PureComponent} from 'react';
import {Suggestion} from 'react-atomic-organism';
import {build, lazyInject, mixClass, List, Field} from 'react-atomic-molecule';
import dedup from 'array.dedup';
import get, {initMap} from 'get-object-value';
import callfunc from 'call-func';

import Tag from '../organisms/Tag';

const EXCEED_MAX_TAGS = 'exceed max tags';
const keys = Object.keys;

const groupingTags = ({tags, tagData, tagsLocator, tagLocator}) => {
  const group = {};
  const initGroup = initMap(group);
  const preTags = tagsLocator(tagData);
  if (tagData && !preTags.forEach) {
    console.error('tagsLocator not return array.');
    return null;
  } else {
    preTags.forEach(t => {
      const tag = tagLocator(t);
      if (tag) {
        initGroup(tag, {data: [], num: 0});
        group[tag].data.push(t);
      }
    });
  }
  const thisTags = tags != null ? tags : keys(group);
  thisTags.forEach(tag => {
    initGroup(tag, {data: [], num: 0});
    group[tag].num++;
  });
  return {tags: keys(group).filter(tag => group[tag].num !== 0), group};
};

class TagsField extends PureComponent {
  static defaultProps = {
    fluid: true,
    couldCreate: true,
    couldDuplicate: false,
    createOnBlur: true,
    itemsLocator: d => get(d, null, []),
    tagsLocator: d => d || [],
    tagLocator: d => d,
    tagComponent: Tag,
    maxTags: -1,
  };

  isFocus = false;

  blurTimer = null;
  clickTimer = null;

  state = {tags: []};

  getTags() {
    return get(this, ['state', 'tags']);
  }

  enableError(errorMsg, errorProps) {
    const {onError} = this.props;
    this.sugg.disabled(true);
    this.hasError = true;
    callfunc(onError, [errorMsg, errorProps]);
  }

  disableError() {
    if (this.hasError) {
      this.sugg.disabled(false);
      this.sugg.setValue('');
      this.hasError = false;
    }
  }

  maybeCreate() {
    const {couldCreate, itemsLocator, itemLocator, results} = this.props;
    const value = this.sugg.getValue();
    if (value && !this.sugg.getSelIndex()) {
      let isContinue = true;
      if (!couldCreate) {
        isContinue = !!itemsLocator(results).some(
          item => itemLocator(item) === value,
        );
      }
      if (isContinue) {
        this.handleAdd(value);
      }
    }
  }

  clearTimer() {
    if (this.blurTimer) {
      clearTimeout(this.blurTimer);
      this.blurTimer = null;
    }
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = null;
    }
  }

  handleClick = () => {
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => {
      if (!this.isFocus) {
        this.disableError();
      }
    }, 100);
  };

  handleAdd(tag) {
    const {maxTags, couldDuplicate} = this.props;
    let {tags: prevTags} = this.state;
    const tags = prevTags || [];
    if (-1 !== maxTags && tags && tags.length >= maxTags) {
      this.enableError(EXCEED_MAX_TAGS, {tags, maxTags});
      return false;
    }
    if (-1 === tags.indexOf(tag) || couldDuplicate) {
      tags.push(tag);
      this.setState({tags: [...tags]}, () => {
        const {onAdd} = this.props;
        this.sugg.setValue('');
        callfunc(onAdd);
      });
      return true;
    } else {
      return false;
    }
  }

  handleDel = delTag => () => {
    const {couldDuplicate} = this.props;
    this.setState(
      ({tags}) => {
        if (couldDuplicate) {
          tags.some((tag, key) => {
            if (tag === delTag) {
              tags.splice(key, 1);
              return true;
            } else {
              return false;
            }
          });
          tags = tags.slice(0);
        } else {
          tags = tags.filter(tag => tag !== delTag);
        }
        return {tags};
      },
      () => {
        this.disableError();
        const {onDel} = this.props;
        callfunc(onDel);
      },
    );
  };

  handleKey = e => {
    const {couldCreate, itemsLocator, itemLocator, results} = this.props;
    const {tags} = this.state;
    const value = this.sugg.getValue();
    const keyCode = get(e, ['keyCode']);
    switch (keyCode) {
      case 8:
        if (!(value || '').length) {
          const lastTag = [...tags].pop();
          this.handleDel(lastTag)();
        }
        break;
      case 13:
        e.preventDefault();
        this.maybeCreate();
        break;
    }
  };

  handleBlur = e => {
    this.isFocus = false;
    this.clearTimer();
    this.blurTimer = setTimeout(() => {
      if (!this.isFocus) {
        const {createOnBlur} = this.props;
        if (createOnBlur) {
          this.maybeCreate();
        }
      }
    }, 500);
  };

  handleFocus = e => {
    this.isFocus = true;
  };

  handleItemClick = (e, itemData) => {
    const {itemLocator} = this.props;
    const item = itemLocator(itemData);
    this.handleAdd(item);
  };

  handleItemFilter = (d, value) => {
    return value && d && -1 !== d.indexOf(value);
  };

  handleItems = d => {
    const {tags} = this.state;
    const {couldDuplicate, itemsLocator, itemLocator} = this.props;
    if (couldDuplicate) {
      return itemsLocator(d);
    } else {
      return itemsLocator(d).filter(
        item => -1 === tags.indexOf(itemLocator(item)),
      );
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {tagData, tagsLocator, tagLocator} = nextProps;
    const {prevTagData} = prevState;
    if (tagData) {
      const compare = JSON.stringify(tagData);
      if (compare !== prevTagData) {
        const {tags} = groupingTags({
          tagData,
          tagsLocator,
          tagLocator,
        });
        return {
          tags,
          prevTagData: compare,
        };
      }
    }
    return null;
  }

  componentDidMount() {
    injects = lazyInject(injects, InjectStyles);
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const {
      itemsLocator,
      tagData,
      tagsLocator,
      tagLocator,
      tagComponent,
      fluid,
      couldCreate,
      couldDuplicate,
      createOnBlur,
      maxTags,
      onAdd,
      onDel,
      onError,
      name,
      ...otherProps
    } = this.props;
    const {tags} = this.state;
    let thisTags = null;
    if (tags.length) {
      const pTags = groupingTags({tags, tagData, tagsLocator, tagLocator});
      const buildTag = build(tagComponent);
      thisTags = (
        <List style={Styles.list} ui={false} atom="ul" className="horizontal">
          {pTags.tags.map(tag =>
            buildTag(
              {
                onDel: this.handleDel(tag),
                group: pTags.group[tag],
                key: tag,
                tag,
              },
              <input type="hidden" name={name} value={tag} />,
            ),
          )}
        </List>
      );
    }
    const classes = mixClass('tags-field', {
      fluid,
    });
    const input = (
      <Suggestion
        filter
        compHd={thisTags}
        ref={el => (this.sugg = el)}
        className={classes}
        style={Styles.input}
        wrapStyle={Styles.wrap}
        itemOnClick={this.handleItemClick}
        itemFilter={this.handleItemFilter}
        itemsLocator={this.handleItems}
        onKeyDown={this.handleKey}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    );
    return (
      <Field
        {...otherProps}
        inputComponent={input}
        fieldProps={{onClick: this.handleClick}}
      />
    );
  }
}

export default TagsField;

const Styles = {
  wrap: {
    borderRadius: '.28571429rem',
    width: '100%',
    cursor: 'text',
  },
  input: {
    border: 'none',
    width: 'auto',
    margin: 0,
  },
  list: {
    padding: 0,
    margin: 0,
    display: 'inline',
    pointerEvents: 'all',
  },
};

let injects;
const InjectStyles = {
  error: [
    {background: '#fff6f6', borderColor: '#e0b4b4'},
    '.field.error.ui .tags-field.ui',
  ],
  wrap: [{border: '1px solid rgba(34,36,38,.15)'}, '.field.ui .tags-field.ui'],
};
