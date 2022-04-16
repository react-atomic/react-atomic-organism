import React, {
  isValidElement,
  useEffect,
  useRef,
  useMemo,
  Suspense,
} from "react";
import build from "reshow-build";
import { win as getWin } from "win-doc";

import { ajaxDispatch } from "../../src/stores/ajaxStore";

const AjaxPage = (props) => {
  const {
    win = getWin(),
    ajax = true,
    baseUrl,
    staticVersion,
    callback,
    themes = {},
    themePath,
    fallback,
    webSocketUrl,
  } = props;

  const lastThemePath = useRef();

  useEffect(() => {
    ajaxDispatch({ ajax, baseUrl, staticVersion, callback });
  }, [ajax, baseUrl, staticVersion, callback]);

  useEffect(() => {
    if (win.WebSocket && webSocketUrl) {
      ajaxDispatch("ws/init", {
        url: webSocketUrl,
      });
    }
  }, [webSocketUrl]);

  return useMemo(() => {
    let thisThemePath = themePath;
    if (null == themes[thisThemePath]) {
      thisThemePath = lastThemePath.current;
      if (null == themes[thisThemePath]) {
        console.error("Not find a theme for name: [" + themePath + "]", themes);
        return null;
      }
    } else {
      lastThemePath.current = thisThemePath;
    }
    const myTheme = themes[thisThemePath];
    const builded = build(myTheme)();
    if (!isValidElement(builded)) {
      console.error("Not find a valid element for name: [" + themePath + "]", {
        "Theme List": themes,
        "Theme Path": thisThemePath,
        "Element before build:": myTheme,
        "Element builded:": builded,
      });
      return null;
    } else {
      const fallbackEl = fallback || "div";
      return <Suspense fallback={build(fallbackEl)()}>{builded}</Suspense>;
    }
  }, [themePath]);
};

export default AjaxPage;
