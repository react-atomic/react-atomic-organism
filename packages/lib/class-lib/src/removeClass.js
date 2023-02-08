//@ts-check

import { getClassReg } from "./getClassReg";
import hasClass from "./hasClass";

/**
 * @param {string} classes
 * @param {string} name
 * @returns {string}
 */
const removeClass = (classes, name) => {
  if (classes && hasClass(classes, name)) {
    classes = classes.replace(getClassReg(name), " ").replace(/(^\s+)|\s+$/g, "");
    if (hasClass(classes, name)) {
      // in case of multiple adjacent
      classes = removeClass(classes, name);
    }
  }
  return classes;
};

export default removeClass;
