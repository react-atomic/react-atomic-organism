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

const AjaxLink = forwardRef((props, ref) => {
  const {
    ajax,
    target,
    component,
    callback,
    errorCallback,
    path,
    href,
    updateUrl,
    disableRandom,
    onClick,
    ...rest
  } = props;

  const isAlreadyTouchStart = useRef(false);

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
  const go = useCallback(
    (url) => {
      const { href, callback, errorCallback, updateUrl, disableRandom } = props;
      url = url || href;
      ajaxDispatch("ajaxGet", {
        disableAjax: !isRunAjax(props),
        url,
        updateUrl,
        disableRandom,
        callback,
        errorCallback,
      });
    },
    [props]
  );

  useImperativeHandle(ref, () => ({ go }));

  const thisHref = ajaxStore.getRawUrl({
    path,
    url: href,
  });
  let onTouchStart = props.onTouchStart;
  if (true === onTouchStart) {
    onTouchStart = handleClick(onTouchStart)("touchStart");
  }
  return build(component)({
    ...rest,
    ref,
    href: thisHref,
    onTouchStart,
    onClick: handleClick(onClick)("click"),
  });
});

AjaxLink.defaultProps = {
  updateUrl: true,
  disableRandom: false,
  component: "a",
};

AjaxLink.displayName = "AjaxLink";

export default AjaxLink;
