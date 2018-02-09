require("setimmediate");
import React, {createElement, cloneElement, PureComponent, Children} from 'react';
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
import {
    cleanClass,
    cleanZIndex,
    setClass,
    showEl,
    LightBox
} from 'organism-react-spotlight';
import query from 'css-query-selector';
import getOffset from 'getoffset';
import getStyle from 'get-style';
import getScrollInfo from 'get-scroll-info';
import get from 'get-object-value';
import {isFixed} from 'get-window-offset';
import {percent} from 'topercent';
import scroll from 'smooth-scroll-to';


import Beacon from '../organisms/Beacon';
import Tooltip from '../organisms/Tooltip';
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

const myShowEl = node => showEl(node, classShowEl, classRelative);

const myCleanZIndex = node => cleanZIndex(node, classCleanZIndex, classShowEl);

class Step extends PureComponent
{
    timerFind;
    timerExecute;
    timerMonitor;

    static defaultProps = {
        delay: 100,
        userScroll: false,
        scrollTo: true
    };

    addLightBox(node, isHide)
    {
        const isSetFixed = isFixed(node);
        myCleanZIndex(node);
        let thisStyles;
        if (isSetFixed) {
            thisStyles = injects.fixed;
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
                        group={GROUP_KEY}
                        wh={[nodePos.w, nodePos.h]} 
                        targetEl={node}
                        styles={thisStyles}
                    /> 
                }
            });
        }
        if (!isSetFixed) {
            // need locate after myCleanZIndex(node)
            myShowEl(node);
        }
    }

    _resetFloats(callback, lightEl)
    {
        const { type, before, hideLightBox } = this.props;
        if (before) {
            before.call(this);
        }
        if (lightEl) {
            this.addLightBox(lightEl, hideLightBox);
            const isSetFixed = isFixed(lightEl);
            let floatProps = {};
            if (type !== 'modal') {
                floatProps = {
                    isSetFixed,
                    targetEl: lightEl
                };
            }
            this._float = cloneElement(
                this._float,
                floatProps
            );
        }
        this.setHighlights();
        this.setNumbers();
        this.setBeacons();
        if ('function' === typeof callback) {
            callback.call(this);
        }
        this.handleMonitor();
        return true;
    }

    resetFloats(targetEl)
    {
        this._resetFloats( ()=>{
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: this._float 
                }
            });
        }, targetEl);
    }
    
    addHighlight(node)
    {
        const nodePos = getOffset(node);
        if (!nodePos.w || !nodePos.h) {
            return;
        }
        let thisStyles;
        const isSetFixed = isFixed(node);
        if (isSetFixed) {
            thisStyles = injects.fixed;
        }
        if (!node.id) {
            node.id = 'react-onboarding-highlight-'+nodeId; 
            nodeId++;
        }
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: <Highlight
                    wh={[nodePos.w, nodePos.h]} 
                    name={'highlight-'+node.id}
                    key={'highlight-'+node.id}
                    targetEl={node}
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
            const nodes = query.all(hl);
            if (nodes.length) {
                nodes.forEach( (node, tKey) => {
                    this.addHighlight(node);
                } );
            }
        });
    }

    setBeacons()
    {
        const { beacons } = this.props;
        if (!beacons) {
            return;
        }
        beacons.forEach( (beacon, key) => {
            const node = query.one(beacon);
            if (!node) {
                return;
            }
            const nodePos = getOffset(node);
            if (!nodePos.w || !nodePos.h) {
                return;
            }
            const isSetFixed = isFixed(node);
            let styles;
            if (isSetFixed) {
                styles = injects.fixed;
            }
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: (
                        <Beacon
                            name={'react-onboarding-beacon'+key}
                            key={key}
                            targetEl={node}
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
        const nodePos = getOffset(node);
        if (!nodePos.w || !nodePos.h) {
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

    setNumbers()
    {
        const { numbers } = this.props;
        if (!numbers) {
            return;
        }
        keys(numbers).forEach( key => {
            const node = query.one(numbers[key]);
            this.addNumber(key, node);
        });
    }


    handleScrollTo(lightEl, callback)
    {
        const { scrollTo } = this.props;
        if (!scrollTo || !lightEl) {
            callback.call(this);
            return;
        }
        const lightElPos = getOffset(lightEl);
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

    initFloat()
    {
        const { type, delay, isBack, before, cook, target, onboardingBefore } = this.props;
        const callback = () =>
        {
            if (onboardingBefore) {
                onboardingBefore();
            }
            if (cook) {
                cook.call(this);
            }
            setImmediate(()=>{
                if (false !== this.getTargetEl() || 'modal' === type) {
                    popupDispatch({
                        type: 'dom/update',
                        params: {
                            popup: this._float 
                        }
                    });
                }
            });
        };
        if (target) {
            let maxTry = 100;
            let tryTime = 0;
            this.timerFind = setInterval(()=>{
                tryTime++;
                const lightEl = query.one(target); 
                if (tryTime > maxTry) {
                    clearInterval(this.timerFind);
                    console.warn('Can not find light element. ['+target+']');
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
                        this._resetFloats(callback, lightEl);
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
            finish.call(this);
        }
        back();
    }

    handleFinish()
    {
        clearInterval(this.timerFind);
        clearInterval(this.timerMonitor);
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

    handleMonitor()
    {
        const {monitors, host} = this.props;
        if (!monitors) {
            return;
        }
        clearInterval(this.timerMonitor);
        this.timerMonitor = setInterval(()=>{
            monitors.forEach( sel => {
                const nodes = query.all(sel);
                if (nodes.length) {
                    nodes.forEach( node => {
                        const pos = getOffset(node);
                        if (pos.w && pos.h) {
                            host.next();
                        }
                    });
                }
            });
        }, 100);
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

    /**
     * @return null mean not assign target
     * @return false mean target not exists
     */
    getTargetEl()
    {
        const {target}  = this.props;
        if (!target) {
            return null;
        }
        const targetEl = query.one(target);
        if (!targetEl) {
            return false;
        }
        const targetElPos = getOffset(targetEl);
        if (!targetElPos.w ||
            !targetElPos.h
        ) {
            return false;
        }
        return targetEl;
    }

    tryOpen()
    {
        const {host}  = this.props;
        if (false !== this.getTargetEl()) {
            this.open();
        } else {
            host.goTo(0);
        }
    }

    open()
    {
        const {type, scrollTo}  = this.props;
        const targetEl = this.getTargetEl();
        if (type !== 'modal' && !targetEl) {
            console.warn('target not found.');
            this.handleFinish();
            return;
        }
        this.handleScrollTo(targetEl, ()=>{
            this.resetFloats(targetEl);
        });
    }

    resetLightBox()
    {
        const {target, hideLightBox}  = this.props;
        const lightEl = query.one(target); 
        if (!lightEl) {
            return;
        }
        const isSetFixed = isFixed(lightEl);
        this.addLightBox(lightEl, hideLightBox);
        this._float = cloneElement(
            this._float,
            {
                targetEl: lightEl,
                isSetFixed
            }
        );
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: this._float 
            }
        });
    }

    componentDidMount() 
    {
        this.initFloat();
    }

    componentDidUpdate(prevProps, prevState)
    {
        this.initFloat();
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
                    zIndex: '99999 !important',
                    transform: 'translate3d(0,0,0)'
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
                    textAlign: 'left',
                    padding: '1rem 1rem',
                }
            ],
            actions: [
                {
                    textAlign: 'right',
                    paddingTop: '1rem',
                    background: 'f9fafb',
                    borderTop: '1px solid rgba(34,36,38,.15)'
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
                let actionText = get(action, ['text'], '');
                let actionClassName = get(action, ['className'], '');
                const thisAction = action.action;
                if ('function' === typeof thisAction) {
                    onClick = thisAction;
                } else {
                    switch (thisAction) {
                        case 'next':
                            onClick = this.handleNext;
                            actionClassName += ' positive';
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
                        className={actionClassName}
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
                modalClassName: 'mini',
                center: false,
                group: GROUP_KEY,
                style: {
                    zIndex: 9999,
                },
		styles: injects.modal,
            },
            Children.map(child, c => c)
        );
        return null;
    }
}
export default Step;

export {
    myShowEl as showEl,
    myCleanZIndex as cleanZIndex
};
