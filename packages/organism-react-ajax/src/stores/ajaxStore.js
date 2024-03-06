// @ts-check

import { mergeMap, ImmutableStore, Map } from "reshow-flux";
import get, { getDefault } from "get-object-value";
import set from "set-object-value";
import smoothScrollTo from "smooth-scroll-to";
import getRandomId, { getTimestamp, getSN } from "get-random-id";
import callfunc from "call-func";
import { KEYS, REAL_TIME_URL, REAL_TIME_DATA_KEY } from "reshow-constant";

/**
 * @typedef {import("reshow-flux-base").ActionObject} ActionObject
 * @typedef {import("reshow-flux").StateMap} StateMap
 */

const empty = () => {};
const Callbacks = [];
let wsAuth = Map();
let gWorker;
/**
 * @type {null|boolean}
 */
let fakeWorker = false;
let isWorkerReady;

/**
 * @param {any} s
 * @returns {boolean}
 */
const hasUrl = (s) => !!s && "#" !== s && "?" !== s;

/**
 * @param {any} worker
 */
const initAjaxWorkerEvent = (worker) => {
  worker.addEventListener(
    "message",
    /**
     * @param {MessageEvent} e
     */
    (e) => {
      const sourceType = get(e, ["data", "type"]);
      switch (sourceType) {
        case "ready":
          // fakeWorker will not run this
          gWorker = worker;
          isWorkerReady = true;
          break;
        default:
          const nextState = {
            ...e.data,
            sourceType,
            type: "callback",
          };
          ajaxDispatch(nextState);
          break;
      }
    }
  );
};

/**
 * @param {function} cb
 */
const initFakeWorker = (cb) => {
  import("../worker").then((workerObject) => {
    fakeWorker = getDefault(workerObject);
    initAjaxWorkerEvent(fakeWorker);
    if (!gWorker) {
      gWorker = fakeWorker;
    }
    isWorkerReady = true;
    cb();
  });
};

/**
 * @param {any} state
 * @param {any} action
 * @param {string} url
 */
const handleNewUrl = (state, action, url) => {
  const prevUrl = state.get("currentLocation");
  if (prevUrl !== url) {
    const onUrlChange = state.get("onUrlChange");
    state = mergeMap(
      state.delete("themePath").set("currentLocation", url),
      callfunc(onUrlChange, [url, { state, action }])
    );
  }
  return state;
};

/**
 * @param {any} state
 * @param {any} action
 * @param {any} json
 * @param {any} response
 */
const getCallback = (state, action, json, response) => {
  const params = get(action, ["params"], {});
  let callback;
  if (get(json, ["data", "errors"]) || !get(response, ["ok"])) {
    if (params.errorCallback) {
      callback = Callbacks[params.errorCallback];
      delete Callbacks[params.errorCallback];
    }
  }
  const debugs = json.debugs;
  if (debugs) {
    let bFail = false;
    import("../lib/dlog").then((dlog) => {
      const DLOG = getDefault(dlog);
      const oLog = new DLOG({ level: "trace" });
      debugs.forEach(
        /**
         * @param {[string, string]} v
         */
        (v) => {
          const dump = get(oLog, [v[0]], () => oLog.info);
          dump.call(oLog, v[1]);
        }
      );
    });
    debugs.forEach(
      /**
       * @param {[string, string]} v
       */
      (v) => {
        if ("error" === v[1]) {
          bFail = true;
        }
      }
    );
    if (bFail) {
      return empty;
    }
  }
  if (!callback) {
    if (params.callback) {
      callback = Callbacks[params.callback];
      delete Callbacks[params.callback];
    } else {
      callback = state.get("callback");
    }
  }
  return callback;
};

/**
 * @typedef {object} GetRawUrlProps
 * @property {string} [url]
 * @property {string} [path]
 * @property {string} [baseUrl]
 */

/**
 * @param {GetRawUrlProps} props
 * @returns{string}
 */
const getRawUrl = (props) => {
  let { url, path, baseUrl } = props || {};
  if (!hasUrl(url)) {
    if (path) {
      url = (baseUrl || store.getState().get("baseUrl") || "") + path;
    } else {
      url = "#";
    }
  }
  return /** @type string*/ (url);
};

/**
 * @param {any} params
 * @param {string} ajaxUrl
 * @param {any} globalHeaders
 * @returns {string}
 */
const cookAjaxUrl = (params, ajaxUrl, globalHeaders) => {
  if (globalHeaders && !get(params, ["ignoreGlobalHeaders"])) {
    if (globalHeaders.toJS) {
      params.globalHeaders = globalHeaders.toJS();
    } else {
      console.error("Global headers should be a map.", globalHeaders);
    }
  }
  const urls = ajaxUrl.split("#");
  const query = get(params, ["query"], {});
  if (urls[1]) {
    query["--hashState"] = urls[1];
  }

  // <!-- Clean key for fixed superagent error
  if (query) {
    KEYS(query).forEach((key) => {
      if ("undefined" === typeof query[key]) {
        delete query[key];
      }
    });
    params.query = query;
  }
  // -->

  return urls[0];
};

class handleAjax {
  /**
   * @type {ActionObject[]}
   */
  queue = [];

  /**
   * @param {ActionObject} data
   */
  worker(data) {
    if (isWorkerReady && fakeWorker) {
      const disableWebWorker = get(data, [
        "action",
        "params",
        "disableWebWorker",
      ]);
      const run = disableWebWorker ? fakeWorker : gWorker;
      run.postMessage(data);
    } else {
      if (false === fakeWorker) {
        initFakeWorker(() => {
          this.queue.forEach((d) => this.worker(d));
        });
        fakeWorker = null;
      }
      this.queue.push(data);
    }
  }

  /**
   * @param {StateMap} state
   */
  start(state) {
    return state.set("isRunning", 1);
  }

  done() {
    // update progress should run very end.
    setTimeout(() => ajaxDispatch({ isRunning: 0 }), 500);
  }

  /**
   * @param {ActionObject} action
   * @param {string} url
   * @returns {ActionObject}
   */
  storeCallback(action, url) {
    set(action, ["params", "url"], url);
    const cb = get(action, ["params", "callback"]);
    if (cb) {
      const cbKey = getSN("cb");
      Callbacks[cbKey] = cb;
      /** @type object*/ (action.params).callback = cbKey;
    }
    const err = get(action, ["params", "errorCallback"]);
    if (err) {
      const errCbKey = getSN("err");
      Callbacks[errCbKey] = err;
      /** @type object*/ (action.params).errorCallback = errCbKey;
    }
    const wcb = get(action, ["params", "workerCallback"]);
    if (wcb) {
      /** @type object*/ (action.params).workerCallback = wcb + "";
    }
    return action;
  }

  /**
   * @param {string} key
   * @param {any} data
   */
  setWsAuth(key, data) {
    wsAuth = wsAuth.set(key, data);
  }

  /**
   * @param {string} key
   * @returns{any}
   */
  getWsAuth(key) {
    if (!key) {
      return wsAuth.toJS();
    } else {
      return wsAuth.get(key).toJS();
    }
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  initWs(state, action) {
    const params = get(action, ["params"], {});
    if (params.url) {
      this.worker({ params, type: "initWs" });
    }
    return state;
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  closeWs(state, action) {
    const url = get(action, ["params", "url"]);
    if (url) {
      this.worker({ params: { url }, type: "closeWs" });
    }
    return state;
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  ajaxGet(state, action) {
    const params = /** @type any */ (action.params);
    const rawUrl = getRawUrl(params);
    if (params.updateUrl && store.urlDispatch && rawUrl !== document.URL) {
      store.urlDispatch({ type: "url", url: rawUrl });
    }
    if (params.disableAjax) {
      return this.applyCallback(state, {
        type: "callback",
        params: {
          json: handleNewUrl(state, action, rawUrl),
          disableAjax: params.disableAjax,
          scrollBack: params.scrollBack,
        },
      });
    }
    if (!params.disableProgress) {
      state = this.start(state);
    }
    const ajaxUrl = cookAjaxUrl(params, rawUrl, state.get("globalHeaders"));
    if (!params.query) {
      params.query = {};
    }
    if (!params.disableCacheBusting) {
      params.query["--r"] = params.randomCacheBusting
        ? getRandomId()
        : Math.floor(getTimestamp() / 60000);
    } else {
      params.query["--r"] = state.get("staticVersion");
    }
    this.worker(this.storeCallback(action, ajaxUrl));
    return state;
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  ajaxPost(state, action) {
    const params = /** @type any */ (action.params);
    if (!params.disableProgress) {
      state = this.start(state);
    }
    const rawUrl = getRawUrl(params);
    const ajaxUrl = cookAjaxUrl(params, rawUrl, state.get("globalHeaders"));
    this.worker(this.storeCallback(action, ajaxUrl));
    return state;
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  applyCallback(state, action) {
    const sourceType = get(action, ["sourceType"]);
    const params = get(action, ["params"], {});
    if (!params.disableProgress) {
      this.done();
    }
    const response = get(params, ["response"]);
    const text = get(params, ["text"]);
    const json = get(params, ["json"], {});
    const callback = getCallback(state, action, json, response);
    const url = get(params, ["url"]);
    let isRedirect = null;
    switch (json.type) {
      case "ws-auth":
        this.setWsAuth(url, json);
        break;
      default:
        if ("ws" === sourceType) {
          json[REAL_TIME_URL] = url;
          json[REAL_TIME_DATA_KEY] = json;
        }
        isRedirect = callfunc(callback, [json, text, response]);
        break;
    }
    if (false !== isRedirect) {
      const loc = json.clientRedirectTo;
      if (loc) {
        switch (json.clientRedirectType) {
          case "href":
            location.href = loc;
            break;
          case "replace":
          default:
            location.replace(loc);
            break;
        }
      }
    }
    if (
      (params.disableAjax && false !== params.scrollBack) ||
      (params.updateUrl && false !== params.scrollBack) ||
      params.scrollBack
    ) {
      smoothScrollTo(0);
    }
    return state.set("currentLocation", json.currentLocation);
  }

  /**
   * @param {StateMap} state
   * @param {ActionObject} action
   */
  handleUrlChange(state, action) {
    const url = get(action, ["params", "url"], document.URL);
    /**
     * "!! Important !!" don't modify states of toggleBfChange and bfApplyUrl in other way,
     * such as ajaxGet.
     * Because this state should only trigger with bfchange.
     */
    return this.applyCallback(
      state
        .set("toggleBfChange", !state.get("toggleBfChange"))
        .set("bfApplyUrl", url),
      {
        type: "callback",
        params: { json: handleNewUrl(state, action, url) },
      }
    );
  }
}

const oAjax = new handleAjax();

/**
 * @typedef {Object} AjaxStore
 * @property {function} urlDispatch
 */

/**
 * @template [StateType=StateMap]
 * @template [ActionType=ActionObject|object]
 * @param {import("reshow-flux").ReducerTypeWithMap<StateType, ActionType>} reduce
 * @param {import("reshow-flux-base").InitStateType<StateType>} initState
 * @returns {[store & AjaxStore, dispatch]}
 */
const AjaxStore = (reduce, initState) => {
  const [store, dispatch] = ImmutableStore(reduce, initState);
  return [{ ...store, urlDispatch: () => {} }, dispatch];
};

const [store, ajaxDispatch] = AjaxStore(
  (state, action) => {
    const type = action.type;
    switch (type) {
      case "ws/init":
        return oAjax.initWs(state, action);
      case "ws/close":
        return oAjax.closeWs(state, action);
      case "ajaxGet":
        return oAjax.ajaxGet(state, action);
      case "ajaxDelete":
      case "ajaxHead":
      case "ajaxPatch":
      case "ajaxPut":
        set(action, ["params", "method"], type.substring(4).toLowerCase());
      case "ajaxPost":
        return oAjax.ajaxPost(state, action);
      case "urlChange":
        return oAjax.handleUrlChange(state, action);
      case "callback":
        return oAjax.applyCallback(state, action);
      default:
        if (KEYS(action).length) {
          return mergeMap(state, action);
        } else {
          return state;
        }
    }
  },
  () => {
    /**
     * @param {string} url
     */
    const onUrlChange = (url) => {
      ajaxDispatch({
        type: "ajaxGet",
        params: {
          url,
          scrollBack: true,
        },
      });
    };
    return /**@type StateMap*/ (Map({ onUrlChange }));
  }
);

export default store;
export { initAjaxWorkerEvent, ajaxDispatch, getRawUrl, hasUrl };
