import React from 'react';
import {reactStyle, Icon, Image, SemanticUI} from 'react-atomic-molecule';
import PlayIcon from 'ricon/Play';

const VideoThumbnail = ({onClick, playBgColor, playFgColor, src}) =>
  <SemanticUI
    onTouchStart={onClick}
    onTouchEnd={onClick}
    onClick={onClick}>
    <Image
      styles={reactStyle(Styles.thumb, false, false)}
      src={src}
    />
    <Icon styles={reactStyle(Styles.play, false, false)}>
      <PlayIcon bgColor={playBgColor} fgColor={playFgColor} />
    </Icon>
  </SemanticUI>

export default VideoThumbnail;

const Styles = {
  thumb: {
    width: '100%',
    top: '50%',
    position: 'absolute',
    transform: ['translateY(-50%)'],
  },
  play: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: ['translate(-50%, -50%)'],
    width: 100,
    cursor: 'pointer',
  },
};
