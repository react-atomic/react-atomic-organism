import React, {PureComponent} from 'react';
import {Suggestion} from 'react-atomic-organism';
import {lazyInject, mixClass, List, Field} from 'react-atomic-molecule';
import dedup from 'array.dedup';
import get from 'get-object-value';
import callfunc from 'call-func';

import Tag from '../organisms/Tag';

const EXCEED_MAX_TAGS = 'exceed max tags';

class TagsField extends PureComponent {
  static defaultProps = {
    fluid: true,
    couldCreate: true,
    createOnBlur: true,
    itemsLocator: d => get(d, null, []),
    tagsLocator: d => d || [],
    tagLocator: d => d,
    maxTags: -1,
  };

  isFocus = false;

  blurTimer = null;

  state = {tags: []};

  getTags() {
    return get(this, ['state', 'tags']);
  }

  handleAdd(tag) {
    const {maxTags, onError} = this.props;
    let {tags: prevTags} = this.state;
    const tags = prevTags || [];
    if (-1 !== maxTags && tags && tags.length >= maxTags) {
      this.sugg.disabled(true);
      callfunc(onError, [EXCEED_MAX_TAGS, {tags, maxTags}]);
      return false;
    }
    if (-1 === tags.indexOf(tag)) {
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
    this.setState(
      ({tags}) => ({
        tags: tags.filter(tag => tag !== delTag),
      }),
      () => {
        this.sugg.disabled(false);
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
  }

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
    const {itemsLocator, itemLocator} = this.props;
    return itemsLocator(d).filter(
      item => -1 === tags.indexOf(itemLocator(item)),
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {tagData, tagsLocator, tagLocator} = nextProps;
    const {prevTagData} = prevState;
    if (tagData) {
      const compare = JSON.stringify(tagData);
      if (compare !== prevTagData) {
        const tags = [];
        const preTags = tagsLocator(tagData);
        if (!preTags.forEach) {
          console.error('tagsLocator not return array.');
          return null;
        }
        preTags.forEach(tag => {
          const t = tagLocator(tag);
          if (t) {
            tags.push(t);
          }
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
      fluid,
      couldCreate,
      createOnBlur,
      maxTags,
      onAdd,
      onDel,
      onError,
      ...otherProps
    } = this.props;
    const {tags} = this.state;
    let thisTags = null;
    if (tags.length) {
      thisTags = (
        <List style={Styles.list} ui={false} atom="ul" className="horizontal">
          {tags.map((tag, key) => (
            <Tag
              style={Styles.tag}
              buttonStyle={Styles.tagButton}
              onDel={this.handleDel(tag)}
              key={key}>
              {tag}
            </Tag>
          ))}
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
    return <Field {...otherProps} inputComponent={input} />;
  }
}

export default TagsField;

const Styles = {
  wrap: {
    borderRadius: '.28571429rem',
    width: '100%',
    cursor: 'text',
    overflow: 'hidden',
  },
  input: {
    border: 'none',
    width: 'auto',
  },
  list: {
    padding: 0,
    margin: 0,
    display: 'inline',
    pointerEvents: 'all',
  },
  tag: {
    margin: '0.678571em 0 0.678571em 1em',
    position: 'relative',
    paddingRight: 25,
  },
  tagButton: {
    background: 'none',
    border: 'none',
    outline: 'none',
    borderLeft: '1px solid rgba(0,0,0,0.3)',
    marginLeft: 3,
    position: 'absolute',
    top: 0,
    height: '100%',
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
