"use strict";
(self["webpackChunkorganism_react_scroll_animate"] = self["webpackChunkorganism_react_scroll_animate"] || []).push([[5],{

/***/ 309:
/*!********************************************************************!*\
  !*** ./node_modules/organism-react-ajax/build/es/src/lib/dlog.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// dlog 0.1.1
// http://ddo.github.io/dlog
// (c) 2014 Ddo <http://ddo.me>
function dlog(opts) {
  if (!(this instanceof dlog)) {
    return new dlog(opts);
  }

  opts = opts ? opts : {}; //default name = DLOG

  this.setName(opts.name); //default level = info

  this.setLevel(opts.level); //default font-size = 14

  this.setSize(opts.size);
}

dlog.prototype.setName = function (name) {
  this.name = name ? name : "DLOG";
  return this.name;
};

dlog.prototype.setLevel = function (level) {
  this.level = level ? this.level_map[level] ? level : "info" : "info";
  this.level_no = this.level_map[this.level];
  return this.level;
};

dlog.prototype.setSize = function (size) {
  this.size = size ? size : 14;
  return this.size;
};

dlog.prototype.level_map = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  silent: 6
};
dlog.prototype.color_map = {
  name: "cyan",
  trace: "black",
  debug: "green",
  info: "blue",
  warn: "orange",
  error: "red"
};

dlog.prototype.getCSS = function (level) {
  if (!this.color_map[level]) {
    level = "info";
  }

  return level ? "font-size: " + this.size + "px;color: " + this.color_map[level] : "font-size: " + this.size + "px";
};

dlog.prototype.log = function (level, data) {
  if (level === "silent") {
    return;
  }

  if (this.level_map[level] >= this.level_no) {
    this.show(level, data);
  }
};

dlog.prototype.isAllObj = function (arr) {
  //do each element of arr is a obj ?
  for (var i = 0, j = arr.length; i < j; i++) {
    if (!isNaN(arr[i] * 1)) {
      return false;
    }
  }

  return true;
};

dlog.prototype.show = function (level, data) {
  console.info("%c [%s] %c %s %c %s:", this.getCSS(), new Date().toJSON(), this.getCSS("name"), this.name, this.getCSS(level), level.toUpperCase());

  if (!console[level]) {
    level = "info";
  }

  if (level === "trace") {
    level = "debug"; // tricky for hidden trace in browser console.
  } else if (level === "debug") {
    level = "log"; // avoid message hidden when chrome verbose not checked.
  }

  if (Array.isArray(data[0]) && this.isAllObj(data[0])) {
    console.table(data[0]);
  } else {
    console[level].apply(console, data);
  }
};

dlog.prototype.trace = function () {
  this.log("trace", arguments);
};

dlog.prototype.debug = function () {
  this.log("debug", arguments);
};

dlog.prototype.info = function () {
  this.log("info", arguments);
};

dlog.prototype.warn = function () {
  this.log("warn", arguments);
};

dlog.prototype.error = function () {
  this.log("error", arguments);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dlog);

/***/ })

}]);
//# sourceMappingURL=5.576e313.bundle.js.map