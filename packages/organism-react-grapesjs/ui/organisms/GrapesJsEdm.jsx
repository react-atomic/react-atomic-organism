import React, { Component } from "react";
import { Unsafe } from "react-atomic-molecule";
import Iframe from "organism-react-iframe";
import callfunc from "call-func";
import get from "get-object-value";
import { queryFrom } from "css-query-selector";
import { popupDispatch, FullScreen } from "organism-react-popup";
import { openCodeEditor } from "organism-react-codeeditor";

import fixHtml, { setSanitizeHtml } from "../../src/fixHtml";
import getAsset from "../../src/getAsset";
import getInlinedHtmlCss from "../../src/getInlinedHtmlCss";
import { getCkeditorOption } from "../../src/getCkeditor";
import plugCkeditor from "../../src/plugCkeditor";

const defaultAssets = {
  "sanitize-html":
    "https://cdn.jsdelivr.net/npm/sanitize-html@1.20.1/dist/sanitize-html.min.js",
  "grapesjs-preset-newsletter.min.js":
    "https://cdn.jsdelivr.net/npm/grapesjs-preset-newsletter@0.2.15/dist/grapesjs-preset-newsletter.min.js",
};

const ERROR_HTML_INVALID_SYNTAX = "HTML invalid syntax";

const initViewSource = (host) => {
  const panelManager = host.getPanel();
  panelManager.addButton("options", [
    {
      id: "edit-code",
      className: "gjs-pn-btn fa fa-code",
      command: (editor, sender) => {
        openCodeEditor(host.getDesign(), (code) => {
          editor.runCommand("core:canvas-clear");
          editor.setComponents(code);
        });
      },
      attributes: { title: "Edit Html" },
    },
  ]);
};

class GrapesJsEdm extends Component {
  getAsset(fileName) {
    return getAsset(fileName, this.props, defaultAssets);
  }

  resetUploadField() {
    if (!this.iframeWindow) {
      return;
    }
    const dom = this.iframeWindow.document.getElementById("gjs-am-uploadFile");
    if (dom) {
      dom.value = "";
    }
  }

  getHtml() {
    const { host } = this.props;
    const html = this.getDesign();
    return host.toHtml(html);
  }

  getDesign() {
    return getInlinedHtmlCss({ editor: this.editor });
  }

  updateImages(images) {
    if (images) {
      this.images = images;
    } else {
      images = this.images;
    }
    if (this.editor) {
      const assetManager = this.editor.AssetManager;
      if (assetManager) {
        if (images && images.length) {
          assetManager.add(images);
        }
      }
    }
  }

  handleIframe = (el) => {
    this.dIframe = el;
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

  getImportButtonName() {
    return "gjs-open-import-template";
  }

  handleLoad = (e) => {
    this.iframeWindow = this.dIframe.contentWindow.window;
    this.iframeWindow.debug = this;
    this.timer = setInterval(() => {
      if (this.iframeWindow.initEditor) {
        clearInterval(this.timer);
        this.handleInitGrapesJS();
      }
    }, 10);
  };

  handleInitGrapesJS = () => {
    const {
      i18nMergeTags,
      font,
      mergeTags,
      onEditorInit,
      onBeforeEditorInit,
      init,
    } = this.props;

    const plugins = ["gjs-preset-newsletter", "gjs-plugin-ckeditor"];

    const CKEDITOR = this.iframeWindow.CKEDITOR;
    plugCkeditor({ grapesjs: this.iframeWindow.grapesjs, CKEDITOR });

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
        ...getCkeditorOption({
          CKEDITOR,
          i18nMergeTags,
          font,
          mergeTags,
        }),
        "gjs-preset-newsletter": {
          modalLabelImport: "Paste all your code here below and click import",
          modalLabelExport: "Copy the code and use it wherever you want",
          codeViewerTheme: "material",
          cellStyle: {
            "font-size": "12px",
            "font-weight": 300,
            "vertical-align": "top",
            color: "rgb(111, 119, 125)",
            margin: 0,
            padding: 0,
          },
        },
      },
      ...init,
    };
    callfunc(onBeforeEditorInit, [{ CKEDITOR, initGrapesJS, component: this }]);

    this.editor = this.iframeWindow.initEditor(initGrapesJS);
    this.initGrapesJS = initGrapesJS;
    this.editor.on("load", this.handleEditorLoad);
    this.editor.on("asset:remove", this.handleRemoveAsset);
    callfunc(onEditorInit, [{ editor: this.editor, component: this }]);
  };

  handleEditorLoad = () => {
    const { host, onEditorLoad, onError, design, images } = this.props;
    const doc = this.iframeWindow.document;
    setSanitizeHtml(this.iframeWindow.sanitizeHtml);
    this.updateImages(get(images));
    try {
      this.editor.setComponents(fixHtml(design));
    } catch (e) {
      callfunc(onError, [{ e, design, message: ERROR_HTML_INVALID_SYNTAX }]);
      console.warn({ e, design });
    }
    doc.getElementById("root").className = "";
    callfunc(onEditorLoad, [{ editor: this.editor, component: this }]);
    initViewSource(host);
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
    const { style, images, id } = this.props;
    this.updateImages(get(images));
    const html = `
      <link rel="stylesheet" href="${this.getAsset("grapes.min.css")}" />
      <style>
        .gjs-pn-buttons {overflow: hidden}
        .loading {display: none}
        #root.hidden .loading {display: block; visibility: visible}
        #root.hidden {visibility: hidden}
      </style>
      <script async src="${this.getAsset("sanitize-html")}"></script>
      <script src="${this.getAsset("grapes.min.js")}"></script>
      <script src="${this.getAsset("ckeditor.js")}"></script>
      <script src="${this.getAsset(
        "grapesjs-preset-newsletter.min.js"
      )}"></script>
      <script>
      window.initEditor = function(init) {
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

export default GrapesJsEdm;

const Styles = {
  iframe: {
    height: "100%",
  },
};
