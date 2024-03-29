import get from "get-object-value";
import nonWorker from "non-worker";
import ini from "parse-ini-string";
import { nest } from "object-nested";
import { KEYS } from "reshow-constant";
import superagent from "superagent";

const arrWs = {};
const arrReq = {};

const getJson = (text) => {
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {}
  return json || {};
};

const oNonWorker = new nonWorker((e) => {
  const data = get(e, ["data"]);
  switch (data.type) {
    case "initWs":
      initWs(data.params.url)(data.params);
      break;
    case "closeWs":
      closeWs(data.params.url);
      break;
    case "ajaxGet":
      ajaxGet(data);
      break;
    case "ajaxPost":
      ajaxPost(data);
      break;
  }
});
const post = (payload) => {
  const strWcb = get(payload, ["params", "workerCallback"]);
  const parseIni = get(payload, ["params", "ini"]);
  const text = get(payload, ["params", "text"]);
  payload.params.json = parseIni ? nest(ini(text), "_") : getJson(text);
  if (strWcb) {
    const wcb = eval("(" + strWcb + ")");
    payload = wcb(payload);
  }
  oNonWorker.post.call(this, payload);
};

export default oNonWorker;

const cookParams = (action, callReq) => {
  const params = get(action, ["params"], {});
  const id = params.id;
  if (id) {
    if (arrReq[id]) {
      arrReq[id].abort();
    }
    arrReq[id] = callReq;
  }
  const cookHeaders = {
    ...get(params, ["globalHeaders"], {}),
    ...get(params, ["headers"], {}),
    Accept: get(params, ["accept"], "application/json"),
  };
  params.cookHeaders = cookHeaders;
  const superagentParams = params.superagent || {};
  const syncKeys = ["responseType"];
  syncKeys.forEach((key) => {
    if (params[key]) {
      superagentParams[key] = params[key];
    }
  });
  KEYS(superagentParams).forEach((key) => {
    callReq = callReq[key].apply(callReq, superagentParams[key]);
  });
  return params;
};

const ajaxGet = (action) => {
  const url = get(action, ["params", "url"]);
  let callReq = superagent.get(url);
  const { query, cookHeaders, id } = cookParams(action, callReq);
  callReq
    .query(query)
    .set(cookHeaders)
    .end((_err, res) => {
      if (res) {
        if (arrReq[id]) {
          delete arrWs[id];
        }
        const { error, req, text, xhr, ...response } = res;
        action.params = {
          ...action.params,
          text,
          response,
        };
        post(action);
      }
    });
};

const ajaxPost = (action) => {
  const url = get(action, ["params", "url"]);
  let callReq;
  switch (get(action, ["params", "method"])) {
    case "delete":
      callReq = superagent.del(url);
      break;
    case "head":
      callReq = superagent.head(url);
      break;
    case "patch":
      callReq = superagent.patch(url);
      break;
    case "put":
      callReq = superagent.put(url);
      break;
    default:
      callReq = superagent.post(url);
      break;
  }
  const { id, query, isSendJson, cookHeaders } = cookParams(action, callReq);
  let isSend = false;
  if (isSendJson) {
    isSend = true;
  } else {
    if (null == isSendJson && query) {
      KEYS(query).every((key) => {
        if ("object" !== typeof query[key]) {
          return true;
        }
        isSend = true;
        return false;
      });
    }
  }
  if (!isSend) {
    callReq = callReq.type("form");
  }
  callReq
    .send(query)
    .set(cookHeaders)
    .end((_err, res) => {
      if (res) {
        if (arrReq[id]) {
          delete arrWs[id];
        }
        const { error, req, text, xhr, ...response } = res;
        action.params = {
          ...action.params,
          text,
          response,
        };
        post(action);
      }
    });
};

const closeWs = (url) => {
  if (arrWs[url]) {
    arrWs[url].close();
    delete arrWs[url];
  }
  return !arrWs[url];
};

class WebSocketHelper {
  isWsConnect = false;

  constructor(url, params) {
    this.ws = null;
    this.pingTimeout = null;
    this.url = url;
    this.params = params;
    this.open();
  }

  open() {
    if (this.isWsConnect) {
      return;
    }
    const url = this.url;
    const params = this.params;

    /**
     * Can't try catch
     * WebSocket connection to 'xxx' failed
     * use onerror instead.
     */
    const ws = new WebSocket(url);
    this.ws = ws;
    ws.onopen = () => {
      this.isWsConnect = true;
      this.ping();
      const { messages } = params;
      if (get(messages, ["length"])) {
        messages.forEach((m) => ws.send(JSON.stringify(m)));
      }
    };
    ws.onerror = () => {
      this.isWsConnect = false;
      this.ping();
    };
    ws.onmessage = (e) => {
      switch (e.data) {
        case "pong":
          break;
        default:
          post({
            type: "ws",
            params: {
              text: e.data,
              url,
            },
          });
          break;
      }
    };
    ws.onclose = () => {
      this.isWsConnect = false;
      console.warn("WS close.", url);
    };
  }

  close() {
    this.ws.close();
    this.clearPing();
  }

  clearPing() {
    if (this.pingTimeout) {
      clearTimeout(this.pingTimeout);
      this.pingTimeout = null;
    }
  }

  ping() {
    this.clearPing();
    this.pingTimeout = setTimeout(() => {
      if (!this.isWsConnect) {
        console.warn("Try restore ws connection.", this.url);
        this.open();
      } else {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
      this.ping();
    }, 15000);
  }
}

const initWs = (url) => (params) => {
  const create = () => {
    arrWs[url] = new WebSocketHelper(url, params);
  };

  if (!arrWs[url]) {
    create(url);
  }
};
