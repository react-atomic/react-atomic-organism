import "es6-promise/auto"; // [RESHOW] Need keep if use "new Promise"
import "setimmediate";
import { mergeMap, ImmutableStore, Map } from "reshow-flux";
import get, { getDefault } from "get-object-value";
import set from "set-object-value";
import smoothScrollTo from "smooth-scroll-to";
import getRandomId, { getTimestamp } from "get-random-id";
import callfunc from "call-func";
import { KEYS } from "reshow-constant";

const empty = () => {};
const Callbacks = [];
let wsAuth = Map();
let gWorker;
let fakeWorker = false;
let isWorkerReady;
let cbIndex = 0;

const initAjaxWorkerEvent = (worker) => {
  worker.addEventListener("message", (e) => {
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
  });
};

const initFakeWorker = (cb) => {
  import("../../src/worker").then((workerObject) => {
    fakeWorker = getDefault(workerObject);
    initAjaxWorkerEvent(fakeWorker);
    if (!gWorker) {
      gWorker = fakeWorker;
    }
    isWorkerReady = true;
    cb();
  });
};

const handleUseNewUrl = (state, action, url) => {
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

const getRawUrl = (params) => {
  let { url, path } = get(params, null, {});
  if (!url) {
    if (path) {
      let baseUrl = store.getState().get("baseUrl");
      if (!baseUrl) {
        baseUrl = "";
      }
      url = baseUrl + path;
    } else {
      url = "#";
    }
  }
  return url;
};

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
      dlog = getDefault(dlog);
      const oLog = new dlog({ level: "trace" });
      debugs.forEach((v) => {
        const dump = get(oLog, [v[0]], () => oLog.info);
        dump.call(oLog, v[1]);
      });
    });
    debugs.forEach((v) => {
      if ("error" === v[1]) {
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
      callback = state.get("callback");
    }
  }
  return callback;
};

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
  queue = [];

  worker(data) {
    if (isWorkerReady && fakeWorker) {
      setImmediate(() => {
        const disableWebWorker = get(data, [
          "action",
          "params",
          "disableWebWorker",
        ]);
        const run = disableWebWorker ? fakeWorker : gWorker;
        run.postMessage(data);
      });
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

  start(state) {
    return state.set("isRunning", 1);
  }

  done() {
    // update progress should run very end.
    setTimeout(() => ajaxDispatch({ isRunning: 0 }), 500);
  }

  storeCallback(action) {
    const cb = get(action, ["params", "callback"]);
    if (cb) {
      const cbKey = "cb" + cbIndex;
      Callbacks[cbKey] = cb;
      action.params.callback = cbKey;
      cbIndex++;
    }
    const err = get(action, ["params", "errorCallback"]);
    if (err) {
      const errCbKey = "err" + cbIndex;
      Callbacks[errCbKey] = err;
      action.params.errorCallback = errCbKey;
      cbIndex++;
    }
    const wcb = get(action, ["params", "workerCallback"]);
    if (wcb) {
      action.params.workerCallback = wcb + "";
    }
    return action;
  }

  setWsAuth(key, data) {
    wsAuth = wsAuth.set(key, data);
  }

  getWsAuth(key) {
    if (!key) {
      return wsAuth.toJS();
    } else {
      return wsAuth.get(key).toJS();
    }
  }

  initWs(state, action) {
    const params = get(action, ["params"], {});
    const { url } = params;
    if (url) {
      this.worker({ params, ws: url, type: "initWs" });
    }
    return state;
  }

  closeWs(state, action) {
    const url = get(action, ["params", "url"]);
    if (url) {
      this.worker({ ws: url, type: "closeWs" });
    }
    return state;
  }

  ajaxGet(state, action) {
    const params = action.params;
    const rawUrl = getRawUrl(params);
    if (params.updateUrl && store.urlDispatch && rawUrl !== document.URL) {
      store.urlDispatch({ type: "url", url: rawUrl });
    }
    if (params.disableAjax) {
      return this.applyCallback(state, {
        params: {
          json: handleUseNewUrl(state, action, rawUrl),
          disableAjax: params.disableAjax,
        },
      });
    }
    if (!params.disableProgress) {
      state = this.start(state);
    }
    setImmediate(() => {
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
      this.worker({
        type: "ajaxGet",
        url: ajaxUrl,
        action: this.storeCallback(action),
      });
    });
    return state;
  }

  ajaxPost(state, action) {
    const params = action.params;
    if (!params.disableProgress) {
      state = this.start(state);
    }
    const rawUrl = getRawUrl(params);
    const ajaxUrl = cookAjaxUrl(params, rawUrl, state.get("globalHeaders"));
    this.worker({
      type: "ajaxPost",
      url: ajaxUrl,
      action: this.storeCallback(action),
    });
    return state;
  }

  applyCallback(state, action) {
    const params = get(action, ["params"], {});
    if (!params.disableProgress) {
      this.done();
    }
    const sourceType = get(params, ["sourceType"]);
    const response = get(params, ["response"]);
    const text = get(params, ["text"]);
    const json = get(params, ["json"], {});
    const callback = getCallback(state, action, json, response);
    const type = get(json, ["type"]);
    let isRedirect = null;
    const url = get(params, ["url"]);
    switch (type) {
      case "ws-auth":
        this.setWsAuth(url, json);
        break;
      default:
        if ("ws" === sourceType) {
          json["--realTimeData--"] = json;
          json["--realTimeUrl--"] = url;
        }
        isRedirect = callfunc(callback, [json, text, response]);
        break;
    }
    if (false !== isRedirect) {
      const loc = get(json, ["clientRedirectTo"]);
      if (loc) {
        switch (get(json, ["clientRedirectType"])) {
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
      { params: { json: handleUseNewUrl(state, action, url) } }
    );
  }
}

const oAjax = new handleAjax();

const [store, ajaxDispatch] = ImmutableStore(
  (state, action) => {
    switch (action.type) {
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
        set(action, ["params", "method"], action.type.substr(4).toLowerCase());
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
    const onUrlChange = (url) => {
      ajaxDispatch({
        type: "ajaxGet",
        params: {
          url,
          scrollBack: true,
        },
      });
    };
    return Map({ onUrlChange });
  }
);

export default store;
export { initAjaxWorkerEvent, ajaxDispatch, getRawUrl };
