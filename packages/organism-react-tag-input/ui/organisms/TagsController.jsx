import React, { PureComponent } from "react";
import callfunc from "call-func";
import get, { initMap } from "get-object-value";
import { build } from "react-atomic-molecule";
import { KEYS, NEW_OBJ } from "reshow-constant";

const EXCEED_MAX_TAGS = "exceed max tags";

const dedupTags = (tags, group) => {
  const nextTags = [];
  const tMap = NEW_OBJ();
  tags.forEach((t) => {
    if (!tMap[t] && group[t].num !== 0) {
      nextTags.push(t + "");
      tMap[t] = 1;
    }
  });
  return nextTags;
};

const groupingTags = ({ tags, tagData, tagsLocator, tagLocator }) => {
  const group = {};
  const initGroup = initMap(group);
  const preTags = tagsLocator(tagData);
  if (tagData && !preTags.forEach) {
    console.error("tagsLocator not return array.");
    return null;
  } else {
    preTags.forEach((t) => {
      const tag = tagLocator(t);
      if (tag) {
        initGroup(tag, { data: [], num: 0 });
        group[tag].data.push(t);
      }
    });
  }
  const thisTags = tags != null ? tags : KEYS(group);
  thisTags.forEach((tag) => {
    initGroup(tag, { data: [], num: 0 });
    group[tag].num++;
  });
  return { tags: dedupTags(thisTags, group), group };
};

class TagsController extends PureComponent {
  static defaultProps = {
    fluid: true,
    disabled: false,
    couldCreate: true,
    couldDuplicate: false,
    createOnBlur: true,
    itemsLocator: (d) => get(d, null, []),
    itemLocator: (d) => d,
    tagsLocator: (d) => d || [],
    tagLocator: (d) => d,
    maxTags: -1,
  };

  isFocus = false;

  blurTimer = null;
  clickTimer = null;

  state = { tags: [] };

  getTags() {
    return get(this, ["state", "tags"]);
  }

  enableError(errorMsg, errorProps) {
    const { onError } = this.props;
    this.sugg.disabled(true);
    this.hasError = true;
    callfunc(onError, [errorMsg, errorProps]);
  }

  disableError() {
    if (this.hasError) {
      this.sugg.disabled(false);
      this.sugg.setValue("");
      this.hasError = false;
    }
  }

  maybeCreate() {
    const { disabled, couldCreate, itemsLocator, itemLocator, results } =
      this.props;
    const value = this.sugg.getValue();
    if (value && !this.sugg.getSelIndex()) {
      let isContinue = true;
      if (!couldCreate) {
        isContinue = !!itemsLocator(results).some(
          (item) => itemLocator(item) === value
        );
      }
      if (isContinue && !disabled) {
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
    tag = tag + "";
    const { maxTags, couldDuplicate } = this.props;
    let { tags: prevTags } = this.state;
    const tags = prevTags || [];
    if (-1 !== maxTags && tags && tags.length >= maxTags) {
      this.enableError(EXCEED_MAX_TAGS, { tags, maxTags });
      return false;
    }
    if (-1 === tags.indexOf(tag) || couldDuplicate) {
      tags.push(tag);
      this.setState({ tags: [...tags] }, () => {
        const { onAdd } = this.props;
        this.sugg.setValue("");
        callfunc(onAdd);
      });
      return true;
    } else {
      return false;
    }
  }

  handleDel = (delTag) => () => {
    const { couldDuplicate, disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setState(
      ({ tags }) => {
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
          tags = tags.filter((tag) => tag !== delTag);
        }
        return { tags };
      },
      () => {
        this.disableError();
        const { onDel } = this.props;
        callfunc(onDel, [delTag, this.state.tags]);
      }
    );
  };

  handleKey = (e) => {
    const {
      couldCreate,
      itemsLocator,
      itemLocator,
      results,
      tagData,
      tagsLocator,
      tagLocator,
    } = this.props;
    const { tags } = this.state;
    const value = this.sugg.getValue();
    const keyCode = get(e, ["keyCode"]);
    switch (keyCode) {
      case 8:
        if (!(value || "").length) {
          const lastTag = groupingTags({
            tags,
            tagData,
            tagsLocator,
            tagLocator,
          }).tags.pop();
          this.handleDel(lastTag)();
        }
        break;
      case 13:
        e.preventDefault();
        this.maybeCreate();
        break;
    }
  };

  handleBlur = (e) => {
    this.isFocus = false;
    this.clearTimer();
    const suggResults = this.sugg?.results;
    const delay = suggResults && suggResults.length ? 300 : 50;
    this.blurTimer = setTimeout(() => {
      if (!this.isFocus) {
        if (this.props.createOnBlur) {
          const value = this.sugg.getValue();
          if (value) {
            this.maybeCreate();
          }
        }
      }
    }, delay);
  };

  handleFocus = (e) => {
    this.isFocus = true;
  };

  handleItemClick = (e) => {
    const { itemLocator } = this.props;
    const item = itemLocator(get(e, ["item"]));
    return item && this.handleAdd(item);
  };

  handleItems = (d) => {
    const { tags } = this.state;
    const { couldDuplicate, itemsLocator, itemLocator } = this.props;
    if (couldDuplicate) {
      return itemsLocator(d);
    } else {
      return itemsLocator(d).filter(
        (item) => -1 === tags.indexOf(itemLocator(item))
      );
    }
  };

  handleGetSugg = (el) => (this.sugg = el);

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tagData, tagsLocator, tagLocator } = nextProps;
    const { prevTagData } = prevState;
    if (tagData) {
      const compare = JSON.stringify(tagData);
      if (compare !== prevTagData) {
        const { tags } = groupingTags({
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

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const { component, tagData, tagsLocator, tagLocator } = this.props;
    const { tags } = this.state;
    return build(component)({
      ...this.props,
      tags,
      groupTags:
        tags && tags.length
          ? groupingTags({ tags, tagData, tagsLocator, tagLocator })
          : null,
      itemsLocator: this.handleItems,
      onDel: this.handleDel,
      onItemClick: this.handleItemClick,
      onKeyDown: this.handleKey,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onGetSugg: this.handleGetSugg,
    });
  }
}

export default TagsController;
