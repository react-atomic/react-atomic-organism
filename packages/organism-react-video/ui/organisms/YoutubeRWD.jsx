import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {IframeContainer} from 'organism-react-iframe';
import {doc} from 'win-doc';

import ResponsiveVideo from '../organisms/ResponsiveVideo';

const keys = Object.keys;

const message = (func, args) =>
  JSON.stringify({
    event: 'command',
    func,
    args,
  });

/**
 * YouTube Embedded Players
 *
 * https://developers.google.com/youtube/player_parameters
 */
class YoutubeRWD extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    defaultVideoParams: {
      autoplay: 1,
      loop: 1,
      showinfo: 0,
      controls: 0,
      rel: 0,
      mute: 1,
      modestbranding: 1,
      iv_load_policy: 3,
      enablejsapi: 1,
    },
    videoParams: {},
  };

  state = {
    load: 0,
  };

  iframe = null;

  exec(cmd, args = []) {
    if (!this.iframe) {
      return;
    }
    const thisCmd = message(cmd, args);
    this.iframe.contentWindow.postMessage(thisCmd, '*');
  }

  handleEl = el => {
    this.iframe = el;
    this.restart();
  };

  restart = () => {
    this.exec('playVideo');
  }

  handleLoad = () => {
    this.restart();
  };

  componentDidMount() {
    const loc = doc().location;
    this.setState({
      load: 1,
      hostname: loc.protocol + '//' + loc.hostname,
    });
  }

  render() {
    const {load, hostname} = this.state;
    if (!load) {
      return null;
    }
    const {defaultVideoParams, videoId, videoParams, ...others} = this.props;
    const aParams = [];
    const thisVideoParams = {
      ...defaultVideoParams,
      ...videoParams,
    };
    if (thisVideoParams['enablejsapi']) {
      thisVideoParams['origin'] = hostname;
    }
    keys(thisVideoParams).forEach(key =>
      aParams.push(key + '=' + encodeURIComponent(thisVideoParams[key])),
    );
    if (thisVideoParams['loop'] && !thisVideoParams['playlist']) {
      aParams.push('playlist=' + videoId);
    }
    const src =
      'https://www.youtube.com/embed/' + videoId + '?' + aParams.join('&');

    return (
      <ResponsiveVideo {...others} restart={this.restart}>
        <IframeContainer
          allow="autoplay; fullscreen; encrypted-media"
          src={src}
          refCb={this.handleEl}
          onLoad={this.handleLoad}
        />
      </ResponsiveVideo>
    );
  }
}

export default YoutubeRWD;
