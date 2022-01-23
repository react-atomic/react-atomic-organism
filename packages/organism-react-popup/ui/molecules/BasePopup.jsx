import React, { PureComponent } from "react";
import needCSS from "need-css";
import { popupDispatch } from "../../src/stores/popupStore";

class BasePopup extends PureComponent {
  state = { hasError: false };
  static defaultProps = {
    name: "default",
  };

  constructor(props) {
    super(props);
    needCSS(["popup", "modal"], "semantic");
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

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
  }
}

export default BasePopup;
