import React, {Component} from 'react';
import {Unsafe} from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import callfunc from 'call-func';
import get from 'get-object-value';
import {queryFrom} from 'css-query-selector';
import MjmlPlguin from '../../src/grapesjs-mjml';

const defaultAssets = {
  'grapes.min.css':
    'https://cdn.jsdelivr.net/npm/grapesjs@0.15.3/dist/css/grapes.min.css',
  'grapes.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs@0.15.3/dist/grapes.min.js',
  'ckeditor.js': 'https://cdn.jsdelivr.net/npm/ckeditor@4.6.2/ckeditor.js',
  'grapesjs-plugin-ckeditor.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs-plugin-ckeditor@0.0.9/dist/grapesjs-plugin-ckeditor.min.js',
  'grapesjs-mjml.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs-mjml@0.0.31/dist/grapesjs-mjml.min.js',
};

const defaultMjml = `
  <mjml>
    <mj-body>
      <mj-container>
        <mj-section>
          <mj-column>
            <mj-text>Content 1</mj-text>
          </mj-column>
        </mj-section>
      </mj-container>
    </mj-body>
  </mjml>
`;

class GrapesJsMjml extends Component {
  getAsset(fileName) {
    const {assetPath} = this.props;
    if (assetPath) {
      return assetPath + fileName;
    } else {
      return defaultAssets[fileName];
    }
  }

  resetUploadField() {
    if (!this.iframeWindow) {
      return;
    }
    const dom = this.iframeWindow.document.getElementById('gjs-am-uploadFile');
    if (dom) {
      dom.value = '';
    }
  }

  beforeGetHtml() {
    if (!this.editor) {
      return false;
    }
    const sel = this.editor.getSelected();
    if (sel && sel.view && sel.view.disableEditing) {
      sel.view.disableEditing();
    }
    return true;
  }

  getHtml() {
    if (!this.beforeGetHtml()) {
      return;
    }
    let html = this.editor.runCommand('mjml-get-code');
    if (html && html.html) {
      html = html.html.trim();
      return html;
    }
  }

  getMjml() {
    if (!this.beforeGetHtml()) {
      return;
    }
    let mjml = (this.editor.getHtml() || '').trim();
    mjml = mjml.replace(
      /(\<mj\-image)([^\>]*)(\>)/gi,
      s => s.substring(0, s.length - 2) + '></mj-image>',
    );
    return mjml;
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

  handleIframe = el => {
    this.dIframe = el;
  };

  getImportButtonName() {
    return 'mjml-import';
  }

  handleLoad = e => {
    this.iframeWindow = this.dIframe.contentWindow.window;
    let timer;
    timer = setInterval(() => {
      if (this.iframeWindow.initEditor) {
        clearInterval(timer);
        this.handleInitGrapesJS();
      }
    }, 10);
  };

  getImportButtonName() {
    return 'mjml-import';
  }

  handleEditorLoad = () => {
    const {onEditorLoad, mjml, images} = this.props;
    const doc = this.iframeWindow.document;
    // this.editor.runCommand('core:open-blocks');
    this.updateImages(get(images));
    const thisMjml =
      -1 !== (mjml || '').indexOf('mj-container') ? mjml : defaultMjml;
    this.editor.setComponents(thisMjml);
    const css = queryFrom(
      get(queryFrom(this.iframeWindow.document).one('iframe'), [
        'contentWindow',
        'window',
        'document',
      ]),
    );
    const embedHead = css.one('head');
    const style = document.createElement('style');
    style.innerHTML = `div[data-gjs-type="mj-container"]{ min-height: 100vh !important; }`;
    embedHead.appendChild(style);
    doc.getElementById('root').className = '';
    callfunc(onEditorLoad, [{editor: this.editor, component: this}]);
  };

  handleRemoveContent = e => {
    const tagName = get(e, ['attributes', 'tagName']);
    if ('mj-container' === tagName) {
      this.editor.setComponents(defaultMjml);
    }
  };

  handleRemoveAsset = asset => {
    const {onRemoveAsset} = this.props;
    const src = asset.get('src');
    const wrapper = this.editor.DomComponents.getWrapper();
    const css = queryFrom(
      get(queryFrom(this.iframeWindow.document).one('iframe'), [
        'contentWindow',
        'window',
        'document',
      ]),
    );
    const images = css.all('img[src="' + src + '"]');
    if (images && images.length) {
      images.forEach(img => {
        const ancestor = css.ancestor(img, '[data-gjs-type="mj-image"]');
        if (ancestor) {
          const ancestorWrapper = wrapper.find('#' + ancestor.id);
          ancestorWrapper[0].remove();
        }
      });
    }
    callfunc(onRemoveAsset, [asset]);
  };

  handleMergeFields(mergeFields, CKEDITOR, extraPlugins, toolbar) {
    CKEDITOR.plugins.add('strinsert', {
      requires: ['richcombo'],
      init: function(editor) {
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
            this.startGroup('Insert Content');
            // https://docs-old.ckeditor.com/ckeditor_api/symbols/src/plugins_richcombo_plugin.js.html
            // add : function( value, html, text )
            mergeFields.forEach(m => this.add(m[0], m[1], m[2]));
          },

          onClick: function(value) {
            editor.focus();
            editor.fire('saveSnapshot');
            editor.insertHtml(value);
            editor.fire('saveSnapshot');
          },
        });
      },
    });
    extraPlugins += ',strinsert';
    toolbar.push({name: 'Merge Fields', items: ['strinsert']});
    return extraPlugins;
  }

  handleInitGrapesJS = () => {
    const {
      font,
      onEditorInit,
      onBeforeEditorInit,
      mergeFields,
      init,
    } = this.props;
    const CKEDITOR = this.iframeWindow.CKEDITOR;
    let extraPlugins = 'sharedspace,justify,colorbutton,panelbutton,font';
    const fontItems = font ? ['Font'] : [];
    fontItems.push('FontSize');
    const toolbar = [
      {name: 'styles', items: fontItems},
      ['Bold', 'Italic', 'Underline', 'Strike'],
      {name: 'paragraph', items: ['NumberedList', 'BulletedList']},
      {name: 'links', items: ['Link', 'Unlink']},
      {name: 'colors', items: ['TextColor', 'BGColor']},
    ];
    if (mergeFields) {
      extraPlugins = this.handleMergeFields(
        mergeFields,
        CKEDITOR,
        extraPlugins,
        toolbar,
      );
    }
    const initGrapesJS = {
      noticeOnUnload: false,
      clearOnRender: true,
      height: '100%',
      storageManager: {
        autosave: false,
        autoload: false,
        type: null,
      },
      container: '#gjs',
      fromElement: true,
      plugins: ['grapesjs-mjml', 'gjs-plugin-ckeditor'],
      pluginsOpts: {
        'gjs-plugin-ckeditor': {
          position: 'center',
          options: {
            startupFocus: true,
            extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
            allowedContent: true, // Disable auto-formatting, class removing, etc.
            enterMode: CKEDITOR.ENTER_BR,
            extraPlugins,
            toolbar,
          },
        },
        'grapesjs-mjml': {
          columnsPadding: 0,
        },
      },
      ...init,
    };
    callfunc(onBeforeEditorInit, [{CKEDITOR, initGrapesJS, component: this}]);

    this.editor = this.iframeWindow.initEditor(initGrapesJS, MjmlPlguin);
    this.initGrapesJS = initGrapesJS;
    this.editor.on('load', this.handleEditorLoad);
    this.editor.on('component:remove', this.handleRemoveContent);
    this.editor.on('asset:remove', this.handleRemoveAsset);
    callfunc(onEditorInit, [{editor: this.editor, component: this}]);
  };

  render() {
    const {id, style, images} = this.props;
    this.updateImages(get(images));
    const html = `
      <link rel="stylesheet" href="${this.getAsset('grapes.min.css')}" />
      <style>
      .gjs-pn-buttons {overflow: hidden}
      .loading {display: none}
      #root.hidden .loading {display: block; visibility: visible}
      #root.hidden {visibility: hidden}
      </style>
      <script src="${this.getAsset('grapes.min.js')}"></script>
      <script src="${this.getAsset('ckeditor.js')}"></script>
      <script src="${this.getAsset(
        'grapesjs-plugin-ckeditor.min.js',
      )}"></script>
      <script>
      CKEDITOR.dtd.$editable.a = 1;
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
        onLoad={this.handleLoad}>
        <Unsafe>{html}</Unsafe>
      </Iframe>
    );
  }
}

export default GrapesJsMjml;

const Styles = {
  iframe: {
    height: '100%',
  },
};
