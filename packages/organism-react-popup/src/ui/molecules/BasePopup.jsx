// @ts-check

import { PureComponent } from "react";
import needCSS from "need-css";
import { popupDispatch } from "../../stores/popupStore";
import callfunc from "call-func";

class BasePopup extends PureComponent {
  state = { hasError: false };
  static defaultProps = {
    name: "default",
  };

  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);
    needCSS(["popup", "modal"], "semantic");
  }

  /**
   * @param {any} _error
   */
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  /**
   * @param {any} error
   * @param {any} info
   */
  componentDidCatch(error, info) {
    const { onError } = this.props;
    if (onError) {
      callfunc(onError, [error, info]);
    } else {
      console.error([error, info]);
    }
    this.setState({ hasError: true });
  }

  close() {
    popupDispatch({
      type: "dom/closeOne",
      params: {
        popup: this,
      },
    });
    return true;
  }
}

export default BasePopup;
