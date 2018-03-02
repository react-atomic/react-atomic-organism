require("setimmediate");
import React from 'react'; 
import { connect } from 'reshow-flux';
import {
    reactStyle,
    mixClass,
    Dimmer,
    SemanticUI
} from 'react-atomic-molecule';
import Animate from 'organism-react-animate';
import getScrollInfo from 'get-scroll-info'; 
import getOffset from 'getoffset';
import get from 'get-object-value';
import arrayMerge from 'array.merge';

import { PopupOverlay } from '../molecules/PopupOverlay';
import { popupDispatch } from '../../src/index';

let originBodyStyle;
if ('undefined' !== typeof document) {
    originBodyStyle = document.body.style.overflow;
}

/**
 * if you need trace show: true
 * it extend from PopupOverlay
 */
class PopupModal extends PopupOverlay
{
    static defaultProps = {
        mask: true, 
        maskScroll: false,
        scrolling: false,
        name: 'modal',
        disableClose: false,
    };

    handleClick = () =>
    {
        popupDispatch({
            type: 'dom/closeOne',
            params: {
                popup: this 
            }
        });
        if (typeof this.props.closeCallBack === 'function') {
            this.props.closeCallBack();
        }
    }

    reCalculate = () =>
    {
        if (this.el) {
            const domInfo = getOffset(this.el);
            if (domInfo) {
                const domHalfHeight = (domInfo.bottom - domInfo.top) / 2;
                let marginTop;
                if (domInfo.top - domHalfHeight > 0) {
                    marginTop = Math.floor(1-domHalfHeight);
                } else {
                    marginTop = Math.floor(1-domInfo.top + 10);
                }
                const scrollInfo = getScrollInfo(); 
                let maskStyle = {};
                if (domInfo.h > scrollInfo.scrollNodeHeight) {
                    maskStyle = Styles.flexAlignTop; 
                }
                const {modalStyle: orgModalStyle, maskStyle: orgMaskStyle} = this.state;
                if (get(orgModalStyle, ['marginTop']) !== marginTop ||
                    get(orgMaskStyle, ['justifyContent']) !== maskStyle.justifyContent
                ) {
                    this.setState(({modalStyle})=>{
                        modalStyle = {
                            ...modalStyle,
                            marginTop
                        };
                        return {
                            maskStyle,
                            modalStyle
                        };
                    });
                }
            }
        }
    }

    lockScreen()
    {
        const {modal, toPool} = this.props; 
        if (!modal) {
            window.addEventListener('resize', this.reCalculate);
        }
        if (this.props.maskScroll) {
            this.resetBodyStyle();
        } else {
            if (!toPool && 'undefined' !== typeof document) {
                document.body.style.overflow = 'hidden';
            }
        }
    }

    resetBodyStyle()
    {
        const {toPool} = this.props; 
        if (!toPool && 'undefined' !== typeof document) {
            document.body.style.overflow = originBodyStyle;
        }
    }

    detach()
    {
        const {modal} = this.props; 
        this.resetBodyStyle();
        if (!modal) {
            window.removeEventListener('resize', this.reCalculate);
        }
    }

    componentWillUnmount()
    {
        this.detach();
    }

    render()
    {
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
            closeCallBack,
            className,
            ...others
        } = this.props;
        const {
            show: stateShow,
            modalStyle: stateModalStyle,
            maskStyle: stateMaskStyle
        } = this.state;
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
                thisCloseEl = React.cloneElement(
                     closeEl,
                     {
                        onClick: this.handleClick,
                        key: 'close',
                        style: {
                            zIndex:1001,
                            position: 'fixed',
                            ...closeEl.props.style
                        }
                     }
                );
            }
            let thisStyles = arrayMerge(
                reactStyle({ ...Styles.background, ...style, ...stateMaskStyle }, null, false),
                styles
            );
            let thisModal = modal;
            if ('undefined' === typeof thisModal) {
                thisModal = (
                    <Dimmer 
                        {...others}
                        isModal="true" 
                        styles={reactStyle({
                            ...Styles.modal,
                            ...modalStyle,
                            ...stateModalStyle
                        }, null, false)}
                        className={mixClass( {scrolling: scrolling}, modalClassName )}
                        refCb={ el=>{
                            this.el=el;
                            setImmediate(()=>this.reCalculate());
                        }}
                        show={stateShow}
                    />
                );
            }
            if (mask) {
                content = (
                    <Dimmer
                        className="page modals"
                        show={stateShow}
                        center={false}
                        styles={thisStyles}
                        styleOrder={1}
                        onClick={containerClick}
                        key='modals'
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
            <SemanticUI className={className}>
                <Animate {...{ appear, enter, leave }}>
                    {content}
                </Animate>
                {thisCloseEl}
            </SemanticUI>
        );
    }
}

const PopupModalContainer = connect(
    PopupModal,
    { withProps:true }
);

export default PopupModalContainer;

const Styles = {
    flexAlignTop: {
        justifyContent: 'flex-start',
        WebkitBoxPack: 'start',
        MsFlexPack: 'start'
    },
    background: {
        overflow: 'auto'
    },
    modal: {
        boxSizing: 'border-box',
        right: 'auto',
        bottom: 'auto',
        transition: ['all 500ms ease']
    }
};
