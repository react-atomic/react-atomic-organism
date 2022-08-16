import { PureComponent } from "react";
import { build, mixClass } from "react-atomic-molecule";
import get from "get-object-value";
import { doc } from "win-doc";
import callfunc, { getEventKey } from "call-func";
import { UNDEFINED, FUNCTION } from "reshow-constant";

import SearchBox from "../organisms/SearchBox";

const defaultItemFilter = (d, value) =>
  value &&
  d &&
  -1 !== (d + "").toLowerCase().indexOf((value + "").toLowerCase());

const defaultItemLocator = (d) => d || "";

const defaultItemsLocator = (d) => get(d, null, []);

class Suggestion extends PureComponent {
  static defaultProps = {
    itemClickToClose: true,
    couldCreate: true,
    component: SearchBox,
    itemsLocator: defaultItemsLocator,
    itemLocator: defaultItemLocator,
    itemFilter: defaultItemFilter,
    valueLocator: null,
    filter: false,
    preview: false,
  };

  state = {
    value: "",
    selIndex: 0,
    disabled: false,
  };

  results = [];

  timerCouldCreate = null;

  disabled(bool) {
    if (UNDEFINED === typeof bool) {
      bool = true;
    }
    if (bool !== this.state.disabled) {
      this.setState({ disabled: bool }, () => {
        this.close();
        this.input.blur();
      });
    }
  }

  open(e) {
    const { isOpen, disabled } = this.state;
    if (isOpen || disabled) {
      return;
    }
    doc()?.addEventListener("click", this.handleClose);
    this.setValue(undefined, e, true);
  }

  close() {
    doc()?.removeEventListener("click", this.handleClose);
    this.setState({ isOpen: false });
  }

  focus() {
    callfunc(this.input.focus, null, this.input);
  }

  getValue() {
    return this.state.value;
  }

  valueLocator(rawItem) {
    const { valueLocator, itemLocator } = this.props;
    let value = itemLocator(rawItem);
    if (valueLocator) {
      value = callfunc(valueLocator, [value]);
    }
    return value;
  }

  getSelIndex() {
    return this.state.selIndex;
  }

  getIsOpen() {
    return this.state.isOpen;
  }

  shouldRenderSuggestions() {
    const { shouldRenderSuggestions } = this.props;
    return !shouldRenderSuggestions
      ? this.state.isOpen
      : callfunc(shouldRenderSuggestions, [this]);
  }

  clearTimer() {
    if (this.timerCouldCreate) {
      clearTimeout(this.timerCouldCreate);
      this.timerCouldCreate = null;
    }
    if (this.timerClose) {
      clearTimeout(this.timerClose);
      this.timerClose = null;
    }
    if (this.timerSubmit) {
      clearTimeout(this.timerSubmit);
      this.timerSubmit = null;
    }
    if (this.timerResetValue) {
      clearTimeout(this.timerResetValue);
      this.timerResetValue = null;
    }
  }

  setValue(value, e, isOpen) {
    const input = this.input;
    let nextState = { value, selIndex: 0 };
    if (UNDEFINED === typeof value) {
      nextState = {
        value: input.value,
      };
    }
    if (!e) {
      e = { target: input, currentTarget: input };
    }
    if (isOpen || false === isOpen) {
      nextState.isOpen = isOpen;
    }
    this.setState(nextState, () => {
      const { onChange, name } = this.props;
      e.inputName = name;
      e.value = this.getValue();
      callfunc(onChange, [e, e.value, name, this]);
    });
  }

  handleChange = (e) => {
    const { isOpen } = this.state;
    const value = get(e, ["target", "value"], "");
    this.setValue(value, e);
    if (!isOpen) {
      this.open(e);
    }
  };

  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    if (false !== onSubmit) {
      this.input.blur();
      this.timerClose = setTimeout(() => this.close());
      this.timerSubmit = setTimeout(() => {
        // Timeout is for this.handleResetValue
        e.inputValue = this.getValue();
        callfunc(onSubmit, [e]);
      }, 300);
    }
  };

  handleResetValue = (value, e) => {
    this.originalValue = value;
    this.timerResetValue = setTimeout(() => this.setValue("", e, false));
  };

  handleClose = (e) => {
    const target = e.target;
    const sbox = this.searchbox;
    if (sbox.contains(target)) {
      return;
    }
    this.close();
  };

  handleCouldCreate = () => {
    const { couldCreate, results, itemsLocator } = this.props;
    const { value: originalValue } = this.state;
    let value = originalValue;
    if (!couldCreate) {
      const arr = itemsLocator(results);
      if (arr && arr.length) {
        const isIn = arr.some((a) => {
          if (this.valueLocator(a) === value) {
            return true;
          } else {
            return false;
          }
        });
        if (!isIn) {
          value = "";
        }
      } else {
        value = "";
      }
    }
    return {
      value,
      originalValue,
    };
  };

  handleFocus = (e) => {
    const { onFocus, couldCreate } = this.props;
    this.open(e);
    this.focus();
    if (!couldCreate && this.originalValue) {
      this.setValue(this.originalValue, e);
      this.originalValue = null;
    }
    callfunc(onFocus, [e]);
  };

  handleBlur = (e) => {
    const { onBlur } = this.props;
    this.clearTimer();
    this.timerCouldCreate = setTimeout(() => {
      const { isOpen } = this.state;
      if (!isOpen) {
        const next = this.handleCouldCreate();
        if (!next.value) {
          this.handleResetValue(next.originalValue, e);
        }
      }
    }, 200);
    callfunc(onBlur, [e]);
  };

  handleWrapClick = (e) => {
    this.handleFocus();
    callfunc(this.props.onWrapClick, [e]);
  };

  handleItemClick = (e = {}, item) => {
    const { itemClickToClose, onItemClick } = this.props;
    e.item = item;
    const isContinue = callfunc(onItemClick, [e, item, this]);
    if (itemClickToClose && false !== isContinue) {
      this.setValue(this.valueLocator(item));
      this.handleSubmit(e);
    }
  };

  handleKeyUp = (e) => {
    const { onItemClick } = this.props;
    this.setState(({ selIndex }) => {
      switch (getEventKey(e)) {
        case 38:
        case "ArrowUp":
          selIndex--;
          if (selIndex < 0) {
            selIndex = 0;
          }
          break;
        case 40:
        case "ArrowDown":
          selIndex++;
          if (
            !this.results ||
            !this.results.length ||
            this.results.length <= selIndex
          ) {
            selIndex = 0;
          }
          break;
        case 39:
        case "ArrowRight":
        case 13:
        case "Enter":
          e.preventDefault();
          if (this.results && this.results.length) {
            setTimeout(() =>
              this.handleItemClick(e, get(this.results, [selIndex]))
            );
          } else {
            this.handleSubmit(e);
          }
      }
      return { selIndex };
    });
  };

  handleRefCb = (el) => (this.input = el);

  handleWrapRefCb = (el) => (this.searchbox = el);

  handlePreview(results) {
    const { value } = this.state;
    const { preview, itemsLocator, itemFilter } = this.props;
    let arr = itemsLocator(results);
    if (!arr || !arr.length) {
      return [];
    }
    if (!value && preview) {
      const previewNum = "number" !== typeof preview ? 5 : preview;
      arr = arr.slice(0, previewNum);
    } else {
      arr = arr.filter((d) => itemFilter(this.valueLocator(d), value));
    }
    return arr;
  }

  handleFilter(results) {
    const { filter } = this.props;
    return filter ? this.handlePreview(results) : results;
  }

  handleResults() {
    let results = null;
    if (this.shouldRenderSuggestions()) {
      results = this.handleFilter(this.props.results);
    }
    return results;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, defaultValue } = nextProps;
    const thisValue =
      value ?? (get(prevState, ["value"]) ? null : defaultValue);
    if (thisValue != null && thisValue !== prevState.prevPropsValue) {
      return {
        value: thisValue,
        prevPropsValue: thisValue,
      };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { disabled } = this.props;
    if (null != disabled && prevProps.disabled !== disabled) {
      this.disabled(disabled);
    }
  }

  componentWillUnmount() {
    this.close();
    this.clearTimer();
  }

  render() {
    const {
      component,
      couldCreate,
      className,
      wrapRefCb,
      onWrapClick,
      onChange,
      onFocus,
      onBlur,
      onSubmit,
      results,
      onItemClick,
      itemClickToClose,
      itemsLocator,
      itemLocator,
      itemFilter,
      valueLocator,
      preview,
      filter,
      defaultValue,
      shouldRenderSuggestions,
      name,
      ...props
    } = this.props;
    const { isOpen, value, disabled, selIndex } = this.state;
    if (!component) {
      return null;
    }
    this.results = this.handleResults();
    const classes = mixClass(className, {
      disabled,
    });
    return build(component)({
      ...props,
      value,
      name: isOpen ? null : name, // disalbe autofill
      "data-name": name,
      "data-selected-index": selIndex,
      className: classes,
      refCb: this.handleRefCb,
      wrapRefCb: this.handleWrapRefCb,
      onWrapClick: this.handleWrapClick,
      onItemClick: this.handleItemClick,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyUp: this.handleKeyUp,
      results: this.results,
      itemsLocator,
      itemLocator,
    });
  }
}

export default Suggestion;
