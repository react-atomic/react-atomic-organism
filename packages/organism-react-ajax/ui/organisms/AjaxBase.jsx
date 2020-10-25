import React, { PureComponent } from "react";
import ajaxStore from "../../src/stores/ajaxStore";

class AjaxBase extends PureComponent {
  isRunAjax() {
    if (this.props.ajax) {
      return this.props.ajax;
    }
    const state = ajaxStore.getState();
    return state.get("ajax");
  }
}

export default AjaxBase;
