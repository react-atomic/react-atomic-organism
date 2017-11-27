import React from 'react';
import getOffset from 'getoffset';
import {reactStyle, SemanticUI} from 'react-atomic-molecule';
import {PopupFloatEl} from 'organism-react-popup';

const GROUP_KEY = 'react-onboarding';
const GROUP_FLOATS = 'react-onboarding-floats';

class Highlight extends PopupFloatEl
{
    static defaultProps = {
        className: GROUP_KEY+'-highlight',
        name: GROUP_KEY+'-highlight',
        group: [GROUP_KEY, GROUP_FLOATS],
        isFollowTransform: true,
    };

    calPos = () =>
    {
        const {targetEl} = this.props;
        const pos = getOffset(targetEl);
        const width = pos.w;
        const height = pos.h;
        const top = pos.top;
        const left = pos.left;
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
        const {styles, style, name, ...others} = props;
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
                className={name}
                styles={thisStyles}
            />
        );
    }

}

export default Highlight;

const Styles = {
    container: {
        position: 'absolute',
        borderRadius: 4,
        border: '2px solid rgb(255, 157, 126)',
        boxShadow: ['0px 0px 10px 6px rgba(255, 155, 141, 0.57)'],
        zIndex: 99999,
        pointerEvents: 'none'
    }
};

