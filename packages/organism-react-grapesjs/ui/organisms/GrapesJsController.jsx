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
    return this.getType() === 'html' ? (
      <GrapesJsEdm ref={this.handleEl} {...otherProps} />
    ) : (
      <GrapesJsMjml ref={this.handleEl} {...otherProps} />
    );
  }
}

export default GrapesJsController;
