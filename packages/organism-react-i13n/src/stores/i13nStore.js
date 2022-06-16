import get from "get-object-value";
import { ajaxDispatch } from "organism-react-ajax";
import { ImmutableStore, mergeMap } from "reshow-flux";
import { BaseI13nReducer, i13nStoreReAssign } from "i13n";

const getDefaultActionCallback = (state) => (json, text) => {
  const iframe = get(state.get("iframe"));
  if (iframe) {
    iframe.appendHtml(text);
  }
};

class I13nStore extends BaseI13nReducer {
  sendBeacon(state, action) {
    const pvid = state.get("pvid");
    const src = state.get("src");
    const params = action.params;
    const query = get(params, ["query"], []);
    const callback = get(params, ["callback"], () => {
      // default cb for action
      return getDefaultActionCallback(state);
    });
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
    return state;
  }
}

const oI13n = new I13nStore();
const [store, i13nDispatch] = ImmutableStore(oI13n.reduce.bind(oI13n));
i13nStoreReAssign({
  oI13n,
  store,
  i13nDispatch,
  mergeMap,
});

export default store;
export { i13nDispatch };
