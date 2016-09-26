import React, {Component} from 'react'; 

import {
    assign,
    Dimmer
} from 'react-atomic-molecule';

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
        const props = this.props;
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
                        props.fullScreenStyle
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
