import React, {PureComponent, cloneElement, createElement, isValidElement} from 'react'
import get from 'get-object-value'

import SearchBox from '../organisms/SearchBox'

const body = () => document.body

class Suggestion extends PureComponent
{
  static defaultProps = {
    itemClickToClose: true,
    component: SearchBox
  }

  state = {
    value: ''
  }

  open(e)
  {
    if (this.state.isOpen) {
      return
    }
    body().addEventListener(
      'click',
      this.handleClose
    )
    this.setValue(undefined, e)
  }

  close()
  {
    body().removeEventListener(
      'click',
      this.handleClose
    )
    this.setState({isOpen: false})
  }

  setValue(value, e)
  {
    let nextState = {value}
    if ('undefined' === typeof value) {
      nextState = {
        value: this.input.value,
        isOpen: true
      }
    }
    this.setState(nextState, ()=>{
      const {onChange} = this.props
      if ('function' === typeof onChange) {
        onChange(e, this.state.value)
      }
    })
  }

  handleClose = e => {
    const target = e.target
    const sbox = this.searchbox
    if (sbox.contains(target) || sbox.isSameNode(target)) {
      return
    }
    this.close()
  }

  handleInput = e => {
    const value = get(e, ['target', 'value'], '') 
    this.setValue(value, e)
  }

  handleFocus = e => {
    this.open(e)
  }

  componentWillUnmount()
  {
    this.close()
  }

  render()
  {
    const {component, wrapRefCb, onChange, onFocus, results, itemOnClick, itemClickToClose, ...props} = this.props
    const {value: stateValue, isOpen} = this.state
    let thisResults = null
    if (isOpen) {
      thisResults = results
    }
    if ('function' === typeof itemOnClick) {
      props.itemOnClick = (e, item) =>
      {
        itemOnClick(e, item)
        if (itemClickToClose) {
          this.close()
        }
      }
    }
    const build = (isValidElement(component)) ?
              cloneElement :
              createElement
    return build(
      component,
      {
        ...props,
        wrapRefCb: el => this.searchbox = el,
        refCb: el => this.input = el,
        value: stateValue,
        onChange: this.handleInput,
        onFocus: this.handleFocus,
        results: thisResults
      }
    )
  }
}

export default Suggestion
