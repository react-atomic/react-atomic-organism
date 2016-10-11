import React, {Component} from 'react'; 
import { Container } from 'flux/utils';
import {
    mixClass,
    assign,
    Dimmer,
    SemanticUI
} from 'react-atomic-molecule';
import Animate from 'organism-react-animate';
import {
    popupStore
} from '../../src/index';

let originBodyStyle;
if ('undefined' !== typeof document) {
    originBodyStyle = document.body.style.overflow;
}

class PopupModal extends Component
{
    static getStores()
    {
        return [popupStore];
    }

   static calculateState(prevState,props)
   {
        const state = popupStore.getState();
        const key = props.name;
        let show; 
        if (key) {
            show = state.get('node').get(key);
        } else {
            show = state.get('show');
        }
        return {
            show: show 
        }
   }

    constructor(props) 
    {
        super(props);
        this.state = {
             show: props.show
        };
    }

    handleClick()
    {
        this.setState({
             show: false 
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

    componentWillReceiveProps(newProps) {
        this.setState({show: newProps.show});
    }

    render()
    {
        let {
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
                containerClick = this.handleClick.bind(this);
            } else {
                closeEl = React.cloneElement(
                     closeEl,
                     {
                        onClick: this.handleClick.bind(this),
                        key: 1,
                        style: assign({},{
                            zIndex:1001,
                            position: 'fixed',
                        },closeEl.props.style)
                     }
                );
            }
            content = (
                <Dimmer
                    className="page modals"
                    show={true}
                    center={false}
                    style={assign({}, Styles.container, props.style)}
                    onClick={containerClick}
                    key={0}
                >
                    <Dimmer 
                        {...props}
                        fullScreen="true" 
                        style={assign(
                            {},
                            Styles.fullScreen,
                            fullScreenStyle
                        )}
                        className={mixClass('scrolling',props.className)}
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
