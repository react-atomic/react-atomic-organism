import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import callfunc from "call-func";
import build from "reshow-build";

import ajaxStore, { ajaxDispatch, getRawUrl } from "../../src/stores/ajaxStore";
import isRunAjax from "../../src/isRunAjax";

const getHref = ({ href, path }) => {
  if (href) {
    return href;
  }
  if (path) {
    const baseUrl = ajaxStore.getState().get("baseUrl");
    return baseUrl ? getRawUrl({ path, baseUrl }) : "#";
  } else {
    return null;
  }
};

const useAjaxLink = (props) => {
  const {
    updateUrl = true,
    disableRandom = false,
    component = "a",
    href: propsHref,
    ajax,
    target,
    callback,
    errorCallback,
    path,
    onClick,
    onTouchStart,
    ...rest
  } = props;

  const isAlreadyTouchStart = useRef(false);
  const [href, setHref] = useState(propsHref);
  useEffect(() => {
    setHref(getHref({ href: propsHref, path }));
  }, [propsHref, path]);

  const go = useCallback(
    (url) => {
      url = url || getRawUrl({ path, url: href });
      ajaxDispatch("ajaxGet", {
        disableAjax: !isRunAjax({ ajax }),
        url,
        updateUrl,
        disableRandom,
        callback,
        errorCallback,
      });
    },
    [href, callback, errorCallback, updateUrl, disableRandom, ajax]
  );

  const handleClick = useCallback(
    (callback) => (type) => (e) => {
      let thisHref = href;
      if (!thisHref || "#" === thisHref || "?" === thisHref) {
        /**
         * should pass empty url to getRawUrl for this case
         * getRawUrl will tyr get url with baseUrl
         */
        const toBaseUrl = getRawUrl({ path });
        if (toBaseUrl) {
          thisHref = toBaseUrl;
          e.currentTarget.href = thisHref;
        }
      }
      if ("_blank" !== target) {
        e.preventDefault();
      }
      if ("touchStart" === type) {
        isAlreadyTouchStart.current = true;
      } else {
        if (isAlreadyTouchStart.current) {
          isAlreadyTouchStart.current = false;
          return;
        }
      }
      const isContinue = callfunc(callback, [e]);
      if ("_blank" !== target && false !== isContinue) {
        /**
         *  Must use e.currentTarget.href here
         *  becaue it maybe change with callback
         */
        go(e.currentTarget.href);
      }
    },
    [target, href]
  );

  const expose = { go };

  return {
    expose,
    component,
    rest,
    target,
    href,
    path,
    onTouchStart:
      true === onTouchStart
        ? handleClick(onTouchStart)("touchStart")
        : onTouchStart,
    onClick: handleClick(onClick)("click"),
  };
};

const AjaxLink = forwardRef((props, ref) => {
  const { expose, component, rest, target, href, path, onTouchStart, onClick } =
    useAjaxLink(props);

  useImperativeHandle(ref, () => expose, []);

  return build(component)({
    ...rest,
    ref,
    target,
    href,
    "data-path": path,
    onTouchStart,
    onClick,
  });
});

AjaxLink.displayName = "AjaxLink";

export default AjaxLink;
