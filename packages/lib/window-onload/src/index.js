import callfunc from "call-func";
import { doc } from "win-doc";

const complete = "complete";

const windowOnLoad = (options) => {
  const { doc: oDoc = doc(), timeout, interval = 10 } = options || {};
  let _timer;
  const close = () => _timer && clearInterval(_timer);
  const process = (run) => {
    close();
    if (complete === oDoc.readyState) {
      callfunc(run);
    } else {
      const doit = () => {
        close();
        callfunc(run);
      };
      _timer = setInterval(() => {
        const readyState = oDoc.readyState;
        if (complete === readyState || null == readyState) {
          doit();
        }
      }, interval);
      if (!isNaN(timeout)) {
        setTimeout(() => doit(), timeout);
      }
    }
  };
  return { close, process };
};

export default windowOnLoad;
