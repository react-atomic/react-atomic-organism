import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    assign,
    reactStyle,
    injectStyle
} from 'react-atomic-molecule';

import animateCss from '../../src/animateCss';

let inject = {};

class Animate extends Component
{
    static defaultProps = {
        atom: 'div',
        appear: null,
        enter: null,
        leave: null
    }

    componentDidMount()
    {
        const { 
            appear,
            enter,
            leave
        } = this.props;
        if (appear) {
            if (!inject[appear]) {
                this.init(appear, this.appear, this.appearTimeout);
                inject[appear] = true;
            }
        }
        if (enter) {
            if (!inject[enter]) {
                this.init(enter, this.enter, this.enterTimeout);
                inject[enter] = true;
            }
        }
        if (leave) {
            if (!inject[leave]) {
                this.init(leave, this.leave, this.leaveTimeout);
                inject[leave] = true;
            }
        }
        injectStyle();
    }

    init(key, ani, timeout)
    {
        reactStyle(assign(
            {
                animationName: [ani],
                animationDuration: [timeout+'ms']
            },
            baseStyle, 
        ), '.'+key);
        let keyframes = ani+'-keyframes';
        if (!inject[keyframes]) { 
            reactStyle.apply( null, animateCss[ani] );
            inject[keyframes] = true;
        }
    }

    render()
    {
        const {
            children,
            atom,
            appear,
            enter,
            leave
        } = this.props;
        let enableAppear = false;
        this.appearTimeout = 500;
        let data;
        if (appear) {
            data = appear.split('-');
            this.appear = data[0];
            if (!isNaN(data[1])) {
                this.appearTimeout = parseInt(data[1],10);
            }
            enableAppear = true;
        }
        let enableEnter = false;
        this.enterTimeout = 500;
        if (enter) {
            data = enter.split('-');
            this.enter = data[0];
            if (!isNaN(data[1])) {
                this.enterTimeout = parseInt(data[1],10);
            }
            enableEnter = true;
        }
        let enableLeave = false;
        this.leaveTimeout = 500;
        if (leave) {
            data = leave.split('-');
            this.leave = data[0];
            if (!isNaN(data[1])) {
                this.leaveTimeout = parseInt(data[1],10);
            }
            enableLeave = true;
        }
        return (
            <ReactCSSTransitionGroup
                component={atom}
                transitionAppearTimeout={this.appearTimeout}
                transitionEnterTimeout ={this.enterTimeout}
                transitionLeaveTimeout ={this.leaveTimeout}
                transitionAppear={enableAppear}
                transitionEnter ={enableEnter}
                transitionLeave ={enableLeave}
                transitionName={{
                    enter: enter,
                    leave: leave,
                    appear: appear,
                }}
            >
                {children}
            </ReactCSSTransitionGroup>
        );
    }
}

export default Animate;

const baseStyle = {
    animationIterationCount: [1],
    animationTimingFunction: ['linear']
};
