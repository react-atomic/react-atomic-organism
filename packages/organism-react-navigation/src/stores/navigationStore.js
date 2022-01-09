import { ImmutableStore } from "reshow-flux";
import get from "get-object-value";

const [store, navigationDispatch] = ImmutableStore((state, action) => {
  const type = get(action, ["type"], "default");
  const settings = { ...get(state.get(type), null, {}), ...action.params };
  return state.set(type, settings);
});

export default store;

export { navigationDispatch };
