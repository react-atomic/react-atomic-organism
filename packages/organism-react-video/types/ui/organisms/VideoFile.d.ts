export default VideoFile;
export type VideoFileProps = {
    src: string;
    sourceType: string;
    otherSources: {
        [key: string]: string;
    };
};
/**
 * @typedef {object} VideoFileProps
 * @property {string} src
 * @property {string} sourceType
 * @property {{[key: string]: string}} otherSources
 */
/**
 * @param {VideoFileProps} props
 *
 * sourceType: "video/mp4"
 */
declare function VideoFile({ src, sourceType, otherSources, ...restProps }: VideoFileProps): import("react/jsx-runtime").JSX.Element;
