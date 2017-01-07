import React, {Component} from 'react'; 
import ReactDOM from 'react-dom';
import get from 'get-object-value';
import { SemanticUI } from 'react-atomic-molecule';

const keys = Object.keys;

class Iframe extends Component
{
    componentDidMount()
    {
        const iframeD = this.el.contentWindow.document;
        this.root = document.createElement('div');
        iframeD.body.appendChild(this.root);
        this.renderIframe(this.props);
    } 

    renderIframe(props)
    {
        const {children} = props;

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
                    delete(inlineScripts[key]);
                });
            }
        };

        // setTimeout for https://gist.github.com/HillLiu/013d94ce76cfb7e8c46dd935164e4d72
        setTimeout(()=>{
            ReactDOM.render(
               <SemanticUI>{children}</SemanticUI>,
               this.root,
               () => {
                    const scripts = this.root.getElementsByTagName('script'); 
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
