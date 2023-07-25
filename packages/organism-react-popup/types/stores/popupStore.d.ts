export default store;
declare const store: {
    getMap: (arg0: import("reshow-flux/types/ImmutableStore").MapKeyType) => any;
    reset: () => Map<any, any>;
    getState: () => Map<any, any>;
    addListener: import("reshow-flux-base/types/createReducer").EmitterAddCall;
    removeListener: import("reshow-flux-base/types/createReducer").EmitterRemoveCall;
};
export const popupDispatch: import("reshow-flux-base/types/createReducer").DispatchType<import("reshow-flux/types/ImmutableStore").StateMap>;
export const SHOW_NEXT: "show_next";
export const SHOW_KEY: "shows";
export const NODE_KEY: "nodes";
import { Map } from "reshow-flux";
