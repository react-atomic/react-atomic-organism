//@ts-check

import { wildcardSearch } from "get-safe-reg";
import { NEW_OBJ } from "reshow-constant";

/**
 * @param {string=} className
 * @returns {{[key: string]: any}}
 */
export const toTailwindObj = (className) => {
  const classes = (className ?? "").split(" ");
  const r = NEW_OBJ();
  classes.forEach((item) => {
    const parseResult = wildcardSearch(item, ":key-:val");
    if (/** @type {object} */ (parseResult).key) {
      const oParseResult = /** @type {object} */ (parseResult);
      r[oParseResult.key] = oParseResult.val;
    } else {
      r[item] = true;
    }
  });
  return r;
};
