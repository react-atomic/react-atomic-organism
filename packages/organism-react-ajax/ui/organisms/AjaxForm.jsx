import React, { forwardRef, useRef, useCallback } from "react";
import formSerialize from "form-serialize-js";
import build from "reshow-build";
import callfunc from "call-func";

import ajaxStore, { ajaxDispatch, getRawUrl } from "../../src/stores/ajaxStore";
import isRunAjax from "../../src/isRunAjax";

const getFormAction = ({ action, path }) => {
  if (action) {
    return action;
  }
  if (path) {
    const baseUrl = ajaxStore.getState().get("baseUrl");
    if (baseUrl) {
      return getRawUrl({ path, baseUrl });
    }
  }
  return null;
};

const AjaxForm = forwardRef((props, ref) => {
  const {
    stop = false,
    updateUrl = false,
    component = "form",
    action,
    afterSubmit,
    beforeSubmit,
    callback,
    errorCallback,
    path,
    ...rest
  } = props;

  const handleSubmit = useCallback(
    (e) => {
      if (stop) {
        return;
      }
      e.preventDefault();
      const otherParams = callfunc(beforeSubmit, [e]) ?? {};

      if (false === otherParams) {
        // pause by beforeSubmit
        return false;
      }

      const formDom = e.target;
      const formAction = formDom.action || getFormAction({ action, path });
      const formParams = formSerialize(formDom);
      if (formAction) {
        formDom.action = formAction;
      }
      let type;
      switch (formDom.method.toLowerCase()) {
        case "post":
          type = "ajaxPost";
          break;
        /**
         * Default method
         * https://www.w3schools.com/tags/att_form_method.asp
         */
        default:
        case "get":
          type = "ajaxGet";
          otherParams.disableAjax = !isRunAjax(props);
          otherParams.updateUrl = updateUrl;
          break;
      }

      ajaxDispatch(type, {
        url: formAction,
        query: formParams,
        callback,
        errorCallback,
        ...otherParams,
      });

      callfunc(afterSubmit, [e]);
    },
    [
      path,
      action,
      stop,
      callback,
      errorCallback,
      updateUrl,
      beforeSubmit,
      afterSubmit,
    ]
  );

  return build(component)({
    ref,
    action: getFormAction({ action, path }),
    "data-path": path,
    onSubmit: handleSubmit,
    ...rest,
  });
});

AjaxForm.displayName = "AjaxForm";

export default AjaxForm;
