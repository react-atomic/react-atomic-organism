import { useEffect, useState } from "react";
import { js } from "create-el";
import { win, hasWin } from "win-doc";
import { useMounted } from "reshow-hooks";
import callfunc from "call-func";
import * as d3Lib from "./d3lib";
import { handleGetD3 } from "./handleGetD3";

const d3js = "https://cdn.jsdelivr.net/npm/d3@6.7.0/dist/d3.min.js";
const askQueue = [];
let d3;

const useD3 = (onD3Load) => {
  const [isLoad, setIsLoad] = useState(!!d3);
  const _mounted = useMounted();
  useEffect(() => {
    if (isLoad) {
      callfunc(onD3Load);
    }
  }, [isLoad]);
  useEffect(() => {
    const done = () => {
      d3 = d3Lib;
      handleGetD3(win().d3);
      let i = askQueue.length;
      /**
       * It should only run setIsLoad here,
       * to avoid duplicate execution.
       */
      while (i--) {
        askQueue[i] && askQueue[i]();
      }
      askQueue.splice(0, askQueue.length);
    };

    if (hasWin() && !isLoad) {
      askQueue.push(() => {
        if (_mounted()) {
          setIsLoad(true);
        }
      });
      if (win().d3) {
        done();
      } else {
        if (false !== win().d3) {
          win().d3 = false;
          js()(done)(d3js);
        }
      }
    }
  }, []);
  return [isLoad, d3];
};

export default useD3;
