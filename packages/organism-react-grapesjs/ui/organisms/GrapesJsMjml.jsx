import React, { Component } from "react";
import { Unsafe } from "react-atomic-molecule";
import Iframe from "organism-react-iframe";
import callfunc from "call-func";
import get, { getDefault } from "get-object-value";
import { queryFrom } from "css-query-selector";

import { setMjmlWindow } from "../../src/mjml2html";
import getAsset from "../../src/getAsset";
import { getCkeditorOption } from "../../src/getCkeditor";
import plugCkeditor from "../../src/plugCkeditor";

const defaultAssets = {
  "mjml.js":
    "https://cdn.jsdelivr.net/npm/organism-react-grapesjs@0.3.1/dist/mjml.min.js",
  //    "http://localhost:8000/assets/mjml.bundle.js",
};

const defaultMjml = `
  <mjml>
    <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>Content 1</mj-text>
          </mj-column>
        </mj-section>
    </mj-body>
  </mjml>
`;

class GrapesJsMjml extends Component {
  static defaultProps = { disableCkeditor: false };

  resetUploadField() {
    if (!this.iframeWindow) {
      return;
    }
    const dom = this.iframeWindow.document.getElementById("gjs-am-uploadFile");
    if (dom) {
      dom.value = "";
    }
  }

  getAsset(fileName) {
    return getAsset(fileName, this.props, defaultAssets);
  }

  getHtml() {
    // get html with run mjml-get-code
    let html = this.editor.runCommand("mjml-get-code");
    if (html && html.html) {
      html = html.html.trim();
      return html;
    }
  }

  getDesign() {
    // get mjml from grapesjs editor
    let mjml = (this.editor.getHtml() || "").trim();
    mjml = mjml.replace(
      /(\<mj\-image)([^\>]*)(\>)/gi,
      (s) => s.substring(0, s.length - 2) + "></mj-image>"
    );
    return mjml;
  }

  getImportButtonName() {
    return "mjml-import";
  }

  handleIframe = (el) => {
    this.dIframe = el;
  };

  handleLoad = (e) => {
    const ifw = this.dIframe.contentWindow?.window;
    if (!ifw) {
      return;
    }
    this.iframeWindow = ifw;
    ifw.debug = this;
    setMjmlWindow(ifw);
    this.timer = setInterval(() => {
      if (ifw.initEditor && ifw.mjml2html) {
        clearInterval(this.timer);
        this.handleInitGrapesJS();
      }
    }, 10);
  };

  handleEditorLoad = () => {
    const { onEditorLoad, design, images, host } = this.props;
    const doc = this.iframeWindow.document;
    // this.editor.runCommand('core:open-blocks');
    host.execUpdateImages(get(images));
    const thisMjml =
      -1 !== (design || "").indexOf("mj-body") ? design : defaultMjml;
    this.editor.setComponents(thisMjml);
    doc.getElementById("root").className = "";
    callfunc(onEditorLoad, [{ editor: this.editor, component: this }]);
  };

  handleRemoveContent = (e) => {
    const tagName = get(e, ["attributes", "tagName"]);
    if ("mj-body" === tagName) {
      this.editor.setComponents(defaultMjml);
    }
  };

  handleRemoveAsset = (asset) => {
    const { onRemoveAsset } = this.props;
    const src = asset.get("src");
    const wrapper = this.editor.DomComponents.getWrapper();
    const css = queryFrom(
      get(queryFrom(this.iframeWindow.document).one("iframe"), [
        "contentWindow",
        "window",
        "document",
      ])
    );
    const images = css.all('img[src="' + src + '"]');
    if (images && images.length) {
      images.forEach((img) => {
        const ancestor = css.ancestor(img, '[data-gjs-type="mj-image"]');
        if (ancestor) {
          const ancestorWrapper = wrapper.find("#" + ancestor.id);
          ancestorWrapper[0].remove();
        }
      });
    }
    callfunc(onRemoveAsset, [asset]);
  };

  handleInitGrapesJS = () => {
    const {
      disableCkeditor,
      i18nMergeTags,
      font,
      mergeTags,
      onEditorInit,
      onBeforeEditorInit,
      init,
    } = this.props;

    const plugins = ["grapesjs-mjml"];

    const CKEDITOR = disableCkeditor ? null : this.iframeWindow.CKEDITOR;
    let ckeditorPluginOpt = {};
    if (!disableCkeditor) {
      plugins.push("gjs-plugin-ckeditor");
      plugCkeditor({ grapesjs: this.iframeWindow.grapesjs, CKEDITOR });
      ckeditorPluginOpt = getCkeditorOption({
        CKEDITOR,
        i18nMergeTags,
        font,
        mergeTags,
      });
    }

    const initGrapesJS = {
      noticeOnUnload: false,
      clearOnRender: true,
      height: "100%",
      storageManager: {
        autosave: false,
        autoload: false,
        type: null,
      },
      container: "#gjs",
      plugins,
      pluginsOpts: {
        ...ckeditorPluginOpt,
        "grapesjs-mjml": {
          columnsPadding: 0,
        },
      },
      ...init,
    };
    callfunc(onBeforeEditorInit, [{ CKEDITOR, initGrapesJS, component: this }]);

    import("../../src/grapesjs-mjml").then((MjmlPlguin) => {
      MjmlPlguin = getDefault(MjmlPlguin);
      this.editor = this.iframeWindow.initEditor(initGrapesJS, MjmlPlguin);
      this.initGrapesJS = initGrapesJS;
      this.editor.on("load", this.handleEditorLoad);
      this.editor.on("component:remove", this.handleRemoveContent);
      this.editor.on("asset:remove", this.handleRemoveAsset);
      callfunc(onEditorInit, [{ editor: this.editor, component: this }]);
    });
  };

  clearTimeout = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  componentWillUnmount() {
    this.clearTimeout();
  }

  render() {
    const { style, images, id, disableCkeditor, host } = this.props;
    host.execUpdateImages(get(images));
    const html = `
      <link rel="stylesheet" href="${this.getAsset("grapes.min.css")}" />
      <style>
      .gjs-pn-buttons {overflow: hidden}
      .loading {display: none}
      #root.hidden .loading {display: block; visibility: visible}
      #root.hidden {visibility: hidden}
      </style>
      <script async src="${this.getAsset("mjml.js")}"></script>
      <script src="${this.getAsset("grapes.min.js")}"></script>
      ${
        disableCkeditor
          ? ""
          : `<script src="${this.getAsset("ckeditor.js")}"></script>`
      }
      <script>
        window.initEditor = function(init, mjml) {
           grapesjs.plugins.add('grapesjs-mjml', mjml);
           return grapesjs.init(init); 
        };
     </script>
     <div class="hidden" id="root">
      <div class="loading">Loading...</div>
      <div id="gjs"></div>
     </div> 
    `;
    const thisStyle = {
      ...Styles.iframe,
      ...style,
    };
    return (
      <Iframe
        id={id}
        style={thisStyle}
        refCb={this.handleIframe}
        onLoad={this.handleLoad}
      >
        <Unsafe>{html}</Unsafe>
      </Iframe>
    );
  }
}

export default GrapesJsMjml;

const Styles = {
  iframe: {
    height: "100%",
  },
};
