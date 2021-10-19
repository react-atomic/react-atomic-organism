import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import callfunc from "call-func";
import build from "reshow-build";

import ajaxStore from "../../src/stores/ajaxStore";
import { ajaxDispatch } from "../../src/ajaxDispatcher";
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
      url = url || href;
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
        const thisHref = e.currentTarget.href;
        go(thisHref);
      }
    },
    [target]
  );

  const expose = { go };

  return {
    expose,
    component,
    rest,
    target,
    href: ajaxStore.getRawUrl({ path, url: href }),
    onTouchStart:
      true === onTouchStart
        ? handleClick(onTouchStart)("touchStart")
        : onTouchStart,
    onClick: handleClick(onClick)("click"),
  };
};

const AjaxLink = forwardRef((props, ref) => {
  const { expose, component, rest, target, href, onTouchStart, onClick } =
    useAjaxLink(props);

  useImperativeHandle(ref, () => expose, []);

  return build(component)({
    ...rest,
    ref,
    target,
    href,
    onTouchStart,
    onClick,
  });
});

AjaxLink.displayName = "AjaxLink";

export default AjaxLink;
