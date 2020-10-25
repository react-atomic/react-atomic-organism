"use strict";

import getReg from "./getClassReg";

const hasClass = (classes, name) => {
  return getReg(name).test(classes);
};

export default hasClass;
