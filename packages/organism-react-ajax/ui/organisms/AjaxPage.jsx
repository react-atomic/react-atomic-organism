import React, {
  isValidElement,
  useEffect,
  useRef,
  useMemo,
  Suspense,
} from "react";
import build from "reshow-build";
import { win as getWin } from "win-doc";

import { ajaxDispatch } from "../../src/ajaxDispatcher";

const AjaxPage = ({win, ...props}) => {
  win = win || getWin();
  const { themes, themePath, fallback, webSocketUrl } = props;

  const isInit = useRef(false);
  const lastThemePath = useRef();

  if (!isInit.current) {
    isInit.current = true;
    ajaxDispatch(props);
  }

  useEffect(() => {
    if (win.WebSocket && webSocketUrl) {
      ajaxDispatch("ws/init", {
        url: webSocketUrl,
      });
    }
  }, []);

  return useMemo(() => {
    let thisThemePath = themePath;
    lastThemePath.current = themePath;
    if (null == themes[thisThemePath]) {
      thisThemePath = lastThemePath.current;
      if (null == typeof themes[thisThemePath]) {
        console.error("Not find a theme for name: [" + themePath + "]", themes);
        return null;
      }
    } else {
      lastThemePath.current = thisThemePath;
    }
    const myTheme = themes[thisThemePath];
    const builded = build(myTheme)();
    if (!isValidElement(builded)) {
      console.error(
        "Not find a valid element for name: [" + themePath + "]",
        themes
      );
      return null;
    } else {
      if (fallback) {
        return <Suspense fallback={build(fallback)()}>{builded}</Suspense>;
      } else {
        return builded;
      }
    }
  }, [themePath]);
};

AjaxPage.defaultProps = {
  ajax: true,
  themes: {},
  win: null,
};

export default AjaxPage;
