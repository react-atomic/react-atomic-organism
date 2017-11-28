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
let nodeId = 0;

const GROUP_KEY = 'react-onboarding';
const GROUP_FLOATS = GROUP_KEY+'-floats';
const classCleanZIndex = GROUP_KEY+'-clean-zindex';
const classShowEl = GROUP_KEY+'-show-el';
const classRelative = GROUP_KEY+'-relative';

const cleanClass = (className) =>
{
    const allEl = query.all('.'+className);
    allEl.forEach( el => {
        if (el instanceof SVGElement) {
            el.setAttribute('class', removeClass(
                el.getAttribute('class'),
                className
            ));
        } else {
            el.className = removeClass(
                el.className,
                className
            );
        }
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
                setClass(thisParent, [classCleanZIndex]);
            } else if ('fixed' === position) {
                if (!isFindFixedParent) {
                    isFindFixedParent = true;
                    setClass(thisParent, [classShowEl]);
                }
            }
        }
        thisParent = thisParent.parentNode;
    }
}

const setClass = (node, classes) =>
{
    if (node instanceof SVGElement) {
        const className = node.getAttribute('class') || ''; 
        node.setAttribute('class', className + ' ' + classes.join(' '));
    } else {
        node.className += ' '+classes.join(' ');
    }
}

const addSvgClass = (node, classes) =>
{
    setClass(node, classes);
    let thisParent = node.parentNode;
    if (!thisParent) {
        return;
    }
    while(thisParent.nodeName != 'BODY') {
        // svg always in lower case
        if (thisParent.nodeName.toLowerCase() === 'svg') {
            setClass(thisParent, classes);
            break;
        }
        thisParent = thisParent.parentNode;
    }
}

const showEl = (node) =>
{
    const position = getStyle(node, 'position');
    const classes = [classShowEl];
    if ('static' === position) {
        classes.push(classRelative);
    }
    addSvgClass(node, classes);
    if (node && node instanceof SVGElement) {
        addSvgClass(node, classes);
    } else {
        node.className += ' '+classes.join(' ');
    }
}

class Step extends PureComponent
{
    timerFind;
    timerExecute;

    static defaultProps = {
        delay: 100,
        userScroll: false,
        scrollTo: true
    };

    addLightBox(node, isHide)
    {
        const isSetFixed = isFixed(node);
        addCleanZIndex(node);
        let thisStyles;
        if (isSetFixed) {
            thisStyles = injects.fixed;
        } else {
            // need locate after addCleanZIndex(lightEl)
            showEl(node);
        }
        if (!node.id) {
            node.id = 'light-el-'+nodeId; 
            nodeId++;
        }
        const nodePos = getOffset(node);
        if (!isHide) {
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: <LightBox
                        key={node.id}
                        name={node.id}
                        wh={[nodePos.w, nodePos.h]} 
                        targetEl={node}
                        styles={thisStyles}
                    /> 
                }
            });
        }
    }

    setLightBox(callback, lightEl)
    {
        const { before, hideLightBox } = this.props;
        if (before) {
            before.call(this);
        }
        this.addLightBox(lightEl, hideLightBox);
        const isSetFixed = isFixed(lightEl);
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
    
    addHighlight(target)
    {
        const targetPos = getOffset(target);
        if (!targetPos.w || !targetPos.h) {
            return;
        }
        let thisStyles;
        const isSetFixed = isFixed(target);
        if (isSetFixed) {
            thisStyles = injects.fixed;
        }
        if (!target.id) {
            target.id = 'react-onboarding-highlight-'+nodeId; 
            nodeId++;
        }
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: <Highlight
                    wh={[targetPos.w, targetPos.h]} 
                    name={'highlight-'+target.id}
                    key={'highlight-'+target.id}
                    targetEl={target}
                    styles={thisStyles}
                /> 
            }
        });
    }

    setHighlights()
    {
        const { highlights } = this.props;
        if (!highlights) {
            return;
        }
        highlights.forEach( (hl, key) => {
            const targets = query.all(hl);
            if (targets.length) {
                targets.forEach( (target, tKey) => {
                    this.addHighlight(target);
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
            const targetPos = getOffset(target);
            if (!targetPos.w || !targetPos.h) {
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

    addNumber(num, node)
    {
        if (!node || !num) {
            return;
        }
        const targetPos = getOffset(node);
        if (!targetPos.w || !targetPos.h) {
            return;
        }
        let thisStyles;
        const isSetFixed = isFixed(node);
        if (isSetFixed) {
            thisStyles = injects.fixed;
        }
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: (
                    <StepNumber
                        name={'number-'+num}
                        key={'number-'+num}
                        targetEl={node}
                        styles={thisStyles}
                    >
                    {num}
                    </StepNumber>
                )
            }
        });
    }

    setNumbers(isSetFixed)
    {
        const { numbers } = this.props;
        if (!numbers) {
            return;
        }
        keys(numbers).forEach( key => {
            const target = query.one(numbers[key]);
            this.addNumber(key, target);
        });
    }


    handleScrollTo(lightEl, callback)
    {
        const { scrollTo } = this.props;
        const lightElPos = getOffset(lightEl);
        if (!scrollTo) {
            callback.call(this);
            return;
        }
        const scrollInfo = getScrollInfo();
        let halfH;
        if (scrollInfo.scrollNodeHeight > lightElPos.h) {
            halfH = (scrollInfo.scrollNodeHeight-lightElPos.h) / 2;
        } else {
            halfH = scrollInfo.scrollNodeHeight / 2;
        }
        scroll(Math.floor(lightElPos.top-halfH), null, null, ()=>{
            callback.call(this);
        });
    }

    handleNext = () =>
    {
        const { verify, next, finish } = this.props;
        let isSuccess = true;
        if (verify) {
            isSuccess = verify.call(this);
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
        const { type, delay, isBack, before, cook, light, onboardingBefore } = this.props;
        const callback = () =>
        {
            if (onboardingBefore) {
                onboardingBefore();
            }
            if (cook) {
                cook.call(this);
            }
            setImmediate(()=>{
                const lightEl = query.one(light); 
                const lightElPos = getOffset(lightEl);
                if (lightElPos.w && lightElPos.h) {
                    popupDispatch({
                        type: 'dom/update',
                        params: {
                            popup: this._float 
                        }
                    });
                }
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
            }, 50);
        } else {
            callback.call(this);
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
        const {type, light, scrollTo}  = this.props;
        const lightEl = query.one(light); 
        if (!lightEl) {
            return;
        }
        const lightElPos = getOffset(lightEl);
        if (type !== 'modal') {
            if (!lightElPos.w ||
                !lightElPos.h
            ) {
                this.handleFinish();
                return;
            }
        }
        this.handleScrollTo(lightEl, ()=>{
            this.setLightBox( ()=>{
                popupDispatch({
                    type: 'dom/update',
                    params: {
                        popup: this._float 
                    }
                });
            }, lightEl);
        });
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
                    zIndex: '99999 !important'
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
export {addCleanZIndex as cleanZIndex, showEl};
export default Step;

