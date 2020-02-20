import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {Set} from 'immutable';
import Animate from 'organism-react-animate';
import XIcon from 'ricon/X';
import {Message, reactStyle} from 'react-atomic-molecule';
import callfunc from 'call-func';

const messageTypes = ['success', 'info', 'warning', 'error'];

class Alert extends Component {
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

  handleClick = () => {
    const {onClick} = this.props;
    onClick();
  };

  componentDidMount() {
    const {duration, onClick} = this.props;
    if (duration * 1 > 0) {
      setTimeout(() => onClick(), duration);
    }
  }

  render() {
    const {messageType, header, message, onClick} = this.props;
    const {hoverStyle} = this.state;
    return (
      <Message messageType={messageType} header={header}>
        {message}
        <XIcon
          style={{
            ...Styles.xicon,
            ...hoverStyle,
          }}
          weight=".1rem"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        />
      </Message>
    );
  }
}

class AlertsNotifier extends PureComponent {
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
    name: 'alerts',
    duration: 3000,
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
    const isContinue = callfunc(onDismiss, [item]);
    if (false !== isContinue) {
      // if no callback for dismissal, just update our state
      this.setState(({dismissedAlerts}) => ({
        dismissedAlerts: dismissedAlerts.add(item),
      }));
    }
  }

  render() {
    const {ani, alerts, position, duration} = this.props;
    const {dismissedAlerts} = this.state;
    const alertArr = [];
    if (alerts && alerts.length) {
      alerts.forEach((item, key) => {
        const thisItem = 'string' === typeof item ? {message: item} : item;
        if (!dismissedAlerts.has(item)) {
          if (-1 === messageTypes.indexOf(thisItem.type)) {
            thisItem.type = 'info';
          }
          const oAlert = (
            <Alert
              key={key}
              duration={duration}
              messageType={thisItem.type}
              message={thisItem.message}
              header={thisItem.header}
              onClick={this.dismiss.bind(this, item)}
            />
          );
          alertArr.push(oAlert);
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
