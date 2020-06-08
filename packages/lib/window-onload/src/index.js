import callfunc from "call-func";
import { doc } from "win-doc";

const windowOnLoad = options => {
  const { timeout, interval = 10 } = options || {};
  let _timer;
  const close = () => _timer && clearInterval(_timer);
  const process = run => {
    if (doc().readyState === "complete") {
      callfunc(run);
    } else {
      const doit = () => {
        close();
        callfunc(run);
      };
      _timer = setInterval(() => {
        const readyState = doc().readyState;
        if ("complete" === readyState || null == readyState) {
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
