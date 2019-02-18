import React, {PureComponent} from 'react'; 
import PropTypes from 'prop-types';
import get from 'get-object-value';
import {SemanticUI} from 'react-atomic-molecule';
import {IframeContainer} from 'organism-react-iframe';

const keys = Object.keys;

const message = (func, args) => 
  JSON.stringify({
    event: 'command',
    func,
    args
 });

/**
 * YouTube Embedded Players
 *
 * https://developers.google.com/youtube/player_parameters
 */
class YoutubeRWD extends PureComponent
{
    static propTypes = {
        videoId: PropTypes.string.isRequired
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
        videoParams: { },
        showControllBar: false,
        mask: true,
        corp: 23,
    };

    state = {
        load: 0
    };

    iframe = null;

    exec(cmd, args=[])
    {
        if (!this.iframe) {
            return;
        }
        const thisCmd = message(cmd, args);
        this.iframe.contentWindow.postMessage(
            thisCmd,
            '*'
        );
    }

    handleEl = el =>
    {
        this.iframe = el;
        this.restart();
    }

    restart()
    {
        this.exec('playVideo');
    }

    handleLoad = () =>
    {
        this.restart();
    }

    componentDidMount()
    {
        const loc = get(document, ['location']);
        this.setState({
            load:1,
            hostname: loc.protocol+'//'+loc.hostname
        });
    }

    render()
    {
       const {load, hostname} = this.state;
       if (!load) {
           return null;
       } 
       const {corp, defaultVideoParams, videoId, videoParams, showControllBar, mask} = this.props;
       const aParams = [];
       const thisVideoParams = {
        ...defaultVideoParams,
        ...videoParams
       };
       if (thisVideoParams['enablejsapi']) {
         thisVideoParams['origin'] = hostname;
       }
       keys(thisVideoParams).forEach(
         key =>
         aParams.push(
            key+
            '='+
            encodeURIComponent(thisVideoParams[key])
       ));
       if (thisVideoParams['loop'] && !thisVideoParams['playlist']) {
        aParams.push('playlist='+videoId);
       }
       const src = 'https://www.youtube.com/embed/'+
            videoId+
            '?'+
            aParams.join('&');

       const showControllBarStyle = {};
       if (showControllBar) {
            showControllBarStyle['marginBottom'] = -corp+'vw';
       } else {
            showControllBarStyle['marginBottom'] = -(corp*2)+'vw';
       }

       let thisMask = null;
       if (mask) {
            thisMask = <SemanticUI
                className="play-mask"
                style={Styles.mask}
                onTouchStart={e=>this.restart()}
                onTouchEnd={e=>this.restart()}
                onClick={e=>this.restart()}
            />; 
       }
       
       return (
        <SemanticUI className="youtube-player" style={Styles.container}>
            <SemanticUI className="youtube-player-inner" style={{...Styles.inner, ...showControllBarStyle}}>
                <IframeContainer
                    style={{...Styles.iframe, margin:`-${corp}vw 0`}}
                    allow="autoplay; fullscreen; encrypted-media"
                    src={src}
                    refCb={this.handleEl}
                    onLoad={this.handleLoad}
                />
            </SemanticUI>
            {thisMask} 
        </SemanticUI>
       );
    }
}

export default YoutubeRWD;

const Styles = {
    container: {
        overflow: 'hidden',
        position: 'relative',
        zIndex: 0
    },
    inner: {
        position: 'relative',
        padding: '0 0 100%',
        height: 0,
        overflow: 'hidden',
        zIndex: 0,
    },
    iframe: {
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
        bottom: -10
    }
};
