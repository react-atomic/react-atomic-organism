import React, { Component } from "react";
import { Unsafe } from "react-atomic-molecule";
import Iframe from "organism-react-iframe";
import callfunc from "call-func";
import get from "get-object-value";
import { queryFrom } from "css-query-selector";
import { popupDispatch, FullScreen } from "organism-react-popup";
import { openCodeEditor } from "organism-react-codeeditor";

import { STRING } from "reshow-constant";

import fixHtml, { setSanitizeHtml } from "../../src/fixHtml";

import { setMjmlWindow } from "../../src/mjml2html";
import getAsset from "../../src/getAsset";
import getGjsPresetWebpage from "../../src/getGjsPresetWebpage";
import getInlinedHtmlCss from "../../src/getInlinedHtmlCss";
import { getCkeditorOption } from "../../src/getCkeditor";
import fixCountdown from "../../src/fixCountdown";
import plugCkeditor from "../../src/plugCkeditor";

const defaultAssets = {
  "sanitize-html":
    "https://cdn.jsdelivr.net/npm/sanitize-html@1.20.1/dist/sanitize-html.min.js",
  "grapesjs-preset-webpage.min.js":
    "https://cdn.jsdelivr.net/npm/grapesjs-preset-webpage@0.1.11/dist/grapesjs-preset-webpage.min.js",
};

const cleanClassReg = /(class\=")([^"]*)(c\d{0,4})(\s)?([^"]*)/g;

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

class GrapesJsWeb extends Component {
  static defaultProps = {
    allowScripts: true,
    disableCkeditor: false,
  };

  resetUploadField() {
    if (!this.iframeWindow) {
      return;
    }
    const dom = this.iframeWindow.document.getElementById("gjs-am-uploadFile");
    if (dom) {
      dom.value = "";
    }
  }

  store(cb) {
    this.editor.store((data) => {
      const html = getInlinedHtmlCss({
        html: get(data, ["gjs-html"]),
        css: get(data, ["gjs-css"]),
      });
      const design = data;
      callfunc(cb, [{ html, design }]);
    });
  }

  getAsset(fileName) {
    return getAsset(fileName, this.props, defaultAssets);
  }

  getImportButtonName() {
    return "gjs-open-import-webpage";
  }

  getHtml(isComponent) {
    const { host } = this.props;
    const html = this.getDesign();
    return host.toHtml(html, isComponent);
  }

  getDesign() {
    return getInlinedHtmlCss({ editor: this.editor });
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

  handleLoad = (e) => {
    this.iframeWindow = this.dIframe.contentWindow.window;
    this.iframeWindow.debug = this;
    setMjmlWindow(this.iframeWindow);
    this.timer = setInterval(() => {
      if (this.iframeWindow.initEditor) {
        clearInterval(this.timer);
        this.handleInitGrapesJS();
      }
    }, 10);
  };

  handleInitGrapesJS = () => {
    const {
      disableCkeditor,
      i18nMergeTags,
      font,
      mergeTags,
      allowScripts,
      onEditorInit,
      onBeforeEditorInit,
      host,
      init,
    } = this.props;

    const plugins = ["gjs-preset-webpage"];

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
      allowScripts,
      exportWrapper: true,
      noticeOnUnload: false,
      clearOnRender: true,
      height: "100%",
      storageManager: {
        autosave: false,
        autoload: false,
      },
      container: "#gjs",
      plugins,
      pluginsOpts: {
        ...ckeditorPluginOpt,
        "gjs-preset-webpage": getGjsPresetWebpage(),
      },
      ...init,
    };
    callfunc(onBeforeEditorInit, [{ CKEDITOR, initGrapesJS, component: this }]);

    const editor = this.iframeWindow.initEditor(initGrapesJS);
    const { BlockManager, Commands } = editor;
    this.editor = editor;
    this.initGrapesJS = initGrapesJS;
    Commands.extend("canvas-clear", {
      run() {
        host.execClean();
        return true;
      },
    });
    editor.on("load", this.handleEditorLoad);
    editor.on("asset:remove", this.handleRemoveAsset);
    this.hadleInitBlockManager(BlockManager);
    callfunc(onEditorInit, [{ editor, component: this }]);
  };

  hadleInitBlockManager = (blockManager) => {
    const { onInitBlockManager } = this.props;
    callfunc(onInitBlockManager, [{ blockManager, editor: this.editor }]);
  };

  handleInitStore = (editor) => {
    const storeM = editor.StorageManager;
    storeM.add("local", {
      store(data, clb, clbErr) {
        callfunc(clb, [data]);
      },
      load(keys, clb, clbErr) {
        console.log({ keys, clb, clbErr });
      },
    });
  };

  handleEditorLoad = () => {
    setTimeout(() => {
      const { host, onEditorLoad, onError, design } = this.props;
      const doc = this.iframeWindow.document;
      const editor = this.editor;
      setSanitizeHtml(this.iframeWindow.sanitizeHtml);
      fixCountdown(editor);
      this.handleInitStore(editor);
      host.execReset();
      if (design) {
        try {
          if (STRING === typeof design) {
            const html = fixHtml(design);
            editor.setComponents(html);
          } else {
            if (design["gjs-components"]) {
              editor.setComponents(JSON.parse(design["gjs-components"]));
            }
            if (design["gjs-styles"]) {
              editor.setStyle(JSON.parse(design["gjs-styles"]));
            }
          }
        } catch (e) {
          callfunc(onError, [
            { e, design, message: ERROR_HTML_INVALID_SYNTAX },
          ]);
          console.warn({ e, design });
        }
      }
      doc.getElementById("root").className = "";
      setTimeout(() => {
        callfunc(onEditorLoad, [{ editor, component: this }]);
        initViewSource(host);
      }, 10);
    }, 100);
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
      <script async src="${this.getAsset("sanitize-html")}"></script>
      <script async src="${this.getAsset("mjml.js")}"></script>
      <script src="${this.getAsset("grapes.min.js")}"></script>
      <script src="${this.getAsset("grapesjs-preset-webpage.min.js")}"></script>
      ${
        disableCkeditor
          ? ""
          : `<script src="${this.getAsset("ckeditor.js")}"></script>`
      }
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
        immutable
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

export default GrapesJsWeb;

const Styles = {
  iframe: {
    height: "100%",
  },
};
