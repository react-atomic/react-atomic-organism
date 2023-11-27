// @ts-check
import { KEYS } from "reshow-constant";
import build from "reshow-build";

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
const VideoFile = ({
  src,
  otherSources,
  videoParams,
  sourceComponent = "source",
  videoComponent = "video",
  sourceType = "video/mp4",
  ...restProps
}) => {
  const sourceEl = build(sourceComponent);
  const videoEl = build(videoComponent);
  const thisSources = [sourceEl({ src, type: sourceType, key: "default" })];
  if (otherSources) {
    thisSources.push(
      ...KEYS(otherSources).map((key) => {
        const sSrc = otherSources[key];
        return sourceEl({ src: sSrc, type: key, key });
      })
    );
  }
  videoParams = videoParams || { controls: true };
  if (videoParams["autoPlay"]) {
    videoParams["muted"] = true;
  }
  return videoEl({ ...videoParams, ...restProps }, thisSources);
};

export default VideoFile;
