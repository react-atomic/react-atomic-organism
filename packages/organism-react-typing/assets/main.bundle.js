/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + "." + "28410493ba7f1ca009b1" + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./assets/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./build/es/src/client.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/es/src/client.js":
/*!********************************!*\
  !*** ./build/es/src/client.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var reshow_app_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-app/client */ "./node_modules/reshow-app/client.js");
/* harmony import */ var _ui_pages_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/pages/index */ "./build/es/ui/pages/index.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(reshow_app_client__WEBPACK_IMPORTED_MODULE_0__["default"])(_ui_pages_index__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./build/es/src/index.js":
/*!*******************************!*\
  !*** ./build/es/src/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_organisms_Typing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/organisms/Typing */ "./build/es/ui/organisms/Typing.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ui_organisms_Typing__WEBPACK_IMPORTED_MODULE_0__["default"]; });

// Default


/***/ }),

/***/ "./build/es/ui/organisms/Typing.js":
/*!*****************************************!*\
  !*** ./build/es/ui/organisms/Typing.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/objectSpread2 */ "./node_modules/reshow-runtime/es/helpers/objectSpread2.js");
/* harmony import */ var reshow_runtime_es_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reshow-runtime/es/helpers/slicedToArray */ "./node_modules/reshow-runtime/es/helpers/slicedToArray.js");
/* harmony import */ var reshow_runtime_es_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reshow-runtime/es/helpers/objectWithoutProperties */ "./node_modules/reshow-runtime/es/helpers/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-atomic-molecule */ "./node_modules/react-atomic-molecule/build/es/src/index.js");
/* harmony import */ var get_object_value__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! get-object-value */ "./node_modules/get-object-value/build/es/src/index.js");



var _excluded = ["children", "sec"];




var getTypingNextWordAniClassName = function getTypingNextWordAniClassName(el, sec) {
  var elWidth = el.offsetWidth;

  if (elWidth <= 1) {
    return null;
  }

  var elLen = Object(get_object_value__WEBPACK_IMPORTED_MODULE_5__["default"])(el, ["textContent", "length"], 10);
  var width = Math.floor(elWidth + elWidth / elLen);
  var aniName = ("typingNextWord-" + width + "-" + sec).replace(".", "-");

  if (injects[aniName]) {
    return aniName;
  }

  Object(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["reactStyle"])([{
    maxWidth: 0
  }, {
    maxWidth: width
  }], ["@keyframes " + aniName, "0%", "100%"], aniName + "-keyframe");
  Object(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["reactStyle"])({
    animation: ["".concat(aniName, " ").concat(sec, "s steps(").concat(elLen + 1, ") infinite alternate")],
    visibility: "visible !important"
  }, "." + aniName, aniName + "-ani");
  injects[aniName] = true;
  return aniName;
};

var TypingItem = function TypingItem(props) {
  var children = props.children,
      sec = props.sec,
      others = Object(reshow_runtime_es_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(props, _excluded);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(),
      _useState2 = Object(reshow_runtime_es_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
      classes = _useState2[0],
      setClasses = _useState2[1];

  var lastClasses = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();

  var handleEl = function handleEl(el) {
    if (el) {
      var next = getTypingNextWordAniClassName(el, sec);

      if (next && lastClasses.current !== next) {
        lastClasses.current = next;
        setClasses(next);
      }
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["SemanticUI"], others, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["SemanticUI"], {
    className: classes,
    style: Styles.typingItemText,
    refCb: handleEl
  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["SemanticUI"], {
    styles: injects.typingCursor
  }, " | "));
};

var useTyping = function useTyping(props) {
  injects = Object(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["useLazyInject"])(InjectStyles);
  var autoStart = props.autoStart,
      children = props.children,
      propsHeight = props.height,
      sec = props.sec,
      color = props.color,
      background = props.background;

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(autoStart),
      _useState4 = Object(reshow_runtime_es_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
      isRun = _useState4[0],
      setIsRun = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(),
      _useState6 = Object(reshow_runtime_es_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
      typingItemStyles = _useState6[0],
      setTypingItemStyles = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var update = function update(props) {
      if (!children) {
        return null;
      }

      var itemLength = children.length;
      var height = parseInt(propsHeight, 10);
      var aniName = "typingNextLine";
      var styleId = aniName + "-" + itemLength + "-" + height;
      var typingItemStyles = Object(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["reactStyle"])({
        position: "relative",
        animation: ["".concat(styleId, " ").concat(itemLength * 2 * sec, "s steps(").concat(itemLength, ") infinite")],
        height: height
      }, null, false);
      Object(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["reactStyle"])([{
        top: 0
      }, {
        top: 0 - height * itemLength
      }], ["@keyframes " + styleId, "0%", "100%"], styleId);
      setTypingItemStyles(typingItemStyles);
    };

    update(props);
  }, [children === null || children === void 0 ? void 0 : children.length, propsHeight, sec]);
  var expose = {
    start: function start() {
      setIsRun(true);
    },
    stop: function stop() {
      setIsRun(false);
    }
  };
  var items = [];

  if (isRun && typingItemStyles) {
    // need calculate offsetWidth
    var typeItem = Object(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["build"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(TypingItem, {
      sec: props.sec,
      styles: typingItemStyles
    }));
    react__WEBPACK_IMPORTED_MODULE_3___default.a.Children.forEach(children, function (item, key) {
      items.push(typeItem({
        key: key
      }, item.props.children));
    });
  }

  return {
    expose: expose,
    items: items
  };
};

var Typing = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function (props, ref) {
  var _useTyping = useTyping(props),
      items = _useTyping.items,
      expose = _useTyping.expose;

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useImperativeHandle"])(ref, function () {
    return expose;
  });
  return Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    var atts = {
      color: props.color,
      background: props.background,
      height: props.height
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_atomic_molecule__WEBPACK_IMPORTED_MODULE_4__["SemanticUI"], {
      className: "react-typing",
      style: Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, Styles.typingContainer), atts)
    }, items);
  }, [items]);
});
Typing.defaultProps = {
  height: 80,
  color: "#000",
  background: null,
  sec: 2,
  autoStart: true
};
Typing.displayName = "Typing";
/* harmony default export */ __webpack_exports__["default"] = (Typing);
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
    animation: ["typingBlink 1s infinite"]
  }],
  typingBlink: [[{
    opacity: "1"
  }, {
    opacity: "0"
  }], ["@keyframes typingBlink", "0%, 100%", "50%"]]
};

/***/ }),

/***/ "./build/es/ui/pages/index.js":
/*!************************************!*\
  !*** ./build/es/ui/pages/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var reshow_runtime_es_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/classCallCheck */ "./node_modules/reshow-runtime/es/helpers/classCallCheck.js");
/* harmony import */ var reshow_runtime_es_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reshow-runtime/es/helpers/createClass */ "./node_modules/reshow-runtime/es/helpers/createClass.js");
/* harmony import */ var reshow_runtime_es_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reshow-runtime/es/helpers/assertThisInitialized */ "./node_modules/reshow-runtime/es/helpers/assertThisInitialized.js");
/* harmony import */ var reshow_runtime_es_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reshow-runtime/es/helpers/inherits */ "./node_modules/reshow-runtime/es/helpers/inherits.js");
/* harmony import */ var reshow_runtime_es_helpers_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reshow-runtime/es/helpers/createSuper */ "./node_modules/reshow-runtime/es/helpers/createSuper.js");
/* harmony import */ var reshow_runtime_es_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reshow-runtime/es/helpers/defineProperty */ "./node_modules/reshow-runtime/es/helpers/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/index */ "./build/es/src/index.js");







var _div, _div2;


/**
 * Production please use
 * import Typing from "organism-react-typing"
 */



var Index = /*#__PURE__*/function (_Component) {
  Object(reshow_runtime_es_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Index, _Component);

  var _super = Object(reshow_runtime_es_helpers_createSuper__WEBPACK_IMPORTED_MODULE_4__["default"])(Index);

  function Index() {
    var _this;

    Object(reshow_runtime_es_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(reshow_runtime_es_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(reshow_runtime_es_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleStart", function () {
      _this.el.start();
    });

    Object(reshow_runtime_es_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(reshow_runtime_es_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleStop", function () {
      _this.el.stop();
    });

    return _this;
  }

  Object(reshow_runtime_es_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_src_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
        ref: function ref(el) {
          return _this2.el = el;
        },
        background: "#000",
        color: "#fff"
      }, _div || (_div = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, "abc")), _div2 || (_div2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, "def"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
        onClick: this.handleStart
      }, "Start"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
        onClick: this.handleStop
      }, "Stop"));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map