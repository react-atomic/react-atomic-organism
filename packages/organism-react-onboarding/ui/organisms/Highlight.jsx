import React from 'react';
import {reactStyle, SemanticUI} from 'react-atomic-molecule';
import {PopupOverlay} from 'organism-react-popup';

const GROUP_KEY = 'react-onboarding';
class Highlight extends PopupOverlay
{
    static defaultProps = {
        name: GROUP_KEY+'-highlight',
        group: GROUP_KEY
    };

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

