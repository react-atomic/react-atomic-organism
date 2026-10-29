import * as React from "react";
export type IframeContainerExpose = import('organism-react-iframe').IframeContainerExpose;
export type ResponsiveVideoProps = import("../organisms/ResponsiveVideo").ResponsiveVideoProps;
export type YoutubeRWDExtendsProps = {
    loading?: "eager" | "lazy";
    videoId?: string;
    videoParams?: {
        [key: string]: any;
    };
    hostname?: string | boolean;
    disable?: boolean;
    id?: string;
    onStateChange?: Function;
    onLoad?: Function;
    onError?: Function;
};
export type YoutubeRWDProps = ResponsiveVideoProps & YoutubeRWDExtendsProps;
/**
 * @interface
 */
declare class PlayerState {
    /**
     * @type number
     */
    state: number;
    /**
     * @type boolean
     */
    isPlaying: boolean;
}
export type YoutubeRWDExpose = {
    restart: Function;
    pause: Function;
    togglePlayback: () => PlayerState;
    postMessage: (msg: string) => void;
    exec: ExecPost;
    getIframe: () => HTMLIFrameElement | undefined;
    getPlayerState: () => PlayerState;
};
export type ExecPost = (cmd: string, args?: any[] | undefined) => any;
/**
 * @type React.ForwardRefExoticComponent<any, YoutubeRWDProps>
 */
declare const YoutubeRWD: React.ForwardRefExoticComponent<any, YoutubeRWDProps>;
export default YoutubeRWD;
