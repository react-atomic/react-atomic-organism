import React, { memo } from "react";
import VideoFile from "../organisms/VideoFile";
import ResponsiveVideo from "../organisms/ResponsiveVideo";

const Video = memo((props) => {
  const { showControllBar, aspectRatio, mask, ...others } = props;
  return (
    <ResponsiveVideo {...{ showControllBar, aspectRatio, mask }}>
      <VideoFile {...others} />
    </ResponsiveVideo>
  );
});

Video.defaultProps = { mask: false };

export default Video;
