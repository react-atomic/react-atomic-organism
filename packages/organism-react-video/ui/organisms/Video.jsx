import React, {memo} from 'react';
import VideoFile from '../organisms/VideoFile';
import ResponsiveVideo from '../organisms/ResponsiveVideo';

const Video = memo(props => {
  const {showControllBar, mask, corp, ...others} = props;
  return (
    <ResponsiveVideo
      {...{showControllBar, mask, corp}}
    >
      <VideoFile {...others}/>
    </ResponsiveVideo>
  );
});

Video.defaultProps = {mask: false};

export default Video;
