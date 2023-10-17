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
    className?: string;
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
 * @property {string} [className]
 */
/**
 * @param {VideoFileProps} props
 */
declare function VideoFile({ src, otherSources, sourceComponent, videoComponent, sourceType, ...restProps }: VideoFileProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
