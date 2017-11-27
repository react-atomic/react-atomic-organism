require("setimmediate");
import React, {createElement, cloneElement, PureComponent} from 'react';
import {
    lazyInject,
    Header,
    Content,
    Button,
    Progress,
    SemanticUI
} from 'react-atomic-molecule';
import {
    popupDispatch,
    PopupModal,
} from 'organism-react-popup';
import query from 'css-query-selector';
import getOffset from 'getoffset';
import getStyle from 'get-style';
import getScrollInfo from 'get-scroll-info';
import {isFixed} from 'get-window-offset';
import {removeClass} from 'class-lib';
import {percent} from 'topercent';
import scroll from 'smooth-scroll-to';

import Beacon from '../organisms/Beacon';
import Tooltip from '../organisms/Tooltip';
import LightBox from '../organisms/LightBox';
import Highlight from '../organisms/Highlight';
import StepNumber from '../organisms/StepNumber';

const keys = Object.keys;
let injects;

const GROUP_KEY = 'react-onboarding';
const GROUP_FLOATS = 'react-onboarding-floats';
const classCleanZIndex = GROUP_KEY+'-clean-zindex';
const classShowEl = GROUP_KEY+'-show-el';
const classRelative = GROUP_KEY+'-relative';

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
    let thisParent = node.parentNode;
    if (!thisParent) {
        return;
    }
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

class Step extends PureComponent
{
    timerFind;
    timerExecute;

    static defaultProps = {
        delay: 100,
        userScroll: false
    };

    setLightBox(callback, lightEl)
    {
        const { before, hideLightBox } = this.props;
        if (before) {
            before.call(this);
        }
        const isSetFixed = isFixed(lightEl);
        addCleanZIndex(lightEl);
        let lightElStyles;
        if (isSetFixed) {
            lightElStyles = injects.fixed;
        } else {
            // need locate after addCleanZIndex(lightEl)
            lightEl.className += ' '+
                [
                    classShowEl,
                    classRelative
                ].join(' ');
        }
        if (!hideLightBox) {
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: <LightBox
                        wh={[lightEl.offsetWidth, lightEl.offsetHeight]} 
                        targetEl={lightEl}
                        styles={lightElStyles}
                    /> 
                }
            });
        }
        this.setHighlights(isSetFixed);
        this.setNumbers(isSetFixed);
        this.setBeacons(isSetFixed);
        this._float = cloneElement(
            this._float,
            {
                targetEl: lightEl,
                isSetFixed
            }
        );
        callback.call(this);
        return true;
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
            const targets = query.all(hl);
            if (targets.length) {
                targets.forEach( (target, tKey) => {
                    if (!target.offsetWidth || 
                        !target.offsetHeight
                    ) {
                        return;
                    }
                    const thisKey = 'react-onboarding-highlight-'+key+'-'+tKey;
                    popupDispatch({
                        type: 'dom/update',
                        params: {
                            popup: <Highlight
                                wh={[target.offsetWidth, target.offsetHeight]} 
                                name={thisKey}
                                key={thisKey}
                                targetEl={target}
                                styles={hlElStyles}
                            /> 
                        }
                    });
                } );
            }
        });
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
            if (!target.offsetWidth || 
                !target.offsetHeight
            ) {
                return;
            }
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
            if (!target.offsetWidth || 
                !target.offsetHeight
            ) {
                return;
            }
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


    handleScrollTo(lightEl, callback)
    {
        const { scrollTo } = this.props;
        if (!scrollTo) {
            callback.call(this);
            return;
        }
        const lightElPos = getOffset(lightEl);
        const scrollInfo = getScrollInfo();
        const halfH = scrollInfo.scrollNodeHeight / 2;
        scroll(Math.floor(lightElPos.top-halfH), null, null, callback);
    }

    handleNext = () =>
    {
        const { after, next, finish } = this.props;
        let isSuccess = true;
        if (after) {
            isSuccess = after.call(this);
        }
        if (!isSuccess) {
            console.warn('Handle finish failed.');
            return isSuccess;
        }
        if (finish) {
            finish.call(this);
        }
        next();
    }

    setFloat()
    {
        const { type, delay, isBack, before, light, onboardingBefore } = this.props;
        const callback = () =>
        {
            if (onboardingBefore) {
                onboardingBefore();
            }
            setImmediate(()=>{
                if (type !== 'modal') {
                    const lightEl = query.one(light); 
                    if (!lightEl.offsetWidth ||
                        !lightEl.offsetHeight
                    ) {
                        return;
                    }
                }
                popupDispatch({
                    type: 'dom/update',
                    params: {
                        popup: this._float 
                    }
                });
            });
        };
        if (light) {
            let maxTry = 100;
            let tryTime = 0;
            this.timerFind = setInterval(()=>{
                tryTime++;
                const lightEl = query.one(light); 
                if (tryTime > maxTry) {
                    clearInterval(this.timerFind);
                    console.warn('Can not find light element. ['+light+']');
                }
                if (!lightEl) {
                    return;
                }
                clearInterval(this.timerFind);
                let thisDelay = delay;
                if (isBack) {
                    thisDelay = 0;
                }
                this.timerExecute = setTimeout(()=>{
                    this.handleScrollTo(lightEl, ()=>{
                        this.setLightBox(callback, lightEl);
                    });
                }, thisDelay);
            }, 100);
        } else {
            callback(lightEl);
        }
    }

    handleBack = () =>
    {
        const { back, finish } = this.props;
        if (finish) {
            isSuccess = finish.call(this);
        }
        back();
    }

    handleFinish()
    {
        clearInterval(this.timerFind);
        clearTimeout(this.timerExecute);
        const { finish } = this.props;
        if (finish) {
            finish.call(this);
        }
        popupDispatch({
            type: 'dom/closeGroup',
            params: {
                group: GROUP_KEY
            }
        });
        cleanClass(classCleanZIndex);
        cleanClass(classShowEl);
        cleanClass(classRelative);
    }

    closeFloats()
    {
        popupDispatch({
            type: 'dom/closeGroup',
            params: {
                group: GROUP_FLOATS
            }
        });
    }

    open()
    {
        const {type, light}  = this.props;
        const lightEl = query.one(light); 
        if (!lightEl) {
            return;
        }
        if (type !== 'modal') {
            if (!lightEl.offsetWidth ||
                !lightEl.offsetHeight
            ) {
                this.handleFinish();
                return;
            }
        }
        this.setLightBox( ()=>{
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: this._float 
                }
            });
        }, lightEl);
    }

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
            relative: [
                {
                    position: 'relative !important'
                },
                '.'+classRelative,
                classRelative
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
            ],
            header: [
                {
                    textAlign: 'left'
                }
            ],
            content: [
                {
                    textAlign: 'left'
                }
            ],
            actions: [
                {
                    textAlign: 'right'
                }
            ],
        };
	injects = lazyInject (
	    injects,
	    InjectStyles
	);
    }

    render()
    {
        const { maskScroll, closeCallBack, header, content, actions, type, style, stepIndex, total, userScroll, I18N } = this.props;
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
            child.push(<Header styles={injects.header}>{header}</Header>);
        }
        if (content) {
            child.push(<Content styles={injects.content}>{content}</Content>);
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
                            onClick = this.handleNext;
                            if (!actionText) {
                                const isLast = stepDisplayIndex >= total;
                                if (isLast) {
                                    actionText = I18N.done;
                                } else {
                                    actionText = I18N.next+' '+ stepDisplayIndex+ '/'+ total;
                                }
                            }
                            break;
                        case 'back':
                            onClick = this.handleBack;
                            if (!actionText) {
                                actionText = I18N.back;
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
            child.push(<SemanticUI className="actions" styles={injects.actions}>{buttons}</SemanticUI>);

        }
        this._float = createElement(
            floatEl,
            {
                maskScroll,
                name,
                closeCallBack,
                modalStyle: style,
                className: 'mini',
                center: false,
                group: GROUP_KEY,
                style: {
                    zIndex: 9999,
                },
		styles: injects.modal,
            },
            child
        );
        return null;
    }
}

export default Step;

