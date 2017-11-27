import React from 'react';
import {reactStyle, SemanticUI} from 'react-atomic-molecule';
import {PopupFloatEl} from 'organism-react-popup';
import getOffset from 'getoffset';

const GROUP_KEY = 'react-onboarding';
class LightBox extends PopupFloatEl
{
    static defaultProps = {
        className: GROUP_KEY+'-light-box',
        name: GROUP_KEY+'-light-box',
        group: GROUP_KEY,
        padding: 5
    };

    calPos = () =>
    {
        const {targetEl, padding} = this.props;
        const pos = getOffset(targetEl);
        const width = pos.right - pos.left + (padding * 2);
        const height = pos.bottom - pos.top + (padding * 2);
        const top = pos.top - padding;
        const left = pos.left - padding;
        return {
            top,
            left,
            width,
            height
        };
    }

    renderOverlay(props)
    {
        const {styles, style, ...others} = props;
        const thisStyles = [
            reactStyle({
                ...Styles.container,
                ...style
            }, null, false),
            styles
        ];
        return (
            <SemanticUI
                {...others}
                className={props.name}
                styles={thisStyles}
            />
        );
    }
}

const Styles = {
    container: {
        borderRadius: 4,
        position: 'absolute',
        boxShadow: ['0 2px 15px rgba(0,0,0,.4)'],
        zIndex: 99998,
        backgroundColor: 'rgba(255,255,255,.9)'
    }
};

export default LightBox;
