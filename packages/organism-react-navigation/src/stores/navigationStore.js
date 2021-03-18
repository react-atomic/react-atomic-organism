import { ReduceStore } from "reshow-flux";
import dispatcher from "../navigationDispatcher";
import get from "get-object-value";

class NavigatioStore extends ReduceStore {
  reduce(state, action) {
    const type = get(action, ["type"], "default");
    const settings = { ...get(state.get(type), null, {}), ...action.params };
    return state.set(type, settings);
  }
}

export default new NavigatioStore(dispatcher);
