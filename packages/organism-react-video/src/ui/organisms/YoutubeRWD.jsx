// @ts-check
import * as React from "react";
const { useEffect, useImperativeHandle, forwardRef, useRef, useState } = React;
import { IframeContainer } from "organism-react-iframe";
import { doc } from "win-doc";
import { KEYS } from "reshow-constant";
import { useRefUpdate } from "reshow-hooks";
import callfunc from "call-func";

import ResponsiveVideo from "../organisms/ResponsiveVideo";

/**
 * @typedef {import('organism-react-iframe').IframeContainerExpose} IframeContainerExpose
 */

/**
 * @param {string} func
 * @param {any[]} args
 */
const message = (func, args) =>
  JSON.stringify({
    event: "command",
    func,
    args,
  });

const defaultVideoParams = {
  autoplay: 1,
  loop: 1,
  showinfo: 0,
  controls: 0,
  rel: 0,
  mute: 1,
  modestbranding: 1,
  iv_load_policy: 3,
  enablejsapi: 1,
};

/**
 * @typedef {import("../organisms/ResponsiveVideo").ResponsiveVideoProps} ResponsiveVideoProps
 */

/**
 * @typedef {object} YoutubeRWDExtProps
 * @property {"eager"|"lazy"} [loading]
 * @property {string} [videoId]
 * @property {{[key: string]: any}} [videoParams]
 * @property {string|boolean} [hostname]
 * @property {boolean} [disable]
 */

/**
 * @typedef {ResponsiveVideoProps&YoutubeRWDExtProps} YoutubeRWDProps
 */

/**
 * @param {YoutubeRWDExtProps} props
 * @see https://developers.google.com/youtube/player_parameters
 */
const getYoutubeUrl = ({ videoId, videoParams, hostname }) => {
  const nextVideoParams = { ...videoParams };
  if (nextVideoParams["enablejsapi"] && hostname) {
    nextVideoParams["origin"] = hostname;
  }
  if (nextVideoParams["loop"]) {
    nextVideoParams.playlist = videoId;
  }
  const aParams = [];
  KEYS(nextVideoParams).forEach((key) =>
    aParams.push(key + "=" + encodeURIComponent(nextVideoParams[key]))
  );
  const src = `https://www.youtube.com/embed/${videoId}?${aParams.join("&")}`;

  return src;
};

/**
 * @typedef {object} YoutubeRWDExpose
 * @property {Function} restart
 * @property {Function} pause
 * @property {ExecPost} exec
 */

/**
 * @callback ExecPost
 * @param {string} cmd
 * @param {any[]=} args
 */

/**
 * @param {YoutubeRWDProps} props
 */
const useYoutubeRWD = (props) => {
  const lastProps = useRefUpdate(props);
  const {
    videoId,
    videoParams,
    onClick,
    hostname: propsHostname,
    ...restProps
  } = lastProps.current;
  const lastHostname = /**@type React.MutableRefObject<string|boolean>*/ (
    useRef()
  );
  const [state, setState] = useState({ load: false });
  useEffect(() => {
    const loc = doc().location;
    let strLoc = loc.protocol + "//" + loc.hostname;
    if (loc.port) {
      strLoc += `:${loc.port}`;
    }
    lastHostname.current = null == propsHostname ? strLoc : propsHostname;
    setState({ load: true });
  }, []);

  const lastIframe =
    /**@type {React.MutableRefObject<IframeContainerExpose>}*/ (useRef());

  /**
   * @type {YoutubeRWDExpose}
   */
  const expose = {
    restart: () => {
      expose.exec("playVideo");
    },
    pause: () => {
      expose.exec("pauseVideo");
    },
    exec: (cmd, args = []) => {
      const iframe = lastIframe.current.getEl();
      if (iframe) {
        const thisCmd = message(cmd, args);
        const origin = /**@type string*/ (
          lastHostname.current ? lastHostname.current : "*"
        );
        return iframe.contentWindow?.window.postMessage(thisCmd, origin);
      }
    },
  };
  const handler = {
    load: () => {
      expose.restart();
    },
    click: (/**@type React.MouseEvent*/ e) => {
      const { onClick } = lastProps.current;
      callfunc(onClick ? onClick : expose.restart, [e]);
    },
  };
  const thisVideoParams = { ...defaultVideoParams, ...videoParams };
  return {
    expose,
    handler,
    nextProps: restProps,
    lastIframe,
    state,
    src: state.load
      ? getYoutubeUrl({
          videoId,
          videoParams: thisVideoParams,
          hostname: lastHostname.current,
        })
      : undefined,
  };
};

/**
 * @type React.ForwardRefExoticComponent<?, YoutubeRWDProps>
 */
const YoutubeRWD = forwardRef((props, ref) => {
  const { expose, handler, nextProps, lastIframe, state, src } =
    useYoutubeRWD(props);
  const { loading, ...restProps } = nextProps;
  useImperativeHandle(ref, () => expose, []);
  if (!state.load) {
    return null;
  }
  return (
    <ResponsiveVideo {...restProps} onClick={handler.click}>
      <IframeContainer
        loading={loading}
        allow="autoplay; fullscreen; encrypted-media"
        src={src}
        ref={lastIframe}
        onLoad={handler.load}
      />
    </ResponsiveVideo>
  );
});

export default YoutubeRWD;
