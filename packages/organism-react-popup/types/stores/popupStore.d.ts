export type ActionObject = import('reshow-flux-base').ActionObject;
export type StateMap = import('reshow-flux').StateMap;
declare const SHOW_NEXT = "show_next";
declare const SHOW_KEY = "shows";
declare const NODE_KEY = "nodes";
declare const store: import("reshow-flux/types/ImmutableStore").ImmutableStoreObject<any, import("reshow-flux-base/types/type").ActionObject>, popupDispatch: import("reshow-flux-base/types/createReducer").DispatchFunction<any, import("reshow-flux-base/types/type").ActionObject>;
export default store;
export { popupDispatch, SHOW_NEXT, SHOW_KEY, NODE_KEY };
