import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const useProgress = (props, propsPercent) => {
  const [percent, setPercent] = useState(() => null != propsPercent ?  propsPercent : 0);
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

  useEffect(() => {
    lastPercent.current = percent;
  }, [percent]);

  useEffect(() => {
    if (null != propsPercent) {
      setPercent(propsPercent);
    }
  }, [propsPercent]);

  useEffect(() => {
    return () => {
      expose.pause();
    };
  }, []);

  const expose = {
    complete: () => {
      expose.pause();
      setPercent(100);
      _timerComplete.current = setTimeout(() => {
        expose.reset();
      }, 500);
    },
    reset: (thisPercent) => {
      thisPercent = thisPercent || 0;
      setOpacity(thisPercent);
      _timerReset.current = setTimeout(() => {
        setPercent(thisPercent);
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

  return {expose, opacity, percent};

};

export default useProgress;
