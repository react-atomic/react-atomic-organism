import React, {PureComponent} from 'react';
import {SemanticUI} from 'react-atomic-molecule';

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
          <SemanticUI atom="source" src={sSrc} type={key} key={key} />
        );
      });
    }
    return (
      <SemanticUI atom="video" controls {...others}>
        <SemanticUI atom="source" src={src} type={sourceType} />
        {thisOtherSources}
      </SemanticUI>
    );
  }
}

export default VideoFile;
