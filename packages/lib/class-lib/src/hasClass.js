//@ts-check

import { getClassReg } from "./getClassReg";

/**
 * @param {string} classes
 * @param {string} name
 * @returns {boolean}
 */
const hasClass = (classes, name) => {
  return getClassReg(name).test(classes);
};

export default hasClass;
