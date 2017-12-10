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

import { PopupOverlay } from '../organisms/PopupOverlay';
import {
    popupDispatch
} from '../../src/index';

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
            const scrollInfo = getScrollInfo();
            const domInfo = getOffset(this.el);
            if (domInfo) {
                const domHalfHeight = (domInfo.bottom - domInfo.top) / 2;
                if (domInfo.top - domHalfHeight > scrollInfo.top) {
                    const marginTop = Math.floor((1-domHalfHeight))+'px';
                    if (get(this, ['state', 'modalStyle', 'marginTop'])!==marginTop) {
                        this.setState(({modalStyle})=>{
                            return {
                                modalStyle: {
                                    ...modalStyle,
                                    marginTop
                                }
                            };
                        });
                    }
                }
            }
        }
    }

    lockScreen()
    {
        const {modal} = this.props; 
        if (!modal) {
            window.addEventListener('resize', this.reCalculate);
        }
        if (this.props.maskScroll) {
            this.resetBodyStyle();
        } else {
            if ('undefined' !== typeof document) {
                document.body.style.overflow = 'hidden';
            }
        }
    }

    resetBodyStyle()
    {
        if ('undefined' !== typeof document) {
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
            modalStyle,
            modal,
            mask,
            maskScroll,
            closeEl,
            closeCallBack,
            className,
            ...others
        } = this.props;
        const {
            show: stateShow,
            modalStyle: stateModalStyle
        } = this.state;
        let containerClick = null;
        let thisCloseEl;
        let thisStyles = [];
        if (styles) {
            thisStyles.push(styles);
        }
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
            thisStyles.push(reactStyle({ ...Styles.container, ...style },null, false)); 
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
                        className={mixClass( {scrolling: scrolling}, className )}
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
            <SemanticUI>
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
    background: {
        overflow: 'auto'
    },
    modal: {
        boxSizing: 'border-box',
        right: 'auto',
        bottom: 'auto'
    }
};
