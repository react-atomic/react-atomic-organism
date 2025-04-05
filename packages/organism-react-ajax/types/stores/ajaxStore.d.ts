export default store;
export type ActionObject = import("reshow-flux-base").ActionObject;
export type StateMap = import("reshow-flux").StateMap;
export type GetRawUrlProps = {
    url?: string;
    path?: string;
    baseUrl?: string;
};
export type AjaxStore = {
    urlDispatch: Function;
};
declare const store: import("reshow-flux/types/ImmutableStore").StoreObject<import("reshow-flux/types/ImmutableStore").StateMap, any> & import("reshow-flux/types/ImmutableStore").StoreObjectWithMap & AjaxStore;
/**
 * @param {any} worker
 */
export function initAjaxWorkerEvent(worker: any): void;
export const ajaxDispatch: import("reshow-flux-base/types/createReducer").DispatchFunction<import("reshow-flux/types/ImmutableStore").StateMap, any>;
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
export function getRawUrl(props: GetRawUrlProps): string;
/**
 * @param {any} s
 * @returns {boolean}
 */
export function hasUrl(s: any): boolean;
