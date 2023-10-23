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
 * @property {string} [hostname]
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
  if (nextVideoParams["enablejsapi"]) {
    nextVideoParams["origin"] = hostname;
  }
  const aParams = [];
  KEYS(nextVideoParams).forEach((key) =>
    aParams.push(key + "=" + encodeURIComponent(nextVideoParams[key]))
  );
  let src = `https://www.youtube.com/embed/${videoId}?${aParams.join("&")}`;
  if (null != nextVideoParams["loop"]) {
    src += `&playlist=${videoId}`;
  }

  return src;
};

/**
 * @param {YoutubeRWDProps} props
 */
const useYoutubeRWD = (props) => {
  const lastProps = useRefUpdate(props);
  const { videoId, videoParams, onClick, ...restProps } = lastProps.current;
  const [state, setState] = useState({ load: false, hostname: "" });
  useEffect(() => {
    const loc = doc().location;
    setState({ load: true, hostname: loc.protocol + "//" + loc.hostname });
  }, []);

  /**
   * @type {React.MutableRefObject<HTMLIFrameElement>?}
   */
  const lastIframe = /**@type any*/ (useRef());
  const expose = {
    restart: () => {
      expose.exec("playVideo");
    },
    /**
     * @param {string} cmd
     * @param {any[]} args
     */
    exec: (cmd, args = []) => {
      if (!lastIframe?.current) {
        return;
      }
      const thisCmd = message(cmd, args);
      lastIframe.current?.contentWindow?.postMessage(thisCmd, "*");
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
  return {
    expose,
    handler,
    nextProps: restProps,
    lastIframe,
    state,
    src: state.load
      ? getYoutubeUrl({
          videoId,
          videoParams: { ...defaultVideoParams, ...videoParams },
          hostname: state.hostname,
        })
      : undefined,
  };
};

/**
 * @type React.FC<YoutubeRWDProps>
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
