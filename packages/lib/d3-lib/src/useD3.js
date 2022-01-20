import { useEffect, useState } from "react";
import { js } from "create-el";
import { win } from "win-doc";
import { KEYS } from "reshow-constant";
import * as d3Lib from "./d3lib";

const d3js = "https://cdn.jsdelivr.net/npm/d3@6.5.0/dist/d3.min.js";
let d3;

const useD3 = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const done = () => {
      const { handleGetD3, ...libs } = d3Lib;
      handleGetD3(win().d3);
      d3 = libs;
      setIsLoad(true);
    };

    if (!win().__null && !d3) {
      if (win().d3) {
        done();
      } else {
        js()(done)(d3js);
      }
    } else {
      setIsLoad(true);
    }
  }, []);
  return [isLoad, d3];
};

export default useD3;
