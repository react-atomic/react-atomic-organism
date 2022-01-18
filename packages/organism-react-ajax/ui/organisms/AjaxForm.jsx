import React, { forwardRef, useRef, useCallback } from "react";
import formSerialize from "form-serialize-js";
import build from "reshow-build";
import callfunc from "call-func";

import ajaxStore, { ajaxDispatch, getRawUrl } from "../../src/stores/ajaxStore";
import isRunAjax from "../../src/isRunAjax";

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

      let formDom = e.target;
      let action = formDom.action;
      const formParams = formSerialize(formDom);
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
        url: action,
        query: formParams,
        callback,
        errorCallback,
        ...otherParams,
      });

      callfunc(afterSubmit, [e]);
    },
    [stop, callback, errorCallback, updateUrl, beforeSubmit, afterSubmit]
  );

  return build(component)({
    ref,
    action: getRawUrl({ url: action, path }),
    onSubmit: handleSubmit,
    ...rest,
  });
});

AjaxForm.displayName = "AjaxForm";

export default AjaxForm;
