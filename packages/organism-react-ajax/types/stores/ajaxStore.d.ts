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
declare const store: {
    getMap: (arg0: import("reshow-flux/types/ImmutableStore").MapKeyType) => any;
    reset: () => import("reshow-flux/types/ImmutableStore").StateMap;
    getState: () => import("reshow-flux/types/ImmutableStore").StateMap;
    addListener: import("reshow-flux-base/types/type").EmitterAddCall<import("reshow-flux/types/ImmutableStore").StateMap, any>;
    removeListener: import("reshow-flux-base/types/type").EmitterRemoveCall<import("reshow-flux/types/ImmutableStore").StateMap, any>;
} & AjaxStore;
/**
 * @param {any} worker
 */
export function initAjaxWorkerEvent(worker: any): void;
export const ajaxDispatch: import("reshow-flux-base/types/createReducer").DispatchType<import("reshow-flux/types/ImmutableStore").StateMap, any>;
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
