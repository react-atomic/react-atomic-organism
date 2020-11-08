import React, { PureComponent } from "react";
import { popupDispatch } from "../../src/popupDispatcher";

class BasePopup extends PureComponent {
  state = { hasError: false };
  static defaultProps = {
    name: "default",
  };
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
