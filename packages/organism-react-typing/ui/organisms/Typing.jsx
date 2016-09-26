import React, {Component, PropTypes} from 'react';

import {
    reactStyle,
    assign,
    SemanticUI 
} from 'react-atomic-molecule';

let aniNum = 0;

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
        let aniName ='typingNextWord-'+aniNum; 
        aniNum++;
        const width = this.text.offsetWidth+ 50;
        reactStyle([
            {
                maxWidth: 0,
            },
            {
                maxWidth: width+'px'
            },
        ],['@keyframes '+aniName, '0%', '100%']);
        reactStyle({
            animation: [aniName+ " "+ this.props.sec+ "s steps(10) infinite alternate"],
            visibility: "visible !important"
        },'.'+aniName);
        this.setState({
            className: aniName
        });
    }

    render()
    {
        const {children, sec, ...props} = this.props;
        return (
           <SemanticUI {...props}> 
                <div
                    className={this.state.className}
                    ref={el=>this.text=el}
                    style={Styles.typingItemText}
                >
                    {children}
                </div>
               <SemanticUI styles={reactStyle(assign(
                    {},
                    Styles.typingCursor,
                ))}> | </SemanticUI>
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
    }

    constructor(props)
    {
        super(props);
        this.state = {
            typingItemStyles: null 
        };
    }

    componentDidMount()
    {
        const props = this.props;
        const aniName = 'typingNextLine';
        const itemLength = props.children.length;
        const height = parseInt(props.height, 10);
        let typingItemStyles = reactStyle({
            position: 'relative',
            animation: [aniName+ ' '+ ( itemLength * 2 * props.sec )+ 's steps('+itemLength+') infinite'],
            height: height
        });
        reactStyle([
            {top: 0},
            {top: '-'+ ( height * itemLength )+ 'px'}
        ],['@keyframes '+aniName, '0%', '100%']);
        this.setState({
            typingItemStyles: typingItemStyles
        });
    }

    render()
    {
        const props = this.props;
        let items = [];
        let atts = { 
            color:props.color
        };
        if (props.background) {
            atts.background = props.background;
        }
        React.Children.map(props.children,(item, key)=>{
            items.push(
                <TypingItem
                    key={key}
                    sec={props.sec}
                    styles={this.state.typingItemStyles}
                    {...atts}
                >
                    {item.props.children}
                </TypingItem>
            );
        });
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
    typingCursor: {
        display: "inline-block",
        position: "relative",
        marginLeft: "3px",
        verticalAlign: "top",
        animation: ["typingBlink 1s infinite"]
    },
    typingNextWord: reactStyle([
        {
            maxWidth: 0,
        },
        {
            maxWidth: '30px',
        },
    ],['@keyframes typingNextWord', '0%',  '100%']),
    typingBlink: reactStyle([
        {
            opacity: "1" 
        },
        {
            opacity: "0"
        }
    ],['@keyframes typingBlink', '0%, 100%', '50%'])
};
