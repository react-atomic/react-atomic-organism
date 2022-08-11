import { isValidElement } from "react";
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
import callfunc, { getEventKey } from "call-func";
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
 * 2. if you don't need append <Content /> component
 * you could pass center or content to equla false
 */
class PopupModal extends PopupOverlay {
  static defaultProps = {
    mask: true,
    backgroundScroll: false,
    name: "modal",
    disableClose: false,
  };

  _timer = null;
  _mount = false;
  _locked = false;
  _observer = null;

  handleModalRefCb = (el) => (this.el = el);

  handleClose = () => this.close() && this.unlockScreen();
  handleKeyUp = (e) => {
    switch (getEventKey(e)) {
      case 27:
      case "Escape":
        const disableClose = this.props.disableClose;
        !disableClose && this.handleClose();
        break;
    }
  };

  handleModalClick = (cb) => (e) => {
    /**
     * avoid trigger ContainerClick
     */
    e.stopPropagation();
    callfunc(cb, [e]);
  };

  reCalculate = () => {
    this.setBodyCssClass();
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
          const { modalStyle: orgModalStyle, maskStyle: orgMaskStyle } =
            this.state;
          setTimeout(() => {
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
          });
        }
      }
    }, 300);
  };

  getBodyResetClass() {
    const body = doc().body;
    let bodyClass = body.className;
    bodyClass = removeClass(bodyClass, "dimmable");
    bodyClass = removeClass(bodyClass, "scrolling");
    bodyClass = removeClass(bodyClass, "dimmed");
    bodyClass = removeClass(bodyClass, "dimmed-bg-scrolling");
    return bodyClass;
  }

  resetBodyCssClass() {
    const { toPool } = this.props;
    const body = doc().body;
    if (!toPool && body) {
      body.className = this.getBodyResetClass();
    }
  }

  setBodyCssClass() {
    const { toPool, backgroundScroll } = this.props;
    const body = doc().body;
    if (!toPool && body) {
      const addBodyClass = mixClass(
        this.getBodyResetClass(),
        {
          "dimmed-bg-scrolling": backgroundScroll,
        },
        "dimmable",
        "dimmed"
      );
      body.className = addBodyClass;
    }
  }

  lockScreen() {
    this.reCalculate();
    if (!this._locked) {
      this._locked = true;
      win().addEventListener("resize", this.reCalculate);
      win().addEventListener("keyup", this.handleKeyUp);
      const MutationObserver = win().MutationObserver;
      if (MutationObserver && this.el && !this._observer) {
        this._observer = new MutationObserver(this.reCalculate);
        this._observer.observe(this.el, observerConfig);
      }
    }
  }

  unlockScreen() {
    if (this._locked) {
      this._locked = false;
    } else {
      return;
    }

    if (hasClass(get(doc(), ["body", "className"]), "dimmed")) {
      const { onClose } = this.props;
      //settimeout is for fixed cant setstate during render error
      setTimeout(() => callfunc(onClose));
    }

    // do detach (need put after onClose else will make modal can't appear again)
    clearTimeout(this._timer);
    this.resetBodyCssClass();
    win().removeEventListener("resize", this.reCalculate);
    win().removeEventListener("keyup", this.handleKeyUp);
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  componentDidMount() {
    this._mount = true;
    injects = lazyInject(InjectStyles, injects);
  }

  componentWillUnmount() {
    this._mount = false;
    this.unlockScreen();
  }

  shouldShow(show) {
    const { modalStyle: stateModalStyle, maskStyle: stateMaskStyle } =
      this.state;
    const {
      basic,
      disableClose,
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
      backgroundScroll,
      backgroundOpacity,
      toPool,
      closeEl,
      onClose,
      className,
      contentClassName,
      name,
      id,
      ...restProps
    } = this.props;
    let containerClick = null;
    let thisCloseEl;
    let content = null;
    if (show) {
      this.lockScreen();
      if (!closeEl) {
        if (!disableClose) {
          containerClick = this.handleClose;
        }
      } else {
        thisCloseEl = build(closeEl)({
          onClick: this.handleClose,
          key: "close",
          style: {
            zIndex: 1001,
            position: "fixed",
            ...closeEl.props?.style,
          },
        });
      }

      let thisModal = modal ?? (
        <Dimmer
          isModal="true"
          show={show}
          contentStyle={contentStyle}
          key="model"
        />
      );

      if (isValidElement(thisModal)) {
        thisModal = build(thisModal)({
          ...restProps,
          refCb: this.handleModalRefCb,
          onClick: this.handleModalClick(get(thisModal, ["props", "onClick"])),
          className: mixClass(
            { basic },
            modalClassName,
            get(thisModal, ["props", "className"])
          ),
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
        if (backgroundOpacity) {
          style.backgroundColor = `rgba(0,0,0,${backgroundOpacity})`;
        }
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
            key="modals"
            className={mixClass("page modals", contentClassName)}
            show={show}
            center={false}
            styles={thisStyles}
            styleOrder={1}
            onClick={containerClick}
          >
            {thisModal}
          </Dimmer>
        );
      } else {
        content = thisModal;
      }
    } else {
      this.unlockScreen();
    }
    return (
      <SemanticUI ui={false} className={className} name={name} id={id}>
        <Animate appear={appear} enter={enter} leave={leave}>
          {content}
        </Animate>
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
