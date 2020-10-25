import React, { PureComponent } from "react";
import get from "get-object-value";
import Iframe from "organism-react-iframe";
import { Unsafe } from "react-atomic-molecule";
import callfunc from "call-func";
import windowOnload from "window-onload";
import query from "css-query-selector";

const VERSION = "[VERSION]";

class Asciidoc extends PureComponent {
  handleIframe = (el) => {
    this.iframe = el;
  };

  handleLoad = (el) => {
    const { onLoad } = this.props;
    this.iframe.postHeight();
    callfunc(onLoad, [el]);
  };

  clear() {
    if (this.clearWindowOnload) {
      this.clearWindowOnload();
    }
    if (this.onloadTimer) {
      clearTimeout(this.onloadTimer);
    }
  }

  componentDidMount() {
    const { onLoadDelay } = this.props;
    const oWin = this.iframe.getWindow();
    const { close, process } = windowOnload({
      doc: oWin.document,
    });
    this.clearWindowOnload = close;
    process(() => {
      const run = () => {
        this.onloadTimer = setTimeout(
          () => this.handleLoad(oWin.renderDone),
          onLoadDelay
        );
      };
      const imgs = query.all("img");
      const allImgLen = imgs.length;
      if (allImgLen) {
        let loadLen = 0;
        imgs.forEach((img) => {
          const oImg = new Image();
          oImg.onload = () => {
            loadLen++;
            if (loadLen >= allImgLen) {
              run();
            }
          };
          oImg.onerror = () => {
            loadLen++;
            if (loadLen >= allImgLen) {
              run();
            }
          };
          oImg.src = img.src;
        });
      } else {
        run();
      }
    });
  }

  componentWillUnmount() {
    this.clear();
  }

  render() {
    const { js, css, inlineCSS, npmVersion, children, attributes } = this.props;
    let { options } = this.props;
    options = get(options, null, {});
    options.attributes = {
      ...get(options, ["attributes"], {}),
      ...attributes,
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
            window.renderDone=output;
        </script>
        `,
    ].join("");

    return (
      <Iframe ref={this.handleIframe} inlineCSS={inlineCSS} autoHeight>
        <Unsafe>{html}</Unsafe>
      </Iframe>
    );
  }
}

Asciidoc.defaultProps = {
  onLoadDelay: 1500,
  inlineCSS:
    "body {padding: 0; margin: 0; background: transparent !important;}",
  js:
    "//cdn.jsdelivr.net/npm/@asciidoctor/core@[VERSION]/dist/browser/asciidoctor.min.js",
  css:
    "//cdn.jsdelivr.net/npm/@asciidoctor/core@[VERSION]/dist/css/asciidoctor.css",
  npmVersion: "2.2.0",
};

export default Asciidoc;
