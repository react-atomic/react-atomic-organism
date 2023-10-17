// @ts-check
import * as React from "react";
const { useEffect, useImperativeHandle, forwardRef, useRef, useState } = React;
import { IframeContainer } from "organism-react-iframe";
import { doc } from "win-doc";
import { KEYS } from "reshow-constant";

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
 * @param {YoutubeRWDProps} props
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
  const src =
    "https://www.youtube.com/embed/" + videoId + "?" + aParams.join("&");
  return src;
};

class YoutubeRWDProps {
  /**
   * @type {string?}
   */
  videoId;

  /**
   * @type {{[key: string]: any}?}
   */
  videoParams;

  /**
   * @type {string?}
   */
  hostname;
}

/**
 * @param {YoutubeRWDProps} props
 */
const useYoutubeRWD = (props) => {
  const { videoId, videoParams, ...restProps } = props;
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
  };
  return {
    expose,
    handler,
    restProps,
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
 * https://developers.google.com/youtube/player_parameters
 */
const YoutubeRWD = forwardRef((props, ref) => {
  const { expose, handler, restProps, lastIframe, state, src } =
    useYoutubeRWD(props);
  if (state.load) {
    return null;
  }
  useImperativeHandle(ref, () => expose, []);
  return (
    <ResponsiveVideo {...restProps} restart={expose.restart}>
      <IframeContainer
        allow="autoplay; fullscreen; encrypted-media"
        src={src}
        ref={lastIframe}
        onLoad={handler.load}
      />
    </ResponsiveVideo>
  );
});

export default YoutubeRWD;
