import React, {PureComponent} from 'react';
import get from 'get-object-value';
import {SemanticUI} from 'react-atomic-molecule';

class IframeContainer extends PureComponent {
  
  static defaultProps = {
    messageKey: 'iframeH'
  };

  state = {iframeH: 'auto'};

  handleMessage = e => {
    let data = e.data;
    if ('string' === typeof data) {
      try {
        data = JSON.parse(get(data, null, '{}'));
      } catch (ex) {}
    }
    const {type, h} = data;
    const {messageKey} = this.props;
    if (-1 !== `|${type}|`.indexOf(`|${messageKey}|`)) {
      this.setState({
        iframeH: h + 50,
      });
    }
  };

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false);
  }

  render() {
    const {iframeH} = this.state;
    const {src, refCb, style, messageKey, ...others} = this.props;
    if (src) {
      others.src = src;
    }
    return (
      <SemanticUI
        {...others}
        style={{
          ...Styles.iframe,
          height: iframeH,
          ...style,
        }}
        atom="iframe"
        refCb={el => {
          this.iframe = el;
          if ('function' === typeof refCb) {
            refCb(el);
          }
        }}
      />
    );
  }
}

export default IframeContainer;

const Styles = {
  iframe: {
    width: '100%',
    border: 0,
  },
};
