import React, { PureComponent } from "react";
import get from "get-object-value";
import Iframe from "organism-react-iframe";
import { Unsafe } from "react-atomic-molecule";
import callfunc from "call-func";

const VERSION = "[VERSION]";

class Asciidoc extends PureComponent {
  handleIframe = el => {
    this.iframe = el;
  };

  handleLoad = el => {
    const { onLoad } = this.props;
    this.iframe.postHeight();
    callfunc(onLoad, [el]);
  };

  clear() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    const oWin = this.iframe.getWindow();
    this.timer = setInterval(() => {
      if (oWin.renderDone) {
        this.clear();
        this.handleLoad(oWin.renderDone);
      }
    }, 10);
  }

  componentWillUnmount() {
    this.clear();
  }

  render() {
    const {
      js,
      css,
      inlineCSS,
      npmVersion,
      onLoadDelay,
      children,
      attributes
    } = this.props;
    let { options } = this.props;
    options = get(options, null, {});
    options.attributes = {
      ...get(options, ["attributes"], {}),
      ...attributes
    };

    const thisJs = js.replace(VERSION, npmVersion);
    const thisCss = css.replace(VERSION, npmVersion);

    const html = [
      `<link rel="stylesheet" type="text/css" href="${thisCss}" />`,
      `<script src="${thisJs}"></script>`,
      '<div id="data" style="display:none;">' + children + "</div>",
      '<div id="output"></div>',
      `
        <script>
	    var asciidoctor = Asciidoctor();
	    var html = asciidoctor.convert(
              document.getElementById('data').innerHTML,
              ${JSON.stringify(options)}
            );
            var output = document.getElementById('output');
	    output.innerHTML = html;
            setTimeout(function(){window.renderDone=output;}, ${onLoadDelay});
        </script>
        `
    ].join("");

    return (
      <Iframe ref={this.handleIframe} inlineCSS={inlineCSS} autoHeight>
        <Unsafe>{html}</Unsafe>
      </Iframe>
    );
  }
}

Asciidoc.defaultProps = {
  onLoadDelay: 3500,
  inlineCSS:
    "body {padding: 0; margin: 0; background: transparent !important;}",
  js:
    "//cdn.jsdelivr.net/npm/@asciidoctor/core@[VERSION]/dist/browser/asciidoctor.min.js",
  css:
    "//cdn.jsdelivr.net/npm/@asciidoctor/core@[VERSION]/dist/css/asciidoctor.css",
  npmVersion: "2.2.0"
};

export default Asciidoc;
