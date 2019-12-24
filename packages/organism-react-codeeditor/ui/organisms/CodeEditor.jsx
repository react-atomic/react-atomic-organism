import React, {PureComponent} from 'react';
import {popupDispatch, FullScreen} from 'organism-react-popup';
import {build, SemanticUI, Unsafe} from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import callfunc from 'call-func';
import fixHtml from 'fix-html';

import Preview from '../organisms/Preview';

const openCodeEditor = (code, cb) => {
  popupDispatch('dom/update', {
    popup: <CodeEditor onClose={cb}>{code}</CodeEditor>,
  });
};

class CodeEditor extends PureComponent {
  static defaultProps = {
    name: 'code-editor',
    preview: Preview,
  };

  state = {code: ''};

  getHtml() {
    const html = this.codemirror ? this.codemirror.getValue() : '';
    return fixHtml(html, this.iframeWindow?.sanitizeHtml || null);
  }

  getCode() {
    return this.getHtml();
  }

  handleIframe = el => (this.dIframe = el);
  handleTextarea = el => (this.textarea = el);
  handlePreview = el => (this.preview = el);

  handleLoad = () => {
    this.iframeWindow = this.dIframe.contentWindow.window;
    let timer;
    timer = setInterval(() => {
      if (this.iframeWindow.isCodeMirrorReady) {
        clearInterval(timer);
        this.handleCodeMirror();
      }
    }, 10);
  };

  handleCodeMirror = () => {
    const codemirror = this.iframeWindow.CodeMirror.fromTextArea(
      this.textarea,
      {
        mode: 'htmlmixed',
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: false,
        lineNumbers: true,
        lineWrapping: true,
      },
    );
    this.codemirror = codemirror;
    codemirror.setSize(null, '100%');
    const update = editor => {
      this.preview.setValue(this.getCode());
    };
    codemirror.on('change', update);
    codemirror.autoFormatRange(
      {line: 0, ch: 0},
      {line: codemirror.lineCount()},
    );
    codemirror.setCursor({line: 0, ch: 0});

    // better to keep update at last
    update(codemirror);
  };

  handleClose = () => {
    const {onClose} = this.props;
    callfunc(onClose, [this.getCode()]);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {children} = nextProps;
    let nextState = null;
    if (children !== prevState.prevChildren) {
      nextState = {
        code: children,
        prevChildren: children,
      };
    }
    return nextState;
  }

  render() {
    const {onClose, children, preview, ...otherProps} = this.props;
    let thisPreview;
    let codeClasses;
    let containerClasses;
    if (preview) {
      thisPreview = build(preview)({
        className: 'pure-u-1 pure-u-md-1-2',
        ref: this.handlePreview,
      });
      containerClasses = 'pure-g';
      codeClasses = 'pure-u-1 pure-u-md-1-2';
    }
    return (
      <FullScreen
        onClose={this.handleClose}
        className={containerClasses}
        removeOnClose
        {...otherProps}
        style={Styles.full}>
        <SemanticUI className={codeClasses} style={Styles.fitHeight}>
          <Iframe
            style={Styles.fitHeight}
            refCb={this.handleIframe}
            onLoad={this.handleLoad}>
            <Unsafe>
              {`
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.49.2/lib/codemirror.min.css" />
          <script async src="https://cdn.jsdelivr.net/npm/sanitize-html@1.20.1/dist/sanitize-html.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.2/lib/codemirror.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/codemirror-formatting@1.0.0/formatting.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.2/mode/xml/xml.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.2/mode/javascript/javascript.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.2/mode/css/css.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.2/mode/htmlmixed/htmlmixed.min.js"></script>
          <script>window.isCodeMirrorReady=true;</script>
          `}
            </Unsafe>
            <textarea
              ref={this.handleTextarea}
              style={Styles.textArea}
              defaultValue={children}
            />
          </Iframe>
        </SemanticUI>
        {thisPreview}
      </FullScreen>
    );
  }
}

export default CodeEditor;
export {openCodeEditor};

const Styles = {
  full: {
    display: 'block',
    padding: 0,
  },
  textArea: {
    display: 'none',
  },
  fitHeight: {
    height: '100%',
  },
};
