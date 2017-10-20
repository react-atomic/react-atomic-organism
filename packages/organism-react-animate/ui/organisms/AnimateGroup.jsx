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

    constructor(props)
    {
        super(props);
        this.state = {children: null};
    }

    componentDidMount()
    {
        const props = this.props;
        const aniProps = this.getAniProps(props); 
        import('../organisms/CSSTransition').then(
            (cssTransition) => {
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

    getAniProps(props, enterToAppear)
    {
        let {
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
        if (enterToAppear && classNames && classNames.enter) {
            classNames.appear = classNames.enter;
            timeout.appear = timeout.enter;
            appear = true;
        }
        const aniProps = {
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
            in: props.in
        };
        return aniProps;
    }

    componentWillReceiveProps(nextProps) {
        if (!CSSTransition) {
            return null;
        }
        const prevChildMapping = this.state.children;
        const nextChildMapping = getChildMapping(nextProps.children);
        const all = {...prevChildMapping, ...nextChildMapping};
        const aniProps = this.getAniProps(nextProps, true);
        keys(all).forEach((key)=>{
                const child = all[key];
                const hasPrev = key in prevChildMapping;
                const hasNext = key in nextChildMapping;
                const prevChild = prevChildMapping[key];
                const isLeaving = !get(prevChild, ['props','in']);
                if (!hasNext && hasPrev && !isLeaving) {
                    // Will Exit
                    all[key] = cloneElement(child, { in: false }); 
                } else {
                    // New or Keep
                    all[key] = createElement(
                        CSSTransition,
                        {
                            ...child.props,
                            ...aniProps,
                            key:key,
                            onExited: this.handleExited.bind(this, child),
                        },
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
