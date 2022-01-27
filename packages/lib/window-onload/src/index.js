import callfunc from "call-func";
import { doc } from "win-doc";

const complete = "complete";
const interactive = "interactive";

const windowOnLoad = (options) => {
  const {
    doc: oDoc = doc(),
    timeout,
    interval = 10,
    domReady,
    domReadyDelay = 1500,
  } = options || {};
  let _timer;
  let _domReadyTimer;
  let _timeoutTimer;
  const close = () => {
    _timer && clearInterval(_timer);
    _domReadyTimer && clearTimeout(_domReadyTimer);
    _timeoutTimer && clearTimeout(_timeoutTimer);
    return true;
  };
  const process = (run) => {
    close();
    let isRun = false;
    const doit = (state) => {
      close();
      if (!isRun) {
        isRun = true;
        callfunc(run, [state]);
      }
    };
    const readyState = oDoc.readyState;
    if (complete === readyState) {
      doit(complete);
    } else {
      _timer = setInterval(() => {
        const intervalReadyState = oDoc.readyState;
        if (complete === intervalReadyState || null == intervalReadyState) {
          doit(complete);
        } else if (
          domReady &&
          interactive === intervalReadyState &&
          !_domReadyTimer
        ) {
          _domReadyTimer = setTimeout(doit, domReadyDelay, interactive);
        }
      }, interval);
      if (!isNaN(timeout)) {
        _timeoutTimer = setTimeout(doit, timeout, timeout);
      }
    }
  };
  return [process, close];
};

export default windowOnLoad;
