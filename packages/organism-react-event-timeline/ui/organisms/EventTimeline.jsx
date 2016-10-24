import React from 'react';

import {
    min,
    mixClass,
    assign,
    reactStyle,
    lazyInject,
    SemanticUI
} from 'react-atomic-molecule';

import Event from '../organisms/Event';

const EventTimeline = (props) =>
{
    injects = lazyInject (
        injects,
        InjectStyles
    );
    const classes = mixClass(
        props.className,
        'feed timeline'
    );
    const {events, eventElement} = props;
    let elProps = {};
    if (props.color) {
        elProps.color = props.color;
    }
    if (props.backgroundColor) {
        elProps.backgroundColor = props.backgroundColor;
    }
    if (props.borderColor) {
        elProps.borderColor = props.borderColor;
    }
    return (
        <SemanticUI className={classes} style={Styles.container}>
            { events.map((item, k)=>{
                item = assign(item, elProps);
                let el;
                if (React.isValidElement(eventElement)) {
                    el = React.cloneElement(
                        eventElement,
                        {
                            key: k,
                            ...item
                        }
                    );
                } else if ('function' === typeof children) {
                    el = eventElement(item, k);
                } else {
                    el = <Event {...item} key={k} />;
                }
                return el;
            })}
        </SemanticUI>
    );
}

export default EventTimeline;

const Styles = {
    container: {
        padding: 5
    }
};

let injects;
const InjectStyles = {
    evenEvent: [
        {
            left: '50%',
            margin: '0 30px !important'
        },
        [
            min.md,
            '.ui.timeline>.event:nth-child(even)>.content'
        ]
    ],
    rwdLine: [
        {
            left: '50% !important'
        },
        [
            min.md,
            '.ui.timeline>.event>.line'
        ]
    ],
    rwdLabel: [
        {
            left: '50% !important',
            marginLeft: '-.6rem'
        },
        [
            min.md,
            '.ui.timeline>.event>.label'
        ]
    ]
};
