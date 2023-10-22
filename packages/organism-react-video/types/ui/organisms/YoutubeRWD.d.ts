export default YoutubeRWD;
export type ResponsiveVideoProps = import("../organisms/ResponsiveVideo").ResponsiveVideoProps;
export type YoutubeRWDExtProps = {
    loading?: "eager" | "lazy";
    videoId?: string;
    videoParams?: {
        [key: string]: any;
    };
    hostname?: string;
};
export type YoutubeRWDProps = ResponsiveVideoProps & YoutubeRWDExtProps;
/**
 * @type React.FC<YoutubeRWDProps>
 * https://developers.google.com/youtube/player_parameters
 */
declare const YoutubeRWD: React.FC<YoutubeRWDProps>;
import * as React from "react";
