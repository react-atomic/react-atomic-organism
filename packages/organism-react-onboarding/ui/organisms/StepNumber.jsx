import React from 'react';
import getOffset from 'getoffset';
import {mixClass, reactStyle, Circular} from 'react-atomic-molecule';
import {PopupFloatEl} from 'organism-react-popup';

const GROUP_KEY = 'react-onboarding';
class StepNumber extends PopupFloatEl
{
    static defaultProps = {
        name: GROUP_KEY+'-step-number',
        group: GROUP_KEY,
        size: 25
    };

    calPos = () =>
    {
        const {size, targetEl} = this.props; 
        const pos = getOffset(targetEl);
        const locSize = (size / 2) * 1.75;
        let top = pos.top - locSize;
        let left = pos.left - locSize;
        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }
        const width = size;
        const height = size;
        const result = {
            top,
            left,
            width,
            height
        };
        return result;
    }

    renderOverlay(props)
    {
        const {targetEl, styles, style, size, ...others} = props;
        const thisStyles = [
            reactStyle({
                    lineHeight: size +'px',
                    ...Styles.container,
                    ...style,
            }, null, false),
            styles
        ];
        const classes = mixClass(
            props.name,
            'button'
        );
        return (
            <Circular
                {...others}
                className={classes}
                styles={thisStyles}
            />
        );
    }
}

const Styles = {
    container: {
        position: 'absolute',
        zIndex: 999999,
        backgroundColor: 'rgba(255,0,0,.9)',
        padding: 0,
        border: '3px solid #fff',
        boxSizing: 'content-box',
        fontSize: '1.5rem',
        color: '#fff'
    }
};

export default StepNumber;
