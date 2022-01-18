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

const AjaxPage = ({ win = getWin(), ...props }) => {
  const { ajax = true, themes = {}, themePath, fallback, webSocketUrl } = props;

  const lastThemePath = useRef();

  useEffect(() => {
    props.ajax = ajax;
    props.themes = themes;
    ajaxDispatch(props);
  }, []);

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
      if (fallback) {
        const fallbackEl = true === fallback ? "div" : fallback;
        return <Suspense fallback={build(fallbackEl)()}>{builded}</Suspense>;
      } else {
        return builded;
      }
    }
  }, [themePath]);
};

export default AjaxPage;
