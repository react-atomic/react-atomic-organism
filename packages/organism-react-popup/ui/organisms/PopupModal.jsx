require("setimmediate")
import React, { isValidElement, cloneElement } from "react"
import { connect } from "reshow-flux"
import { reactStyle, Dimmer, SemanticUI } from "react-atomic-molecule"
import Animate from "organism-react-animate"
import getScrollInfo from "get-scroll-info"
import getOffset from "getoffset"
import get from "get-object-value"
import arrayMerge from "array.merge"
import { removeClass, mixClass } from "class-lib"

import { PopupOverlay } from "../molecules/PopupOverlay"
import { popupDispatch } from "../../src/index"

/**
 * if you need trace show: true
 * it extend from PopupOverlay
 */
class PopupModal extends PopupOverlay {
  static defaultProps = {
    mask: true,
    maskScroll: false,
    scrolling: false,
    name: "modal",
    disableClose: false,
  }

  handleClick = () => {
    this.close()
  }

  close()
  {
     const {closeCallback} = this.props
     if (typeof closeCallback === "function") {
       closeCallback()
     }
     popupDispatch({
       type: "dom/closeOne",
       params: {
         popup: this,
       },
     })
  }

  reCalculate = () => {
    if (this.el) {
      const domInfo = getOffset(this.el)
      if (domInfo) {
        const domHalfHeight = domInfo.w / 2
        let marginTop = 0
        if (domInfo.top - domHalfHeight > 0) {
          marginTop = Math.floor(1 - domHalfHeight)
        }
        const scrollInfo = getScrollInfo()
        let maskStyle = {}
        if ((domInfo.h+100) > scrollInfo.scrollNodeHeight) {
          marginTop = 0
          maskStyle = Styles.flexAlignTop
        }
        const {
          modalStyle: orgModalStyle,
          maskStyle: orgMaskStyle,
        } = this.state
        if (
          get(orgModalStyle, ["marginTop"]) !== marginTop ||
          get(orgMaskStyle, ["justifyContent"]) !== maskStyle.justifyContent
        ) {
          this.setState(({ modalStyle }) => {
            modalStyle = {
              ...modalStyle,
              marginTop,
            }
            return {
              maskStyle,
              modalStyle,
            }
          })
        }
      }
    }
  }

  lockScreen() {
    const { modal, toPool } = this.props
    window.addEventListener("resize", this.reCalculate)
    const addBodyClass = mixClass(
      {
        scrolling: this.props.maskScroll,
      },
      "dimmable",
      "dimmed"
    )
    if (!toPool && "undefined" !== typeof document) {
      document.body.className = addBodyClass
    }
  }

  resetBodyClassName() {
    const { toPool } = this.props
    if (!toPool && "undefined" !== typeof document) {
      let bodyClass = document.body.className
      bodyClass = removeClass(bodyClass, "dimmable")
      bodyClass = removeClass(bodyClass, "scrolling")
      bodyClass = removeClass(bodyClass, "dimmed")
      document.body.className = bodyClass
    }
  }

  detach() {
    this.resetBodyClassName()
    window.removeEventListener("resize", this.reCalculate)
  }

  componentWillUnmount() {
    this.detach()
  }

  render() {
    const {
      disableClose,
      scrolling,
      appear,
      enter,
      leave,
      style,
      styles,
      modal,
      modalClassName,
      modalStyle,
      mask,
      maskScroll,
      closeEl,
      closeCallback,
      className,
      ...others
    } = this.props
    const {
      show: stateShow,
      modalStyle: stateModalStyle,
      maskStyle: stateMaskStyle,
    } = this.state
    let containerClick = null
    let thisCloseEl
    let content = ""
    if (stateShow) {
      this.lockScreen()
      if (!closeEl) {
        if (!disableClose) {
          containerClick = this.handleClick
        }
      } else {
        thisCloseEl = React.cloneElement(closeEl, {
          onClick: this.handleClick,
          key: "close",
          style: {
            zIndex: 1001,
            position: "fixed",
            ...closeEl.props.style,
          },
        })
      }
      let thisModal = modal
      if ("undefined" === typeof thisModal) {
        thisModal = (
          <Dimmer
            {...others}
            isModal="true"
            className={mixClass({ scrolling: scrolling }, modalClassName)}
            show={stateShow}
          />
        )
      }
      if (isValidElement(thisModal)) {
        const orgModalOnClick = get(thisModal, ["props", "onClick"])
        thisModal = cloneElement(thisModal, {
          refCb: el => {
            this.el = el
            setImmediate(() => this.reCalculate())
          },
          onClick: (e, ...params) => {
            e.stopPropagation()
            if ("function" === typeof orgModalOnClick) {
              orgModalOnClick(e, ...params)
            }
          },
          styles: reactStyle(
            {
              ...Styles.modal,
              ...modalStyle,
              ...stateModalStyle,
            },
            false,
            false
          ),
        })
      }
      if (mask) {
        const thisStyles = arrayMerge(
          reactStyle(
            { ...Styles.background, ...style, ...stateMaskStyle },
            null,
            false
          ),
          styles
        )
        content = (
          <Dimmer
            className="page modals"
            show={stateShow}
            center={false}
            styles={thisStyles}
            styleOrder={1}
            onClick={containerClick}
            key="modals"
          >
            {thisModal}
          </Dimmer>
        )
      } else {
        content = thisModal
      }
    } else {
      this.detach()
    }

    return (
      <SemanticUI className={className}>
        <Animate {...{ appear, enter, leave }}>{content}</Animate>
        {thisCloseEl}
      </SemanticUI>
    )
  }
}

const PopupModalContainer = connect(PopupModal, { withProps: true })

export default PopupModalContainer

const Styles = {
  flexAlignTop: {
    justifyContent: "flex-start",
    WebkitBoxPack: "start",
    MsFlexPack: "start",
  },
  background: {
    overflow: "auto",
  },
  modal: {
    boxSizing: "border-box",
    right: "auto",
    bottom: "auto",
    transition: ["all 500ms ease"],
  },
}
