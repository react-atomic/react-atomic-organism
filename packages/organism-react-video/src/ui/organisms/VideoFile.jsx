// @ts-check
import { KEYS } from "reshow-constant";
import build from "reshow-build";

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
const VideoFile = ({
  src,
  sourceType,
  otherSources,
  sourceComponent = "source",
  videoComponent = "video",
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
  return videoEl({ controls: true, ...restProps }, thisSources);
};

export default VideoFile;
