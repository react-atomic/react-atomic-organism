import React, {Component} from 'react'; 

import {
    mixClass,
    assign,
    Dimmer
} from 'react-atomic-molecule';

let originBodyStyle;
if ('undefined' !== typeof document) {
    originBodyStyle = document.body.style.overflow;
}

class PopupModal extends Component
{
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
             show: 0 
        });
    }

   componentWillReceiveProps(newProps) {
        this.setState({show: newProps.show});
   }

    render()
    {
        if (this.state.show) {
            if ('undefined' !== typeof document) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            if ('undefined' !== typeof document) {
                document.body.style.overflow = originBodyStyle;
            }
            return null;
        }
        let {fullScreenStyle, closeEl, ...props} = this.props;
        
        let containerClick = null;
        if (!closeEl) {
            containerClick = this.handleClick.bind(this);
        } else {
            closeEl = React.cloneElement(
                 closeEl,
                 {
                    onClick:this.handleClick.bind(this),
                    key: 1 
                 }
            );
        }

        return (
            <Dimmer
                className="page modals"
                show={true}
                center={false}
                style={assign({}, Styles.container, props.style)}
                onClick={containerClick}
            >
                <Dimmer 
                    {...props}
                    key={0}
                    fullScreen="true" 
                    style={assign(
                        {},
                        Styles.fullScreen,
                        fullScreenStyle
                    )}
                    className={mixClass('scrolling',props.className)}
                />
                {closeEl}
            </Dimmer>
        );
    }
}

export default PopupModal;

const Styles = {
    container: {
        overflow: 'auto'
    },
    fullScreen: {
        boxSizing: 'border-box'
    }
};
