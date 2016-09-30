import React, {Component} from 'react'; 

import {
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
        const {fullScreenStyle, ...props} = this.props;
        return (
            <Dimmer
                className="page"
                show={true}
                style={props.style}
                onClick={this.handleClick.bind(this)}
            >
                <Dimmer 
                    {...props}
                    fullScreen="true" 
                    style={assign(
                        {},
                        Styles.fullScreen,
                        fullScreenStyle
                    )}
                />
            </Dimmer>
        );
    }
}

export default PopupModal;

const Styles = {
    fullScreen: {
        boxSizing: 'border-box'
    }
};
