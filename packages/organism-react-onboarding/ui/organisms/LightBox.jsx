import React from 'react';
import {reactStyle, SemanticUI} from 'react-atomic-molecule';
import {PopupOverlay} from 'organism-react-popup';

const GROUP_KEY = 'react-onboarding';
class LightBox extends PopupOverlay
{
    static defaultProps = {
        name: GROUP_KEY+'-light-box',
        group: GROUP_KEY
    };

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
