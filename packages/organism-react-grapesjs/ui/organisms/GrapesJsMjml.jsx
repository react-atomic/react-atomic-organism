import React, {Component} from 'react';
import {Unsafe} from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import callfunc from 'call-func';
import get from 'get-object-value';

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

  handleEditorLoad = () => {
    const {onEditorLoad, images} = this.props;
    this.editor.runCommand('core:open-blocks');
    this.updateImages(get(images));
    this.iframeWindow.document.getElementById('root').className = '';
    callfunc(onEditorLoad, [{editor: this.editor, component: this}]);
  };

  handleContentRemove = e => {
    const tagName = get(e, ['attributes', 'tagName']);
    if ('mj-container' === tagName) {
      this.editor.setComponents(defaultMjml);
    }
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
      },
      ...init,
    };
    callfunc(onBeforeEditorInit, [{CKEDITOR, initGrapesJS, component: this}]);

    this.editor = this.iframeWindow.initEditor(initGrapesJS);
    this.initGrapesJS = initGrapesJS;
    this.editor.on('load', this.handleEditorLoad);
    this.editor.on('component:remove', this.handleContentRemove);
    this.editor.on('asset:remove', this.handleRemoveAsset);
    callfunc(onEditorInit, [{editor: this.editor, component: this}]);
  };

  handleRemoveAsset = asset => {
    const {onRemoveAsset} = this.props;
    const src = asset.get('src');
    const wrapper = this.editor.DomComponents.getWrapper();
    const images = wrapper.find('[src="' + src + '"]');
    if (images && images.length) {
      images.forEach(img => img.remove());
    }
    callfunc(onRemoveAsset, [asset]);
  };

  render() {
    const {style, mjml, images} = this.props;
    this.updateImages(get(images));
    const thisMjml =
      -1 !== (mjml || '').indexOf('mj-container') ? mjml : defaultMjml;
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
      <script src="${this.getAsset('grapesjs-mjml.min.js')}"></script>
      <script>
      CKEDITOR.dtd.$editable.a = 1;
      window.initEditor = function(init) {
         var editor = grapesjs.init(init); 
         return editor;
      };
     </script>
     <div class="hidden" id="root">
      <div class="loading">Loading...</div>
      <div id="gjs">${thisMjml}</div>
     </div> 
    `;
    const thisStyle = {
      ...Styles.iframe,
      ...style,
    };
    return (
      <Iframe
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

const defaultAssets = {
  'grapes.min.css': 'https://grapesjs.com/stylesheets/grapes.min.css?v0.14.61',
  'grapes.min.js': 'https://grapesjs.com/js/grapes.min.js?v0.14.61',
  'ckeditor.js': 'https://grapesjs.com/js/ckeditor/ckeditor.js',
  'grapesjs-plugin-ckeditor.min.js':
    'https://grapesjs.com/js/grapesjs-plugin-ckeditor.min.js',
  'grapesjs-mjml.min.js':
    'https://grapesjs.com/js/grapesjs-mjml.min.js?v=0.0.31',
};
const defaultMjml = `
  <mjml>
    <mj-body>
      <mj-container>
      </mj-container>
    </mj-body>
  </mjml>
`;
