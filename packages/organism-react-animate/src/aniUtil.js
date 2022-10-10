//@ts-check

import { reactStyle, injectStyle } from "react-atomic-molecule";
import { NEW_OBJ } from "reshow-constant";
import getKeyframe from "keyframe-css";
import { initMap } from "get-object-value";

const inject = NEW_OBJ();
const injectDone = NEW_OBJ();
const injectCb = NEW_OBJ();

/**
 * @param {string} aniName
 */
const cleanTask = (aniName) => {
  let i = injectCb[aniName].length;
  const tempArr = injectCb[aniName].splice(0, i);
  while (i--) {
    tempArr[i](injectDone[aniName]);
  }
  injectStyle();
};

/**
 * @param {string} key
 * @param {string} aniName
 * @param {number} timeout
 * @param {function} callback
 */
const initAni = (key, aniName, timeout, callback) => {
  injectDone[aniName]
    ? callback()
    : initMap(injectCb)(aniName, []).push(callback);
  if (inject[key]) {
    return;
  }
  /**
   * @param {boolean} inject
   */
  const buildAniStyle = (inject) => {
    reactStyle(
      {
        animationName: [aniName],
        animationDuration: [timeout + 1 + "ms"],
        animationIterationCount: [1],
        animationTimingFunction: [`steps(${Math.floor(timeout / 30)}, end)`],
      },
      "." + key,
      key
    );
    if (inject) {
      injectStyle();
    }
  };
  injectDone[aniName]
    ? buildAniStyle(true)
    : injectCb[aniName].push(buildAniStyle);

  // Need locate after reactStyle, for inject latest style in getKeyframe function
  getKeyframe(aniName, () => {
    injectDone[aniName] = true;
    cleanTask(aniName);
  });
  inject[key] = true;
};

/**
 * @typedef {object} AnimationData
 * @property {string} className
 * @property {string} key
 * @property {string} name
 * @property {number} timeout
 * @property {number} delay
 */

/**
 * @param {string} s
 * @returns {AnimationData}
 */
const parseAniValue = (s = "") => {
  const data = s.split("-");
  const name = data[0];
  let timeout = 500;
  let delay = 0;
  if (!isNaN(Number(data[1]))) {
    timeout = parseInt(data[1], 10);
  }
  if (!isNaN(Number(data[2]))) {
    delay = parseInt(data[2], 10);
    timeout += delay;
  }
  const key = [name, timeout, delay].join("-");
  return {
    className: key + " " + name,
    key,
    name,
    timeout,
    delay,
  };
};

export { initAni, parseAniValue };
