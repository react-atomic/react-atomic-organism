require("setimmediate");
import React, {PureComponent} from 'react'; 
import ReactDOM from 'react-dom';
import get from 'get-object-value';
import { SemanticUI } from 'react-atomic-molecule';

const keys = Object.keys;

class Iframe extends PureComponent
{
    html = null;

    componentDidMount()
    {
        this.root = document.createElement('div');
        this.getBody().appendChild(this.root);
        this.renderIframe(this.props);
    } 

    appendHtml = (html)=>
    {
        let div = document.createElement('div');
        div.innerHTML = html;
        const root = get(
            this.root,
            ['childNodes', 0, 'childNodes', 0],
            this.root
        );
        root.appendChild(div);
        this.handleScript(div);
    }

    getBody = ()=>
    {
        return this.el.contentWindow.document.body;
    }

    handleScript = (el) =>
    {
        // init variable
        let scriptCount = 0;
        let inlineScripts=[];
        let queueScripts=[];
        let handleScriptOnload = (i) => {
            if (i) {
                delete(queueScripts[i]);
            }
            if (!keys(queueScripts).length) {
                inlineScripts.forEach((script, key)=>{
                    this.el.contentWindow.window.eval(script);
                });
                inlineScripts = [];
            }
        };

        // start to parse
        const scripts = el.getElementsByTagName('script'); 
        let i=0;
        for (let i=0, len=scripts.length; i < len; i++) {
            const script = scripts[i]; 
            const src = get(script, ['src']);
            if (src) {
                let newScript = document.createElement('script');
                const key = 'id-'+scriptCount;
                newScript.src = src;
                this.root.parentNode.appendChild(newScript);
                newScript.key = key;
                newScript.onload = () => {
                    handleScriptOnload(newScript.key);
                };
                queueScripts[key] = true;
                scriptCount++;
            } else {
                inlineScripts.push(script.innerHTML);
            }
        }
        handleScriptOnload();
    }

    renderIframe(props)
    {
        const {children} = props;
        this.html = this.root.innerHTML;

        // setTimeout for https://gist.github.com/HillLiu/013d94ce76cfb7e8c46dd935164e4d72
        setImmediate(()=>{
            ReactDOM.render(
               <SemanticUI>{children}</SemanticUI>,
               this.root,
               () => {
                    const html = this.root.innerHTML;
                    if (html !== this.html) {
                        this.handleScript(this.root);
                    }
               }
            );
        });
    }

    componentWillReceiveProps(props)
    {
        this.renderIframe(props);
    }
    
    componentWillUnmount()
    {
        // https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
        ReactDOM.unmountComponentAtNode(this.root);
    }

    render()
    {
        const {children, ...others} = this.props;
        return (
            <SemanticUI
                {...others}
                atom="iframe"
                refCb={el=>this.el=el}
            />
        ); 
    }
}

export default Iframe;
