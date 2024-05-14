//@ts-check

import * as React from "react";
const { useEffect, useImperativeHandle, useRef, useState, forwardRef } = React;

import { createPortal } from "react-dom";
import get from "get-object-value";
import getOffset from "getoffset";
import smoothScrollTo from "smooth-scroll-to";
import exec from "exec-script";
import { SemanticUI, Unsafe } from "react-atomic-molecule";
import { queryFrom } from "css-query-selector";
import callfunc from "call-func";
import { doc } from "win-doc";
import { useMounted, useTimer } from "reshow-hooks";

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

/**
 * Add this type in top of your file, or if commonly used in some types file.
 * @template T
 * @typedef {[T, import('react').Dispatch<import('react').SetStateAction<T>>]} useState
 */

/**
 * @param {any} props
 */
const useIframe = ({
  disableSmoothScroll = false,
  keepTargetInIframe = false,
  initialContent = "<!DOCTYPE html><html><body /></html>",
  autoHeight = false,
  loadDelay = 500,
  children,
  inlineCSS,
  onLoad,
  onUnload,
  onBeforeUnload,
  onLinkClick,
  onUnmount,
  refCb,
  immutable,
  ...others
}) => {
  const root = /**@type {React.MutableRefObject<HTMLElement>}*/ (useRef());
  const _mount = useMounted();
  const [onLoadTimer] = useTimer();
  const html = /**@type {React.MutableRefObject<string>}*/ (useRef());
  const execStop = /**@type {React.MutableRefObject<Function>}*/ (useRef());
  const thisIframe =
    /**@type {React.MutableRefObject<import("./IframeContainer").IframeContainerExpose>}*/ (
      useRef()
    );
  const renderCache = /**@type {React.MutableRefObject<React.ReactPortal>}*/ (
    useRef()
  );
  /**
   * @type {useState<HTMLElement|undefined>}
   */
  const [thisEl, setThisEl] = useState();
  /**
   * @returns {HTMLElement=}
   */
  const getRoot = () => root.current;

  useEffect(() => {
    return () => {
      callfunc(execStop.current);
      callfunc(onUnmount);
    };
  }, []);

  /**
   * @param {HTMLElement=} el
   */
  const handleScript = (el) => {
    if (!el) {
      return;
    }
    const win = expose.getWindow();
    if (win) {
      const rootParentNode = /**@type HTMLElement*/ (getRoot()?.parentNode);
      execStop.current = exec(
        el,
        win,
        rootParentNode,
        (/**@type any*/ e, /**@type any*/ script) => {
          console.warn("script error", [e, script]);
        }
      );
    }
  };

  const expose = {
    appendHtml: (/**@type string*/ html) => {
      const div = doc().createElement("div");
      div.innerHTML = html;
      const myRoot = get(
        getRoot(),
        ["childNodes", 0, "childNodes", 0],
        getRoot
      );
      myRoot.appendChild(div);
      handleScript(div);
    },
    getWindow: () =>
      get(thisIframe.current.getEl(), ["contentWindow", "window"]),
    getDoc: () => get(expose.getWindow(), ["document"]),
    getBody: () => {
      return get(expose.getDoc(), ["body"]);
    },
    getRoot,
    scrollToEl: (/**@type HTMLElement*/ el) => {
      const pos = getOffset(el);
      if (pos?.rect) {
        smoothScrollTo(pos.rect.top);
      }
    },
    postHeight: () => thisIframe.current?.postHeight(expose.getWindow()),
  };

  const handleBodyClick = (/**@type {React.MouseEvent}*/ e) => {
    const query = queryFrom(() => expose.getBody());
    const evTarget = /**@type HTMLElement*/ (e.target);
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
      body.appendChild(getRoot());
      body.addEventListener("unload", onUnload);
      body.addEventListener("beforeunload", onBeforeUnload);
    }
  };

  const renderIframe = () => {
    if (!getRoot()) {
      init();
    }
    const thisRoot = /**@type HTMLElement*/ (getRoot());
    html.current = thisRoot?.innerHTML || "";
    const callback = () => {
      if (!_mount()) {
        return;
      }
      const myHtml = thisRoot?.innerHTML;
      if (myHtml !== html.current) {
        handleScript(thisRoot);
        handleLinkClick();
        onLoadTimer(() => {
          if (!_mount() || !expose.getWindow()) {
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
      <IframeInner
        children={children}
        inlineCSS={inlineCSS}
        onLoad={callback}
      />,
      thisRoot
    );
  };

  const handler = {
    refCb: (/**@type HTMLElement*/ myEl) => {
      if (myEl) {
        callfunc(refCb, [myEl]);
        setThisEl(myEl);
      }
    },
  };

  if (autoHeight) {
    others.scrolling = "no";
  }

  const renderCacheWrap = () => {
    if (immutable) {
      if (!renderCache.current) {
        renderCache.current = renderIframe();
      }
      return renderCache.current;
    } else {
      return renderIframe();
    }
  };

  return {
    expose,
    others,
    thisIframe,
    handler,
    thisEl,
    renderIframe: renderCacheWrap,
  };
};

/**
 * @type React.ForwardRefExoticComponent<?, any>
 */
const Iframe = forwardRef((props, ref) => {
  const { expose, others, thisIframe, handler, thisEl, renderIframe } =
    useIframe(props);

  useImperativeHandle(ref, () => expose, []);

  return (
    <IframeContainer
      component={<SemanticUI atom="iframe" />}
      {...others}
      ref={thisIframe}
      refCb={handler.refCb}
    >
      {thisEl && renderIframe()}
    </IframeContainer>
  );
});

Iframe.displayName = "ReshowIframe";

export default Iframe;
