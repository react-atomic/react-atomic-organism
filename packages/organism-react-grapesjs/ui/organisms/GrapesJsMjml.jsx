import React, {Component} from 'react';
import {Unsafe} from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import callfunc from 'call-func';
import get from 'get-object-value';
import {localStorage} from 'get-storage';

class GrapesJsMjml extends Component {
  getAsset(fileName) {
    const {assetPath} = this.props;
    if (assetPath) {
      return assetPath + fileName;
    } else {
      return defaultAssets[fileName];
    }
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
        if (!images || !images.length) {
          localStorage('gjs-mjml-assets')(null);
        } else {  
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
    callfunc(onEditorLoad, [{editor: this.editor, component: this}]);
  };

  handleContentRemove = e => {
    const tagName = get(e, ['attributes', 'tagName']);
    if ('mj-container' === tagName) {
      this.editor.setComponents(defaultMjml);
    }
  };

  handleInitGrapesJS = () => {
    const {onEditorInit, onCKEditorInit, mergeFields, init} = this.props;
    const CKEDITOR = this.iframeWindow.CKEDITOR;
    let extraPlugins = 'sharedspace,justify,colorbutton,panelbutton,font';
    const toolbar = [
      {name: 'styles', items: ['Font', 'FontSize']},
      ['Bold', 'Italic', 'Underline', 'Strike'],
      {name: 'paragraph', items: ['NumberedList', 'BulletedList']},
      {name: 'links', items: ['Link', 'Unlink']},
      {name: 'colors', items: ['TextColor', 'BGColor']},
    ];
    if (mergeFields) {
      extraPlugins+=',strinsert';
      toolbar.push({name: 'Merge Fields', items: [ 'strinsert' ]},);
    }  
    const initGrapesJS = {
      clearOnRender: true,
      height: '100%',
      storageManager: {id: 'gjs-mjml-'},
      assetManager: {
        upload: 0,
        uploadText: 'Uploading is not available in this demo',
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
    callfunc(onCKEditorInit, [{CKEDITOR, initGrapesJS, component: this}]);

    this.editor = this.iframeWindow.initEditor(initGrapesJS);
    this.editor.on('load', this.handleEditorLoad);
    this.editor.on('component:remove', this.handleContentRemove);
    callfunc(onEditorInit, [{editor: this.editor, component: this}]);
  };

  render() {
    const {style, mjml, images} = this.props;
    this.updateImages(get(images));
    const thisMjml = mjml || defaultMjml;
    const html = `
      <link rel="stylesheet" href="${this.getAsset('grapes.min.css')}" />
      <style>
      .gjs-pn-buttons {overflow: hidden}
      </style>
      <script src="${this.getAsset('grapes.min.js')}"></script>
      <script src="${this.getAsset('ckeditor.js')}"></script>
      <script src="${this.getAsset(
        'grapesjs-plugin-ckeditor.min.js',
      )}"></script>
      <script src="${this.getAsset('grapesjs-mjml.min.js')}"></script>
      <div id="gjs">${thisMjml}</div>
      <script>
      CKEDITOR.dtd.$editable.a = 1;
      window.initEditor = function(init) {
         var editor = grapesjs.init(init); 
         return editor;
      };
     </script>
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
