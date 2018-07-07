import React, {PureComponent, createElement, cloneElement} from 'react';
import getChildMapping from '../../src/getChildMapping';
import get, {getDefault} from 'get-object-value';
const keys = Object.keys;
let CSSTransition;

class AnimateGroup extends PureComponent
{
    static defaultProps = {
        component: 'div',
        unmountOnExit: true,
        in: true
    };

    state =  {
        children: null
    };

    handleExited = (child, node) =>
    {
        const currentChildMapping = getChildMapping(this.props.children);
        if (child.key in currentChildMapping) {
            return;
        }
        if (this.props.onExited) {
            this.props.onExited(node);
        }
        this.setState(({children}) => {
            delete children[child.key];
            // Hack for let PureComponent force update 
            return { children: {...children} };
        });
    }

    getAniProps(props, enterToAppear)
    {
        let {
            timeout,
            delay,
            classNames,
            mountOnEnter,
            unmountOnExit,
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
        if (enterToAppear && classNames && classNames.enter) {
            classNames.appear = classNames.enter;
            delay.appear = delay.enter;
            timeout.appear = timeout.enter;
            appear = true;
        }
        /* not assign onExited, because call at handleExited */
        const aniProps = {
            timeout,
            delay,
            classNames,
            mountOnEnter,
            unmountOnExit,
            appear,
            enter,
            exit,
            addEndListener,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            in: props.in
        };
        return aniProps;
    }

    componentDidMount()
    {
        this._mounted = true;
        const props = this.props;
        const aniProps = this.getAniProps(props); 
        import('../organisms/CSSTransition').then(
            cssTransition => {
                if (!this._mounted) {
                    return;
                }
                CSSTransition = getDefault(cssTransition);
                this.setState({
                    children: getChildMapping(
                        props.children,
                        (child, key) => createElement(
                            CSSTransition,
                            {
                                ...child.props,
                                ...aniProps,
                                key: get(child, ['props', 'name'], key),
                                onExited: this.handleExited.bind(this, child),
                                isCompiled: 1
                            },
                            child
                        )
                    )
                });
            }
        );
    }

    componentWillUnmount()
    {
        this._mounted = false;
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        const stateChildren = prevState.children
        if (!CSSTransition || !stateChildren) {
            return null
        }
        const {children} = nextProps
        if (children === prevState.prevChildren) {
            return null
        }
        const prevChildMapping = get(stateChildren, null, {});
        const nextChildMapping = getChildMapping(children);
        const all = {...prevChildMapping, ...nextChildMapping};
        keys(all).forEach( key => {
            const child = all[key];
            const hasPrev = key in prevChildMapping;
            const hasNext = key in nextChildMapping;
            const prevChild = prevChildMapping[key];
            const isLeaving = !get(prevChild, ['props','in']);
            if (!hasNext && hasPrev) {
                // Will Exit
                if (!isLeaving) {
                    all[key] = cloneElement(child, {in: false}); 
                } else {
                    delete all[key];
                }
            }
        });
        return {
            children: all,
            prevChildren: children
        };
    }

    render ()
    {
        const {
            component,
            onExited,
            children: propsChildren,
            ...props
        } = this.props;
        const {children} = this.state;
        const aniProps = this.getAniProps(this.props, true); 
        keys(aniProps).forEach(key => delete props[key]);
        let thisChildren = null;
        if (children) {
            thisChildren = keys(children).map( key => {
                let child = get(children, [key]); 
                const childProps = get(child, ['props']);
                const isCSSTransition = childProps.isCSSTransition;
                if (!isCSSTransition ||
                    (isCSSTransition && !childProps.isCompiled)
                ) {
                    const newProps = {
                        ...childProps,
                        ...aniProps,
                        key: get(child, ['props', 'name'], key),
                        isCompiled: true,
                        onExited: this.handleExited.bind(this, child),
                    };
                    child = isCSSTransition ?  
                        cloneElement(
                            child,
                            newProps
                        ) : 
                        createElement(
                            CSSTransition,
                            newProps,
                            child
                        );
                }
                children[key] = child;
                return child;
            });
            this.state.children = children;
        }
        return createElement(
            component,
            props,
            thisChildren
        );
    }
}

export default AnimateGroup;
