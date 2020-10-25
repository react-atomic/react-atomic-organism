require("setimmediate");
import React, { Component, forwardRef } from "react";
import { ajaxStore } from "organism-react-ajax";
import Return from "reshow-return";
import { popupDispatch } from "organism-react-popup";
import { Progress, SemanticUI } from "react-atomic-molecule";

class Body extends Component {
  _timer = null;
  _timerComplete = null;
  _timerReset1 = null;
  _timerReset2 = null;
  _bar = null;

  static defaultProps = {
    name: "processBar",
    delay: 200,
    isFloat: true,
    ajax: false,
    pause: 90,
    zIndex: 1,
  };

  state = {
    percent: 0,
    opacity: 1,
  };

  complete = () => {
    this.pause();
    this.setState({
      percent: 100,
    });
    this._timerComplete = setTimeout(() => {
      this.reset();
    }, 500);
  };

  reset = () => {
    this.setState({
      opacity: 0,
    });
    this._timerReset1 = setTimeout(() => {
      this.setState({
        percent: 0,
      });
    }, 500);
  };

  pause = () => {
    clearInterval(this._timer);
    clearTimeout(this._timerComplete);
    clearTimeout(this._timerReset1);
  };

  start = (pause, delay) => {
    clearInterval(this._timer);
    if (!delay) {
      delay = this.props.delay;
    }
    this._start(pause);
    this._timer = setInterval(() => {
      this._start(pause);
    }, delay);
  };

  _start = (pause) => {
    if (!pause || pause > 100) {
      pause = 100;
    }
    let end = this.state.percent + 5;
    if (end >= pause) {
      end = pause;
      this.pause();
    }
    if (end >= 100) {
      return this.complete();
    } else {
      this.setState({
        percent: end,
        opacity: 1,
      });
    }
  };

  setFloat() {
    setImmediate(() => {
      const { isFloat } = this.props;
      if (!isFloat) {
        return;
      }
      popupDispatch({
        type: "dom/update",
        params: {
          popup: this._bar,
        },
      });
    });
  }

  componentDidMount() {
    this.setFloat();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isRunning, ajax, pause } = this.props;
    this.setFloat();
    if (ajax && prevProps.isRunning !== isRunning) {
      setImmediate(() => {
        if (isRunning) {
          this.start(pause);
        } else {
          this.complete();
        }
      });
    }
  }

  componentWillUnmount() {
    this.pause();
    popupDispatch({
      type: "dom/cleanOne",
      params: {
        popup: this.props.name,
      },
    });
  }

  render() {
    const { percent, opacity } = this.state;
    const { name, zIndex, isFloat } = this.props;
    this._bar = (
      <Progress
        style={{
          ...Styles.progress,
          opacity: opacity,
          zIndex: zIndex,
        }}
        barProps={{
          style: Styles.bar,
        }}
        percent={percent}
        name={name}
      />
    );
    if (isFloat) {
      return null;
    } else {
      return this._bar;
    }
  }
}

const PageLoadProgressHandler = forwardRef((props, ref) => {
  return (
    <Return stores={[ajaxStore]} initStates={["isRunning"]}>
      <Body {...props} ref={ref} />
    </Return>
  );
});

export default PageLoadProgressHandler;

const Styles = {
  progress: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    transition: ["opacity 500ms linear"],
  },
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: 2,
    display: "inline-block",
    background: "#77b6ff",
    transition: ["width 500ms ease"],
    boxShadow: ["0 0 10px rgba(119,182,255,0.7)"],
  },
};
