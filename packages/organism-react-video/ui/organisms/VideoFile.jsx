import React, {PureComponent} from 'react';

const keys = Object.keys;

class VideoFile extends PureComponent {
  static defaultProps = {
    sourceType: 'video/mp4'
  };

  render()
  {
    const {src, sourceType, otherSources, ...others} = this.props;
    let thisOtherSources = null;
    if (otherSources) {
      thisOtherSources = keys(otherSources).map( key => {
        const sSrc = otherSources[key];
        return (
          <source src={sSrc} type={key} key={key} />
        );
      });
    }
    return (
      <video controls {...others}>
        <source src={src} type={sourceType} />
        {thisOtherSources}
      </video>
    );
  }
}

export default VideoFile;
