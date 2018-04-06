import React, {PureComponent} from 'react';
import { lazyInject, SemanticUI } from 'react-atomic-molecule';
import getOffset from 'getoffset';
import {
    PopupModal,
    PopupFloatEl,
    DisplayPopupEl
} from 'organism-react-popup';
import {isFixed} from 'get-window-offset';

import LightBox from '../molecules/LightBox';
import cleanZIndex from '../../src/cleanZIndex';
import cleanClass from '../../src/cleanClass';
import showEl from '../../src/showEl';

let injects;
let nodeId = 0;

class SpotlightEl extends PureComponent
{
    componentWillUnmount()
    {
        cleanClass('react-spotlight-show-el');
        cleanClass('react-spotlight-relative');
        cleanClass('react-spotlight-clean-zindex');
    }

    render()
    {
        const {name, targetEl, ...props} = this.props;
        cleanZIndex(targetEl);
        let thisStyles = [injects.lightBox];
        const isFixedNode = isFixed(targetEl);
        showEl(targetEl);
        if (isFixedNode) {
           thisStyles.push(injects.fixed);
        }
        const nodePos = getOffset(targetEl);
        return (
            <SemanticUI {...{key:name, name}}>
                <PopupModal {...props}
                    name={name}
                    modal={null}
                    styles={injects.modal}
                />
                <LightBox {...{
                    wh:[nodePos.w, nodePos.h],
                    targetEl,
                    name,
                    styles: thisStyles
                }}/>
            </SemanticUI>
        );
    }
}

class Spotlight extends PureComponent
{
    constructor(props)
    {
        super(props);
        injects = lazyInject (
            injects,
            InjectStyles
        );
    }

    render()
    {
        const {targetEl, ...props} = this.props;
        if (!targetEl) {
            console.warn(['Need assign targetEl', targetEl]);
            return null;
        }
        if (!targetEl.id) {
            targetEl.id = 'spotlight-el-'+nodeId; 
            nodeId++;
        }
        return (
            <DisplayPopupEl>
                <SpotlightEl {...{
                    ...props,
                    targetEl,
                    name: targetEl.id
                }}/>
            </DisplayPopupEl>
        );
    }
}

export default Spotlight;

const InjectStyles = { 
    lightBox: [{
        transitionDuration: '500ms',
        transitionProperty: 'all'
    }],
    modal: [{
        background: [
            '-webkit-radial-gradient(center,ellipse cover,rgba(0,0,0,0.4) 0,rgba(0,0,0,0.9) 100%)',
            'radial-gradient(center,ellipse cover,rgba(0,0,0,0.4) 0,rgba(0,0,0,0.9) 100%)'
        ],
        height: '200%'
    }],
    fixed: [
        {
            position: 'fixed !important'
        },
        '.react-spotlight-fixed',
        'react-spotlight-fixed'
    ],
    showEl: [
        {
            zIndex: '99999 !important'
        },
        '.react-spotlight-show-el',
        'react-spotlight-show-el'
    ],
    relative: [
        {
            position: 'relative !important'
        },
        '.react-spotlight-relative',
        'react-spotlight-relative' 
    ],
};
