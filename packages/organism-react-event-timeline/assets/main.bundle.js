/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 232:
/*!*********************************!*\
  !*** ./build/es/src/client.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var reshow_app_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-app/client */ 233);
/* harmony import */ var _ui_pages_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/pages/index.mjs */ 331);


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((0,reshow_app_client__WEBPACK_IMPORTED_MODULE_0__["default"])(_ui_pages_index_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ 332:
/*!********************************!*\
  !*** ./build/es/src/index.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Event": () => (/* reexport safe */ _ui_organisms_Event_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "EventTimeline": () => (/* reexport safe */ _ui_organisms_EventTimeline_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _ui_organisms_Event_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/organisms/Event.mjs */ 110);
/* harmony import */ var _ui_organisms_EventTimeline_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/organisms/EventTimeline.mjs */ 231);
// Default





/***/ }),

/***/ 110:
/*!*****************************************!*\
  !*** ./build/es/ui/organisms/Event.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/objectSpread2 */ 0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 2);
/* harmony import */ var colorlib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! colorlib */ 76);
/* harmony import */ var organism_react_scroll_animate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! organism-react-scroll-animate */ 333);
/* harmony import */ var react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-atomic-molecule */ 10);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ 3);








var Year = function Year(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.SemanticUI, (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props), {}, {
    style: Styles.year
  }));
};

var Time = function Time(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.SemanticUI, {
    children: props.time.map(function (t, k) {
      if (!k) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Year, {
          children: t
        }, k);
      } else {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.Meta, {
          style: Styles.timeMeta,
          children: t
        }, k);
      }
    })
  });
};

var TimeBox = function TimeBox(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.SemanticUI, {
    style: (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
      borderLeftColor: props.borderColor
    }, Styles.timebox),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Time, {
      time: props.from
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.SemanticUI, {
      style: (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
        backgroundColor: props.color
      }, Styles.until)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Time, {
      time: props.to
    })]
  });
};

var EventContent = function EventContent(props) {
  var header = props.header,
      description = props.description,
      from = props.from,
      to = props.to,
      color = props.color,
      backgroundColor = props.backgroundColor,
      borderColor = props.borderColor,
      minHeight = props.minHeight;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.Content, {
    className: "pure-u-1 pure-u-md-11-24",
    style: (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
      borderColor: backgroundColor,
      backgroundColor: (0,colorlib__WEBPACK_IMPORTED_MODULE_2__.lightenColor)(backgroundColor, 60, 500),
      color: color,
      minHeight: minHeight
    }, Styles.content),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.Header, {
      className: "summary",
      style: Styles.summary,
      children: header
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.Description, {
      className: "extra text",
      children: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(TimeBox, {
      from: from,
      to: to,
      color: color,
      borderColor: borderColor
    })]
  });
};

var Event = function Event(props) {
  var classes = (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.mixClass)(props.className, "event");
  var _props$color = props.color,
      color = _props$color === void 0 ? "#000" : _props$color,
      _props$backgroundColo = props.backgroundColor,
      backgroundColor = _props$backgroundColo === void 0 ? "#fff" : _props$backgroundColo,
      _props$borderColor = props.borderColor,
      borderColor = _props$borderColor === void 0 ? "#0f87cd" : _props$borderColor,
      _props$minHeight = props.minHeight,
      minHeight = _props$minHeight === void 0 ? 100 : _props$minHeight,
      animate = props.animate,
      handleEventClick = props.handleEventClick;

  var content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(EventContent, (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props), {}, {
    color: color,
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    minHeight: minHeight
  }));

  if (animate) {
    var aniProps = (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
      minHeight: minHeight,
      style: {
        width: "100%"
      }
    }, animate);

    content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(organism_react_scroll_animate__WEBPACK_IMPORTED_MODULE_3__["default"], (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, aniProps), {}, {
      children: content
    }));
  }

  var containerStyle = (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, Styles.container);

  if (handleEventClick) {
    containerStyle.cursor = "pointer";
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.Row, {
    className: classes,
    style: containerStyle,
    onClick: function onClick(e) {
      if (handleEventClick) {
        handleEventClick(e, props);
      }
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.SemanticUI, {
      className: "line",
      style: (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
        background: (0,colorlib__WEBPACK_IMPORTED_MODULE_2__.hexToRgba)(backgroundColor, ".3")
      }, Styles.line)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__.Label, {
      ui: false,
      style: (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
        borderColor: borderColor,
        backgroundColor: backgroundColor
      }, Styles.label)
    }), content]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Event);
var Styles = {
  container: {
    position: "relative",
    padding: 15
  },
  year: {
    fontFamily: "Tienne,serif",
    fontSize: "1.375rem",
    fontWeight: 700
  },
  until: {
    width: 1,
    height: 10,
    display: "inline-block",
    background: "#000"
  },
  timeMeta: {
    fontSize: "0.813rem",
    textTransform: "capitalize"
  },
  timebox: {
    position: "absolute",
    width: 100,
    top: 0,
    bottom: 0,
    right: -100,
    borderLeftStyle: "solid",
    borderLeftWidth: 10,
    textAlign: "center",
    paddingTop: 20
  },
  summary: {
    fontSize: "1.5rem",
    textTransform: "capitalize",
    fontWeight: 700,
    textDecoration: "underline"
  },
  content: {
    position: "relative",
    borderWidth: 12,
    borderStyle: "solid",
    borderRightWidth: 100,
    boxSizing: "border-box",
    margin: "0 15px",
    padding: 20
  },
  label: {
    height: "1.3rem",
    width: "1.3rem",
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: 5,
    position: "absolute",
    boxSizing: "border-box",
    top: ".8rem",
    left: 0,
    zIndex: 1
  },
  line: {
    position: "absolute",
    height: "100%",
    width: "1px",
    left: 10
  }
};

/***/ }),

/***/ 231:
/*!*************************************************!*\
  !*** ./build/es/ui/organisms/EventTimeline.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/objectSpread2 */ 0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 2);
/* harmony import */ var react_atomic_molecule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-atomic-molecule */ 10);
/* harmony import */ var _organisms_Event_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../organisms/Event.mjs */ 110);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ 3);







var EventTimeline = function EventTimeline(props) {
  injects = (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_2__.useLazyInject)(InjectStyles, injects);
  var classes = (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_2__.mixClass)(props.className, "feed timeline");
  var _props$events = props.events,
      events = _props$events === void 0 ? [] : _props$events,
      eventElement = props.eventElement;
  var elProps = {};

  if (props.animate) {
    elProps.animate = props.animate;
  }

  if (props.color) {
    elProps.color = props.color;
  }

  if (props.backgroundColor) {
    elProps.backgroundColor = props.backgroundColor;
  }

  if (props.borderColor) {
    elProps.borderColor = props.borderColor;
  }

  if (props.handleEventClick) {
    elProps.handleEventClick = props.handleEventClick;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_2__.SemanticUI, {
    className: classes,
    style: Styles.container,
    children: events.map(function (item, k) {
      item = (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item), elProps);

      if (k % 2 && props.evenAnimate) {
        item.animate = props.evenAnimate;
      }

      if (item.animate) {
        if ("undefined" === typeof item.animate.once) {
          item.animate.once = true;
        }
      }

      var el;

      if ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(eventElement)) {
        el = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(eventElement, (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
          key: k
        }, item));
      } else if ("function" === typeof children) {
        el = eventElement(item, k);
      } else {
        el = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_organisms_Event_mjs__WEBPACK_IMPORTED_MODULE_3__["default"], (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item), {}, {
          key: k
        }));
      }

      return el;
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventTimeline);
var Styles = {
  container: {
    padding: 5
  }
};
var injects;
var InjectStyles = {
  evenEvent: [{
    left: "50%",
    margin: "0 30px !important"
  }, [react_atomic_molecule__WEBPACK_IMPORTED_MODULE_2__.min.md, ".ui.timeline>.event:nth-child(even) .content"]],
  rwdLine: [{
    left: "50% !important"
  }, [react_atomic_molecule__WEBPACK_IMPORTED_MODULE_2__.min.md, ".ui.timeline>.event>.line"]],
  rwdLabel: [{
    left: "50% !important",
    marginLeft: "-.6rem"
  }, [react_atomic_molecule__WEBPACK_IMPORTED_MODULE_2__.min.md, ".ui.timeline>.event>.label"]]
};

/***/ }),

/***/ 331:
/*!*************************************!*\
  !*** ./build/es/ui/pages/index.mjs ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 2);
/* harmony import */ var _src_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/index.mjs */ 332);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ 3);
var _Event;


/**
 * Production please use
 * import {xxx} from "organism-react-event-timeline"
 */




var Index = function Index(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_src_index_mjs__WEBPACK_IMPORTED_MODULE_1__.EventTimeline, {
    backgroundColor: "#fff",
    eventElement: _Event || (_Event = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_src_index_mjs__WEBPACK_IMPORTED_MODULE_1__.Event, {})),
    animate: {
      enter: "fadeInLeft"
    },
    evenAnimate: {
      enter: "fadeInRight"
    },
    events: [{
      header: "header",
      description: "desc",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header2",
      description: "desc2",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header3",
      description: "desc3",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header4",
      description: "desc4",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header5",
      description: "desc5",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header6",
      description: "desc6",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header7",
      description: "desc7",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header8",
      description: "desc8",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header9",
      description: "desc9",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }, {
      header: "header10",
      description: "desc10",
      from: ["2016", "present"],
      to: ["2010", "August"]
    }]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h().slice(0, 7) + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("642a028034f296ee72e6")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "organism-react-event-timeline:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/assets/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			1: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkorganism_react_event_timeline"] = self["webpackChunkorganism_react_event_timeline"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [0,2], () => (__webpack_require__(232)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map