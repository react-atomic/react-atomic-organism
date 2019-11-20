import React, {Component} from 'react';
import callfunc from 'call-func';
import get from 'get-object-value';

import GrapesJsEdm from './GrapesJsEdm';
import GrapesJsMjml from './GrapesJsMjml';

let grapesId = 0;

class GrapesJsController extends Component {
  getType() {
    const {type} = this.props;
    return type === 'html' ? 'html' : 'mjml';
  }

  getPanel() {
    return get(this.editor, ['Panels']);
  }

  getHtml() {
    return this.el && this.el.getHtml && this.el.getHtml();
  }

  getDesign() {
    return this.el && this.el.getDesign && this.el.getDesign();
  }

  disableImport() {
    const type = this.getType();
    if ('html' === type) {
      return;
    }
    const panelManager = this.getPanel();
    const btnName = this.el.getImportButtonName();
    return panelManager.removeButton('options', btnName);
  }

  disableExport() {
    const type = this.getType();
    if ('html' === type) {
      return;
    }
    const panelManager = this.getPanel();
    return panelManager.removeButton('options', 'export-template');
  }

  handleMergeTags(mergeTags, CKEDITOR, extraPlugins, toolbar) {
    let isRun = 0;
    CKEDITOR.plugins.add('strinsert', {
      requires: ['richcombo'],
      init: editor => {
        editor.ui.addRichCombo('strinsert', {
          label: 'Merge Tags',
          title: 'Merge Tags',
          voiceLabel: 'Insert Content',
          className: 'cke_format',
          multiSelect: false,
          panel: {
            css: [editor.config.contentsCss, CKEDITOR.skin.getPath('editor')],
            voiceLabel: editor.lang.panelVoiceLabel,
          },

          init: function() {
            // https://docs-old.ckeditor.com/ckeditor_api/symbols/src/plugins_richcombo_plugin.js.html
            // add : function( value, html, text )

            editor.on('panelHide', () => {
              this._.list.element.$.innerHTML = '';
              this._.list._.items = {};
            });
          },

          onOpen: function() {
            const buildList = () => {
              this.startGroup('Insert Content');
              const tags = callfunc(mergeTags);
              if (tags && tags.forEach) {
                tags.forEach(m => this.add(m[0], m[1], m[2]));
              }
              if (isRun) {
                this._.committed = 0;
                this.commit();
              }
            };
            buildList();
            isRun = 1;
          },

          onClick: value => {
            editor.focus();
            editor.fire('saveSnapshot');
            editor.insertHtml(value);
            editor.fire('saveSnapshot');
          },
        });
      },
    });
    extraPlugins += ',strinsert';
    toolbar.push({name: 'Merge Tags', items: ['strinsert']});
    return extraPlugins;
  }

  handleEditorInit = e => {
    const {onEditorInit} = this.props;
    this.editor = e.editor;
    callfunc(onEditorInit, [e]);
  };

  handleEl = el => (this.el = el);

  componentDidMount() {
    const {id, debug} = this.props;
    if (id) {
      this.id = id;
    } else {
      if (!this.id) {
        this.id = 'grapejs-' + grapesId;
        grapesId++;
      }
    }
    if (debug) {
      console.log(`$("#${this.id}").contentWindow.window.debug`);
    }
  }

  render() {
    const {debug, type, ...otherProps} = this.props;
    otherProps.id = this.id;
    otherProps.onEditorInit = this.handleEditorInit;
    otherProps.host = this;
    return this.getType() === 'html' ? (
      <GrapesJsEdm ref={this.handleEl} {...otherProps} />
    ) : (
      <GrapesJsMjml ref={this.handleEl} {...otherProps} />
    );
  }
}

export default GrapesJsController;
