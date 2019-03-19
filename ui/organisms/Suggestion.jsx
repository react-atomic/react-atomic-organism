import React, {
  PureComponent,
  cloneElement,
  createElement,
  isValidElement,
} from 'react';
import get from 'get-object-value';
import {doc} from 'win-doc';
import callfunc from 'call-func';

import SearchBox from '../organisms/SearchBox';

const body = () => doc().body;

class Suggestion extends PureComponent {
  static defaultProps = {
    itemClickToClose: true,
    component: SearchBox,
  };

  state = {
    value: '',
  };

  open(e) {
    if (this.state.isOpen) {
      return;
    }
    body().addEventListener('click', this.handleClose);
    this.setValue(undefined, e);
  }

  close() {
    body().removeEventListener('click', this.handleClose);
    this.setState({isOpen: false});
  }

  setValue(value, e) {
    const input = this.input;
    let nextState = {value};
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
      wrapRefCb,
      onChange,
      onFocus,
      results,
      itemOnClick,
      itemClickToClose,
      ...props
    } = this.props;
    const {value: stateValue, isOpen} = this.state;
    let thisResults = null;
    if (isOpen) {
      thisResults = results;
    }
    if ('function' === typeof itemOnClick) {
      props.itemOnClick = (e, item) => {
        itemOnClick(e, item);
        if (itemClickToClose) {
          this.close();
        }
      };
    }
    const build = isValidElement(component) ? cloneElement : createElement;
    return build(component, {
      ...props,
      wrapRefCb: el => (this.searchbox = el),
      refCb: el => (this.input = el),
      value: stateValue,
      onChange: this.handleInput,
      onFocus: this.handleFocus,
      results: thisResults,
    });
  }
}

export default Suggestion;
