webpackJsonp([20],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (classCallCheck);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);



var Base = function Base(name) {
  var Atom = function Atom(_ref) {
    var refCb = _ref.refCb,
        others = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["refCb"]);

    if (refCb) {
      others.ref = refCb;
    }

    return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(name, others);
  };

  return Atom;
};

/* harmony default export */ __webpack_exports__["a"] = (Base);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var defineProperties = function defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
};

var createClass = function createClass(Constructor, protoProps, staticProps) {
  if (protoProps) defineProperties(Constructor.prototype, protoProps);
  if (staticProps) defineProperties(Constructor, staticProps);
  return Constructor;
};

/* harmony default export */ __webpack_exports__["a"] = (createClass);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _possibleConstructorReturn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_constant__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__refError__ = __webpack_require__(67);



function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw Object(__WEBPACK_IMPORTED_MODULE_2__refError__["a" /* default */])();
  }

  var isObject = __WEBPACK_IMPORTED_MODULE_0_reshow_constant__["c" /* OBJECT */] === Object(__WEBPACK_IMPORTED_MODULE_1__typeof__["a" /* default */])(call);
  return call && (isObject || Object(__WEBPACK_IMPORTED_MODULE_1__typeof__["a" /* default */])(call) === __WEBPACK_IMPORTED_MODULE_0_reshow_constant__["b" /* FUNCTION */]) ? call : self;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _getPrototypeOf;
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _inherits;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setPrototypeOf__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_constant__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getTypeOf__ = __webpack_require__(32);



function _inherits(subClass, superClass) {
  if (Object(__WEBPACK_IMPORTED_MODULE_2__getTypeOf__["a" /* default */])(superClass) !== __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["b" /* FUNCTION */] && superClass !== null) {
    throw new TypeError('Super must be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object(__WEBPACK_IMPORTED_MODULE_0__setPrototypeOf__["a" /* default */])(subClass, superClass);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _defineProperty = function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/* harmony default export */ __webpack_exports__["a"] = (_defineProperty);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/* harmony default export */ __webpack_exports__["a"] = (objectWithoutProperties);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/* harmony default export */ __webpack_exports__["a"] = (_extends);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getWebpack4Default; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return toJS; });
/* unused harmony export toMap */
/* unused harmony export initMap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_constant__ = __webpack_require__(18);


var isArray = Array.isArray;

var getWebpack4Default = function getWebpack4Default(o) {
  return get(o, [__WEBPACK_IMPORTED_MODULE_1_reshow_constant__["a" /* DEFAULT */], __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["a" /* DEFAULT */]], function () {
    return get(o, [__WEBPACK_IMPORTED_MODULE_1_reshow_constant__["a" /* DEFAULT */]], function () {
      return o;
    });
  });
};

var toJS = function toJS(v) {
  return v && v.toJS ? v.toJS() : v;
};

var toMap = function toMap(a) {
  return get(toJS(a), null, {});
};

var initMap = function initMap(o) {
  return function (k, v) {
    return o[k] || (o[k] = getDefaultValue(v));
  };
};

var getDefaultValue = function getDefaultValue(v) {
  return __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["b" /* FUNCTION */] === Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(v) ? v() : v;
};

var get = function get(o, path, defaultValue) {
  if (null == o) {
    return getDefaultValue(defaultValue);
  }

  var current = toJS(o);

  if (!isArray(path)) {
    return current;
  }

  path.every(function (a) {
    if (null != current[a]) {
      current = current[a];
      return true;
    } else {
      current = getDefaultValue(defaultValue);
      return false;
    }
  });
  return current;
};

/* harmony default export */ __webpack_exports__["a"] = (get);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _objectSpread2;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getTypeOf__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_constant__ = __webpack_require__(18);



function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    if (i % 2 || !Object.getOwnPropertyDescriptors) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (Object(__WEBPACK_IMPORTED_MODULE_1__getTypeOf__["a" /* default */])(Object.getOwnPropertySymbols) === __WEBPACK_IMPORTED_MODULE_2_reshow_constant__["b" /* FUNCTION */]) {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        Object(__WEBPACK_IMPORTED_MODULE_0__defineProperty__["a" /* default */])(target, key, source[key]);
      });
    } else {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
    }
  }

  return target;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixClass = __webpack_require__(90);

Object.defineProperty(exports, 'mixClass', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mixClass).default;
  }
});

var _hasClass = __webpack_require__(54);

Object.defineProperty(exports, 'hasClass', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_hasClass).default;
  }
});

var _removeClass = __webpack_require__(92);

Object.defineProperty(exports, 'removeClass', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_removeClass).default;
  }
});

var _toggleClass = __webpack_require__(157);

Object.defineProperty(exports, 'toggleClass', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toggleClass).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__connect__ = __webpack_require__(69);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__connect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connectFunctional__ = __webpack_require__(125);
/* unused harmony reexport connectFunctional */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connectHook__ = __webpack_require__(126);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__connectHook__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ReduceStore__ = __webpack_require__(134);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__ReduceStore__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_flux_base__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4_reshow_flux_base__["b"]; });






/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_atomic_atom__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ucfirst__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ucfirst___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ucfirst__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_lib_styles_injectStyle__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_lib_styles_bindStyles__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_class_lib__);


/* jshint esnext: true */







var keys = Object.keys;

var getChildren = function getChildren(render, children) {
  if (!render) {
    return null;
  }
  /**
   * Hack for https://fb.me/react-warning-keys
   * Each child in an array or iterator should have a unique "key"
   */


  return __WEBPACK_IMPORTED_MODULE_1_react__["Children"].map(children, function (c) {
    return c;
  });
};

var SemanticUI = function SemanticUI(_ref) {
  var atom = _ref.atom,
      children = _ref.children,
      renderChildren = _ref.renderChildren,
      styles = _ref.styles,
      styleOrder = _ref.styleOrder,
      ui = _ref.ui,
      others = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["atom", "children", "renderChildren", "styles", "styleOrder", "ui"]);

  var component;

  switch (atom) {
    case 'null':
      return null;

    case 'input':
      component = __WEBPACK_IMPORTED_MODULE_2_react_atomic_atom__["Input"];
      renderChildren = false;
      break;

    case 'img':
      component = __WEBPACK_IMPORTED_MODULE_2_react_atomic_atom__["Img"];
      renderChildren = false;
      break;

    case 'path':
      component = __WEBPACK_IMPORTED_MODULE_2_react_atomic_atom__["Path"];
      renderChildren = false;
      ui = false;
      break;

    default:
      component = Object(__WEBPACK_IMPORTED_MODULE_3_get_object_value__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2_react_atomic_atom__, [__WEBPACK_IMPORTED_MODULE_4_ucfirst___default()(atom || '')], function () {
        return __WEBPACK_IMPORTED_MODULE_2_react_atomic_atom__["Div"];
      });
      break;
  }

  var className = others.className,
      style = others.style; // bindStyles need after inject

  var bindProps = {};

  if (styles) {
    // Need avoid props pass by ref !!important!!
    Object(__WEBPACK_IMPORTED_MODULE_5__src_lib_styles_injectStyle__["a" /* default */])();
    bindProps = Object(__WEBPACK_IMPORTED_MODULE_6__src_lib_styles_bindStyles__["a" /* default */])({
      className: className,
      style: style,
      styles: styles,
      styleOrder: styleOrder
    });
  }

  keys(bindProps).forEach(function (key) {
    return others[key] = bindProps[key];
  });

  if (ui) {
    // others.className maybe effect by bindProps, so use it here.
    others.className = Object(__WEBPACK_IMPORTED_MODULE_7_class_lib__["mixClass"])(others.className, 'ui');
  }

  return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(component, others, getChildren(renderChildren, children));
};

SemanticUI.defaultProps = {
  ui: true,
  renderChildren: true
};
/* harmony default export */ __webpack_exports__["a"] = (SemanticUI);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _assertThisInitialized;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__refError__ = __webpack_require__(67);

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw Object(__WEBPACK_IMPORTED_MODULE_0__refError__["a" /* default */])();
  }

  return self;
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_molecules_Button__ = __webpack_require__(93);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return __WEBPACK_IMPORTED_MODULE_0__ui_molecules_Button__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_molecules_Card__ = __webpack_require__(208);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return __WEBPACK_IMPORTED_MODULE_1__ui_molecules_Card__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_molecules_Content__ = __webpack_require__(95);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return __WEBPACK_IMPORTED_MODULE_2__ui_molecules_Content__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_molecules_Circular__ = __webpack_require__(209);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Circular", function() { return __WEBPACK_IMPORTED_MODULE_3__ui_molecules_Circular__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_molecules_Description__ = __webpack_require__(210);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Description", function() { return __WEBPACK_IMPORTED_MODULE_4__ui_molecules_Description__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_molecules_Divider__ = __webpack_require__(211);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Divider", function() { return __WEBPACK_IMPORTED_MODULE_5__ui_molecules_Divider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_molecules_DividingHeader__ = __webpack_require__(212);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DividingHeader", function() { return __WEBPACK_IMPORTED_MODULE_6__ui_molecules_DividingHeader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ui_molecules_Dimmer__ = __webpack_require__(213);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dimmer", function() { return __WEBPACK_IMPORTED_MODULE_7__ui_molecules_Dimmer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ui_molecules_Form__ = __webpack_require__(214);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return __WEBPACK_IMPORTED_MODULE_8__ui_molecules_Form__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ui_molecules_Field__ = __webpack_require__(215);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return __WEBPACK_IMPORTED_MODULE_9__ui_molecules_Field__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ui_molecules_Header__ = __webpack_require__(97);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return __WEBPACK_IMPORTED_MODULE_10__ui_molecules_Header__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ui_molecules_Icon__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return __WEBPACK_IMPORTED_MODULE_11__ui_molecules_Icon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ui_molecules_Item__ = __webpack_require__(216);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return __WEBPACK_IMPORTED_MODULE_12__ui_molecules_Item__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ui_molecules_Image__ = __webpack_require__(217);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return __WEBPACK_IMPORTED_MODULE_13__ui_molecules_Image__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ui_molecules_InputBox__ = __webpack_require__(218);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "InputBox", function() { return __WEBPACK_IMPORTED_MODULE_14__ui_molecules_InputBox__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ui_molecules_List__ = __webpack_require__(219);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return __WEBPACK_IMPORTED_MODULE_15__ui_molecules_List__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ui_molecules_Label__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return __WEBPACK_IMPORTED_MODULE_16__ui_molecules_Label__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ui_molecules_Menu__ = __webpack_require__(220);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return __WEBPACK_IMPORTED_MODULE_17__ui_molecules_Menu__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ui_molecules_Message__ = __webpack_require__(96);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return __WEBPACK_IMPORTED_MODULE_18__ui_molecules_Message__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ui_molecules_Meta__ = __webpack_require__(221);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Meta", function() { return __WEBPACK_IMPORTED_MODULE_19__ui_molecules_Meta__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ui_molecules_Progress__ = __webpack_require__(222);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Progress", function() { return __WEBPACK_IMPORTED_MODULE_20__ui_molecules_Progress__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ui_molecules_Rail__ = __webpack_require__(226);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Rail", function() { return __WEBPACK_IMPORTED_MODULE_21__ui_molecules_Rail__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ui_molecules_Ribbon__ = __webpack_require__(227);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ribbon", function() { return __WEBPACK_IMPORTED_MODULE_22__ui_molecules_Ribbon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ui_molecules_SemanticUI__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SemanticUI", function() { return __WEBPACK_IMPORTED_MODULE_23__ui_molecules_SemanticUI__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ui_molecules_Segment__ = __webpack_require__(228);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Segment", function() { return __WEBPACK_IMPORTED_MODULE_24__ui_molecules_Segment__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ui_molecules_Title__ = __webpack_require__(229);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return __WEBPACK_IMPORTED_MODULE_25__ui_molecules_Title__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ui_molecules_Unsafe__ = __webpack_require__(230);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Unsafe", function() { return __WEBPACK_IMPORTED_MODULE_26__ui_molecules_Unsafe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_class_lib__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_27_class_lib__, "mixClass")) __webpack_require__.d(__webpack_exports__, "mixClass", function() { return __WEBPACK_IMPORTED_MODULE_27_class_lib__["mixClass"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_reshow_build__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "build", function() { return __WEBPACK_IMPORTED_MODULE_28_reshow_build__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__lib_styles_injectStyle__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "injectStyle", function() { return __WEBPACK_IMPORTED_MODULE_29__lib_styles_injectStyle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__lib_styles_lazyInject__ = __webpack_require__(231);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lazyInject", function() { return __WEBPACK_IMPORTED_MODULE_30__lib_styles_lazyInject__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__lib_styles_index__ = __webpack_require__(57);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reactStyle", function() { return __WEBPACK_IMPORTED_MODULE_31__lib_styles_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__lib_styles_mergeStyleConfig__ = __webpack_require__(232);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mergeStyleConfig", function() { return __WEBPACK_IMPORTED_MODULE_32__lib_styles_mergeStyleConfig__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__needCss__ = __webpack_require__(233);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "needCss", function() { return __WEBPACK_IMPORTED_MODULE_33__needCss__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__config_styles_rwd__ = __webpack_require__(234);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return __WEBPACK_IMPORTED_MODULE_34__config_styles_rwd__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return __WEBPACK_IMPORTED_MODULE_34__config_styles_rwd__["a"]; });
// ui


























 // libs


 //styles





 // config



/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UNDEFINED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FUNCTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SYMBOL; });
/* unused harmony export SCRIPT */
var UNDEFINED = 'undefined';
var FUNCTION = 'function';
var OBJECT = 'object';
var DEFAULT = 'default';
var STRING = 'string';
var SYMBOL = 'symbol';
var SCRIPT = 'script';

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return doc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return win; });
/**
 * !!Important!! do not use reshow-constant here
 * Bable will transpile it to double undefined
 */
var doc = function doc(w) {
  w = w || win();
  return 'undefined' !== typeof w.document ? w.document : {
    __null: true
  };
};

var win = function win() {
  return 'undefined' !== typeof window ? window : {
    __null: true
  };
};



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getTypeOf__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_constant__ = __webpack_require__(18);



var _typeof = function _typeof(o) {
  return __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["e" /* SYMBOL */] === Object(__WEBPACK_IMPORTED_MODULE_0__getTypeOf__["a" /* default */])(o) ? __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["e" /* SYMBOL */] : Object(__WEBPACK_IMPORTED_MODULE_0__getTypeOf__["a" /* default */])(o, __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["c" /* OBJECT */]);
};

/* harmony default export */ __webpack_exports__["a"] = (_typeof);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_organisms_AlertsNotifier__ = __webpack_require__(151);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ui_organisms_AlertsNotifier__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_organisms_DisplayPopupEl__ = __webpack_require__(99);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__ui_organisms_DisplayPopupEl__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_organisms_FullScreen__ = __webpack_require__(242);
/* unused harmony reexport FullScreen */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_organisms_PopupPool__ = __webpack_require__(243);
/* unused harmony reexport PopupPool */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_organisms_Dialog__ = __webpack_require__(244);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__ui_organisms_Dialog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_molecules_PopupModal__ = __webpack_require__(58);
/* unused harmony reexport PopupModal */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_molecules_PopupOverlay__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_6__ui_molecules_PopupOverlay__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ui_molecules_PopupFloatEl__ = __webpack_require__(245);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_7__ui_molecules_PopupFloatEl__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ui_molecules_BasePopup__ = __webpack_require__(61);
/* unused harmony reexport BasePopup */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ui_organisms_PopupHover__ = __webpack_require__(255);
/* unused harmony reexport PopupHover */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ui_organisms_PopupClick__ = __webpack_require__(256);
/* unused harmony reexport PopupClick */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ui_organisms_PopupMonitor__ = __webpack_require__(257);
/* unused harmony reexport PopupMonitor */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__stores_popupStore__ = __webpack_require__(258);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_12__stores_popupStore__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__popupDispatcher__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_13__popupDispatcher__["b"]; });
// Organisms




 // Molecule




 //event



 // Stores

 // Dispatch



/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultCall */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_constant__ = __webpack_require__(18);



var callFunc = function callFunc(func, args, scope) {
  return __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["b" /* FUNCTION */] === Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(func) ? func.apply(scope, args) : func;
};

var defaultCall = function defaultCall(defaultFunc, func, scope) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return callFunc(func || defaultFunc, args, scope);
  };
};

/* harmony default export */ __webpack_exports__["a"] = (callFunc);


/***/ }),
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getScrollNode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_constant__ = __webpack_require__(18);



var lastScrollStore = {};
var oDoc;
var oWin;
var isWebkit;
var docEl;
var domCount = 0;

var initDoc = function initDoc() {
  oDoc = Object(__WEBPACK_IMPORTED_MODULE_1_win_doc__["a" /* doc */])();
  oWin = Object(__WEBPACK_IMPORTED_MODULE_1_win_doc__["b" /* win */])();
  isWebkit = __WEBPACK_IMPORTED_MODULE_2_reshow_constant__["f" /* UNDEFINED */] !== Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(oDoc.webkitIsFullScreen);
  docEl = oDoc.documentElement;
};

var getScrollNode = function getScrollNode(el) {
  if (!oDoc) {
    initDoc();
  }

  if (!el && oDoc) {
    if (oDoc.scrollingElement) {
      el = oDoc.scrollingElement;
    } else if (isWebkit) {
      el = oDoc.body;
    } else {
      el = docEl;
    }
  }

  if (!el.id) {
    el.id = 'scroll-info-' + domCount;
    domCount++;
  }

  return el;
};

var getScrollInfo = function getScrollInfo(el, margin) {
  el = getScrollNode(el);

  if (!margin) {
    margin = 50;
  }

  var w;
  var h;
  var nodeName = (el.nodeName || '').toLowerCase();
  var isRoot = 'body' === nodeName || 'html' === nodeName;

  if (isRoot) {
    w = Math.max(docEl.clientWidth || 0, oWin.innerWidth || 0);
    h = Math.max(docEl.clientHeight || 0, oWin.innerHeight || 0);
  } else {
    w = el.clientWidth;
    h = el.clientHeight;
  }

  var scrollLeft = el.scrollLeft;
  var scrollHeight = el.scrollHeight;
  var scrollTop = el.scrollTop;
  var scrollWidth = el.scrollWidth;
  var scrollBottom = scrollTop + h;
  var scrollRight = scrollLeft + w;
  var elId = el.id;
  var lastScroll = lastScrollStore[elId];
  var info = {
    atTop: scrollTop < margin,
    atRight: scrollRight > scrollWidth - margin,
    atBottom: scrollBottom > scrollHeight - margin,
    atLeft: scrollLeft < margin,
    isScrollDown: lastScroll && scrollTop > lastScroll.top,
    isScrollLeft: lastScroll && scrollLeft < lastScroll.left,
    isScrollRight: lastScroll && scrollLeft > lastScroll.left,
    isScrollUp: lastScroll && scrollTop < lastScroll.top,
    scrollWidth: scrollWidth,
    scrollHeight: scrollHeight,
    scrollNodeWidth: w,
    scrollNodeHeight: h,
    top: scrollTop,
    right: scrollRight,
    bottom: scrollBottom,
    left: scrollLeft
  };
  lastScrollStore[elId] = info;
  return info;
};

/* harmony default export */ __webpack_exports__["a"] = (getScrollInfo);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ajaxDispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);



var instance = new __WEBPACK_IMPORTED_MODULE_0_reshow_flux__["a" /* Dispatcher */]();
/* harmony default export */ __webpack_exports__["b"] = (instance);
var ajaxDispatch = instance.dispatch.bind(instance);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ajaxDispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);



var instance = new __WEBPACK_IMPORTED_MODULE_0_reshow_flux__["a" /* Dispatcher */]();
/* harmony default export */ __webpack_exports__["b"] = (instance);
var ajaxDispatch = instance.dispatch.bind(instance);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);

var dispatcher = new __WEBPACK_IMPORTED_MODULE_0_reshow_flux__["a" /* Dispatcher */]();
/**
 * Dispatcher
 *
 * import dispatchServer from 'xxx';
 * const instance = new PageStore(dispatchServer);
 */

/* harmony default export */ __webpack_exports__["a"] = (dispatcher);
/**
 * Dispatch 
 *
 * import {dispatch} from 'xxx';
 * dispatch({xxx:xxx});
 */

var dispatch = dispatcher.dispatch;

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return myReturnOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyReturn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_return__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_stores_pageStore__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_stores_globalStore__ = __webpack_require__(103);






var storeLocator = function storeLocator(props) {
  return props.stores || [__WEBPACK_IMPORTED_MODULE_3__src_stores_pageStore__["a" /* default */]];
};

var globalStoreLocator = function globalStoreLocator(props) {
  return __WEBPACK_IMPORTED_MODULE_4__src_stores_globalStore__["a" /* globalStore */];
};

var myReturnOptions = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_1_reshow_return__["b" /* returnOptions */], {
  defaultProps: Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_1_reshow_return__["b" /* returnOptions */].defaultProps, {
    storeLocator: storeLocator,
    globalStoreLocator: globalStoreLocator
  })
});

var MyReturn = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_flux__["d" /* connectHook */])(__WEBPACK_IMPORTED_MODULE_1_reshow_return__["a" /* Return */], myReturnOptions);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40), __webpack_require__(17)))

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_organisms_AjaxLink__ = __webpack_require__(119);
/* unused harmony reexport AjaxLink */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_organisms_AjaxPage__ = __webpack_require__(136);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__ui_organisms_AjaxPage__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_organisms_AjaxForm__ = __webpack_require__(137);
/* unused harmony reexport AjaxForm */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_ajaxStore__ = __webpack_require__(33);
/* unused harmony reexport ajaxStore */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__stores_ajaxStore__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_urlStore__ = __webpack_require__(138);
/* unused harmony reexport urlStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ajaxDispatcher__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__ajaxDispatcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__urlDispatcher__ = __webpack_require__(46);
/* unused harmony reexport urlDispatch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_formSerialize__ = __webpack_require__(73);
/* unused harmony reexport formSerialize */
// Organisms


 // Stores


 // Dispatch


 // Util



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_constant__ = __webpack_require__(18);

var types = '|number|boolean|' + __WEBPACK_IMPORTED_MODULE_0_reshow_constant__["d" /* STRING */] + '|' + __WEBPACK_IMPORTED_MODULE_0_reshow_constant__["c" /* OBJECT */] + '|' + __WEBPACK_IMPORTED_MODULE_0_reshow_constant__["b" /* FUNCTION */] + '|' + __WEBPACK_IMPORTED_MODULE_0_reshow_constant__["f" /* UNDEFINED */] + '|';
/**
 * Do not use this.
 * The class name not reliable after code compress.
 */

var toBase = function toBase(type, name) {
  if (-1 === types.indexOf('|' + type + '|')) {
    if (!name) {
      name = type;
    }

    return name;
  } else {
    return type;
  }
};

var getTypeIs = function getTypeIs(val, name) {
  var type = Object.prototype.toString.call(val).replace(/^\[object\s(.*)\]$/, '$1').toLowerCase();
  return toBase(type, name);
};

var getTypeOf = function getTypeOf(val, name) {
  if (null == val) {
    return getTypeIs(val, name);
  }

  try {
    var type = Object.getPrototypeOf(val).constructor.name.toLowerCase();
    return toBase(type, name);
  } catch (ex) {
    return getTypeIs(val, name);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (getTypeOf);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initWorkerEvent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_es6_promise_auto__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_es6_promise_auto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_es6_promise_auto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_setimmediate__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_setimmediate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_setimmediate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_smooth_scroll_to__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_get_random_id__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ajaxDispatcher__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__urlDispatcher__ = __webpack_require__(46);








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

 // [RESHOW] Need keep if use "new Promise"










var empty = function empty() {};

var keys = Object.keys;
var wsAuth = Object(__WEBPACK_IMPORTED_MODULE_9_immutable__["Map"])();
var gWorker;
var fakeWorker = false;
var isWorkerReady;
var cbIndex = 0;
var Callbacks = [];

var initWorkerEvent = function initWorkerEvent(worker) {
  worker.addEventListener('message', function (e) {
    var sourceType = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(e, ['data', 'type']);

    switch (sourceType) {
      case 'ready':
        // fakeWorker will not run this
        gWorker = worker;
        isWorkerReady = true;
        break;

      default:
        Object(__WEBPACK_IMPORTED_MODULE_14__ajaxDispatcher__["a" /* ajaxDispatch */])(_objectSpread({}, e.data, {
          sourceType: sourceType,
          type: 'callback'
        }));
        break;
    }
  });
};

var initFakeWorker = function initFakeWorker() {
  __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 267)).then(function (workerObject) {
    fakeWorker = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["b" /* getDefault */])(workerObject);
    initWorkerEvent(fakeWorker);

    if (!gWorker) {
      gWorker = fakeWorker;
    }

    isWorkerReady = true;
  });
};

var handleUpdateNewUrl = function handleUpdateNewUrl(state, action, url) {
  setImmediate(function () {
    var preUrl = state.get('currentLocation');

    if (preUrl !== url) {
      var updateWithUrl = state.get('updateWithUrl');
      updateWithUrl(url);
    }

    var params = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params'], {});

    if (params.disableAjax && false !== params.scrollBack) {
      Object(__WEBPACK_IMPORTED_MODULE_12_smooth_scroll_to__["a" /* default */])(0);
    }
  });
  return state.set('currentLocation', url);
};

var AjaxStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxStore, _ReduceStore);

  function AjaxStore() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxStore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxStore)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "getRawUrl", function (params) {
      var _get = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(params, null, {}),
          url = _get.url,
          path = _get.path;

      if (!url) {
        if (path) {
          var baseUrl = _this.getState().get('baseUrl');

          if (!baseUrl) {
            baseUrl = '';
          }

          url = baseUrl + path;
        } else {
          url = '#';
        }
      }

      return url;
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      var updateWithUrl = function updateWithUrl(url) {
        Object(__WEBPACK_IMPORTED_MODULE_14__ajaxDispatcher__["a" /* ajaxDispatch */])({
          type: 'ajaxGet',
          params: {
            url: url,
            scrollBack: true
          }
        });
      };

      return Object(__WEBPACK_IMPORTED_MODULE_9_immutable__["Map"])({
        updateWithUrl: updateWithUrl
      });
    }
  }, {
    key: "cookAjaxUrl",
    value: function cookAjaxUrl(params, ajaxUrl, globalHeaders) {
      if (globalHeaders && !Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(params, ['ignoreGlobalHeaders'])) {
        if (globalHeaders.toJS) {
          params.globalHeaders = globalHeaders.toJS();
        } else {
          console.error('Global headers should be a map.', globalHeaders);
        }
      }

      var urls = ajaxUrl.split('#');
      var query = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(params, ['query'], {});

      if (urls[1]) {
        query['--hashState'] = urls[1];
      } // <!-- Clean key for fixed superagent error


      if (query) {
        keys(query).forEach(function (key) {
          if ('undefined' === typeof query[key]) {
            delete query[key];
          }
        });
        params.query = query;
      } // -->


      return urls[0];
    }
  }, {
    key: "getCallback",
    value: function getCallback(state, action, json, response) {
      var params = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params'], {});
      var callback;

      if (Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(json, ['data', 'errors']) || !Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(response, ['ok'])) {
        if (params.errorCallback) {
          callback = Callbacks[params.errorCallback];
          delete Callbacks[params.errorCallback];
        }
      }

      if (json.debugs) {
        var debugs = json.debugs;
        var bFail = false;
        __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, 268)).then(function (dlog) {
          dlog = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["b" /* getDefault */])(dlog);
          var oLog = new dlog({
            level: 'trace'
          });
          debugs.forEach(function (v) {
            var dump = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(oLog, [v[0]], function () {
              return oLog.info;
            });
            dump.call(oLog, v[1]);
          });
        });
        debugs.forEach(function (v) {
          if ('error' === v[1]) {
            bFail = true;
          }
        });

        if (bFail) {
          return empty;
        }
      }

      if (!callback) {
        if (params.callback) {
          callback = Callbacks[params.callback];
          delete Callbacks[params.callback];
        } else {
          callback = state.get('callback');
        }
      }

      return callback;
    }
  }, {
    key: "getJson",
    value: function getJson(text) {
      var json;

      try {
        json = JSON.parse(text);
      } catch (e) {
        json = {};
      }

      return json;
    }
  }, {
    key: "start",
    value: function start() {
      setImmediate(function () {
        Object(__WEBPACK_IMPORTED_MODULE_14__ajaxDispatcher__["a" /* ajaxDispatch */])({
          type: 'config/set',
          params: {
            isRunning: 1
          }
        });
      });
    }
  }, {
    key: "done",
    value: function done() {
      setImmediate(function () {
        Object(__WEBPACK_IMPORTED_MODULE_14__ajaxDispatcher__["a" /* ajaxDispatch */])({
          type: 'config/set',
          params: {
            isRunning: 0
          }
        });
      });
    }
  }, {
    key: "storeCallback",
    value: function storeCallback(action) {
      var cb = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params', 'callback']);

      if (cb) {
        var cbKey = 'cb' + cbIndex;
        Callbacks[cbKey] = cb;
        action.params.callback = cbKey;
        cbIndex++;
      }

      var err = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params', 'errorCallback']);

      if (err) {
        var errCbKey = 'err' + cbIndex;
        Callbacks[errCbKey] = err;
        action.params.errorCallback = errCbKey;
        cbIndex++;
      }

      return action;
    }
  }, {
    key: "worker",
    value: function worker(data) {
      if (isWorkerReady && fakeWorker) {
        setImmediate(function () {
          var disableWebWorker = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(data, ['action', 'params', 'disableWebWorker']);
          var run = disableWebWorker ? fakeWorker : gWorker;
          run.postMessage(data);
        });
      } else {
        var self = this;

        if (false === fakeWorker) {
          initFakeWorker();
          fakeWorker = null;
        }

        setTimeout(function () {
          return self.worker(data);
        }, 50);
      }
    }
  }, {
    key: "setWsAuth",
    value: function setWsAuth(key, data) {
      wsAuth = wsAuth.set(key, data);
    }
  }, {
    key: "getWsAuth",
    value: function getWsAuth(key) {
      if (!key) {
        return wsAuth.toJS();
      } else {
        return wsAuth.get(key).toJS();
      }
    }
  }, {
    key: "initWs",
    value: function initWs(state, action) {
      var params = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params'], {});
      var url = params.url;

      if (url) {
        this.worker({
          params: params,
          ws: url,
          type: 'initWs'
        });
      }

      return state;
    }
  }, {
    key: "closeWs",
    value: function closeWs(state, action) {
      var url = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params', 'url']);

      if (url) {
        this.worker({
          ws: url,
          type: 'closeWs'
        });
      }

      return state;
    }
  }, {
    key: "ajaxGet",
    value: function ajaxGet(state, action) {
      var self = this;
      var params = action.params;
      var rawUrl = self.getRawUrl(params);

      if (params.updateUrl && rawUrl !== document.URL) {
        Object(__WEBPACK_IMPORTED_MODULE_15__urlDispatcher__["b" /* urlDispatch */])({
          type: 'url',
          url: rawUrl
        });
      }

      if (params.disableAjax) {
        state = handleUpdateNewUrl(state, action, rawUrl);
        return state;
      }

      if (!params.disableProgress) {
        self.start();
      }

      setImmediate(function () {
        var ajaxUrl = self.cookAjaxUrl(params, rawUrl, state.get('globalHeaders'));

        if (!params.query) {
          params.query = {};
        }

        if (!params.disableRandom) {
          params.query['--r'] = Object(__WEBPACK_IMPORTED_MODULE_13_get_random_id__["a" /* default */])();
        } else {
          params.query['--r'] = state.get('staticVersion');
        }

        self.worker({
          type: 'ajaxGet',
          url: ajaxUrl,
          action: self.storeCallback(action)
        });
      });
      return state;
    }
  }, {
    key: "ajaxPost",
    value: function ajaxPost(state, action) {
      var self = this;
      var params = action.params;

      if (!params.disableProgress) {
        self.start();
      }

      var rawUrl = self.getRawUrl(params);
      var ajaxUrl = self.cookAjaxUrl(params, rawUrl, state.get('globalHeaders'));
      self.worker({
        type: 'ajaxPost',
        url: ajaxUrl,
        action: self.storeCallback(action)
      });
      return state;
    }
  }, {
    key: "applyCallback",
    value: function applyCallback(state, action) {
      var _this2 = this;

      var params = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params'], {});

      if (!params.disableProgress) {
        this.done();
      }

      var sourceType = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['sourceType']);
      var response = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['response']);
      var text = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['text']);
      var json = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['json'], function () {
        return _this2.getJson(text);
      });
      var callback = this.getCallback(state, action, json, response);
      var type = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(json, ['type']);
      var isRedirect = null;
      var url = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['url']);

      switch (type) {
        case 'ws-auth':
          this.setWsAuth(url, json);
          break;

        default:
          if ('ws' === sourceType) {
            json = {
              '--realTimeData--': json,
              '--realTimeUrl--': url
            };
          }

          setImmediate(function () {
            return isRedirect = callback(json, text, response);
          });
          break;
      }

      if (false !== isRedirect) {
        var loc = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(json, ['clientRedirectTo']);

        if (loc) {
          switch (Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(json, ['clientRedirectType'])) {
            case 'href':
              location.href = loc;
              break;

            case 'replace':
            default:
              location.replace(loc);
              break;
          }
        }
      }

      if (params.updateUrl && false !== params.scrollBack || params.scrollBack) {
        Object(__WEBPACK_IMPORTED_MODULE_12_smooth_scroll_to__["a" /* default */])(0);
      }

      return state;
    }
  }, {
    key: "updateWithUrl",
    value: function updateWithUrl(state, action) {
      var url = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(action, ['params', 'url'], document.URL);
      state = handleUpdateNewUrl(state, action, url);
      /**
       * "Do not change" toggleBfChange and bfApplyUrl
       * in other place, such as ajaxGet.
       * Because this state should only trigger with bfchange.
       */

      return state.set('toggleBfChange', !state.get('toggleBfChange')).set('bfApplyUrl', url);
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'ws/init':
          return this.initWs(state, action);

        case 'ws/close':
          return this.closeWs(state, action);

        case 'ajaxGet':
          return this.ajaxGet(state, action);

        case 'ajaxPost':
          return this.ajaxPost(state, action);

        case 'callback':
          return this.applyCallback(state, action);

        case 'updateWithUrl':
          return this.updateWithUrl(state, action);

        case 'config/set':
          return state.merge(action.params);

        default:
          return state;
      }
    }
  }]);

  return AjaxStore;
}(__WEBPACK_IMPORTED_MODULE_10_reshow_flux__["b" /* ReduceStore */]);

/* harmony default export */ __webpack_exports__["a"] = (new AjaxStore(__WEBPACK_IMPORTED_MODULE_14__ajaxDispatcher__["b" /* default */]));


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Store__ = __webpack_require__(122);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__Store__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Store__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Dispatcher__ = __webpack_require__(124);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Dispatcher__["a"]; });



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_constant__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_array_merge__ = __webpack_require__(71);





var buildFunc = function buildFunc(component, props, child) {
  // anonymous function will call directly
  if (__WEBPACK_IMPORTED_MODULE_2_reshow_constant__["b" /* FUNCTION */] === Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(component) && !component.name) {
    try {
      if (child != null) {
        props.children = child;
      }

      return component(props);
    } catch (e) {
      if (e.name === 'TypeError') {
        return buildReact(component, props, child);
      } else {
        throw e;
      }
    }
  } else {
    return buildReact(component, props, child);
  }
};

var buildReact = function buildReact(component, props, child) {
  var params = [component, props];

  if (child != null) {
    params.push(child);
  }

  return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["isValidElement"])(component) ? __WEBPACK_IMPORTED_MODULE_1_react__["cloneElement"] : __WEBPACK_IMPORTED_MODULE_1_react__["createElement"]).apply(null, params);
};

var build = function build(component) {
  return function (props, child) {
    if (!component) {
      return null;
    }

    props = Object(__WEBPACK_IMPORTED_MODULE_3_array_merge__["b" /* removeEmpty */])(props, true);

    var run = function run(comp) {
      return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["isValidElement"])(comp) ? buildReact : buildFunc)(comp, props, child);
    };

    return component.map ? __WEBPACK_IMPORTED_MODULE_1_react__["Children"].map(component.map(function (comp) {
      return run(comp);
    }), function (c) {
      return c;
    }) : run(component);
  };
};

/* harmony default export */ __webpack_exports__["a"] = (build);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export initAjaxWorkerEvent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_es6_promise_auto__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_es6_promise_auto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_es6_promise_auto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_setimmediate__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_setimmediate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_setimmediate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_immutable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_smooth_scroll_to__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_get_random_id__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_call_func__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ajaxDispatcher__ = __webpack_require__(27);








 // [RESHOW] Need keep if use "new Promise"










var empty = function empty() {};

var keys = Object.keys;
var wsAuth = Object(__WEBPACK_IMPORTED_MODULE_10_immutable__["Map"])();
var gWorker;
var fakeWorker = false;
var isWorkerReady;
var cbIndex = 0;
var Callbacks = [];

var initWorkerEvent = function initWorkerEvent(worker) {
  worker.addEventListener('message', function (e) {
    var sourceType = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(e, ['data', 'type']);

    switch (sourceType) {
      case 'ready':
        // fakeWorker will not run this
        gWorker = worker;
        isWorkerReady = true;
        break;

      default:
        Object(__WEBPACK_IMPORTED_MODULE_16__ajaxDispatcher__["a" /* ajaxDispatch */])(Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, e.data, {
          sourceType: sourceType,
          type: 'callback'
        }));
        break;
    }
  });
};

var initFakeWorker = function initFakeWorker() {
  __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 270)).then(function (workerObject) {
    fakeWorker = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["b" /* getDefault */])(workerObject);
    initWorkerEvent(fakeWorker);

    if (!gWorker) {
      gWorker = fakeWorker;
    }

    isWorkerReady = true;
  });
};

var handleUpdateNewUrl = function handleUpdateNewUrl(state, action, url) {
  setImmediate(function () {
    var preUrl = state.get('currentLocation');

    if (preUrl !== url) {
      var onUrlChange = state.get('onUrlChange');
      Object(__WEBPACK_IMPORTED_MODULE_15_call_func__["a" /* default */])(onUrlChange, [url]);
    }

    var params = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params'], {});

    if (params.disableAjax && false !== params.scrollBack) {
      Object(__WEBPACK_IMPORTED_MODULE_13_smooth_scroll_to__["a" /* default */])(0);
    }
  });
  return state.set('currentLocation', url);
};

var AjaxStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxStore, _ReduceStore);

  function AjaxStore() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxStore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxStore)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "getRawUrl", function (params) {
      var _get = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(params, null, {}),
          url = _get.url,
          path = _get.path;

      if (!url) {
        if (path) {
          var baseUrl = _this.getState().get('baseUrl');

          if (!baseUrl) {
            baseUrl = '';
          }

          url = baseUrl + path;
        } else {
          url = '#';
        }
      }

      return url;
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      var onUrlChange = function onUrlChange(url) {
        Object(__WEBPACK_IMPORTED_MODULE_16__ajaxDispatcher__["a" /* ajaxDispatch */])({
          type: 'ajaxGet',
          params: {
            url: url,
            scrollBack: true
          }
        });
      };

      return Object(__WEBPACK_IMPORTED_MODULE_10_immutable__["Map"])({
        onUrlChange: onUrlChange
      });
    }
  }, {
    key: "cookAjaxUrl",
    value: function cookAjaxUrl(params, ajaxUrl, globalHeaders) {
      if (globalHeaders && !Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(params, ['ignoreGlobalHeaders'])) {
        if (globalHeaders.toJS) {
          params.globalHeaders = globalHeaders.toJS();
        } else {
          console.error('Global headers should be a map.', globalHeaders);
        }
      }

      var urls = ajaxUrl.split('#');
      var query = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(params, ['query'], {});

      if (urls[1]) {
        query['--hashState'] = urls[1];
      } // <!-- Clean key for fixed superagent error


      if (query) {
        keys(query).forEach(function (key) {
          if ('undefined' === typeof query[key]) {
            delete query[key];
          }
        });
        params.query = query;
      } // -->


      return urls[0];
    }
  }, {
    key: "getCallback",
    value: function getCallback(state, action, json, response) {
      var params = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params'], {});
      var callback;

      if (Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(json, ['data', 'errors']) || !Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(response, ['ok'])) {
        if (params.errorCallback) {
          callback = Callbacks[params.errorCallback];
          delete Callbacks[params.errorCallback];
        }
      }

      if (json.debugs) {
        var debugs = json.debugs;
        var bFail = false;
        __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 271)).then(function (dlog) {
          dlog = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["b" /* getDefault */])(dlog);
          var oLog = new dlog({
            level: 'trace'
          });
          debugs.forEach(function (v) {
            var dump = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(oLog, [v[0]], function () {
              return oLog.info;
            });
            dump.call(oLog, v[1]);
          });
        });
        debugs.forEach(function (v) {
          if ('error' === v[1]) {
            bFail = true;
          }
        });

        if (bFail) {
          return empty;
        }
      }

      if (!callback) {
        if (params.callback) {
          callback = Callbacks[params.callback];
          delete Callbacks[params.callback];
        } else {
          callback = state.get('callback');
        }
      }

      return callback;
    }
  }, {
    key: "getJson",
    value: function getJson(text) {
      var json;

      try {
        json = JSON.parse(text);
      } catch (e) {
        json = {};
      }

      return json;
    }
  }, {
    key: "start",
    value: function start() {
      setImmediate(function () {
        Object(__WEBPACK_IMPORTED_MODULE_16__ajaxDispatcher__["a" /* ajaxDispatch */])({
          type: 'config/set',
          params: {
            isRunning: 1
          }
        });
      });
    }
  }, {
    key: "done",
    value: function done() {
      setImmediate(function () {
        Object(__WEBPACK_IMPORTED_MODULE_16__ajaxDispatcher__["a" /* ajaxDispatch */])({
          type: 'config/set',
          params: {
            isRunning: 0
          }
        });
      });
    }
  }, {
    key: "storeCallback",
    value: function storeCallback(action) {
      var cb = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params', 'callback']);

      if (cb) {
        var cbKey = 'cb' + cbIndex;
        Callbacks[cbKey] = cb;
        action.params.callback = cbKey;
        cbIndex++;
      }

      var err = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params', 'errorCallback']);

      if (err) {
        var errCbKey = 'err' + cbIndex;
        Callbacks[errCbKey] = err;
        action.params.errorCallback = errCbKey;
        cbIndex++;
      }

      return action;
    }
  }, {
    key: "worker",
    value: function worker(data) {
      if (isWorkerReady && fakeWorker) {
        setImmediate(function () {
          var disableWebWorker = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(data, ['action', 'params', 'disableWebWorker']);
          var run = disableWebWorker ? fakeWorker : gWorker;
          run.postMessage(data);
        });
      } else {
        var self = this;

        if (false === fakeWorker) {
          initFakeWorker();
          fakeWorker = null;
        }

        setTimeout(function () {
          return self.worker(data);
        }, 50);
      }
    }
  }, {
    key: "setWsAuth",
    value: function setWsAuth(key, data) {
      wsAuth = wsAuth.set(key, data);
    }
  }, {
    key: "getWsAuth",
    value: function getWsAuth(key) {
      if (!key) {
        return wsAuth.toJS();
      } else {
        return wsAuth.get(key).toJS();
      }
    }
  }, {
    key: "initWs",
    value: function initWs(state, action) {
      var params = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params'], {});
      var url = params.url;

      if (url) {
        this.worker({
          params: params,
          ws: url,
          type: 'initWs'
        });
      }

      return state;
    }
  }, {
    key: "closeWs",
    value: function closeWs(state, action) {
      var url = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params', 'url']);

      if (url) {
        this.worker({
          ws: url,
          type: 'closeWs'
        });
      }

      return state;
    }
  }, {
    key: "ajaxGet",
    value: function ajaxGet(state, action) {
      var self = this;
      var params = action.params;
      var rawUrl = self.getRawUrl(params);

      if (params.updateUrl && this.urlDispatch && rawUrl !== document.URL) {
        this.urlDispatch({
          type: 'url',
          url: rawUrl
        });
      }

      if (params.disableAjax) {
        return handleUpdateNewUrl(state, action, rawUrl);
      }

      if (!params.disableProgress) {
        self.start();
      }

      setImmediate(function () {
        var ajaxUrl = self.cookAjaxUrl(params, rawUrl, state.get('globalHeaders'));

        if (!params.query) {
          params.query = {};
        }

        if (!params.disableRandom) {
          params.query['--r'] = Object(__WEBPACK_IMPORTED_MODULE_14_get_random_id__["a" /* default */])();
        } else {
          params.query['--r'] = state.get('staticVersion');
        }

        self.worker({
          type: 'ajaxGet',
          url: ajaxUrl,
          action: self.storeCallback(action)
        });
      });
      return state;
    }
  }, {
    key: "ajaxPost",
    value: function ajaxPost(state, action) {
      var self = this;
      var params = action.params;

      if (!params.disableProgress) {
        self.start();
      }

      var rawUrl = self.getRawUrl(params);
      var ajaxUrl = self.cookAjaxUrl(params, rawUrl, state.get('globalHeaders'));
      self.worker({
        type: 'ajaxPost',
        url: ajaxUrl,
        action: self.storeCallback(action)
      });
      return state;
    }
  }, {
    key: "applyCallback",
    value: function applyCallback(state, action) {
      var _this2 = this;

      var params = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params'], {});

      if (!params.disableProgress) {
        this.done();
      }

      var sourceType = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['sourceType']);
      var response = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['response']);
      var text = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['text']);
      var json = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['json'], function () {
        return _this2.getJson(text);
      });
      var callback = this.getCallback(state, action, json, response);
      var type = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(json, ['type']);
      var isRedirect = null;
      var url = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['url']);

      switch (type) {
        case 'ws-auth':
          this.setWsAuth(url, json);
          break;

        default:
          if ('ws' === sourceType) {
            json = {
              '--realTimeData--': json,
              '--realTimeUrl--': url
            };
          }

          setImmediate(function () {
            return isRedirect = callback(json, text, response);
          });
          break;
      }

      if (false !== isRedirect) {
        var loc = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(json, ['clientRedirectTo']);

        if (loc) {
          switch (Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(json, ['clientRedirectType'])) {
            case 'href':
              location.href = loc;
              break;

            case 'replace':
            default:
              location.replace(loc);
              break;
          }
        }
      }

      if (params.updateUrl && false !== params.scrollBack || params.scrollBack) {
        Object(__WEBPACK_IMPORTED_MODULE_13_smooth_scroll_to__["a" /* default */])(0);
      }

      return state;
    }
  }, {
    key: "handleUrlChange",
    value: function handleUrlChange(state, action) {
      var url = Object(__WEBPACK_IMPORTED_MODULE_12_get_object_value__["a" /* default */])(action, ['params', 'url'], document.URL);
      state = handleUpdateNewUrl(state, action, url);
      /**
       * "Do not change" toggleBfChange and bfApplyUrl
       * in other place, such as ajaxGet.
       * Because this state should only trigger with bfchange.
       */

      return state.set('toggleBfChange', !state.get('toggleBfChange')).set('bfApplyUrl', url);
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'ws/init':
          return this.initWs(state, action);

        case 'ws/close':
          return this.closeWs(state, action);

        case 'ajaxGet':
          return this.ajaxGet(state, action);

        case 'ajaxPost':
          return this.ajaxPost(state, action);

        case 'urlChange':
          return this.handleUrlChange(state, action);

        case 'callback':
          return this.applyCallback(state, action);

        case 'config/set':
          return state.merge(action.params);

        default:
          return state;
      }
    }
  }]);

  return AjaxStore;
}(__WEBPACK_IMPORTED_MODULE_11_reshow_flux__["b" /* ReduceStore */]);

/* harmony default export */ __webpack_exports__["a"] = (new AjaxStore(__WEBPACK_IMPORTED_MODULE_16__ajaxDispatcher__["b" /* default */]));


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_win_doc__ = __webpack_require__(19);

var stylesStore;
var oWin = Object(__WEBPACK_IMPORTED_MODULE_0_win_doc__["b" /* win */])();
var g = oWin ? oWin : global;

if (g.reactStylesStore) {
  stylesStore = g.reactStylesStore;
} else {
  stylesStore = g.reactStylesStore = {
    registry: [],
    newStyles: [],
    mods: [],
    counter: 0
  };
}

/* harmony default export */ __webpack_exports__["a"] = (stylesStore);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(40)))

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Label = function Label(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'label');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Label);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mouse */
/* unused harmony export toSvgXY */
/* unused harmony export getSvgMatrixXY */
/* unused harmony export unifyTouch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_get_scroll_info__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_constant__ = __webpack_require__(18);





var unifyTouch = function unifyTouch(e) {
  return e && e.changedTouches ? Object(__WEBPACK_IMPORTED_MODULE_2_get_object_value__["a" /* default */])(e, ['changedTouches', 0]) : e;
};

var mouse = function mouse(e, dom, scrollNode) {
  if (!dom) {
    dom = e.currentTarget || e.target;
  }

  e = unifyTouch(e);
  var x = e.clientX;
  var y = e.clientY;
  var svgXY = toSvgXY(dom)(x, y);

  if (false !== svgXY) {
    var svgX = svgXY.x,
        svgY = svgXY.y;
    return [svgX, svgY];
  } else {
    var domXY = getOffset(dom, scrollNode);
    return [x - domXY.left - dom.clientLeft, y - domXY.top - dom.clientTop];
  }
};

var toSvgXY = function toSvgXY(dom, zoom) {
  return function (x, y) {
    var svg = dom.ownerSVGElement || dom;

    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = x;
      point.y = y;
      point = point.matrixTransform(dom.getScreenCTM().inverse());
      return getZoomXY(zoom)(point.x, point.y);
    } else {
      return false;
    }
  };
};

var getSvgMatrixXY = function getSvgMatrixXY(dom, zoom) {
  return function (x, y) {
    var svg = dom.ownerSVGElement || dom;

    if (svg.getScreenCTM) {
      var _dom$getScreenCTM = dom.getScreenCTM(),
          a = _dom$getScreenCTM.a,
          b = _dom$getScreenCTM.b,
          c = _dom$getScreenCTM.c,
          d = _dom$getScreenCTM.d,
          e = _dom$getScreenCTM.e,
          f = _dom$getScreenCTM.f;

      var _svg$getBoundingClien = svg.getBoundingClientRect(),
          left = _svg$getBoundingClien.left,
          top = _svg$getBoundingClien.top;

      var svgX = a * x + c * y + e - left;
      var svgY = b * x + d * y + f - top;
      return getZoomXY(zoom)(svgX, svgY);
    }
  };
};

var getZoomXY = function getZoomXY(zoom) {
  return function (x, y) {
    if (!zoom) {
      return {
        x: x,
        y: y
      };
    }

    var zoomK = Object(__WEBPACK_IMPORTED_MODULE_2_get_object_value__["a" /* default */])(zoom, ['k'], 1);
    var zoomX = Object(__WEBPACK_IMPORTED_MODULE_2_get_object_value__["a" /* default */])(zoom, ['x'], 0);
    var zoomY = Object(__WEBPACK_IMPORTED_MODULE_2_get_object_value__["a" /* default */])(zoom, ['y'], 0);
    var zx = (x - zoomX) / zoomK;
    var zy = (y - zoomY) / zoomK;
    return {
      x: zx,
      y: zy
    };
  };
};

var getRectWithElOffset = function getRectWithElOffset(dom) {
  var top = 0;
  var left = 0;
  var el = dom;

  do {
    var offsetTop = el.offsetTop || 0;
    var offsetLeft = el.offsetLeft || 0;

    if ('BODY' === el.nodeName) {
      top += offsetTop;
      left += offsetLeft;
    } else {
      top += offsetTop - el.scrollTop;
      left += offsetLeft - el.scrollLeft;
    }

    el = el.offsetParent;
  } while (el);

  return {
    top: top,
    left: left
  };
};

var getOffset = function getOffset(dom, scrollNode) {
  var top = 0;
  var left = 0;
  var w;
  var h;
  var scrollInfo = 0 === scrollNode ? {
    top: 0,
    left: 0
  } : Object(__WEBPACK_IMPORTED_MODULE_1_get_scroll_info__["a" /* default */])(scrollNode);

  if (__WEBPACK_IMPORTED_MODULE_3_reshow_constant__["f" /* UNDEFINED */] !== (typeof SVGElement === "undefined" ? "undefined" : Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(SVGElement)) && dom instanceof SVGElement) {
    var rect = dom.getBoundingClientRect();
    top = rect.top + scrollInfo.top;
    left = rect.left + scrollInfo.left;
    w = rect.width;
    h = rect.height;
  } else {
    w = dom.offsetWidth;
    h = dom.offsetHeight;

    if (dom.getBoundingClientRect) {
      var _rect = dom.getBoundingClientRect();

      top = parseInt(_rect.top + scrollInfo.top, 10);
      left = parseInt(_rect.left + scrollInfo.left, 10);
    } else {
      var rectOffset = getRectWithElOffset(dom);
      top = rectOffset.top;
      left = rectOffset.left;
    }
  }

  var result = {
    w: w,
    h: h,
    width: w,
    height: h,
    top: top,
    right: left + w,
    bottom: top + h,
    left: left
  };
  return result;
};


/* harmony default export */ __webpack_exports__["a"] = (getOffset);

/***/ }),
/* 40 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');

module.exports = __webpack_require__(108).polyfill();


/***/ }),
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var dedup = function dedup(array) {
    if (!array || !array.filter) {
        return array;
    }
    return array.filter(function (item, pos, arr) {
        return arr.indexOf(item) === pos;
    });
};

exports.default = dedup;
module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_scroll_info__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_easing_lib_easeInOutCubic__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_easing_lib_easeInOutCubic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_easing_lib_easeInOutCubic__);


var isRunning = false;

var _call = function _call(func, scrollNode) {
  return function () {
    if ('function' !== typeof func) {
      return;
    }

    func(scrollNode);
  };
};
/**
 *  !!Important!! any logic change need take care isRunning
 */


var smoothScrollTo = function smoothScrollTo(to, duration, el, callback) {
  var scrollNode = Object(__WEBPACK_IMPORTED_MODULE_0_get_scroll_info__["b" /* getScrollNode */])(el);

  var cb = _call(callback, scrollNode);

  if (isRunning) {
    isRunning = false;
    setTimeout(function () {
      scrollNode.scrollTop = to;
      cb();
    });
    return false;
  }

  if (!duration) {
    duration = 900;
  }

  var from = scrollNode.scrollTop;
  var go = to - from;

  if (!go) {
    isRunning = false;
    cb();
    return;
  }

  var beginTimeStamp;

  var scrollTo = function scrollTo(timeStamp) {
    beginTimeStamp = beginTimeStamp || timeStamp;
    var elapsedTime = timeStamp - beginTimeStamp;
    var progress = __WEBPACK_IMPORTED_MODULE_1_easing_lib_easeInOutCubic___default()(elapsedTime, from, go, duration);
    scrollNode.scrollTop = progress;

    if (elapsedTime < duration && go && isRunning) {
      requestAnimationFrame(scrollTo);
    } else {
      isRunning = false;
      cb();
    }
  };

  isRunning = true;
  requestAnimationFrame(scrollTo);
};

/* harmony default export */ __webpack_exports__["a"] = (smoothScrollTo);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return urlDispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);

var dispatcher = new __WEBPACK_IMPORTED_MODULE_0_reshow_flux__["a" /* Dispatcher */]();
/**
 * Dispatcher
 */

/* harmony default export */ __webpack_exports__["a"] = (dispatcher);
/**
 * Dispatch 
 *
 * import {urlDispatch} from 'reshow';
 * urlDispatch({xxx:yyy});
 */

var urlDispatch = dispatcher.dispatch;

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr) || !Array.from) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (toConsumableArray);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var replaceValue = function replaceValue(obj, arrKey, val, isAppend) {
  var last = arrKey.pop();
  arrKey.forEach(function (k) {
    obj[k] = obj[k] || {};
    obj = obj[k];
  });

  if (isAppend && (!obj[last] || !obj[last].push)) {
    if (!obj[last]) {
      obj[last] = [val];
    } else {
      obj[last] = [obj[last], val];
    }
  } else if (isAppend && obj[last].push) {
    obj[last].push(val);
  } else {
    obj[last] = val;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (replaceValue);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toJS__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__toJS__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__returnOptions__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__returnOptions__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_organisms_Return__ = __webpack_require__(146);
/* unused harmony reexport default */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__ui_organisms_Return__["a"]; });




/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dispatcher__ = __webpack_require__(28);







var keys = Object.keys;

var PageStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(PageStore, _ReduceStore);

  function PageStore() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PageStore);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PageStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(PageStore, [{
    key: "getThemePath",
    value: function getThemePath() {
      var state = this.getState();
      var themePath = state.get('themePath');

      if (!themePath) {
        themePath = state.get('defaultThemePath');
      }

      return themePath;
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'config/set':
          return state.merge(action.params);

        case 'config/reset':
          return state.clear().merge(action.params);

        case 'realTime':
          return state;

        default:
          if (keys(action)) {
            return state.merge(action);
          } else {
            return state;
          }

      }
    }
  }]);

  return PageStore;
}(__WEBPACK_IMPORTED_MODULE_5_reshow_flux__["b" /* ReduceStore */]); // Export a singleton instance of the store


/* harmony default export */ __webpack_exports__["a"] = (new PageStore(__WEBPACK_IMPORTED_MODULE_6__dispatcher__["a" /* default */]));

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return localStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sessionStorage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Storage__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_constant__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__Storage__["a"]; });






var getStorage = function getStorage(storageType) {
  return function (key) {
    return function (value) {
      var oWin = Object(__WEBPACK_IMPORTED_MODULE_3_win_doc__["b" /* win */])();

      if (!oWin) {
        return;
      }

      var store = Object(__WEBPACK_IMPORTED_MODULE_1_get_object_value__["a" /* default */])(oWin, [storageType]);

      if (__WEBPACK_IMPORTED_MODULE_4_reshow_constant__["f" /* UNDEFINED */] === Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(store)) {
        console.warn('Not support. [' + storageType + ']');
        return;
      }

      if (__WEBPACK_IMPORTED_MODULE_4_reshow_constant__["f" /* UNDEFINED */] === Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(value)) {
        return store.getItem(key);
      } else {
        try {
          return store.setItem(key, value);
        } catch (err) {
          store.clear();
          return store.setItem(key, value);
        }
      }
    };
  };
};

var localStorage = getStorage('localStorage');
var sessionStorage = getStorage('sessionStorage');


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export storageDispatch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);

var dispatcher = new __WEBPACK_IMPORTED_MODULE_0_reshow_flux__["a" /* Dispatcher */]();
/**
 * Dispatcher
 */

/* harmony default export */ __webpack_exports__["a"] = (dispatcher);
/**
 * Dispatch 
 *
 * import {storageDispatch} from 'reshow';
 * storageDispatch({xxx:yyy});
 */

var storageDispatch = dispatcher.dispatch;

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__AnimateGroup__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_keyframe_css__ = __webpack_require__(235);














var inject = {};

var Animate =
/*#__PURE__*/
function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_inherits__["a" /* default */])(Animate, _Component);

  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_createClass__["a" /* default */])(Animate, [{
    key: "init",
    value: function init(key, ani, timeout) {
      Object(__WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__["reactStyle"])(Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
        animationName: [ani],
        animationDuration: [timeout * 1 + 30 + 'ms']
      }, Styles.linear), '.' + key, key); // Need locate after reactStyle, for inject latest style in getKeyframe function

      Object(__WEBPACK_IMPORTED_MODULE_13_keyframe_css__["a" /* default */])(ani);
      inject[key] = true;
    }
  }, {
    key: "parseAniValue",
    value: function parseAniValue(s) {
      var data = s.split('-');
      var name = data[0];
      var timeout = 500;
      var delay = 0;

      if (!isNaN(data[1])) {
        timeout = parseInt(data[1], 10);
      }

      if (!isNaN(data[2])) {
        delay = parseInt(data[2], 10);
      }

      var key = [name, timeout, delay].join('-');
      return {
        className: key + ' ' + name,
        key: key,
        name: name,
        timeout: timeout,
        delay: delay
      };
    }
  }, {
    key: "update",
    value: function update(props) {
      var appear = props.appear,
          enter = props.enter,
          leave = props.leave;
      var data;

      if (appear) {
        data = this.parseAniValue(appear);
        this.appear = data.name;
        this.appearKey = data.key;
        this.appearTimeout = data.timeout;
        this.appearDelay = data.delay;
        this.appearClass = data.className;
      }

      if (enter) {
        data = this.parseAniValue(enter);
        this.enter = data.name;
        this.enterKey = data.key;
        this.enterTimeout = data.timeout;
        this.enterDelay = data.delay;
        this.enterClass = data.className;
      }

      if (leave) {
        data = this.parseAniValue(leave);
        this.leave = data.name;
        this.leaveKey = data.key;
        this.leaveTimeout = data.timeout;
        this.leaveDelay = data.delay;
        this.leaveClass = data.className;
      }
    }
  }, {
    key: "updateClient",
    value: function updateClient(props) {
      if ('undefined' === typeof document) {
        return;
      }

      var appear = props.appear,
          enter = props.enter,
          leave = props.leave;

      if (appear) {
        if (!inject[this.appearKey]) {
          this.init(this.appearKey, this.appear, this.appearTimeout);
        }
      }

      if (enter) {
        if (!inject[this.enterKey]) {
          this.init(this.enterKey, this.enter, this.enterTimeout);
        }
      }

      if (leave) {
        if (!inject[this.leaveKey]) {
          this.init(this.leaveKey, this.leave, this.leaveTimeout);
        }
      }
    }
  }]);

  function Animate(props) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Animate);

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Animate).call(this, props));

    Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "state", {
      receive: false
    });

    _this.update(props);

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_createClass__["a" /* default */])(Animate, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var receive = nextState.receive;

      if (receive !== this.state.receive) {
        this.update(nextProps);
        this.updateClient(nextProps);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateClient(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appear = _this$props.appear,
          enter = _this$props.enter,
          leave = _this$props.leave,
          others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["appear", "enter", "leave"]);

      return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__AnimateGroup__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
        timeout: {
          appear: this.appearTimeout,
          enter: this.enterTimeout,
          exit: this.leaveTimeout
        },
        delay: {
          appear: this.appearDelay,
          enter: this.enterDelay,
          exit: this.leaveDelay
        },
        classNames: {
          appear: this.appearClass,
          enter: this.enterClass,
          exit: this.leaveClass
        },
        appear: !!appear,
        enter: !!enter,
        exit: !!leave
      }, others));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        receive: !prevState.receive
      };
    }
  }]);

  return Animate;
}(__WEBPACK_IMPORTED_MODULE_10_react__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Animate, "defaultProps", {
  component: __WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__["SemanticUI"],
  appear: null,
  enter: null,
  leave: null
});

/* harmony default export */ __webpack_exports__["a"] = (Animate);
var Styles = {
  linear: {
    animationIterationCount: [1],
    animationTimingFunction: ['linear']
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getClassReg = __webpack_require__(91);

var _getClassReg2 = _interopRequireDefault(_getClassReg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasClass = function hasClass(classes, name) {
    return (0, _getClassReg2.default)(name).test(classes);
};

exports.default = hasClass;
module.exports = exports['default'];

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export reInjectStyle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stylesToCSS__ = __webpack_require__(204);





var reInjectStyle = function reInjectStyle() {
  __WEBPACK_IMPORTED_MODULE_2__store_js__["a" /* default */].newStyles = Object.values(__WEBPACK_IMPORTED_MODULE_2__store_js__["a" /* default */].registry);
  injectStyle();
};

var appendCss = function appendCss(css) {
  var oDoc = Object(__WEBPACK_IMPORTED_MODULE_1_win_doc__["a" /* doc */])();
  var tag = oDoc.createElement('style');
  tag.innerHTML = css;
  oDoc.getElementsByTagName('head')[0].appendChild(tag);
};

var injectStyle = function injectStyle() {
  if (!__WEBPACK_IMPORTED_MODULE_2__store_js__["a" /* default */].newStyles.length) {
    // We are in Node or Styles are already injected
    return null;
  }

  var compiled = Object(__WEBPACK_IMPORTED_MODULE_3__stylesToCSS__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__store_js__["a" /* default */].newStyles);
  __WEBPACK_IMPORTED_MODULE_2__store_js__["a" /* default */].newStyles = [];
  __WEBPACK_IMPORTED_MODULE_2__store_js__["a" /* default */].registry = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_2__store_js__["a" /* default */].registry, {}, compiled.styleIds);

  if (compiled.css) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1_win_doc__["a" /* doc */])().URL) {
      appendCss(compiled.css);
    } else {
      console.log(compiled.css);
    }
  }
};


/* harmony default export */ __webpack_exports__["a"] = (injectStyle);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__ = __webpack_require__(14);







var Icon = function Icon(props) {
  var className = props.className,
      style = props.style,
      others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["className", "style"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_4_class_lib__["mixClass"])(className, 'icon');
  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
    atom: "i",
    ui: false
  }, others, {
    className: className,
    style: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
      display: 'inline-block'
    }, style)
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Icon);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ucfirst__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ucfirst___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ucfirst__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cssNumberToUnit__ = __webpack_require__(224);




var isArray = Array.isArray;
var keys = Object.keys;
var Browser = {
  webkit: 'Webkit',
  ms: 'ms',
  moz: 'Moz'
};

var genStyleId = function genStyleId() {
  __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].counter += 1;
  return 'c' + __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].counter + '_';
};

var createStyle = function createStyle(css, selector, styleId) {
  if (!css) {
    return;
  }

  if ('undefined' === typeof styleId) {
    styleId = genStyleId();
  } else if (__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].registry[styleId]) {
    return __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].registry[styleId];
  }

  if (!isArray(css)) {
    css = [css];
  }

  var styles = [];
  css.forEach(function (one, i) {
    styles[i] = {};
    keys(one).forEach(function (key) {
      if (isArray(one[key]) && 1 === one[key].length) {
        var ucFirstKey = __WEBPACK_IMPORTED_MODULE_0_ucfirst___default()(key);
        styles[i][Browser.webkit + ucFirstKey] = styles[i][Browser.ms + ucFirstKey] = styles[i][Browser.moz + ucFirstKey] = styles[i][key] = Object(__WEBPACK_IMPORTED_MODULE_3__cssNumberToUnit__["a" /* default */])(key, one[key][0]);
      } else {
        styles[i][key] = Object(__WEBPACK_IMPORTED_MODULE_3__cssNumberToUnit__["a" /* default */])(key, one[key]);
      }
    });
  });
  var styleDecl = new __WEBPACK_IMPORTED_MODULE_1__style__["a" /* default */](styles, selector, styleId);
  __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].newStyles.push(styleDecl);
  return styleDecl;
};

/* harmony default export */ __webpack_exports__["a"] = (createStyle); // reactStyle('', '', '')

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_organism_react_animate__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_get_scroll_info__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_getoffset__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_array_merge__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_call_func__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_reshow_constant__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__molecules_PopupOverlay__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_index__ = __webpack_require__(21);












__webpack_require__(30);















/**
 * 1. if you need trace show: true
 * it extend from PopupOverlay
 *
 * 2. if you don't auto append Content component
 * you could pass center or content to equla false
 */

var PopupModal =
/*#__PURE__*/
function (_PopupOverlay) {
  Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupModal, _PopupOverlay);

  function PopupModal() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupModal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_10_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleClick", function () {
      _this.close();
    });

    Object(__WEBPACK_IMPORTED_MODULE_10_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleModalRefCb", function (el) {
      _this.el = el;

      _this.reCalculate();
    });

    Object(__WEBPACK_IMPORTED_MODULE_10_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleModalClick", function (cb) {
      return function (e) {
        e.stopPropagation();
        Object(__WEBPACK_IMPORTED_MODULE_20_call_func__["a" /* default */])(cb, [e]);
      };
    });

    Object(__WEBPACK_IMPORTED_MODULE_10_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "reCalculate", function () {
      setImmediate(function () {
        if (_this.el) {
          var domInfo = Object(__WEBPACK_IMPORTED_MODULE_16_getoffset__["a" /* default */])(_this.el);

          if (domInfo) {
            var domHalfHeight = domInfo.h / 2;
            var marginTop = Math.floor(1 - domHalfHeight);

            var _getScrollInfo = Object(__WEBPACK_IMPORTED_MODULE_15_get_scroll_info__["a" /* default */])(),
                scrollNodeHeight = _getScrollInfo.scrollNodeHeight;

            var maskStyle = {};

            if (domInfo.h * 3 > scrollNodeHeight) {
              marginTop = 0;
            }

            if (domInfo.h + 30 > scrollNodeHeight) {
              maskStyle = Styles.flexAlignTop;
            }

            var _this$state = _this.state,
                orgModalStyle = _this$state.modalStyle,
                orgMaskStyle = _this$state.maskStyle;

            if (Object(__WEBPACK_IMPORTED_MODULE_17_get_object_value__["a" /* default */])(orgModalStyle, ['marginTop']) !== marginTop || Object(__WEBPACK_IMPORTED_MODULE_17_get_object_value__["a" /* default */])(orgMaskStyle, ['justifyContent']) !== maskStyle.justifyContent) {
              _this.setState(function (_ref) {
                var modalStyle = _ref.modalStyle;
                modalStyle = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, modalStyle, {
                  marginTop: marginTop
                });
                return {
                  maskStyle: maskStyle,
                  modalStyle: modalStyle
                };
              });
            }
          }
        }
      });
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupModal, [{
    key: "close",
    value: function close() {
      Object(__WEBPACK_IMPORTED_MODULE_24__src_index__["f" /* popupDispatch */])({
        type: 'dom/closeOne',
        params: {
          popup: this
        }
      });
    }
  }, {
    key: "lockScreen",
    value: function lockScreen() {
      var _this$props = this.props,
          modal = _this$props.modal,
          toPool = _this$props.toPool;
      var oDoc = Object(__WEBPACK_IMPORTED_MODULE_21_win_doc__["a" /* doc */])();
      Object(__WEBPACK_IMPORTED_MODULE_21_win_doc__["b" /* win */])().addEventListener('resize', this.reCalculate);
      var body = oDoc.body;
      var addBodyClass = Object(__WEBPACK_IMPORTED_MODULE_19_class_lib__["mixClass"])(body.className, {
        scrolling: this.props.maskScroll
      }, 'dimmable', 'dimmed');

      if (!toPool) {
        body.className = addBodyClass;
      }
    }
  }, {
    key: "resetBodyClassName",
    value: function resetBodyClassName() {
      var toPool = this.props.toPool;
      var body = Object(__WEBPACK_IMPORTED_MODULE_21_win_doc__["a" /* doc */])().body;

      if (!toPool && body) {
        var bodyClass = body.className;
        bodyClass = Object(__WEBPACK_IMPORTED_MODULE_19_class_lib__["removeClass"])(bodyClass, 'dimmable');
        bodyClass = Object(__WEBPACK_IMPORTED_MODULE_19_class_lib__["removeClass"])(bodyClass, 'scrolling');
        bodyClass = Object(__WEBPACK_IMPORTED_MODULE_19_class_lib__["removeClass"])(bodyClass, 'dimmed');
        body.className = bodyClass;
      }
    }
  }, {
    key: "detach",
    value: function detach() {
      /**
       * closeCallback will deprecate
       */
      if (Object(__WEBPACK_IMPORTED_MODULE_19_class_lib__["hasClass"])(Object(__WEBPACK_IMPORTED_MODULE_17_get_object_value__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_21_win_doc__["a" /* doc */])(), ['body', 'className']), 'dimmed')) {
        var _this$props2 = this.props,
            closeCallback = _this$props2.closeCallback,
            onClose = _this$props2.onClose;
        Object(__WEBPACK_IMPORTED_MODULE_20_call_func__["a" /* default */])(onClose || closeCallback);
      } // do detach


      this.resetBodyClassName();
      Object(__WEBPACK_IMPORTED_MODULE_21_win_doc__["b" /* win */])().removeEventListener('resize', this.reCalculate);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.detach();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          hasError = _this$state2.hasError,
          stateShow = _this$state2.show,
          stateModalStyle = _this$state2.modalStyle,
          stateMaskStyle = _this$state2.maskStyle;

      if (hasError) {
        return null;
      }

      var _this$props3 = this.props,
          disableClose = _this$props3.disableClose,
          scrolling = _this$props3.scrolling,
          appear = _this$props3.appear,
          enter = _this$props3.enter,
          leave = _this$props3.leave,
          style = _this$props3.style,
          styles = _this$props3.styles,
          contentStyle = _this$props3.contentStyle,
          modal = _this$props3.modal,
          modalClassName = _this$props3.modalClassName,
          modalStyle = _this$props3.modalStyle,
          mask = _this$props3.mask,
          maskScroll = _this$props3.maskScroll,
          toPool = _this$props3.toPool,
          closeEl = _this$props3.closeEl,
          closeCallback = _this$props3.closeCallback,
          onClose = _this$props3.onClose,
          className = _this$props3.className,
          contentClassName = _this$props3.contentClassName,
          others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props3, ["disableClose", "scrolling", "appear", "enter", "leave", "style", "styles", "contentStyle", "modal", "modalClassName", "modalStyle", "mask", "maskScroll", "toPool", "closeEl", "closeCallback", "onClose", "className", "contentClassName"]);

      var containerClick = null;
      var thisCloseEl;
      var content = '';

      if (stateShow) {
        this.lockScreen();

        if (!closeEl) {
          if (!disableClose) {
            containerClick = this.handleClick;
          }
        } else {
          thisCloseEl = Object(__WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__["build"])(closeEl)({
            onClick: this.handleClick,
            key: 'close',
            style: Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
              zIndex: 1001,
              position: 'fixed'
            }, closeEl.props.style)
          });
        }

        var thisModal = modal;

        if (__WEBPACK_IMPORTED_MODULE_22_reshow_constant__["f" /* UNDEFINED */] === Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_typeof__["a" /* default */])(thisModal)) {
          thisModal = __WEBPACK_IMPORTED_MODULE_11_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__["Dimmer"], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
            isModal: "true",
            className: Object(__WEBPACK_IMPORTED_MODULE_19_class_lib__["mixClass"])({
              scrolling: scrolling
            }, modalClassName),
            show: stateShow,
            contentStyle: contentStyle
          }));
        }

        if (Object(__WEBPACK_IMPORTED_MODULE_11_react__["isValidElement"])(thisModal)) {
          var orgModalOnClick = Object(__WEBPACK_IMPORTED_MODULE_17_get_object_value__["a" /* default */])(thisModal, ['props', 'onClick']);
          thisModal = Object(__WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__["build"])(thisModal)({
            refCb: this.handleModalRefCb,
            onClick: this.handleModalClick(orgModalOnClick),
            styles: Object(__WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__["reactStyle"])(Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Styles.modal, {}, modalStyle, {}, stateModalStyle), false, false)
          });
        }

        if (mask) {
          var thisStyles = Object(__WEBPACK_IMPORTED_MODULE_18_array_merge__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__["reactStyle"])(Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Styles.background, {}, style, {}, stateMaskStyle), false, false), styles);
          content = __WEBPACK_IMPORTED_MODULE_11_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__["Dimmer"], {
            className: Object(__WEBPACK_IMPORTED_MODULE_19_class_lib__["mixClass"])('page modals', contentClassName),
            show: stateShow,
            center: false,
            styles: thisStyles,
            styleOrder: 1,
            onClick: containerClick,
            key: "modals"
          }, thisModal);
        } else {
          content = thisModal;
        }
      } else {
        this.detach();
      }

      return __WEBPACK_IMPORTED_MODULE_11_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_react_atomic_molecule__["SemanticUI"], {
        className: className
      }, __WEBPACK_IMPORTED_MODULE_11_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14_organism_react_animate__["a" /* default */], {
        appear: appear,
        enter: enter,
        leave: leave
      }, content), thisCloseEl);
    }
  }]);

  return PopupModal;
}(__WEBPACK_IMPORTED_MODULE_23__molecules_PopupOverlay__["a" /* PopupOverlay */]);

Object(__WEBPACK_IMPORTED_MODULE_10_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(PopupModal, "defaultProps", {
  mask: true,
  maskScroll: false,
  scrolling: false,
  name: 'modal',
  disableClose: false
});

var PopupModalContainer = Object(__WEBPACK_IMPORTED_MODULE_12_reshow_flux__["c" /* connect */])(PopupModal, {
  withProps: true
});
/* harmony default export */ __webpack_exports__["a"] = (PopupModalContainer);
var Styles = {
  flexAlignTop: {
    justifyContent: 'flex-start',
    WebkitBoxPack: 'start',
    MsFlexPack: 'start'
  },
  background: {
    overflow: 'auto',
    boxSizing: 'border-box'
  },
  modal: {
    boxSizing: 'border-box',
    right: 'auto',
    bottom: 'auto',
    transition: ['all 500ms ease']
  }
};

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupOverlay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_get_style__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_get_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_get_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__molecules_BasePopup__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_index__ = __webpack_require__(21);















var PopupOverlay =
/*#__PURE__*/
function (_BasePopup) {
  Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupOverlay, _BasePopup);

  function PopupOverlay() {
    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupOverlay);

    return Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupOverlay).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupOverlay, [{
    key: "renderOverlay",
    value: function renderOverlay(props) {
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["SemanticUI"], props);
    }
  }, {
    key: "resetStyle",
    value: function resetStyle(key, thisStyle) {
      var _this = this;

      var value = Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(this.state, [key], function () {
        return Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(_this.props, [key]);
      });

      if ('undefined' !== typeof value) {
        thisStyle[key] = value + 'px';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          stateShow = _this$state.show,
          hasError = _this$state.hasError;

      if (!stateShow || hasError) {
        return null;
      }

      var _this$props = this.props,
          targetEl = _this$props.targetEl,
          toPool = _this$props.toPool,
          alignParams = _this$props.alignParams,
          isFollowTransform = _this$props.isFollowTransform,
          className = _this$props.className,
          show = _this$props.show,
          style = _this$props.style,
          group = _this$props.group,
          others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["targetEl", "toPool", "alignParams", "isFollowTransform", "className", "show", "style", "group"]);
      /* <!-- Handle Style */


      var thisStyle = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, style);

      this.resetStyle('top', thisStyle);
      this.resetStyle('left', thisStyle);
      this.resetStyle('width', thisStyle);
      this.resetStyle('height', thisStyle);

      if (targetEl && isFollowTransform) {
        thisStyle.transform = __WEBPACK_IMPORTED_MODULE_11_get_style___default()(targetEl, 'transform');
      }

      others.style = thisStyle;
      /*  Handle Style --> */

      var refCb = Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(this.state, ['refCb'], function () {
        return Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(_this2.props, ['refCb']);
      });

      if (refCb) {
        others.refCb = refCb;
      }

      others.className = Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["mixClass"])(className, Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(this, ['state', 'className']), 'visible');
      return this.renderOverlay(others);
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [__WEBPACK_IMPORTED_MODULE_13__src_index__["g" /* popupStore */]];
    }
  }, {
    key: "calculateState",
    value: function calculateState(prevState, props) {
      var state = __WEBPACK_IMPORTED_MODULE_13__src_index__["g" /* popupStore */].getState();
      var key = Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(props, ['name'], 'default');
      var show = state.get('shows').get(key);
      return {
        show: show
      };
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var prevShow = Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(prevState, ['props', 'show']);

      var _ref = nextProps || {},
          show = _ref.show;

      if (show !== prevShow) {
        return {
          props: nextProps,
          show: nextProps.show
        };
      }
    }
  }]);

  return PopupOverlay;
}(__WEBPACK_IMPORTED_MODULE_12__molecules_BasePopup__["a" /* default */]);


/* harmony default export */ __webpack_exports__["b"] = (Object(__WEBPACK_IMPORTED_MODULE_8_reshow_flux__["c" /* connect */])(PopupOverlay, {
  withProps: true
}));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var getStyle = function getStyle(el, styleKey) {
    if ('undefined' === typeof document) {
        return;
    }
    var doc = document;
    var styleValue = '';
    if (el.currentStyle) {
        styleValue = el.currentStyle[styleKey];
    } else if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styleValue = doc.defaultView.getComputedStyle(el, null).getPropertyValue(styleKey);
    }
    if (styleValue && styleValue.toLowerCase) {
        return styleValue.toLowerCase();
    } else {
        return styleValue;
    }
};

exports.default = getStyle;
module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);








var BasePopup =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(BasePopup, _PureComponent);

  function BasePopup() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, BasePopup);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(BasePopup).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(BasePopup, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;

      if (onError) {
        callfunc(onError, [error, info]);
      } else {
        console.error([error, info]);
      }

      this.setState({
        hasError: true
      });
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }
  }]);

  return BasePopup;
}(__WEBPACK_IMPORTED_MODULE_6_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(BasePopup, "defaultProps", {
  name: 'default'
});

/* harmony default export */ __webpack_exports__["a"] = (BasePopup);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return popupDispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);

var instance = new __WEBPACK_IMPORTED_MODULE_0_reshow_flux__["a" /* Dispatcher */]();
/* harmony default export */ __webpack_exports__["a"] = (instance);
var popupDispatch = instance.dispatch.bind(instance);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_style__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_get_style__);


var isFixed = function isFixed(node) {
  if (!document.body.contains(node)) {
    console.warn(['Dom not exists in body', node]);
    return false;
  }

  var thisParent = node;

  while (thisParent.nodeName != 'BODY') {
    var position = __WEBPACK_IMPORTED_MODULE_0_get_style___default()(thisParent, 'position');

    if ('fixed' === position) {
      return thisParent;
    }

    thisParent = thisParent.parentNode;
  }

  return false;
};

/* harmony default export */ __webpack_exports__["a"] = (isFixed);

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var positions = {
  TL: 'tl',
  TC: 'tc',
  TR: 'tr',
  RT: 'rt',
  RC: 'rc',
  RB: 'rb',
  BL: 'bl',
  BC: 'bc',
  BR: 'br',
  LT: 'lt',
  LC: 'lc',
  LB: 'lb',
  CC: 'cc'
};
/* harmony default export */ __webpack_exports__["a"] = (positions);

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var refError = function refError() {
  return new ReferenceError("this hasn't been initialised - super() hasn't been called");
};

/* harmony default export */ __webpack_exports__["a"] = (refError);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_stores_ajaxStore__ = __webpack_require__(33);








var AjaxBase =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxBase, _PureComponent);

  function AjaxBase() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxBase);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxBase).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxBase, [{
    key: "isRunAjax",
    value: function isRunAjax() {
      if (this.props.ajax) {
        return this.props.ajax;
      }

      var state = __WEBPACK_IMPORTED_MODULE_6__src_stores_ajaxStore__["a" /* default */].getState();
      return state.get('ajax');
    }
  }]);

  return AjaxBase;
}(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);

/* harmony default export */ __webpack_exports__["a"] = (AjaxBase);

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_array_dedup__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_array_dedup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_array_dedup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reshow_flux_base__ = __webpack_require__(34);











var DEFAULT_OPTIONS = {
  withProps: false
};
var keys = Object.keys;

var getProps = function getProps(props, opt) {
  return opt.withProps && props ? props : {};
};

var getState = function getState(self, prevState, maybeProps, opt) {
  return self.calculateState(prevState, getProps(maybeProps, opt));
};

var getStores = function getStores(self, maybeProps, opt) {
  return self.getStores(getProps(maybeProps, opt));
};

var connect = function connect(Base, options) {
  var thisOptions = Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, DEFAULT_OPTIONS, {}, options || {});

  var ConnectedClass =
  /*#__PURE__*/
  function (_Base) {
    Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(ConnectedClass, _Base);

    function ConnectedClass(props) {
      var _this;

      Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, ConnectedClass);

      _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass).call(this, props));

      Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "__stores", []);

      Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "__handleChange", function () {
        if (!_this.__stores) {
          // avoid race condition
          return;
        }

        var con = _this.constructor;

        _this.setState(function (prevState, currentProps) {
          return getState(con, prevState, currentProps, thisOptions);
        });
      });

      Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "__setStores", function (stores) {
        if (_this.__stores) {
          _this.__resetStores();
        }

        stores = __WEBPACK_IMPORTED_MODULE_9_array_dedup___default()(stores);
        (stores || []).forEach(function (store) {
          return store.addListener(_this.__handleChange, __WEBPACK_IMPORTED_MODULE_10_reshow_flux_base__["a" /* CHANGE */]);
        });
        _this.__stores = stores;
      });

      Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "__resetStores", function () {
        if (!_this.__stores) {
          return;
        }

        _this.__stores.forEach(function (store) {
          return store.removeListener(_this.__handleChange, __WEBPACK_IMPORTED_MODULE_10_reshow_flux_base__["a" /* CHANGE */]);
        });

        _this.__stores = null;
      });

      var _con = _this.constructor;

      if (!_con.calculateState) {
        _con.calculateState = Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "calculateState", Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this));
      }

      if (!_con.getStores) {
        _con.getStores = Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "getStores", Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this));
      }

      _con.calculateState.bind(_con);

      _con.getStores.bind(_con);

      if (props.withConstructor) {
        _this.__setStores(getStores(_con, props, thisOptions));
      }

      if (!_this.state) {
        _this.state = {};
      }

      if (!thisOptions.withProps) {
        var calculatedState = getState(_con, undefined, props, thisOptions);

        if (calculatedState) {
          keys(calculatedState).forEach(function (key) {
            return _this.state[key] = calculatedState[key];
          });
        }
      }

      return _this;
    }

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(ConnectedClass, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "componentDidMount", this)) {
          Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "componentDidMount", this).call(this);
        }

        if (this.props && !this.props.withConstructor) {
          this.__setStores(getStores(this.constructor, this.props, thisOptions));
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "componentDidUpdate", this)) {
          Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "componentDidUpdate", this).call(this, prevProps, prevState);
        }

        if (thisOptions.withProps) {
          this.__setStores(getStores(this.constructor, this.props, thisOptions));
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "componentWillUnmount", this)) {
          Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass.prototype), "componentWillUnmount", this).call(this);
        }

        this.__resetStores();
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        var thisStates = null;

        if (Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass), "getDerivedStateFromProps", this)) {
          thisStates = Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ConnectedClass), "getDerivedStateFromProps", this).call(this, nextProps, prevState);
        }

        if (thisOptions.withProps) {
          var calState = getState(ConnectedClass, Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, prevState, {}, thisStates), nextProps, thisOptions);
          thisStates = Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, thisStates, {}, calState);
        }

        return thisStates;
      }
    }]);

    return ConnectedClass;
  }(Base);

  var componentName = Base.displayName || Base.name;
  ConnectedClass.displayName = 'FluxConnected(' + componentName + ')';
  return ConnectedClass;
};

/* harmony default export */ __webpack_exports__["a"] = (connect);

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var get = function get(object, property, receiver) {
  if (object === null) {
    object = Function.prototype;
  }

  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ('value' in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (get);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__merge__ = __webpack_require__(131);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__merge__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combine__ = __webpack_require__(132);
/* unused harmony reexport combine */
/* unused harmony reexport combineSub */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__removeEmpty__ = __webpack_require__(133);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__removeEmpty__["a"]; });




/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function () {
  return new Date().getTime() + '' + Math.random();
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_set_object_value__ = __webpack_require__(48);



var maybeArray = function maybeArray(formParams, _ref) {
  var name = _ref.name,
      value = _ref.value,
      arrayMode = _ref.arrayMode;

  switch (arrayMode) {
    case 'arrayKeyKeep':
    case 'arrayKey':
      var len = name.length;

      if ('[]' === name.substring(len - 2, len)) {
        var thisName = arrayMode === 'arrayKeyKeep' ? name : name.substring(0, len - 2);
        Object(__WEBPACK_IMPORTED_MODULE_1_set_object_value__["a" /* default */])(formParams, [thisName], value, true);
      } else {
        formParams[name] = value;
      }

      break;

    case 'auto':
      if (formParams[name]) {
        Object(__WEBPACK_IMPORTED_MODULE_1_set_object_value__["a" /* default */])(formParams, [name], value, true);
      } else {
        formParams[name] = value;
      }

      break;

    default:
      formParams[name] = value;
      break;
  }
};

var formSerialize = function formSerialize(formEl, arrayMode) {
  arrayMode = null != arrayMode ? arrayMode : 'auto';
  var formParams = {};

  var elements = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__["a" /* default */])(formEl.elements);

  elements.forEach(function (el) {
    var name = el.name,
        value = el.value,
        type = el.type,
        checked = el.checked;
    var booleanValue = el.getAttribute('data-boolean') ? !!(-1 !== '|0|null|true|false|'.indexOf('|' + value.toLowerCase() + '|') ? JSON.parse(value.toLowerCase()) : value) : value;

    if (name) {
      switch (type.toLowerCase()) {
        case 'checkbox':
          if (checked) {
            maybeArray(formParams, {
              name: name,
              value: booleanValue,
              arrayMode: arrayMode
            });
          }

          break;

        case 'radio':
          if (checked) {
            formParams[name] = booleanValue;
          }

          break;

        case 'select-multiple':
          var options = el.querySelectorAll('option[selected]');

          Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__["a" /* default */])(options).forEach(function (opt) {
            var optValue = opt.value || opt.text;
            maybeArray(formParams, {
              name: name,
              value: optValue,
              arrayMode: arrayMode
            });
          });

          break;

        default:
          maybeArray(formParams, {
            name: name,
            value: value,
            arrayMode: arrayMode
          });
          break;
      }
    }
  });
  return formParams;
};

/* harmony default export */ __webpack_exports__["a"] = (formSerialize);

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getUrl; });
/* unused harmony export getPath */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return unsetUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getKeyReg__ = __webpack_require__(139);


var uriReg = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;

var getPath = function getPath(url) {
  return uriReg.exec(url)[2];
};

var resetUrl = function resetUrl(url) {
  return url ? url : Object(__WEBPACK_IMPORTED_MODULE_0_win_doc__["a" /* doc */])().URL;
};

var getUrl = function getUrl(key, url) {
  url = resetUrl(url);
  var reg = Object(__WEBPACK_IMPORTED_MODULE_1__getKeyReg__["a" /* default */])(key);
  var exec = reg.exec(url);
  return !exec ? '' : decodeURIComponent(exec[3]);
};

var unsetUrl = function unsetUrl(key, url) {
  var reg = Object(__WEBPACK_IMPORTED_MODULE_1__getKeyReg__["a" /* default */])(key);
  url = resetUrl(url);
  var exec = reg.exec(url);

  if (exec) {
    url = exec[2] === '?' ? url.replace(reg, '?') : url.replace(reg, '');
  }

  return url;
};

var setUrl = function setUrl(key, value, url, KeepRawValue) {
  var reg = Object(__WEBPACK_IMPORTED_MODULE_1__getKeyReg__["a" /* default */])(key);

  if (!KeepRawValue) {
    value = encodeURIComponent(value);
  }

  url = resetUrl(url);
  url = reg.test(url) ? url.replace(reg, '$1' + value) : url + (-1 === url.indexOf('?') ? '?' : '&') + key + '=' + value;
  return url;
};


/* harmony default export */ __webpack_exports__["a"] = (setUrl);

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheReg", function() { return cacheReg; });
var esc = /[|\\{}()[\]^$+*?.]/g;
var getSafeReg = function getSafeReg(name) {
    return name.replace(esc, '\\$&');
};
var cacheReg = function cacheReg(cache) {
    return function (regString) {
        return function (name) {
            if (!cache[name]) {
                cache[name] = new RegExp(regString(name));
            }
            return cache[name];
        };
    };
};
/* harmony default export */ __webpack_exports__["default"] = (getSafeReg);


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__urlDispatcher__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_seturl__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_organism_react_ajax__ = __webpack_require__(78);













var keys = Object.keys;

var updateUrl = function updateUrl(url) {
  return history.pushState && history.pushState('', '', url);
};

var URL =
/*#__PURE__*/
function () {
  function URL(loc) {
    Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, URL);

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "loc", {});

    this.loc = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, loc);
  }

  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_createClass__["a" /* default */])(URL, [{
    key: "getHref",
    value: function getHref(loc) {
      return this.loc.href;
    }
  }, {
    key: "get",
    value: function get(key) {
      var value;

      if (0 === key.indexOf(':')) {
        var cookKey = key.substr(1);
        value = Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(this.loc, [key.substr(1)]);

        if ('pathname' === cookKey) {
          value = value.split('/');
        }
      } else {
        var href = this.getHref();

        if (href) {
          value = Object(__WEBPACK_IMPORTED_MODULE_10_seturl__["b" /* getUrl */])(key, this.getHref());
        }
      }

      return value;
    }
  }]);

  return URL;
}();

var UrlStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_inherits__["a" /* default */])(UrlStore, _ReduceStore);

  function UrlStore() {
    Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, UrlStore);

    return Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(UrlStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_createClass__["a" /* default */])(UrlStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      var _this = this;

      var loc = {};
      setTimeout(function () {
        var oDoc = Object(__WEBPACK_IMPORTED_MODULE_11_win_doc__["a" /* doc */])();

        if (oDoc.URL) {
          Object(__WEBPACK_IMPORTED_MODULE_8__urlDispatcher__["b" /* urlDispatch */])({
            type: 'url',
            url: oDoc.URL
          });

          _this.registerEvent(Object(__WEBPACK_IMPORTED_MODULE_11_win_doc__["b" /* win */])());
        }
      });
      return new URL({});
    }
  }, {
    key: "registerEvent",
    value: function registerEvent(win) {
      if (win && win.addEventListener) {
        win.addEventListener('popstate', function () {
          Object(__WEBPACK_IMPORTED_MODULE_8__urlDispatcher__["b" /* urlDispatch */])({
            type: 'url',
            url: Object(__WEBPACK_IMPORTED_MODULE_11_win_doc__["a" /* doc */])().URL
          });
          Object(__WEBPACK_IMPORTED_MODULE_12_organism_react_ajax__["a" /* ajaxDispatch */])('urlChange');
        }, true);
        __WEBPACK_IMPORTED_MODULE_12_organism_react_ajax__["b" /* ajaxStore */].urlDispatch = __WEBPACK_IMPORTED_MODULE_8__urlDispatcher__["b" /* urlDispatch */];
      }
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      var oDoc = Object(__WEBPACK_IMPORTED_MODULE_11_win_doc__["a" /* doc */])();

      if (!oDoc.URL) {
        return state;
      }

      var url;
      var urlV;

      var _ref = action || {},
          type = _ref.type,
          params = _ref.params;

      switch (type) {
        case 'url':
          url = Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(action, ['url']);

          if (!url) {
            console.error('Not assign url', action);
          }

          break;

        case 'query':
          url = oDoc.URL;
          keys(Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(params, null, [])).forEach(function (key) {
            urlV = Object(__WEBPACK_IMPORTED_MODULE_9_get_object_value__["a" /* default */])(params, [key]);
            url = urlV != null ? Object(__WEBPACK_IMPORTED_MODULE_10_seturl__["a" /* default */])(key, urlV, url) : Object(__WEBPACK_IMPORTED_MODULE_10_seturl__["c" /* unsetUrl */])(key, url);
          });
          break;
      }

      if (url !== oDoc.URL) {
        updateUrl(url);
        return new URL(oDoc.location); // need put after updateUrl for new url effect
      } else {
        if (url !== state.getHref()) {
          return new URL(oDoc.location);
        }

        return state;
      }
    }
  }]);

  return UrlStore;
}(__WEBPACK_IMPORTED_MODULE_7_reshow_flux__["b" /* ReduceStore */]);

/* harmony default export */ __webpack_exports__["a"] = (new UrlStore(__WEBPACK_IMPORTED_MODULE_8__urlDispatcher__["a" /* default */]));

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return urlDispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);

var dispatcher = new __WEBPACK_IMPORTED_MODULE_0_reshow_flux__["a" /* Dispatcher */]();
/**
 * Dispatcher
 */

/* harmony default export */ __webpack_exports__["a"] = (dispatcher);
/**
 * Dispatch 
 *
 * import {urlDispatch} from 'reshow';
 * urlDispatch({xxx:yyy});
 */

var urlDispatch = dispatcher.dispatch;

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_organisms_AjaxLink__ = __webpack_require__(141);
/* unused harmony reexport AjaxLink */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_organisms_AjaxPage__ = __webpack_require__(142);
/* unused harmony reexport AjaxPage */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_organisms_AjaxForm__ = __webpack_require__(143);
/* unused harmony reexport AjaxForm */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_ajaxStore__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__stores_ajaxStore__["a"]; });
/* unused harmony reexport initAjaxWorkerEvent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ajaxDispatcher__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__ajaxDispatcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_formSerialize__ = __webpack_require__(80);
/* unused harmony reexport formSerialize */
// Organisms


 // Stores

 // Dispatch

 // Util



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_stores_ajaxStore__ = __webpack_require__(36);








var AjaxBase =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxBase, _PureComponent);

  function AjaxBase() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxBase);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxBase).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxBase, [{
    key: "isRunAjax",
    value: function isRunAjax() {
      if (this.props.ajax) {
        return this.props.ajax;
      }

      var state = __WEBPACK_IMPORTED_MODULE_6__src_stores_ajaxStore__["a" /* default */].getState();
      return state.get('ajax');
    }
  }]);

  return AjaxBase;
}(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);

/* harmony default export */ __webpack_exports__["a"] = (AjaxBase);

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_set_object_value__ = __webpack_require__(48);



var maybeArray = function maybeArray(formParams, _ref) {
  var name = _ref.name,
      value = _ref.value,
      arrayMode = _ref.arrayMode;

  switch (arrayMode) {
    case 'arrayKeyKeep':
    case 'arrayKey':
      var len = name.length;

      if ('[]' === name.substring(len - 2, len)) {
        var thisName = arrayMode === 'arrayKeyKeep' ? name : name.substring(0, len - 2);
        Object(__WEBPACK_IMPORTED_MODULE_1_set_object_value__["a" /* default */])(formParams, [thisName], value, true);
      } else {
        formParams[name] = value;
      }

      break;

    case 'auto':
      if (formParams[name]) {
        Object(__WEBPACK_IMPORTED_MODULE_1_set_object_value__["a" /* default */])(formParams, [name], value, true);
      } else {
        formParams[name] = value;
      }

      break;

    default:
      formParams[name] = value;
      break;
  }
};

var formSerialize = function formSerialize(formEl, arrayMode) {
  arrayMode = null != arrayMode ? arrayMode : 'auto';
  var formParams = {};

  var elements = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__["a" /* default */])(formEl.elements);

  elements.forEach(function (el) {
    var name = el.name,
        value = el.value,
        type = el.type,
        checked = el.checked;
    var booleanValue = el.getAttribute('data-boolean') ? !!(-1 !== '|0|null|true|false|'.indexOf('|' + value.toLowerCase() + '|') ? JSON.parse(value.toLowerCase()) : value) : value;

    if (name) {
      switch (type.toLowerCase()) {
        case 'checkbox':
          if (checked) {
            maybeArray(formParams, {
              name: name,
              value: booleanValue,
              arrayMode: arrayMode
            });
          }

          break;

        case 'radio':
          if (checked) {
            formParams[name] = booleanValue;
          }

          break;

        case 'select-multiple':
          var options = el.querySelectorAll('option[selected]');

          Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__["a" /* default */])(options).forEach(function (opt) {
            var optValue = opt.value || opt.text;
            maybeArray(formParams, {
              name: name,
              value: optValue,
              arrayMode: arrayMode
            });
          });

          break;

        default:
          maybeArray(formParams, {
            name: name,
            value: value,
            arrayMode: arrayMode
          });
          break;
      }
    }
  });
  return formParams;
};

/* harmony default export */ __webpack_exports__["a"] = (formSerialize);

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_memoize_one__ = __webpack_require__(145);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_memoize_one__["a" /* default */])(function (data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_get_object_value__["c" /* toJS */])(data);
}));

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_call_func__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toJS__ = __webpack_require__(81);




var keys = Object.keys;
var isArray = Array.isArray;

var getImmutable = function getImmutable(immutable) {
  return function (data) {
    return !immutable ? Object(__WEBPACK_IMPORTED_MODULE_3__toJS__["a" /* default */])(data) : data;
  };
};

var storeLocator = function storeLocator(props) {
  return props.stores;
};

var globalStoreLocator = function globalStoreLocator(props) {
  return null;
};

var getMapIn = function getMapIn(map, path) {
  return map && map.getIn ? map.getIn(path) : undefined;
};

var reset = function reset(props, more) {
  ['immutable', 'initStates', 'pathStates', 'stores', 'storeLocator', 'globalStoreLocator'].concat(Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_toConsumableArray__["a" /* default */])(more || [])).forEach(function (key) {
    return delete props[key];
  });
  return props;
};

var defaultProps = {
  initStates: ['data', 'I18N'],
  pathStates: {
    I13N: ['data', 'I13N']
  },
  immutable: false,
  storeLocator: storeLocator,
  globalStoreLocator: globalStoreLocator
};

var getStores = function getStores(props) {
  return Object(__WEBPACK_IMPORTED_MODULE_2_call_func__["a" /* default */])(props.storeLocator || storeLocator, [props]);
};

var calculateState = function calculateState(prevState, props) {
  /**
   * Why not support multi stores?
   * Because multi stores need handle complex data merge.
   * If that case need create custom calculateState functoin.
   */
  var thisStore = (getStores(props) || [])[0];

  if (!thisStore) {
    throw new Error('Store not found, Please check getStores function.');
  }

  var initStates = props.initStates,
      pathStates = props.pathStates,
      globalStoreLocator = props.globalStoreLocator,
      propsImmutable = props.immutable;
  var storeState = thisStore.getState();
  var thisThemePath = storeState.get('themePath');
  var globalStore = Object(__WEBPACK_IMPORTED_MODULE_2_call_func__["a" /* default */])(globalStoreLocator, [props]);

  if (thisThemePath && globalStore && globalStore.path !== thisThemePath) {
    return prevState;
  }

  var immutable = propsImmutable || storeState.get('immutable');
  var results = {};

  if (immutable) {
    results.immutable = immutable;
  }

  var toImmutable = getImmutable(immutable);

  if (isArray(initStates)) {
    initStates.forEach(function (key) {
      var data = storeState.get(key);
      results[key] = toImmutable(data);
    });
  } else if (initStates) {
    keys(initStates).forEach(function (key) {
      var data = storeState.get(key);
      var newKey = initStates[key] ? initStates[key] : key;
      results[newKey] = toImmutable(data);
    });
  }

  keys(pathStates || {}).forEach(function (key) {
    var thisPath = pathStates[key];
    results[key] = immutable ? getMapIn(Object(__WEBPACK_IMPORTED_MODULE_1_get_object_value__["a" /* default */])(results, [thisPath[0]]), thisPath.slice(1)) : Object(__WEBPACK_IMPORTED_MODULE_1_get_object_value__["a" /* default */])(results, thisPath);
  });
  return results;
};

var options = {
  defaultProps: defaultProps,
  getStores: getStores,
  calculateState: calculateState,
  reset: reset
};
/* harmony default export */ __webpack_exports__["a"] = (options);

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_flux__ = __webpack_require__(13);
/* unused harmony reexport ReduceStore */
/* unused harmony reexport Dispatcher */
/* unused harmony reexport reshow */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_pageStore__ = __webpack_require__(50);
/* unused harmony reexport pageStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_realTimeStore__ = __webpack_require__(84);
/* unused harmony reexport realTimeStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_localStorageStore__ = __webpack_require__(85);
/* unused harmony reexport localStorageStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stores_sessionStorageStore__ = __webpack_require__(149);
/* unused harmony reexport sessionStorageStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stores_messageStore__ = __webpack_require__(86);
/* unused harmony reexport messageStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dispatcher__ = __webpack_require__(28);
/* unused harmony reexport dispatcher */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__dispatcher__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__storageDispatcher__ = __webpack_require__(52);
/* unused harmony reexport storageDispatch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_organism_react_ajax__ = __webpack_require__(31);
/* unused harmony reexport ReLink */
/* unused harmony reexport ReForm */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ui_organisms_ReshowMessage__ = __webpack_require__(150);
/* unused harmony reexport ReshowMessage */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ui_molecules_ReshowComponent__ = __webpack_require__(29);
/* unused harmony reexport Return */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ui_organisms_RealTimeReturn__ = __webpack_require__(259);
/* unused harmony reexport RealTimeReturn */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ui_organisms_Section__ = __webpack_require__(260);
/* unused harmony reexport Section */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ui_molecules_Reshow__ = __webpack_require__(261);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_13__ui_molecules_Reshow__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_13__ui_molecules_Reshow__["b"]; });
// Flux
// Connect A.K.A Facebook's flux Container.create
 // Stores





 // Dispatch


 // Ajax

 // Message Component

 // Component



 // Base Component



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dispatcher__ = __webpack_require__(28);










var RealTimeStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(RealTimeStore, _ReduceStore);

  function RealTimeStore() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, RealTimeStore);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(RealTimeStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(RealTimeStore, [{
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'realTime':
          return action.params;

        default:
          return [];
      }
    }
  }]);

  return RealTimeStore;
}(__WEBPACK_IMPORTED_MODULE_5_reshow_flux__["b" /* ReduceStore */]);

/* harmony default export */ __webpack_exports__["a"] = (new RealTimeStore(__WEBPACK_IMPORTED_MODULE_6__dispatcher__["a" /* default */]));

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_get_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__storageDispatcher__ = __webpack_require__(52);










var LocalStorageStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(LocalStorageStore, _ReduceStore);

  function LocalStorageStore() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, LocalStorageStore);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(LocalStorageStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(LocalStorageStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return new __WEBPACK_IMPORTED_MODULE_7_get_storage__["a" /* Storage */](__WEBPACK_IMPORTED_MODULE_7_get_storage__["b" /* localStorage */]);
    }
  }, {
    key: "updateStorage",
    value: function updateStorage(state, action) {
      var params = Object(__WEBPACK_IMPORTED_MODULE_6_get_object_value__["a" /* default */])(action, ['params']);
      return state.merge(params);
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'local':
          return this.updateStorage(state, action);

        default:
          return state;
      }
    }
  }]);

  return LocalStorageStore;
}(__WEBPACK_IMPORTED_MODULE_5_reshow_flux__["b" /* ReduceStore */]);

/* unused harmony default export */ var _unused_webpack_default_export = (new LocalStorageStore(__WEBPACK_IMPORTED_MODULE_8__storageDispatcher__["a" /* default */]));


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_call_func__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dispatcher__ = __webpack_require__(28);













var alertCount = 0;
var isArray = Array.isArray;

var toMessage = function toMessage(message) {
  if (-1 !== 'string|number'.indexOf(Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_typeof__["a" /* default */])(message))) {
    message = {
      message: message
    };
  }

  if (!message.id) {
    message.id = 'm-' + alertCount;
    alertCount++;
  }

  return message;
};

var getMessage = function getMessage(action) {
  return toMessage(Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(action, ['params', 'message']));
};

var MessageStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(MessageStore, _ReduceStore);

  function MessageStore() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, MessageStore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(MessageStore)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "dialogCallback", null);

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(MessageStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return Object(__WEBPACK_IMPORTED_MODULE_9_immutable__["Map"])({
        alerts: Object(__WEBPACK_IMPORTED_MODULE_9_immutable__["List"])()
      });
    }
  }, {
    key: "dialogStart",
    value: function dialogStart(state, action) {
      var params = Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(action, ['params']);
      var dialog = params.dialog,
          dialogProps = params.dialogProps,
          dialogTo = params.dialogTo,
          callback = params.callback;
      var next = {
        dialog: dialog
      };

      if (dialogProps) {
        next.dialogProps = dialogProps;
      }

      if (dialogTo) {
        next.dialogTo = dialogTo;
      }

      if (callback) {
        this.dialogCallback = callback;
      }

      return state.merge(next);
    }
  }, {
    key: "dialogEnd",
    value: function dialogEnd(state, action) {
      var dialogTo = state.get('dialogTo');

      if (!dialogTo) {
        dialogTo = 'dialogReturn';
      }

      var value = Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(action, ['params', 'item', 'props', 'value']);
      Object(__WEBPACK_IMPORTED_MODULE_12__dispatcher__["b" /* dispatch */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])({}, dialogTo, value));
      Object(__WEBPACK_IMPORTED_MODULE_11_call_func__["a" /* default */])(this.dialogCallback, [value]);
      this.dialogCallback = null;
      return state["delete"]('dialog')["delete"]('dialogProps')["delete"]('dialogTo');
    }
  }, {
    key: "alertReset",
    value: function alertReset(state, action) {
      var alerts = Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(action, ['params', 'alerts']);

      if (!isArray(alerts)) {
        alerts = Object(__WEBPACK_IMPORTED_MODULE_9_immutable__["List"])();
      } else {
        alerts = Object(__WEBPACK_IMPORTED_MODULE_9_immutable__["List"])(alerts.map(function (a) {
          return toMessage(a);
        }));
      }

      return state.set('alerts', alerts);
    }
  }, {
    key: "alertDel",
    value: function alertDel(state, action) {
      var id = Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(action, ['params', 'id']);
      var alerts = state.get('alerts').filter(function (item) {
        return item.id !== id ? true : false;
      });
      return state.set('alerts', alerts);
    }
  }, {
    key: "alertAdd",
    value: function alertAdd(state, action) {
      var alerts = state.get('alerts');
      var message = getMessage(action);
      var alertProps = Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(action, ['params', 'alertProps']);

      if (alertProps) {
        state = state.set('alertProps', alertProps);
      }

      return state.set('alerts', alerts.push(message));
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'dialog/start':
          return this.dialogStart(state, action);

        case 'dialog/end':
          return this.dialogEnd(state, action);

        case 'alert/reset':
          return this.alertReset(state, action);

        case 'alert/del':
          return this.alertDel(state, action);

        case 'alert/add':
          return this.alertAdd(state, action);

        default:
          return state;
      }
    }
  }]);

  return MessageStore;
}(__WEBPACK_IMPORTED_MODULE_8_reshow_flux__["b" /* ReduceStore */]); // Export a singleton instance of the store


/* harmony default export */ __webpack_exports__["a"] = (new MessageStore(__WEBPACK_IMPORTED_MODULE_12__dispatcher__["a" /* default */]));

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(152);
} else {
  module.exports = __webpack_require__(153);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_organisms_Animate__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ui_organisms_Animate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_organisms_Image__ = __webpack_require__(236);
/* unused harmony reexport Image */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_organisms_AnimateGroup__ = __webpack_require__(89);
/* unused harmony reexport AnimateGroup */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_organisms_Replace__ = __webpack_require__(237);
/* unused harmony reexport Replace */
// Default





/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_getChildMapping__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_get_object_value__ = __webpack_require__(10);












var keys = Object.keys;
var CSSTransition;

var AnimateGroup =
/*#__PURE__*/
function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(AnimateGroup, _Component);

  function AnimateGroup() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AnimateGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AnimateGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "state", {
      children: null
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "_exitTimeout", null);

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(AnimateGroup, [{
    key: "handleExited",
    value: function handleExited(child, node) {
      var _this2 = this;

      var _this$props = this.props,
          propsChildren = _this$props.children,
          onExited = _this$props.onExited;
      var currentChildMapping = Object(__WEBPACK_IMPORTED_MODULE_10__src_getChildMapping__["a" /* default */])(propsChildren);

      if (child.key in currentChildMapping) {
        return;
      }

      if ('function' === typeof onExited) {
        onExited(node);
      }

      this._exitTimeout = setTimeout(function () {
        return _this2.setState(function (_ref) {
          var children = _ref.children;
          delete children[child.key]; // Hack for let PureComponent force update

          return {
            children: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, children)
          };
        });
      });
    }
  }, {
    key: "getAniProps",
    value: function getAniProps(props, enterToAppear) {
      var timeout = props.timeout,
          delay = props.delay,
          classNames = props.classNames,
          mountOnEnter = props.mountOnEnter,
          unmountOnExit = props.unmountOnExit,
          enter = props.enter,
          exit = props.exit,
          addEndListener = props.addEndListener,
          onEnter = props.onEnter,
          onEntering = props.onEntering,
          onEntered = props.onEntered,
          onExit = props.onExit,
          onExiting = props.onExiting;
      var appear = props.appear;

      if (enterToAppear && classNames && classNames.enter) {
        classNames.appear = classNames.enter;
        delay.appear = delay.enter;
        timeout.appear = timeout.enter;
        appear = true;
      }
      /* not assign onExited, because call at handleExited */


      var aniProps = {
        timeout: timeout,
        delay: delay,
        classNames: classNames,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        appear: appear,
        enter: enter,
        exit: exit,
        addEndListener: addEndListener,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        "in": props["in"]
      };
      return aniProps;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this._mounted = true;
      var props = this.props;
      var aniProps = this.getAniProps(props);
      __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 272)).then(function (cssTransition) {
        if (!_this3._mounted) {
          return;
        }

        CSSTransition = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["b" /* getDefault */])(cssTransition);

        _this3.setState({
          children: Object(__WEBPACK_IMPORTED_MODULE_10__src_getChildMapping__["a" /* default */])(props.children, function (child, key) {
            return Object(__WEBPACK_IMPORTED_MODULE_9_react__["createElement"])(CSSTransition, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, child.props, {}, aniProps, {
              key: Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(child, ['props', 'name'], key),
              onExited: _this3.handleExited.bind(_this3, child),
              isCompiled: 1
            }), child);
          })
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;

      if (this._exitTimeout) {
        clearTimeout(this._exitTimeout);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          component = _this$props2.component,
          onExited = _this$props2.onExited,
          propsChildren = _this$props2.children,
          props = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props2, ["component", "onExited", "children"]);

      var children = this.state.children;
      var aniProps = this.getAniProps(this.props, true);
      keys(aniProps).forEach(function (key) {
        return delete props[key];
      });
      var thisChildren = null;

      if (children) {
        thisChildren = keys(children).map(function (key) {
          var child = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(children, [key]);
          var childProps = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(child, ['props'], {});
          var isCSSTransition = childProps.isCSSTransition;

          if (!isCSSTransition || isCSSTransition && !childProps.isCompiled) {
            var newProps = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, childProps, {}, aniProps, {
              key: childProps.name || key,
              isCompiled: true,
              onExited: _this4.handleExited.bind(_this4, child)
            });

            child = isCSSTransition ? Object(__WEBPACK_IMPORTED_MODULE_9_react__["cloneElement"])(child, newProps) : Object(__WEBPACK_IMPORTED_MODULE_9_react__["createElement"])(CSSTransition, newProps, child);
          }

          return child;
        });
      }

      return Object(__WEBPACK_IMPORTED_MODULE_9_react__["createElement"])(component, props, thisChildren);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var stateChildren = prevState.children;

      if (!CSSTransition || !stateChildren) {
        return null;
      }

      var children = nextProps.children;

      if (children === prevState.prevChildren) {
        return null;
      }

      var prevChildMapping = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(stateChildren, null, {});
      var nextChildMapping = Object(__WEBPACK_IMPORTED_MODULE_10__src_getChildMapping__["a" /* default */])(children);

      var all = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, prevChildMapping, {}, nextChildMapping);

      keys(all).forEach(function (key) {
        var child = all[key];
        var hasPrev = key in prevChildMapping;
        var hasNext = key in nextChildMapping;
        var prevChild = prevChildMapping[key];
        var isLeaving = !Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(prevChild, ['props', 'in']);

        if (!hasNext && hasPrev) {
          // Will Exit
          if (!isLeaving) {
            all[key] = Object(__WEBPACK_IMPORTED_MODULE_9_react__["cloneElement"])(child, {
              "in": false
            });
          } else {
            delete all[key];
          }
        }
      });
      return {
        children: all,
        prevChildren: children
      };
    }
  }]);

  return AnimateGroup;
}(__WEBPACK_IMPORTED_MODULE_9_react__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AnimateGroup, "defaultProps", {
  component: 'div',
  unmountOnExit: true,
  "in": true
});

/* harmony default export */ __webpack_exports__["a"] = (AnimateGroup);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _array = __webpack_require__(44);

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArray = Array.isArray;
var keys = Object.keys;

var mixClass = function mixClass() {
    var classes = [];
    var args = arguments;
    keys(args).forEach(function (key) {
        var arg = args[key];
        if (!arg) {
            return;
        }
        var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (isArray(arg)) {
            classes.push(mixClass.apply(null, arg));
        } else if (argType === 'object') {
            keys(arg).forEach(function (k) {
                if (arg[k]) {
                    classes.push(k);
                }
            });
        }
    });
    var cookClasses = [];
    classes.forEach(function (c) {
        return cookClasses = cookClasses.concat(c.split(' '));
    });
    return (0, _array2.default)(cookClasses).join(' ');
};

exports.default = mixClass;
module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getSafeReg = __webpack_require__(75);

var _getSafeReg2 = _interopRequireDefault(_getSafeReg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRegString = function getRegString(name) {
  return '(?:^|\\s+)' + (0, _getSafeReg2.default)(name) + '(?:\\s+|$)';
};

var cache = (0, _getSafeReg.cacheReg)({})(getRegString);

exports.default = function (name) {
  return cache(name);
};

module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getClassReg = __webpack_require__(91);

var _getClassReg2 = _interopRequireDefault(_getClassReg);

var _hasClass = __webpack_require__(54);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeClass = function removeClass(classes, name) {
    if (classes && (0, _hasClass2.default)(classes, name)) {
        classes = classes.replace((0, _getClassReg2.default)(name), ' ').replace(/(^\s+)|\s+$/g, '');
        if ((0, _hasClass2.default)(classes, name)) {
            // in case of multiple adjacent
            classes = removeClass(classes, name);
        }
    }
    return classes;
};

exports.default = removeClass;
module.exports = exports['default'];

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__molecules_Icon__ = __webpack_require__(56);








var Button = function Button(props) {
  var className = props.className,
      children = props.children,
      icon = props.icon,
      style = props.style,
      others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["className", "children", "icon", "style"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_4_class_lib__["mixClass"])(className, 'button');
  var thisIcon;
  var buttonWithIconStyle;

  if (icon) {
    thisIcon = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_Icon__["a" /* default */], {
      style: Styles.icon
    }, icon);
    buttonWithIconStyle = Styles.buttonWithIcon;
  }

  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
    atom: "button"
  }, others, {
    className: classes,
    style: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, buttonWithIconStyle, {}, style)
  }), thisIcon, children);
};

Button.defaultProps = {
  type: 'button'
};
/* harmony default export */ __webpack_exports__["a"] = (Button);
var Styles = {
  icon: {
    width: 25,
    height: 25,
    left: 20,
    top: 7,
    fill: '#fff',
    position: 'absolute'
  },
  buttonWithIcon: {
    position: 'relative',
    paddingLeft: 44
  }
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(s) {
  return s.substr(0, 1).toUpperCase() + s.substring(1);
};



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__ = __webpack_require__(14);







var Content = function Content(_ref) {
  var className = _ref.className,
      style = _ref.style,
      props = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["className", "style"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_4_class_lib__["mixClass"])(className, 'content');
  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
    ui: false
  }, props, {
    className: classes,
    style: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
      boxSizing: 'inherit'
    }, style)
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Content);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__molecules_Header__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__ = __webpack_require__(14);







var Message = function Message(props) {
  var header = props.header,
      className = props.className,
      children = props.children,
      messageType = props.messageType,
      reset = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["header", "className", "children", "messageType"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_3_class_lib__["mixClass"])(className, {
    info: messageType === 'info',
    error: messageType === 'error',
    success: messageType === 'success',
    warning: messageType === 'warning'
  }, 'message');
  var thisHeader;

  if (header) {
    thisHeader = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_Header__["a" /* default */], null, header);
  }

  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, reset, {
    className: classes
  }), thisHeader, children);
};

/* harmony default export */ __webpack_exports__["a"] = (Message);

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Header = function Header(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'header');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Header);

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(238);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(239));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(240));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(241));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactAtomicMolecule = __webpack_require__(16);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var injects;

var ICON_X = function ICON_X(props) {
  injects = (0, _reactAtomicMolecule.lazyInject)(injects, InjectStyles);
  var position = props.position,
      weight = props.weight,
      size = props.size,
      className = props.className,
      color = props.color,
      style = props.style,
      others = (0, _objectWithoutProperties2["default"])(props, ["position", "weight", "size", "className", "color", "style"]);
  var classes = (0, _reactAtomicMolecule.mixClass)(className, 'icon', 'x');
  var lineStyle = {
    width: weight,
    height: size,
    background: color
  };
  var containerStyle = Styles.container;

  if ('absolute' === position) {
    containerStyle = _objectSpread({}, containerStyle, {}, Styles.absolute);
  }

  return _react["default"].createElement(_reactAtomicMolecule.SemanticUI, (0, _extends2["default"])({
    className: classes
  }, others, {
    style: _objectSpread({
      width: size,
      height: size
    }, containerStyle, {}, style)
  }), _react["default"].createElement(_reactAtomicMolecule.SemanticUI, {
    styles: injects.line,
    style: lineStyle
  }, _react["default"].createElement(_reactAtomicMolecule.SemanticUI, {
    styles: injects.line2,
    style: lineStyle
  })));
};

ICON_X.defaultProps = {
  style: {},
  size: '1rem',
  weight: '.2rem',
  color: '#333',
  position: 'absolute'
};
var _default = ICON_X;
exports["default"] = _default;
var Styles = {
  container: {
    background: 'transparent',
    position: 'relative',
    cursor: 'pointer'
  },
  absolute: {
    position: 'absolute',
    top: '5px',
    right: '5px'
  }
};
var InjectStyles = {
  line: [{
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: ['translate(-50%,-50%) rotate(45deg)']
  }],
  line2: [{
    transform: ['rotate(90deg)']
  }]
};
module.exports = exports.default;

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_index__ = __webpack_require__(21);









var isArray = Array.isArray;

var DisplayPopupEl =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(DisplayPopupEl, _PureComponent);

  function DisplayPopupEl() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, DisplayPopupEl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(DisplayPopupEl)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "_mount", false);

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(DisplayPopupEl, [{
    key: "getChildren",
    value: function getChildren() {
      return this.props.children;
    }
  }, {
    key: "setFloat",
    value: function setFloat() {
      var _this2 = this;

      setTimeout(function () {
        if (_this2._mount) {
          Object(__WEBPACK_IMPORTED_MODULE_8__src_index__["f" /* popupDispatch */])({
            type: 'dom/update',
            params: {
              popup: _this2.getChildren()
            }
          });
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mount = true;
      this.setFloat();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this.setFloat();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mount = false;
      Object(__WEBPACK_IMPORTED_MODULE_8__src_index__["f" /* popupDispatch */])({
        type: 'dom/cleanOne',
        params: {
          popup: this.getChildren()
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return DisplayPopupEl;
}(__WEBPACK_IMPORTED_MODULE_7_react__["PureComponent"]);

/* harmony default export */ __webpack_exports__["a"] = (DisplayPopupEl);

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_get_scroll_info__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_getoffset__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__isOnScreen__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__isFixed__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__isSetOverflow__ = __webpack_require__(102);








var calWindowOffset = function calWindowOffset(domInfo, scrollInfo) {
  var _distanceFlip;

  var distance = {};
  distance.top = domInfo.top - scrollInfo.top;
  distance.right = scrollInfo.right - domInfo.right;
  distance.bottom = scrollInfo.bottom - domInfo.bottom;
  distance.left = domInfo.left - scrollInfo.left;
  var distanceFlip = (_distanceFlip = {}, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip, distance.top, 't'), Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip, distance.right, 'r'), Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip, distance.bottom, 'b'), Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip, distance.left, 'l'), _distanceFlip);
  var maxDistance = Math.max(distance.top, distance.right, distance.bottom, distance.left);
  var firstKey = distanceFlip[maxDistance];
  var secondKey;
  var locs = [firstKey + 'c'];

  if (firstKey === 't' || firstKey === 'b') {
    var _distanceFlip2;

    distanceFlip = (_distanceFlip2 = {}, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip2, distance.right, 'r'), Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip2, distance.left, 'l'), _distanceFlip2);
    secondKey = distanceFlip[Math.max(distance.left, distance.right)];
  } else {
    var _distanceFlip3;

    distanceFlip = (_distanceFlip3 = {}, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip3, distance.top, 't'), Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(_distanceFlip3, distance.bottom, 'b'), _distanceFlip3);
    secondKey = firstKey;
    firstKey = distanceFlip[Math.max(distance.top, distance.bottom)];
  }

  locs.push(firstKey + secondKey);
  locs.push(secondKey + firstKey);
  var tb = firstKey;
  var lr = secondKey;
  return {
    locs: locs,
    tb: tb,
    lr: lr
  };
};

var getWindowOffset = function getWindowOffset(dom) {
  if (!dom) {
    console.error('getWindowOffset not assign dom');
    console.trace();
    return false;
  }

  var fixedNode = Object(__WEBPACK_IMPORTED_MODULE_5__isFixed__["a" /* default */])(dom);
  var scrollNode = Object(__WEBPACK_IMPORTED_MODULE_6__isSetOverflow__["a" /* default */])(dom);
  var scrollInfo = Object(__WEBPACK_IMPORTED_MODULE_2_get_scroll_info__["a" /* default */])();

  var cookScrollInfo = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread__["a" /* default */])({}, scrollInfo);

  if (fixedNode) {
    var fixedScrollInfo = Object(__WEBPACK_IMPORTED_MODULE_2_get_scroll_info__["a" /* default */])(fixedNode);
    cookScrollInfo.top = fixedScrollInfo.top;
    cookScrollInfo.right = scrollInfo.scrollNodeWidth;
    cookScrollInfo.bottom = scrollInfo.scrollNodeHeight;
    cookScrollInfo.left = fixedScrollInfo.left;
  } else if (scrollNode) {
    var scrollNodeScrollInfo = Object(__WEBPACK_IMPORTED_MODULE_2_get_scroll_info__["a" /* default */])(scrollNode);
    cookScrollInfo.top += scrollNodeScrollInfo.top;
    cookScrollInfo.right += scrollNodeScrollInfo.left;
    cookScrollInfo.bottom += scrollNodeScrollInfo.top;
    cookScrollInfo.left += scrollNodeScrollInfo.left;
  }

  var domInfo = Object(__WEBPACK_IMPORTED_MODULE_4__isOnScreen__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_3_getoffset__["a" /* default */])(dom, fixedNode), cookScrollInfo);
  domInfo.fixedNode = fixedNode;
  domInfo.scrollNode = scrollNode;

  if (!domInfo.isOnScreen) {
    console.warn('Dom is not in screen', {
      dom: dom,
      domInfo: domInfo,
      scrollInfo: scrollInfo,
      cookScrollInfo: cookScrollInfo
    });
    return false;
  }

  var result = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread__["a" /* default */])({
    domInfo: domInfo,
    scrollInfo: scrollInfo
  }, calWindowOffset(domInfo, cookScrollInfo));

  return result;
};

/* harmony default export */ __webpack_exports__["a"] = (getWindowOffset);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var isOnScreen = function isOnScreen(domInfo, scrollInfo) {
  var margin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  domInfo.atTop = domInfo.bottom <= scrollInfo.top + margin;
  domInfo.atRight = domInfo.left >= scrollInfo.right - margin;
  domInfo.atBottom = domInfo.top >= scrollInfo.bottom - margin;
  domInfo.atLeft = domInfo.right <= scrollInfo.left + margin;
  domInfo.isOnScreen = !(domInfo.atTop || domInfo.atRight || domInfo.atBottom || domInfo.atLeft);
  return domInfo;
};

/* harmony default export */ __webpack_exports__["a"] = (isOnScreen);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_style__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_get_style__);


var isSetOverflow = function isSetOverflow(node) {
  if (!document.body.contains(node)) {
    console.warn(['Dom not exists in body', node]);
    return false;
  }

  var thisParent = node;

  while (thisParent.nodeName != 'BODY') {
    var overflowX = __WEBPACK_IMPORTED_MODULE_0_get_style___default()(thisParent, 'overflow-x');
    var overflowY = __WEBPACK_IMPORTED_MODULE_0_get_style___default()(thisParent, 'overflow-y');

    if ('visible' !== overflowY || 'visible' !== overflowX) {
      return thisParent;
    }

    thisParent = thisParent.parentNode;
  }

  return false;
};

/* harmony default export */ __webpack_exports__["a"] = (isSetOverflow);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return globalStore; });
var globalStore = {};

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export goToAnchor */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_getoffset__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_smooth_scroll_to__ = __webpack_require__(45);


var goAnchorTimer;

var urlDecode = function urlDecode(s) {
  return decodeURIComponent(s);
};

var goToAnchor = function goToAnchor(anchor) {
  return function (goAnchorDelay) {
    if (!goAnchorDelay) {
      goAnchorDelay = 0;
    }

    clearTimeout(goAnchorTimer);
    goAnchorTimer = setTimeout(function () {
      var dom = document.body.querySelector(anchor);

      if (dom) {
        var pos = Object(__WEBPACK_IMPORTED_MODULE_0_getoffset__["a" /* default */])(dom);
        Object(__WEBPACK_IMPORTED_MODULE_1_smooth_scroll_to__["a" /* default */])(pos.top);
      }
    }, goAnchorDelay);
  };
};

var handleAnchor = function handleAnchor(path) {
  return function (goAnchorDelay) {
    var anchor;
    var hashStart = path.indexOf('#');
    var anchorStart = -1 !== hashStart ? hashStart : path.indexOf('%23');

    if (-1 !== anchorStart) {
      anchor = urlDecode(path.substring(anchorStart));
      path = path.substring(0, anchorStart);
    }

    if (anchor) {
      goToAnchor(anchor)(goAnchorDelay);
    }

    return path;
  };
};


/* harmony default export */ __webpack_exports__["a"] = (handleAnchor);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = __webpack_require__(87);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(154)(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(155)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_app_client__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_pages_index__ = __webpack_require__(263);


/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_reshow_app_client__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__ui_pages_index__["a" /* default */]));

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export render */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_setimmediate__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_setimmediate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_setimmediate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_es6_promise_auto__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_es6_promise_auto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_es6_promise_auto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_worker__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_organism_react_ajax__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_url__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_win_doc__ = __webpack_require__(19);

 // for webpack promise fixed








var render = function render(oApp, dom) {
  return (dom.innerHTML && __WEBPACK_IMPORTED_MODULE_3_react_dom___default.a.hydrate ? __WEBPACK_IMPORTED_MODULE_3_react_dom___default.a.hydrate : __WEBPACK_IMPORTED_MODULE_3_react_dom___default.a.render)(oApp, dom);
};

var update = function update(json) {
  return Object(__WEBPACK_IMPORTED_MODULE_5_organism_react_ajax__["b" /* ajaxDispatch */])('callback', {
    json: json
  });
};

var bInitWorker = false;

var client = function client(rawApp, selector) {
  var app = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createFactory(rawApp);
  setImmediate(function () {
    Object(__WEBPACK_IMPORTED_MODULE_7_win_doc__["b" /* win */])().Reshow = {
      render: render,
      app: app,
      update: update
    };
    var data = {};

    if ('undefined' !== typeof REACT_DATA) {
      data = REACT_DATA;
    }

    var appSelector = selector || '#app';
    var attachDom = Object(__WEBPACK_IMPORTED_MODULE_7_win_doc__["a" /* doc */])().querySelector(appSelector);

    if (attachDom) {
      render(new app(data), attachDom);
    }

    if (!bInitWorker) {
      Object(__WEBPACK_IMPORTED_MODULE_4_reshow_worker__["a" /* default */])();
      bInitWorker = true;
    }
  });
};

/* harmony default export */ __webpack_exports__["a"] = (client);


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.5+7f2b526d
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(40)))

/***/ }),
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_organism_react_ajax__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_get_object_value__ = __webpack_require__(10);



var initWorker = function initWorker() {
  if ('undefined' !== typeof window) {
    if (window.Worker) {
      __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 269)).then(function (workerObject) {
        workerObject = Object(__WEBPACK_IMPORTED_MODULE_1_get_object_value__["b" /* getDefault */])(workerObject);

        if (workerObject) {
          var objWorker = new workerObject();
          Object(__WEBPACK_IMPORTED_MODULE_0_organism_react_ajax__["c" /* initAjaxWorkerEvent */])(objWorker);
        }
      });
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (initWorker);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__organisms_AjaxBase__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_stores_ajaxStore__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_ajaxDispatcher__ = __webpack_require__(26);









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var AjaxLink =
/*#__PURE__*/
function (_AjaxBase) {
  Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxLink, _AjaxBase);

  function AjaxLink() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "isAlreadyTouchStart", false);

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleClick", function (onClick) {
      return function (type) {
        return function (e) {
          var target = _this.props.target;

          if ('_blank' !== target) {
            e.preventDefault();
          }

          if ('touchStart' === type) {
            _this.isAlreadyTouchStart = true;
          } else {
            if (_this.isAlreadyTouchStart) {
              _this.isAlreadyTouchStart = false;
              return;
            }
          }

          if ('function' === typeof onClick) {
            onClick(e);
          }

          if ('_blank' !== target) {
            var href = e.currentTarget.href;

            _this.go(href);
          }
        };
      };
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxLink, [{
    key: "go",
    value: function go(url) {
      var _this$props = this.props,
          callback = _this$props.callback,
          errorCallback = _this$props.errorCallback,
          updateUrl = _this$props.updateUrl,
          disableRandom = _this$props.disableRandom;
      Object(__WEBPACK_IMPORTED_MODULE_11__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
        type: 'ajaxGet',
        params: {
          disableAjax: !this.isRunAjax(),
          url: url,
          updateUrl: updateUrl,
          disableRandom: disableRandom,
          callback: callback,
          errorCallback: errorCallback
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          component = _this$props2.component,
          callback = _this$props2.callback,
          errorCallback = _this$props2.errorCallback,
          path = _this$props2.path,
          href = _this$props2.href,
          updateUrl = _this$props2.updateUrl,
          disableRandom = _this$props2.disableRandom,
          rest = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props2, ["component", "callback", "errorCallback", "path", "href", "updateUrl", "disableRandom"]);

      var _this$props3 = this.props,
          onClick = _this$props3.onClick,
          onTouchStart = _this$props3.onTouchStart;

      if (true === onTouchStart) {
        onTouchStart = this.handleClick(onTouchStart)('touchStart');
      }

      var thisHref = __WEBPACK_IMPORTED_MODULE_10__src_stores_ajaxStore__["a" /* default */].getRawUrl({
        path: path,
        url: href
      });
      var build = Object(__WEBPACK_IMPORTED_MODULE_8_react__["isValidElement"])(component) ? __WEBPACK_IMPORTED_MODULE_8_react__["cloneElement"] : __WEBPACK_IMPORTED_MODULE_8_react__["createElement"];
      return build(component, _objectSpread({}, rest, {
        href: thisHref,
        onTouchStart: onTouchStart,
        onClick: this.handleClick(onClick)('click')
      }));
    }
  }]);

  return AjaxLink;
}(__WEBPACK_IMPORTED_MODULE_9__organisms_AjaxBase__["a" /* default */]);

Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AjaxLink, "defaultProps", {
  updateUrl: true,
  disableRandom: false,
  component: 'a'
});

/* unused harmony default export */ var _unused_webpack_default_export = (AjaxLink);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _setPrototypeOf;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defaults__ = __webpack_require__(121);
/**
 * !! Important !! if update this file, need take care ie10 inherit
 */


var setProtoOf = function setProtoOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

var setDefaults = function setDefaults(o, p) {
  return setProtoOf(Object(__WEBPACK_IMPORTED_MODULE_0__defaults__["a" /* default */])(o, p), p);
};

function _setPrototypeOf(o, p, force) {
  _setPrototypeOf = Object.setPrototypeOf || ({
    __proto__: []
  } instanceof Array && !force ? setProtoOf : setDefaults);
  return _setPrototypeOf(o, p);
}

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _defaults;
function _defaults(obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
}

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANGE; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mitt__ = __webpack_require__(123);




var CHANGE = 'chg';

var Store =
/*#__PURE__*/
function () {
  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(Store, [{
    key: "reduce",
    value: function reduce() {
      console.error('Not override reduce().');
    }
  }, {
    key: "getInitialState",
    value: function getInitialState() {
      console.error('Not override getInitialState().');
    }
  }, {
    key: "equals",
    value: function equals(one, two) {
      return one === two;
    }
  }]);

  function Store(dispatcher) {
    var _this = this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Store);

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "__invokeOnDispatch", function (action) {
      var startingState = _this._state;

      var endingState = _this.reduce(startingState, action);

      if (endingState === undefined) {
        console.error('reduce() return undefined.');
      }

      if (!_this.equals(startingState, endingState)) {
        _this._state = endingState;

        _this.emit(CHANGE);
      }

      var next = _this.nextEmits.slice(0);

      _this.nextEmits = [];
      next.forEach(function (emit) {
        return _this.emit(emit);
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "emit", function (e) {
      return _this.mitt.emit(e);
    });

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "addListener", function (listener, e) {
      return _this.mitt.on(e, listener);
    });

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "removeListener", function (listener, e) {
      return _this.mitt.off(e, listener);
    });

    dispatcher.register(this.__invokeOnDispatch);
    this._state = this.reset();
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(Store, [{
    key: "reset",
    value: function reset() {
      this.mitt = new __WEBPACK_IMPORTED_MODULE_3__mitt__["a" /* default */]();
      this.nextEmits = [];
      return this.getInitialState();
    }
  }, {
    key: "getState",
    value: function getState() {
      return this._state;
    }
    /* Following not extendable */

  }]);

  return Store;
}();

/* harmony default export */ __webpack_exports__["b"] = (Store);


/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var type = function type(all) {
  return function (t) {
    return all[t] || (all[t] = []);
  };
};

var mitt = function mitt() {
  var all = type({});
  return {
    on: function on(t, handler) {
      return all(t).push(handler);
    },
    off: function off(t, handler) {
      return all(t).splice(all(t).indexOf(handler) >>> 0, 1);
    },
    emit: function emit(t, state) {
      for (var a = all(t).slice(), i = 0, j = a.length; i < j; i++) {
        a[i](state);
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (mitt);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);



var Dispatcher = function Dispatcher() {
  var _this = this;

  Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Dispatcher);

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "cbs", []);

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "register", function (cb) {
    return _this.cbs.push(cb);
  });

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "dispatch", function (payload, params) {
    if (!payload) {
      payload = {};
    }

    if ('string' === typeof payload) {
      payload = {
        type: payload,
        params: params
      };

      if (!params) {
        delete payload.params;
      }
    }

    _this.cbs.forEach(function (c) {
      return c(payload);
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Dispatcher);

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__connect__ = __webpack_require__(69);








var connectFunctional = function connectFunctional(viewFn, _getStores, _calculateState, options) {
  var FunctionalConnected =
  /*#__PURE__*/
  function (_PureComponent) {
    Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(FunctionalConnected, _PureComponent);

    function FunctionalConnected() {
      Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, FunctionalConnected);

      return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(FunctionalConnected).apply(this, arguments));
    }

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(FunctionalConnected, [{
      key: "render",
      value: function render() {
        return viewFn(this.state);
      }
    }], [{
      key: "getStores",
      value: function getStores(props) {
        return _getStores(props);
      }
    }, {
      key: "calculateState",
      value: function calculateState(prevState, props) {
        return _calculateState(prevState, props);
      }
    }]);

    return FunctionalConnected;
  }(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);

  var viewFnName = viewFn.displayName || viewFn.name || 'FunctionalConnected';
  FunctionalConnected.displayName = viewFnName;
  return Object(__WEBPACK_IMPORTED_MODULE_6__connect__["a" /* default */])(FunctionalConnected, options);
};

/* unused harmony default export */ var _unused_webpack_default_export = (connectFunctional);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_slicedToArray__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_build__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_array_dedup__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_array_dedup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_array_dedup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_flux_base__ = __webpack_require__(34);







var connectHook = function connectHook(Base, options) {
  var _ref = options || {},
      getStores = _ref.getStores,
      calculateState = _ref.calculateState,
      defaultProps = _ref.defaultProps;

  var Connected = function Connected(props) {
    var _useState = Object(__WEBPACK_IMPORTED_MODULE_2_react__["useState"])(function () {
      return calculateState({}, props);
    }),
        _useState2 = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_slicedToArray__["a" /* default */])(_useState, 2),
        data = _useState2[0],
        setData = _useState2[1];

    Object(__WEBPACK_IMPORTED_MODULE_2_react__["useEffect"])(function () {
      var stores = __WEBPACK_IMPORTED_MODULE_4_array_dedup___default()(getStores(props)) || [];

      if (stores && stores.length) {
        var handleChange = function handleChange() {
          setData(function (prevState) {
            return Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, prevState, {}, calculateState(prevState, props));
          });
        };

        stores.forEach(function (store) {
          return store.addListener(handleChange, __WEBPACK_IMPORTED_MODULE_5_reshow_flux_base__["a" /* CHANGE */]);
        });
        return function () {
          stores.forEach(function (store) {
            return store.removeListener(handleChange, __WEBPACK_IMPORTED_MODULE_5_reshow_flux_base__["a" /* CHANGE */]);
          });
        };
      }
    }, [props]);
    return Object(__WEBPACK_IMPORTED_MODULE_2_react__["useMemo"])(function () {
      return Object(__WEBPACK_IMPORTED_MODULE_3_reshow_build__["a" /* default */])(Base)(Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, props, {}, data));
    }, [props, data]);
  };

  var componentName = Base.displayName || Base.name;
  Connected.displayName = 'HookConnected(' + componentName + ')';

  if (defaultProps) {
    Connected.defaultProps = defaultProps;
  }

  return Connected;
};

/* harmony default export */ __webpack_exports__["a"] = (connectHook);

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _slicedToArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__arrayWithHoles__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterableToArrayLimit__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nonIterableRest__ = __webpack_require__(130);



function _slicedToArray(arr, i) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__arrayWithHoles__["a" /* default */])(arr) || Object(__WEBPACK_IMPORTED_MODULE_1__iterableToArrayLimit__["a" /* default */])(arr, i) || Object(__WEBPACK_IMPORTED_MODULE_2__nonIterableRest__["a" /* default */])();
}

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _arrayWithHoles;
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _iterableToArrayLimit;
var keys = Object.keys;
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  keys(arr).some(function (key, j) {
    _arr.push(arr[key]);

    if (i === j + 1) {
      return true;
    }
  });
  return _arr;
}

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _nonIterableRest;
function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var isArray = Array.isArray;

var arrayMerge = function arrayMerge() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var arg1 = args.shift();

  if (!isArray(arg1)) {
    arg1 = [arg1];
  }

  args.forEach(function (a) {
    if (null === a || 'undefined' === typeof a) {
      return;
    }

    if (isArray(a)) {
      arg1 = arg1.concat(a);
    } else {
      arg1.push(a);
    }
  });
  return arg1;
};

/* harmony default export */ __webpack_exports__["a"] = (arrayMerge);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export combineSub */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_object_value__ = __webpack_require__(10);

var keys = Object.keys;

var combine = function combine(arr, objKey) {
  var nextArr = objKey ? {} : [];
  var thisArr = Object(__WEBPACK_IMPORTED_MODULE_0_get_object_value__["a" /* default */])(arr, null, {});
  var thisKeys = keys(thisArr);

  if (!thisArr[thisKeys[0]] || !thisArr[thisKeys[0]].forEach) {
    console.warn('Not array.', {
      thisArr: thisArr,
      thisKeys: thisKeys
    }, thisKeys[0]);
    return;
  }

  thisArr[thisKeys[0]].forEach(function (val, key) {
    var next = {};
    var thisObjKey = key;
    thisKeys.forEach(function (k) {
      next[k] = Object(__WEBPACK_IMPORTED_MODULE_0_get_object_value__["a" /* default */])(thisArr, [k, key]);

      if (objKey && objKey === k) {
        thisObjKey = next[k];
      }
    });

    if (!objKey) {
      nextArr.push(next);
    } else {
      nextArr[thisObjKey] = next;
    }
  });
  return nextArr;
};

var combineSub = function combineSub(arr, subArr, key, subObjKey) {
  arr.forEach(function (a) {
    var thisSub = Object(__WEBPACK_IMPORTED_MODULE_0_get_object_value__["a" /* default */])(subArr, [a[key]]);
    a[key] = thisSub ? combine(thisSub, subObjKey) : null;
  });
  return arr;
};

/* unused harmony default export */ var _unused_webpack_default_export = (combine);


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_constant__ = __webpack_require__(18);


var keys = Object.keys;
var isArray = Array.isArray;

var removeEmpty = function removeEmpty(arr, undefinedOnly, excludeKey) {
  if (!arr) {
    return arr;
  }

  if (undefinedOnly && __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["b" /* FUNCTION */] !== Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(undefinedOnly)) {
    undefinedOnly = function undefinedOnly(value) {
      return __WEBPACK_IMPORTED_MODULE_1_reshow_constant__["f" /* UNDEFINED */] !== Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(value);
    };
  }

  var result = {};
  keys(arr).forEach(function (key) {
    var value = arr[key];

    if (excludeKey && excludeKey.length && -1 !== excludeKey.indexOf(key)) {
      return;
    }

    if (value || undefinedOnly && undefinedOnly(value)) {
      result[key] = value;
    }
  });

  if (isArray(arr)) {
    return keys(result).map(function (key) {
      return result[key];
    });
  } else {
    return result;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (removeEmpty);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_flux_base__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_get_object_value__ = __webpack_require__(10);









var ReduceStore =
/*#__PURE__*/
function (_Store) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(ReduceStore, _Store);

  function ReduceStore() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, ReduceStore);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ReduceStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(ReduceStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return Object(__WEBPACK_IMPORTED_MODULE_5_immutable__["Map"])();
    }
  }, {
    key: "getMap",
    value: function getMap(k) {
      return Object(__WEBPACK_IMPORTED_MODULE_7_get_object_value__["c" /* toJS */])(this.getState().get(k)) || {};
    }
  }]);

  return ReduceStore;
}(__WEBPACK_IMPORTED_MODULE_6_reshow_flux_base__["c" /* Store */]);

/* harmony default export */ __webpack_exports__["a"] = (ReduceStore);

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

exports.default = easeInOutCubic;
module.exports = exports['default'];

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_ajaxDispatcher__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_win_doc__ = __webpack_require__(19);











var pages = {};

var AjaxPage =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxPage, _PureComponent);

  function AjaxPage(props) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxPage);

    _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxPage).call(this, props));
    /**
     * Need put in constructor before render,
     * else AjaxLink will not get baseUrl
     */

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "_lastThemePath", '');

    Object(__WEBPACK_IMPORTED_MODULE_9__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
      type: 'config/set',
      params: props
    });
    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setImmediate(function () {
        var _this2$props = _this2.props,
            win = _this2$props.win,
            webSocketUrl = _this2$props.webSocketUrl;
        win = win || Object(__WEBPACK_IMPORTED_MODULE_10_win_doc__["b" /* win */])();

        if (win.WebSocket && webSocketUrl) {
          Object(__WEBPACK_IMPORTED_MODULE_9__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
            type: 'ws/init',
            params: {
              url: webSocketUrl
            }
          });
        }

        win.addEventListener('popstate', function (e) {
          return Object(__WEBPACK_IMPORTED_MODULE_9__src_ajaxDispatcher__["a" /* ajaxDispatch */])('updateWithUrl');
        }, true);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          themes = _this$props.themes,
          themePath = _this$props.themePath;
      var thisThemePath = themePath;

      if ('undefined' === typeof themes[thisThemePath]) {
        thisThemePath = this._lastThemePath;

        if ('undefined' === typeof themes[thisThemePath]) {
          console.error('Not find a theme for name: [' + themePath + ']', themes);
          return null;
        }
      }

      this._lastThemePath = thisThemePath;

      if (!pages[thisThemePath]) {
        var myTheme = themes[thisThemePath];
        var build;

        if (__WEBPACK_IMPORTED_MODULE_7_react___default.a.isValidElement(myTheme)) {
          build = __WEBPACK_IMPORTED_MODULE_7_react___default.a.cloneElement;
        } else {
          build = __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement;
        }

        var builded = build(myTheme);

        if (!__WEBPACK_IMPORTED_MODULE_7_react___default.a.isValidElement(builded)) {
          console.error('Not findi a valid element for name: [' + themePath + ']', themes);
          return null;
        } else {
          pages[thisThemePath] = builded;
        }
      }

      return pages[thisThemePath];
    }
  }]);

  return AjaxPage;
}(__WEBPACK_IMPORTED_MODULE_7_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AjaxPage, "defaultProps", {
  ajax: true,
  themes: {},
  win: null
});

/* harmony default export */ __webpack_exports__["a"] = (AjaxPage);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__organisms_AjaxBase__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_stores_ajaxStore__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_ajaxDispatcher__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_lib_formSerialize__ = __webpack_require__(73);









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var AjaxForm =
/*#__PURE__*/
function (_AjaxBase) {
  Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxForm, _AjaxBase);

  function AjaxForm() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleSubmit", function (e) {
      if (_this.props.stop) {
        return;
      }

      e.preventDefault();
      var _this$props = _this.props,
          callback = _this$props.callback,
          errorCallback = _this$props.errorCallback,
          updateUrl = _this$props.updateUrl,
          beforeSubmit = _this$props.beforeSubmit,
          afterSubmit = _this$props.afterSubmit;
      var otherParams = {};

      if (beforeSubmit) {
        otherParams = beforeSubmit(e);

        if (!otherParams) {
          otherParams = {};
        }
      }

      if (otherParams.pause) {
        // pause by beforeSubmit
        return false;
      }

      var formDom = e.target;
      var action = formDom.action;
      var formParams = Object(__WEBPACK_IMPORTED_MODULE_12__src_lib_formSerialize__["a" /* default */])(formDom);
      var type;

      switch (formDom.method.toLowerCase()) {
        case 'post':
          type = 'ajaxPost';
          break;

        /**
         * Default method
         * https://www.w3schools.com/tags/att_form_method.asp
         */

        default:
        case 'get':
          type = 'ajaxGet';
          otherParams = _objectSpread({}, otherParams, {
            disableAjax: !_this.isRunAjax(),
            updateUrl: updateUrl
          });
          break;
      }

      Object(__WEBPACK_IMPORTED_MODULE_11__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
        type: type,
        params: _objectSpread({
          url: action,
          query: formParams,
          callback: callback,
          errorCallback: errorCallback
        }, otherParams)
      });

      if (afterSubmit) {
        afterSubmit(e);
      }
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxForm, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          action = _this$props2.action,
          afterSubmit = _this$props2.afterSubmit,
          beforeSubmit = _this$props2.beforeSubmit,
          callback = _this$props2.callback,
          component = _this$props2.component,
          errorCallback = _this$props2.errorCallback,
          path = _this$props2.path,
          stop = _this$props2.stop,
          updateUrl = _this$props2.updateUrl,
          rest = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props2, ["action", "afterSubmit", "beforeSubmit", "callback", "component", "errorCallback", "path", "stop", "updateUrl"]);

      var thisUrl = __WEBPACK_IMPORTED_MODULE_10__src_stores_ajaxStore__["a" /* default */].getRawUrl({
        url: action,
        path: path
      });
      var build = Object(__WEBPACK_IMPORTED_MODULE_8_react__["isValidElement"])(component) ? __WEBPACK_IMPORTED_MODULE_8_react__["cloneElement"] : __WEBPACK_IMPORTED_MODULE_8_react__["createElement"];
      return build(component, _objectSpread({
        action: thisUrl,
        onSubmit: this.handleSubmit
      }, rest));
    }
  }]);

  return AjaxForm;
}(__WEBPACK_IMPORTED_MODULE_9__organisms_AjaxBase__["a" /* default */]);

Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AjaxForm, "defaultProps", {
  updateUrl: false,
  stop: false,
  component: 'form'
});

/* unused harmony default export */ var _unused_webpack_default_export = (AjaxForm);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__urlDispatcher__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_seturl__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_win_doc__ = __webpack_require__(19);







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var keys = Object.keys;

var updateUrl = function updateUrl(url) {
  return history.pushState && history.pushState('', '', url);
};

var URL =
/*#__PURE__*/
function () {
  function URL(loc) {
    Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, URL);

    Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(this, "loc", {});

    this.loc = _objectSpread({}, loc);
  }

  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_createClass__["a" /* default */])(URL, [{
    key: "getHref",
    value: function getHref(loc) {
      return this.loc.href;
    }
  }, {
    key: "get",
    value: function get(key) {
      var value;

      if (0 === key.indexOf(':')) {
        var cookKey = key.substr(1);
        value = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(this.loc, [key.substr(1)]);

        if ('pathname' === cookKey) {
          value = value.split('/');
        }
      } else {
        var href = this.getHref();

        if (href) {
          value = Object(__WEBPACK_IMPORTED_MODULE_9_seturl__["b" /* getUrl */])(key, this.getHref());
        }
      }

      return value;
    }
  }]);

  return URL;
}();

var UrlStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_inherits__["a" /* default */])(UrlStore, _ReduceStore);

  function UrlStore() {
    Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, UrlStore);

    return Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(UrlStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_createClass__["a" /* default */])(UrlStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      var _this = this;

      var loc = {};
      setTimeout(function () {
        var oDoc = Object(__WEBPACK_IMPORTED_MODULE_10_win_doc__["a" /* doc */])();

        if (oDoc.URL) {
          Object(__WEBPACK_IMPORTED_MODULE_7__urlDispatcher__["b" /* urlDispatch */])({
            type: 'url',
            url: oDoc.URL
          });

          _this.registerEvent(Object(__WEBPACK_IMPORTED_MODULE_10_win_doc__["b" /* win */])());
        }
      });
      return new URL({});
    }
  }, {
    key: "registerEvent",
    value: function registerEvent(win) {
      if (win && win.document) {
        win.addEventListener('popstate', function () {
          Object(__WEBPACK_IMPORTED_MODULE_7__urlDispatcher__["b" /* urlDispatch */])({
            type: 'url',
            url: Object(__WEBPACK_IMPORTED_MODULE_10_win_doc__["a" /* doc */])().URL
          });
        }, true);
      }
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      var oDoc = Object(__WEBPACK_IMPORTED_MODULE_10_win_doc__["a" /* doc */])();

      if (!oDoc.URL) {
        return state;
      }

      var url;
      var urlV;

      switch (action.type) {
        case 'url':
          url = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(action, ['url']);

          if (!url) {
            console.error('Not assign url', action);
          }

          break;

        case 'query':
          url = oDoc.URL;
          keys(Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(action.params, null, [])).forEach(function (key) {
            urlV = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(action.params, [key]);
            url = urlV != null ? Object(__WEBPACK_IMPORTED_MODULE_9_seturl__["a" /* default */])(key, urlV, url) : Object(__WEBPACK_IMPORTED_MODULE_9_seturl__["c" /* unsetUrl */])(key, url);
          });
          break;
      }

      if (url !== oDoc.URL) {
        updateUrl(url);
        return new URL(oDoc.location); // need put after updateUrl for new url effect
      } else {
        if (url !== state.getHref()) {
          return new URL(oDoc.location);
        }

        return state;
      }
    }
  }]);

  return UrlStore;
}(__WEBPACK_IMPORTED_MODULE_6_reshow_flux__["b" /* ReduceStore */]);

/* unused harmony default export */ var _unused_webpack_default_export = (new UrlStore(__WEBPACK_IMPORTED_MODULE_7__urlDispatcher__["a" /* default */]));

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_safe_reg__ = __webpack_require__(75);


var getRegString = function getRegString(name) {
  return '(([#?&])' + Object(__WEBPACK_IMPORTED_MODULE_0_get_safe_reg__["default"])(name) + '=)([^&#]*)';
};

var cache = Object(__WEBPACK_IMPORTED_MODULE_0_get_safe_reg__["cacheReg"])({})(getRegString);
/* harmony default export */ __webpack_exports__["a"] = (function (name) {
  return cache(name);
});

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stores_urlStore__ = __webpack_require__(76);
/* unused harmony reexport urlStore */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__urlDispatcher__ = __webpack_require__(77);
/* unused harmony reexport urlDispatch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_organisms_UrlReturn__ = __webpack_require__(144);
/* unused harmony reexport UrlReturn */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_organisms_ClientRoute__ = __webpack_require__(147);
/* unused harmony reexport ClientRoute */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__handleAnchor__ = __webpack_require__(104);
/* unused harmony reexport handleAnchor */
/* unused harmony reexport goToAnchor */

 // component

 // Router

 // Library



/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__organisms_AjaxBase__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_stores_ajaxStore__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_ajaxDispatcher__ = __webpack_require__(27);














var AjaxLink =
/*#__PURE__*/
function (_AjaxBase) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxLink, _AjaxBase);

  function AjaxLink() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "isAlreadyTouchStart", false);

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleClick", function (onClick) {
      return function (type) {
        return function (e) {
          var target = _this.props.target;

          if ('_blank' !== target) {
            e.preventDefault();
          }

          if ('touchStart' === type) {
            _this.isAlreadyTouchStart = true;
          } else {
            if (_this.isAlreadyTouchStart) {
              _this.isAlreadyTouchStart = false;
              return;
            }
          }

          if ('function' === typeof onClick) {
            onClick(e);
          }

          if ('_blank' !== target) {
            var href = e.currentTarget.href;

            _this.go(href);
          }
        };
      };
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxLink, [{
    key: "go",
    value: function go(url) {
      var _this$props = this.props,
          callback = _this$props.callback,
          errorCallback = _this$props.errorCallback,
          updateUrl = _this$props.updateUrl,
          disableRandom = _this$props.disableRandom;
      Object(__WEBPACK_IMPORTED_MODULE_12__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
        type: 'ajaxGet',
        params: {
          disableAjax: !this.isRunAjax(),
          url: url,
          updateUrl: updateUrl,
          disableRandom: disableRandom,
          callback: callback,
          errorCallback: errorCallback
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          component = _this$props2.component,
          callback = _this$props2.callback,
          errorCallback = _this$props2.errorCallback,
          path = _this$props2.path,
          href = _this$props2.href,
          updateUrl = _this$props2.updateUrl,
          disableRandom = _this$props2.disableRandom,
          rest = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props2, ["component", "callback", "errorCallback", "path", "href", "updateUrl", "disableRandom"]);

      var _this$props3 = this.props,
          onClick = _this$props3.onClick,
          onTouchStart = _this$props3.onTouchStart;

      if (true === onTouchStart) {
        onTouchStart = this.handleClick(onTouchStart)('touchStart');
      }

      var thisHref = __WEBPACK_IMPORTED_MODULE_11__src_stores_ajaxStore__["a" /* default */].getRawUrl({
        path: path,
        url: href
      });
      var build = Object(__WEBPACK_IMPORTED_MODULE_9_react__["isValidElement"])(component) ? __WEBPACK_IMPORTED_MODULE_9_react__["cloneElement"] : __WEBPACK_IMPORTED_MODULE_9_react__["createElement"];
      return build(component, Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, rest, {
        href: thisHref,
        onTouchStart: onTouchStart,
        onClick: this.handleClick(onClick)('click')
      }));
    }
  }]);

  return AjaxLink;
}(__WEBPACK_IMPORTED_MODULE_10__organisms_AjaxBase__["a" /* default */]);

Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AjaxLink, "defaultProps", {
  updateUrl: true,
  disableRandom: false,
  component: 'a'
});

/* unused harmony default export */ var _unused_webpack_default_export = (AjaxLink);

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_ajaxDispatcher__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_win_doc__ = __webpack_require__(19);











var pages = {};

var AjaxPage =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxPage, _PureComponent);

  function AjaxPage(props) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxPage);

    _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxPage).call(this, props));
    /**
     * Need put in constructor before render,
     * else AjaxLink will not get baseUrl
     */

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "_lastThemePath", '');

    Object(__WEBPACK_IMPORTED_MODULE_9__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
      type: 'config/set',
      params: props
    });
    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setImmediate(function () {
        var _this2$props = _this2.props,
            win = _this2$props.win,
            webSocketUrl = _this2$props.webSocketUrl;
        win = win || Object(__WEBPACK_IMPORTED_MODULE_10_win_doc__["b" /* win */])();

        if (win.WebSocket && webSocketUrl) {
          Object(__WEBPACK_IMPORTED_MODULE_9__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
            type: 'ws/init',
            params: {
              url: webSocketUrl
            }
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          themes = _this$props.themes,
          themePath = _this$props.themePath;
      var thisThemePath = themePath;

      if ('undefined' === typeof themes[thisThemePath]) {
        thisThemePath = this._lastThemePath;

        if ('undefined' === typeof themes[thisThemePath]) {
          console.error('Not find a theme for name: [' + themePath + ']', themes);
          return null;
        }
      }

      this._lastThemePath = thisThemePath;

      if (!pages[thisThemePath]) {
        var myTheme = themes[thisThemePath];
        var build;

        if (__WEBPACK_IMPORTED_MODULE_7_react___default.a.isValidElement(myTheme)) {
          build = __WEBPACK_IMPORTED_MODULE_7_react___default.a.cloneElement;
        } else {
          build = __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement;
        }

        var builded = build(myTheme);

        if (!__WEBPACK_IMPORTED_MODULE_7_react___default.a.isValidElement(builded)) {
          console.error('Not findi a valid element for name: [' + themePath + ']', themes);
          return null;
        } else {
          pages[thisThemePath] = builded;
        }
      }

      return pages[thisThemePath];
    }
  }]);

  return AjaxPage;
}(__WEBPACK_IMPORTED_MODULE_7_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AjaxPage, "defaultProps", {
  ajax: true,
  themes: {},
  win: null
});

/* unused harmony default export */ var _unused_webpack_default_export = (AjaxPage);

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__organisms_AjaxBase__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_stores_ajaxStore__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_ajaxDispatcher__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_lib_formSerialize__ = __webpack_require__(80);















var AjaxForm =
/*#__PURE__*/
function (_AjaxBase) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(AjaxForm, _AjaxBase);

  function AjaxForm() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AjaxForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AjaxForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleSubmit", function (e) {
      if (_this.props.stop) {
        return;
      }

      e.preventDefault();
      var _this$props = _this.props,
          callback = _this$props.callback,
          errorCallback = _this$props.errorCallback,
          updateUrl = _this$props.updateUrl,
          beforeSubmit = _this$props.beforeSubmit,
          afterSubmit = _this$props.afterSubmit;
      var otherParams = {};

      if (beforeSubmit) {
        otherParams = beforeSubmit(e);

        if (!otherParams) {
          otherParams = {};
        }
      }

      if (otherParams.pause) {
        // pause by beforeSubmit
        return false;
      }

      var formDom = e.target;
      var action = formDom.action;
      var formParams = Object(__WEBPACK_IMPORTED_MODULE_13__src_lib_formSerialize__["a" /* default */])(formDom);
      var type;

      switch (formDom.method.toLowerCase()) {
        case 'post':
          type = 'ajaxPost';
          break;

        /**
         * Default method
         * https://www.w3schools.com/tags/att_form_method.asp
         */

        default:
        case 'get':
          type = 'ajaxGet';
          otherParams = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, otherParams, {
            disableAjax: !_this.isRunAjax(),
            updateUrl: updateUrl
          });
          break;
      }

      Object(__WEBPACK_IMPORTED_MODULE_12__src_ajaxDispatcher__["a" /* ajaxDispatch */])({
        type: type,
        params: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
          url: action,
          query: formParams,
          callback: callback,
          errorCallback: errorCallback
        }, otherParams)
      });

      if (afterSubmit) {
        afterSubmit(e);
      }
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(AjaxForm, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          action = _this$props2.action,
          afterSubmit = _this$props2.afterSubmit,
          beforeSubmit = _this$props2.beforeSubmit,
          callback = _this$props2.callback,
          component = _this$props2.component,
          errorCallback = _this$props2.errorCallback,
          path = _this$props2.path,
          stop = _this$props2.stop,
          updateUrl = _this$props2.updateUrl,
          rest = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props2, ["action", "afterSubmit", "beforeSubmit", "callback", "component", "errorCallback", "path", "stop", "updateUrl"]);

      var thisUrl = __WEBPACK_IMPORTED_MODULE_11__src_stores_ajaxStore__["a" /* default */].getRawUrl({
        url: action,
        path: path
      });
      var build = Object(__WEBPACK_IMPORTED_MODULE_9_react__["isValidElement"])(component) ? __WEBPACK_IMPORTED_MODULE_9_react__["cloneElement"] : __WEBPACK_IMPORTED_MODULE_9_react__["createElement"];
      return build(component, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
        action: thisUrl,
        onSubmit: this.handleSubmit
      }, rest));
    }
  }]);

  return AjaxForm;
}(__WEBPACK_IMPORTED_MODULE_10__organisms_AjaxBase__["a" /* default */]);

Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AjaxForm, "defaultProps", {
  updateUrl: false,
  stop: false,
  component: 'form'
});

/* unused harmony default export */ var _unused_webpack_default_export = (AjaxForm);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_build__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_return__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_stores_urlStore__ = __webpack_require__(76);








var myReturnOptions = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_4_reshow_return__["b" /* returnOptions */], {
  defaultProps: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_4_reshow_return__["b" /* returnOptions */].defaultProps, {
    stores: [__WEBPACK_IMPORTED_MODULE_6__src_stores_urlStore__["a" /* default */]]
  })
});

var UrlReturn = function UrlReturn(_ref) {
  var children = _ref.children,
      props = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["children"]);

  return Object(__WEBPACK_IMPORTED_MODULE_3_reshow_build__["a" /* default */])(children)(__WEBPACK_IMPORTED_MODULE_4_reshow_return__["b" /* returnOptions */].reset(props));
};

UrlReturn.displayName = 'UrlReturn';
/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_5_reshow_flux__["d" /* connectHook */])(UrlReturn, myReturnOptions));

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

/* harmony default export */ __webpack_exports__["a"] = (memoizeOne);


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Return; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_build__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_returnOptions__ = __webpack_require__(82);






var Return = function Return(_ref) {
  var children = _ref.children,
      props = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["children"]);

  return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_build__["a" /* default */])(children)(__WEBPACK_IMPORTED_MODULE_4__src_returnOptions__["a" /* default */].reset(props));
};

Return.displayName = 'Return';
/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_3_reshow_flux__["d" /* connectHook */])(Return, __WEBPACK_IMPORTED_MODULE_4__src_returnOptions__["a" /* default */]));


/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_get__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_organism_react_ajax__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reshow__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_handleAnchor__ = __webpack_require__(104);












var defaultOnUrlChange = function defaultOnUrlChange(url) {
  return function (handleAnchor) {
    return function (goAnchorDelay) {
      var separator = '/';
      var params = url.split(separator);
      var last = params.length - 1;
      var lastPath = params[last];
      var next = {
        pvid: url,
        themePath: null
      };

      if (lastPath) {
        next.themePath = handleAnchor(lastPath)(goAnchorDelay);
      }

      return next;
    };
  };
};

var ClientRoute =
/*#__PURE__*/
function (_Reshow) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(ClientRoute, _Reshow);

  function ClientRoute() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, ClientRoute);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ClientRoute).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(ClientRoute, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_get__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(ClientRoute.prototype), "componentDidMount", this).call(this);

      var props = this.props;
      var curUrl = props.url || Object(__WEBPACK_IMPORTED_MODULE_8_win_doc__["a" /* doc */])().URL;
      var _this$props = this.props,
          onUrlChange = _this$props.onUrlChange,
          goAnchorDelay = _this$props.goAnchorDelay;

      var handleUrlChange = function handleUrlChange(url) {
        var thisUrlChangeFunc = onUrlChange ? onUrlChange : defaultOnUrlChange;
        var urlChangeStates = thisUrlChangeFunc(url)(__WEBPACK_IMPORTED_MODULE_10__src_handleAnchor__["a" /* default */])(goAnchorDelay);
        return urlChangeStates;
      };

      Object(__WEBPACK_IMPORTED_MODULE_9_reshow__["c" /* update */])(handleUrlChange(curUrl)); //reset themePath

      setImmediate(function () {
        return Object(__WEBPACK_IMPORTED_MODULE_7_organism_react_ajax__["a" /* ajaxDispatch */])('config/set', {
          onUrlChange: onUrlChange
        });
      });
    }
  }]);

  return ClientRoute;
}(__WEBPACK_IMPORTED_MODULE_9_reshow__["a" /* default */]);

Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(ClientRoute, "defaultProps", {
  ajax: false,
  goAnchorDelay: 1500
});

/* unused harmony default export */ var _unused_webpack_default_export = (ClientRoute);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_constant__ = __webpack_require__(18);





var keys = Object.keys;

var toInt = function toInt(d) {
  return parseInt(d, 10);
};

var Storage =
/*#__PURE__*/
function () {
  function Storage(_storage) {
    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Storage);

    this._storage = _storage;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(Storage, [{
    key: "set",
    value: function set(k, v) {
      var _v = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_3_get_object_value__["c" /* toJS */])(v));

      var vLen = _v.length;
      var s = vLen + ',' + _v;

      this._storage(k)(s);

      return new Storage(this._storage);
    }
  }, {
    key: "merge",
    value: function merge(arr) {
      var _this = this;

      if (!arr || __WEBPACK_IMPORTED_MODULE_4_reshow_constant__["c" /* OBJECT */] !== Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(arr)) {
        return this;
      }

      var pKeys = keys(arr);

      if (!pKeys || !pKeys.length) {
        return this;
      }

      pKeys.forEach(function (key) {
        return _this.set(key, arr[key]);
      });
      return new Storage(this._storage);
    }
  }, {
    key: "get",
    value: function get(k) {
      var s = this._storage(k)();

      if (!s) {
        return;
      }

      var iStar = s.indexOf(',');
      var vLen = toInt(s.substring(0, iStar));
      var value = s.substr(iStar + 1);
      return vLen === value.length ? JSON.parse(value) : null;
    }
  }]);

  return Storage;
}();

/* harmony default export */ __webpack_exports__["a"] = (Storage);

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_get_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__localStorageStore__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__storageDispatcher__ = __webpack_require__(52);









var SessionStorageStore =
/*#__PURE__*/
function (_LocalStorageStore) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(SessionStorageStore, _LocalStorageStore);

  function SessionStorageStore() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, SessionStorageStore);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(SessionStorageStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(SessionStorageStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return new __WEBPACK_IMPORTED_MODULE_5_get_storage__["a" /* Storage */](__WEBPACK_IMPORTED_MODULE_5_get_storage__["c" /* sessionStorage */]);
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'session':
          return this.updateStorage(state, action);

        default:
          return state;
      }
    }
  }]);

  return SessionStorageStore;
}(__WEBPACK_IMPORTED_MODULE_6__localStorageStore__["a" /* LocalStorageStore */]);

/* unused harmony default export */ var _unused_webpack_default_export = (new SessionStorageStore(__WEBPACK_IMPORTED_MODULE_7__storageDispatcher__["a" /* default */]));

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_organism_react_popup__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reshow_return__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__molecules_ReshowComponent__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_stores_messageStore__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_index__ = __webpack_require__(83);












 // src




var Body =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__["a" /* default */])(Body, _PureComponent);

  function Body() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Body);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Body)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleDismiss", function (item) {
      Object(__WEBPACK_IMPORTED_MODULE_14__src_index__["b" /* dispatch */])('alert/del', {
        id: item.id
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleClick", function (e, item) {
      setTimeout(function () {
        var dialog = _this.props.dialog;

        if (dialog) {
          Object(__WEBPACK_IMPORTED_MODULE_14__src_index__["b" /* dispatch */])('dialog/end', {
            item: item
          });
        }
      });
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(Body, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          defaultAlertProps = _this$props.defaultAlertProps,
          defaultDialogProps = _this$props.defaultDialogProps,
          alerts = _this$props.alerts,
          alertProps = _this$props.alertProps,
          alertComponent = _this$props.alertComponent,
          dialog = _this$props.dialog,
          dialogProps = _this$props.dialogProps,
          dialogComponent = _this$props.dialogComponent;
      var thisDialog = null;

      if (dialog) {
        thisDialog = __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_organism_react_popup__["c" /* DisplayPopupEl */], null, Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["build"])(dialogComponent)(Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, defaultDialogProps, {}, Object(__WEBPACK_IMPORTED_MODULE_11_reshow_return__["c" /* toJS */])(dialogProps), {
          onClick: this.handleClick,
          onClose: this.handleClick
        }), Object(__WEBPACK_IMPORTED_MODULE_11_reshow_return__["c" /* toJS */])(dialog)));
      }

      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["SemanticUI"], null, thisDialog, Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["build"])(alertComponent)(Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, defaultAlertProps, {}, Object(__WEBPACK_IMPORTED_MODULE_11_reshow_return__["c" /* toJS */])(alertProps), {
        onDismiss: this.handleDismiss,
        alerts: Object(__WEBPACK_IMPORTED_MODULE_11_reshow_return__["c" /* toJS */])(alerts)
      })));
    }
  }]);

  return Body;
}(__WEBPACK_IMPORTED_MODULE_8_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Body, "defaultProps", {
  dialogComponent: __WEBPACK_IMPORTED_MODULE_9_organism_react_popup__["b" /* Dialog */],
  alertComponent: __WEBPACK_IMPORTED_MODULE_9_organism_react_popup__["a" /* AlertsNotifier */]
});

var ReshowMessage = Object(__WEBPACK_IMPORTED_MODULE_8_react__["memo"])(function (props) {
  return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__molecules_ReshowComponent__["a" /* Return */], {
    stores: [__WEBPACK_IMPORTED_MODULE_13__src_stores_messageStore__["a" /* default */]],
    initStates: ['alerts', 'alertProps', 'dialog', 'dialogProps']
  }, __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(Body, props));
});
ReshowMessage.displayName = 'ReshowMessage';
/* unused harmony default export */ var _unused_webpack_default_export = (ReshowMessage);

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_prop_types__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_immutable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_organism_react_animate__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ricon_X__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ricon_X___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ricon_X__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_react_atomic_molecule__ = __webpack_require__(16);















var messageTypes = ['success', 'info', 'warning', 'error'];

var Alert =
/*#__PURE__*/
function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(Alert, _Component);

  function Alert() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Alert);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Alert)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "state", {
      hoverStyle: null
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleMouseEnter", function () {
      _this.setState({
        hoverStyle: {
          opacity: '.9'
        }
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleMouseLeave", function () {
      _this.setState({
        hoverStyle: null
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleClick", function () {
      var onClick = _this.props.onClick;
      onClick();
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(Alert, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          duration = _this$props.duration,
          onClick = _this$props.onClick;

      if (duration * 1 > 0) {
        setTimeout(function () {
          return onClick();
        }, duration);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          messageType = _this$props2.messageType,
          header = _this$props2.header,
          message = _this$props2.message,
          onClick = _this$props2.onClick;
      var hoverStyle = this.state.hoverStyle;
      return __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14_react_atomic_molecule__["Message"], {
        messageType: messageType,
        header: header
      }, message, __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_ricon_X___default.a, {
        style: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Styles.xicon, {}, hoverStyle),
        weight: ".1rem",
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onClick: this.handleClick
      }));
    }
  }]);

  return Alert;
}(__WEBPACK_IMPORTED_MODULE_9_react__["Component"]);

var AlertsNotifier =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(AlertsNotifier, _PureComponent);

  function AlertsNotifier() {
    var _getPrototypeOf3;

    var _this2;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AlertsNotifier);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf3 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AlertsNotifier)).call.apply(_getPrototypeOf3, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this2), "state", {
      dismissedAlerts: Object(__WEBPACK_IMPORTED_MODULE_11_immutable__["Set"])()
    });

    return _this2;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(AlertsNotifier, [{
    key: "dismiss",
    value: function dismiss(item) {
      var onDismiss = this.props.onDismiss;

      if ('function' === typeof onDismiss) {
        onDismiss(item);
      } //if no callback for dismissal, just update our state


      this.setState(function (_ref) {
        var dismissedAlerts = _ref.dismissedAlerts;
        return {
          dismissedAlerts: dismissedAlerts.add(item)
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          ani = _this$props3.ani,
          alerts = _this$props3.alerts,
          position = _this$props3.position,
          duration = _this$props3.duration;
      var dismissedAlerts = this.state.dismissedAlerts;
      var alertArr = [];

      if (alerts && alerts.length) {
        alerts.forEach(function (item, key) {
          var thisItem = 'string' === typeof item ? {
            message: item
          } : item;

          if (!dismissedAlerts.has(item)) {
            if (-1 === messageTypes.indexOf(thisItem.type)) {
              thisItem.type = 'info';
            }

            var oAlert = __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(Alert, {
              key: key,
              duration: duration,
              messageType: thisItem.type,
              message: thisItem.message,
              header: thisItem.header,
              onClick: _this3.dismiss.bind(_this3, item)
            });
            alertArr.push(oAlert);
          }
        });
      }

      var positionStyle = {};

      if ('top' === position) {
        positionStyle.top = 5;
      } else {
        positionStyle.bottom = 5;
      }

      return __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_organism_react_animate__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, ani, {
        style: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Styles.container, {}, positionStyle)
      }), alertArr);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var alerts = nextProps.alerts;

      if (alerts !== prevState.prevPropsAlerts) {
        return {
          prevPropsAlerts: alerts,
          dismissedAlerts: Object(__WEBPACK_IMPORTED_MODULE_11_immutable__["Set"])()
        };
      } else {
        return null;
      }
    }
  }]);

  return AlertsNotifier;
}(__WEBPACK_IMPORTED_MODULE_9_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AlertsNotifier, "defaultProps", {
  ani: {
    appear: 'fadeIn',
    enter: 'fadeIn',
    leave: 'fadeOut'
  },
  position: 'top',
  name: 'alerts',
  duration: 3000
});

AlertsNotifier.propTypes = process.env.NODE_ENV !== "production" ? {
  alerts: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.array,
  onDismiss: __WEBPACK_IMPORTED_MODULE_10_prop_types___default.a.func
} : {};
/* harmony default export */ __webpack_exports__["a"] = (AlertsNotifier);
var Styles = {
  container: {
    position: 'fixed',
    left: 10,
    right: 10,
    zIndex: 9999
  },
  xicon: {
    top: 20,
    right: 10,
    opacity: '.5'
  }
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.12.0
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):
60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.fundamental"):60117,w=b?Symbol.for("react.responder"):60118,x=b?Symbol.for("react.scope"):60119;function y(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function z(a){return y(a)===m}
exports.typeOf=y;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===v||a.$$typeof===w||a.$$typeof===x)};exports.isAsyncMode=function(a){return z(a)||y(a)===l};exports.isConcurrentMode=z;exports.isContextConsumer=function(a){return y(a)===k};exports.isContextProvider=function(a){return y(a)===h};
exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return y(a)===n};exports.isFragment=function(a){return y(a)===e};exports.isLazy=function(a){return y(a)===t};exports.isMemo=function(a){return y(a)===r};exports.isPortal=function(a){return y(a)===d};exports.isProfiler=function(a){return y(a)===g};exports.isStrictMode=function(a){return y(a)===f};exports.isSuspense=function(a){return y(a)===p};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.12.0
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var lowPriorityWarningWithoutStack = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.warn(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarningWithoutStack = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(void 0, [format].concat(args));
    }
  };
}

var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(87);
var assign = __webpack_require__(24);

var ReactPropTypesSecret = __webpack_require__(43);
var checkPropTypes = __webpack_require__(42);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(43);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var getChildMapping = function getChildMapping(children, mapFn) {
  var mapper = function mapper(child, key) {
    return mapFn ? mapFn(child, key) : child;
  };

  var result = {};

  if (children) {
    // map for auto assign child.key
    __WEBPACK_IMPORTED_MODULE_0_react__["Children"].map(children, function (c) {
      return c;
    }).forEach(function (child) {
      if (!child) {
        return;
      }

      result[child.key] = mapper(child, child.key);
    });
  }

  return result;
};

/* harmony default export */ __webpack_exports__["a"] = (getChildMapping);

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hasClass = __webpack_require__(54);

var _hasClass2 = _interopRequireDefault(_hasClass);

var _removeClass = __webpack_require__(92);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _mixClass = __webpack_require__(90);

var _mixClass2 = _interopRequireDefault(_mixClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleClass = function toggleClass(classes, name) {
    if ((0, _hasClass2.default)(classes, name)) {
        classes = (0, _removeClass2.default)(classes, name);
    } else {
        classes = (0, _mixClass2.default)(classes, name);
    }
    return classes;
};

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_atoms_a__ = __webpack_require__(159);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_0__ui_atoms_a__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_atoms_article__ = __webpack_require__(160);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Article", function() { return __WEBPACK_IMPORTED_MODULE_1__ui_atoms_article__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_atoms_button__ = __webpack_require__(161);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return __WEBPACK_IMPORTED_MODULE_2__ui_atoms_button__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_atoms_circle__ = __webpack_require__(162);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return __WEBPACK_IMPORTED_MODULE_3__ui_atoms_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_atoms_div__ = __webpack_require__(163);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Div", function() { return __WEBPACK_IMPORTED_MODULE_4__ui_atoms_div__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_atoms_dl__ = __webpack_require__(164);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dl", function() { return __WEBPACK_IMPORTED_MODULE_5__ui_atoms_dl__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_atoms_footer__ = __webpack_require__(165);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return __WEBPACK_IMPORTED_MODULE_6__ui_atoms_footer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ui_atoms_form__ = __webpack_require__(166);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return __WEBPACK_IMPORTED_MODULE_7__ui_atoms_form__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ui_atoms_g__ = __webpack_require__(167);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_8__ui_atoms_g__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ui_atoms_h1__ = __webpack_require__(168);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H1", function() { return __WEBPACK_IMPORTED_MODULE_9__ui_atoms_h1__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ui_atoms_h2__ = __webpack_require__(169);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H2", function() { return __WEBPACK_IMPORTED_MODULE_10__ui_atoms_h2__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ui_atoms_h3__ = __webpack_require__(170);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H3", function() { return __WEBPACK_IMPORTED_MODULE_11__ui_atoms_h3__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ui_atoms_h4__ = __webpack_require__(171);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H4", function() { return __WEBPACK_IMPORTED_MODULE_12__ui_atoms_h4__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ui_atoms_h5__ = __webpack_require__(172);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H5", function() { return __WEBPACK_IMPORTED_MODULE_13__ui_atoms_h5__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ui_atoms_h6__ = __webpack_require__(173);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H6", function() { return __WEBPACK_IMPORTED_MODULE_14__ui_atoms_h6__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ui_atoms_header__ = __webpack_require__(174);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return __WEBPACK_IMPORTED_MODULE_15__ui_atoms_header__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ui_atoms_i__ = __webpack_require__(175);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_16__ui_atoms_i__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ui_atoms_iframe__ = __webpack_require__(176);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Iframe", function() { return __WEBPACK_IMPORTED_MODULE_17__ui_atoms_iframe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ui_atoms_img__ = __webpack_require__(177);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Img", function() { return __WEBPACK_IMPORTED_MODULE_18__ui_atoms_img__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ui_atoms_input__ = __webpack_require__(178);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return __WEBPACK_IMPORTED_MODULE_19__ui_atoms_input__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ui_atoms_label__ = __webpack_require__(179);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return __WEBPACK_IMPORTED_MODULE_20__ui_atoms_label__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ui_atoms_li__ = __webpack_require__(180);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Li", function() { return __WEBPACK_IMPORTED_MODULE_21__ui_atoms_li__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ui_atoms_line__ = __webpack_require__(181);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return __WEBPACK_IMPORTED_MODULE_22__ui_atoms_line__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ui_atoms_main__ = __webpack_require__(182);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return __WEBPACK_IMPORTED_MODULE_23__ui_atoms_main__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ui_atoms_nav__ = __webpack_require__(183);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Nav", function() { return __WEBPACK_IMPORTED_MODULE_24__ui_atoms_nav__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ui_atoms_ol__ = __webpack_require__(184);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ol", function() { return __WEBPACK_IMPORTED_MODULE_25__ui_atoms_ol__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ui_atoms_p__ = __webpack_require__(185);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return __WEBPACK_IMPORTED_MODULE_26__ui_atoms_p__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ui_atoms_path__ = __webpack_require__(186);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return __WEBPACK_IMPORTED_MODULE_27__ui_atoms_path__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ui_atoms_polygon__ = __webpack_require__(187);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return __WEBPACK_IMPORTED_MODULE_28__ui_atoms_polygon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ui_atoms_rect__ = __webpack_require__(188);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return __WEBPACK_IMPORTED_MODULE_29__ui_atoms_rect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ui_atoms_section__ = __webpack_require__(189);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return __WEBPACK_IMPORTED_MODULE_30__ui_atoms_section__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ui_atoms_select__ = __webpack_require__(190);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Select", function() { return __WEBPACK_IMPORTED_MODULE_31__ui_atoms_select__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ui_atoms_source__ = __webpack_require__(191);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Source", function() { return __WEBPACK_IMPORTED_MODULE_32__ui_atoms_source__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ui_atoms_span__ = __webpack_require__(192);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Span", function() { return __WEBPACK_IMPORTED_MODULE_33__ui_atoms_span__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ui_atoms_style__ = __webpack_require__(193);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return __WEBPACK_IMPORTED_MODULE_34__ui_atoms_style__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ui_atoms_svg__ = __webpack_require__(194);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Svg", function() { return __WEBPACK_IMPORTED_MODULE_35__ui_atoms_svg__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ui_atoms_table__ = __webpack_require__(195);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return __WEBPACK_IMPORTED_MODULE_36__ui_atoms_table__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ui_atoms_td__ = __webpack_require__(196);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Td", function() { return __WEBPACK_IMPORTED_MODULE_37__ui_atoms_td__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ui_atoms_text__ = __webpack_require__(197);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return __WEBPACK_IMPORTED_MODULE_38__ui_atoms_text__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ui_atoms_textarea__ = __webpack_require__(198);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Textarea", function() { return __WEBPACK_IMPORTED_MODULE_39__ui_atoms_textarea__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ui_atoms_th__ = __webpack_require__(199);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Th", function() { return __WEBPACK_IMPORTED_MODULE_40__ui_atoms_th__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ui_atoms_tr__ = __webpack_require__(200);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Tr", function() { return __WEBPACK_IMPORTED_MODULE_41__ui_atoms_tr__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ui_atoms_tspan__ = __webpack_require__(201);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Tspan", function() { return __WEBPACK_IMPORTED_MODULE_42__ui_atoms_tspan__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ui_atoms_ul__ = __webpack_require__(202);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ul", function() { return __WEBPACK_IMPORTED_MODULE_43__ui_atoms_ul__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ui_atoms_video__ = __webpack_require__(203);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return __WEBPACK_IMPORTED_MODULE_44__ui_atoms_video__["a"]; });














































/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('a'));

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('article'));

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('button'));

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('circle'));

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('div'));

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('dl'));

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('footer'));

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('form'));

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('g'));

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('h1'));

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('h2'));

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('h3'));

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('h4'));

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('h5'));

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('h6'));

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('header'));

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('i'));

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('iframe'));

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('img'));

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('input'));

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('label'));

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('li'));

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('line'));

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('main'));

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('nav'));

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('ol'));

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('p'));

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('path'));

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('polygon'));

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('rect'));

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('section'));

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('select'));

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('source'));

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('span'));

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('style'));

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('svg'));

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('table'));

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('td'));

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('text'));

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('textarea'));

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('th'));

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('tr'));

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('tspan'));

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('ul'));

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_base__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__src_base__["a" /* default */])('video'));

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyphenate_style_name__ = __webpack_require__(205);


 // Follows syntax at https://developer.mozilla.org/en-US/docs/Web/CSS/content,
// including multiple space separated values.

var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;
var isArray = Array.isArray;
var keys = Object.keys;
var browsers = ['webkit', 'moz'];

var buildRule = function buildRule(key, value) {
  if (null === value) {
    return '';
  }

  if (key === 'content' && !unquotedContentValueRegex.test(value)) {
    value = "'" + value.replace(/'/g, "\\'") + "'";
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0_hyphenate_style_name__["a" /* default */])(key) + ': ' + value + ';';
};

var buildRules = function buildRules(result, rules, selector) {
  if (!rules.length) {
    return result;
  }

  var mycss = '';
  var parentSelector = '';

  if (isArray(selector)) {
    parentSelector = selector[0].trim();
    selector.shift();
  } else {
    selector = [selector];
  }

  rules.forEach(function (rule, i) {
    mycss += selector[i] + ' {\n';
    keys(rule).forEach(function (styleKey) {
      if (rule[styleKey] && rule[styleKey].forEach) {
        rule[styleKey].forEach(function (item) {
          return mycss += buildRule(styleKey, item);
        });
      } else {
        mycss += buildRule(styleKey, rule[styleKey]);
      }
    });
    mycss += '}\n\n';
  });

  if (parentSelector) {
    var keyframesString = '@keyframes';

    if (0 === parentSelector.indexOf(keyframesString)) {
      browsers.forEach(function (browser) {
        result.css += parentSelector.replace(keyframesString, '@-' + browser + '-keyframes') + ' {\n' + mycss + '}\n';
      });
    }

    result.css += parentSelector + ' {\n' + mycss + '}\n';
  } else {
    result.css += mycss;
  }

  return result;
};

var replicateSelector = function replicateSelector(s) {
  s = '.' + s;
  var a = [s];

  for (var i = 1; i < 10; i++) {
    a[i] = a[i - 1] + s + i;
  }

  return a.join(',');
};

var buildStyle = function buildStyle(result, oStyle) {
  var styleId = oStyle.styleId;

  if (!styleId || result.styleIds[styleId]) {
    return;
  }

  var selector = oStyle.selector;

  if (selector) {
    if (isArray(selector) && !selector[1]) {
      selector[1] = replicateSelector(styleId);
    }
  } else {
    selector = replicateSelector(styleId);
  }

  result.styleIds[styleId] = oStyle; //for check already inject

  buildRules(result, oStyle.style, selector);
};

var stylesToCSS = function stylesToCSS(styles) {
  if (!isArray(styles)) {
    styles = [styles];
  }

  var result = {
    css: '',
    styleIds: {}
  };
  styles.forEach(function (style) {
    buildStyle(result, style);
  });
  return result;
};

/* harmony default export */ __webpack_exports__["a"] = (stylesToCSS);

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g
var msPattern = /^ms-/
var cache = {}

function toHyphenLower(match) {
  return '-' + match.toLowerCase()
}

function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  var hName = name.replace(uppercasePattern, toHyphenLower)
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)
}

/* harmony default export */ __webpack_exports__["a"] = (hyphenateStyleName);


/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__applyStyles__ = __webpack_require__(207);

/**
 *  props.className
 *  props.style
 *  props.styles
 *  props.styleOrder
 */

var bindStyles = function bindStyles(_ref) {
  var className = _ref.className,
      style = _ref.style,
      styles = _ref.styles,
      styleOrder = _ref.styleOrder;
  var newStyleProps = {
    className: className,
    style: style
  };
  Object(__WEBPACK_IMPORTED_MODULE_0__applyStyles__["a" /* default */])(newStyleProps, styles, styleOrder);

  if (!newStyleProps.className) {
    delete newStyleProps.className;
  }

  if (!newStyleProps.style) {
    delete newStyleProps.style;
  }

  return newStyleProps;
};

/* harmony default export */ __webpack_exports__["a"] = (bindStyles);

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var isArray = Array.isArray;
var keys = Object.keys;

var applyClassName = function applyClassName(props, order, oStyle) {
  if (!props.className) {
    props.className = '';
  }

  var styleId = oStyle.styleId;
  props.className += ' ' + styleId;

  for (var j = 1; j <= order; j++) {
    props.className += ' ' + styleId + j;
  }

  return order;
};

var applyInlineStyle = function applyInlineStyle(props, order, oStyle) {
  if (isArray(oStyle.selector)) {
    return order;
  }

  if (!props.style) {
    props.style = {};
  }

  oStyle.style.forEach(function (one) {
    return keys(one).forEach(function (key) {
      return props.style[key] = one[key];
    });
  });
  return order;
};

var applyStyle = function applyStyle(props, order) {
  return function (oStyle) {
    if (!oStyle) {
      return order;
    }

    if (!oStyle.isCompiled) {
      console.error('Not a style object', oStyle);
      console.trace();
      return order;
    }

    return oStyle.isCompiled() && order < 10 ? applyClassName(props, order, oStyle) : applyInlineStyle(props, order, oStyle);
  };
};

var applyStyles = function applyStyles(props, styles, order) {
  if (isNaN(order)) {
    order = 0;
  }

  if (!isArray(styles)) {
    styles = [styles];
  }

  var apply = applyStyle(props, order);
  styles.forEach(function (one) {
    return apply(one);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (applyStyles);

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Card = function Card(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'card');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Card);

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Circular = function Circular(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'circular');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Circular);

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__ = __webpack_require__(14);



/* jshint esnext: true */




var Description = function Description(props) {
  var children = props.children,
      className = props.className,
      lineAtom = props.lineAtom,
      others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["children", "className", "lineAtom"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_3_class_lib__["mixClass"])(className, 'description');
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
    ui: false,
    className: classes
  }), children && children.map ? children.map(function (v, k) {
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], {
      atom: lineAtom,
      key: k
    }, v);
  }) : children);
};

/* harmony default export */ __webpack_exports__["a"] = (Description);

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Divider = function Divider(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'divider');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Divider);

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var DividingHeader = function DividingHeader(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'dividing header');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (DividingHeader);

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__molecules_Content__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__ = __webpack_require__(14);




/* jshint esnext: true */





var Dimmer = function Dimmer(props) {
  var className = props.className,
      show = props.show,
      children = props.children,
      center = props.center,
      content = props.content,
      contentStyle = props.contentStyle,
      isModal = props.isModal,
      others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["className", "show", "children", "center", "content", "contentStyle", "isModal"]);

  if (!show) {
    return null;
  }

  var classes = Object(__WEBPACK_IMPORTED_MODULE_4_class_lib__["mixClass"])(className, 'transition visible active', {
    dimmer: !isModal,
    modal: isModal
  });
  var child;

  if (center && content) {
    child = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__molecules_Content__["a" /* default */], {
      style: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
        boxSizing: 'inherit'
      }, contentStyle)
    }, children);
  } else {
    child = children;
  }

  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
    className: classes
  }), child);
};

Dimmer.defaultProps = {
  show: false,
  isModal: false,
  center: true,
  content: true // same with center attriube, just let user not confuse 

};
/* harmony default export */ __webpack_exports__["a"] = (Dimmer);

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__ = __webpack_require__(14);



/* jshint esnext: true */




var Form = function Form(props) {
  var messageType = props.messageType,
      className = props.className,
      others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["messageType", "className"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_3_class_lib__["mixClass"])(className, messageType, 'form');
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
    atom: "form"
  }, others, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__molecules_Message__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__molecules_Label__ = __webpack_require__(38);




/* jshint esnext: true */







var _ref =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__["a" /* default */], null);

var Field = function Field(props) {
  var className = props.className,
      fieldClassName = props.fieldClassName,
      fieldStyle = props.fieldStyle,
      fieldStyles = props.fieldStyles,
      fieldProps = props.fieldProps,
      children = props.children,
      inline = props.inline,
      type = props.type,
      inputComponent = props.inputComponent,
      inputWrapper = props.inputWrapper,
      inputWrapperAttr = props.inputWrapperAttr,
      label = props.label,
      labelStyle = props.labelStyle,
      labelStyles = props.labelStyles,
      labelWrap = props.labelWrap,
      style = props.style,
      styles = props.styles,
      styleOrder = props.styleOrder,
      required = props.required,
      messageType = props.messageType,
      messageProps = props.messageProps,
      message = props.message,
      topTip = props.topTip,
      bottomTip = props.bottomTip,
      rightTip = props.rightTip,
      others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["className", "fieldClassName", "fieldStyle", "fieldStyles", "fieldProps", "children", "inline", "type", "inputComponent", "inputWrapper", "inputWrapperAttr", "label", "labelStyle", "labelStyles", "labelWrap", "style", "styles", "styleOrder", "required", "messageType", "messageProps", "message", "topTip", "bottomTip", "rightTip"]);

  var isGroup = !(props.atom || inputComponent);
  var classes = Object(__WEBPACK_IMPORTED_MODULE_4_class_lib__["mixClass"])(fieldClassName, {
    'label-wrap': labelWrap,
    required: !!required,
    field: !isGroup,
    fields: isGroup,
    inline: !!inline,
    info: messageType === 'info',
    error: messageType === 'error',
    success: messageType === 'success',
    warning: messageType === 'warning'
  });
  var oLabel = null;
  var thisMessageProps = messageProps || {};

  if (label) {
    var thisLabelStyle = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Object(__WEBPACK_IMPORTED_MODULE_5_get_object_value__["a" /* default */])(labelStyle, null, {}));

    if (props.id) {
      thisLabelStyle.cursor = 'pointer';
    }

    if (labelWrap) {
      thisLabelStyle.flex = '0 1 100%';
      thisMessageProps.style = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, thisMessageProps.style);
      thisMessageProps.style.flex = '0 1 100%';
    }

    oLabel = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__["a" /* default */], {
      atom: "label",
      key: "label",
      htmlFor: props.id,
      style: thisLabelStyle,
      styles: labelStyles,
      styleOrder: styleOrder
    }, label);
  }

  var input = null;
  var thisFieldStyles = fieldStyles;
  var thisFieldStyle = fieldStyle;
  var thisChildren = children;

  if (isGroup) {
    if (!thisFieldStyles) {
      thisFieldStyles = styles;
    }

    if (!thisFieldStyle) {
      thisFieldStyle = style || {};
    }

    if (label && labelWrap) {
      thisFieldStyle.flexWrap = 'wrap';
    }
  } else {
    var isSelect = 'select' === props.atom;
    input = inputComponent ? inputComponent : _ref;
    var inputProps = Object(__WEBPACK_IMPORTED_MODULE_5_get_object_value__["a" /* default */])(input, ['props'], {}); // set inputChildren

    var inputChildren = inputProps.children || null;

    if (isSelect) {
      thisChildren = null;
      inputChildren = children;
    }

    var inputClasses = Object(__WEBPACK_IMPORTED_MODULE_4_class_lib__["mixClass"])(className, inputProps.className, {
      dropdown: isSelect
    });
    input = Object(__WEBPACK_IMPORTED_MODULE_3_react__["cloneElement"])(input, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, others, {
      style: Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
        boxSizing: 'inherit'
      }, Object(__WEBPACK_IMPORTED_MODULE_5_get_object_value__["a" /* default */])(input, ['props', 'style']), {}, style),
      key: 'input',
      className: inputClasses,
      styles: styles,
      styleOrder: styleOrder,
      required: required,
      type: type
    }), inputChildren);
  }

  var topTipEl;

  if (topTip) {
    topTipEl = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__molecules_Label__["a" /* default */], {
      key: "topTip",
      className: "pointing below prompt"
    }, topTip);
  }

  var inputs;

  if ('checkbox' === type || 'radio' === type) {
    inputs = [topTipEl, input, oLabel];
  } else {
    inputs = [oLabel, topTipEl, input];
  }

  if (inputWrapper) {
    inputs = Object(__WEBPACK_IMPORTED_MODULE_3_react__["cloneElement"])(inputWrapper, inputWrapperAttr, inputs);
  }

  var messageEl;
  var bottomTipEl;
  var rightTipEl;

  if (message) {
    messageEl = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__molecules_Message__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
      messageType: messageType
    }, thisMessageProps), message);
  }

  if (bottomTip) {
    bottomTipEl = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__molecules_Label__["a" /* default */], {
      className: "above pointing prompt"
    }, bottomTip);
  }

  if (rightTip) {
    rightTipEl = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__molecules_Label__["a" /* default */], {
      className: "left pointing prompt"
    }, rightTip);
  }

  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, fieldProps, {
    className: classes,
    style: thisFieldStyle,
    styles: thisFieldStyles,
    styleOrder: styleOrder
  }), inputs, thisChildren, rightTipEl, bottomTipEl, messageEl);
};

/* harmony default export */ __webpack_exports__["a"] = (Field);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);


/* jshint esnext: true */




var Item = function Item(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'item');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Item);

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Image = function Image(props) {
  var alt = props.alt,
      title = props.title,
      ui = props.ui;
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, {
    image: ui
  });
  var thisAlt = alt;

  if (!thisAlt) {
    thisAlt = title;
  }

  if (props.atom && 'img' !== props.atom) {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
      className: classes
    }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], {
      atom: "img",
      src: props.src,
      alt: thisAlt
    }), props.children);
  } else {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
      atom: "img"
    }, props, {
      alt: thisAlt,
      className: classes
    }));
  }
};

Image.defaultProps = {
  ui: true
};
/* harmony default export */ __webpack_exports__["a"] = (Image);

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__molecules_Button__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__molecules_Label__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__molecules_Icon__ = __webpack_require__(56);



/* jshint esnext: true */







var InputBox = function InputBox(props) {
  var icon = props.icon,
      button = props.button,
      buttonProps = props.buttonProps,
      className = props.className,
      children = props.children,
      messageType = props.messageType,
      leftLabel = props.leftLabel,
      leftLabelProps = props.leftLabelProps,
      rightLabel = props.rightLabel,
      rightLabelProps = props.rightLabelProps,
      style = props.style,
      transparent = props.transparent,
      inputStyle = props.inputStyle,
      others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["icon", "button", "buttonProps", "className", "children", "messageType", "leftLabel", "leftLabelProps", "rightLabel", "rightLabelProps", "style", "transparent", "inputStyle"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_3_class_lib__["mixClass"])(className, messageType, 'input', {
    labeled: leftLabel || rightLabel,
    right: rightLabel,
    action: button && !icon,
    icon: icon,
    transparent: transparent
  });
  var thisLeftLabel;

  if (leftLabel) {
    thisLeftLabel = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_Label__["a" /* default */], leftLabelProps, leftLabel);
  }

  var thisRightLabel;

  if (rightLabel) {
    thisRightLabel = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_Label__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
      style: Styles.rightLabel,
      className: "basic"
    }, rightLabelProps), rightLabel);
  }

  var thisButton = null;

  if (button) {
    thisButton = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__molecules_Button__["a" /* default */], buttonProps, button);
  }

  if (icon) {
    thisButton = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__molecules_Icon__["a" /* default */], {
      style: Styles.icon
    }, icon);
  }

  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], {
    className: classes,
    style: style
  }, thisLeftLabel, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
    atom: "input"
  }, others, {
    style: inputStyle,
    ui: false
  })), thisRightLabel, children, thisButton);
};

InputBox.defaultProps = {
  button: 'Submit'
};
/* harmony default export */ __webpack_exports__["a"] = (InputBox);
var Styles = {
  rightLabel: {
    borderRadius: 0
  },
  icon: {
    width: '1.1em',
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: .5
  }
};

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__ = __webpack_require__(14);






var renderChildren = function renderChildren(children, atom) {
  return __WEBPACK_IMPORTED_MODULE_2_react__["Children"].map(children, function (child) {
    if (!child) {
      return null;
    }

    if ('ul' === atom || 'ol' === atom) {
      child = Object(__WEBPACK_IMPORTED_MODULE_2_react__["cloneElement"])(child, {
        atom: 'li'
      });
    }

    return child;
  });
};

var List = function List(props) {
  var type = props.type,
      className = props.className,
      children = props.children,
      others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["type", "className", "children"]);

  var typeClass = 'list';

  if (type) {
    typeClass = type;
  }

  var classes = Object(__WEBPACK_IMPORTED_MODULE_3_class_lib__["mixClass"])(className, typeClass);
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
    className: classes
  }), renderChildren(children, props.atom));
};

/* harmony default export */ __webpack_exports__["a"] = (List);

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Menu = function Menu(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'menu');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Menu);

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Meta = function Meta(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'meta');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    ui: false,
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Meta);

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_lib_styles_index__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__ = __webpack_require__(14);








var Progress = function Progress(props) {
  var barProps = props.barProps,
      children = props.children,
      className = props.className,
      percent = props.percent,
      style = props.style,
      styles = props.styles,
      others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["barProps", "children", "className", "percent", "style", "styles"]);

  var _ref = barProps || {},
      barStyle = _ref.style,
      barStyles = _ref.styles,
      otherBarProps = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["style", "styles"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_5_class_lib__["mixClass"])(className, 'progress');
  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
    className: classes,
    styles: [Object(__WEBPACK_IMPORTED_MODULE_4__src_lib_styles_index__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
      fontSize: 0
    }, style), null, false), styles]
  }), __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
    className: "bar"
  }, otherBarProps, {
    styles: [Object(__WEBPACK_IMPORTED_MODULE_4__src_lib_styles_index__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
      width: percent + '%'
    }, barStyle), null, false), barStyles]
  })), children);
};

/* harmony default export */ __webpack_exports__["a"] = (Progress);

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(37);
/*jslint browser: true*/




function Style(style, selector, styleId) {
  this.style = style;
  this.selector = selector;
  this.styleId = styleId;
}

Style.prototype.isCompiled = function () {
  var registry = __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].registry;
  return registry && registry[this.styleId];
};

/* harmony default export */ __webpack_exports__["a"] = (Style);

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cssUnitLessNumber__ = __webpack_require__(225);


var cssUnitToNumber = function cssUnitToNumber(key, value) {
  if (__WEBPACK_IMPORTED_MODULE_0__cssUnitLessNumber__["a" /* isUnitlessNumber */][key]) {
    return value;
  }

  if (value && value.map) {
    value.map(function (v) {
      if ('number' === typeof v) {
        v += 'px';
      }

      return v;
    });
  } else {
    if ('number' === typeof value) {
      value += 'px';
    }
  }

  return value;
};

/* harmony default export */ __webpack_exports__["a"] = (cssUnitToNumber);

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isUnitlessNumber; });
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}
/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */


var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.

Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__ = __webpack_require__(14);



/* jshint esnext: true */




var Rail = function Rail(props) {
  var attached = props.attached,
      left = props.left,
      others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["attached", "left"]);

  var classes = Object(__WEBPACK_IMPORTED_MODULE_3_class_lib__["mixClass"])(props.className, 'rail', {
    left: left,
    attached: attached
  });
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
    className: classes
  }));
};

Rail.defaultProps = {
  attached: true,
  left: true
};
/* harmony default export */ __webpack_exports__["a"] = (Rail);

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_Label__ = __webpack_require__(38);





var Ribbon = function Ribbon(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'ribbon');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_Label__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    clssName: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Ribbon);

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Segment = function Segment(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'segment');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Segment);

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__ = __webpack_require__(14);





var Title = function Title(props) {
  var classes = Object(__WEBPACK_IMPORTED_MODULE_2_class_lib__["mixClass"])(props.className, 'title');
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    className: classes
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Title);

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__ = __webpack_require__(14);






var Unsafe = function Unsafe(_ref) {
  var className = _ref.className,
      children = _ref.children,
      others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["className", "children"]);

  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__molecules_SemanticUI__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
    className: Object(__WEBPACK_IMPORTED_MODULE_3_class_lib__["mixClass"])('us-html', className),
    dangerouslySetInnerHTML: {
      __html: 'function' === typeof children ? children() : children
    }
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (Unsafe);

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__injectStyle__ = __webpack_require__(55);




var isArray = Array.isArray;
var keys = Object.keys;

var lazyInject = function lazyInject(injects, configs) {
  if (!injects) {
    injects = {};
    keys(configs).forEach(function (key) {
      var item = configs[key];

      if (!isArray(item)) {
        item = [item];
      }

      injects[key] = __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].apply(null, item);
    });
  }

  Object(__WEBPACK_IMPORTED_MODULE_1__injectStyle__["a" /* default */])();
  return injects;
};

/* harmony default export */ __webpack_exports__["a"] = (lazyInject);

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);

var keys = Object.keys;

var mergeStyleConfig = function mergeStyleConfig(styles, defaultStyles, injectStyles) {
  if (defaultStyles) {
    keys(defaultStyles).forEach(function (key) {
      return styles[key] = !styles[key] ? defaultStyles[key] : Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, defaultStyles[key], {}, styles[key]);
    });
  }

  if (injectStyles) {
    keys(styles).forEach(function (key) {
      if (injectStyles[key]) {
        injectStyles[key][0] = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, injectStyles[key][0], {}, styles[key]);
      }
    });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (mergeStyleConfig);

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_styles_store__ = __webpack_require__(37);


var needCss = function needCss(mod) {
  return __WEBPACK_IMPORTED_MODULE_0__lib_styles_store__["a" /* default */].mods[mod] = 1;
};

/* harmony default export */ __webpack_exports__["a"] = (needCss);

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return max; });
var min = {
  sm: '@media (min-width: 35.5em)',
  md: '@media (min-width: 48em)',
  lg: '@media (min-width: 64em)',
  xl: '@media (min-width: 80em)'
};
var max = {
  sm: '@media (max-width: 35.5em)',
  md: '@media (max-width: 48em)',
  lg: '@media (max-width: 64em)',
  xl: '@media (max-width: 80em)'
};


/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_atomic_molecule__ = __webpack_require__(16);




var inject = {};
var c = 0;

var processCss = function processCss(css) {
  css = Object(__WEBPACK_IMPORTED_MODULE_0_get_object_value__["b" /* getDefault */])(css);
  var keys = Object.keys(css);

  if (keys.length) {
    keys.forEach(function (key) {
      css[key].push('keyframe-' + key + '-' + c);
      __WEBPACK_IMPORTED_MODULE_1_react_atomic_molecule__["reactStyle"].apply(null, css[key]);
      c++;
    });
    Object(__WEBPACK_IMPORTED_MODULE_1_react_atomic_molecule__["injectStyle"])();
  }
};

var getKeyframeCss = function getKeyframeCss(key) {
  if (inject[key]) {
    return;
  }

  switch (key) {
    case 'candleInTheWind':
      __webpack_require__.e/* import() */(19).then(__webpack_require__.bind(null, 273)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeIn':
      __webpack_require__.e/* import() */(18).then(__webpack_require__.bind(null, 274)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeInUp':
      __webpack_require__.e/* import() */(14).then(__webpack_require__.bind(null, 275)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeInUpBig':
      __webpack_require__.e/* import() */(13).then(__webpack_require__.bind(null, 276)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeInRight':
      __webpack_require__.e/* import() */(15).then(__webpack_require__.bind(null, 277)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeInDown':
      __webpack_require__.e/* import() */(17).then(__webpack_require__.bind(null, 278)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeInLeft':
      __webpack_require__.e/* import() */(16).then(__webpack_require__.bind(null, 279)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeOut':
      __webpack_require__.e/* import() */(12).then(__webpack_require__.bind(null, 280)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeOutUp':
      __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, 281)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeOutRight':
      __webpack_require__.e/* import() */(9).then(__webpack_require__.bind(null, 282)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeOutDown':
      __webpack_require__.e/* import() */(11).then(__webpack_require__.bind(null, 283)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'fadeOutLeft':
      __webpack_require__.e/* import() */(10).then(__webpack_require__.bind(null, 284)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'pulsate':
      __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, 285)).then(function (css) {
        return processCss(css);
      });
      break;

    case 'spin':
      __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 286)).then(function (css) {
        return processCss(css);
      });
      break;
  }

  inject[key] = true;
};

/* harmony default export */ __webpack_exports__["a"] = (getKeyframeCss);


/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__organisms_Animate__ = __webpack_require__(53);













var image = function image(props) {
  var animate = props.animate,
      leaveStyle = props.leaveStyle,
      others = Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["animate", "leaveStyle"]);

  return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["Image"], others);
};

var AnimateImage =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(AnimateImage, _PureComponent);

  function AnimateImage(props) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, AnimateImage);

    _this = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(AnimateImage).call(this, props));
    _this.state = {
      image: image(props)
    };
    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(AnimateImage, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var props = this.props;
      var animate = props.animate,
          src = props.src,
          leaveStyle = props.leaveStyle;

      if (src === prevProps.src || 'undefined' === typeof window) {
        return;
      }

      var self = this;
      var oImg = new window.Image();
      self.setState({
        style: leaveStyle
      });

      oImg.onload = function () {
        self.setState({
          image: null
        });
        var delay = 100;

        if (animate.leave) {
          delay += Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(self, ['aniEl', 'leaveTimeout'], 0);
        }

        setTimeout(function () {
          self.setState({
            image: image(props),
            style: null
          });
        }, delay);
      };

      oImg.src = src;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var animate = this.props.animate;
      var _this$state = this.state,
          image = _this$state.image,
          style = _this$state.style;
      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__organisms_Animate__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, animate, {
        style: style,
        ref: function ref(o) {
          return _this2.aniEl = o;
        }
      }), image);
    }
  }]);

  return AnimateImage;
}(__WEBPACK_IMPORTED_MODULE_8_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(AnimateImage, "defaultProps", {
  animate: {
    enter: 'fadeIn-300',
    leave: 'fadeOut-300'
  },
  leaveStyle: {
    opacity: '.1'
  }
});

/* unused harmony default export */ var _unused_webpack_default_export = (AnimateImage);

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__organisms_Animate__ = __webpack_require__(53);












var Replace =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(Replace, _PureComponent);

  function Replace() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Replace);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Replace)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "state", {
      no: 0,
      childs: {}
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleExited", function (node) {
      if (_this.props.onExited) {
        _this.props.onExited(node);
      }

      setTimeout(function () {
        return _this.setState({
          no: _this.next
        });
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleNext", function () {
      if (_this._time) {
        clearTimeout(_this._time);
      }

      var interval = _this.props.interval;

      _this.setState(function (_ref) {
        var no = _ref.no,
            childs = _ref.childs;

        if (null !== no) {
          no++;

          if (no >= childs.length) {
            no = 0;
          }

          _this.next = no;
          return {
            no: null
          };
        } else {
          return {
            no: _this.next
          };
        }
      });

      _this._time = setTimeout(_this.handleNext, interval);
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(Replace, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this._time) {
        clearTimeout(this._time);
      }

      var interval = this.props.interval;
      this._time = setTimeout(this.handleNext, interval);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this._time);
      this._time = null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          interval = _this$props.interval,
          props = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["interval"]);

      var _this$state = this.state,
          no = _this$state.no,
          childs = _this$state.childs;
      var show;

      if (no !== null && childs[no]) {
        show = childs[no];
      } else {
        show = null;
      }

      return __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__organisms_Animate__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
        onExited: this.handleExited
      }), show);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var children = nextProps.children;

      if (children === prevState.prevChildren) {
        return null;
      }

      var childs = [];
      __WEBPACK_IMPORTED_MODULE_9_react__["Children"].map(children, function (c) {
        return c;
      }).forEach(function (child, key) {
        return childs[key] = child;
      });
      return {
        childs: childs,
        prevChildren: children
      };
    }
  }]);

  return Replace;
}(__WEBPACK_IMPORTED_MODULE_9_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Replace, "defaultProps", {
  interval: 5000
});

/* unused harmony default export */ var _unused_webpack_default_export = (Replace);

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _interopRequireDefault;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = exports.default;

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _default = _extends;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty = function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _default = _defineProperty;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var _default = objectWithoutProperties;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ricon_X__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ricon_X___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ricon_X__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_call_func__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__molecules_PopupModal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__organisms_DisplayPopupEl__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_popupDispatcher__ = __webpack_require__(62);

















var FullScreen =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__["a" /* default */])(FullScreen, _PureComponent);

  function FullScreen() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, FullScreen);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(FullScreen)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "xIcoEnter", function () {
      setTimeout(function () {
        if (!_this._mounted) {
          return null;
        }

        _this.setState({
          xIcoHoverStyle: Styles.xIcoHover
        });
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "xIcoLeave", function () {
      if (!_this._mounted) {
        return null;
      }

      _this.setState({
        xIcoHoverStyle: null
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleClose", function () {
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          removeOnClose = _this$props.removeOnClose;
      Object(__WEBPACK_IMPORTED_MODULE_11_call_func__["a" /* default */])(onClose);

      if (removeOnClose) {
        // use setTimeout to avoid call setState druing render 
        setTimeout(function () {
          return Object(__WEBPACK_IMPORTED_MODULE_15__src_popupDispatcher__["b" /* popupDispatch */])({
            type: 'dom/cleanOne',
            params: {
              popup: Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this)
            }
          });
        });
      }
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(FullScreen, [{
    key: "getDefaultXIcon",
    value: function getDefaultXIcon() {
      var _get = Object(__WEBPACK_IMPORTED_MODULE_10_get_object_value__["a" /* default */])(this, ['state'], {}),
          xIcoHoverStyle = _get.xIcoHoverStyle;

      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_ricon_X___default.a, {
        onMouseEnter: this.xIcoEnter,
        onMouseLeave: this.xIcoLeave,
        style: Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Styles.x, {}, xIcoHoverStyle),
        size: "75px",
        weight: ".1rem"
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          style = _this$props2.style,
          onClose = _this$props2.onClose,
          toPool = _this$props2.toPool;
      var xico = this.getDefaultXIcon();
      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__organisms_DisplayPopupEl__["a" /* default */], null, __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__molecules_PopupModal__["a" /* default */], {
        appear: "fadeIn-500",
        enter: "fadeIn-500",
        className: Object(__WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__["mixClass"])('full-screen', className),
        scrolling: true,
        style: Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Styles.container, {}, style),
        modalClassName: "basic",
        modalStyle: Styles.modal,
        modal: children,
        closeEl: xico,
        onClose: this.handleClose,
        toPool: toPool
      }));
    }
  }]);

  return FullScreen;
}(__WEBPACK_IMPORTED_MODULE_8_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(FullScreen, "defaultProps", {
  name: 'fullscreen'
});

/* unused harmony default export */ var _unused_webpack_default_export = (FullScreen);
var Styles = {
  container: {
    background: '#fff',
    textAlign: 'left'
  },
  x: {
    width: '70px',
    height: '75px',
    borderRadius: '8px',
    backgroundColor: 'rgba(190,190,190,.39)',
    top: '20px',
    right: '20px',
    opacity: '.3'
  },
  xIcoHover: {
    opacity: '.9'
  }
};

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_index__ = __webpack_require__(21);













var keys = Object.keys;

var PopupPool =
/*#__PURE__*/
function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupPool, _Component);

  function PopupPool() {
    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupPool);

    return Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupPool).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupPool, [{
    key: "render",
    value: function render() {
      var pops = this.state.pops;

      if (pops.length) {
        var _this$props = this.props,
            component = _this$props.component,
            otherProps = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["component"]);

        return Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["build"])(component)(Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
          className: 'popup-pool',
          ui: false
        }, otherProps), pops);
      } else {
        return null;
      }
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [__WEBPACK_IMPORTED_MODULE_12__src_index__["g" /* popupStore */]];
    }
  }, {
    key: "calculateState",
    value: function calculateState(prevState, props) {
      var nodes = __WEBPACK_IMPORTED_MODULE_12__src_index__["g" /* popupStore */].getMap('nodes');
      var name = props.name;
      var pops = [];
      keys(nodes).forEach(function (key) {
        var node = nodes[key];
        var toPool = Object(__WEBPACK_IMPORTED_MODULE_11_get_object_value__["a" /* default */])(node, ['props', 'toPool']);

        if ((name || toPool) && toPool !== name) {
          return;
        }

        node = Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["build"])(node)({
          key: key
        });
        pops.push(node);
      });
      return {
        pops: pops
      };
    }
  }]);

  return PopupPool;
}(__WEBPACK_IMPORTED_MODULE_8_react__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(PopupPool, "defaultProps", {
  component: __WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["SemanticUI"]
});

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_9_reshow_flux__["c" /* connect */])(PopupPool, {
  withProps: true
}));

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__molecules_PopupModal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__molecules_BasePopup__ = __webpack_require__(61);












var isArray = Array.isArray;

var Dialog =
/*#__PURE__*/
function (_BasePopup) {
  Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_inherits__["a" /* default */])(Dialog, _BasePopup);

  function Dialog() {
    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Dialog);

    return Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Dialog).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(Dialog, [{
    key: "handleClick",
    value: function handleClick(button, e) {
      var onClick = this.props.onClick;

      if ('function' === typeof onClick) {
        // Locate befor this.popup.close()
        // because need trigger befor onClose
        onClick(e, button);
      }

      this.popup.close();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          size = _this$props.size,
          className = _this$props.className,
          name = _this$props.name,
          buttons = _this$props.buttons,
          header = _this$props.header,
          children = _this$props.children,
          i18nNegativeBtn = _this$props.i18nNegativeBtn,
          i18nPositiveBtn = _this$props.i18nPositiveBtn,
          onClick = _this$props.onClick,
          props = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["size", "className", "name", "buttons", "header", "children", "i18nNegativeBtn", "i18nPositiveBtn", "onClick"]);

      var thisHeader = null;
      var thisButtons = buttons;

      if (header) {
        thisHeader = __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["Header"], null, header);
      }

      if (!isArray(thisButtons) || !thisButtons.length) {
        thisButtons = [__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["Button"], {
          value: false,
          className: "negative",
          key: "b-negative"
        }, i18nNegativeBtn), __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["Button"], {
          value: true,
          className: "positive",
          key: "b-positive"
        }, i18nPositiveBtn)];
      }

      thisButtons = thisButtons.map(function (button) {
        return Object(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["build"])(button)({
          onClick: _this.handleClick.bind(_this, button)
        });
      });
      var classes = Object(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["mixClass"])(className, 'dialog', size);
      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__molecules_PopupModal__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({
        modalClassName: classes,
        name: name,
        content: false,
        ref: function ref(el) {
          return _this.popup = el;
        }
      }, props), thisHeader, __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["Content"], null, children), __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_react_atomic_molecule__["List"], {
        type: "actions"
      }, thisButtons));
    }
  }]);

  return Dialog;
}(__WEBPACK_IMPORTED_MODULE_11__molecules_BasePopup__["a" /* default */]);

Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Dialog, "defaultProps", {
  name: 'dialog',
  i18nNegativeBtn: 'No',
  i18nPositiveBtn: 'Yes',
  size: 'mini',
  disableClose: true
});

/* harmony default export */ __webpack_exports__["a"] = (Dialog);

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_get_window_offset__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_to_percent_js__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__molecules_PopupOverlay__ = __webpack_require__(59);

















var PopupFloatEl =
/*#__PURE__*/
function (_PopupOverlay) {
  Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupFloatEl, _PopupOverlay);

  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupFloatEl, [{
    key: "getFloatEl",

    /**
     * For monitor window resize
     */

    /**
     * For extend class
     */
    value: function getFloatEl() {
      return this.floatEl;
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay(props) {
      var className = props.className,
          others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["className"]);

      var classes = Object(__WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__["mixClass"])('popup', className);
      return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_atomic_molecule__["SemanticUI"], Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_extends__["a" /* default */])({}, others, {
        className: classes
      }));
    }
  }]);

  function PopupFloatEl(props) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupFloatEl);

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupFloatEl).call(this, props)); // Need exted state form parent class (PopupOverlay)

    Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "_mount", false);

    Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleResize", function () {
      _this.handleMoveTo();
    });

    Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleMoveTo", function () {
      if (_this.state && !_this.state.show) {
        return;
      }

      var targetEl = _this.props.targetEl;

      if (!document.body.contains(targetEl)) {
        return;
      }

      var pos = _this.calPos();

      if (!pos) {
        return;
      }

      var diffTop = Math.abs(pos.top - Object(__WEBPACK_IMPORTED_MODULE_14_to_percent_js__["a" /* toInt */])(_this.floatTop));
      var diffLeft = Math.abs(pos.left - Object(__WEBPACK_IMPORTED_MODULE_14_to_percent_js__["a" /* toInt */])(_this.floatLeft));

      if (1 >= diffTop && 1 >= diffLeft && pos.width === _this.floatWidth && pos.height === _this.floatHeight && pos.className === _this.floatClassName) {
        return;
      }

      _this.floatTop = pos.top;
      _this.floatLeft = pos.left;
      _this.floatWidth = pos.width;
      _this.floatHeight = pos.height;
      _this.floatClassName = pos.className;

      if (_this._mount) {
        _this.setState(pos);
      }
    });

    Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "calPos", function () {
      var _this$props = _this.props,
          targetEl = _this$props.targetEl,
          alignParams = _this$props.alignParams;
      var winInfo = Object(__WEBPACK_IMPORTED_MODULE_13_get_window_offset__["b" /* default */])(targetEl);

      if (!_this.floatEl || !targetEl || !winInfo) {
        return false;
      }

      var info = Object(__WEBPACK_IMPORTED_MODULE_13_get_window_offset__["a" /* alignUI */])(targetEl, _this.floatEl, alignParams, winInfo);

      if (!info) {
        console.error('can not get alignUI info');
        return;
      }

      var move = info.move,
          loc = info.loc;
      var result = {
        top: move[1],
        left: move[0],
        className: Object(__WEBPACK_IMPORTED_MODULE_13_get_window_offset__["c" /* getPositionString */])(loc)
      };
      return result;
    });

    Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "setFloatEl", function (el) {
      if (el) {
        _this.floatEl = el;
      }

      setTimeout(function () {
        return _this.handleMoveTo();
      });
    });

    _this.state = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, _this.state, {
      refCb: _this.setFloatEl
    });
    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupFloatEl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mount = true;
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this.handleMoveTo();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mount = false;
      window.removeEventListener('resize', this.handleResize);
    }
  }]);

  return PopupFloatEl;
}(__WEBPACK_IMPORTED_MODULE_15__molecules_PopupOverlay__["b" /* default */]);

Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(PopupFloatEl, "defaultProps", {
  style: {
    position: 'absolute',
    right: 'auto'
  },
  name: 'float',
  className: 'popup'
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_11_reshow_flux__["c" /* connect */])(PopupFloatEl, {
  withProps: true
}));

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getWindowOffset__ = __webpack_require__(100);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__getWindowOffset__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alignUI__ = __webpack_require__(248);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__alignUI__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getPositionString__ = __webpack_require__(253);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__getPositionString__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__isOnScreen__ = __webpack_require__(101);
/* unused harmony reexport isOnScreen */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__isFixed__ = __webpack_require__(63);
/* unused harmony reexport isFixed */







/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _objectSpread;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getTypeOf__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_constant__ = __webpack_require__(18);



function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (Object(__WEBPACK_IMPORTED_MODULE_1__getTypeOf__["a" /* default */])(Object.getOwnPropertySymbols) === __WEBPACK_IMPORTED_MODULE_2_reshow_constant__["b" /* FUNCTION */]) {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(__WEBPACK_IMPORTED_MODULE_0__defineProperty__["a" /* default */])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_getoffset__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_get_scroll_info__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getAfterMove__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getWindowOffset__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alignWith__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__isFullOnScreen__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__isSetOverflow__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__isFixed__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__positions__ = __webpack_require__(64);











var getAlignWithLoc = function getAlignWithLoc(toLoc) {
  var loc;

  switch (toLoc) {
    case __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].TL:
      loc = __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].TR;
      break;

    case __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].TR:
      loc = __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].TL;
      break;

    case __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].BL:
      loc = __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].BR;
      break;

    case __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].BR:
      loc = __WEBPACK_IMPORTED_MODULE_9__positions__["a" /* default */].BL;
      break;

    default:
      loc = toLoc;
      break;
  }

  return loc;
};

var fixFixedNode = function fixFixedNode(scrollInfo) {
  return function (move) {
    return [move[0] + scrollInfo.left, move[1] + scrollInfo.top];
  };
};

var fixScrollNode = function fixScrollNode(scrollInfo) {
  return function (move) {
    return [move[0] - scrollInfo.left, move[1] - scrollInfo.top];
  };
};

var alignUI = function alignUI(targetEl, floatEl, alignParams, winInfo) {
  var _get = Object(__WEBPACK_IMPORTED_MODULE_2_get_object_value__["a" /* default */])(alignParams, null, {}),
      toLoc = _get.toLoc,
      disableAutoLoc = _get.disableAutoLoc;

  if (!targetEl) {
    console.error('targetEl was empty');
    console.trace();
    return false;
  }

  var targetInfo;
  var locs = [];

  if (toLoc) {
    locs.push(toLoc);
  }

  if (!disableAutoLoc) {
    winInfo = winInfo || Object(__WEBPACK_IMPORTED_MODULE_4__getWindowOffset__["a" /* default */])(targetEl);

    if (!winInfo) {
      console.error('get windows offset failed');
    } else {
      locs = locs.concat(winInfo.locs);
    }
  }

  if (!locs.length) {
    console.error('Not set any locs', toLoc);
    return;
  }

  if (!targetInfo) {
    if (winInfo) {
      targetInfo = winInfo.domInfo;
    } else {
      var targetFixedNode = Object(__WEBPACK_IMPORTED_MODULE_8__isFixed__["a" /* default */])(targetEl);
      targetInfo = Object(__WEBPACK_IMPORTED_MODULE_0_getoffset__["a" /* default */])(targetEl, targetFixedNode);
      targetInfo.scrollNode = Object(__WEBPACK_IMPORTED_MODULE_7__isSetOverflow__["a" /* default */])(targetEl);
      targetInfo.fixedNode = targetFixedNode;
    }
  }

  var floatInfo = Object(__WEBPACK_IMPORTED_MODULE_0_getoffset__["a" /* default */])(floatEl);
  var adjustMove;
  var scrollNode = targetInfo.scrollNode;
  var fixedNode = targetInfo.fixedNode;

  if (fixedNode) {
    if (fixedNode.contains(floatEl)) {
      adjustMove = fixFixedNode(Object(__WEBPACK_IMPORTED_MODULE_1_get_scroll_info__["a" /* default */])(fixedNode));
    } else {
      if (winInfo) {
        adjustMove = fixFixedNode(winInfo.scrollInfo);
      } else {
        adjustMove = fixFixedNode(Object(__WEBPACK_IMPORTED_MODULE_1_get_scroll_info__["a" /* default */])());
      }
    }
  } else if (scrollNode) {
    adjustMove = fixScrollNode(Object(__WEBPACK_IMPORTED_MODULE_1_get_scroll_info__["a" /* default */])(scrollNode));
  }

  var loc;
  var move;
  locs.some(function (locItem) {
    toLoc = locItem;
    loc = getAlignWithLoc(toLoc);
    move = Object(__WEBPACK_IMPORTED_MODULE_5__alignWith__["a" /* default */])(targetInfo, floatInfo, loc);

    if (adjustMove) {
      move = adjustMove(move);
    }

    if (!winInfo) {
      return true;
    } else {
      var movePos = Object(__WEBPACK_IMPORTED_MODULE_3__getAfterMove__["a" /* default */])(floatInfo, move);
      var bFullOnScreen = Object(__WEBPACK_IMPORTED_MODULE_6__isFullOnScreen__["a" /* default */])(movePos, winInfo.scrollInfo);

      if (bFullOnScreen) {
        return true;
      } else {
        return false;
      }
    }
  });
  var result = {
    loc: loc,
    toLoc: toLoc,
    move: move
  }; //console.log(result);

  return result;
};

/* harmony default export */ __webpack_exports__["a"] = (alignUI);

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var getAfterMove = function getAfterMove(domInfo, moveXY) {
  var width = domInfo.right - domInfo.left;
  var height = domInfo.bottom - domInfo.top;
  var info = {
    top: moveXY[1],
    right: moveXY[0] + width,
    bottom: moveXY[1] + height,
    left: moveXY[0]
  };
  return info;
};

/* harmony default export */ __webpack_exports__["a"] = (getAfterMove);

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getAlignTargetXY__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__positions__ = __webpack_require__(64);



var alignWith = function alignWith(targetInfo, floatElInfo, loc) {
  var xy = Object(__WEBPACK_IMPORTED_MODULE_0__getAlignTargetXY__["a" /* default */])(targetInfo, loc);
  var width = floatElInfo.right - floatElInfo.left;
  var height = floatElInfo.bottom - floatElInfo.top;
  var moveXY;

  switch (loc) {
    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].TL:
      moveXY = [xy[0], xy[1] - height];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].TC:
      moveXY = [xy[0] - Math.floor(width / 2), xy[1] - height];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].TR:
      moveXY = [xy[0] - width, xy[1] - height];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].RT:
      moveXY = [xy[0], xy[1]];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].RC:
      moveXY = [xy[0], xy[1] - Math.floor(height / 2)];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].RB:
      moveXY = [xy[0], xy[1] - height];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].BL:
      moveXY = [xy[0], xy[1]];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].BC:
      moveXY = [xy[0] - Math.floor(width / 2), xy[1]];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].BR:
      moveXY = [xy[0] - width, xy[1]];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].LT:
      moveXY = [xy[0] - width, xy[1]];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].LC:
      moveXY = [xy[0] - width, xy[1] - Math.floor(height / 2)];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].LB:
      moveXY = [xy[0] - width, xy[1] - height];
      break;

    case __WEBPACK_IMPORTED_MODULE_1__positions__["a" /* default */].CC:
      moveXY = [xy[0] - Math.floor(width / 2), xy[1] - Math.floor(height / 2)];
      break;

    default:
      console.error('Not support align type.');
      break;
  }

  return moveXY;
};

/* harmony default export */ __webpack_exports__["a"] = (alignWith);

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__positions__ = __webpack_require__(64);


var getAlignTargetXY = function getAlignTargetXY(domInfo, loc) {
  var xy;
  var width = domInfo.right - domInfo.left;
  var height = domInfo.bottom - domInfo.top;

  switch (loc) {
    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].LT:
    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].TL:
      xy = [domInfo.left, domInfo.top];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].TC:
      xy = [domInfo.left + Math.floor(width / 2), domInfo.top];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].RT:
    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].TR:
      xy = [domInfo.right, domInfo.top];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].LT:
    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].BL:
      xy = [domInfo.left, domInfo.bottom];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].BC:
      xy = [domInfo.left + Math.floor(width / 2), domInfo.bottom];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].RB:
    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].BR:
      xy = [domInfo.right, domInfo.bottom];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].RC:
      xy = [domInfo.right, domInfo.top + Math.floor(height / 2)];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].LC:
      xy = [domInfo.left, domInfo.top + Math.floor(height / 2)];
      break;

    case __WEBPACK_IMPORTED_MODULE_0__positions__["a" /* default */].CC:
      xy = [domInfo.left + Math.floor(width / 2), domInfo.top + Math.floor(height / 2)];
      break;

    default:
      console.error('Not support align type. [' + loc + ']');
      break;
  }

  return xy;
};

/* harmony default export */ __webpack_exports__["a"] = (getAlignTargetXY);

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var isFullOnScreen = function isFullOnScreen(domInfo, scrollInfo) {
  var bool = domInfo.top > scrollInfo.top && domInfo.right < scrollInfo.right && domInfo.bottom < scrollInfo.bottom && domInfo.left > scrollInfo.left;
  return bool;
};

/* harmony default export */ __webpack_exports__["a"] = (isFullOnScreen);

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_object_value__ = __webpack_require__(10);

var position = {
  tl: 'top left',
  tc: 'top center',
  tr: 'top right',
  rt: 'right center',
  rc: 'right center',
  rb: 'right center',
  bl: 'bottom left',
  bc: 'bottom center',
  br: 'bottom right',
  lt: 'left center',
  lc: 'left center',
  lb: 'left center'
};

var getPositionString = function getPositionString(loc) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_get_object_value__["a" /* default */])(position, [loc]);
};

/* harmony default export */ __webpack_exports__["a"] = (getPositionString);

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export round */
/* unused harmony export toRoundNum */
/* unused harmony export percent */
/* unused harmony export toNum */
/* unused harmony export getNum */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toInt; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);

var numTypes = '|number|string|';

var toPercent = function toPercent(num) {
  return percent(num) + '%';
};

var percent = function percent(num) {
  return round(toNum(num) * 100);
};

var round = function round(f) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return toNum(f).toFixed(precision);
};

var toRoundNum = function toRoundNum(f) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return toNum(round(f, precision));
};

var toNum = function toNum(num) {
  if ('undefined' === typeof num) {
    return 0;
  } else if (-1 === numTypes.indexOf('|' + Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(num) + '|') || !num) {
    return Number(num);
  } else {
    var maybeFloat = parseFloat(num);
    var maybeInt = parseInt(num, 10);

    if (maybeFloat === maybeInt) {
      return maybeInt;
    } else {
      return isNaN(maybeFloat) ? 0 : maybeFloat;
    }
  }
};

var toInt = function toInt(num) {
  return toNum(round(num, 0));
};

var numReg = /(\-)?(\d+)(\.)?(\d+)?/g;

var getNum = function getNum(s) {
  var match = s.replace(',', '').match(numReg);

  if (!match) {
    console.warn('Get number fail', s);
    return 0;
  } else {
    return toNum(match[0]);
  }
};


/* unused harmony default export */ var _unused_webpack_default_export = (toPercent);

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_index__ = __webpack_require__(21);












var closeTimer = {};

var PopupHover =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupHover, _PureComponent);

  function PopupHover() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupHover);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupHover)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "popup", null);

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "floatMouseOver", function () {
      _this.isKeep = true;
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "floatMouseOut", function () {
      _this.isKeep = false;

      _this.close();
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "mouseOver", function () {
      var name = _this.props.name;
      clearTimeout(closeTimer[name]);
      _this.popup = Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["build"])(_this.popup)({
        targetEl: _this.dom
      });
      Object(__WEBPACK_IMPORTED_MODULE_11__src_index__["f" /* popupDispatch */])({
        type: 'dom/update',
        params: {
          popup: _this.popup
        }
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "mouseOut", function () {
      var name = _this.props.name;
      clearTimeout(closeTimer[name]);
      closeTimer[name] = setTimeout(function () {
        _this.close();
      }, 100);
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "close", function () {
      var isKeep = _this.props.isKeep;

      if (_this.isKeep || isKeep) {
        return;
      }

      Object(__WEBPACK_IMPORTED_MODULE_11__src_index__["f" /* popupDispatch */])({
        type: 'dom/closeOne',
        params: {
          popup: _this.popup
        }
      });
    });

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleDom", function (dom) {
      return _this.dom = dom;
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupHover, [{
    key: "update",
    value: function update(props) {
      var popup = props.popup,
          name = props.name,
          toPool = props.toPool,
          alignParams = props.alignParams;
      this.popup = __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__src_index__["d" /* PopupFloatEl */], {
        toPool: toPool,
        name: name,
        alignParams: alignParams,
        onMouseEnter: this.floatMouseOver,
        onMouseLeave: this.floatMouseOut
      }, popup);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this.update(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Object(__WEBPACK_IMPORTED_MODULE_11__src_index__["f" /* popupDispatch */])({
        type: 'dom/cleanOne',
        params: {
          popup: this.popup
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          popup = _this$props.popup,
          isKeep = _this$props.isKeep,
          toPool = _this$props.toPool,
          alignParams = _this$props.alignParams,
          component = _this$props.component,
          others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["popup", "isKeep", "toPool", "alignParams", "component"]);

      return Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["build"])(component)(Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({
        refCb: this.handleDom,
        onMouseEnter: this.mouseOver,
        onMouseLeave: this.mouseOut
      }, others));
    }
  }]);

  return PopupHover;
}(__WEBPACK_IMPORTED_MODULE_9_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(PopupHover, "defaultProps", {
  name: 'hover',
  component: __WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["SemanticUI"]
});

/* unused harmony default export */ var _unused_webpack_default_export = (PopupHover);

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_index__ = __webpack_require__(21);













var _ref =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["SemanticUI"], null);

var PopupClick =
/*#__PURE__*/
function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupClick, _Component);

  function PopupClick() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupClick);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupClick)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleClick", function () {
      var _this$props = _this.props,
          propsPopup = _this$props.popup,
          callback = _this$props.callback;
      var popup;

      if (__WEBPACK_IMPORTED_MODULE_9_react___default.a.isValidElement(propsPopup)) {
        popup = propsPopup;
      } else if (typeof propsPopup === 'function') {
        popup = propsPopup();
      } else {
        popup = __WEBPACK_IMPORTED_MODULE_9_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__src_index__["e" /* PopupOverlay */], null, propsPopup);
      }

      Object(__WEBPACK_IMPORTED_MODULE_11__src_index__["f" /* popupDispatch */])({
        type: 'dom/update',
        params: {
          popup: popup
        }
      });

      if (typeof callback === 'function') {
        callback(popup);
      }
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupClick, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          style = _this$props2.style,
          container = _this$props2.container,
          popup = _this$props2.popup,
          callback = _this$props2.callback,
          reset = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props2, ["style", "container", "popup", "callback"]);

      if (!__WEBPACK_IMPORTED_MODULE_9_react___default.a.isValidElement(container)) {
        container = _ref;
      }

      style = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, style, {}, Styles.container);

      var props = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, reset, {
        onClick: this.handleClick,
        style: style
      });

      return Object(__WEBPACK_IMPORTED_MODULE_10_react_atomic_molecule__["build"])(container)(props);
    }
  }]);

  return PopupClick;
}(__WEBPACK_IMPORTED_MODULE_9_react__["Component"]);

/* unused harmony default export */ var _unused_webpack_default_export = (PopupClick);
var Styles = {
  container: {
    cursor: 'pointer'
  }
};

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_index__ = __webpack_require__(21);








var PopupMonitor =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupMonitor, _PureComponent);

  function PopupMonitor() {
    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupMonitor);

    return Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupMonitor).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupMonitor, null, [{
    key: "getPopupKey",
    value: function getPopupKey(props) {
      console.error('Not override getPopupKey');
    }
  }, {
    key: "getPopupElement",
    value: function getPopupElement(key) {
      console.error('Not override getPopupElement');
    }
  }, {
    key: "calculateState",
    value: function calculateState(prevState, props) {
      var key = this.popupKey || this.getPopupKey(props);

      if (key) {
        var popupElement = this.getPopupElement(key);
        Object(__WEBPACK_IMPORTED_MODULE_6__src_index__["f" /* popupDispatch */])({
          type: 'dom/update',
          params: {
            popup: popupElement
          }
        });
      } else {
        Object(__WEBPACK_IMPORTED_MODULE_6__src_index__["f" /* popupDispatch */])({
          type: 'dom/closeAll'
        });
      }

      return prevState;
    }
  }]);

  return PopupMonitor;
}(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);

/* unused harmony default export */ var _unused_webpack_default_export = (PopupMonitor);

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_immutable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_set_object_value__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__popupDispatcher__ = __webpack_require__(62);













var groups = {};
var SHOW_KEY = 'shows';
var NODE_KEY = 'nodes';
var keys = Object.keys;
var isArray = Array.isArray;

var PopupStore =
/*#__PURE__*/
function (_ReduceStore) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(PopupStore, _ReduceStore);

  function PopupStore() {
    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, PopupStore);

    return Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(PopupStore).apply(this, arguments));
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(PopupStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return Object(__WEBPACK_IMPORTED_MODULE_6_immutable__["Map"])({
        shows: Object(__WEBPACK_IMPORTED_MODULE_6_immutable__["Map"])(),
        nodes: Object(__WEBPACK_IMPORTED_MODULE_6_immutable__["Map"])()
      });
    }
  }, {
    key: "updateDom",
    value: function updateDom(state, action) {
      var popupNode = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(action, ['params', 'popup']);
      var key = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(popupNode, ['props', 'name'], 'default');

      if (key !== Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(popupNode, ['props', 'name'])) {
        console.warn({
          Warn: 'Popup Key not consistence, you use a default key. you should assign name to each specific popup element.',
          PopUpKey: Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(popupNode, ['props', 'name']),
          ActualKey: key
        });
      }

      var shows = state.get(SHOW_KEY).set(key, true);
      var nodes = state.get(NODE_KEY).set(key, popupNode);
      var nodeGroups = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(popupNode, ['props', 'group']);

      if (nodeGroups) {
        if (!isArray(nodeGroups)) {
          nodeGroups = [nodeGroups];
        }

        nodeGroups.forEach(function (nodegroup) {
          return Object(__WEBPACK_IMPORTED_MODULE_9_set_object_value__["a" /* default */])(groups, [nodegroup, key], true);
        });
      }

      return state.set(SHOW_KEY, shows).set(NODE_KEY, nodes);
    }
  }, {
    key: "getKey",
    value: function getKey(action) {
      var popup = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(action, ['params', 'popup'], 'default');
      var key;

      if ('object' === Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_typeof__["a" /* default */])(popup)) {
        key = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(popup, ['props', 'name'], popup);
      } else {
        key = popup;
      }

      return key;
    }
  }, {
    key: "closeAll",
    value: function closeAll(state, action) {
      return state.set(SHOW_KEY, Object(__WEBPACK_IMPORTED_MODULE_6_immutable__["Map"])());
    }
  }, {
    key: "closeOne",
    value: function closeOne(state, action) {
      var key = this.getKey(action);
      var shows = state.get(SHOW_KEY)["delete"](key);
      return state.set(SHOW_KEY, shows);
    }
  }, {
    key: "closeGroup",
    value: function closeGroup(state, action) {
      var groupKey = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(action, ['params', 'group']);
      var group = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(groups, [groupKey]);
      var shows = state.get(SHOW_KEY);

      if (group) {
        keys(group).forEach(function (key) {
          shows = shows["delete"](key);
        });
      }

      return state.set(SHOW_KEY, shows);
    }
  }, {
    key: "cleanAll",
    value: function cleanAll(state, action) {
      return state.set(SHOW_KEY, Object(__WEBPACK_IMPORTED_MODULE_6_immutable__["Map"])()).set(NODE_KEY, Object(__WEBPACK_IMPORTED_MODULE_6_immutable__["Map"])());
    }
  }, {
    key: "cleanOne",
    value: function cleanOne(state, action) {
      var key = this.getKey(action);
      var nodes = state.get(NODE_KEY)["delete"](key);
      var shows = state.get(SHOW_KEY)["delete"](key);
      return state.set(NODE_KEY, nodes).set(SHOW_KEY, shows);
    }
  }, {
    key: "cleanGroup",
    value: function cleanGroup(state, action) {
      var groupKey = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(action, ['params', 'group']);
      var group = Object(__WEBPACK_IMPORTED_MODULE_8_get_object_value__["a" /* default */])(groups, [groupKey]);

      if (group) {
        var nodes = state.get(NODE_KEY);
        var shows = state.get(SHOW_KEY);
        keys(group).forEach(function (key) {
          nodes = nodes["delete"](key);
          shows = shows["delete"](key);
        });
        return state.set(NODE_KEY, nodes).set(SHOW_KEY, shows);
      } else {
        return state;
      }
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'dom/update':
          return this.updateDom(state, action);

        case 'dom/closeAll':
          return this.closeAll(state, action);

        case 'dom/cleanAll':
          return this.cleanAll(state, action);

        case 'dom/closeOne':
          return this.closeOne(state, action);

        case 'dom/cleanOne':
          return this.cleanOne(state, action);

        case 'dom/closeGroup':
          return this.closeGroup(state, action);

        case 'dom/cleanGroup':
          return this.cleanGroup(state, action);

        case 'config/set':
          return state.merge(action.params);

        default:
          return state;
      }
    }
  }]);

  return PopupStore;
}(__WEBPACK_IMPORTED_MODULE_7_reshow_flux__["b" /* ReduceStore */]); // Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.


var instance = new PopupStore(__WEBPACK_IMPORTED_MODULE_10__popupDispatcher__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (instance);

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_stores_realTimeStore__ = __webpack_require__(84);








var REAL_TIME_KEY = '--realTimeData--';
var REAL_TIME_URL = '--realTimeUrl--';
var keys = Object.keys;

var getStores = function getStores(props) {
  return props.stores || [__WEBPACK_IMPORTED_MODULE_7__src_stores_realTimeStore__["a" /* default */]];
};

var calculateState = function calculateState(prevState, props) {
  var realTimeState = __WEBPACK_IMPORTED_MODULE_7__src_stores_realTimeStore__["a" /* default */].getState();
  var path = props.realTimePath,
      url = props.realTimeUrl,
      realTimeReset = props.realTimeReset;
  var data = Object(__WEBPACK_IMPORTED_MODULE_3_get_object_value__["a" /* default */])(realTimeState, path);
  var wsUrl = Object(__WEBPACK_IMPORTED_MODULE_3_get_object_value__["a" /* default */])(realTimeState, [REAL_TIME_URL]);

  if (data && (!url || url === wsUrl)) {
    data[REAL_TIME_URL] = wsUrl;
    return data;
  } else {
    if (realTimeReset) {
      // Reset for when reconnection to new websocket server
      // will not send duplicate data to client
      var reset = {};
      keys(prevState).forEach(function (key) {
        return reset[key] = null;
      });
      return reset;
    }
  }
};

var defaultProps = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__["b" /* returnOptions */].defaultProps, {
  realTimePath: [REAL_TIME_KEY],
  realTimeUrl: null,
  realTimeReset: false
});

var myReturnOptions = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__["b" /* returnOptions */], {
  getStores: getStores,
  calculateState: calculateState,
  defaultProps: defaultProps
});

var RealTimeReturn = function RealTimeReturn(props) {
  var children = props.children,
      realTimePath = props.realTimePath,
      otherProps = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["children", "realTimePath"]);

  var myOtherProps = __WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__["b" /* returnOptions */].reset(otherProps);
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__["a" /* Return */], null, function (pageState) {
    return Object(__WEBPACK_IMPORTED_MODULE_5_react_atomic_molecule__["build"])(children)(Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, pageState, {}, myOtherProps));
  });
};

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_4_reshow_flux__["d" /* connectHook */])(RealTimeReturn, myReturnOptions));

/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_atomic_molecule__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__ = __webpack_require__(29);








var _returnOptions$defaul = __WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__["b" /* returnOptions */].defaultProps,
    pathStates = _returnOptions$defaul.pathStates,
    otherDefaultProps = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_returnOptions$defaul, ["pathStates"]);

var myReturnOptions = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, __WEBPACK_IMPORTED_MODULE_6__molecules_ReshowComponent__["b" /* returnOptions */], {
  defaultProps: Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, otherDefaultProps, {
    initStates: ['section', 'I18N']
  })
});

var Section = function Section(props) {
  var name = props.name,
      section = props.section,
      immutable = props.immutable,
      children = props.children,
      otherProps = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(props, ["name", "section", "immutable", "children"]);

  if (!section) {
    return null;
  }

  var allParams = myReturnOptions.reset(otherProps);

  if (immutable) {
    var thisSection = section.get(name);

    if (!thisSection) {
      return null;
    }

    var shouldRender = thisSection.get('shouldRender');

    if (!shouldRender) {
      return null;
    }

    thisSection["delete"]('shouldRender').keySeq().forEach(function (key) {
      allParams[key] = thisSection.get(key);
    });
  } else {
    var _get = Object(__WEBPACK_IMPORTED_MODULE_3_get_object_value__["a" /* default */])(section, [name], {}),
        _shouldRender = _get.shouldRender,
        others = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_get, ["shouldRender"]);

    if (!_shouldRender) {
      return null;
    }

    allParams = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, others, {}, allParams);
  }

  return Object(__WEBPACK_IMPORTED_MODULE_4_react_atomic_molecule__["build"])(children)(allParams);
};

Section.displayName = 'Section';
/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_5_reshow_flux__["d" /* connectHook */])(Section, myReturnOptions));

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return update; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_get_object_value__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_organism_react_ajax__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_call_func__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__molecules_ReshowComponent__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_updateCanonicalUrl__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_dispatcher__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_stores_globalStore__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_stores_pageStore__ = __webpack_require__(50);















var isArray = Array.isArray;
var isInit;

var update = function update(params) {
  var realTimeData = Object(__WEBPACK_IMPORTED_MODULE_6_get_object_value__["a" /* default */])(params, ['--realTimeData--']);
  var reset = Object(__WEBPACK_IMPORTED_MODULE_6_get_object_value__["a" /* default */])(params, ['--reset--']);
  var type = realTimeData ? 'realTime' : 'config/' + (reset ? 're' : '') + 'set';
  Object(__WEBPACK_IMPORTED_MODULE_12__src_dispatcher__["b" /* dispatch */])(type, params);
  var oDoc = Object(__WEBPACK_IMPORTED_MODULE_8_win_doc__["a" /* doc */])();

  if (oDoc.URL) {
    var htmlTitle = Object(__WEBPACK_IMPORTED_MODULE_6_get_object_value__["a" /* default */])(params, ['htmlTitle']);

    if (htmlTitle) {
      if (isArray(htmlTitle)) {
        oDoc.title = Object(__WEBPACK_IMPORTED_MODULE_6_get_object_value__["a" /* default */])(htmlTitle, [0]);
      } else {
        oDoc.title = htmlTitle;
      }
    }

    var canonical = Object(__WEBPACK_IMPORTED_MODULE_6_get_object_value__["a" /* default */])(params, ['data', 'canonical']);

    if (canonical) {
      Object(__WEBPACK_IMPORTED_MODULE_11__src_updateCanonicalUrl__["a" /* default */])(canonical, params);
    }
  }
};

var Reshow =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_inherits__["a" /* default */])(Reshow, _PureComponent);

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(Reshow, null, [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }
  }]);

  function Reshow(props) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Reshow);

    _this = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Reshow).call(this, props));

    if (isInit) {
      console.warn('The best practice is avoid multi Reshow Component.');
      _this.state = {
        hasError: true
      };
    } else {
      update(props);
      _this.state = {
        hasError: false
      };
      isInit = 1;
    }

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_createClass__["a" /* default */])(Reshow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Server site version also need update Canonical
      Object(__WEBPACK_IMPORTED_MODULE_11__src_updateCanonicalUrl__["b" /* initCanonicalUrl */])(this.props);
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;

      if (onError) {
        Object(__WEBPACK_IMPORTED_MODULE_9_call_func__["a" /* default */])(onError, [error, info]);
      } else {
        console.error([error, info]);
      }

      this.setState({
        hasError: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var hasError = this.state.hasError;

      if (hasError) {
        return null;
      }

      var _this$props = this.props,
          onError = _this$props.onError,
          themes = _this$props.themes,
          ajax = _this$props.ajax,
          webSocketUrl = _this$props.webSocketUrl;
      __WEBPACK_IMPORTED_MODULE_13__src_stores_globalStore__["a" /* globalStore */].path = __WEBPACK_IMPORTED_MODULE_14__src_stores_pageStore__["a" /* default */].getThemePath();
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__molecules_ReshowComponent__["a" /* Return */], {
        initStates: ['baseUrl', 'staticVersion']
      }, __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_organism_react_ajax__["a" /* AjaxPage */], {
        callback: update
        /*State*/
        ,
        themePath: __WEBPACK_IMPORTED_MODULE_13__src_stores_globalStore__["a" /* globalStore */].path
        /*Props*/
        ,
        themes: themes,
        ajax: ajax,
        webSocketUrl: webSocketUrl
      }));
    }
  }]);

  return Reshow;
}(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);

/* harmony default export */ __webpack_exports__["a"] = (Reshow);


/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initCanonicalUrl; });
/* unused harmony export getDocCanonicalUrl */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_get_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_win_doc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_get_object_value__ = __webpack_require__(10);




var getDocCanonicalUrl = function getDocCanonicalUrl(oDoc) {
  oDoc = oDoc || Object(__WEBPACK_IMPORTED_MODULE_1_win_doc__["a" /* doc */])();
  var canonical = oDoc.querySelector('link[rel="canonical"]');
  return canonical ? canonical.href : false;
};

var initCanonicalUrl = function initCanonicalUrl(props) {
  var canonicalUrl = getDocCanonicalUrl();

  if (-1 !== Object(__WEBPACK_IMPORTED_MODULE_1_win_doc__["a" /* doc */])().URL.indexOf('--disableCanonical')) {
    Object(__WEBPACK_IMPORTED_MODULE_0_get_storage__["c" /* sessionStorage */])('disableCanonical')(1);
  } else if (canonicalUrl) {
    updateCanonicalUrl(canonicalUrl, props);
  }
};

var updateCanonicalUrl = function updateCanonicalUrl(url, props) {
  var loc = Object(__WEBPACK_IMPORTED_MODULE_1_win_doc__["a" /* doc */])().location;

  if (!loc || Object(__WEBPACK_IMPORTED_MODULE_2_get_object_value__["a" /* default */])(props, ['disableCanonical'], function () {
    return Object(__WEBPACK_IMPORTED_MODULE_0_get_storage__["c" /* sessionStorage */])('disableCanonical')();
  })) {
    return;
  }

  url = url || getDocCanonicalUrl();

  if (!url) {
    return;
  }

  var newUrl = url + loc.search + loc.hash;

  if (-1 !== url.indexOf(loc.hostname)) {
    history.replaceState && history.replaceState('', '', newUrl);
  } else {
    loc.replace(newUrl);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (updateCanonicalUrl);


/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_index__ = __webpack_require__(264);








/**
 * Production please use
 * import Typing from "organism-react-typing"
 */



var _ref =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement("div", null, "abc");

var _ref2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement("div", null, "def");

var Index =
/*#__PURE__*/
function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(Index, _Component);

  function Index() {
    var _getPrototypeOf2;

    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, (_getPrototypeOf2 = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Index)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleStart", function () {
      _this.el.start();
    });

    Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleStop", function () {
      _this.el.stop();
    });

    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_createClass__["a" /* default */])(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement("div", null, __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__src_index__["a" /* default */], {
        ref: function ref(el) {
          return _this2.el = el;
        },
        background: "#000",
        color: "#fff"
      }, _ref, _ref2), __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement("button", {
        onClick: this.handleStart
      }, "Start"), __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement("button", {
        onClick: this.handleStop
      }, "Stop"));
    }
  }]);

  return Index;
}(__WEBPACK_IMPORTED_MODULE_7_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Index);

/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_organisms_Typing__ = __webpack_require__(265);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ui_organisms_Typing__["a"]; });
// Default


/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_assertThisInitialized__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_inherits__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__ = __webpack_require__(16);













var getTypingNextWordAniClassName = function getTypingNextWordAniClassName(el, sec) {
  var width = el.offsetWidth + 70;
  var ssec = '' + sec;
  var aniName = 'typingNextWord-' + width + '-' + ssec.replace('.', '-');

  if (injects[aniName]) {
    return aniName;
  }

  Object(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["reactStyle"])([{
    maxWidth: 0
  }, {
    maxWidth: width
  }], ['@keyframes ' + aniName, '0%', '100%'], aniName + '-keyframe');
  Object(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["reactStyle"])({
    animation: [aniName + ' ' + sec + 's steps(10) infinite alternate'],
    visibility: 'visible !important'
  }, '.' + aniName, aniName + '-ani');
  injects[aniName] = true;
  return aniName;
};

var TypingItem =
/*#__PURE__*/
function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_inherits__["a" /* default */])(TypingItem, _Component);

  function TypingItem(props) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, TypingItem);

    _this = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(TypingItem).call(this, props));

    Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_7_reshow_runtime_es_helpers_assertThisInitialized__["a" /* default */])(_this), "handleEl", function (el) {
      _this.setState(function (classes) {
        var next = getTypingNextWordAniClassName(el, _this.props.sec);

        if (next !== classes) {
          return {
            classes: next
          };
        } else {
          return {};
        }
      });
    });

    _this.state = {
      classes: null
    };
    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_createClass__["a" /* default */])(TypingItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          sec = _this$props.sec,
          background = _this$props.background,
          others = Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["children", "sec", "background"]);

      var classes = this.state.classes;
      return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["SemanticUI"], others, __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div", {
        className: classes,
        ref: this.handleEl,
        style: Styles.typingItemText
      }, children, " \xA0"), __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["SemanticUI"], {
        styles: injects.typingCursor
      }, " | "));
    }
  }]);

  return TypingItem;
}(__WEBPACK_IMPORTED_MODULE_10_react__["Component"]);

var Typing =
/*#__PURE__*/
function (_Component2) {
  Object(__WEBPACK_IMPORTED_MODULE_8_reshow_runtime_es_helpers_inherits__["a" /* default */])(Typing, _Component2);

  function Typing(props) {
    var _this2;

    Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Typing);

    _this2 = Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Typing).call(this, props));
    _this2.state = {
      typingItemStyles: null,
      isRun: props.autoStart
    };
    injects = Object(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["lazyInject"])(injects, InjectStyles);
    return _this2;
  }

  Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_createClass__["a" /* default */])(Typing, [{
    key: "update",
    value: function update(props) {
      var children = props.children,
          propsHeight = props.height,
          sec = props.sec;
      var itemLength = children.length;
      var height = parseInt(propsHeight, 10);
      var aniName = 'typingNextLine';
      var styleId = aniName + '-' + itemLength + '-' + height;
      var typingItemStyles = Object(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["reactStyle"])({
        position: 'relative',
        animation: [styleId + ' ' + itemLength * 2 * sec + 's steps(' + itemLength + ') infinite'],
        height: height
      }, null, false);
      Object(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["reactStyle"])([{
        top: 0
      }, {
        top: 0 - height * itemLength
      }], ['@keyframes ' + styleId, '0%', '100%'], styleId);
      this.setState({
        typingItemStyles: typingItemStyles
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var _this$props2 = this.props,
          children = _this$props2.children,
          height = _this$props2.height,
          sec = _this$props2.sec;

      if (prevProps.children.length !== children.length || prevProps.height !== height || prevProps.sec !== sec) {
        this.update(this.props);
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.setState({
        isRun: true
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        isRun: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var _this$state = this.state,
          isRun = _this$state.isRun,
          typingItemStyles = _this$state.typingItemStyles;
      var items = [];
      var atts = {
        height: props.height,
        color: props.color
      };

      if (props.background) {
        atts.background = props.background;
      }

      if (isRun && typingItemStyles) {
        // need calculate offsetWidth
        __WEBPACK_IMPORTED_MODULE_10_react___default.a.Children.map(props.children, function (item, key) {
          items.push(__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(TypingItem, Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_extends__["a" /* default */])({
            key: key,
            sec: props.sec,
            styles: typingItemStyles
          }, atts), item.props.children));
        });
      }

      return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_react_atomic_molecule__["SemanticUI"], {
        style: Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectSpread2__["a" /* default */])({}, Styles.typingContainer, {}, atts)
      }, items);
    }
  }]);

  return Typing;
}(__WEBPACK_IMPORTED_MODULE_10_react__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_9_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Typing, "defaultProps", {
  height: 80,
  color: '#000',
  background: null,
  sec: 2,
  autoStart: true
});

/* harmony default export */ __webpack_exports__["a"] = (Typing);
var Styles = {
  typingContainer: {
    overflow: 'hidden'
  },
  typingItemText: {
    display: 'inline-block',
    overflow: 'hidden',
    visibility: 'hidden',
    whiteSpace: 'nowrap',
    paddingRight: 1,
    boxSizing: 'border-box'
  }
};
var injects;
var InjectStyles = {
  typingCursor: [{
    display: 'inline-block',
    position: 'relative',
    marginLeft: 5,
    top: 1,
    verticalAlign: 'top',
    animation: ['typingBlink 1s infinite']
  }],
  typingBlink: [[{
    opacity: '1'
  }, {
    opacity: '0'
  }], ['@keyframes typingBlink', '0%, 100%', '50%']]
};

/***/ })
],[106]);
//# sourceMappingURL=main.bundle.js.map