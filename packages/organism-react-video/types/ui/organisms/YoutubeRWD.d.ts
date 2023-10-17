export default YoutubeRWD;
/**
 * @type React.FC<YoutubeRWDProps>
 * https://developers.google.com/youtube/player_parameters
 */
declare const YoutubeRWD: React.FC<YoutubeRWDProps>;
import * as React from "react";
declare class YoutubeRWDProps {
    /**
     * @type {string?}
     */
    videoId: string | null;
    /**
     * @type {{[key: string]: any}?}
     */
    videoParams: {
        [key: string]: any;
    };
    /**
     * @type {string?}
     */
    hostname: string | null;
}
