import React, {PureComponent} from 'react';
import {build, mixClass} from 'react-atomic-molecule';
import get from 'get-object-value';
import {doc} from 'win-doc';
import callfunc from 'call-func';
import {UNDEFINED, FUNCTION} from 'reshow-constant';

import SearchBox from '../organisms/SearchBox';

const body = () => doc().body;

const defaultItemClick = (e, item, sugg) => sugg.setValue(item);

const defaultItemFilter = (d, value) => value && d && -1 !== d.indexOf(value);

const defaultItemLocator = d => d || '';

const defaultItemsLocator = d => get(d, null, []);

class Suggestion extends PureComponent {
  static defaultProps = {
    itemClickToClose: true,
    couldCreate: true,
    component: SearchBox,
    itemsLocator: defaultItemsLocator,
    itemLocator: defaultItemLocator,
    itemFilter: defaultItemFilter,
    onItemClick: defaultItemClick,
    filter: false,
    preview: false,
  };

  state = {
    value: '',
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
      this.setState({disabled: bool}, () => {
        this.close();
        this.input.blur();
      });
    }
  }

  open(e) {
    const {isOpen, disabled} = this.state;
    if (isOpen || disabled) {
      return;
    }
    body().addEventListener('click', this.handleClose);
    this.setValue(undefined, e, true);
  }

  close() {
    body().removeEventListener('click', this.handleClose);
    this.setState({isOpen: false});
  }

  focus() {
    callfunc(this.input.focus, null, this.input);
  }

  getValue() {
    return this.state.value;
  }

  getSelIndex() {
    return this.state.selIndex;
  }

  setValue(value, e, isOpen) {
    const input = this.input;
    let nextState = {value, selIndex: 0};
    if ('undefined' === typeof value) {
      nextState = {
        value: input.value,
      };
    }
    if (e) {
      e.persist();
    } else {
      e = {target: input, currentTarget: input};
    }
    if (isOpen || false === isOpen) {
      nextState.isOpen = isOpen;
    }
    this.setState(nextState, () => {
      const {onChange, name} = this.props;
      callfunc(onChange, [e, this.state.value, name, this]);
    });
  }

  handleClose = e => {
    const target = e.target;
    const sbox = this.searchbox;
    if (sbox.contains(target)) {
      return;
    }
    this.close();
  };

  handleInput = e => {
    const {isOpen} = this.state;
    const value = get(e, ['target', 'value'], '');
    this.setValue(value, e);
    if (!isOpen) {
      this.open(e);
    }
  };

  handleFocus = e => {
    const {onFocus, couldCreate} = this.props;
    this.open(e);
    this.focus();
    if (!couldCreate && this.originalInput) {
      this.setValue(this.originalInput, e);
      this.originalInput = null;
    }
    callfunc(onFocus, [e]);
  };

  handleBlur = e => {
    const {
      onBlur,
      couldCreate,
      results,
      itemsLocator,
      itemLocator,
    } = this.props;
    if (!couldCreate) {
      const arr = itemsLocator(results);
      if (arr && arr.length) {
        this.clearTimer();
        this.timerCouldCreate = setTimeout(() => {
          const {value} = this.state;
          if (!this.results || !this.results.length) {
            const isIn = arr.some(a => {
              if (itemLocator(a) === value) {
                return true;
              } else {
                return false;
              }
            });
            if (!isIn) {
              this.originalInput = value;
              this.setValue('', e, false);
            }
          }
        }, 300);
      }
    }
    callfunc(onBlur, [e]);
  };

  handleWrapClick = e => {
    this.handleFocus();
    callfunc(this.props.onWrapClick, [e]);
  };

  handleKeyUp = e => {
    const {keyCode} = e;
    const {onItemClick} = this.props;
    e.persist();
    this.setState(({selIndex}) => {
      switch (keyCode) {
        case 38:
          selIndex--;
          if (selIndex < 0) {
            selIndex = 0;
          }
          break;
        case 40:
          selIndex++;
          if (
            !this.results ||
            !this.results.length ||
            this.results.length < selIndex
          ) {
            selIndex = 0;
          }
          break;
        case 13:
          e.preventDefault();
          if (selIndex && this.results) {
            callfunc(onItemClick, [
              e,
              get(this.results, [selIndex - 1], {}),
              this,
            ]);
          }
      }
      return {selIndex};
    });
  };

  handleRefCb = el => (this.input = el);

  handleWrapRefCb = el => (this.searchbox = el);

  handlePreview(results) {
    const {value} = this.state;
    const {preview, itemsLocator, itemLocator, itemFilter} = this.props;
    let arr = itemsLocator(results);
    if (!arr || !arr.length) {
      return [];
    }
    if (!value && preview) {
      const previewNum = 'number' !== typeof preview ? 5 : preview;
      arr = arr.slice(0, previewNum);
    } else {
      arr = arr.filter(d => itemFilter(itemLocator(d), value));
    }
    return arr;
  }

  handleFilter(results) {
    const {filter} = this.props;
    return filter ? this.handlePreview(results) : results;
  }

  handleResults() {
    let results = null;
    if (this.state.isOpen && this.shouldRenderSuggestions()) {
      results = this.handleFilter(this.props.results);
    }
    return results;
  }

  shouldRenderSuggestions() {
    const {shouldRenderSuggestions} = this.props;
    return !shouldRenderSuggestions
      ? true
      : callfunc(shouldRenderSuggestions, [this]);
  }

  clearTimer() {
    if (this.timerCouldCreate) {
      clearTimeout(this.timerCouldCreate);
      this.timerCouldCreate = null;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {value, defaultValue} = nextProps;
    if (value !== prevState.prevPropsValue) {
      return {
        value: value || defaultValue,
        prevPropsValue: value,
      };
    } else {
      return null;
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
      results,
      onItemClick,
      itemClickToClose,
      itemsLocator,
      itemLocator,
      itemFilter,
      preview,
      filter,
      defaultValue,
      shouldRenderSuggestions,
      name,
      ...props
    } = this.props;
    const {isOpen, value, disabled, selIndex} = this.state;
    if (!component) {
      return null;
    }
    this.results = this.handleResults();
    if (FUNCTION === typeof onItemClick) {
      props.onItemClick = (e, item) => {
        onItemClick(e, item, this);
        if (itemClickToClose) {
          this.close();
        }
      };
    }
    const classes = mixClass(className, {
      disabled,
    });
    return build(component)({
      ...props,
      value,
      name: isOpen ? null : name, // disalbe autofill
      selIndex,
      className: classes,
      wrapRefCb: this.handleWrapRefCb,
      onWrapClick: this.handleWrapClick,
      refCb: this.handleRefCb,
      onChange: this.handleInput,
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
