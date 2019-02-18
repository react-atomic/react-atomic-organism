import React, {cloneElement} from 'react';
import {SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';

const ResponsiveVideo = props => {
  const {mask, children, corp, showControllBar} = props;
  let thisMask = null;
  if (mask) {
    thisMask = (
      <SemanticUI
        className="play-mask"
        style={Styles.mask}
        onTouchStart={e => this.restart()}
        onTouchEnd={e => this.restart()}
        onClick={e => this.restart()}
      />
    );
  }

  const showControllBarStyle = {};
  if (showControllBar) {
    showControllBarStyle['marginBottom'] = -corp + 'vw';
  } else {
    showControllBarStyle['marginBottom'] = -(corp * 2) + 'vw';
  }

  return (
    <SemanticUI className="rwd-video" style={Styles.container}>
      <SemanticUI
        className="rwd-video-inner"
        style={{...Styles.inner, ...showControllBarStyle}}>
        {cloneElement(
          children,
          {
            style: {
              ...get(children, ['props', 'style']),
              ...Styles.videoContainer,
              margin: `-${corp}vw 0`
            }
          }
        )}
      </SemanticUI>
      {thisMask}
    </SemanticUI>
  );
};

ResponsiveVideo.defaultProps = {
  showControllBar: false,
  mask: true,
  corp: 23,
};

export default ResponsiveVideo;

const Styles = {
  container: {
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
  },
  inner: {
    position: 'relative',
    padding: '0 0 100%',
    height: 0,
    overflow: 'hidden',
    zIndex: 0,
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mask: {
    zIndex: 1,
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
  },
};
