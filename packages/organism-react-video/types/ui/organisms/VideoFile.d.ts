export default VideoFile;
export type Component = import('reshow-build').Component;
export type VideoFileProps = {
    src: string;
    sourceType?: string;
    otherSources?: {
        [key: string]: string;
    };
    sourceComponent?: Component;
    videoComponent?: Component;
    videoParams?: {
        [key: string]: any;
    };
    className?: string;
    style?: React.CSSProperties;
};
/**
 * @typedef {import('reshow-build').Component} Component
 */
/**
 * @typedef {object} VideoFileProps
 * @property {string} src
 * @property {string} [sourceType]
 * @property {{[key: string]: string}} [otherSources]
 * @property {Component} [sourceComponent]
 * @property {Component} [videoComponent]
 * @property {{[key:string]:any}} [videoParams]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */
/**
 * @param {VideoFileProps} props
 * https://www.w3schools.com/tags/tag_video.asp
 */
declare function VideoFile({ src, otherSources, videoParams, sourceComponent, videoComponent, sourceType, ...restProps }: VideoFileProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
