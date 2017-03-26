import React, {Component, PropTypes} from 'react';

import {
    assign,
    lazyInject,
    reactStyle,
    SemanticUI 
} from 'react-atomic-molecule';

const getTypingNextWordAniClassName = (el,sec) => {
    const width = el.offsetWidth+ 50;
    const ssec = ''+sec;
    const aniName ='typingNextWord-'+width+'-'+ssec.replace('.','-'); 
    if (injects[aniName]) {
        return aniName;
    }
    reactStyle(
        [
            {
                maxWidth: 0,
            },
            {
                maxWidth: width+'px'
            },
        ],
        ['@keyframes '+aniName, '0%', '100%'],
        aniName+'-keyframe'
    );
    reactStyle(
        {
            animation: [aniName+ " "+ sec+ "s steps(10) infinite alternate"],
            visibility: "visible !important"
        }, 
        '.'+aniName, 
        aniName+'-ani'
    );
    injects[aniName] = true;
    return aniName;
};

class TypingItem extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            classes: null
        };
    }

    componentDidMount()
    {
        this.setState({
            classes: getTypingNextWordAniClassName(this.el, this.props.sec)
        });
    }
    
    render()
    {
        const {children, sec, background, ...others} = this.props;
        return (
           <SemanticUI {...others}> 
                <div
                    className={this.state.classes}
                    ref={el=>this.el=el}
                    style={Styles.typingItemText}
                >
                    {children}
                </div>
               <SemanticUI styles={injects.typingCursor}> | </SemanticUI>
           </SemanticUI>
        );
    }
}

class Typing extends Component
{
    static defaultProps = {
        height: '80px',
        color: '#000',
        background: null,
        sec: 1.5,
        autoStart: true
    }

    constructor(props)
    {
        super(props);
        this.state = {
            typingItemStyles: null,
            isRun: props.autoStart
        };
        injects = lazyInject (
            injects,
            InjectStyles
        );
    }

    update(props)
    {
        if (!props) {
            props = this.props;
        }
        const itemLength = props.children.length;
        const height = parseInt(props.height, 10);
        const aniName = 'typingNextLine';
        const styleId = aniName+'-'+itemLength+'-'+height;
        const typingItemStyles = reactStyle({
            position: 'relative',
            animation: [styleId+ ' '+ ( itemLength * 2 * props.sec )+ 's steps('+itemLength+') infinite'],
            height: height
        },null, false);
        reactStyle([
            {top: 0},
            {top: 0 - ( height * itemLength )}
        ],['@keyframes '+styleId, '0%', '100%'], styleId);
        this.setState({
            typingItemStyles: typingItemStyles
        });
    }

    componentDidMount()
    {
        this.update();
    }

    componentWillReceiveProps(nextProps)
    {
        this.update(nextProps);
    }

    start()
    {
        this.setState({
            isRun: true 
        })
    }

    stop()
    {
        this.setState({
            isRun: false 
        })
    }

    render()
    {
        const props = this.props;
        const state = this.state;
        let items = [];
        let atts = { 
            height:props.height,
            color:props.color
        };
        if (props.background) {
            atts.background = props.background;
        }
        if (state.isRun && state.typingItemStyles) { // need calculate offsetWidth
            React.Children.map(props.children,(item, key)=>{
                items.push(
                    <TypingItem
                        key={key}
                        sec={props.sec}
                        styles={state.typingItemStyles}
                        {...atts}
                    >
                        {item.props.children}
                    </TypingItem>
                );
            });
        }
        return (
            <SemanticUI style={assign(
                {},
                Styles.typingContainer,
                atts
            )}>
            {items}
            </SemanticUI>
        );
    }
}

export default Typing;

const Styles = {
    typingContainer: {
        overflow: 'hidden'
    },
    typingItemText: {
        display: "inline-block",
        overflow: "hidden",
        visibility: "hidden",
        whiteSpace: 'nowrap'
    },
};

let injects;
const InjectStyles = {
    typingCursor: [{
        display: "inline-block",
        position: "relative",
        marginLeft: "3px",
        verticalAlign: "top",
        animation: ["typingBlink 1s infinite"]
    }],
    typingBlink: [[
        {
            opacity: "1" 
        },
        {
            opacity: "0"
        }
    ],['@keyframes typingBlink', '0%, 100%', '50%']]
};
