import React, {PureComponent} from 'react';
import {popupDispatch, FullScreen} from 'organism-react-popup';
import {build, SemanticUI, Unsafe} from 'react-atomic-molecule';
import callfunc from 'call-func';
import CodeMirror from '../organisms/CodeMirror';
import * as models from '../../src/models';

const openCodeEditor = (code, cb) => {
  popupDispatch('dom/update', {
    popup: <CodeEditor onClose={cb}>{code ?? ''}</CodeEditor>,
  });
};

class CodeEditor extends PureComponent {
  static defaultProps = {
    name: 'code-editor',
    model: 'html',
    preview: true,
  };

  handlePreview = el => (this.preview = el);

  handleChange = e => {
    const {onChange} = this.props;
    this.lastEvent = e;
    this.preview?.setValue(e.value);
    callfunc(onChange, [e]);
  };

  getCode() {
    const last = this.lastEvent;
    if (last) {
      return last.getCode ? callfunc(last.getCode) : last.value;
    }
  }

  handleClose = () => {
    const {onClose} = this.props;
    callfunc(onClose, [this.getCode()]);
  };

  render() {
    const {
      onChange,
      onClose,
      model,
      children,
      preview: propsPreview,
      ...otherProps
    } = this.props;
    let preview = propsPreview;
    let thisPreview;
    let codeClasses;
    let containerClasses;
    if (preview) {
      if (preview === true) {
        const oModel = models[model] || models.html;
        preview = oModel.preview;
      }
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
