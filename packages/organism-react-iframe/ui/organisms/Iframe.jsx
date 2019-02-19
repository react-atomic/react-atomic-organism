import 'setimmediate';
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import get from 'get-object-value';
import getOffset from 'getoffset';
import smoothScrollTo from 'smooth-scroll-to';
import exec from 'exec-script';
import {SemanticUI} from 'react-atomic-molecule';
import {js} from 'create-el';
import {queryFrom} from 'css-query-selector';

import IframeContainer from '../organisms/IframeContainer';

const keys = Object.keys;

let iframeCount = 0;

class Iframe extends PureComponent {
  static defaultProps = {
    keepTargetInIframe: false,
    messageKey: 'iframeH',
  };

  html = null;

  appendHtml = html => {
    let div = document.createElement('div');
    div.innerHTML = html;
    const root = get(this.root, ['childNodes', 0, 'childNodes', 0], this.root);
    root.appendChild(div);
    this.handleScript(div);
  };

  getBody = () => get(this.contentWindow, ['document', 'body']);

  getWindow = () => get(this.contentWindow, ['window']);

  postHeight = () => {
    setTimeout(() => {
      this.getWindow().parent.window.postMessage(
        {
          type: this.messageKey,
          h: this.getBody().offsetHeight,
        },
        '*',
      );
    });
  };

  handleClickLink() {
    const {keepTargetInIframe} = this.props;
    const body = this.getBody();
    if (!body) {
      return;
    }
    const query = queryFrom(() => body);
    body.addEventListener('click', e => {
      const evTarget = e.target;
      const link =
        evTarget.nodeName === 'A' ? evTarget : query.ancestor(evTarget, 'a');
      if (!link) {
        return;
      }
      if (link.target && '_blank' === link.target.toLowerCase()) {
        return;
      }
      if (link.hash) {
        e.preventDefault();
        const tarDom = query.one(link.hash);
        if (tarDom) {
          smoothScrollTo(getOffset(tarDom).top);
          return;
        }
      }
      if (keepTargetInIframe) {
        return;
      } else {
        e.preventDefault();
        if (link.href) {
          location.href = link.href;
        }
      }
    });
  }

  handleScript = el => {
    const win = this.getWindow();
    if (win) {
      exec(el, win, this.root.parentNode);
    }
  };

  renderIframe(props) {
    const {children} = props;

    // setTimeout for https://gist.github.com/HillLiu/013d94ce76cfb7e8c46dd935164e4d72
    setImmediate(() => {
      this.html = this.root.innerHTML;
      ReactDOM.render(<SemanticUI>{children}</SemanticUI>, this.root, () => {
        const html = this.root.innerHTML;
        if (html !== this.html) {
          this.handleScript(this.root);
          this.handleClickLink();
        }
      });
    });
  }

  constructor(props) {
    super(props);
    const {messageKey} = props;
    this.messageKey = messageKey+'-'+iframeCount;
    iframeCount++;
  }

  componentDidMount() {
    this.root = document.createElement('div');
    const body = this.getBody();
    if (body) {
      body.appendChild(this.root);
    }
    this.renderIframe(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.renderIframe(this.props);
  }

  componentWillUnmount() {
    // https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
    ReactDOM.unmountComponentAtNode(this.root);
  }

  render() {
    const {children, keepTargetInIframe, refCb, ...others} = this.props;
    return (
      <IframeContainer
        {...others}
        refCb={el => {
          this.el = el;
          this.contentWindow = el.contentWindow;
          if ('function' === typeof refCb) {
            refCb(el);
          }
        }}
        messageKey={this.messageKey}
      />
    );
  }
}

export default Iframe;
