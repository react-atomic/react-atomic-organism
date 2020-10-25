require("setimmediate");

import { Map } from "immutable";
import get from "get-object-value";
import { ajaxDispatch } from "organism-react-ajax";

import { i13nDispatcher, BaseI13nStore } from "i13n";

const getDefaultActionCallback = (state) => (json, text) => {
  const iframe = state.get("iframe");
  if (iframe) {
    iframe.appendHtml(text);
  }
};

class I13nStore extends BaseI13nStore {
  getInitialState() {
    return Map();
  }

  sendBeacon(state, action) {
    const pvid = state.get("pvid");
    const src = state.get("src");
    const params = action.params;
    const query = get(params, ["query"], []);
    const callback = get(params, ["callback"], () => {
      // default cb for action
      return getDefaultActionCallback(state);
    });
    setImmediate(() => {
      ajaxDispatch({
        type: "ajaxPost",
        params: {
          url: src + action.type,
          query: {
            pvid: pvid,
            url: document.URL,
            params: get(params, ["I13N"]),
            ...query,
          },
          callback,
          disableProgress: true,
        },
      });
    });
    return state;
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new I13nStore(i13nDispatcher);
export default instance;
