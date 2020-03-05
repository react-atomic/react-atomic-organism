import React, {Component} from 'react';
import {Unsafe} from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import callfunc from 'call-func';
import get from 'get-object-value';
import {queryFrom} from 'css-query-selector';
import {popupDispatch, FullScreen} from 'organism-react-popup';
import {openCodeEditor} from 'organism-react-codeeditor';
import fixHtml from 'fix-html';

import getAsset from '../../src/getAsset';

const defaultAssets = {
  'sanitize-html':
    'https://cdn.jsdelivr.net/npm/sanitize-html@1.20.1/dist/sanitize-html.min.js',
  'grapesjs-preset-webpage.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs-preset-webpage@0.1.11/dist/grapesjs-preset-webpage.min.js',
};

const cleanClassReg = /(class\=")([^"]*)(c\d{0,4})(\s)?([^"]*)/g;

const ERROR_HTML_INVALID_SYNTAX = 'HTML invalid syntax';

const initViewSource = host => {
  const panelManager = host.getPanel();
  panelManager.addButton('options', [
    {
      id: 'edit-code',
      className: 'gjs-pn-btn fa fa-code',
      command: function(editor1, sender) {
        openCodeEditor(host.getDesign(), code => {
          host.getEditor().setComponents(code);
        });
      },
      attributes: {title: 'Edit Html'},
    },
  ]);
};

class GrapesJsWeb extends Component {
  getAsset(fileName) {
    return getAsset(fileName, this.props, defaultAssets);
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
    let html = this.getDesign();
    if (html) {
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

  getDesign() {
    const editor = this.editor;
    const html = editor.getHtml();
    return html;
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
    return 'gjs-open-import-webpage';
  }

  handleLoad = e => {
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
      font,
      onEditorInit,
      onBeforeEditorInit,
      mergeTags,
      host,
      init,
    } = this.props;
    const CKEDITOR = this.iframeWindow.CKEDITOR;
    CKEDITOR.dtd.$editable.span = 1;
    CKEDITOR.dtd.$editable.a = 1;
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
    const plugins = ['gjs-preset-webpage', 'gjs-plugin-ckeditor'];

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
        'gjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel:
            '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function(editor) {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
          },
          filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
          aviaryOpts: false,
          blocksBasicOpts: {flexGrid: 1},
          customStyleManager: [
            {
              name: 'General',
              buildProps: [
                'float',
                'display',
                'position',
                'top',
                'right',
                'left',
                'bottom',
              ],
              properties: [
                {
                  name: 'Alignment',
                  property: 'float',
                  type: 'radio',
                  defaults: 'none',
                  list: [
                    {value: 'none', className: 'fa fa-times'},
                    {value: 'left', className: 'fa fa-align-left'},
                    {value: 'right', className: 'fa fa-align-right'},
                  ],
                },
                {property: 'position', type: 'select'},
              ],
            },
            {
              name: 'Dimension',
              open: false,
              buildProps: [
                'width',
                'flex-width',
                'height',
                'max-width',
                'min-height',
                'margin',
                'padding',
              ],
              properties: [
                {
                  id: 'flex-width',
                  type: 'integer',
                  name: 'Width',
                  units: ['px', '%'],
                  property: 'flex-basis',
                  toRequire: 1,
                },
                {
                  property: 'margin',
                  properties: [
                    {name: 'Top', property: 'margin-top'},
                    {name: 'Right', property: 'margin-right'},
                    {name: 'Bottom', property: 'margin-bottom'},
                    {name: 'Left', property: 'margin-left'},
                  ],
                },
                {
                  property: 'padding',
                  properties: [
                    {name: 'Top', property: 'padding-top'},
                    {name: 'Right', property: 'padding-right'},
                    {name: 'Bottom', property: 'padding-bottom'},
                    {name: 'Left', property: 'padding-left'},
                  ],
                },
              ],
            },
            {
              name: 'Typography',
              open: false,
              buildProps: [
                'font-family',
                'font-size',
                'font-weight',
                'letter-spacing',
                'color',
                'line-height',
                'text-align',
                'text-decoration',
                'text-shadow',
              ],
              properties: [
                {name: 'Font', property: 'font-family'},
                {name: 'Weight', property: 'font-weight'},
                {name: 'Font color', property: 'color'},
                {
                  property: 'text-align',
                  type: 'radio',
                  defaults: 'left',
                  list: [
                    {
                      value: 'left',
                      name: 'Left',
                      className: 'fa fa-align-left',
                    },
                    {
                      value: 'center',
                      name: 'Center',
                      className: 'fa fa-align-center',
                    },
                    {
                      value: 'right',
                      name: 'Right',
                      className: 'fa fa-align-right',
                    },
                    {
                      value: 'justify',
                      name: 'Justify',
                      className: 'fa fa-align-justify',
                    },
                  ],
                },
                {
                  property: 'text-decoration',
                  type: 'radio',
                  defaults: 'none',
                  list: [
                    {value: 'none', name: 'None', className: 'fa fa-times'},
                    {
                      value: 'underline',
                      name: 'underline',
                      className: 'fa fa-underline',
                    },
                    {
                      value: 'line-through',
                      name: 'Line-through',
                      className: 'fa fa-strikethrough',
                    },
                  ],
                },
                {
                  property: 'text-shadow',
                  properties: [
                    {name: 'X position', property: 'text-shadow-h'},
                    {name: 'Y position', property: 'text-shadow-v'},
                    {name: 'Blur', property: 'text-shadow-blur'},
                    {name: 'Color', property: 'text-shadow-color'},
                  ],
                },
              ],
            },
            {
              name: 'Decorations',
              open: false,
              buildProps: [
                'opacity',
                'background-color',
                'border-radius',
                'border',
                'box-shadow',
                'background',
              ],
              properties: [
                {
                  type: 'slider',
                  property: 'opacity',
                  defaults: 1,
                  step: 0.01,
                  max: 1,
                  min: 0,
                },
                {
                  property: 'border-radius',
                  properties: [
                    {name: 'Top', property: 'border-top-left-radius'},
                    {name: 'Right', property: 'border-top-right-radius'},
                    {name: 'Bottom', property: 'border-bottom-left-radius'},
                    {name: 'Left', property: 'border-bottom-right-radius'},
                  ],
                },
                {
                  property: 'box-shadow',
                  properties: [
                    {name: 'X position', property: 'box-shadow-h'},
                    {name: 'Y position', property: 'box-shadow-v'},
                    {name: 'Blur', property: 'box-shadow-blur'},
                    {name: 'Spread', property: 'box-shadow-spread'},
                    {name: 'Color', property: 'box-shadow-color'},
                    {name: 'Shadow type', property: 'box-shadow-type'},
                  ],
                },
                {
                  property: 'background',
                  properties: [
                    {name: 'Image', property: 'background-image'},
                    {name: 'Repeat', property: 'background-repeat'},
                    {name: 'Position', property: 'background-position'},
                    {name: 'Attachment', property: 'background-attachment'},
                    {name: 'Size', property: 'background-size'},
                  ],
                },
              ],
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['transition', 'perspective', 'transform'],
              properties: [
                {
                  property: 'transition',
                  properties: [
                    {name: 'Property', property: 'transition-property'},
                    {name: 'Duration', property: 'transition-duration'},
                    {name: 'Easing', property: 'transition-timing-function'},
                  ],
                },
                {
                  property: 'transform',
                  properties: [
                    {name: 'Rotate X', property: 'transform-rotate-x'},
                    {name: 'Rotate Y', property: 'transform-rotate-y'},
                    {name: 'Rotate Z', property: 'transform-rotate-z'},
                    {name: 'Scale X', property: 'transform-scale-x'},
                    {name: 'Scale Y', property: 'transform-scale-y'},
                    {name: 'Scale Z', property: 'transform-scale-z'},
                  ],
                },
              ],
            },
            {
              name: 'Flex',
              open: false,
              properties: [
                {
                  name: 'Flex Container',
                  property: 'display',
                  type: 'select',
                  defaults: 'block',
                  list: [
                    {value: 'block', name: 'Disable'},
                    {value: 'flex', name: 'Enable'},
                  ],
                },
                {
                  name: 'Flex Parent',
                  property: 'label-parent-flex',
                  type: 'integer',
                },
                {
                  name: 'Direction',
                  property: 'flex-direction',
                  type: 'radio',
                  defaults: 'row',
                  list: [
                    {
                      value: 'row',
                      name: 'Row',
                      className: 'icons-flex icon-dir-row',
                      title: 'Row',
                    },
                    {
                      value: 'row-reverse',
                      name: 'Row reverse',
                      className: 'icons-flex icon-dir-row-rev',
                      title: 'Row reverse',
                    },
                    {
                      value: 'column',
                      name: 'Column',
                      title: 'Column',
                      className: 'icons-flex icon-dir-col',
                    },
                    {
                      value: 'column-reverse',
                      name: 'Column reverse',
                      title: 'Column reverse',
                      className: 'icons-flex icon-dir-col-rev',
                    },
                  ],
                },
                {
                  name: 'Justify',
                  property: 'justify-content',
                  type: 'radio',
                  defaults: 'flex-start',
                  list: [
                    {
                      value: 'flex-start',
                      className: 'icons-flex icon-just-start',
                      title: 'Start',
                    },
                    {
                      value: 'flex-end',
                      title: 'End',
                      className: 'icons-flex icon-just-end',
                    },
                    {
                      value: 'space-between',
                      title: 'Space between',
                      className: 'icons-flex icon-just-sp-bet',
                    },
                    {
                      value: 'space-around',
                      title: 'Space around',
                      className: 'icons-flex icon-just-sp-ar',
                    },
                    {
                      value: 'center',
                      title: 'Center',
                      className: 'icons-flex icon-just-sp-cent',
                    },
                  ],
                },
                {
                  name: 'Align',
                  property: 'align-items',
                  type: 'radio',
                  defaults: 'center',
                  list: [
                    {
                      value: 'flex-start',
                      title: 'Start',
                      className: 'icons-flex icon-al-start',
                    },
                    {
                      value: 'flex-end',
                      title: 'End',
                      className: 'icons-flex icon-al-end',
                    },
                    {
                      value: 'stretch',
                      title: 'Stretch',
                      className: 'icons-flex icon-al-str',
                    },
                    {
                      value: 'center',
                      title: 'Center',
                      className: 'icons-flex icon-al-center',
                    },
                  ],
                },
                {
                  name: 'Flex Children',
                  property: 'label-parent-flex',
                  type: 'integer',
                },
                {
                  name: 'Order',
                  property: 'order',
                  type: 'integer',
                  defaults: 0,
                  min: 0,
                },
                {
                  name: 'Flex',
                  property: 'flex',
                  type: 'composite',
                  properties: [
                    {
                      name: 'Grow',
                      property: 'flex-grow',
                      type: 'integer',
                      defaults: 0,
                      min: 0,
                    },
                    {
                      name: 'Shrink',
                      property: 'flex-shrink',
                      type: 'integer',
                      defaults: 0,
                      min: 0,
                    },
                    {
                      name: 'Basis',
                      property: 'flex-basis',
                      type: 'integer',
                      units: ['px', '%', ''],
                      unit: '',
                      defaults: 'auto',
                    },
                  ],
                },
                {
                  name: 'Align',
                  property: 'align-self',
                  type: 'radio',
                  defaults: 'auto',
                  list: [
                    {
                      value: 'auto',
                      name: 'Auto',
                    },
                    {
                      value: 'flex-start',
                      title: 'Start',
                      className: 'icons-flex icon-al-start',
                    },
                    {
                      value: 'flex-end',
                      title: 'End',
                      className: 'icons-flex icon-al-end',
                    },
                    {
                      value: 'stretch',
                      title: 'Stretch',
                      className: 'icons-flex icon-al-str',
                    },
                    {
                      value: 'center',
                      title: 'Center',
                      className: 'icons-flex icon-al-center',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      ...init,
    };
    callfunc(onBeforeEditorInit, [{CKEDITOR, initGrapesJS, component: this}]);

    this.editor = this.iframeWindow.initEditor(initGrapesJS);
    this.initGrapesJS = initGrapesJS;
    this.editor.on('load', this.handleEditorLoad);
    this.editor.on('asset:remove', this.handleRemoveAsset);
    callfunc(onEditorInit, [{editor: this.editor, component: this}]);
  };

  handleEditorLoad = () => {
    const {host, onEditorLoad, onError, design, images} = this.props;
    const doc = this.iframeWindow.document;
    this.updateImages(get(images));
    try {
      this.editor.setComponents(
        fixHtml(design, this.iframeWindow.sanitizeHtml),
      );
    } catch (e) {
      callfunc(onError, [{e, design, message: ERROR_HTML_INVALID_SYNTAX}]);
      console.warn({e, design});
    }
    doc.getElementById('root').className = '';
    callfunc(onEditorLoad, [{editor: this.editor, component: this}]);
    initViewSource(host);
  };

  clearTimeout = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

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
      <script async src="${this.getAsset('sanitize-html')}"></script>
      <script src="${this.getAsset('grapes.min.js')}"></script>
      <script src="${this.getAsset('ckeditor.js')}"></script>
      <script src="${this.getAsset(
        'grapesjs-plugin-ckeditor.min.js',
      )}"></script>
      <script src="${this.getAsset(
        'grapesjs-preset-webpage.min.js',
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

export default GrapesJsWeb;

const Styles = {
  iframe: {
    height: '100%',
  },
};
