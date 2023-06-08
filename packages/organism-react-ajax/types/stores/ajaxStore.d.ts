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
    reset: () => Map<string, (url: string) => void>;
    getState: () => Map<string, (url: string) => void>;
    addListener: import("reshow-flux/node_modules/reshow-flux-base/types/createReducer").EmitterAddCall;
    removeListener: import("reshow-flux/node_modules/reshow-flux-base/types/createReducer").EmitterRemoveCall;
} & AjaxStore;
/**
 * @param {any} worker
 */
export function initAjaxWorkerEvent(worker: any): void;
export const ajaxDispatch: (action: import("reshow-flux/node_modules/reshow-flux-base/types/createReducer").DispatchAction, actionParams?: import("reshow-flux/node_modules/reshow-flux-base/types/createReducer").Payload) => import("reshow-flux/types/ImmutableStore").StateMap;
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
import { Map } from "reshow-flux";
