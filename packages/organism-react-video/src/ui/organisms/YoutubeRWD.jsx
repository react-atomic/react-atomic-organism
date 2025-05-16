// @ts-check
import * as React from "react";
const { useEffect, useImperativeHandle, forwardRef, useRef, useState } = React;
import { IframeContainer } from "organism-react-iframe";
import { doc, win } from "win-doc";
import { KEYS } from "reshow-constant";
import { useRefUpdate } from "reshow-hooks";
import callfunc from "call-func";
import { getSN } from "get-random-id";

import ResponsiveVideo from "../organisms/ResponsiveVideo";

/**
 * Iframe api
 * https://www.youtube.com/iframe_api
 * https://www.youtube.com/s/player/eff63141/www-widgetapi.vflset/www-widgetapi.js
 *
 * Play State
 * https://developers.google.com/youtube/iframe_api_reference#Playback_status
 */

/**
 * @typedef {import('organism-react-iframe').IframeContainerExpose} IframeContainerExpose
 */

/**
 * @param {string} func
 * @param {any[]=} args
 * @param {string=} id
 * @returns {string}
 */
const message = (func, args, id) =>
  JSON.stringify({
    event: "command",
    id,
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
 * @typedef {object} YoutubeRWDExtendsProps
 * @property {"eager"|"lazy"} [loading]
 * @property {string} [videoId]
 * @property {{[key: string]: any}} [videoParams]
 * @property {string|boolean} [hostname]
 * @property {boolean} [disable]
 * @property {string} [id]
 * @property {Function} [onStateChange]
 * @property {Function} [onLoad]
 * @property {Function} [onError]
 */

/**
 * @typedef {ResponsiveVideoProps & YoutubeRWDExtendsProps} YoutubeRWDProps
 */

/**
 * @param {YoutubeRWDExtendsProps} props
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
 * @interface
 */
class PlayerState {
  /**
   * @type number
   */
  state;
  /**
   * @type boolean
   */
  isPlaying;
}

/**
 * @typedef {object} YoutubeRWDExpose
 * @property {Function} restart
 * @property {Function} pause
 * @property {function():PlayerState} togglePlayback
 * @property {function(string):void} postMessage
 * @property {ExecPost} exec
 * @property {function():HTMLIFrameElement|undefined} getIframe
 * @property {function():PlayerState} getPlayerState
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
    hostname: propsHostname,
    onStateChange,
    onClick,
    onLoad,
    ...restProps
  } = lastProps.current;
  const lastPlayerState = useRef({ state: -1, isPlaying: false });
  const lastMessageId = useRef(lastProps.current.id);
  if (null == lastMessageId.current) {
    lastMessageId.current = getSN("youtube-widget");
  }
  const thisVideoParams = useRefUpdate({
    ...defaultVideoParams,
    ...videoParams,
  });
  const lastHostname = /**@type React.RefObject<string|boolean|undefined>*/ (
    useRef(undefined)
  );
  const lastIframe = /**@type {React.RefObject<IframeContainerExpose|null>}*/ (
    useRef(null)
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
    const gWin = win();
    gWin.addEventListener("message", handler.message);
    return () => {
      gWin.removeEventListener("message", handler.message);
    };
  }, []);

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
    togglePlayback: () => {
      if (lastPlayerState.current.isPlaying) {
        expose.pause();
      } else {
        expose.restart();
      }
      return lastPlayerState.current;
    },
    postMessage: (message) => {
      const iframe = lastIframe.current?.getEl();
      if (iframe) {
        const origin = /**@type string*/ (
          lastHostname.current ? lastHostname.current : "*"
        );
        return iframe.contentWindow?.window.postMessage(message, origin);
      }
    },
    exec: (cmd, args) => {
      const cmdMessage = message(cmd, args, lastMessageId.current);
      return expose.postMessage(cmdMessage);
    },
    getIframe: () => {
      return lastIframe.current?.getEl();
    },
    getPlayerState: () => lastPlayerState.current,
  };
  const handler = {
    listening: () => {
      const message = JSON.stringify({
        event: "listening",
        channel: "widget",
        id: lastMessageId.current,
      });
      expose.postMessage(message);
      expose.exec("addEventListener", ["onStateChange"]);
    },
    load: (/**@type Event*/ e) => {
      if (thisVideoParams.current.autoplay) {
        expose.restart();
      }
      handler.listening();
      callfunc(lastProps.current.onLoad, [e]);
    },
    click: (/**@type React.MouseEvent*/ e) => {
      callfunc(lastProps.current.onClick, [e]);
    },
    message: (/**@type MessageEvent*/ e) => {
      if (null == e) {
        return null;
      }
      let data = e.data;
      if ("string" === typeof data) {
        try {
          data = JSON.parse(e.data);
        } catch (e) {}
      }
      if (data?.id === lastMessageId.current) {
        const playerState = data?.info?.playerState;
        if (null != playerState) {
          let isPlaying = false;
          switch (playerState) {
            case 1:
            case 3:
              isPlaying = true;
              break;
          }
          lastPlayerState.current = { state: playerState, isPlaying };
        }
        callfunc(lastProps.current.onStateChange, [data]);
      }
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
          videoParams: thisVideoParams.current,
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
  const { loading, onError, ...restProps } = nextProps;
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
        onError={onError}
      />
    </ResponsiveVideo>
  );
});

export default YoutubeRWD;
