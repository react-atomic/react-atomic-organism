import { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { getSN } from "get-random-id";
import { useTimer } from "reshow-hooks";
import Animate from "organism-react-animate";
import XIcon from "ricon/X";
import { build, Message } from "react-atomic-molecule";
import callfunc from "call-func";
import get from "get-object-value";

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

const defaultName = "alerts";
const AlertsNotifier = (props) => {
  const {
    ani = {
      appear: "fadeIn",
      enter: "fadeIn",
      leave: "fadeOut",
    },
    position = "top",
    name = defaultName,
    duration = 5000,
    alerts,
    onDismiss,
  } = props || {};
  const [dismissedAlerts, setDismissedAlerts] = useState({});
  const [alertArr, setAlertArr] = useState([]);
  useEffect(() => {
    const nextAlertArr = [];
    (alerts || []).forEach((item, key) => {
      const thisItem = "string" === typeof item ? { message: item } : item;
      if (-1 === messageTypes.indexOf(thisItem.type)) {
        thisItem.type = "info";
      }
      if (!thisItem.id) {
        thisItem.id = getSN("alert");
      }
      nextAlertArr.push(thisItem);
    });
    setAlertArr(nextAlertArr);
  }, [props]);
  const handleDismiss = (e) => {
    const isContinue = callfunc(onDismiss, [e]);
    if (false !== isContinue) {
      // if no callback for dismissal, just update our state
      setDismissedAlerts((dismissedAlerts) => {
        dismissedAlerts[e.data.id] = e.data;
        return { ...dismissedAlerts };
      });
    }
  };
  return useMemo(() => {
    const positionStyle = {};
    if ("top" === position) {
      positionStyle.top = 5;
    } else {
      positionStyle.bottom = 5;
    }
    const displayAlert = alertArr
      .filter((item) => !get(dismissedAlerts, [item.id]))
      .map((item) => {
        return (
          <Alert
            key={item.id}
            duration={duration}
            messageType={item.type}
            message={item.message}
            header={item.header}
            data={item}
            onClick={handleDismiss}
          />
        );
      });
    return build(Animate)(
      {
        ...ani,
        key: name,
        name,
        style: { ...Styles.container, ...positionStyle },
      },
      displayAlert
    );
  }, [alertArr, dismissedAlerts]);
};
AlertsNotifier.displayName = defaultName;
AlertsNotifier.propTypes = {
  alerts: PropTypes.array,
  onDismiss: PropTypes.func,
};

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
