webpackJsonp([2],{

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__organisms_Transition__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_class_lib__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_class_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_class_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_get_object_value__ = __webpack_require__(10);




var _this = this;






var getValue = function getValue(arr, isAppear, isExit, defaultValue) {
  var index = isExit ? 'exit' : isAppear ? 'appear' : 'enter';
  return Object(__WEBPACK_IMPORTED_MODULE_6_get_object_value__["a" /* default */])(arr, [index], defaultValue);
};

var FUNCTION = 'function';

var handleStart = function handleStart(classList, handler, delay, isExit, ing, node, isAppear) {
  if (!node || !node.style) {
    return;
  }

  if (!isExit && !ing) {
    node.style.visibility = 'hidden';
  }

  var thisDelay = getValue(delay, isAppear, isExit, 0);
  setTimeout(function () {
    if (!ing) {
      node.style.visibility = 'inherit';
      var thisClass = getValue(classList, isAppear, isExit);

      if (thisClass && !ing) {
        node.className = Object(__WEBPACK_IMPORTED_MODULE_5_class_lib__["mixClass"])(node.className, thisClass);
      }
    }

    if (FUNCTION === Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_typeof__["a" /* default */])(handler)) {
      handler(node, isAppear);
    }
  }, thisDelay);
};

var handleFinish = function handleFinish(classList, handler, isExit, node, isAppear) {
  if (node) {
    if (isExit) {
      node.style.visibility = 'hidden';
    }

    var thisClass = getValue(classList, isAppear, isExit);

    if (thisClass) {
      node.className = Object(__WEBPACK_IMPORTED_MODULE_5_class_lib__["removeClass"])(node.className, thisClass);
    }
  }

  if (FUNCTION === Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_typeof__["a" /* default */])(handler)) {
    handler(node, isAppear);
  }
};

var CSSTransition = function CSSTransition(_ref) {
  var classNames = _ref.classNames,
      delay = _ref.delay,
      isCompiled = _ref.isCompiled,
      isCSSTransition = _ref.isCSSTransition,
      onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onEntered = _ref.onEntered,
      onExit = _ref.onExit,
      onExiting = _ref.onExiting,
      onExited = _ref.onExited,
      props = Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_ref, ["classNames", "delay", "isCompiled", "isCSSTransition", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"]);

  return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__organisms_Transition__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_extends__["a" /* default */])({}, props, {
    onEnter: handleStart.bind(_this, classNames, onEnter, delay, false, false),
    onEntering: handleStart.bind(_this, classNames, onEntering, delay, false, true),
    onEntered: handleFinish.bind(_this, classNames, onEntered, false),
    onExit: handleStart.bind(_this, classNames, onExit, delay, true, false),
    onExiting: handleStart.bind(_this, classNames, onExiting, delay, true, true),
    onExited: handleFinish.bind(_this, classNames, onExited, true)
  }));
};

CSSTransition.defaultProps = {
  isCSSTransition: true,
  isCompiled: false,
  "in": true
};
/* harmony default export */ __webpack_exports__["default"] = (CSSTransition);

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export UNMOUNTED */
/* unused harmony export EXITED */
/* unused harmony export ENTERING */
/* unused harmony export ENTERED */
/* unused harmony export EXITING */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_dom__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_dom__);










var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
var timeoutsShape = process.env.NODE_ENV !== "production" ? process.env.NODE_ENV !== 'production' ? __WEBPACK_IMPORTED_MODULE_7_prop_types__["oneOfType"]([__WEBPACK_IMPORTED_MODULE_7_prop_types__["number"], __WEBPACK_IMPORTED_MODULE_7_prop_types__["shape"]({
  enter: __WEBPACK_IMPORTED_MODULE_7_prop_types__["number"],
  exit: __WEBPACK_IMPORTED_MODULE_7_prop_types__["number"],
  appear: __WEBPACK_IMPORTED_MODULE_7_prop_types__["number"]
}).isRequired]) : null : {};
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 0 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example:
 *
 * ```jsx
 * state = { in: false };
 *
 * toggleEnterState = () => {
 *   this.setState({ in: true });
 * }
 *
 * render() {
 *   return (
 *     <>
 *       <Transition in={this.state.in} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
 *     </>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition =
/*#__PURE__*/
function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_5_reshow_runtime_es_helpers_inherits__["a" /* default */])(Transition, _PureComponent);

  function Transition(props, context) {
    var _this;

    Object(__WEBPACK_IMPORTED_MODULE_1_reshow_runtime_es_helpers_classCallCheck__["a" /* default */])(this, Transition);

    _this = Object(__WEBPACK_IMPORTED_MODULE_3_reshow_runtime_es_helpers_possibleConstructorReturn__["a" /* default */])(this, Object(__WEBPACK_IMPORTED_MODULE_4_reshow_runtime_es_helpers_getPrototypeOf__["a" /* default */])(Transition).call(this, props, context));
    var parentGroup = context.transitionGroup; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props["in"]) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_reshow_runtime_es_helpers_createClass__["a" /* default */])(Transition, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        transitionGroup: null
      }; // allows for nested Transitions
    }
  }, {
    key: "componentDidMount",
    // getSnapshotBeforeUpdate(prevProps) {
    //   let nextStatus = null
    //   if (prevProps !== this.props) {
    //     const { status } = this.state
    //     if (this.props.in) {
    //       if (status !== ENTERING && status !== ENTERED) {
    //         nextStatus = ENTERING
    //       }
    //     } else {
    //       if (status === ENTERING || status === ENTERED) {
    //         nextStatus = EXITING
    //       }
    //     }
    //   }
    //   return { nextStatus }
    // }
    value: function componentDidMount() {
      this.updateStatus(true, this.appearStatus);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var nextStatus = null;

      if (prevProps !== this.props) {
        var status = this.state.status;

        if (this.props["in"]) {
          if (status !== ENTERING && status !== ENTERED) {
            nextStatus = ENTERING;
          }
        } else {
          if (status === ENTERING || status === ENTERED) {
            nextStatus = EXITING;
          }
        }
      }

      this.updateStatus(false, nextStatus);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelNextCallback();
    }
  }, {
    key: "getTimeouts",
    value: function getTimeouts() {
      var timeout = this.props.timeout;
      var exit, enter, appear;
      exit = enter = appear = timeout;

      if (timeout != null && typeof timeout !== 'number') {
        exit = timeout.exit;
        enter = timeout.enter; // TODO: remove fallback for next major

        appear = timeout.appear !== undefined ? timeout.appear : enter;
      }

      return {
        exit: exit,
        enter: enter,
        appear: appear
      };
    }
  }, {
    key: "updateStatus",
    value: function updateStatus() {
      var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var nextStatus = arguments.length > 1 ? arguments[1] : undefined;

      if (nextStatus !== null) {
        // nextStatus will always be ENTERING or EXITING.
        this.cancelNextCallback();
        var node = __WEBPACK_IMPORTED_MODULE_9_react_dom___default.a.findDOMNode(this);

        if (nextStatus === ENTERING) {
          this.performEnter(node, mounting);
        } else {
          this.performExit(node);
        }
      } else if (this.props.unmountOnExit && this.state.status === EXITED) {
        this.setState({
          status: UNMOUNTED
        });
      }
    }
  }, {
    key: "performEnter",
    value: function performEnter(node, mounting) {
      var _this2 = this;

      var enter = this.props.enter;
      var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
      var timeouts = this.getTimeouts();
      var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
      // if we are mounting and running this it means appear _must_ be set

      if (!mounting && !enter) {
        this.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(node);
        });
        return;
      }

      this.props.onEnter(node, appearing);
      this.safeSetState({
        status: ENTERING
      }, function () {
        _this2.props.onEntering(node, appearing);

        _this2.onTransitionEnd(node, enterTimeout, function () {
          _this2.safeSetState({
            status: ENTERED
          }, function () {
            _this2.props.onEntered(node, appearing);
          });
        });
      });
    }
  }, {
    key: "performExit",
    value: function performExit(node) {
      var _this3 = this;

      var exit = this.props.exit;
      var timeouts = this.getTimeouts(); // no exit animation skip right to EXITED

      if (!exit) {
        this.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(node);
        });
        return;
      }

      this.props.onExit(node);
      this.safeSetState({
        status: EXITING
      }, function () {
        _this3.props.onExiting(node);

        _this3.onTransitionEnd(node, timeouts.exit, function () {
          _this3.safeSetState({
            status: EXITED
          }, function () {
            _this3.props.onExited(node);
          });
        });
      });
    }
  }, {
    key: "cancelNextCallback",
    value: function cancelNextCallback() {
      if (this.nextCallback !== null) {
        this.nextCallback.cancel();
        this.nextCallback = null;
      }
    }
  }, {
    key: "safeSetState",
    value: function safeSetState(nextState, callback) {
      // This shouldn't be necessary, but there are weird race conditions with
      // setState callbacks and unmounting in testing, so always make sure that
      // we can cancel any pending setState callbacks after we unmount.
      callback = this.setNextCallback(callback);
      this.setState(nextState, callback);
    }
  }, {
    key: "setNextCallback",
    value: function setNextCallback(callback) {
      var _this4 = this;

      var active = true;

      this.nextCallback = function (event) {
        if (active) {
          active = false;
          _this4.nextCallback = null;
          callback(event);
        }
      };

      this.nextCallback.cancel = function () {
        active = false;
      };

      return this.nextCallback;
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(node, timeout, handler) {
      this.setNextCallback(handler);
      var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

      if (!node || doesNotHaveTimeoutOrListener) {
        setTimeout(this.nextCallback, 0);
        return;
      }

      if (this.props.addEndListener) {
        this.props.addEndListener(node, this.nextCallback);
      }

      if (timeout != null) {
        setTimeout(this.nextCallback, timeout);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var status = this.state.status;

      if (status === UNMOUNTED) {
        return null;
      }

      var _this$props = this.props,
          children = _this$props.children,
          childProps = Object(__WEBPACK_IMPORTED_MODULE_0_reshow_runtime_es_helpers_objectWithoutProperties__["a" /* default */])(_this$props, ["children"]); // filter props for Transtition


      delete childProps["in"];
      delete childProps.mountOnEnter;
      delete childProps.unmountOnExit;
      delete childProps.appear;
      delete childProps.enter;
      delete childProps.exit;
      delete childProps.timeout;
      delete childProps.addEndListener;
      delete childProps.onEnter;
      delete childProps.onEntering;
      delete childProps.onEntered;
      delete childProps.onExit;
      delete childProps.onExiting;
      delete childProps.onExited;

      if (typeof children === 'function') {
        return children(status, childProps);
      }

      var child = __WEBPACK_IMPORTED_MODULE_8_react___default.a.Children.only(children);
      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.cloneElement(child, childProps);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref, prevState) {
      var nextIn = _ref["in"];

      if (nextIn && prevState.status === UNMOUNTED) {
        return {
          status: EXITED
        };
      }

      return null;
    }
  }]);

  return Transition;
}(__WEBPACK_IMPORTED_MODULE_8_react__["PureComponent"]);

Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Transition, "contextTypes", {
  transitionGroup: __WEBPACK_IMPORTED_MODULE_7_prop_types__["object"]
});

Object(__WEBPACK_IMPORTED_MODULE_6_reshow_runtime_es_helpers_defineProperty__["a" /* default */])(Transition, "childContextTypes", {
  transitionGroup: function transitionGroup() {}
});

Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`, `'unmounted'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: __WEBPACK_IMPORTED_MODULE_7_prop_types__["oneOfType"]([__WEBPACK_IMPORTED_MODULE_7_prop_types__["func"].isRequired, __WEBPACK_IMPORTED_MODULE_7_prop_types__["element"].isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  "in": __WEBPACK_IMPORTED_MODULE_7_prop_types__["bool"],

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types__["bool"],

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: __WEBPACK_IMPORTED_MODULE_7_prop_types__["bool"],

  /**
   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
   */
  appear: __WEBPACK_IMPORTED_MODULE_7_prop_types__["bool"],

  /**
   * Enable or disable enter transitions.
   */
  enter: __WEBPACK_IMPORTED_MODULE_7_prop_types__["bool"],

  /**
   * Enable or disable exit transitions.
   */
  exit: __WEBPACK_IMPORTED_MODULE_7_prop_types__["bool"],

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: __WEBPACK_IMPORTED_MODULE_7_prop_types__["func"],

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types__["func"],

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: __WEBPACK_IMPORTED_MODULE_7_prop_types__["func"],

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: __WEBPACK_IMPORTED_MODULE_7_prop_types__["func"],

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: __WEBPACK_IMPORTED_MODULE_7_prop_types__["func"],

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: __WEBPACK_IMPORTED_MODULE_7_prop_types__["func"],

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: __WEBPACK_IMPORTED_MODULE_7_prop_types__["func"]
} : {}; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  "in": false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;
/* harmony default export */ __webpack_exports__["a"] = (Transition);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ })

});
//# sourceMappingURL=2.ee6c6bfb8973acc218b2.bundle.js.map