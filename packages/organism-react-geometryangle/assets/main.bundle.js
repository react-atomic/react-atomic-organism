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
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "044eab662357ebb8b3be";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
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
/******/ 		return __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".bundle.js"
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/
/******/ 		let cleanup = function NoOp() {};
/******/
/******/ 		if ('undefined' !== typeof window && window.$RefreshSetup$) {
/******/ 		  cleanup = window.$RefreshSetup$(module.i);
/******/ 		}
/******/
/******/ 		try {
/******/
/******/ 			modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		} finally {
/******/ 		  cleanup();
/******/ 		}
/******/
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
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
/******/ 	deferredModules.push([0,"vendor"]);
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

/***/ "./build/es/src/fss.js":
/*!*****************************!*\
  !*** ./build/es/src/fss.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _s = $RefreshSig$();

var FSS = {
  FRONT: 0,
  BACK: 1,
  DOUBLE: 2,
  SVGNS: "http://www.w3.org/2000/svg"
};
/**
 * @class Array
 * @author Matthew Wagerfield
 */

FSS.Array = typeof Float32Array === "function" ? Float32Array : Array;
/**
 * @class Utils
 * @author Matthew Wagerfield
 */

FSS.Utils = {
  isNumber: function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
};
/**
 * Request Animation Frame Polyfill.
 * @author Paul Irish
 * @see https://gist.github.com/paulirish/1579671
 */

/**
 * @object Math Augmentation
 * @author Matthew Wagerfield
 */

Math.PIM2 = Math.PI * 2;
Math.PID2 = Math.PI / 2;

Math.randomInRange = function (min, max) {
  return min + (max - min) * Math.random();
};

Math.clamp = function (value, min, max) {
  value = Math.max(value, min);
  value = Math.min(value, max);
  return value;
};
/**
 * @object Vector3
 * @author Matthew Wagerfield
 */


FSS.Vector3 = {
  create: function create(x, y, z) {
    var vector = new FSS.Array(3);
    this.set(vector, x, y, z);
    return vector;
  },
  clone: function clone(a) {
    var vector = this.create();
    this.copy(vector, a);
    return vector;
  },
  set: function set(target, x, y, z) {
    target[0] = x || 0;
    target[1] = y || 0;
    target[2] = z || 0;
    return this;
  },
  setX: function setX(target, x) {
    target[0] = x || 0;
    return this;
  },
  setY: function setY(target, y) {
    target[1] = y || 0;
    return this;
  },
  setZ: function setZ(target, z) {
    target[2] = z || 0;
    return this;
  },
  copy: function copy(target, a) {
    target[0] = a[0];
    target[1] = a[1];
    target[2] = a[2];
    return this;
  },
  add: function add(target, a) {
    target[0] += a[0];
    target[1] += a[1];
    target[2] += a[2];
    return this;
  },
  addVectors: function addVectors(target, a, b) {
    target[0] = a[0] + b[0];
    target[1] = a[1] + b[1];
    target[2] = a[2] + b[2];
    return this;
  },
  addScalar: function addScalar(target, s) {
    target[0] += s;
    target[1] += s;
    target[2] += s;
    return this;
  },
  subtract: function subtract(target, a) {
    target[0] -= a[0];
    target[1] -= a[1];
    target[2] -= a[2];
    return this;
  },
  subtractVectors: function subtractVectors(target, a, b) {
    target[0] = a[0] - b[0];
    target[1] = a[1] - b[1];
    target[2] = a[2] - b[2];
    return this;
  },
  subtractScalar: function subtractScalar(target, s) {
    target[0] -= s;
    target[1] -= s;
    target[2] -= s;
    return this;
  },
  multiply: function multiply(target, a) {
    target[0] *= a[0];
    target[1] *= a[1];
    target[2] *= a[2];
    return this;
  },
  multiplyVectors: function multiplyVectors(target, a, b) {
    target[0] = a[0] * b[0];
    target[1] = a[1] * b[1];
    target[2] = a[2] * b[2];
    return this;
  },
  multiplyScalar: function multiplyScalar(target, s) {
    target[0] *= s;
    target[1] *= s;
    target[2] *= s;
    return this;
  },
  divide: function divide(target, a) {
    target[0] /= a[0];
    target[1] /= a[1];
    target[2] /= a[2];
    return this;
  },
  divideVectors: function divideVectors(target, a, b) {
    target[0] = a[0] / b[0];
    target[1] = a[1] / b[1];
    target[2] = a[2] / b[2];
    return this;
  },
  divideScalar: function divideScalar(target, s) {
    if (s !== 0) {
      target[0] /= s;
      target[1] /= s;
      target[2] /= s;
    } else {
      target[0] = 0;
      target[1] = 0;
      target[2] = 0;
    }

    return this;
  },
  cross: function cross(target, a) {
    var x = target[0];
    var y = target[1];
    var z = target[2];
    target[0] = y * a[2] - z * a[1];
    target[1] = z * a[0] - x * a[2];
    target[2] = x * a[1] - y * a[0];
    return this;
  },
  crossVectors: function crossVectors(target, a, b) {
    target[0] = a[1] * b[2] - a[2] * b[1];
    target[1] = a[2] * b[0] - a[0] * b[2];
    target[2] = a[0] * b[1] - a[1] * b[0];
    return this;
  },
  min: function min(target, value) {
    if (target[0] < value) {
      target[0] = value;
    }

    if (target[1] < value) {
      target[1] = value;
    }

    if (target[2] < value) {
      target[2] = value;
    }

    return this;
  },
  max: function max(target, value) {
    if (target[0] > value) {
      target[0] = value;
    }

    if (target[1] > value) {
      target[1] = value;
    }

    if (target[2] > value) {
      target[2] = value;
    }

    return this;
  },
  clamp: function clamp(target, min, max) {
    this.min(target, min);
    this.max(target, max);
    return this;
  },
  limit: function limit(target, min, max) {
    var length = this.length(target);

    if (min !== null && length < min) {
      this.setLength(target, min);
    } else if (max !== null && length > max) {
      this.setLength(target, max);
    }

    return this;
  },
  dot: function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },
  normalise: function normalise(target) {
    return this.divideScalar(target, this.length(target));
  },
  negate: function negate(target) {
    return this.multiplyScalar(target, -1);
  },
  distanceSquared: function distanceSquared(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
  },
  distance: function distance(a, b) {
    return Math.sqrt(this.distanceSquared(a, b));
  },
  lengthSquared: function lengthSquared(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
  },
  length: function length(a) {
    return Math.sqrt(this.lengthSquared(a));
  },
  setLength: function setLength(target, l) {
    var length = this.length(target);

    if (length !== 0 && l !== length) {
      this.multiplyScalar(target, l / length);
    }

    return this;
  },
  floor: function floor(target) {
    target[0] = Math.floor(target[0]);
    target[1] = Math.floor(target[1]);
    target[2] = Math.floor(target[2]);
    return target;
  }
};
/**
 * @object Vector4
 * @author Matthew Wagerfield
 */

FSS.Vector4 = {
  create: function create(x, y, z, w) {
    var vector = new FSS.Array(4);
    this.set(vector, x, y, z);
    return vector;
  },
  set: function set(target, x, y, z, w) {
    target[0] = x || 0;
    target[1] = y || 0;
    target[2] = z || 0;
    target[3] = w || 0;
    return this;
  },
  setX: function setX(target, x) {
    target[0] = x || 0;
    return this;
  },
  setY: function setY(target, y) {
    target[1] = y || 0;
    return this;
  },
  setZ: function setZ(target, z) {
    target[2] = z || 0;
    return this;
  },
  setW: function setW(target, w) {
    target[3] = w || 0;
    return this;
  },
  add: function add(target, a) {
    target[0] += a[0];
    target[1] += a[1];
    target[2] += a[2];
    target[3] += a[3];
    return this;
  },
  multiplyVectors: function multiplyVectors(target, a, b) {
    target[0] = a[0] * b[0];
    target[1] = a[1] * b[1];
    target[2] = a[2] * b[2];
    target[3] = a[3] * b[3];
    return this;
  },
  multiplyScalar: function multiplyScalar(target, s) {
    target[0] *= s;
    target[1] *= s;
    target[2] *= s;
    target[3] *= s;
    return this;
  },
  min: function min(target, value) {
    if (target[0] < value) {
      target[0] = value;
    }

    if (target[1] < value) {
      target[1] = value;
    }

    if (target[2] < value) {
      target[2] = value;
    }

    if (target[3] < value) {
      target[3] = value;
    }

    return this;
  },
  max: function max(target, value) {
    if (target[0] > value) {
      target[0] = value;
    }

    if (target[1] > value) {
      target[1] = value;
    }

    if (target[2] > value) {
      target[2] = value;
    }

    if (target[3] > value) {
      target[3] = value;
    }

    return this;
  },
  clamp: function clamp(target, min, max) {
    this.min(target, min);
    this.max(target, max);
    return this;
  }
};
/**
 * @class Color
 * @author Matthew Wagerfield
 */

FSS.Color = function (color, opacity) {
  this.rgba = [];
  this.color = color || "#000000";
  this.opacity = FSS.Utils.isNumber(opacity) ? opacity : 1;
  this.set(this.color, this.opacity);
};

FSS.Color.prototype = {
  set: function set(color, opacity) {
    if (color.indexOf("#") === -1) {
      if (color.indexOf("rgb(") === 0) {
        var pars = color.indexOf(",");
        this.rgba[0] = parseInt(color.substr(4, pars));
        this.rgba[1] = parseInt(color.substr(pars + 1, color.indexOf(",", pars)));
        this.rgba[2] = parseInt(color.substr(color.indexOf(",", pars + 1) + 1, color.indexOf(")")));
        this.rgba[3] = 1;
      } else if (color.indexOf("rgba(") === 0) {
        var pars = color.indexOf(",");
        var repars = color.indexOf(",", pars + 1);
        this.rgba[0] = parseInt(color.substr(5, pars));
        this.rgba[1] = parseInt(color.substr(pars + 1, repars));
        this.rgba[2] = parseInt(color.substr(color.indexOf(",", pars + 1) + 1, color.indexOf(",", repars)));
        this.rgba[3] = parseFloat(color.substr(color.indexOf(",", repars + 1) + 1, color.indexOf(")")));
      }
    } else {
      color = color.replace("#", "");
      var size = color.length / 3;
      this.rgba[0] = parseInt(color.substring(size * 0, size * 1), 16) / 255;
      this.rgba[1] = parseInt(color.substring(size * 1, size * 2), 16) / 255;
      this.rgba[2] = parseInt(color.substring(size * 2, size * 3), 16) / 255;
      this.rgba[3] = FSS.Utils.isNumber(opacity) ? opacity : this.rgba[3];
    }

    return this;
  },
  //    hexify: function (channel) {
  //        var hex = Math.ceil(channel * 255).toString(16);
  //        if (hex.length === 1) {
  //            hex = '0' + hex;
  //        }
  //        return hex;
  //    },
  format: function format() {
    return "rgba(" + this.rgba[0] + "," + this.rgba[1] + "," + this.rgba[2] + "," + this.rgba[3] + ")"; //this.hex
    //        var r = this.hexify(this.rgba[0]);
    //        var g = this.hexify(this.rgba[1]);
    //        var b = this.hexify(this.rgba[2]);
    //        this.hex = '#' + r + g + b;
    //        return this.hex;
  }
};
/**
 * @class Object
 * @author Matthew Wagerfield
 */

FSS.Object = function () {
  this.position = FSS.Vector3.create();
};

FSS.Object.prototype = {
  setPosition: function setPosition(x, y, z) {
    FSS.Vector3.set(this.position, x, y, z);
    return this;
  }
};
/**
 * @class Light
 * @author Matthew Wagerfield
 */

FSS.Light = function (ambient, diffuse) {
  FSS.Object.call(this);
  this.ambient = new FSS.Color(ambient || "#FFFFFF");
  this.diffuse = new FSS.Color(diffuse || "#FFFFFF");
  this.ray = FSS.Vector3.create();
};

FSS.Light.prototype = Object.create(FSS.Object.prototype);
/**
 * @class Vertex
 * @author Matthew Wagerfield
 */

FSS.Vertex = function (x, y, z) {
  this.position = FSS.Vector3.create(x, y, z);
};

FSS.Vertex.prototype = {
  setPosition: function setPosition(x, y, z) {
    FSS.Vector3.set(this.position, x, y, z);
    return this;
  }
};
/**
 * @class Triangle
 * @author Matthew Wagerfield
 */

FSS.Triangle = function (a, b, c) {
  this.a = a || new FSS.Vertex();
  this.b = b || new FSS.Vertex();
  this.c = c || new FSS.Vertex();
  this.vertices = [this.a, this.b, this.c];
  this.u = FSS.Vector3.create();
  this.v = FSS.Vector3.create();
  this.centroid = FSS.Vector3.create();
  this.normal = FSS.Vector3.create();
  this.color = new FSS.Color();
  this.polygon = document.createElementNS(FSS.SVGNS, "polygon");
  this.polygon.setAttributeNS(null, "stroke-linejoin", "round");
  this.polygon.setAttributeNS(null, "stroke-miterlimit", "1");
  this.polygon.setAttributeNS(null, "stroke-width", "1");
  this.computeCentroid();
  this.computeNormal();
};

FSS.Triangle.prototype = {
  computeCentroid: function computeCentroid() {
    this.centroid[0] = this.a.position[0] + this.b.position[0] + this.c.position[0];
    this.centroid[1] = this.a.position[1] + this.b.position[1] + this.c.position[1];
    this.centroid[2] = this.a.position[2] + this.b.position[2] + this.c.position[2];
    FSS.Vector3.divideScalar(this.centroid, 3);
    return this;
  },
  computeNormal: function computeNormal() {
    FSS.Vector3.subtractVectors(this.u, this.b.position, this.a.position);
    FSS.Vector3.subtractVectors(this.v, this.c.position, this.a.position);
    FSS.Vector3.crossVectors(this.normal, this.u, this.v);
    FSS.Vector3.normalise(this.normal);
    return this;
  }
};
/**
 * @class Geometry
 * @author Matthew Wagerfield
 */

FSS.Geometry = function () {
  this.vertices = [];
  this.triangles = [];
  this.dirty = false;
};

FSS.Geometry.prototype = {
  update: function update() {
    if (this.dirty) {
      var t, triangle;

      for (t = this.triangles.length - 1; t >= 0; t--) {
        triangle = this.triangles[t];
        triangle.computeCentroid();
        triangle.computeNormal();
      }

      this.dirty = false;
    }

    return this;
  }
};
/**
 * @class Plane
 * @author Matthew Wagerfield
 */

FSS.Plane = function (width, height, segments, slices) {
  FSS.Geometry.call(this);
  this.width = width || 100;
  this.height = height || 100;
  this.segments = segments || 4;
  this.slices = slices || 4;
  this.segmentWidth = this.width / this.segments;
  this.sliceHeight = this.height / this.slices; // Cache Variables

  var x,
      y,
      v0,
      v1,
      v2,
      v3,
      vertex,
      triangle,
      vertices = [],
      offsetX = this.width * -0.5,
      offsetY = this.height * 0.5; // Add Vertices

  for (x = 0; x <= this.segments; x++) {
    vertices.push([]);

    for (y = 0; y <= this.slices; y++) {
      vertex = new FSS.Vertex(offsetX + x * this.segmentWidth, offsetY - y * this.sliceHeight);
      vertices[x].push(vertex);
      this.vertices.push(vertex);
    }
  } // Add Triangles


  var t0;
  var t1;

  for (x = 0; x < this.segments; x++) {
    for (y = 0; y < this.slices; y++) {
      v0 = vertices[x + 0][y + 0];
      v1 = vertices[x + 0][y + 1];
      v2 = vertices[x + 1][y + 0];
      v3 = vertices[x + 1][y + 1];
      t0 = new FSS.Triangle(v0, v1, v2);
      t1 = new FSS.Triangle(v2, v1, v3);
      this.triangles.push(t0, t1);
    }
  }
};

FSS.Plane.prototype = Object.create(FSS.Geometry.prototype);
/**
 * @class Material
 * @author Matthew Wagerfield
 */

FSS.Material = function (ambient, diffuse) {
  this.ambient = new FSS.Color(ambient || "rgba(68,68,68, 1)");
  this.diffuse = new FSS.Color(diffuse || "rgba(255,255,255, 1)");
  this.slave = new FSS.Color();
};
/**
 * @class Mesh
 * @author Matthew Wagerfield
 */


FSS.Mesh = function (geometry, material) {
  FSS.Object.call(this);
  this.geometry = geometry || new FSS.Geometry();
  this.material = material || new FSS.Material();
  this.side = FSS.FRONT;
  this.visible = true;
};

FSS.Mesh.prototype = Object.create(FSS.Object.prototype);

FSS.Mesh.prototype.update = function (lights, calculate) {
  var t, triangle, l, light, illuminance, light_count;
  light_count = lights.length; // Update Geometry

  this.geometry.update(); // Calculate the triangle colors

  if (calculate) {
    // Iterate through Triangles
    for (t = this.geometry.triangles.length - 1; t >= 0; t--) {
      triangle = this.geometry.triangles[t]; // Reset Triangle Color

      FSS.Vector4.set(triangle.color.rgba); // Iterate through Lights

      for (l = lights.length - 1; l >= 0; l--) {
        light = lights[l]; // Calculate Illuminance

        FSS.Vector3.subtractVectors(light.ray, light.position, triangle.centroid);
        FSS.Vector3.normalise(light.ray);
        illuminance = FSS.Vector3.dot(triangle.normal, light.ray);

        if (this.side === FSS.FRONT) {
          illuminance = Math.max(illuminance, 0);
        } else if (this.side === FSS.BACK) {
          illuminance = Math.abs(Math.min(illuminance, 0));
        } else if (this.side === FSS.DOUBLE) {
          illuminance = Math.max(Math.abs(illuminance), 0);
        } //               Calculate Ambient Light


        for (var i = 0; i < 3; i++) {
          this.material.slave.rgba[i] = 1 / light_count * this.material.ambient.rgba[i] * (1 / light_count * light.ambient.rgba[i]) / 128;

          if (i !== 3) {
            this.material.slave.rgba[i] = Math.round(this.material.slave.rgba[i]);
          }
        }
        /* 				Add the resultant values to the triangle color vector. Not required to factor illuminance because it is ambient light. */


        FSS.Vector4.add(triangle.color.rgba, this.material.slave.rgba); // Calculate Diffuse Light

        for (var i = 0; i < 3; i++) {
          this.material.slave.rgba[i] = 1 / light_count * this.material.diffuse.rgba[i] * (1 / light_count) * light.diffuse.rgba[i] / 128;

          if (i !== 3) {
            this.material.slave.rgba[i] = Math.round(this.material.slave.rgba[i]);
          }
        } //              FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.diffuse.rgba, light.diffuse.rgba);
        //              FSS.Vector4.multiplyScalar(this.material.slave.rgba, illuminance);


        for (var i = 0; i < 3; i++) {
          this.material.slave.rgba[i] = Math.round(this.material.slave.rgba[i] * illuminance);
        }

        FSS.Vector4.add(triangle.color.rgba, this.material.slave.rgba);
      } // Clamp & Format Color


      FSS.Vector4.clamp(triangle.color.rgba, 0, 255);
      triangle.color.rgba[3] = this.material.diffuse.rgba[3]; //Math.min(triangle.color.rgba[3], 1);
    }
  }

  return this;
};
/**
 * @class Scene
 * @author Matthew Wagerfield
 */


FSS.Scene = function () {
  this.meshes = [];
  this.lights = [];
};

FSS.Scene.prototype = {
  add: function add(object) {
    if (object instanceof FSS.Mesh && !~this.meshes.indexOf(object)) {
      this.meshes.push(object);
    } else if (object instanceof FSS.Light && !~this.lights.indexOf(object)) {
      this.lights.push(object);
    }

    return this;
  },
  remove: function remove(object) {
    if (object instanceof FSS.Mesh && ~this.meshes.indexOf(object)) {
      this.meshes.splice(this.meshes.indexOf(object), 1);
    } else if (object instanceof FSS.Light && ~this.lights.indexOf(object)) {
      this.lights.splice(this.lights.indexOf(object), 1);
    }

    return this;
  }
};
/**
 * @class Renderer
 * @author Matthew Wagerfield
 */

FSS.Renderer = function () {
  this.width = 0;
  this.height = 0;
  this.halfWidth = 0;
  this.halfHeight = 0;
};

FSS.Renderer.prototype = {
  setSize: function setSize(width, height) {
    if (this.width === width && this.height === height) return;
    this.width = width;
    this.height = height;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;
    return this;
  },
  clear: function clear() {
    return this;
  },
  render: function render(scene) {
    return this;
  }
};
/**
 * @class Canvas Renderer
 * @author Matthew Wagerfield
 */

FSS.CanvasRenderer = function () {
  FSS.Renderer.call(this);
  this.element = document.createElement("canvas");
  /* 	this.element.style.display = 'block'; */

  this.element.style.zIndex = "-100";
  this.element.style.pointerEvents = "none";
  this.context = this.element.getContext("2d");
  this.setSize(this.element.width, this.element.height);
};

FSS.CanvasRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.CanvasRenderer.prototype.setSize = function (width, height) {
  FSS.Renderer.prototype.setSize.call(this, width, height);
  this.element.width = width;
  this.element.height = height;
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  return this;
};

FSS.CanvasRenderer.prototype.clear = function () {
  FSS.Renderer.prototype.clear.call(this);
  this.context.clearRect(0, 0, this.width, this.height);
  return this;
};

var opacity = [];

FSS.CanvasRenderer.prototype.render = function (scene) {
  FSS.Renderer.prototype.render.call(this, scene);
  var m, mesh, t, triangle, color;
  var pi2 = 2 * Math.PI; // Clear Context

  this.clear(); // Configure Context

  this.context.lineJoin = "round";
  this.context.lineWidth = 0; // Update Meshes

  for (m = scene.meshes.length - 1; m >= 0; m--) {
    mesh = scene.meshes[m];

    if (typeof opacity[m] == "undefined") {
      opacity[m] = [];
    }

    if (mesh.visible) {
      mesh.update(scene.lights, true); // Render Triangles

      for (t = mesh.geometry.triangles.length - 1; t >= 0; t--) {
        var now = Date.now();

        if (typeof opacity[m][t] === "undefined") {
          opacity[m][t] = {};
          opacity[m][t].step = FSS.Vector3.create(Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0));
          opacity[m][t].time = Math.randomInRange(0, Math.PIM2);
          opacity[m][t].line = 0;
        } else {
          opacity[m][t].line = Math.sin(opacity[m][t].time + opacity[m][t].step[0] * now * (scene.LINE.fluctuationSpeed / 100)) * scene.LINE.fluctuationIntensity;
          opacity[m][t].vertex = Math.sin(opacity[m][t].time + opacity[m][t].step[0] * now * (scene.VERTEX.fluctuationSpeed / 100)) * scene.VERTEX.fluctuationIntensity;
          opacity[m][t].mesh = Math.sin(opacity[m][t].time + opacity[m][t].step[0] * now * (scene.MESH.fluctuationSpeed / 100)) * scene.MESH.fluctuationIntensity;
        }

        triangle = mesh.geometry.triangles[t];

        if (scene.MESH.draw !== false) {
          c = triangle.color.rgba;
          color = "rgba(" + c[0] + "," + c[1] + ", " + c[2] + "," + c[3] + ")";
          this.context.beginPath();
          this.context.moveTo(triangle.a.position[0], triangle.a.position[1]);
          this.context.lineTo(triangle.b.position[0], triangle.b.position[1]);
          this.context.lineTo(triangle.c.position[0], triangle.c.position[1]);
          this.context.closePath();
          this.context.fillStyle = color; //Color of triangle

          this.context.fill();
        }

        if (scene.LINE.draw !== false) {
          var c = new FSS.Color(scene.LINE.fill);
          c = c.rgba;
          c[3] = c[3] * (1 - opacity[m][t].line);
          c = "rgba(" + c[0] + "," + c[1] + ", " + c[2] + "," + c[3] + ")";
          this.context.beginPath();
          this.context.moveTo(triangle.a.position[0], triangle.a.position[1]);
          this.context.lineTo(triangle.b.position[0], triangle.b.position[1]);
          this.context.lineWidth = scene.LINE.thickness;
          this.context.fillStyle = c;
          this.context.fill();
          this.context.strokeStyle = c;
          this.context.stroke();
        }

        if (scene.VERTEX.draw !== false) {
          //                    var grd = this.context.createRadialGradient(triangle.a.position[0], triangle.a.position[1], scene.vertex.radius + 100, triangle.a.position[0], triangle.a.position[1], scene.vertex.radius + 105);
          // light blue
          //                    grd.addColorStop(0, '#8ED6FF');
          // dark blue
          //                    grd.addColorStop(1, '#004CB3');
          var c = new FSS.Color(scene.VERTEX.fill);
          c = c.rgba;
          c[3] = c[3] * (1 - opacity[m][t].vertex);
          c = "rgba(" + c[0] + "," + c[1] + ", " + c[2] + "," + c[3] + ")";
          var c1 = new FSS.Color(scene.VERTEX.strokeColor);
          c1 = c1.rgba;
          c1[3] = c1[3] * (1 - opacity[m][t].vertex);
          c1 = "rgba(" + c1[0] + "," + c1[1] + ", " + c1[2] + "," + c1[3] + ")";
          this.context.beginPath();
          this.context.arc(triangle.a.position[0], triangle.a.position[1], scene.VERTEX.radius, 0, pi2, false);
          this.context.fillStyle = c; //scene.VERTEX.fill;

          this.context.fill();
          this.context.lineWidth = scene.VERTEX.strokeWidth;
          this.context.strokeStyle = c1;
          this.context.stroke();
        }
      }
    }
  }

  return this;
};
/**
 * @class WebGL Renderer
 * @author Matthew Wagerfield
 */


FSS.WebGLRenderer = function () {
  FSS.Renderer.call(this);
  this.element = document.createElement("canvas");
  this.element.style.display = "block"; // Set initial vertex and light count

  this.vertices = null;
  this.lights = null; // Create parameters object

  var parameters = {
    preserveDrawingBuffer: false,
    premultipliedAlpha: true,
    antialias: true,
    stencil: true,
    alpha: true
  }; // Create and configure the gl context

  this.gl = this.getContext(this.element, parameters); // Set the internal support flag

  this.unsupported = !this.gl; // Setup renderer

  if (this.unsupported) {
    return "WebGL is not supported by your browser.";
  } else {
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.setSize(this.element.width, this.element.height);
  }
};

FSS.WebGLRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.WebGLRenderer.prototype.getContext = function (canvas, parameters) {
  var context = false;

  try {
    if (!(context = canvas.getContext("experimental-webgl", parameters))) {
      throw "Error creating WebGL context.";
    }
  } catch (error) {
    console.error(error);
  }

  return context;
};

FSS.WebGLRenderer.prototype.setSize = function (width, height) {
  FSS.Renderer.prototype.setSize.call(this, width, height);
  if (this.unsupported) return; // Set the size of the canvas element

  this.element.width = width;
  this.element.height = height; // Set the size of the gl viewport

  this.gl.viewport(0, 0, width, height);
  return this;
};

FSS.WebGLRenderer.prototype.clear = function () {
  FSS.Renderer.prototype.clear.call(this);
  if (this.unsupported) return;
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  return this;
};

FSS.WebGLRenderer.prototype.render = function (scene) {
  FSS.Renderer.prototype.render.call(this, scene);
  if (this.unsupported) return;
  var m,
      mesh,
      t,
      tl,
      triangle,
      l,
      light,
      attribute,
      uniform,
      buffer,
      data,
      location,
      update = false,
      lights = scene.lights.length,
      index,
      v,
      vl,
      vetex,
      vertices = 0; // Clear context

  this.clear(); // Build the shader program

  if (this.lights !== lights) {
    this.lights = lights;

    if (this.lights > 0) {
      this.buildProgram(lights);
    } else {
      return;
    }
  } // Update program


  if (!!this.program) {
    // Increment vertex counter
    for (m = scene.meshes.length - 1; m >= 0; m--) {
      mesh = scene.meshes[m];
      if (mesh.geometry.dirty) update = true;
      mesh.update(scene.lights, false);
      vertices += mesh.geometry.triangles.length * 3;
    } // Compare vertex counter


    if (update || this.vertices !== vertices) {
      this.vertices = vertices; // Build buffers

      for (attribute in this.program.attributes) {
        buffer = this.program.attributes[attribute];
        buffer.data = new FSS.Array(vertices * buffer.size); // Reset vertex index

        index = 0; // Update attribute buffer data

        var vertex = void 0;

        for (m = scene.meshes.length - 1; m >= 0; m--) {
          mesh = scene.meshes[m];

          for (t = 0, tl = mesh.geometry.triangles.length; t < tl; t++) {
            triangle = mesh.geometry.triangles[t];

            for (v = 0, vl = triangle.vertices.length; v < vl; v++) {
              vertex = triangle.vertices[v];

              switch (attribute) {
                case "side":
                  this.setBufferData(index, buffer, mesh.side);
                  break;

                case "position":
                  this.setBufferData(index, buffer, vertex.position);
                  break;

                case "centroid":
                  this.setBufferData(index, buffer, triangle.centroid);
                  break;

                case "normal":
                  this.setBufferData(index, buffer, triangle.normal);
                  break;

                case "ambient":
                  this.setBufferData(index, buffer, mesh.material.ambient.rgba);
                  break;

                case "diffuse":
                  this.setBufferData(index, buffer, mesh.material.diffuse.rgba);
                  break;
              }

              index++;
            }
          }
        } // Upload attribute buffer data


        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, buffer.data, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(buffer.location);
        this.gl.vertexAttribPointer(buffer.location, buffer.size, this.gl.FLOAT, false, 0, 0);
      }
    } // Build uniform buffers


    this.setBufferData(0, this.program.uniforms.resolution, [this.width, this.height, this.width]);

    for (l = lights - 1; l >= 0; l--) {
      light = scene.lights[l];
      this.setBufferData(l, this.program.uniforms.lightPosition, light.position);
      this.setBufferData(l, this.program.uniforms.lightAmbient, light.ambient.rgba);
      this.setBufferData(l, this.program.uniforms.lightDiffuse, light.diffuse.rgba);
    } // Update uniforms


    for (uniform in this.program.uniforms) {
      buffer = this.program.uniforms[uniform];
      location = buffer.location;
      data = buffer.data;

      switch (buffer.structure) {
        case "3f":
          this.gl.uniform3f(location, data[0], data[1], data[2]);
          break;

        case "3fv":
          this.gl.uniform3fv(location, data);
          break;

        case "4fv":
          this.gl.uniform4fv(location, data);
          break;
      }
    }
  } // Draw those lovely triangles


  this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices);
  return this;
};

FSS.WebGLRenderer.prototype.setBufferData = function (index, buffer, value) {
  if (FSS.Utils.isNumber(value)) {
    buffer.data[index * buffer.size] = value;
  } else {
    for (var i = value.length - 1; i >= 0; i--) {
      buffer.data[index * buffer.size + i] = value[i];
    }
  }
};
/**
 * Concepts taken from three.js WebGLRenderer
 * @see https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js
 */


FSS.WebGLRenderer.prototype.buildProgram = _s(function (lights) {
  _s();

  if (this.unsupported) return; // Create shader source

  var vs = FSS.WebGLRenderer.VS(lights);
  var fs = FSS.WebGLRenderer.FS(lights); // Derive the shader fingerprint

  var code = vs + fs; // Check if the program has already been compiled

  if (!!this.program && this.program.code === code) return; // Create the program and shaders

  var program = this.gl.createProgram();
  var vertexShader = this.buildShader(this.gl.VERTEX_SHADER, vs);
  var fragmentShader = this.buildShader(this.gl.FRAGMENT_SHADER, fs); // Attach an link the shader

  this.gl.attachShader(program, vertexShader);
  this.gl.attachShader(program, fragmentShader);
  this.gl.linkProgram(program); // Add error handling

  if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
    var error = this.gl.getError();
    var status = this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS);
    console.error("Could not initialise shader.\nVALIDATE_STATUS: " + status + "\nERROR: " + error);
    return null;
  } // Delete the shader


  this.gl.deleteShader(fragmentShader);
  this.gl.deleteShader(vertexShader); // Set the program code

  program.code = code; // Add the program attributes

  program.attributes = {
    side: this.buildBuffer(program, "attribute", "aSide", 1, "f"),
    position: this.buildBuffer(program, "attribute", "aPosition", 3, "v3"),
    centroid: this.buildBuffer(program, "attribute", "aCentroid", 3, "v3"),
    normal: this.buildBuffer(program, "attribute", "aNormal", 3, "v3"),
    ambient: this.buildBuffer(program, "attribute", "aAmbient", 4, "v4"),
    diffuse: this.buildBuffer(program, "attribute", "aDiffuse", 4, "v4")
  }; // Add the program uniforms

  program.uniforms = {
    resolution: this.buildBuffer(program, "uniform", "uResolution", 3, "3f", 1),
    lightPosition: this.buildBuffer(program, "uniform", "uLightPosition", 3, "3fv", lights),
    lightAmbient: this.buildBuffer(program, "uniform", "uLightAmbient", 4, "4fv", lights),
    lightDiffuse: this.buildBuffer(program, "uniform", "uLightDiffuse", 4, "4fv", lights)
  }; // Set the renderer program

  this.program = program; // Enable program

  this.gl.useProgram(this.program); // Return the program

  return program;
}, "ZdQBZ3rq7bWAAMQq6hlVCmYF0jM=", true);

FSS.WebGLRenderer.prototype.buildShader = function (type, source) {
  if (this.unsupported) return; // Create and compile shader

  var shader = this.gl.createShader(type);
  this.gl.shaderSource(shader, source);
  this.gl.compileShader(shader); // Add error handling

  if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
    console.error(this.gl.getShaderInfoLog(shader));
    return null;
  } // Return the shader


  return shader;
};

FSS.WebGLRenderer.prototype.buildBuffer = function (program, type, identifier, size, structure, count) {
  var buffer = {
    buffer: this.gl.createBuffer(),
    size: size,
    structure: structure,
    data: null
  }; // Set the location

  switch (type) {
    case "attribute":
      buffer.location = this.gl.getAttribLocation(program, identifier);
      break;

    case "uniform":
      buffer.location = this.gl.getUniformLocation(program, identifier);
      break;
  } // Create the buffer if count is provided


  if (!!count) {
    buffer.data = new FSS.Array(count * size);
  } // Return the buffer


  return buffer;
};

FSS.WebGLRenderer.VS = function (lights) {
  var shader = [// Precision
  "precision mediump float;", // Lights
  "#define LIGHTS " + lights, // Attributes
  "attribute float aSide;", "attribute vec3 aPosition;", "attribute vec3 aCentroid;", "attribute vec3 aNormal;", "attribute vec4 aAmbient;", "attribute vec4 aDiffuse;", // Uniforms
  "uniform vec3 uResolution;", "uniform vec3 uLightPosition[LIGHTS];", "uniform vec4 uLightAmbient[LIGHTS];", "uniform vec4 uLightDiffuse[LIGHTS];", // Varyings
  "varying vec4 vColor;", // Main
  "void main() {", // Create color
  "vColor = vec4(0.0);", // Calculate the vertex position
  "vec3 position = aPosition / uResolution * 2.0;", // Iterate through lights
  "for (int i = 0; i < LIGHTS; i++) {", "vec3 lightPosition = uLightPosition[i];", "vec4 lightAmbient = uLightAmbient[i];", "vec4 lightDiffuse = uLightDiffuse[i];", // Calculate illuminance
  "vec3 ray = normalize(lightPosition - aCentroid);", "float illuminance = dot(aNormal, ray);", "if (aSide == 0.0) {", "illuminance = max(illuminance, 0.0);", "} else if (aSide == 1.0) {", "illuminance = abs(min(illuminance, 0.0));", "} else if (aSide == 2.0) {", "illuminance = max(abs(illuminance), 0.0);", "}", // Calculate ambient light
  "vColor += aAmbient * lightAmbient;", // Calculate diffuse light
  "vColor += aDiffuse * lightDiffuse * illuminance;", "}", // Clamp color
  "vColor = clamp(vColor, 0.0, 1.0);", // Set gl_Position
  "gl_Position = vec4(position, 1.0);", "}" // Return the shader
  ].join("\n");
  return shader;
};

FSS.WebGLRenderer.FS = function (lights) {
  var shader = [// Precision
  "precision mediump float;", // Varyings
  "varying vec4 vColor;", // Main
  "void main() {", // Set gl_FragColor
  "gl_FragColor = vColor;", "}" // Return the shader
  ].join("\n");
  return shader;
};
/**
 * @class SVG Renderer
 * @author Matthew Wagerfield
 */


FSS.SVGRenderer = function () {
  FSS.Renderer.call(this);
  this.element = document.createElementNS(FSS.SVGNS, "svg");
  this.element.setAttribute("xmlns", FSS.SVGNS);
  this.element.setAttribute("version", "1.1");
  this.element.style.display = "block";
  this.setSize(300, 150);
};

FSS.SVGRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.SVGRenderer.prototype.setSize = function (width, height) {
  FSS.Renderer.prototype.setSize.call(this, width, height);
  this.element.setAttribute("width", width);
  this.element.setAttribute("height", height);
  return this;
};

FSS.SVGRenderer.prototype.clear = function () {
  FSS.Renderer.prototype.clear.call(this);

  for (var i = this.element.childNodes.length - 1; i >= 0; i--) {
    this.element.removeChild(this.element.childNodes[i]);
  }

  return this;
};

FSS.SVGRenderer.prototype.render = function (scene) {
  FSS.Renderer.prototype.render.call(this, scene);
  var m, mesh, t, triangle, points, style; // Update Meshes

  for (m = scene.meshes.length - 1; m >= 0; m--) {
    mesh = scene.meshes[m];

    if (mesh.visible) {
      mesh.update(scene.lights, true); // Render Triangles

      for (t = mesh.geometry.triangles.length - 1; t >= 0; t--) {
        triangle = mesh.geometry.triangles[t];

        if (triangle.polygon.parentNode !== this.element) {
          this.element.appendChild(triangle.polygon);
        }

        points = this.formatPoint(triangle.a) + " ";
        points += this.formatPoint(triangle.b) + " ";
        points += this.formatPoint(triangle.c);
        style = this.formatStyle(triangle.color.format());
        triangle.polygon.setAttributeNS(null, "points", points);
        triangle.polygon.setAttributeNS(null, "style", style);
      }
    }
  }

  return this;
};

FSS.SVGRenderer.prototype.formatPoint = function (vertex) {
  return vertex.position[0] + "," + vertex.position[1];
};

FSS.SVGRenderer.prototype.formatStyle = function (color) {
  var style = "fill:" + color + ";";
  style += "stroke:" + color + ";";
  return style;
};

/* harmony default export */ __webpack_exports__["default"] = (FSS);

/***/ }),

/***/ "./build/es/src/fss_worker.js":
/*!************************************!*\
  !*** ./build/es/src/fss_worker.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var reshow_runtime_es_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/typeof */ "./node_modules/reshow-runtime/es/helpers/typeof.js");
/* harmony import */ var reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reshow-runtime/es/helpers/objectSpread2 */ "./node_modules/reshow-runtime/es/helpers/objectSpread2.js");
/* harmony import */ var _fss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fss */ "./build/es/src/fss.js");




var FSS_Worker = function FSS_Worker(opt, element) {
  opt = opt || {};
  var MESH = {},
      LIGHT = [{}],
      VERTEX = {},
      LINE = {}; //------------------------------
  // Mesh Properties
  //------------------------------

  var mesh_default = {
    width: 1.2,
    height: 1.2,
    depth: 10,
    columns: undefined,
    columns_auto: true,
    rows: undefined,
    rows_auto: true,
    zoom: 1,
    xRange: 0.8,
    yRange: 0.1,
    zRange: 1.0,
    ambient: "rgba(85, 85, 85, 1)",
    diffuse: "rgba(255, 255, 255, 1)",
    background: "rgb(255, 255, 255)",
    speed: 0.0002,
    fluctuationSpeed: 0.5,
    fluctuationIntensity: 0,
    onRender: function onRender() {},
    floorPosition: false,
    draw: true
  };
  var vertex_default = {
    radius: 0,
    fill: "rgba(0, 0, 0, 0)",
    fluctuationSpeed: 0.5,
    fluctuationIntensity: 0,
    strokeWidth: 0,
    strokeColor: "rgba(0, 0, 0, 0)",
    draw: false
  };
  var line_default = {
    fill: "rgba(0, 0, 0, 0)",
    thickness: 1,
    fluctuationIntensity: 0,
    fluctuationSpeed: 0.5,
    draw: false
  }; //------------------------------
  // Light Properties
  //------------------------------

  var light_default = {
    count: 1,
    xyScalar: 1,
    zOffset: 100,
    ambient: "rgba(255,0,102, 1)",
    diffuse: "rgba(255,136,0, 1)",
    speed: 0.01,
    gravity: 1200,
    dampening: 0.95,
    minLimit: 10,
    maxLimit: null,
    minDistance: 20,
    maxDistance: 400,
    autopilot: false,
    draw: false,
    //show circle
    bounds: _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(),
    step: _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0))
  };
  var self = element;

  var createValues = function createValues(opt) {
    opt.mesh = opt.mesh || MESH;
    opt.lights = opt.lights || LIGHT;
    opt.vertex = opt.vertex || VERTEX;
    opt.line = opt.line || LINE;
    MESH = Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, mesh_default), MESH), opt.mesh);
    VERTEX = Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, vertex_default), VERTEX), opt.vertex);
    LINE = Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, line_default), LINE), opt.line);

    for (var i = 0; i < LIGHT.length; i++) {
      LIGHT[i] = Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(reshow_runtime_es_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, light_default), LIGHT[i]), opt.lights[i]);
    }

    MESH.columns_auto = typeof opt.mesh.columns === "undefined";
    MESH.rows_auto = typeof opt.mesh.rows === "undefined";
  };

  createValues(opt);
  var container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "0";
  container.style.right = "0";
  container.style.top = "0";
  container.style.bottom = "0";
  container.style.background = MESH.background;
  container.style.zIndex = "-100";
  container.setAttribute("class", "fss-output");
  self.insertBefore(container, null); //------------------------------
  // Render Properties
  //------------------------------

  var WEBGL = "webgl";
  var CANVAS = "canvas";
  var SVG = "svg";
  var RENDER = {
    renderer: CANVAS
  }; //------------------------------
  // UI Properties
  //------------------------------

  var UI = {
    show: true
  }; //------------------------------
  // Global Properties
  //------------------------------

  var now,
      start = Date.now();
  var center = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create();
  var attractor = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create();
  var renderer, scene, mesh, geometry, material;
  var gui, autopilotController; //------------------------------
  // Methods
  //------------------------------

  var resize = function resize(width, height) {
    if (typeof width == "undefined" || Object(reshow_runtime_es_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(width) === undefined) {
      width = self.width();
    }

    if (typeof height == "undefined" || Object(reshow_runtime_es_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(height) === undefined) {
      height = self.height();
    }

    var ratio_x = width / 1000;
    var ratio_y = height / 1000;
    var x_tiles = Math.round(ratio_x * 10) * MESH.zoom;
    var y_tiles = Math.round(ratio_y * 10) * MESH.zoom;
    MESH.columns = MESH.columns_auto === true ? x_tiles : MESH.columns;
    MESH.rows = MESH.rows_auto === true ? y_tiles : MESH.rows;
    renderer.setSize(width, height);
    _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
    createMesh();
  };

  function initialise() {
    createRenderer();
    createScene();
    createMesh();
    createLights();
    addEventListeners();
    resize(container.offsetWidth, container.offsetHeight);
    animate();
  }

  function createRenderer() {
    if (renderer) {
      /* output.removeChild(renderer.element); */
    }

    switch (RENDER.renderer) {
      case WEBGL:
        renderer = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].WebGLRenderer();
        break;

      case CANVAS:
        renderer = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].CanvasRenderer();
        break;

      case SVG:
        renderer = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].SVGRenderer();
        break;
    }

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.insertBefore(renderer.element, null);
    var style = window.getComputedStyle(self);

    if (style.getPropertyValue("position") == "static" || style.getPropertyValue("position").length == 0) {
      self.style.position = "relative";
    }
  }

  function createScene() {
    scene = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Scene();
    scene.VERTEX = VERTEX;
    scene.LINE = LINE;
    scene.MESH = MESH;
  }

  function createMesh() {
    scene.remove(mesh);
    renderer.clear();
    geometry = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.columns, MESH.rows);
    material = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Material(MESH.ambient, MESH.diffuse);
    mesh = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Mesh(geometry, material);
    scene.add(mesh); // Augment vertices for animation

    var v, vertex;

    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      vertex.anchor = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.floor(_fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.clone(vertex.position));
      vertex.step = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0));
      vertex.time = Math.randomInRange(0, Math.PIM2);
    }
  }

  function createLights() {
    var l, light;

    for (l = scene.lights.length - 1; l >= 0; l--) {
      light = scene.lights[l];
      scene.remove(light);
    }

    renderer.clear();

    for (l = 0; l < LIGHT.length; l++) {
      for (var u = 0; u < LIGHT[l].count; u++) {
        light = new _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Light(LIGHT[l].ambient, LIGHT[l].diffuse);
        scene.add(light); // Augment light for animation

        light.mass = Math.randomInRange(0.5, 1);
        light.velocity = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create();
        light.acceleration = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create();
        light.force = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(); // Ring SVG Circle

        light.ring = document.createElementNS(_fss__WEBPACK_IMPORTED_MODULE_2__["default"].SVGNS, "circle");
        light.ring.setAttributeNS(null, "stroke", light.ambient);
        light.ring.setAttributeNS(null, "stroke-width", "0.5");
        light.ring.setAttributeNS(null, "fill", "none");
        light.ring.setAttributeNS(null, "r", "10"); // Core SVG Circle

        light.core = document.createElementNS(_fss__WEBPACK_IMPORTED_MODULE_2__["default"].SVGNS, "circle");
        light.core.setAttributeNS(null, "fill", light.diffuseHex);
        light.core.setAttributeNS(null, "r", "4");
      }
    }
  }

  var isRun = opt.autoStart;

  function animate() {
    now = Date.now() - start;
    update();
    render();

    if (isRun) {
      // requestAnimationFrame(animate);
      setTimeout(animate, 150);
    }
  }

  function update() {
    var ox,
        oy,
        oz,
        l,
        light,
        v,
        vertex,
        offset = MESH.depth / 2;
    var light_index = 0;
    var render_vector = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.floor(_fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(renderer.halfWidth, renderer.halfHeight, 0)); // Animate Lights

    for (l = 0; l < LIGHT.length; l++) {
      for (var i = 0; i < LIGHT[l].count; i++) {
        light = scene.lights[light_index]; // Update Bounds

        _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.copy(LIGHT[l].bounds, center);
        _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.multiplyScalar(LIGHT[l].bounds, LIGHT[l].xyScalar); // Update Attractor

        _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.setZ(attractor, LIGHT[l].zOffset); // Overwrite the Attractor position

        if (LIGHT[l].autopilot && typeof LIGHT[l].position === "undefined") {
          ox = Math.sin(LIGHT[l].step[0] * now * LIGHT[l].speed);
          oy = Math.cos(LIGHT[l].step[1] * now * LIGHT[l].speed);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.set(attractor, LIGHT[l].bounds[0] * ox, LIGHT[l].bounds[1] * oy, LIGHT[l].zOffset);
        } // Reset the z position of the light


        _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.setZ(light.position, LIGHT[l].zOffset);

        if (typeof LIGHT[l].position !== "undefined") {
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.set(light.position);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.add(light.position, _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(LIGHT[l].position[0], LIGHT[l].position[1], LIGHT[l].zOffset));
        } else {
          // Calculate the force Luke!
          var D = Math.clamp(_fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.distanceSquared(light.position, attractor), LIGHT[l].minDistance, LIGHT[l].maxDistance);
          var F = LIGHT[l].gravity * light.mass / D;
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.subtractVectors(light.force, attractor, light.position);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.normalise(light.force);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.multiplyScalar(light.force, F); // Update the light position

          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.set(light.acceleration);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.add(light.acceleration, light.force);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.add(light.velocity, light.acceleration);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.multiplyScalar(light.velocity, LIGHT[l].dampening);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.limit(light.velocity, LIGHT[l].minLimit, LIGHT[l].maxLimit);
          _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.add(light.position, light.velocity);
        }

        light_index++;
      }
    } // Animate Vertices


    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
      oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
      oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
      vertex.position = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(MESH.xRange * geometry.segmentWidth * ox, MESH.yRange * geometry.sliceHeight * oy, MESH.zRange * offset * oz - offset);

      if (MESH.positionFloor === true) {
        vertex.position = _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.floor(vertex.position);
      }

      _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.add(vertex.position, vertex.anchor);
      _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.add(vertex.position, render_vector);
    } // Set the Geometry to dirty


    geometry.dirty = true;
  }

  function render() {
    renderer.render(scene); // Draw Lights

    if (LIGHT.draw) {
      var l, lx, ly, light;

      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        lx = light.position[0];
        ly = light.position[1];

        switch (RENDER.renderer) {
          case CANVAS:
            renderer.context.lineWidth = 0.5;
            renderer.context.beginPath();
            renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
            renderer.context.strokeStyle = light.ambient;
            renderer.context.stroke();
            renderer.context.beginPath();
            renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
            renderer.context.fillStyle = light.diffuse;
            renderer.context.fill();
            break;

          case SVG:
            /* 							lx += renderer.halfWidth; */

            /* 							ly = renderer.halfHeight - ly; */
            light.core.setAttributeNS(null, "fill", light.diffuse);
            light.core.setAttributeNS(null, "cx", lx);
            light.core.setAttributeNS(null, "cy", ly);
            renderer.element.appendChild(light.core);
            light.ring.setAttributeNS(null, "stroke", light.ambient);
            light.ring.setAttributeNS(null, "cx", lx);
            light.ring.setAttributeNS(null, "cy", ly);
            renderer.element.appendChild(light.ring);
            break;
        }
      }
    }

    MESH.onRender(scene, renderer.context);
  }

  function addEventListeners() {
    if (window.attachEvent) {
      window.addEventHandler = window.attachEvent;
    }

    window.addEventListener("resize", onWindowResize, false);
    self.addEventListener("click", onMouseClick, false);
    self.addEventListener("mousemove", onMouseMove, true);
  } //------------------------------
  // Callbacks
  //------------------------------


  function onMouseClick(event) {
    _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.set(attractor, event.x, event.y);
    /* FSS.Vector3.subtract(attractor, center); */

    LIGHT.autopilot = !LIGHT.autopilot;
  }

  function onMouseMove(event) {
    _fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.set(attractor, event.x, event.y);
    /* FSS.Vector3.subtract(attractor, center); */
  }

  function onWindowResize(event) {
    resize(self.offsetWidth, self.offsetHeight);
    render();
  } // Let there be light!


  initialise();
  return {
    start: function start() {
      if (!isRun) {
        isRun = true;
        animate();
      }
    },
    stop: function stop() {
      isRun = false;
    }
  };
};

_c = FSS_Worker;
/* harmony default export */ __webpack_exports__["default"] = (FSS_Worker);

var _c;

$RefreshReg$(_c, "FSS_Worker");

/***/ }),

/***/ "./build/es/src/index.js":
/*!*******************************!*\
  !*** ./build/es/src/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_organisms_GeometryAngle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/organisms/GeometryAngle */ "./build/es/ui/organisms/GeometryAngle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ui_organisms_GeometryAngle__WEBPACK_IMPORTED_MODULE_0__["default"]; });

// Default


/***/ }),

/***/ "./build/es/ui/organisms/GeometryAngle.js":
/*!************************************************!*\
  !*** ./build/es/ui/organisms/GeometryAngle.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_fss_worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/fss_worker */ "./build/es/src/fss_worker.js");
/* harmony import */ var _src_fss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/fss */ "./build/es/src/fss.js");
var _s = $RefreshSig$();




var defaultVertex = {
  // Radius of vertice circle.
  radius: 2,
  fill: "rgba(255, 255, 255, 0.3)",
  // Fluctuates opacity of vertex.
  fluctuationSpeed: 1,
  fluctuationIntensity: 0.5,
  strokeWidth: 0.001,
  strokeColor: "rgba(0, 104, 149, 1)",
  // Instead of setting alpha channel to zero
  // Set draw to false to avoid computing.
  draw: false
};
var defaultLine = {
  fill: "rgba(255, 255, 255, 0.1)",
  thickness: 0,
  fluctuationIntensity: 0,
  fluctuationSpeed: 0,
  draw: false
};
var defaultMesh = {
  width: 1.6,
  height: 1.5,
  // How far should the mesh vary into z-space.
  depth: 6,
  // Number of columns for the mesh.
  columns: undefined,
  columns_auto: true,
  // Number of rows for the mesh.
  rows: undefined,
  rows_auto: true,
  zoom: 1,
  xRange: 0.4,
  yRange: 0.2,
  zRange: 8.0,
  ambient: "rgba(45, 69, 90, 0.8)",
  diffuse: "rgba(149, 149, 149, 0.43)",
  background: "rgba(92, 121, 117, 1)",
  //main color
  // background: 'rgba(46, 213, 219, 1)'
  speed: 0.0008,
  fluctuationSpeed: 0.5,
  fluctuationIntensity: 0,
  onRender: function onRender() {},
  floorPosition: false,
  draw: true
};
var defaultLights = {
  // How many light sources belong to this light.
  count: 0,
  xyScalar: 0,
  // Position of light source.
  zOffset: 0,
  // ambient: 'rgba(0, 104, 149, 1)',
  // diffuse: 'rgba(0, 104, 149, 1)',
  speed: 0,
  gravity: 0,
  // Dampening of light's movements.
  dampening: 0,
  minLimit: 0,
  maxLimit: null,
  minDistance: 20,
  maxDistance: 400,
  autopilot: false,
  draw: false,
  //show circle
  bounds: _src_fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(),
  step: _src_fss__WEBPACK_IMPORTED_MODULE_2__["default"].Vector3.create(Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0), Math.randomInRange(0.2, 1.0))
};

var GeometryAngle = /*#__PURE__*/_s(Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(_c = _s(function (_ref, ref) {
  _s();

  var _ref$vertex = _ref.vertex,
      vertex = _ref$vertex === void 0 ? defaultVertex : _ref$vertex,
      _ref$line = _ref.line,
      line = _ref$line === void 0 ? defaultLine : _ref$line,
      _ref$mesh = _ref.mesh,
      mesh = _ref$mesh === void 0 ? defaultMesh : _ref$mesh,
      _ref$lights = _ref.lights,
      lights = _ref$lights === void 0 ? defaultLights : _ref$lights,
      _ref$autoStart = _ref.autoStart,
      autoStart = _ref$autoStart === void 0 ? true : _ref$autoStart;
  var lastDom = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var lastFss = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var expose = {
    start: function start() {
      return lastFss.current.start();
    },
    stop: function stop() {
      return lastFss.current.stop();
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"])(ref, function () {
    return expose;
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    lastFss.current = Object(_src_fss_worker__WEBPACK_IMPORTED_MODULE_1__["default"])({
      vertex: vertex,
      line: line,
      mesh: mesh,
      lights: lights,
      autoStart: autoStart
    }, lastDom.current);
    return function () {
      expose.stop();
    };
  }, [lastFss.current]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: lastDom,
    style: Styles.container
  });
}, "i+yduqpAg087ZxTlg/NeMmC3Zd0=")), "i+yduqpAg087ZxTlg/NeMmC3Zd0=");

_c2 = GeometryAngle;
GeometryAngle.displayName = "GeometryAngle";
/* harmony default export */ __webpack_exports__["default"] = (GeometryAngle);
var Styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

var _c, _c2;

$RefreshReg$(_c, "GeometryAngle$forwardRef");
$RefreshReg$(_c2, "GeometryAngle");

__react_refresh_utils__.registerExportsForReactRefresh(module);

if ( true && __react_refresh_utils__.isReactRefreshBoundary(module)) {
  module.hot.dispose(__react_refresh_utils__.createHotDisposeCallback(module));
  module.hot.accept(__react_refresh_utils__.createHotErrorHandler(module.i));

  if (!!module.hot.data && !!Object.keys(module.hot.data).length) {
    if (!module.hot.data.module || __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(module.hot.data.module, module)) {
      window.location.reload();
    }

    __react_refresh_utils__.enqueueUpdate();
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/reshow-app/webpack/refresh/runtime/utils.js */ "./node_modules/reshow-app/webpack/refresh/runtime/utils.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./build/es/ui/pages/index.js":
/*!************************************!*\
  !*** ./build/es/ui/pages/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, module) {/* harmony import */ var reshow_runtime_es_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reshow-runtime/es/helpers/classCallCheck */ "./node_modules/reshow-runtime/es/helpers/classCallCheck.js");
/* harmony import */ var reshow_runtime_es_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reshow-runtime/es/helpers/createClass */ "./node_modules/reshow-runtime/es/helpers/createClass.js");
/* harmony import */ var reshow_runtime_es_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reshow-runtime/es/helpers/assertThisInitialized */ "./node_modules/reshow-runtime/es/helpers/assertThisInitialized.js");
/* harmony import */ var reshow_runtime_es_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reshow-runtime/es/helpers/inherits */ "./node_modules/reshow-runtime/es/helpers/inherits.js");
/* harmony import */ var reshow_runtime_es_helpers_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reshow-runtime/es/helpers/createSuper */ "./node_modules/reshow-runtime/es/helpers/createSuper.js");
/* harmony import */ var reshow_runtime_es_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reshow-runtime/es/helpers/defineProperty */ "./node_modules/reshow-runtime/es/helpers/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/index */ "./build/es/src/index.js");







/**
 * Production please use
 * import GeometryAngle from 'organism-react-geometryangle';
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
        autoStart: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
        style: Styles.button,
        onClick: this.handleStart
      }, "start"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
        style: Styles.button,
        onClick: this.handleStop
      }, "stop"));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Index);
var Styles = {
  button: {
    position: "relative"
  }
};

__react_refresh_utils__.registerExportsForReactRefresh(module);

if ( true && __react_refresh_utils__.isReactRefreshBoundary(module)) {
  module.hot.dispose(__react_refresh_utils__.createHotDisposeCallback(module));
  module.hot.accept(__react_refresh_utils__.createHotErrorHandler(module.i));

  if (!!module.hot.data && !!Object.keys(module.hot.data).length) {
    if (!module.hot.data.module || __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(module.hot.data.module, module)) {
      window.location.reload();
    }

    __react_refresh_utils__.enqueueUpdate();
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/reshow-app/webpack/refresh/runtime/utils.js */ "./node_modules/reshow-app/webpack/refresh/runtime/utils.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 0:
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./node_modules/reshow-app/webpack/refresh/runtime/ReactRefreshEntry.js ./node_modules/reshow-app/webpack/refresh/runtime/ErrorOverlayEntry.js ./node_modules/reshow-app/webpack/refresh/runtime/BabelDetectComponent.js ./build/es/src/client ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/hill/git/react-atomic-organism/packages/organism-react-geometryangle/node_modules/reshow-app/webpack/refresh/runtime/ReactRefreshEntry.js */"./node_modules/reshow-app/webpack/refresh/runtime/ReactRefreshEntry.js");
__webpack_require__(/*! /Users/hill/git/react-atomic-organism/packages/organism-react-geometryangle/node_modules/reshow-app/webpack/refresh/runtime/ErrorOverlayEntry.js */"./node_modules/reshow-app/webpack/refresh/runtime/ErrorOverlayEntry.js");
__webpack_require__(/*! /Users/hill/git/react-atomic-organism/packages/organism-react-geometryangle/node_modules/reshow-app/webpack/refresh/runtime/BabelDetectComponent.js */"./node_modules/reshow-app/webpack/refresh/runtime/BabelDetectComponent.js");
module.exports = __webpack_require__(/*! ./build/es/src/client */"./build/es/src/client.js");


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map