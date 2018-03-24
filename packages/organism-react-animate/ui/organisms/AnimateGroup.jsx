import React, {PureComponent, createElement, cloneElement} from 'react';
import getChildMapping from '../../src/getChildMapping';
import get from 'get-object-value';
const keys = Object.keys;
let CSSTransition;

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
            const {children} = state;
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

    constructor(props)
    {
        super(props);
        this.state = {children: null};
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
                CSSTransition = cssTransition.default? cssTransition.default: cssTransition;
                this.setState({
                    children: getChildMapping(
                        props.children,
                        (child, key) =>
                            createElement(
                                CSSTransition,
                                {
                                    ...child.props,
                                    ...aniProps,
                                    key:key,
                                    onExited: this.handleExited.bind(this, child)
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


    componentWillReceiveProps(nextProps) {
        if (!CSSTransition) {
            return null;
        }
        const prevChildMapping = get(this, ['state', 'children'], {});
        const nextChildMapping = getChildMapping(nextProps.children);
        const all = {...prevChildMapping, ...nextChildMapping};
        const aniProps = this.getAniProps(nextProps, true);
        keys(all).forEach((key)=>{
                const child = all[key];
                const hasPrev = key in prevChildMapping;
                const hasNext = key in nextChildMapping;
                const prevChild = prevChildMapping[key];
                const isLeaving = !get(prevChild, ['props','in']);
                if (!hasNext && hasPrev) {
                    // Will Exit
                    if (!isLeaving) {
                        all[key] = cloneElement(child, { ...aniProps, in: false}); 
                    } else {
                        delete all[key];
                    }
                } else {
                    const newProps = {
                        ...child.props,
                        ...aniProps,
                        key,
                        onExited: this.handleExited.bind(this, child),
                    };
                    // New or Keep
                    all[key] = (get(child, ['props', 'isCSSTransition'])) ? 
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
        });
        this.setState({ children: all });
    }

    render ()
    {
        const {
            component,
            timeout,
            delay,
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
        delete props.children;
        const {children} = this.state;
        let thisChildren = null;
        if (children) {
            thisChildren = keys(children).map( 
                key => children[key]
            );
        }
        return createElement(
            component,
            props,
            thisChildren
        );
    }
}

export default AnimateGroup;
