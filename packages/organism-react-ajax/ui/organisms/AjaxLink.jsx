import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import callfunc from "call-func";
import build from "reshow-build";

import ajaxStore, { ajaxDispatch, getRawUrl } from "../../src/stores/ajaxStore";
import isRunAjax from "../../src/isRunAjax";

const useAjaxLink = (props) => {
  const {
    updateUrl = true,
    disableRandom = false,
    component = "a",
    ajax,
    target,
    callback,
    errorCallback,
    path,
    href,
    onClick,
    onTouchStart,
    ...rest
  } = props;

  const isAlreadyTouchStart = useRef(false);

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
    [href, path, callback, errorCallback, updateUrl, disableRandom, ajax]
  );

  const handleClick = useCallback(
    (callback) => (type) => (e) => {
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
      callfunc(callback, [e]);
      if ("_blank" !== target) {
        const thisHref = e.currentTarget.href || getRawUrl({ path, url: href });
        go(thisHref);
      }
    },
    [target, path, href]
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
