import React, { PureComponent, useEffect } from "react";
import { createPortal } from "react-dom";
import get from "get-object-value";
import getOffset from "getoffset";
import smoothScrollTo from "smooth-scroll-to";
import exec from "exec-script";
import { SemanticUI, Unsafe } from "react-atomic-molecule";
import { queryFrom } from "css-query-selector";
import callfunc from "call-func";

import IframeContainer from "../organisms/IframeContainer";

const keys = Object.keys;

const IframeInner = ({ children, onLoad }) => {
  useEffect(() => {
    callfunc(onLoad);
  }, [children]);
  return (
    <SemanticUI>
      <Unsafe atom="style">{() => "body {padding:0; margin:0;}"}</Unsafe>
      {children}
    </SemanticUI>
  );
};

class Iframe extends PureComponent {
  static defaultProps = {
    keepTargetInIframe: false,
    initialContent: "<html><body /></html>",
    autoHeight: false
  };

  html = null;

  execStop = null;

  appendHtml = html => {
    let div = document.createElement("div");
    div.innerHTML = html;
    const root = get(this.root, ["childNodes", 0, "childNodes", 0], this.root);
    root.appendChild(div);
    this.handleScript(div);
  };

  postHeight = () => this.iframe.postHeight(this.getWindow());

  getBody = () => get(this.getDoc(), ["body"]);

  getDoc = () => get(this.getWindow(), ["document"]);

  getWindow = () => get(this.el, ["contentWindow", "window"]);

  handleBodyClick = e => {
    const { keepTargetInIframe, onLinkClick } = this.props;
    const query = queryFrom(() => this.getBody());
    const evTarget = e.target;
    const link =
      evTarget.nodeName === "A" ? evTarget : query.ancestor(evTarget, "a");
    if (!link) {
      return;
    }
    if (link.target && "_blank" === link.target.toLowerCase()) {
      return;
    }

    const isContinue = callfunc(onLinkClick, [e, link]);

    if (false === isContinue) {
      e.preventDefault();
      return;
    }

    if (link.hash) {
      const tarDom = query.one(link.hash);
      if (tarDom) {
        const URI = document.location;
        if (URI.pathname === link.pathname && URI.host === link.host) {
          e.preventDefault();
          smoothScrollTo(getOffset(tarDom).top);
          return;
        }
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
  };

  handleLinkClick() {
    const body = this.getBody();
    if (!body) {
      return;
    }
    body.removeEventListener("click", this.handleBodyClick);
    body.addEventListener("click", this.handleBodyClick);
  }

  handleScript = el => {
    const win = this.getWindow();
    if (win) {
      this.execStop = exec(el, win, this.root.parentNode);
    }
  };

  handleRef = el => (this.iframe = el);

  handleRefCb = el => {
    if (el) {
      const { refCb } = this.props;
      this.el = el;
      callfunc(refCb, [el]);
    }
  };

  renderIframe(props) {
    if (!this.root) {
      this.init();
    }
    const root = this.root;

    const { children, autoHeight, onLoad } = props;

    this.html = root.innerHTML;
    const callback = () => {
      const html = root.innerHTML;
      if (html !== this.html) {
        this.handleScript(root);
        this.handleLinkClick();
        if (autoHeight) {
          this.autoHeightTimer = setTimeout(() => this.postHeight(), 500);
        }
        callfunc(onLoad);
      }
    };
    return createPortal(
      <IframeInner {...props} onLoad={callback} />,
      this.root
    );
  }

  init() {
    const { initialContent, onUnload, onBeforeUnload, autoHeight } = this.props;
    this.root = document.createElement("div");
    const doc = this.getDoc();
    if (doc) {
      // fixed firfox innerHTML suddenly disappear.
      doc.open("text/html", "replace");
      doc.write(initialContent);
      doc.close();

      const body = this.getBody();
      body.appendChild(this.root);
      body.addEventListener("unload", onUnload);
      body.addEventListener("beforeunload", onBeforeUnload);
      if (autoHeight) {
        this.getWindow()?.addEventListener("resize", this.postHeight);
      }
    }
  }

  componentDidMount() {
    !this.root && this.forceUpdate();
  }

  componentWillUnmount() {
    if (this.autoHeightTimer) {
      clearTimeout(this.autoHeightTimer);
    }
    callfunc(this.execStop);
    callfunc(this.props.onUnmount);
  }

  render() {
    const {
      initialContent,
      children,
      keepTargetInIframe,
      refCb,
      autoHeight,
      onLinkClick,
      onLoad,
      onUnload,
      onBeforeUnload,
      onUnmount,
      ...others
    } = this.props;
    return (
      <IframeContainer
        {...others}
        ref={this.handleRef}
        refCb={this.handleRefCb}
      >
        {this.el && this.renderIframe(this.props)}
      </IframeContainer>
    );
  }
}

export default Iframe;
