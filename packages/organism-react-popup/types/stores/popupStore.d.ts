export default store;
/**
 * *
 * reshow-flux-base/ActionObject
 */
export type ActionObject = import('reshow-flux-base').ActionObject;
/**
 * *
 * reshow-flux/StateMap
 */
export type StateMap = import('reshow-flux').StateMap;
declare const store: {
    getMap: (arg0: import("reshow-flux/types/ImmutableStore").MapKeyType) => any;
    reset: () => any;
    getState: () => any;
    addListener: import("reshow-flux-base/types/type").EmitterAddCall<any, import("reshow-flux-base").ActionObject>;
    /**
     * @param {StateMap} state
     * @param {ActionObject} action
     */
    removeListener: import("reshow-flux-base/types/type").EmitterRemoveCall<any, import("reshow-flux-base").ActionObject>;
};
export const popupDispatch: import("reshow-flux-base/types/createReducer").DispatchType<any, import("reshow-flux-base").ActionObject>;
export const SHOW_NEXT: "show_next";
export const SHOW_KEY: "shows";
export const NODE_KEY: "nodes";
