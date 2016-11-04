import React, {Component, PropTypes} from 'react';

import {
    assign,
    lazyInject,
    reactStyle,
    SemanticUI 
} from 'react-atomic-molecule';


class TypingItem extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            className: ''
        };
    }

    componentDidMount()
    {
        const width = this.text.offsetWidth+ 50;
        const aniName ='typingNextWord-'+width; 
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
            'key-'+aniName
        );
        reactStyle(
            {
                animation: [aniName+ " "+ this.props.sec+ "s steps(10) infinite alternate"],
                visibility: "visible !important"
            }, 
            '.'+aniName, 
            'ani-'+aniName
        );
        this.setState({
            className: aniName
        });
    }

    render()
    {
        const {children, sec, background, ...props} = this.props;
        return (
           <SemanticUI {...props}> 
                <div
                    className={this.state.className}
                    ref={el=>this.text=el}
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

    componentDidMount()
    {
        const props = this.props;
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
            color:props.color
        };
        if (props.background) {
            atts.background = props.background;
        }
        if (state.isRun) {
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
                {
                    height:props.height,
                },
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
