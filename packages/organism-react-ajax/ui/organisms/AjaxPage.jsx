import React, {PureComponent} from 'react';
import get from 'get-object-value';

import {ajaxDispatch} from '../../src/ajaxDispatcher';
import {win as oWin} from 'win-doc';

let pages = {};

class AjaxPage extends PureComponent {
  _lastThemePath = '';

  static defaultProps = {
    ajax: true,
    themes: {},
    win: null,
  };

  constructor(props) {
    super(props);
    /**
     * Need put in constructor before render,
     * else AjaxLink will not get baseUrl
     */
    ajaxDispatch({
      type: 'config/set',
      params: props,
    });
  }

  componentDidMount() {
    setImmediate(() => {
      let {win, webSocketUrl} = this.props;
      win = win || oWin();
      if (win.WebSocket && webSocketUrl) {
        ajaxDispatch({
          type: 'ws/init',
          params: {
            url: webSocketUrl,
          },
        });
      }
    });
  }

  render() {
    const {themes, themePath} = this.props;
    let thisThemePath = themePath;
    if ('undefined' === typeof themes[thisThemePath]) {
      thisThemePath = this._lastThemePath;
      if ('undefined' === typeof themes[thisThemePath]) {
        console.error('Not find a theme for name: [' + themePath + ']', themes);
        return null;
      }
    }
    this._lastThemePath = thisThemePath;
    if (!pages[thisThemePath]) {
      const myTheme = themes[thisThemePath];
      let build;
      if (React.isValidElement(myTheme)) {
        build = React.cloneElement;
      } else {
        build = React.createElement;
      }
      const builded = build(myTheme);
      if (!React.isValidElement(builded)) {
        console.error(
          'Not findi a valid element for name: [' + themePath + ']',
          themes,
        );
        return null;
      } else {
        pages[thisThemePath] = builded;
      }
    }
    return pages[thisThemePath];
  }
}

export default AjaxPage;
