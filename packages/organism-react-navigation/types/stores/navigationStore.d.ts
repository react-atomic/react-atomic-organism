declare const store: import("reshow-flux/types/ImmutableStore").ImmutableStoreObject<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux/types/ImmutableStore").MaybeMapType>;
/**
 * @type {import("reshow-flux-base").DispatchFunction<any, any>}
 */
declare const typedDispatch: import("reshow-flux-base").DispatchFunction<any, any>;
export default store;
export { typedDispatch as navigationDispatch };
