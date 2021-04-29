import React, { forwardRef, useRef, useCallback } from "react";
import formSerialize from "form-serialize-js";
import build from "reshow-build";
import callfunc from "call-func";

import ajaxStore from "../../src/stores/ajaxStore";
import { ajaxDispatch } from "../../src/ajaxDispatcher";
import isRunAjax from "../../src/isRunAjax";

const AjaxForm = forwardRef((props, ref) => {
  const {
    action,
    afterSubmit,
    beforeSubmit,
    callback,
    component,
    errorCallback,
    path,
    stop,
    updateUrl,
    ...rest
  } = props;

  const handleSubmit = useCallback(
    (e) => {
      const {
        stop,
        callback,
        errorCallback,
        updateUrl,
        beforeSubmit,
        afterSubmit,
      } = props;
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
    [props]
  );
  const thisUrl = ajaxStore.getRawUrl({
    url: action,
    path: path,
  });
  return build(component)({
    action: thisUrl,
    onSubmit: handleSubmit,
    ...rest,
  });
});

AjaxForm.defaultProps = {
  updateUrl: false,
  stop: false,
  component: "form",
};

AjaxForm.displayName = "AjaxForm";

export default AjaxForm;
