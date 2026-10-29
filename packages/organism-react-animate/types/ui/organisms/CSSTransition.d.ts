declare const CSSTransition: ({ stepKeys, actionKeys, classNames, delay, beforeEnter, afterEnter, onEnter, onEntering, onEntered, beforeExit, afterExit, onExit, onExiting, onExited, ...props }: {
    [x: string]: any;
    actionKeys?: {
        start: string;
        active: string;
        done: string;
    };
    afterEnter: any;
    afterExit: any;
    beforeEnter: any;
    beforeExit: any;
    classNames: any;
    delay: any;
    onEnter: any;
    onEntered: any;
    onEntering: any;
    onExit: any;
    onExited: any;
    onExiting: any;
    stepKeys?: {
        appear: string;
        enter: string;
        exit: string;
    };
}) => import("react").JSX.Element;
export default CSSTransition;
