export default YoutubeRWD;
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
};
export type YoutubeRWDProps = ResponsiveVideoProps & YoutubeRWDExtendsProps;
export type YoutubeRWDExpose = {
    restart: Function;
    pause: Function;
    togglePlayback: () => PlayerState;
    postMessage: (arg0: string) => void;
    exec: ExecPost;
    getIframe: () => HTMLIFrameElement;
    getPlayerState: () => PlayerState;
};
export type ExecPost = (cmd: string, args?: any[] | undefined) => any;
/**
 * @type React.ForwardRefExoticComponent<?, YoutubeRWDProps>
 */
declare const YoutubeRWD: React.ForwardRefExoticComponent<unknown, YoutubeRWDProps>;
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
import * as React from "react";
