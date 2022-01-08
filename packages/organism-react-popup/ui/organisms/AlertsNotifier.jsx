import React, { PureComponent, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Set } from "reshow-flux";
import { useTimer } from "reshow-hooks";
import Animate from "organism-react-animate";
import XIcon from "ricon/X";
import { Message } from "react-atomic-molecule";
import callfunc from "call-func";

const messageTypes = ["success", "info", "warning", "error"];

const useAlert = (props) => {
  const { onClick, data, header, message, messageType } = props;
  const duration = props.duration * 1;
  const [hoverStyle, setHoverStyle] = useState();
  const [run] = useTimer();
  useEffect(() => {
    if (duration > 0) {
      run(() => onClick({ data }), duration);
    }
  }, []);
  const handler = {
    mouseEnter: () => {
      setHoverStyle({
        opacity: ".9",
      });
    },
    mouseLeave: () => {
      setHoverStyle(null);
    },
    click: (e) => {
      e.data = data;
      onClick(e);
    },
  };
  return {
    handler,
    hoverStyle,
    header,
    message,
    messageType,
  };
};

const Alert = (props) => {
  const { handler, hoverStyle, header, message, messageType } = useAlert(props);
  return (
    <Message messageType={messageType} header={header} style={Styles.message}>
      {message}
      <XIcon
        style={{
          ...Styles.xicon,
          ...hoverStyle,
        }}
        weight=".1rem"
        onMouseEnter={handler.mouseEnter}
        onMouseLeave={handler.mouseLeave}
        onClick={handler.click}
      />
    </Message>
  );
};

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
      appear: "fadeIn",
      enter: "fadeIn",
      leave: "fadeOut",
    },
    position: "top",
    name: "alerts",
    duration: 5000,
  };

  handleDismiss = (e) => {
    const { onDismiss } = this.props;
    const isContinue = callfunc(onDismiss, [e]);
    if (false !== isContinue) {
      // if no callback for dismissal, just update our state
      this.setState(({ dismissedAlerts }) => ({
        dismissedAlerts: dismissedAlerts.add(e.data),
      }));
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { alerts } = nextProps;
    if (alerts !== prevState.prevPropsAlerts) {
      return {
        prevPropsAlerts: alerts,
        dismissedAlerts: Set(),
      };
    } else {
      return null;
    }
  }

  render() {
    const { ani, alerts, position, duration } = this.props;
    const { dismissedAlerts } = this.state;
    const alertArr = [];
    if (alerts && alerts.length) {
      alerts.forEach((item, key) => {
        const thisItem = "string" === typeof item ? { message: item } : item;
        if (!dismissedAlerts.has(thisItem)) {
          if (-1 === messageTypes.indexOf(thisItem.type)) {
            thisItem.type = "info";
          }
          const oAlert = (
            <Alert
              key={thisItem.id ? thisItem.id : key}
              duration={duration}
              messageType={thisItem.type}
              message={thisItem.message}
              header={thisItem.header}
              data={thisItem}
              onClick={this.handleDismiss}
            />
          );
          alertArr.push(oAlert);
        }
      });
    }
    const positionStyle = {};
    if ("top" === position) {
      positionStyle.top = 5;
    } else {
      positionStyle.bottom = 5;
    }
    return (
      <Animate {...ani} style={{ ...Styles.container, ...positionStyle }}>
        {alertArr}
      </Animate>
    );
  }
}

export default AlertsNotifier;

const Styles = {
  container: {
    position: "fixed",
    left: 10,
    right: 10,
    zIndex: 9999,
  },
  xicon: {
    top: 20,
    right: 10,
    opacity: ".5",
  },
  message: {
    margin: "3px 0",
  },
};
