import React, {Component} from 'react';
import {lazyInject, List, Header, Segment, SemanticUI, Icon} from 'react-atomic-molecule';
import CodeIcon from 'ricon/Code';
import GitIcon from 'ricon/Git';
import NpmIcon from 'ricon/Npm';
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
        const {header, children, code, git, npm, id} = this.props
        const state = this.state;
        let codeStyle = {};
        let thisCode;
        let thisReadme;
        let thisGit;
        let thisNpm;
        if (!state.on) {
            codeStyle = Styles.hidden;
        } else {
            thisCode = <CodeBlock>{code}</CodeBlock>;
        }
        if (git) {
            let readmeUrl ='https://raw.githubusercontent.com/'+
                git.replace(/(\/(blob|tree)\/master\/)/, '/master/')+
                'README.md'; 
            let gitUrl = 'https://github.com/'+git;
            thisReadme = <CodeReadme url={readmeUrl}/>;
            thisGit = <Icon atom="a" target="_blank" href={gitUrl} style={Styles.icon}>
                <GitIcon />
            </Icon>;
        }
        if (npm) {
            let npmUrl = 'https://npm.im/'+npm;
            thisNpm = <Icon atom="a" target="_blank" href={npmUrl} style={Styles.icon}>
                <NpmIcon />
            </Icon>;
        }
        return (
            <List type="segment" id={id}> 
                <Segment className="tertiary">
                    <Header style={Styles.header} className="grey">{header}</Header>
                    <SemanticUI style={Styles.iconBlock}>
                        {thisNpm}
                        {thisGit}
                        <Icon onClick={this.handleClick} style={Styles.icon}><CodeIcon /></Icon>
                    </SemanticUI>
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
    iconBlock: {
        position: 'absolute',
        top: 16,
        right: 6,
    },
    icon: {
        maxWidth: 24,
        cursor: 'pointer',
        marginRight: 10
    },
};

let injects;
const InjectStyles = {
    code: [{
        transition: ['padding 500ms ease']
    }]    
};
