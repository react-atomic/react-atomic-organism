export default store;
declare const store: {
    getMap: (arg0: import("reshow-flux/types/ImmutableStore").MapKeyType) => any;
    reset: () => any;
    getState: () => any;
    addListener: import("reshow-flux-base/types/createReducer").EmitterAddCall;
    removeListener: import("reshow-flux-base/types/createReducer").EmitterRemoveCall;
};
export const navigationDispatch: (action: import("reshow-flux-base/types/createReducer").DispatchAction, actionParams?: import("reshow-flux-base/types/createReducer").Payload) => import("reshow-flux/types/ImmutableStore").StateMap;
