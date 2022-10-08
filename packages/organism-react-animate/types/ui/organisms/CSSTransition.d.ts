export default CSSTransition;
declare function CSSTransition({ stepKeys, actionKeys, classNames, delay, beforeEnter, afterEnter, onEnter, onEntering, onEntered, beforeExit, afterExit, onExit, onExiting, onExited, ...props }: {
    [x: string]: any;
    stepKeys?: {
        appear: string;
        enter: string;
        exit: string;
    };
    actionKeys?: {
        start: string;
        active: string;
        done: string;
    };
    classNames: any;
    delay: any;
    beforeEnter: any;
    afterEnter: any;
    onEnter: any;
    onEntering: any;
    onEntered: any;
    beforeExit: any;
    afterExit: any;
    onExit: any;
    onExiting: any;
    onExited: any;
}): JSX.Element;
