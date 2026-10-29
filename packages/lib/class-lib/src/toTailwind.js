//@ts-check

import { wildcardSearch } from "get-safe-reg";
import { NEW_OBJ } from "reshow-constant";
import { strToArray } from "./strToArray";

/**
 * @param {string=} className
 * @returns {{[key: string]: any}}
 */
export const toTailwindObj = (className) => {
  const classes = strToArray(className);
  const r = NEW_OBJ();
  classes.forEach((item) => {
    const parseResult = wildcardSearch(item, ":key-:val");
    if (/** @type {any} */ (parseResult).key) {
      const oParseResult = /** @type {any} */ (parseResult);
      r[oParseResult.key] = oParseResult.val;
    } else {
      r[item] = true;
    }
  });
  return r;
};
