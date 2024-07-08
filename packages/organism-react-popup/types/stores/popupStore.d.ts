export default store;
/**
 * *
 * reshow-flux-base/ActionObject
 */
export type ActionObject = import("reshow-flux-base").ActionObject;
/**
 * *
 * reshow-flux/StateMap
 */
export type StateMap = import("reshow-flux").StateMap;
declare const store: import("reshow-flux/types/ImmutableStore").ImmutableStoreObject<any, import("reshow-flux-base/types/type").ActionObject>;
export const popupDispatch: import("reshow-flux-base/types/createReducer").DispatchFunction<any, import("reshow-flux-base/types/type").ActionObject>;
export const SHOW_NEXT: "show_next";
export const SHOW_KEY: "shows";
export const NODE_KEY: "nodes";
