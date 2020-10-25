import React, { PureComponent } from "react";
import Iframe from "organism-react-iframe";
import { win } from "win-doc";
import { SemanticUI, Unsafe, Icon } from "react-atomic-molecule";
import Device from "ricon/Device";
import { popupDispatch, AlertsNotifier } from "organism-react-popup";

const deviceWidth = {
  desktop: 1024,
  tablet: 768,
  phone: 320,
};

const keys = Object.keys;

class HtmlPreview extends PureComponent {
  state = { width: deviceWidth.desktop, scale: 1, height: "100%" };

  setValue(v) {
    this.setState({ v });
  }

  resize = () => {
    const { width } = this.state;
    const containerW = this.container.offsetWidth;
    let scale = (containerW - 10) / width;
    let height = 100 / scale;
    if (scale > 1) {
      scale = 1;
      height = 100;
    }
    this.setState({ scale, height });
  };

  changeDevice = (device) => () => {
    this.setState({ width: deviceWidth[device] }, () => this.resize());
  };

  handleIframe = (el) => (this.dIframe = el);
  handleContainer = (el) => (this.container = el);

  handleLoad = () => {
    this.iframeWindow = this.dIframe.contentWindow.window;
    let timer;
    timer = setInterval(() => {
      if (this.container) {
        this.resize();
        win().addEventListener("resize", this.resize);
      }
    }, 10);
  };

  handleLinkClick = (e, link) => {
    const alerts = [
      {
        message: (
          <SemanticUI atom="a" href={link.href} target="_blank">
            {`click: ${link.href}`}
          </SemanticUI>
        ),
      },
    ];
    popupDispatch("dom/update", {
      popup: <AlertsNotifier alerts={alerts} position="bottom" />,
    });
    return false;
  };

  componentWillUnmount() {
    win().removeEventListener("resize", this.resize);
  }

  render() {
    const { v, scale, width, height } = this.state;
    let bgStyle = null;
    if (width !== deviceWidth.desktop) {
      bgStyle = { background: "rgba(0, 0, 0, .6)" };
    }
    const { className } = this.props;
    return (
      <SemanticUI
        refCb={this.handleContainer}
        className={className}
        style={{ ...Styles.container, ...bgStyle }}
      >
        <SemanticUI style={Styles.device}>
          {keys(deviceWidth).map((d) => (
            <Icon key={d} style={Styles.icon} onClick={this.changeDevice(d)}>
              <Device type={d} />
            </Icon>
          ))}
        </SemanticUI>
        <Iframe
          style={{
            ...Styles.iframe,
            transform: `scale(${scale}) translateX(-50%)`,
            transformOrigin: "0 0",
            width,
            height: height + "%",
          }}
          onLinkClick={this.handleLinkClick}
          refCb={this.handleIframe}
          onLoad={this.handleLoad}
        >
          <Unsafe atom="style">{`body {overflow-x: hidden; background: #fff}`}</Unsafe>
          <Unsafe>{v}</Unsafe>
        </Iframe>
      </SemanticUI>
    );
  }
}

export default HtmlPreview;

const Styles = {
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    cursor: "pointer",
  },
  container: {
    position: "relative",
    height: "100%",
  },
  iframe: {
    position: "absolute",
    left: "50%",
    top: 0,
    zIndex: 0,
  },
  device: {
    position: "relative",
    zIndex: 1,
    marginTop: 10,
  },
};
