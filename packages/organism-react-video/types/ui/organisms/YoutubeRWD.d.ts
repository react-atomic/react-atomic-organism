export default YoutubeRWD;
/**
 * YouTube Embedded Players
 *
 * https://developers.google.com/youtube/player_parameters
 */
declare class YoutubeRWD extends PureComponent<any, any, any> {
    static propTypes: {
        videoId: any;
    };
    static defaultProps: {
        defaultVideoParams: {
            autoplay: number;
            loop: number;
            showinfo: number;
            controls: number;
            rel: number;
            mute: number;
            modestbranding: number;
            iv_load_policy: number;
            enablejsapi: number;
        };
        videoParams: {};
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        load: number;
    };
    iframe: any;
    exec(cmd: any, args?: any[]): void;
    handleEl: (el: any) => void;
    restart: () => void;
    handleLoad: () => void;
    componentDidMount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { PureComponent } from "react";
