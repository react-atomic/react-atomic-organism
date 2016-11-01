import React from 'react';
import {lightenColor, hexToRgba} from 'colorlib';
import Animate from "organism-react-scroll-animate";

import {
    mixClass,
    assign,
    reactStyle,
    injectStyle,
    Content,
    Description,
    Label,
    Header,
    Meta,
    SemanticUI
} from 'react-atomic-molecule';


const Year = (props)=>
    <SemanticUI {...props} style={Styles.year}/>

const Time = (props)=>
    <SemanticUI>
    {props.time.map((t, k)=>{
        if (!k) {
            return <Year key={k}>{t}</Year>;
        } else {
            return <Meta key={k} style={Styles.timeMeta}>{t}</Meta>;
        }
    })}
    </SemanticUI>

const TimeBox = (props)=>
    <SemanticUI style={assign(
        {
            borderLeftColor: props.borderColor
        },
        Styles.timebox
    )}>
        <Time time={props.from} />
        <SemanticUI style={assign(
            {
                backgroundColor: props.color
            },
            Styles.until
        )}/>
        <Time time={props.to} />
    </SemanticUI>

const EventContent = (props)=> {
    const {
        header,
        description,
        from,
        to,
        color,
        backgroundColor,
        borderColor,
        minHeight
    } = props;
    return (
    <Content
        className="pure-u-1 pure-u-md-11-24"
        style={assign(
            {
                borderColor: backgroundColor,
                backgroundColor: lightenColor(backgroundColor, 60, 500),
                color: color,
                minHeight: minHeight
            },
            Styles.content
        )}
    >
        <Header className="summary" style={Styles.summary}>{header}</Header>
        <Description className="extra text">{description}</Description>
        <TimeBox
            from={from}
            to={to}
            color={color}
            borderColor={borderColor}
        />
    </Content>
    );
};

const Event = (props) =>
{
    const classes = mixClass(
        props.className,
        'event pure-g'
    );
    const {
        animate,
        backgroundColor,
        borderColor,
        minHeight
    } = props;
    let content = <EventContent {...props} />;
    if (animate) {
        const aniProps = assign(
            {minHeight: minHeight},
            animate
        );
        content = <Animate {...aniProps}>{content}</Animate>;
    }
    return (
    <SemanticUI className={classes} style={Styles.container}>
        <SemanticUI className="line" style={assign(
            {
                background: hexToRgba(backgroundColor,'.3') 
            },
            Styles.line
        )} />
        <Label style={assign(
            {
                borderColor: borderColor,
                backgroundColor: backgroundColor
            },
            Styles.label
        )}/>
        {content}
    </SemanticUI>
    );
};

Event.defaultProps = {
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#0f87cd',
    minHeight: 180,
};
export default Event;

const Styles = {
    container: {
        position: 'relative',
        padding: 15,
    },
    year: {
        fontFamily: 'Tienne,serif',
        fontSize: '1.375rem',
        fontWeight: 700
    },
    until: {
        width: 1,
        height: 10,
        display: 'inline-block',
        background: '#000'
    },
    timeMeta: {
        fontSize: '0.813rem',
        textTransform: 'capitalize',
    },
    timebox: {
        position: 'absolute',
        width: 100,
        top: 0,
        bottom: 0,
        right: -100,
        borderLeftStyle: 'solid',
        borderLeftWidth: 10,
        textAlign: 'center',
        paddingTop: 20 
    },
    summary: {
        fontSize: '1.5rem',
        textTransform: 'capitalize',
        fontWeight: 700
    },
    content: {
        position: 'relative',
        borderWidth: 12,
        borderStyle: 'solid',
        borderRightWidth: 100,
        boxSizing: 'border-box',
        margin: '0 15px',
        padding: 20,
    },
    label: {
        height: '1.3rem',
        width: '1.3rem',
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: 5,
        position: 'absolute',
        boxSizing: 'border-box',
        top: '.8rem',
        left: 0,
        zIndex: 1
    },
    line: {
        position: 'absolute',
        height: '100%',
        width: '1px',
        left: 10
    }
};

