import React, {Component} from 'react';
import {Unsafe} from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import callfunc from 'call-func';
import get from 'get-object-value';
import {queryFrom} from 'css-query-selector';

const defaultAssets = {
  'grapes.min.css':
    'https://cdn.jsdelivr.net/npm/grapesjs@0.15.3/dist/css/grapes.min.css',
  'grapes.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs@0.15.3/dist/grapes.min.js',
  'ckeditor.js': 'https://cdn.jsdelivr.net/npm/ckeditor@4.6.2/ckeditor.js',
  'grapesjs-plugin-ckeditor.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs-plugin-ckeditor@0.0.9/dist/grapesjs-plugin-ckeditor.min.js',
  'grapesjs-preset-newsletter.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs-preset-newsletter@0.2.15/dist/grapesjs-preset-newsletter.min.js',
};

const ERROR_HTML_INVALID_SYNTAX = 'HTML invalid syntax';

class GrapesJsEdm extends Component {
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
    const editor = this.editor;
    let html = editor.getHtml() + `<style>${editor.getCss()}</style>`;
    if (html) {
      html = html.trim();
      const css = editor.getCss();
      if (css) {
        html += `<style>${css}</style>`;
      }
      return html;
    }
  }

  getDesign() {
    return this.getHtml();
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

  handleRemoveContent = e => {
    const tagName = get(e, ['attributes', 'tagName']);
    if ('mj-container' === tagName) {
      this.editor.setComponents('');
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

  getImportButtonName() {
    return 'gjs-open-import-template';
  }

  handleLoad = e => {
    this.iframeWindow = this.dIframe.contentWindow.window;
    this.iframeWindow.debug = this;
    let timer;
    timer = setInterval(() => {
      if (this.iframeWindow.initEditor) {
        clearInterval(timer);
        this.handleInitGrapesJS();
      }
    }, 10);
  };

  handleInitGrapesJS = () => {
    const {
      font,
      onEditorInit,
      onBeforeEditorInit,
      mergeTags,
      host,
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
    if (mergeTags) {
      extraPlugins = host.handleMergeTags(
        mergeTags,
        CKEDITOR,
        extraPlugins,
        toolbar,
      );
    }
    const plugins = ['gjs-preset-newsletter', 'gjs-plugin-ckeditor'];

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
      plugins,
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
        'gjs-preset-newsletter': {
          modalLabelImport: 'Paste all your code here below and click import',
          modalLabelExport: 'Copy the code and use it wherever you want',
          codeViewerTheme: 'material',
          cellStyle: {
            'font-size': '12px',
            'font-weight': 300,
            'vertical-align': 'top',
            color: 'rgb(111, 119, 125)',
            margin: 0,
            padding: 0,
          },
        },
      },
      ...init,
    };
    callfunc(onBeforeEditorInit, [{CKEDITOR, initGrapesJS, component: this}]);

    this.editor = this.iframeWindow.initEditor(initGrapesJS);
    this.initGrapesJS = initGrapesJS;
    this.editor.on('load', this.handleEditorLoad);
    this.editor.on('component:remove', this.handleRemoveContent);
    this.editor.on('asset:remove', this.handleRemoveAsset);
    callfunc(onEditorInit, [{editor: this.editor, component: this}]);
  };

  handleEditorLoad = () => {
    const {onEditorLoad, onError, design, images} = this.props;
    const doc = this.iframeWindow.document;
    this.editor.runCommand('core:open-blocks');
    this.updateImages(get(images));
    try {
      this.editor.setComponents(design);
    } catch (e) {
      callfunc(onError, [{e, design, message: ERROR_HTML_INVALID_SYNTAX}]);
      console.warn({e, design});
    }
    const css = queryFrom(
      get(queryFrom(this.iframeWindow.document).one('iframe'), [
        'contentWindow',
        'window',
        'document',
      ]),
    );
    doc.getElementById('root').className = '';
    callfunc(onEditorLoad, [{editor: this.editor, component: this}]);
  };

  render() {
    const {style, images, id} = this.props;
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
      <script src="${this.getAsset(
        'grapesjs-preset-newsletter.min.js',
      )}"></script>
      <script>
      CKEDITOR.dtd.$editable.a = 1;
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
        onLoad={this.handleLoad}>
        <Unsafe>{html}</Unsafe>
      </Iframe>
    );
  }
}

export default GrapesJsEdm;

const Styles = {
  iframe: {
    height: '100%',
  },
};
