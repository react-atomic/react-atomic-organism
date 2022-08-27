import { PureComponent } from "react";
import callfunc, { getEventKey } from "call-func";
import get, { initMap } from "get-object-value";
import { build } from "react-atomic-molecule";

import {
  ERROR_EXCEED_MAX_TAGS,
  ERROR_DUPLICATE_TAG,
} from "../organisms/TagList";

class TagInputController extends PureComponent {
  static defaultProps = {
    fluid: true,
    disabled: false,
    couldCreate: true,
    couldDuplicate: false,
    createOnBlur: true,
    itemsLocator: (d) => get(d, null, []),
    itemLocator: (d) => d,
  };

  clickTimer = null;

  getTags() {
    return get(this.getTagList()?.getTags(), ["tags"]);
  }

  getTagList = () => this.tagList;

  enableError(errorMsg, errorProps) {
    const { onError } = this.props;
    console.log(errorMsg);
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
        this.getTagList().add(value) &&
          this.sugg.setValue("") &&
          this.disableError();
      }
    }
  }

  clearTimer() {
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = null;
    }
  }

  handleClick = () => {
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => {
      if (!this.sugg.getIsOpen()) {
        this.disableError();
      }
    }, 100);
    this.sugg.focus();
  };

  handleKeyDown = (e) => {
    const value = this.sugg.getValue();
    switch (getEventKey(e)) {
      case 8:
      case "Backspace":
        if (!(value || "").length) {
          this.getTagList().delLast();
        }
        return false;
      case 13:
      case "Enter":
        e.stopPropagation();
        e.preventDefault();
        this.maybeCreate();
        return false;
    }
  };

  handleBlur = (e) => {
    if (this.props.createOnBlur) {
      const value = this.sugg.getValue();
      if (value) {
        this.maybeCreate();
      }
    }
  };

  handleItemClick = (e) => {
    const { itemLocator } = this.props;
    const item = itemLocator(get(e, ["item"]));
    return item && this.getTagList().add(item);
  };

  handleItems = (d) => {
    const tags = this.getTags();
    const { couldDuplicate, itemsLocator, itemLocator } = this.props;
    if (couldDuplicate) {
      return itemsLocator(d);
    } else {
      return itemsLocator(d).filter(
        (item) => -1 === tags.indexOf(itemLocator(item))
      );
    }
  };

  handleDel = (e) => {
    const { onDel } = this.props;
    this.disableError();
    callfunc(onDel, [e]);
  };

  handleAddError = (e) => {
    switch (e.code) {
      case ERROR_EXCEED_MAX_TAGS:
        this.enableError(e.message, e);
        break;
      case ERROR_DUPLICATE_TAG:
        console.log(e.message);
        break;
    }
  };

  handleGetSugg = (el) => (this.sugg = el);
  handleGetTagList = (el) => (this.tagList = el);

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const { component, tagList } = this.props;
    return build(component)({
      ...this.props,
      tagList: build(tagList)({
        ref: this.handleGetTagList,
        onDel: this.handleDel,
        onAddError: this.handleAddError,
      }),
      itemsLocator: this.handleItems,
      onItemClick: this.handleItemClick,
      onKeyDown: this.handleKeyDown,
      onBlur: this.handleBlur,
      onGetSugg: this.handleGetSugg,
    });
  }
}

export default TagInputController;
