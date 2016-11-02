import React, {Component} from 'react';
import {lazyInject, List, Header, Segment, Icon} from 'react-atomic-molecule';
import CodeIcon from 'ricon/Code';
import CodeBlock from '../organisms/CodeBlock';

class CodeExample extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            on: false
        };
        injects = lazyInject (
            injects,
            InjectStyles
        );
    }

    handleClick = ()=>
    {
        this.setState({
            on: !this.state.on
        });
    }

    render()
    {
        const {header, children, code} = this.props;
        const state = this.state;
        let codeStyle = {};
        let thisCode;
        if (!state.on) {
            codeStyle = Styles.hidden;
        } else {
            thisCode = <CodeBlock>{code}</CodeBlock>;
        }
        return (
            <List type="segment"> 
                <Segment className="tertiary">
                    <Header style={Styles.header} className="grey">{header}</Header>
                    <Icon onClick={this.handleClick} style={Styles.icon}><CodeIcon /></Icon>
                </Segment>
                <Segment 
                    className="secondary"
                    style={codeStyle}
                    styles={injects.code}
                >
                    {thisCode} 
                </Segment>
                <Segment>{children}</Segment>
            </List>
        );
    }
}
export default CodeExample;

const Styles = {
    header: {
        margin: 0
    },
    hidden: {
        height: 0,
        padding: 0,
        margin: 0,
        ovarflow: 'hidden'
    },
    icon: {
        maxWidth: 24,
        position: 'absolute',
        top: 16,
        right: 16,
        cursor: 'pointer'
    },
};

let injects;
const InjectStyles = {
    code: [{
        transition: ['box-shadow 0.2s ease, padding 0.2s ease']
    }]    
};
