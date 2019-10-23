import React, {Component} from 'react';
import callfunc from 'call-func';
import get from 'get-object-value';

import GrapesJsEdm from './GrapesJsEdm';
import GrapesJsMjml from './GrapesJsMjml';

let grapesId = 0;

class GrapesJsController extends Component
{
  getPanel()
  {
    return get(this.editor, ['Panels']);
  }

  disableImport()
  {
    const panelManager = this.getPanel();
    const btnName = this.el.getImportButtonName();
    return panelManager.removeButton('options', btnName);
  }

  disableExport()
  {
    const panelManager = this.getPanel();
    return panelManager.removeButton('options', 'export-template');
  }

  handleEditorInit = e =>
  {
    const {onEditorInit} = this.props;
    this.editor = e.editor;
    callfunc(onEditorInit, [e]);
  }

  handleEl = el => this.el = el

  componentDidMount() {
    const {id} = this.props;
    if (id) {
      this.id = id;
    } else {
      this.id = 'grapejs-' + grapesId;
      grapesId++;
    }
  }

  render()
  {
    const {type, ...otherProps} = this.props;
    otherProps.id = this.id;
    otherProps.onEditorInit = this.handleEditorInit;
    return type === 'html' ?
      <GrapesJsEdm ref={this.handleEl} {...otherProps} /> :
      <GrapesJsMjml ref={this.handleEl} {...otherProps} /> ;
  }
}

export default GrapesJsController;
