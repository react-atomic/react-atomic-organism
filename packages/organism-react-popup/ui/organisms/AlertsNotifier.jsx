import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Set} from 'immutable';
import Animate from 'organism-react-animate';
import XIcon from 'ricon/X';
import {Message, reactStyle} from 'react-atomic-molecule';
import BasePopup from '../molecules/BasePopup'

const messageTypes = ['success', 'info', 'warning', 'error'];

class XIconEl extends PureComponent {
  state = {
    hoverStyle: null,
  };

  handleMouseEnter = () => {
    this.setState({
      hoverStyle: {
        opacity: '.9',
      },
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hoverStyle: null,
    });
  };

  render() {
    const props = this.props;
    const {hoverStyle} = this.state;
    return (
      <XIcon
        style={{
          ...Styles.xicon,
          ...hoverStyle,
        }}
        weight=".1rem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...props}
      />
    );
  }
}

class AlertsNotifier extends BasePopup {
  state = {
    dismissedAlerts: Set(),
  };

  static propTypes = {
    alerts: PropTypes.array,
    onDismiss: PropTypes.func,
  };

  static defaultProps = {
    ani: {
      appear: 'fadeIn',
      enter: 'fadeIn',
      leave: 'fadeOut',
    },
    position: 'top',
    name: 'alerts'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {alerts} = nextProps;
    if (alerts !== prevState.prevPropsAlerts) {
      return {
        prevPropsAlerts: alerts,
        dismissedAlerts: Set(),
      };
    } else {
      return null;
    }
  }

  dismiss(item) {
    const {onDismiss} = this.props;
    if ('function' === typeof onDismiss) {
      onDismiss(item);
    }
    //if no callback for dismissal, just update our state
    this.setState(({dismissedAlerts}) => {
      return {
        dismissedAlerts: dismissedAlerts.add(item),
      };
    });
  }

  render() {
    const {ani, alerts, position} = this.props;
    const {dismissedAlerts} = this.state;
    const alertArr = [];
    if (alerts && alerts.length) {
      alerts.forEach((item, key) => {
        const thisItem = 'string' === typeof item ? {message: item} : item;
        if (!dismissedAlerts.has(item)) {
          if (-1 === messageTypes.indexOf(thisItem.type)) {
            thisItem.type = 'info';
          }
          alertArr.push(
            <Message
              key={key}
              messageType={thisItem.type}
              header={thisItem.header}>
              {thisItem.message}
              <XIconEl onClick={this.dismiss.bind(this, item)} />
            </Message>,
          );
        }
      });
    }
    const positionStyle = {};
    if ('top' === position) {
      positionStyle.top = 5;
    } else {
      positionStyle.bottom = 5;
    }
    return (
      <Animate {...ani} style={{...Styles.container, ...positionStyle}}>
        {alertArr}
      </Animate>
    );
  }
}

export default AlertsNotifier;

const Styles = {
  container: {
    position: 'fixed',
    left: 10,
    right: 10,
    zIndex: 9999,
  },
  xicon: {
    top: 20,
    right: 10,
    opacity: '.5',
  },
};
