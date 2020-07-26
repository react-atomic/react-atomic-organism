import React, {PureComponent} from 'react';
import get from 'get-object-value';
import {SemanticUI} from 'react-atomic-molecule';
import callfunc from 'call-func';

let iframeCount = 0;

class IframeContainer extends PureComponent {
  static defaultProps = {
    messageKey: 'iframeH',
  };

  state = {iframeH: 'auto'};

  postHeight = win =>
    setTimeout(() => {
      win?.parent?.window.postMessage(
        {
          type: this.messageKey,
          h: win.document.body.offsetHeight,
        },
        '*',
      );
    });

  handleMessage = e => {
    let data = e.data;
    if ('string' === typeof data) {
      try {
        data = JSON.parse(get(data, null, '{}'));
      } catch (ex) {}
    }
    const {type, h} = data;
    if (-1 !== `|${type}|`.indexOf(`|${this.messageKey}|`)) {
      this.setState({
        iframeH: h + 50,
      });
    }
  };

  constructor(props) {
    super(props);
    const {messageKey} = props;
    this.messageKey = messageKey + '-' + iframeCount;
    iframeCount++;
  }

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
          minHeight: iframeH,
          ...style,
        }}
        atom="iframe"
        refCb={el => {
          if (el) {
            this.iframe = el;
            callfunc(refCb, [el]);
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
