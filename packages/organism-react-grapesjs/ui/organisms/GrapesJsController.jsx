import React, { Component } from "react";
import callfunc from "call-func";
import get from "get-object-value";

import GrapesJsWeb from "./GrapesJsWeb";
import GrapesJsEdm from "./GrapesJsEdm";
import GrapesJsMjml from "./GrapesJsMjml";

let grapesId = 0;

class GrapesJsController extends Component {
  static defaultProps = {
    i18nMergeTags: "Merge Tags",
    i18nCleanCanvas: "Are you sure to clean the canvas?"
  };

  getType() {
    const { web, type } = this.props;
    return web || type === "html" ? "html" : "mjml";
  }

  getPanel() {
    return get(this.editor, ["Panels"]);
  }

  getButtons(panelId) {
    const panelManager = this.getPanel();
    return panelManager.getPanel(panelId).get("buttons");
  }

  beforeGetCode() {
    const editor = this.getEditor();
    if (!editor) {
      return false;
    }
    const sel = editor.getSelected();
    if (sel && sel.view && sel.view.disableEditing) {
      sel.view.disableEditing();
    }
    return true;
  }

  getHtml(isComponent) {
    if (!this.beforeGetCode()) {
      return;
    }
    const strHtml = this.el && this.el.getHtml && this.el.getHtml(isComponent);
    return strHtml || "";
  }

  getDesign() {
    if (!this.beforeGetCode()) {
      return;
    }
    const strDesign = this.el && this.el.getDesign && this.el.getDesign();
    return strDesign || "";
  }

  getEditor() {
    return this.editor;
  }

  toHtml(html, isComponent) {
    if (html && !isComponent) {
      html = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${html}
</body>
</html>
`;
      return html;
    }
  }

  disableImport() {
    const type = this.getType();
    const panelManager = this.getPanel();
    const btnName = this.el.getImportButtonName();
    if ("html" === type) {
      const button = panelManager.getButton("options", btnName);
      button?.set("attributes", {
        style: "display:none"
      });
      return;
    }
    return panelManager.removeButton("options", btnName);
  }

  disableExport() {
    const type = this.getType();
    const panelManager = this.getPanel();
    if ("html" === type) {
      const button = panelManager.getButton("options", "export-template");
      button.set("attributes", {
        style: "display:none"
      });
      return;
    } else {
      return panelManager.removeButton("options", "export-template");
    }
  }

  handleMergeTags(mergeTags, CKEDITOR, extraPlugins, toolbar) {
    const { i18nMergeTags } = this.props;
    let isRun = 0;
    const buildList = function() {
      // !!important!! should not use arrow function
      this.startGroup(i18nMergeTags);
      const tags = callfunc(mergeTags);
      if (tags && tags.forEach) {
        // https://docs-old.ckeditor.com/ckeditor_api/symbols/src/plugins_richcombo_plugin.js.html
        // add : function( value, html, text )
        tags.forEach(m => this.add(m[0], m[1], m[2]));
      }
      if (isRun) {
        this._.committed = 0;
        this.commit();
      }
    };
    CKEDITOR.plugins.add("strinsert", {
      requires: ["richcombo"],
      init: editor => {
        editor.ui.addRichCombo("strinsert", {
          label: i18nMergeTags,
          title: i18nMergeTags,
          voiceLabel: i18nMergeTags,
          className: "cke_format",
          multiSelect: false,
          panel: {
            css: [editor.config.contentsCss, CKEDITOR.skin.getPath("editor")],
            voiceLabel: editor.lang.panelVoiceLabel
          },

          init: function() {
            editor.on("panelHide", () => {
              this._.list.element.$.innerHTML = "";
              this._.list._.items = {};
            });
            isRun = 0;
            buildList.call(this);
          },

          onOpen: function() {
            if (isRun) {
              buildList.call(this);
            }
            isRun = 1;
          },

          onClick: value => {
            editor.focus();
            editor.fire("saveSnapshot");
            editor.insertHtml(value);
            editor.fire("saveSnapshot");
          }
        });
      }
    });
    extraPlugins += ",strinsert";
    toolbar.push({ name: i18nMergeTags, items: ["strinsert"] });
    return extraPlugins;
  }

  handleEditorInit = e => {
    const { onEditorInit } = this.props;
    this.editor = e.editor;
    callfunc(onEditorInit, [e]);
  };

  handleEl = el => (this.el = el);

  execReset() {
    const { onReset, images } = this.props;
    callfunc(onReset, [{ editor: this.editor, component: this.el }]);
    this.execUpdateImages(get(images));
  }

  execClean() {
    const { i18nCleanCanvas } = this.props;
    const exec = () => {
      this.editor.runCommand("core:canvas-clear");
      this.execReset();
    };
    confirm(i18nCleanCanvas) && exec();
  }

  execUpdateImages(images) {
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

  componentDidMount() {
    const { id, debug } = this.props;
    if (id) {
      this.id = id;
    } else {
      if (!this.id) {
        this.id = "grapejs-" + grapesId;
        grapesId++;
      }
    }
    if (debug) {
      console.log(`$("#${this.id}").contentWindow.window.debug`);
    }
  }

  render() {
    const { web, debug, type, onReset, ...otherProps } = this.props;
    otherProps.id = this.id;
    otherProps.onEditorInit = this.handleEditorInit;
    otherProps.host = this;
    return this.getType() === "html" ? (
      web ? (
        <GrapesJsWeb ref={this.handleEl} {...otherProps} />
      ) : (
        <GrapesJsEdm ref={this.handleEl} {...otherProps} />
      )
    ) : (
      <GrapesJsMjml ref={this.handleEl} {...otherProps} />
    );
  }
}

export default GrapesJsController;
