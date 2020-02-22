import React, {PureComponent} from 'react';
import {popupDispatch, FullScreen} from 'organism-react-popup';
import {build, SemanticUI, Unsafe} from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import callfunc from 'call-func';
import fixHtml from 'fix-html';

import Preview from '../organisms/Preview';
import CodeMirror from '../organisms/CodeMirror';

const openCodeEditor = (code, cb) => {
  popupDispatch('dom/update', {
    popup: <CodeEditor onClose={cb}>{code ?? ''}</CodeEditor>,
  });
};

class CodeEditor extends PureComponent {
  static defaultProps = {
    name: 'code-editor',
    preview: Preview,
  };

  state = {code: ''};

  getHtml(html) {
    return fixHtml(html, this.iframeWindow?.sanitizeHtml || null);
  }

  getCode() {
    return this.getHtml();
  }

  handlePreview = el => (this.preview = el);

  handleChange = e => {
    this.preview.setValue(this.getHtml(e.codemirror.getValue()));
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
          <CodeMirror onChange={this.handleChange}>{children}</CodeMirror>
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
  fitHeight: {
    height: '100%',
  },
};
