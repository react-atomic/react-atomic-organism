import React, {PureComponent, Suspense, isValidElement} from 'react';
import get from 'get-object-value';
import build from "reshow-build";

import {ajaxDispatch} from '../../src/ajaxDispatcher';
import {win as oWin} from 'win-doc';

class AjaxPage extends PureComponent {
  _lastThemePath = '';

  static defaultProps = {
    ajax: true,
    themes: {},
    win: null,
    fallback: 'div',
  };

  constructor(props) {
    super(props);
    const {win, ...otherProps} = props;
    /**
     * Need put in constructor before render,
     * else AjaxLink will not get baseUrl
     */
    ajaxDispatch({
      type: 'config/set',
      params: otherProps,
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
    const {themes, themePath, fallback} = this.props;
    let thisThemePath = themePath;
    if ('undefined' === typeof themes[thisThemePath]) {
      thisThemePath = this._lastThemePath;
      if ('undefined' === typeof themes[thisThemePath]) {
        console.error('Not find a theme for name: [' + themePath + ']', themes);
        return null;
      }
    }
    this._lastThemePath = thisThemePath;
    const myTheme = themes[thisThemePath];
    const builded = build(myTheme)();
    if (!isValidElement(builded)) {
        console.error(
          'Not find a valid element for name: [' + themePath + ']',
          themes,
        );
        return null;
    } else {
        return <Suspense fallback={build(fallback)()}>{builded}</Suspense>;
    }
  }
}

export default AjaxPage;
