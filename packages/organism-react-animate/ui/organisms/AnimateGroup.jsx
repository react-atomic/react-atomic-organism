import React, {PureComponent, createElement, cloneElement}  from 'react';
import CSSTransition from '../organisms/CSSTransition';
import getChildMapping from '../../src/getChildMapping';
import get from 'get-object-value';
const keys = Object.keys;

class AnimateGroup extends PureComponent
{
    static defaultProps = {
        component: 'div',
        in: true
    };

    handleExited = (child, node) =>
    {
        if (this.props.onExited) {
            this.props.onExited(node);
        }
        let currentChildMapping = getChildMapping(this.props.children);
        if (child.key in currentChildMapping) {
            return;
        }
        this.setState((state) => {
            let {children} = state;
            delete children[child.key];
            return { children };
        });
    }

    constructor(props)
    {
        super(props);
        const { children } = props;
        const aniProps = this.getAniProps(props); 
        this.state = {
            children: getChildMapping(
                children,
                (child, key) => 
                    createElement(
                        CSSTransition,
                        {
                            ...aniProps,
                            ...child.props,
                            key:key,
                            onExited: this.handleExited.bind(this, child)
                        },
                        child
                    )
            )
        };
    }

    getAniProps(props, enterToAppear)
    {
        const {
            timeout,
            classNames,
            appear,
            enter,
            exit,
            addEndListener,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
        } = props;
        let classes = classNames;
        if (enterToAppear) {
            classes.appear = classes.enter;
        }
        const aniProps = {
            timeout: timeout,
            classNames: classes,
            appear: appear,
            enter: enter,
            exit: exit,
            addEndListener: addEndListener,
            onEnter: onEnter,
            onEntering: onEntering,
            onEntered: onEntered,
            onExit: onExit,
            onExiting: onExiting,
            in: props.in
        };
        return aniProps;
    }

    componentWillReceiveProps(nextProps) {
        const prevChildMapping = this.state.children;
        const nextChildMapping = getChildMapping(nextProps.children);
        const all = {...prevChildMapping, ...nextChildMapping};
        const aniProps = this.getAniProps(this.props, true);
        keys(all).forEach((key)=>{
                const child = all[key];
                const hasPrev = key in prevChildMapping; 
                const hasNext = key in nextChildMapping;
                const prevChild = prevChildMapping[key];
                const isLeaving = !get(prevChild, ['props','in']);
                //new
                if (hasNext && (!hasPrev || isLeaving)) {
                    all[key] = createElement(
                        CSSTransition,
                        {
                            ...aniProps,
                            ...child.props,
                            key:key,
                            onExited: this.handleExited.bind(this, child),
                        },
                        child
                    );
                // old
                } else if (!hasNext && hasPrev && !isLeaving) {
                    all[key] = cloneElement(child, { in: false }); 
                // keep
                } else if (hasNext && hasPrev) {
                    all[key] = prevChild;
                }
        });
        this.setState({ children: all });
    }


    render ()
    {
        const {
            component,
            timeout,
            classNames,
            appear,
            enter,
            exit,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            addEndListener,
            ...props
        } = this.props;
        delete props.in;
        return createElement(
            component,
            props,
            keys(this.state.children).map((key)=>
                this.state.children[key] 
            )
        );
    }
}

export default AnimateGroup;
