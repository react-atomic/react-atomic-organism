// @ts-check
import * as React from "react";
import { SemanticUI } from "react-atomic-molecule";
import { KEYS } from "reshow-constant";

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
const VideoFile = ({ src, sourceType, otherSources, ...restProps }) => {
  let thisOtherSources = null;
  if (otherSources) {
    thisOtherSources = KEYS(otherSources).map((key) => {
      const sSrc = otherSources[key];
      return <SemanticUI atom="source" src={sSrc} type={key} key={key} />;
    });
  }
  return (
    <SemanticUI atom="video" controls {...restProps}>
      <SemanticUI atom="source" src={src} type={sourceType} />
      {thisOtherSources}
    </SemanticUI>
  );
};

export default VideoFile;
