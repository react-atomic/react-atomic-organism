import React from "react";
import { SemanticUI } from "react-atomic-molecule";
import { KEYS } from "reshow-constant";

// sourceType: "video/mp4"
const VideoFile = (props) => {
  const { src, sourceType, otherSources, ...others } = props;
  let thisOtherSources = null;
  if (otherSources) {
    thisOtherSources = KEYS(otherSources).map((key) => {
      const sSrc = otherSources[key];
      return <SemanticUI atom="source" src={sSrc} type={key} key={key} />;
    });
  }
  return (
    <SemanticUI atom="video" controls {...others}>
      <SemanticUI atom="source" src={src} type={sourceType} />
      {thisOtherSources}
    </SemanticUI>
  );
};

export default VideoFile;
