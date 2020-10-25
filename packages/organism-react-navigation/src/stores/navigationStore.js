import { ReduceStore } from "reshow-flux";
import dispatcher from "../navigationDispatcher";
import get from "get-object-value";

class NavigatioStore extends ReduceStore {
  reduce(state, action) {
    const id = get(action, ["id"], "default");
    const settings = { ...get(state.get(id), null, {}), ...action.params };
    return state.set(id, settings);
  }
}

export default new NavigatioStore(dispatcher);
