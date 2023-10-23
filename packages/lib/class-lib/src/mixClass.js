//@ts-check

import { KEYS, IS_ARRAY, STRING, NUMBER, OBJECT } from "reshow-constant";
import dedup from "array.dedup";
import { strToArray } from "./strToArray";

/**
 * @param {any[]} args
 * @returns {string}
 */
const mixClass = (...args) => {
  const classes = [];
  args.forEach((arg) => {
    if (!arg) {
      return;
    }
    const argType = typeof arg;
    if (argType === NUMBER || argType === STRING) {
      classes.push(...strToArray(arg));
    } else if (IS_ARRAY(arg)) {
      classes.push(mixClass.apply(null, arg));
    } else if (argType === OBJECT) {
      KEYS(arg).forEach((k) => {
        if (arg[k]) {
          classes.push(...strToArray(k));
        }
      });
    }
  });
  return dedup(classes).join(" ");
};

export default mixClass;
