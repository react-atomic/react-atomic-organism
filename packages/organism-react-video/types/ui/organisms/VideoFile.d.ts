export default VideoFile;
export type Component = import('reshow-build').Component;
export type VideoFileProps = {
    src: string;
    sourceType: string;
    otherSources: {
        [key: string]: string;
    };
    sourceComponent: Component;
    videoComponent: Component;
};
/**
 * @typedef {import('reshow-build').Component} Component
 */
/**
 * @typedef {object} VideoFileProps
 * @property {string} src
 * @property {string} sourceType
 * @property {{[key: string]: string}} otherSources
 * @property {Component} sourceComponent
 * @property {Component} videoComponent
 */
/**
 * @param {VideoFileProps} props
 *
 * sourceType: "video/mp4"
 */
declare function VideoFile({ src, sourceType, otherSources, sourceComponent, videoComponent, ...restProps }: VideoFileProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
