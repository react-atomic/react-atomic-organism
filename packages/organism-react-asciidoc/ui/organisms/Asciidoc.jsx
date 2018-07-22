import React, {PureComponent} from 'react';
import get from 'get-object-value';
import Iframe from 'organism-react-iframe';
import {Unsafe} from 'react-atomic-molecule';

const VERSION = '[VERSION]'

class Asciidoc extends PureComponent 
{
   render()
   {
    const {js, css, npmVersion, children, attributes} = this.props;
    let {options} = this.props;
    options = get(options, null, {});
    options.attributes = {
        ...get(options, ['attributes'], {}),
        ...attributes
    }

    const thisJs = js.replace(VERSION, npmVersion)
    const thisCss = css.replace(VERSION, npmVersion)

    const html = [
        `<link rel="stylesheet" type="text/css" href="${thisCss}" />`,
        `<script src="${thisJs}"></script>`,
	'<div id="data" style="display:none;">'+children+'</div>',
	'<div id="output"></div>',
        `
        <script>
	    var asciidoctor = Asciidoctor();
	    var html = asciidoctor.convert(document.getElementById('data').innerHTML, ${JSON.stringify(options)}) 
	    document.getElementById('output').innerHTML = html
	    setTimeout(function(){
		parent.window.postMessage({
		    type: 'iframeH|asciidoc',
		    h: document.body.offsetHeight,
		}, '*')
	    },100)
        </script>
        ` 
    ].join('');
    return <Iframe scrolling="no"><Unsafe>{html}</Unsafe></Iframe>
   }
}

Asciidoc.defaultProps = {
    js: `//cdn.jsdelivr.net/npm/asciidoctor.js@${VERSION}/dist/browser/asciidoctor.min.js`,
    css: `//cdn.jsdelivr.net/npm/asciidoctor.js@${VERSION}/dist/css/asciidoctor.css`,
    npmVersion: '1.5.7-beta.1'
}

export default Asciidoc
