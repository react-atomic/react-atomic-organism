require("setimmediate");
import React, { useRef, useMemo, useState, useEffect } from "react";
import { pageStore, Return } from "reshow";
import { SemanticUI, Unsafe } from "react-atomic-molecule";
import Iframe from "organism-react-iframe";
import { ajaxStore } from "organism-react-ajax";
import get from "get-object-value";
import { win } from "win-doc";
import windowOnload from "window-onload";
const { close, process } = windowOnload();

import i13nStore from "../../src/stores/i13nStore";
import { i13nDispatch } from "../../src/index";

const keys = Object.keys;
const urlDecode = decodeURIComponent;

const MonitorPvidContainer = props => {
  const pvid = useRef();
  return (
    <Return initStates={["data", "pvid"]}>
      {({ pvid: nextPvid, I13N }) => {
        if (pvid.current !== nextPvid) {
          pvid.current = nextPvid;
          i13nDispatch("config/set", { pvid: nextPvid, I13N });
        }
        return null;
      }}
    </Return>
  );
};

const MonitorBrowserBFContainer = props => {
  const toggleBfChange = useRef();
  const bfApplyUrl = useRef();
  return (
    <Return initStates={["bfApplyUrl", "toggleBfChange"]} stores={[ajaxStore]}>
      {({ bfApplyUrl: nextBfApplyUrl, toggleBfChange: nextToggleBfChange }) => {
        if (toggleBfChange.current !== nextToggleBfChange) {
          toggleBfChange.current = nextToggleBfChange;
          setImmediate(() => {
            const i13nState = i13nStore.getState();
            i13nDispatch("action", {
              I13N: {
                action: "bfChange",
                before: urlDecode(get(i13nState.get("lastUrl"), null, "")),
                after: urlDecode(nextBfApplyUrl),
                last: urlDecode(get(bfApplyUrl.current, null, ""))
              }
            });
            bfApplyUrl.current = nextBfApplyUrl;
          });
        }
        return null;
      }}
    </Return>
  );
};

const handleIframe = iframe => {
  i13nDispatch("config/set", { iframe });
};

const I13nElement = props => {
  const [iframe, setIframe] = useState();
  const [isLoad, setIsLoad] = useState();
  const pvid = useRef(true);
  const oWin = win();

  useEffect(() => {
    if (!oWin.__null) {
      const { I18N, ...otherProps } = props;
      oWin.i13nDispatch = i13nDispatch;
      i13nDispatch("config/set", otherProps);
      setIsLoad(true);
    }
  }, []);

  return useMemo(() => {
    if (!isLoad) {
      return null;
    }
    let dIframe;
    if (iframe) {
      dIframe = (
        <Iframe style={Styles.iframe} ref={handleIframe}>
          <Unsafe>{iframe}</Unsafe>
        </Iframe>
      );
    }
    return (
      <SemanticUI>
        <Return initStates={["pvid", "I13N"]} stores={[i13nStore]}>
          {({ pvid: nextPvid, I13N }) => {
            if (pvid.current !== nextPvid) {
              pvid.current = nextPvid;
              let query = {};
              if (oWin.startUpTime) {
                query.sp = Math.round(new Date().getTime() - oWin.startUpTime);
                oWin.startUpTime = false; //only log in page refresh
              }
              process(() => {
                i13nDispatch("view", {
                  query,
                  I13N: get(I13N),
                  callback: (json, text) => {
                    setIframe(text);
                  }
                });
              });
            }
            return null;
          }}
        </Return>
        <MonitorPvidContainer />
        <MonitorBrowserBFContainer />
        {dIframe}
      </SemanticUI>
    );
  }, [iframe, isLoad]);
};

export default I13nElement;

const Styles = {
  iframe: {
    width: 1,
    height: 1,
    position: "absolute",
    top: -99999
  }
};
