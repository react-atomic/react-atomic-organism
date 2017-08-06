import React from 'react'; 
import { Container } from 'reduce-flux';
import {
    mixClass,
    Dimmer,
    SemanticUI
} from 'react-atomic-molecule';
import Animate from 'organism-react-animate';

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

    detach()
    {
        if ('undefined' !== typeof document) {
            document.body.style.overflow = originBodyStyle;
        }
    }

    componentWillUnmount()
    {
        this.detach();
    }

    render()
    {
        let {
            scrolling,
            appear,
            enter,
            leave,
            fullScreenStyle,
            closeEl,
            closeCallBack,
            ...props
        } = this.props;
        let containerClick = null;
        let content;
        if (this.state.show) {
            if ('undefined' !== typeof document) {
                document.body.style.overflow = 'hidden';
            }
            if (!closeEl) {
                containerClick = this.handleClick;
            } else {
                closeEl = React.cloneElement(
                     closeEl,
                     {
                        onClick: this.handleClick,
                        key: 1,
                        style: {
                            zIndex:1001,
                            position: 'fixed',
                            ...closeEl.props.style
                        }
                     }
                );
            }
            content = (
                <Dimmer
                    className="page modals"
                    show={true}
                    center={false}
                    style={{ ...Styles.container, ...props.style }}
                    onClick={containerClick}
                    key={0}
                >
                    <Dimmer 
                        {...props}
                        fullScreen="true" 
                        style={{
                            ...Styles.fullScreen,
                            ...fullScreenStyle
                        }}
                        className={mixClass({scrolling: scrolling},props.className)}
                    />
                </Dimmer>
            );
        } else {
            this.detach();
            closeEl = null;
        }

        return (
            <Animate {...{
                appear: appear,
                enter: enter,
                leave: leave
            }}>
            {content}
            {closeEl}
            </Animate>
        );
    }
}

PopupModal.defaultProps = {
    scrolling: false,
    name: 'modal'
};

const PopupModalContainer = Container.create(
    PopupModal,
    { withProps:true }
);

export default PopupModalContainer;

const Styles = {
    container: {
        overflow: 'auto'
    },
    fullScreen: {
        boxSizing: 'border-box'
    }
};
