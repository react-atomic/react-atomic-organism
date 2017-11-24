require("setimmediate");
import React, {createElement, cloneElement, PureComponent} from 'react';
import {
    lazyInject,
    Header,
    Content,
    Button,
    Progress,
} from 'react-atomic-molecule';
import {
    popupDispatch,
    PopupModal,
} from 'organism-react-popup';
import query from 'css-query-selector';
import getOffset from 'getoffset';
import {isFixed} from 'get-window-offset';
import {removeClass} from 'class-lib';
import {percent} from 'topercent';

import Beacon from '../organisms/Beacon';
import Tooltip from '../organisms/Tooltip';
import LightBox from '../organisms/LightBox';
import Highlight from '../organisms/Highlight';
import StepNumber from '../organisms/StepNumber';

const keys = Object.keys;
let injects;

const GROUP_KEY = 'react-onboarding';
const classCleanZIndex = GROUP_KEY+'-clean-zindex';
const classShowEl = GROUP_KEY+'-show-el';
const lightBoxPadding = 5;

const getStyle = (el, key) =>
{
    return window.getComputedStyle(el,null).getPropertyValue(key);
}

const cleanClass = (className) =>
{
    const allEl = query.all('.'+className);
    allEl.forEach( el => {
        el.className = removeClass(
            el.className,
            className
        );
    });
}


const addCleanZIndex = (node) =>
{
    let thisParent = node;
    let isFindFixedParent;
    while(thisParent.nodeName != 'BODY') {
        const zIndex = getStyle(thisParent, 'z-index');
        if (zIndex && 'auto' !== zIndex) {
            const position =  getStyle(thisParent, 'position');
            if ('fixed' !== position) {
                thisParent.className += ' '+classCleanZIndex;
            } else if ('fixed' === position) {
                if (!isFindFixedParent) {
                    isFindFixedParent = true;
                    thisParent.className += ' '+classShowEl;
                }
            }
        }
        thisParent = thisParent.parentNode;
    }
}

const getFloatStyles = (node, padding) =>
{
    if (!padding) {
       padding = 0;
    }
    const pos = getOffset(node);
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

class Step extends PureComponent
{
    componentDidMount() 
    {
        this.setFloat();
    }

    componentDidUpdate(prevProps, prevState)
    {
        this.setFloat();
    }

    componentWillUnmount()
    {
        this.handleFinish();
    }

    constructor(props)
    {
        super(props);
        const InjectStyles = {
            modal: [{
                background: [
                    '-webkit-radial-gradient(center,ellipse cover,rgba(0,0,0,0.4) 0,rgba(0,0,0,0.9) 100%)',
                    'radial-gradient(center,ellipse cover,rgba(0,0,0,0.4) 0,rgba(0,0,0,0.9) 100%)'
                ] 
            }],
            fixed: [
                {
                    position: 'fixed !important'
                },
                '.react-onboarding-fixed',
                'react-onboarding-fixed'
            ],
            cleanZIndex: [
                {
                    zIndex: 'auto !important'
                },
                '.'+classCleanZIndex,
                classCleanZIndex
            ],
            showEl: [
                {
                    zIndex: 99999 
                },
                '.'+classShowEl,
                classShowEl
            ],
            progress: [
                {
                    position: 'absolute !important',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2
                }
            ]
        };
	injects = lazyInject (
	    injects,
	    InjectStyles
	);
    }

    setLightBox()
    {
        const { light, hideLightBox } = this.props;
        if (light) {
            const lightEl = query.one(light);
            const isSetFixed = isFixed(lightEl);
            if (lightEl) {
                let lightElStyles;
                if (isSetFixed) {
                    lightElStyles = injects.fixed;
                }
                addCleanZIndex(lightEl);
                if (!hideLightBox) {
                    popupDispatch({
                        type: 'dom/update',
                        params: {
                            popup: <LightBox
                                style={getFloatStyles(lightEl, lightBoxPadding)} 
                                styles={lightElStyles}
                            /> 
                        }
                    });
                }
                this.setHighlights(isSetFixed);
                this.setNumbers(isSetFixed);
                this.setBeacons(isSetFixed);
                setTimeout( () =>{
                    window.scrollTo(0,0);
                });
                this._float = cloneElement(
                    this._float,
                    {
                        targetEl: lightEl,
                        isSetFixed
                    }
                );
            }
        }
    }

    setBeacons(isSetFixed)
    {
        const { beacons } = this.props;
        if (!beacons) {
            return;
        }
        let styles;
        if (isSetFixed) {
            styles = injects.fixed;
        }
        beacons.forEach( (beacon, key) => {
            const target = query.one(beacon);
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: (
                        <Beacon
                            name={'react-onboarding-beacon'+key}
                            key={key}
                            targetEl={target}
                            styles={styles}
                        />
                    )
                }
            });
        });
    }

    setNumbers(isSetFixed)
    {
        const { numbers } = this.props;
        if (!numbers) {
            return;
        }
        let styles;
        if (isSetFixed) {
            styles = injects.fixed;
        }
        keys(numbers).forEach( key => {
            const target = query.one(numbers[key]);
            const pos = getOffset(target);
            const top = pos.top;
            const left = pos.left;
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: (
                        <StepNumber
                            name={'react-onboarding-step-number'+key}
                            key={key}
                            locTop={top}
                            locLeft={left}
                            styles={styles}
                        >
                        {key}
                        </StepNumber>
                    )
                }
            });
        });
    }

    setHighlights(isSetFixed)
    {
        const { highlights } = this.props;
        if (!highlights) {
            return;
        }
        let hlElStyles;
        if (isSetFixed) {
            hlElStyles = injects.fixed;
        }
        highlights.forEach( (hl, key) => {
            const target = query.one(hl);
            if (target) {
                popupDispatch({
                    type: 'dom/update',
                    params: {
                        popup: <Highlight
                            name={'react-onboarding-highlight'+key}
                            key={key}
                            style={getFloatStyles(target)} 
                            styles={hlElStyles}
                        /> 
                    }
                });
            }
        
        });
    }

    setFloat()
    {
        const { before } = this.props;
        setTimeout( ()=>{
            if (before) {
                before.call(this);
            }
            this.setLightBox();
            setImmediate(()=>{ //locate after this.setLightBox()
                popupDispatch({
                    type: 'dom/update',
                    params: {
                        popup: this._float 
                    }
                });
            });
        }, 1500); 
    }

    handleFinish()
    {
        const { finish } = this.props;
        popupDispatch({
            type: 'dom/closeGroup',
            params: {
                group: GROUP_KEY
            }
        });
        if (finish) {
            finish.call(this);
        }
        cleanClass(classCleanZIndex);
        cleanClass(classShowEl);
        console.log('finish');
    }

    render()
    {
        const { header, content, actions, type, next, style, stepIndex, total, I18N } = this.props;
        const stepDisplayIndex = stepIndex + 1;
        let floatEl;
        let name;
        switch (type) {
            case 'modal':
                floatEl = PopupModal;
                name = GROUP_KEY+'-modal';
                break;
            case 'tooltip':
            default:
                floatEl = Tooltip;
                name = GROUP_KEY+'-tooltip';
                break;
        }
        const child = [<Progress styles={injects.progress} percent={percent(stepDisplayIndex / total)} className="attached green"/>];
        if (header) {
            child.push(<Header>{header}</Header>);
        }
        if (content) {
            child.push(<Content>{content}</Content>);
        }
        if (actions) {
            const buttons = [];
            actions.forEach( (action, key) => {
                let onClick;
                let actionText = action.text;
                const thisAction = action.action;
                if ('function' === typeof thisAction) {
                    onClick = thisAction;
                } else {
                    switch (thisAction) {
                        case 'next':
                            onClick = next;
                            const isLast = stepDisplayIndex >= total;
                            if (!actionText) {
                                if (isLast) {
                                    actionText = I18N.done;
                                } else {
                                    actionText = I18N.next+' '+ stepDisplayIndex+ '/'+ total;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
                buttons.push((
                    <Button 
                        key={key}
                        onClick={(e)=>{
                            e.stopPropagation();
                            onClick(e);
                        }}
                        className="right positive"
                    >
                        {actionText}
                    </Button>
                )); 
            });
            child.push(<div className="actions">{buttons}</div>);

        }
        this._float = createElement(
            floatEl,
            {
                name,
                modalStyle: style,
                className: 'mini',
                center: false,
                group: GROUP_KEY,
                style: {
                    zIndex: 9999,
                },
		styles: injects.modal 
            },
            child
        );
        return null;
    }
}

export default Step;

