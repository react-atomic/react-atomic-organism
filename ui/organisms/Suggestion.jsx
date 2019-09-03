import React, {Component} from 'react';
import {build, mixClass} from 'react-atomic-molecule';
import get from 'get-object-value';
import {doc} from 'win-doc';
import callfunc from 'call-func';
import {UNDEFINED, FUNCTION} from 'reshow-constant';

import SearchBox from '../organisms/SearchBox';

const body = () => doc().body;

class Suggestion extends Component {
  static defaultProps = {
    itemClickToClose: true,
    couldCreate: true,
    component: SearchBox,
    itemsLocator: d => get(d, null, []),
    itemLocator: d => d || '',
    itemFilter: (d, value) => value && d && -1 !== d.indexOf(value),
    filter: false,
    preview: false,
  };

  state = {
    value: '',
    selIndex: 0,
    disabled: false,
  };

  results = [];

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
      e = {target: input, currentTarget: input}
    }
    if (isOpen || false === isOpen) {
      nextState.isOpen = isOpen;
    }
    this.setState(nextState, () => {
      const {onChange} = this.props;
      callfunc(onChange, [e, this.state.value, input.name]);
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
    const {onBlur, couldCreate, results} = this.props;
    const thisResults = this.handleFilter(results)
    if (!couldCreate && !get(thisResults, ['length'])) {
      const {value} = this.state;
      this.originalInput = value;
      this.setValue('', e, false);
    }
    callfunc(onBlur, [e]);
  };

  handleWrapClick = e => {
    this.handleFocus();
    callfunc(this.props.wrapOnClick);
  };

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

  handleKeyUp = e => {
    const {keyCode} = e;
    const {itemOnClick} = this.props;
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
            itemOnClick(e, get(this.results, [selIndex - 1], {}));
          }
      }
      return {selIndex};
    });
  };

  handleRefCb = el => this.input = el

  handleWrapRefCb = el => this.searchbox = el

  static getDerivedStateFromProps(nextProps, prevState) {
    const {value} = nextProps;
    if (value !== prevState.prevPropsValue) {
      return {
        value,
        prevPropsValue: value,
      };
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    this.close();
  }

  render() {
    const {
      component,
      couldCreate,
      className,
      wrapRefCb,
      wrapOnClick,
      onChange,
      onFocus,
      onBlur,
      results,
      itemOnClick,
      itemClickToClose,
      itemsLocator,
      itemLocator,
      itemFilter,
      preview,
      filter,
      ...props
    } = this.props;
    const {value, isOpen, disabled, selIndex} = this.state;
    this.results = null;
    if (isOpen) {
      this.results = this.handleFilter(results);
    }
    if (FUNCTION === typeof itemOnClick) {
      props.itemOnClick = (e, item) => {
        itemOnClick(e, item);
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
      selIndex,
      className: classes,
      wrapRefCb: this.handleWrapRefCb, 
      wrapOnClick: this.handleWrapClick,
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
