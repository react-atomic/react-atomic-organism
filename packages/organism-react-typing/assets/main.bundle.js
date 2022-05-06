/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 192:
/*!*********************************!*\
  !*** ./build/es/src/client.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var reshow_app_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-app/client */ 193);
/* harmony import */ var _ui_pages_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/pages/index.mjs */ 299);


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((0,reshow_app_client__WEBPACK_IMPORTED_MODULE_0__["default"])(_ui_pages_index_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ 301:
/*!***********************************************!*\
  !*** ./build/es/src/genVerticalRollStyle.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_atomic_molecule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-atomic-molecule */ 10);
/* harmony import */ var with_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! with-array */ 53);



var genVerticalRollStyle = function genVerticalRollStyle(rows, height, eachRowStaySec) {
  var rowsLen = (0,with_array__WEBPACK_IMPORTED_MODULE_1__["default"])(rows).length;

  if (!rowsLen) {
    return;
  }

  var aniName = "verticalRoll";
  var styleId = aniName + "-rows-" + rowsLen + "-height-" + height;
  var aniStyle = (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_0__.reactStyle)({
    position: "relative",
    animation: [styleId + " " + rowsLen * 2 * eachRowStaySec + "s steps(" + rowsLen + ") infinite"],
    height: height,
    transform: ["rotateZ(360deg)"]
  }, null, false);
  (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_0__.reactStyle)([{
    top: 0
  }, {
    top: 0 - height * rowsLen
  }], ["@keyframes " + styleId, "0%", "100%"], styleId);
  return aniStyle;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genVerticalRollStyle);

/***/ }),

/***/ 300:
/*!********************************!*\
  !*** ./build/es/src/index.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _ui_organisms_Typing_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _ui_organisms_Typing_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/organisms/Typing.mjs */ 191);
// Default


/***/ }),

/***/ 191:
/*!******************************************!*\
  !*** ./build/es/ui/organisms/Typing.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/objectSpread2 */ 0);
/* harmony import */ var reshow_runtime_es_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reshow-runtime/es/helpers/objectWithoutPropertiesLoose */ 5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ 3);
/* harmony import */ var react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-atomic-molecule */ 10);
/* harmony import */ var get_object_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! get-object-value */ 6);
/* harmony import */ var _src_genVerticalRollStyle_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../src/genVerticalRollStyle.mjs */ 301);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ 2);


var _excluded = ["children", "sec"];







var getTypingNextWordAniClassName = function getTypingNextWordAniClassName(el, sec) {
  var elWidth = el.offsetWidth;

  if (elWidth <= 1) {
    return null;
  }

  var elLen = (0,get_object_value__WEBPACK_IMPORTED_MODULE_4__["default"])(el, ["textContent", "length"], 10);
  var width = Math.floor(elWidth + elWidth / elLen);
  var aniName = ("typingNextWord-" + width + "-" + sec).replace(".", "-");

  if (injects[aniName]) {
    return aniName;
  }

  (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.reactStyle)([{
    maxWidth: 0
  }, {
    maxWidth: width
  }], ["@keyframes " + aniName, "0%", "100%"], aniName + "-keyframe");
  (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.reactStyle)({
    animation: [aniName + " " + sec + "s steps(" + (elLen + 1) + ") infinite alternate"],
    visibility: "visible !important",
    transform: ["rotateZ(360deg)"]
  }, "." + aniName, aniName + "-ani");
  injects[aniName] = true;
  return aniName;
};

var TypingItem = function TypingItem(props) {
  var children = props.children,
      sec = props.sec,
      others = (0,reshow_runtime_es_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, _excluded);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(),
      classes = _useState[0],
      setClasses = _useState[1];

  var lastClasses = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)();
  var lastEl = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)();

  var handleEl = function handleEl(el) {
    if (el) {
      if (!lastEl.current || !lastEl.current.isSameNode(el)) {
        lastEl.current = el;
        var next = getTypingNextWordAniClassName(el, sec);

        if (next && lastClasses.current !== next) {
          lastClasses.current = next;
          setClasses(next);
        }
      }
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.SemanticUI, (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, others), {}, {
    className: "typing-item",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.SemanticUI, {
      className: classes,
      style: Styles.typingItemText,
      refCb: handleEl,
      children: children
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.SemanticUI, {
      styles: injects.typingCursor,
      children: " | "
    })]
  }));
};

var useTyping = function useTyping(props) {
  injects = (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.useLazyInject)(InjectStyles);
  var _props$autoStart = props.autoStart,
      autoStart = _props$autoStart === void 0 ? true : _props$autoStart,
      _props$sec = props.sec,
      sec = _props$sec === void 0 ? 2 : _props$sec,
      _props$color = props.color,
      color = _props$color === void 0 ? "#000" : _props$color,
      _props$height = props.height,
      propsHeight = _props$height === void 0 ? 80 : _props$height,
      children = props.children,
      background = props.background;

  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(autoStart),
      isRun = _useState2[0],
      setIsRun = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(),
      typingItemStyles = _useState3[0],
      setTypingItemStyles = _useState3[1];

  var height = parseInt(propsHeight, 10);
  var rowLen = children === null || children === void 0 ? void 0 : children.length;
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    var aniStyle = (0,_src_genVerticalRollStyle_mjs__WEBPACK_IMPORTED_MODULE_5__["default"])(children, height, sec);

    if (aniStyle) {
      setTypingItemStyles(aniStyle);
    }
  }, [rowLen, height, sec]);
  var expose = {
    start: function start() {
      setIsRun(true);
    },
    stop: function stop() {
      setIsRun(false);
    }
  };
  return {
    expose: expose,
    color: color,
    background: background,
    height: height,
    isRun: isRun && typingItemStyles,
    typingItemStyles: typingItemStyles,
    children: children,
    sec: sec
  };
};

var Typing = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function (props, ref) {
  var _TypingItem;

  var _useTyping = useTyping(props),
      expose = _useTyping.expose,
      color = _useTyping.color,
      background = _useTyping.background,
      height = _useTyping.height,
      isRun = _useTyping.isRun,
      typingItemStyles = _useTyping.typingItemStyles,
      children = _useTyping.children,
      sec = _useTyping.sec;

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useImperativeHandle)(ref, function () {
    return expose;
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(function () {
    var items = [];

    if (isRun) {
      // need calculate offsetWidth
      var typeItem = (0,react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.build)(_TypingItem || (_TypingItem = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TypingItem, {
        sec: sec,
        styles: typingItemStyles
      })));
      react__WEBPACK_IMPORTED_MODULE_2__.Children.forEach(children, function (item, key) {
        items.push(typeItem({
          key: key
        }, item.props.children));
      });
    }

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_3__.SemanticUI, {
      className: "react-typing-comp",
      style: (0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, Styles.typingContainer), {}, {
        color: color,
        background: background,
        height: height
      }),
      children: items
    });
  }, [isRun, color, background, height]);
});
Typing.displayName = "Typing";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Typing);
var Styles = {
  typingContainer: {
    overflow: "hidden"
  },
  typingItemText: {
    display: "inline-block",
    overflow: "hidden",
    visibility: "hidden",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  }
};
var injects;
var InjectStyles = {
  typingCursor: [{
    display: "inline-block",
    position: "relative",
    marginLeft: 5,
    top: 1,
    verticalAlign: "top",
    animation: ["typingBlink 1s steps(2) infinite"],
    transform: ["rotateZ(360deg)"]
  }],
  typingBlink: [[{
    opacity: "1"
  }, {
    opacity: "0"
  }], ["@keyframes typingBlink", "0%, 100%", "50%"]]
};

/***/ }),

/***/ 299:
/*!*************************************!*\
  !*** ./build/es/ui/pages/index.mjs ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var reshow_runtime_es_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/classCallCheck */ 15);
/* harmony import */ var reshow_runtime_es_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reshow-runtime/es/helpers/createClass */ 16);
/* harmony import */ var reshow_runtime_es_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reshow-runtime/es/helpers/assertThisInitialized */ 21);
/* harmony import */ var reshow_runtime_es_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reshow-runtime/es/helpers/inherits */ 23);
/* harmony import */ var reshow_runtime_es_helpers_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reshow-runtime/es/helpers/createSuper */ 24);
/* harmony import */ var reshow_runtime_es_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reshow-runtime/es/helpers/defineProperty */ 13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ 3);
/* harmony import */ var _src_index_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/index.mjs */ 300);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ 2);







var _div, _div2;


/**
 * Production please use
 * import Typing from "organism-react-typing"
 */





var Index = /*#__PURE__*/function (_Component) {
  (0,reshow_runtime_es_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Index, _Component);

  var _super = (0,reshow_runtime_es_helpers_createSuper__WEBPACK_IMPORTED_MODULE_4__["default"])(Index);

  function Index() {
    var _this;

    (0,reshow_runtime_es_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    (0,reshow_runtime_es_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])((0,reshow_runtime_es_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleStart", function () {
      _this.el.start();
    });

    (0,reshow_runtime_es_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])((0,reshow_runtime_es_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleStop", function () {
      _this.el.stop();
    });

    return _this;
  }

  (0,reshow_runtime_es_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_src_index_mjs__WEBPACK_IMPORTED_MODULE_7__["default"], {
          ref: function ref(el) {
            return _this2.el = el;
          },
          background: "#000",
          color: "#fff",
          children: [_div || (_div = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            children: "abc"
          })), _div2 || (_div2 = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            children: "def"
          }))]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
          onClick: this.handleStart,
          children: "Start"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
          onClick: this.handleStop,
          children: "Stop"
        })]
      });
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_6__.Component);

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
/******/ 		__webpack_require__.h = () => ("0823bdbcae10c7b6eea1")
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
/******/ 		var dataWebpackPrefix = "organism-react-typing:";
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
/******/ 		__webpack_require__.p = "./assets/";
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkorganism_react_typing"] = self["webpackChunkorganism_react_typing"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [0,2], () => (__webpack_require__(192)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map