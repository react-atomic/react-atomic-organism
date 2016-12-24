webpackJsonp([3],{

/***/ 538:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }return target;
	};

	var _getObjectValue = __webpack_require__(533);

	var _getObjectValue2 = _interopRequireDefault(_getObjectValue);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _objectWithoutProperties(obj, keys) {
	    var target = {};for (var i in obj) {
	        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	    }return target;
	}

	var ws;
	var callbacks = [];
	var post;

	try {
	    post = postMessage;
	    post({ type: "ready" });
	} catch (e) {
	    post = function post(data) {
	        var e = {
	            data: data
	        };
	        callbacks.forEach(function (c) {
	            c(e);
	        });
	    };
	}
	exports.default = {
	    postMessage: function postMessage(data) {
	        var e = {
	            data: data
	        };
	        onmessage(e);
	    },
	    addEventListener: function addEventListener(type, callback) {
	        callbacks.push(callback);
	    }
	};

	onmessage = function onmessage(e) {
	    var data = (0, _getObjectValue2.default)(e, ['data']);
	    switch (data.type) {
	        case 'initWs':
	            initWs(data.ws);
	            break;
	        case 'ajaxGet':
	            ajaxGet(data);
	            break;
	        case 'ajaxPost':
	            ajaxPost(data);
	            break;
	    }
	};

	var ajaxGet = function ajaxGet(_ref) {
	    var url = _ref.url,
	        action = _ref.action;

	    var params = (0, _getObjectValue2.default)(action, ['params'], {});
	    __webpack_require__.e/* require */(4, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(539)]; (function (req) {
	        req.get(url).query(params.query).set('Accept', (0, _getObjectValue2.default)(params, ['accept'], 'application/json')).end(function (err, res) {
	            var req = res.req,
	                xhr = res.xhr,
	                error = res.error,
	                resetRes = _objectWithoutProperties(res, ['req', 'xhr', 'error']);

	            post(_extends({}, action, {
	                text: res.text,
	                response: resetRes
	            }));
	        });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	};

	var ajaxPost = function ajaxPost(_ref2) {
	    var url = _ref2.url,
	        action = _ref2.action;

	    var params = (0, _getObjectValue2.default)(action, ['params'], {});
	    __webpack_require__.e/* require */(4/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(539)]; (function (req) {
	        req.post(url).send(params.query).set('Accept', (0, _getObjectValue2.default)(params, ['accept'], 'application/json')).end(function (err, res) {
	            var req = res.req,
	                xhr = res.xhr,
	                error = res.error,
	                resetRes = _objectWithoutProperties(res, ['req', 'xhr', 'error']);

	            post(_extends({}, action, {
	                text: res.text,
	                response: resetRes
	            }));
	        });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	};

	var initWs = function initWs(url) {
	    ws = new WebSocket(url);
	    ws.onopen = function (e) {};
	    ws.onerror = function (e) {};
	    ws.onmessage = function (e) {
	        post({ type: 'ws', text: e.data });
	    };
	};
	module.exports = exports['default'];

/***/ }

});