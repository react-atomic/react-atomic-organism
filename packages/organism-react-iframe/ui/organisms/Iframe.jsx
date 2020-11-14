import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import get from "get-object-value";
import getOffset from "getoffset";
import smoothScrollTo from "smooth-scroll-to";
import exec from "exec-script";
import { SemanticUI, Unsafe } from "react-atomic-molecule";
import { queryFrom } from "css-query-selector";
import callfunc from "call-func";
import { doc } from "win-doc";

import IframeContainer from "../organisms/IframeContainer";

const IframeInner = ({ children, inlineCSS, onLoad }) => {
  useEffect(() => {
    callfunc(onLoad);
  }, [children]);
  return (
    <SemanticUI>
      <Unsafe atom="style">
        {() =>
          inlineCSS || "body {padding: 0; margin: 0; background: transparent;}"
        }
      </Unsafe>
      {children}
    </SemanticUI>
  );
};

const Iframe = forwardRef((props, ref) => {
  const {
    children,
    inlineCSS,
    initialContent,
    autoHeight,
    keepTargetInIframe,
    disableSmoothScroll,
    onLoad,
    onUnload,
    onBeforeUnload,
    onLinkClick,
    onUnmount,
    loadDelay,
    refCb,
    ...others
  } = props;
  const root = useRef();
  const _mount = useRef(true);
  const html = useRef();
  const execStop = useRef();
  const onLoadTimer = useRef();
  const thisIframe = useRef();
  const lastEl = useRef();
  const [thisEl, setThisEl] = useState();
  const expose = {
    appendHtml: (html) => {
      const div = doc().createElement("div");
      div.innerHTML = html;
      const myRoot = get(
        root.current,
        ["childNodes", 0, "childNodes", 0],
        root.current
      );
      myRoot.appendChild(div);
      handleScript(div);
    },
    getWindow: () => get(lastEl.current, ["contentWindow", "window"]),
    getDoc: () => get(expose.getWindow(), ["document"]),
    getBody: () => get(expose.getDoc(), ["body"]),
    scrollToEl: (el) => {
      const pos = getOffset(el);
      if (pos.rect) {
        smoothScrollTo(pos.rect.top);
      }
    },
    postHeight: () => thisIframe.current.postHeight(expose.getWindow()),
  };

  const handleRefCb = (myEl) => {
    if (myEl) {
      lastEl.current = myEl;
      callfunc(refCb, [myEl]);
    }
  };

  const handleScript = (el) => {
    const win = expose.getWindow();
    if (win) {
      execStop.current = exec(el, win, root.current.parentNode, (e, script) => {
        console.warn("script error", [e, script]);
      });
    }
  };

  const handleBodyClick = (e) => {
    const query = queryFrom(() => expose.getBody());
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
    if (link.hash && !disableSmoothScroll) {
      let tarDom;
      try {
        tarDom = query.one(link.hash);
      } catch (e) {
        const tarId = decodeURIComponent(link.hash.substr(1));
        tarDom = query.one(`[id="${tarId}"]`) || query.one(`[name="${tarId}"]`);
      }
      if (!tarDom) {
        console.warn("Can not handle hash", { e });
        return;
      } else {
        const URI = document.location;
        if (URI.pathname === link.pathname && URI.host === link.host) {
          e.preventDefault();
          expose.scrollToEl(tarDom);
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

  const handleLinkClick = () => {
    const body = expose.getBody();
    if (!body) {
      return;
    }
    body.removeEventListener("click", handleBodyClick);
    body.addEventListener("click", handleBodyClick);
  };

  const init = () => {
    root.current = doc().createElement("div");
    const myDoc = expose.getDoc();
    if (myDoc) {
      // fixed firfox innerHTML suddenly disappear.
      myDoc.open("text/html", "replace");
      myDoc.write(initialContent);
      myDoc.close();
      const body = expose.getBody();
      body.appendChild(root.current);
      body.addEventListener("unload", onUnload);
      body.addEventListener("beforeunload", onBeforeUnload);
    }
  };

  const renderIframe = () => {
    if (!root.current) {
      init();
    }
    const thisRoot = root.current;
    html.current = thisRoot.innerHTML;
    const callback = () => {
      if (!_mount.current) {
        return;
      }
      const myHtml = thisRoot.innerHTML;
      if (myHtml !== html.current) {
        handleScript(thisRoot);
        handleLinkClick();
        onLoadTimer.current = setTimeout(() => {
          if (!_mount.current || !expose.getWindow()) {
            return;
          }
          if (autoHeight) {
            expose.postHeight();
          }
          callfunc(onLoad);
        }, loadDelay);
      }
    };
    return createPortal(
      <IframeInner {...props} inlineCSS={inlineCSS} onLoad={callback} />,
      thisRoot
    );
  };

  useImperativeHandle(ref, () => expose);
  useEffect(() => {
    _mount.current = true;
    setThisEl(lastEl.current);
    return () => {
      _mount.current = false;
      if (onLoadTimer.current) {
        clearTimeout(onLoadTimer.current);
      }
      callfunc(execStop.current);
      callfunc(onUnmount);
    };
  }, []);

  if (autoHeight) {
    others.scrolling = "no";
  }

  return (
    <IframeContainer {...others} ref={thisIframe} refCb={handleRefCb}>
      {thisEl && renderIframe()}
    </IframeContainer>
  );
});

Iframe.defaultProps = {
  disableSmoothScroll: false,
  keepTargetInIframe: false,
  initialContent: "<html><body /></html>",
  autoHeight: false,
  loadDelay: 500,
};

Iframe.displayName = "ReshowIframe";

export default Iframe;
