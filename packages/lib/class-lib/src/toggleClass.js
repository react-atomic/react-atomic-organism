//@ts-check

import hasClass from "./hasClass";
import removeClass from "./removeClass";
import mixClass from "./mixClass";

/**
 * @param {string} classes
 * @param {string} name
 * @returns {string}
 */
const toggleClass = (classes, name) => {
  if (hasClass(classes, name)) {
    classes = removeClass(classes, name);
  } else {
    classes = mixClass(classes, name);
  }
  return classes;
};

export default toggleClass;
