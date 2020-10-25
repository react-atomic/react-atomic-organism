"use strict";

import hasClass from "./hasClass";
import removeClass from "./removeClass";
import mixClass from "./mixClass";

const toggleClass = (classes, name) => {
  if (hasClass(classes, name)) {
    classes = removeClass(classes, name);
  } else {
    classes = mixClass(classes, name);
  }
  return classes;
};
