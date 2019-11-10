import React, {PureComponent} from 'react';

class BasePopup extends PureComponent {
  static defaultProps = {
    name: 'default',
  };
  static getDerivedStateFromError(error) {
    return {show: false};
  }
  componentDidCatch(error, info) {
    const {onError} = this.props;
    if (onError) {
      callfunc(onError, [error, info]);
    } else {
      console.error([error, info]);
    }
    this.setState({show: false});
  }
}

export default BasePopup;
