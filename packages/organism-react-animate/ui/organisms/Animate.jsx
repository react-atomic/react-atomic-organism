import React, {Component} from 'react';
import AnimateGroup from './AnimateGroup';
import {
    reactStyle,
    injectStyle,
    SemanticUI
} from 'react-atomic-molecule';

import getKeyframe from 'keyframe-css';

let inject = {};

class Animate extends Component
{
    static defaultProps = {
        component: SemanticUI,
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
            }
        }
        if (enter) {
            if (!inject[enter]) {
                this.init(enter, this.enter, this.enterTimeout);
            }
        }
        if (leave) {
            if (!inject[leave]) {
                this.init(leave, this.leave, this.leaveTimeout);
            }
        }
        injectStyle();
    }

    init(key, ani, timeout)
    {
        getKeyframe(ani);
        inject[key] = true;
        reactStyle({
            ...{
                animationName: [ani],
                animationDuration: [timeout+'ms']
            },
            ...Styles.linear, 
        }, '.'+key);
    }

    parseAniValue(s)
    {
        let data = s.split('-');
        if (!isNaN(data[1])) {
            data[1] = parseInt(data[1],10);
        } else {
            data[1] = 500;
        }
        return {
            name: data[0],
            timeout: data[1]
        };
    }

    render()
    {
        const {
            appear,
            enter,
            leave,
            ...others
        } = this.props;
        let data;
        if (appear) {
            data = this.parseAniValue(appear);
            this.appear = data.name;
            this.appearTimeout = data.timeout;
        }
        if (enter) {
            data = this.parseAniValue(enter);
            this.enter = data.name;
            this.enterTimeout = data.timeout;
        }
        if (leave) {
            data = this.parseAniValue(leave);
            this.leave = data.name;
            this.leaveTimeout = data.timeout;
        }
        return (
            <AnimateGroup
                timeout={{
                    appear: this.appearTimeout,
                    enter: this.enterTimeout,
                    exit: this.leaveTimeout
                }}
                classNames={{
                    appear: appear,
                    enter: enter,
                    exit: leave
                }}
                appear={!!appear}
                enter={!!enter}
                exit={!!leave}
                {...others}
            />
        );
    }
}

export default Animate;

const Styles = {
    linear: {
        animationIterationCount: [1],
        animationTimingFunction: ['linear']
    }
};
