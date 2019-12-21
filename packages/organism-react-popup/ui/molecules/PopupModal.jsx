require('setimmediate');
import React, {isValidElement} from 'react';
import {connect} from 'reshow-flux';
import {build, reactStyle, Dimmer, SemanticUI} from 'react-atomic-molecule';
import Animate from 'organism-react-animate';
import getScrollInfo from 'get-scroll-info';
import getOffset from 'getoffset';
import get from 'get-object-value';
import arrayMerge from 'array.merge';
import {removeClass, hasClass, mixClass} from 'class-lib';
import callfunc from 'call-func';
import {win, doc} from 'win-doc';
import {UNDEFINED} from 'reshow-constant';

import {PopupOverlay} from '../molecules/PopupOverlay';
import {popupDispatch} from '../../src/index';

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
    name: 'modal',
    disableClose: false,
  };

  handleClick = () => {
    this.close();
  };

  handleModalRefCb = el => {
    this.el = el;
    this.reCalculate();
  };

  handleModalClick = cb => e => {
    e.stopPropagation();
    callfunc(cb, [e]);
  };

  close() {
    popupDispatch({
      type: 'dom/closeOne',
      params: {
        popup: this,
      },
    });
  }

  reCalculate = () => {
    setImmediate(() => {
      if (this.el) {
        const domInfo = getOffset(this.el);
        if (domInfo) {
          const domHalfHeight = domInfo.h / 2;
          let marginTop = Math.floor(1 - domHalfHeight);
          const {scrollNodeHeight} = getScrollInfo();
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
            get(orgModalStyle, ['marginTop']) !== marginTop ||
            get(orgMaskStyle, ['justifyContent']) !== maskStyle.justifyContent
          ) {
            this.setState(({modalStyle}) => {
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

  lockScreen() {
    const {modal, toPool} = this.props;
    const oDoc = doc();
    win().addEventListener('resize', this.reCalculate);
    const body = oDoc.body;
    const addBodyClass = mixClass(
      body.className,
      {
        scrolling: this.props.maskScroll,
      },
      'dimmable',
      'dimmed',
    );
    if (!toPool) {
      body.className = addBodyClass;
    }
  }

  resetBodyClassName() {
    const {toPool} = this.props;
    const body = doc().body;
    if (!toPool && body) {
      let bodyClass = body.className;
      bodyClass = removeClass(bodyClass, 'dimmable');
      bodyClass = removeClass(bodyClass, 'scrolling');
      bodyClass = removeClass(bodyClass, 'dimmed');
      body.className = bodyClass;
    }
  }

  detach() {
    /**
     * closeCallback will deprecate
     */
    if ( hasClass( get(doc(), ['body', 'className']), 'dimmed' ) ) {
      const {closeCallback, onClose} = this.props;
      callfunc(onClose || closeCallback);
    }

    // do detach
    this.resetBodyClassName();
    win().removeEventListener('resize', this.reCalculate);
  }

  componentWillUnmount() {
    this.detach();
  }

  render() {
    const {
      hasError,
      show: stateShow,
      modalStyle: stateModalStyle,
      maskStyle: stateMaskStyle,
    } = this.state;
    if (hasError) {
      return null;
    }
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
      toPool,
      closeEl,
      /**
       * closeCallback will deprecate
       */
      closeCallback,
      onClose,
      className,
      contentClassName,
      ...others
    } = this.props;
    let containerClick = null;
    let thisCloseEl;
    let content = '';
    if (stateShow) {
      this.lockScreen();
      if (!closeEl) {
        if (!disableClose) {
          containerClick = this.handleClick;
        }
      } else {
        thisCloseEl = build(closeEl)({
          onClick: this.handleClick,
          key: 'close',
          style: {
            zIndex: 1001,
            position: 'fixed',
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
            className={mixClass({scrolling: scrolling}, modalClassName)}
            show={stateShow}
            contentStyle={contentStyle}
          />
        );
      }
      if (isValidElement(thisModal)) {
        const orgModalOnClick = get(thisModal, ['props', 'onClick']);
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
            false,
          ),
        });
      }
      if (mask) {
        const thisStyles = arrayMerge(
          reactStyle(
            {...Styles.background, ...style, ...stateMaskStyle},
            false,
            false,
          ),
          styles,
        );
        content = (
          <Dimmer
            className={mixClass('page modals', contentClassName)}
            show={stateShow}
            center={false}
            styles={thisStyles}
            styleOrder={1}
            onClick={containerClick}
            key="modals">
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
      <SemanticUI className={className}>
        <Animate {...{appear, enter, leave}}>{content}</Animate>
        {thisCloseEl}
      </SemanticUI>
    );
  }
}

const PopupModalContainer = connect(
  PopupModal,
  {withProps: true},
);

export default PopupModalContainer;

const Styles = {
  flexAlignTop: {
    justifyContent: 'flex-start',
    WebkitBoxPack: 'start',
    MsFlexPack: 'start',
  },
  background: {
    overflow: 'auto',
    boxSizing: 'border-box',
  },
  modal: {
    boxSizing: 'border-box',
    right: 'auto',
    bottom: 'auto',
    transition: ['all 500ms ease'],
  },
};
