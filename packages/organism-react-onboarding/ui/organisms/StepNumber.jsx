import React from 'react';
    
import {mixClass, reactStyle, Circular} from 'react-atomic-molecule';
import {PopupOverlay} from 'organism-react-popup';

const GROUP_KEY = 'react-onboarding';
class StepNumber extends PopupOverlay
{
    static defaultProps = {
        name: GROUP_KEY+'-step-number',
        group: GROUP_KEY,
        size: 25
    };

    renderOverlay(props)
    {
        const {locTop, locLeft, styles, style, size, ...others} = props;
        const halfSize = size / 2;
        let top = locTop - halfSize;
        let left = locLeft - halfSize;
        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }
        const myStyle = {
            top,
            left,
            width: size,
            height: size,
            lineHeight: size +'px'
        };
        const thisStyles = [
            reactStyle({
                    ...Styles.container,
                    ...style,
                    ...myStyle
            }, null, false),
            styles
        ];
        const classes = mixClass(
            props.name,
            'button'
        );
        return (
            <Circular
                {...props}
                className={classes}
                styles={thisStyles}
            />
        );
    }
}

const Styles = {
    container: {
        position: 'absolute',
        zIndex: 99999,
        backgroundColor: 'rgba(255,0,0,.9)',
        padding: 0,
        border: '3px solid #fff',
        boxSizing: 'content-box',
        fontSize: '1.5rem',
        color: '#fff'
    }
};

export default StepNumber;
