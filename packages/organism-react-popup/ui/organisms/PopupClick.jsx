import React, {Component} from 'react'; 

import {
    SemanticUI,
} from 'react-atomic-molecule';

import {
    popupDispatch,
    PopupOverlay
} from '../../src/index';

class PopupClick extends Component
{
    handleClick = () =>
    {
        const props = this.props;
        let popup;
        if (React.isValidElement(props.popup)) {
            popup = props.popup;
        } else if (typeof props.popup === 'function') {
            popup = props.popup();
        } else {
            popup = <PopupOverlay>{props.popup}</PopupOverlay>; 
        }

        popupDispatch({
            type: 'dom/update',
            params: {
                popup: popup 
            }
        });
        if (typeof props.callBack === 'function') {
            props.callBack(popup); 
        }
    }

    render()
    {
        let {container, popup, callBack, ...reset} = this.props;
        if (!React.isValidElement(container)) {
            container = <SemanticUI />
        }
        const style = {...reset.style, ...Styles.container};
        let props = {
            ...reset,
            onClick:this.handleClick,
            style: style
        };
        return React.cloneElement(
             container,
             props
        );
    }
}

export default PopupClick;

const Styles = {
    container: {
        cursor: 'pointer'
    }
};
