import React, { isValidElement } from "react";
import {
  build,
  reactStyle,
  lazyInject,
  Dimmer,
  SemanticUI,
} from "react-atomic-molecule";
import Animate from "organism-react-animate";
import getScrollInfo from "get-scroll-info";
import getOffset from "getoffset";
import get from "get-object-value";
import arrayMerge from "array.merge";
import callfunc from "call-func";
import { removeClass, hasClass, mixClass } from "class-lib";
import { win, doc } from "win-doc";
import { UNDEFINED } from "reshow-constant";

import PopupOverlay from "../molecules/PopupOverlay";

const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
};

/**
 * 1. if you need trace show: true
 * it extend from PopupOverlay
 *
 * 2. if you don't auto append Content component
 * you could pass center or content to equla false
 */
class PopupModal extends PopupOverlay {
  static defaultProps = {
    mask: true,
    maskScroll: false,
    scrolling: false,
    backgroundScroll: false,
    name: "modal",
    disableClose: false,
  };

  _timer = null;
  _mount = false;
  _observer = null;

  handleClick = () => this.close() && this.detach();

  handleModalRefCb = (el) => (this.el = el);

  handleModalClick = (cb) => (e) => {
    e.stopPropagation();
    callfunc(cb, [e]);
  };

  reCalculate = () => {
    this._timer = setTimeout(() => {
      if (this.el) {
        const domInfo = getOffset(this.el);
        if (domInfo) {
          const domHalfHeight = domInfo.h / 2;
          let marginTop = Math.floor(1 - domHalfHeight);
          const { scrollNodeHeight } = getScrollInfo();
          let maskStyle = {};
          if (domInfo.h * 3 > scrollNodeHeight) {
            marginTop = 0;
          }
          if (domInfo.h + 30 > scrollNodeHeight) {
            maskStyle = Styles.flexAlignTop;
          }
          const {
            modalStyle: orgModalStyle,
            maskStyle: orgMaskStyle,
          } = this.state;
          if (
            this._mount &&
            (get(orgModalStyle, ["marginTop"]) !== marginTop ||
              get(orgMaskStyle, ["justifyContent"]) !==
                maskStyle.justifyContent)
          ) {
            this.setState(({ modalStyle }) => {
              modalStyle = {
                ...modalStyle,
                marginTop,
              };
              return {
                maskStyle,
                modalStyle,
              };
            });
          }
        }
      }
    });
  };

  resetBodyClassName() {
    const { toPool } = this.props;
    const body = doc().body;
    if (!toPool && body) {
      let bodyClass = body.className;
      bodyClass = removeClass(bodyClass, "dimmable");
      bodyClass = removeClass(bodyClass, "scrolling");
      bodyClass = removeClass(bodyClass, "dimmed");
      bodyClass = removeClass(bodyClass, "dimmed-bg-scrolling");
      body.className = bodyClass;
    }
  }

  lockScreen() {
    this._locked = true;
    const { modal, toPool, maskScroll, backgroundScroll } = this.props;
    const oDoc = doc();
    win().addEventListener("resize", this.reCalculate);
    const body = oDoc.body;
    const addBodyClass = mixClass(
      body.className,
      {
        scrolling: maskScroll,
        "dimmed-bg-scrolling": backgroundScroll,
      },
      "dimmable",
      "dimmed"
    );
    if (!toPool) {
      body.className = addBodyClass;
    }
    setTimeout(this.reCalculate, 300);
    const MutationObserver = win().MutationObserver;
    if (MutationObserver && this.el && !this._observer) {
      this._observer = new MutationObserver(this.reCalculate);
      this._observer.observe(this.el, observerConfig);
    }
  }

  detach() {
    if (this._locked) {
      this._locked = false;
    } else {
      return;
    }

    /**
     * closeCallback will deprecate
     */
    if (hasClass(get(doc(), ["body", "className"]), "dimmed")) {
      const { closeCallback, onClose } = this.props;
      //settimeout is for fixed cant setstate during render error
      setTimeout(() => callfunc(onClose || closeCallback));
    }

    // do detach (need put after onClose else will make modal can't appear again)
    clearTimeout(this._timer);
    this.resetBodyClassName();
    win().removeEventListener("resize", this.reCalculate);
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  componentDidMount() {
    this._mount = true;
    injects = lazyInject(injects, InjectStyles);
  }

  componentWillUnmount() {
    this._mount = false;
    this.detach();
  }

  shouldShow(show) {
    const {
      modalStyle: stateModalStyle,
      maskStyle: stateMaskStyle,
    } = this.state;
    const {
      disableClose,
      scrolling,
      appear,
      enter,
      leave,
      style,
      styles,
      contentStyle,
      modal,
      modalClassName,
      modalStyle,
      mask,
      maskScroll,
      backgroundScroll,
      toPool,
      closeEl,
      /**
       * closeCallback will deprecate
       */
      closeCallback,
      onClose,
      className,
      contentClassName,
      name,
      id,
      ...others
    } = this.props;
    let containerClick = null;
    let thisCloseEl;
    let content = "";
    if (show) {
      this.lockScreen();
      if (!closeEl) {
        if (!disableClose) {
          containerClick = this.handleClick;
        }
      } else {
        thisCloseEl = build(closeEl)({
          onClick: this.handleClick,
          key: "close",
          style: {
            zIndex: 1001,
            position: "fixed",
            ...closeEl.props.style,
          },
        });
      }
      let thisModal = modal;
      if (UNDEFINED === typeof thisModal) {
        thisModal = (
          <Dimmer
            {...others}
            isModal="true"
            className={mixClass({ scrolling: scrolling }, modalClassName)}
            show={show}
            contentStyle={contentStyle}
          />
        );
      }
      if (isValidElement(thisModal)) {
        const orgModalOnClick = get(thisModal, ["props", "onClick"]);
        thisModal = build(thisModal)({
          refCb: this.handleModalRefCb,
          onClick: this.handleModalClick(orgModalOnClick),
          styles: reactStyle(
            {
              ...Styles.modal,
              ...modalStyle,
              ...stateModalStyle,
            },
            false,
            false
          ),
        });
      }
      if (mask) {
        const thisStyles = arrayMerge(
          reactStyle(
            { ...Styles.background, ...style, ...stateMaskStyle },
            false,
            false
          ),
          styles
        );
        content = (
          <Dimmer
            className={mixClass("page modals", contentClassName)}
            show={show}
            center={false}
            styles={thisStyles}
            styleOrder={1}
            onClick={containerClick}
            key="modals"
          >
            {thisModal}
          </Dimmer>
        );
      } else {
        content = thisModal;
      }
    } else {
      this.detach();
    }

    return (
      <SemanticUI ui={false} className={className} name={name} id={id}>
        <Animate {...{ appear, enter, leave }}>{content}</Animate>
        {thisCloseEl}
      </SemanticUI>
    );
  }
}

export default PopupModal;

const Styles = {
  flexAlignTop: {
    justifyContent: "flex-start",
    WebkitBoxPack: "start",
    MsFlexPack: "start",
  },
  background: {
    overflow: "auto",
    boxSizing: "border-box",
    WebkitOverflowScrolling: "touch",
  },
  modal: {
    boxSizing: "border-box",
    right: "auto",
    bottom: "auto",
    transition: ["all 500ms ease"],
  },
};

let injects;
const InjectStyles = {
  backgroundScroll: [
    {
      overflow: "auto !important",
      WebkitOverflowScrolling: "touch !important",
    },
    ".dimmable.dimmed.dimmed-bg-scrolling",
  ],
};
