export default store;
export type StateType = {
    get: Function;
    set: Function;
};
export type MaybeMapType = StateType | any;
export type AjaxStore = {
    urlDispatch: Function;
};
export type ReducerType = (state: StateType, action: MaybeMapType) => StateType;
declare const store: import("reshow-flux-base/types/createReducer").Store & import("reshow-flux/types/ImmutableStore").ImmutableStore & AjaxStore;
export function initAjaxWorkerEvent(worker: any): void;
export const ajaxDispatch: (action: string | object | Function, actionParams?: object) => any;
export function getRawUrl({ url, path, baseUrl }?: {
    url?: any;
    path?: any;
    baseUrl?: any;
}): any;
export function hasUrl(s: any): boolean;
