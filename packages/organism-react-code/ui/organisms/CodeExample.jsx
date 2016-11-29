import React, {Component} from 'react';
import {lazyInject, List, Header, Segment, Icon} from 'react-atomic-molecule';
import CodeIcon from 'ricon/Code';
import CodeBlock from '../organisms/CodeBlock';
import CodeReadme from '../organisms/CodeReadme';

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
        const {header, children, code, git} = this.props;
        const state = this.state;
        let codeStyle = {};
        let thisCode;
        let thisReadme;
        if (!state.on) {
            codeStyle = Styles.hidden;
        } else {
            thisCode = <CodeBlock>{code}</CodeBlock>;
        }
        if (git) {
            let readmeUrl ='https://raw.githubusercontent.com/'+
                git.replace(/(\/blob\/master\/)/, '/master/')+
                'README.md'; 
            thisReadme = <Segment>
                    <CodeReadme url={readmeUrl}/>
            </Segment>;
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
                {thisReadme}
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
        maxHeight: 0,
        padding: '0 16px',
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
        transition: ['padding 500ms ease']
    }]    
};
