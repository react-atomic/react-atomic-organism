import React, {Component} from 'react'; 

import {
    assign,
    Dimmer
} from 'react-atomic-molecule';

let originBodyStyle;
if (document.body) {
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
        const {fullScreenStyle, ...props} = this.props;
        if (this.state.show && document.body) {
            document.body.style.overflow = 'hidden';
        } else if (document.body) {
            document.body.style.overflow = originBodyStyle;
        }
        return (
            <Dimmer
                className="page"
                show={this.state.show}
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
