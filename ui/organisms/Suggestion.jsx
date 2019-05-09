import React, {PureComponent} from 'react';
import {build, mixClass} from 'react-atomic-molecule';
import get from 'get-object-value';
import {doc} from 'win-doc';
import callfunc from 'call-func';
import {UNDEFINED} from 'reshow-constant';

import SearchBox from '../organisms/SearchBox';

const body = () => doc().body;

class Suggestion extends PureComponent {
  static defaultProps = {
    itemClickToClose: true,
    component: SearchBox,
    itemsLocator: d => get(d, null, []),
    itemLocator: d => d || '',
    itemFilter: (d, value) => value && d && -1 !== d.indexOf(value),
    filter: false,
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
      this.setState({disabled: bool}, ()=>{
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
    this.setValue(undefined, e);
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

  setValue(value, e) {
    const input = this.input;
    let nextState = {value, isOpen: true, selIndex: 0};
    if ('undefined' === typeof value) {
      nextState = {
        value: input.value,
        isOpen: true,
      };
    }
    if (e) {
      e.persist();
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
    const value = get(e, ['target', 'value'], '');
    this.setValue(value, e);
  };

  handleFocus = e => {
    this.open(e);
  };

  handleWrapClick = e => {
    this.focus();
    callfunc(this.props.wrapOnClick);
  };

  handleFilter(results) {
    const {filter, itemsLocator, itemLocator, itemFilter} = this.props;
    const {value} = this.state;
    return filter
      ? itemsLocator(results).filter(d => itemFilter(itemLocator(d), value))
      : results;
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
            itemOnClick(e, get(this.results, [selIndex-1], {}));
          }
      }
      return {selIndex};
    });
  };

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
      className,
      wrapRefCb,
      wrapOnClick,
      onChange,
      onFocus,
      results,
      itemOnClick,
      itemClickToClose,
      itemsLocator,
      itemLocator,
      itemFilter,
      filter,
      ...props
    } = this.props;
    const {value, isOpen, disabled, selIndex} = this.state;
    this.results = null;
    if (isOpen) {
      this.results = this.handleFilter(results);
    }
    if ('function' === typeof itemOnClick) {
      props.itemOnClick = (e, item) => {
        itemOnClick(e, item);
        if (itemClickToClose) {
          this.close();
        }
      };
    }
    const classes = mixClass(className, {
      disabled
    });
    return build(component)({
      ...props,
      value,
      selIndex,
      className: classes,
      wrapRefCb: el => (this.searchbox = el),
      wrapOnClick: this.handleWrapClick,
      refCb: el => (this.input = el),
      onChange: this.handleInput,
      onFocus: this.handleFocus,
      onKeyUp: this.handleKeyUp,
      results: this.results,
      itemsLocator,
      itemLocator,
    });
  }
}

export default Suggestion;
