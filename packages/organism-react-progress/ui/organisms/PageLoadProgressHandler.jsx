import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useImperativeHandle,
} from "react";
import { Progress } from "react-atomic-molecule";
import Return from "reshow-return";
import { ajaxStore } from "organism-react-ajax";
import { DisplayPopupEl } from "organism-react-popup";

const PageLoadProgress = forwardRef((props, ref) => {
  const { name, zIndex, isFloat, isRunning, ajax } = props;
  const [percent, setPercent] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const lastPercent = useRef(0);
  const _timer = useRef();
  const _timerComplete = useRef();
  const _timerReset = useRef();

  const _start = (goToPercent) => {
    if (!goToPercent || goToPercent > 100) {
      goToPercent = 100;
    }
    let end = lastPercent.current + 5;
    if (end >= goToPercent) {
      end = goToPercent;
      expose.pause();
    }

    if (end >= 100) {
      return expose.complete();
    } else {
      setPercent(end);
      setTimeout(() => setOpacity(1));
    }
  };

  const expose = {
    complete: () => {
      expose.pause();
      setPercent(100);
      _timerComplete.current = setTimeout(() => {
        expose.reset();
      }, 500);
    },
    reset: () => {
      setOpacity(0);
      _timerReset.current = setTimeout(() => {
        setPercent(0);
      });
    },
    pause: () => {
      if (_timer.current) {
        clearInterval(_timer.current);
      }
      if (_timerComplete.current) {
        clearTimeout(_timerComplete.current);
      }
      if (_timerReset.current) {
        clearTimeout(_timerReset.current);
      }
    },
    start: useCallback(
      (goToPercent, delay) => {
        if (_timer.current) {
          clearInterval(_timer.current);
        }
        if (null == delay) {
          delay = props.delay;
        }
        _timer.current = setInterval(() => {
          _start(goToPercent);
        }, delay);
      },
      [props.delay]
    ),
  };

  useImperativeHandle(ref, () => expose);
  useEffect(() => {
    lastPercent.current = percent;
  }, [percent]);
  useEffect(() => {
    if (ajax && null != isRunning) {
      if (isRunning) {
        expose.start(90);
      } else {
        expose.complete();
      }
    }
  }, [isRunning, props.pause]);
  useEffect(() => {
    return () => {
      expose.pause();
    };
  }, []);

  return useMemo(() => {
    const bar = (
      <Progress
        style={{
          ...Styles.progress,
          opacity,
          zIndex,
        }}
        barProps={{
          style: Styles.bar,
        }}
        percent={percent}
        name={name}
      />
    );
    if (isFloat) {
      return <DisplayPopupEl>{bar}</DisplayPopupEl>;
    } else {
      return bar;
    }
  }, [opacity, percent]);
});

PageLoadProgress.defaultProps = {
  name: "processBar",
  delay: 200,
  isFloat: true,
  ajax: false,
  zIndex: 1,
};

PageLoadProgress.displayName = "PageLoadProgress";

const PageLoadProgressHandler = forwardRef((props, ref) => (
  <Return stores={[ajaxStore]} initStates={["isRunning"]}>
    <PageLoadProgress {...props} ref={ref} />
  </Return>
));
PageLoadProgressHandler.displayName = "PageLoadProgressHandler";

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
