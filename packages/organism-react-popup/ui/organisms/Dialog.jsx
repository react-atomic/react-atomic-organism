import React, {cloneElement} from "react"

import {
  mixClass,
  Header,
  Content,
  List,
  Button
} from 'react-atomic-molecule'

import PopupModal from '../molecules/PopupModal'
import BasePopup from '../molecules/BasePopup'

const isArray = Array.isArray

class Dialog extends BasePopup 
{
  static defaultProps = {
    name: "dialog",
    i18nNegativeBtn: 'No',
    i18nPositiveBtn: 'Yes',
    size: 'mini'
  }

  handleClick(button, e)
  {
    const {onClick} = this.props
    this.popup.close()
    if ('function' === typeof onClick) {
      onClick(e, button)
    }
  }

  render()
  {
    const {size, className, name, buttons, header, children, i18nNegativeBtn, i18nPositiveBtn} = this.props
    let thisHeader = null
    let thisButtons = buttons
    if (header) {
      thisHeader = <Header>{header}</Header>
    }
    if (!isArray(thisButtons) || !thisButtons.length) {
      thisButtons = [
        (
        <Button value={false} className="negative" key='b-negative'>
          {i18nNegativeBtn}
        </Button>
        ),
        (
        <Button value={true} className="positive" key='b-positive'>
          {i18nPositiveBtn}
        </Button>
        )
      ]
    }
    thisButtons = thisButtons.map(
      button => cloneElement(button, {
        onClick: this.handleClick.bind(this, button)
      })
    )
    const classes = mixClass(
      className,
      'dialog',
      size
    )
    return (
      <PopupModal modalClassName={classes} name={name} content={false} ref={el=>this.popup=el}>
        {thisHeader} 
        <Content>{children}</Content>
        <List type="actions">{thisButtons}</List>
      </PopupModal>
    )
  }
}

export default Dialog
