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
    domReadyDelay = 500,
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
    let isRun = false;
    const doit = () => {
      close();
      if (!isRun) {
        isRun = true;
        callfunc(run);
      }
    };
    const readyState = oDoc.readyState;
    close();
    if (complete === readyState) {
      doit();
    } else if (domReady && interactive === readyState) {
      _domReadyTimer = setTimeout(doit, domReadyDelay);
    } else {
      _timer = setInterval(() => {
        const intervalReadyState = oDoc.readyState;
        if (complete === intervalReadyState || null == intervalReadyState) {
          doit();
        } else if (domReady && interactive === intervalReadyState && !_domReadyTimer) {
          _domReadyTimer = setTimeout(doit, domReadyDelay);
        }
      }, interval);
      if (!isNaN(timeout)) {
        _timeoutTimer = setTimeout(doit, timeout);
      }
    }
  };
  return { close, process };
};

export default windowOnLoad;
