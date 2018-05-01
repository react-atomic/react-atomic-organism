import React, {PureComponent} from 'react'; 
import PropTypes from 'prop-types';

import {SemanticUI} from 'react-atomic-molecule';

const keys = Object.keys;

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
            modestbranding: 1 
        },
        videoParams: { },
        showControllBar: false,
        mask: true,
        corp: 120,
    };

    state = {
        load: 0
    };

    componentDidMount()
    {
        this.setState({
            load:1
        });
    }

    render()
    {
       const {load} = this.state;
       if (!load) {
           return null;
       } 
       const {corp, defaultVideoParams, videoId, videoParams, showControllBar, mask} = this.props;
       const aParams = [];
       const thisVideoParams = {
        ...defaultVideoParams,
        ...videoParams
       };
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
            showControllBarStyle['marginBottom'] = -corp;
       } else {
            showControllBarStyle['marginBottom'] = -(corp*2);
       }

       let thisMask = null;
       if (mask) {
            thisMask = <SemanticUI style={Styles.mask} />; 
       }
       
       return (
        <SemanticUI className="youtube-player" style={Styles.container}>
            <SemanticUI className="youtube-player-inner" style={{...Styles.inner, ...showControllBarStyle}}>
                <iframe
                    style={{...Styles.iframe, margin:`-${corp}px 0`}}
                    width="560"
                    height="315"
                    allow="autoplay"
                    allow="encrypted-media"
                    src={src}
                    onClick={e => {e.preventDefault(); console.log(e);}}
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
        top: 0,
        left: 0, 
        right: 0,
        bottom: 0
    }
};
