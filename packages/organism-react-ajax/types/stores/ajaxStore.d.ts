export type ActionObject = import("reshow-flux-base").ActionObject;
export type StateMap = import("reshow-flux").StateMap;
/**
 * @param {any} s
 * @returns {boolean}
 */
declare const hasUrl: (s: any) => boolean;
/**
 * @param {any} worker
 */
declare const initAjaxWorkerEvent: (worker: any) => void;
export type GetRawUrlProps = {
    url?: string;
    path?: string;
    baseUrl?: string;
};
/**
 * @typedef {object} GetRawUrlProps
 * @property {string} [url]
 * @property {string} [path]
 * @property {string} [baseUrl]
 */
/**
 * @param {GetRawUrlProps} props
 * @returns{string}
 */
declare const getRawUrl: (props: GetRawUrlProps) => string;
export type AjaxStore = {
    urlDispatch: Function;
};
declare const store: import("reshow-flux/types/ImmutableStore").StoreObject<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux-base/types/type").ActionObject> & import("reshow-flux/types/ImmutableStore").StoreObjectWithMap & AjaxStore, ajaxDispatch: import("reshow-flux-base/types/createReducer").DispatchFunction<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux-base/types/type").ActionObject>;
export default store;
export { initAjaxWorkerEvent, ajaxDispatch, getRawUrl, hasUrl };
