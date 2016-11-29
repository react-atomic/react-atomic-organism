import React, {Component} from 'react';
import marked from 'marked';
import {ajaxDispatch} from 'organism-react-ajax';
import {Unsafe} from 'react-atomic-molecule';

class CodeReadme extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount()
    {
        let self = this;
        ajaxDispatch({
            type: 'ajaxGet',
            params: {
                url: this.props.url,
                updateUrl: false,
                callback: (json,text,o)=>
                {
                    if (200 === o.status) { 
                        self.setState({
                            text: text.replace(
                                /(\<\!\-\-hidden\-\-\>)([\s\S]*)(\<\!\-\-\/hidden\-\-\>)/g,
                                ''
                            )
                        });
                    }
                }
            }
        });
    }

    render()
    {
        const {text} = this.state;
        if (text) {
            return <Unsafe>{marked(text)}</Unsafe>;
        } else {
            return null;
        }
    }
}
export default CodeReadme;
