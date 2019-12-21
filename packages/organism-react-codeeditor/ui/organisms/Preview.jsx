import React, {PureComponent} from 'react';
import Iframe from 'organism-react-iframe';
import {win} from 'win-doc';
import {SemanticUI, Unsafe, Icon} from 'react-atomic-molecule';
import Device from 'ricon/Device';

const deviceWidth = {
  desktop: 1024,
  tablet: 768,
  phone: 320,
};

const keys = Object.keys;

class Preview extends PureComponent {
  state = {width: deviceWidth.desktop, scale: 1};

  setValue(v) {
    this.setState({v});
  }

  resize = () => {
    const {width} = this.state;
    const iframeW = this.dIframe.offsetWidth;
    let scale = (iframeW - 10) / width;
    if (scale > 1) {
      scale = 1;
    }
    this.setState({scale});
  };

  changeDevice = device => () => {
    this.setState({width: deviceWidth[device]}, ()=>this.resize());
  };

  handleIframe = el => {
    this.dIframe = el;
  };

  handleLoad = () => {
    this.iframeWindow = this.dIframe.contentWindow.window;
    this.resize();
    win().addEventListener('resize', this.resize);
  };

  componentWillUnmount() {
    win().removeEventListener('resize', this.resize);
  }

  render() {
    const {v, scale, width} = this.state;
    let rwdStyle = null;
    let bodyStyle = null;
    if (width !== deviceWidth.desktop) {
      rwdStyle = {
        background: '#fff',
        margin: '0 auto',
        overflow: 'hidden'
      }; 
      bodyStyle = 'body {background: rgba(0, 0, 0, .6)}';
    }
    const {className} = this.props;
    return (
      <SemanticUI
        className={className}
        style={{...Styles.fitHeight, ...Styles.container}}>
        <SemanticUI style={Styles.device}>
          {keys(deviceWidth).map(d => (
            <Icon key={d} style={Styles.icon} onClick={this.changeDevice(d)}>
              <Device type={d} />
            </Icon>
          ))}
        </SemanticUI>
        <Iframe
          style={{...Styles.fitHeight, ...Styles.iframe}}
          refCb={this.handleIframe}
          onLoad={this.handleLoad}>
          <Unsafe atom="style">{`body {overflow-x: hidden} ${bodyStyle}`}</Unsafe>
          <Unsafe
            style={{
              ...rwdStyle,
              transform: `scale(${scale})`,
              transformOrigin: '0 0',
              width,
            }}>
            {v}
          </Unsafe>
        </Iframe>
      </SemanticUI>
    );
  }
}

export default Preview;

const Styles = {
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  fitHeight: {
    height: '100%',
  },
  container: {
    position: 'relative',
  },
  iframe: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
  },
  device: {
    position: 'relative',
    zIndex: 1,
    marginTop: 10
  },
};
