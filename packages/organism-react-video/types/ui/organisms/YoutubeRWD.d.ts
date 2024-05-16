export default YoutubeRWD;
export type IframeContainerExpose = import('organism-react-iframe').IframeContainerExpose;
export type ResponsiveVideoProps = import("../organisms/ResponsiveVideo").ResponsiveVideoProps;
export type YoutubeRWDExtProps = {
    loading?: "eager" | "lazy";
    videoId?: string;
    videoParams?: {
        [key: string]: any;
    };
    hostname?: string | boolean;
    disable?: boolean;
};
export type YoutubeRWDProps = ResponsiveVideoProps & YoutubeRWDExtProps;
export type YoutubeRWDExpose = {
    restart: Function;
    pause: Function;
    exec: ExecPost;
};
export type ExecPost = (cmd: string, args?: any[] | undefined) => any;
/**
 * @type React.ForwardRefExoticComponent<?, YoutubeRWDProps>
 */
declare const YoutubeRWD: React.ForwardRefExoticComponent<unknown, YoutubeRWDProps>;
import * as React from "react";
