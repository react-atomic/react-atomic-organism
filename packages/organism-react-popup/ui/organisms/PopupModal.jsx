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

    resize = () =>
    {
        if (this.el) {
            const scrollInfo = getScrollInfo();
            const domInfo = getOffset(this.el);
            if (domInfo) {
                const domHalfHeight = (domInfo.bottom - domInfo.top) / 2;
                if (domInfo.top - domHalfHeight > scrollInfo.top) {
                    this.el.style.marginTop = (1-domHalfHeight)+'px';
                }
            }
        }
    }

    lockScreen()
    {
        if (this.props.maskScroll) {
            this.detach();
        } else {
            if ('undefined' !== typeof document) {
                document.body.style.overflow = 'hidden';
            }
        }
    }

    detach()
    {
        if ('undefined' !== typeof document) {
            document.body.style.overflow = originBodyStyle;
        }
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount()
    {
        this.detach();
        window.removeEventListener('resize', this.resize);
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
            closeEl,
            closeCallBack,
            className,
            ...others
        } = this.props;
        let containerClick = null;
        let thisCloseEl;
        let thisStyles = [];
        if (styles) {
            thisStyles.push(styles);
        }
        let content = '';
        const stateShow = this.state.show;
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
                        }, null, false)}
                        className={mixClass( {scrolling: scrolling}, className )}
                        refCb={ el=>{
                            this.el=el;
                            setImmediate(()=>this.resize());
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
