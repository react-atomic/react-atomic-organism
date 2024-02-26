export default store;
declare const store: {
    getMap: (arg0: import("reshow-flux/types/ImmutableStore").MapKeyType) => any;
    reset: () => import("reshow-flux/types/ImmutableStore").StateMap;
    getState: () => import("reshow-flux/types/ImmutableStore").StateMap;
    addListener: import("reshow-flux-base/types/type").EmitterAddCall<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux/types/ImmutableStore").MaybeMapType>;
    removeListener: import("reshow-flux-base/types/type").EmitterRemoveCall<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux/types/ImmutableStore").MaybeMapType>;
};
export const navigationDispatch: import("reshow-flux-base/types/createReducer").DispatchType<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux/types/ImmutableStore").MaybeMapType>;
