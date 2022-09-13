export default store;
declare const store: any;
export function initAjaxWorkerEvent(worker: any): void;
export const ajaxDispatch: (action: string | object | Function, actionParams?: object) => any;
export function getRawUrl({ url, path, baseUrl }?: {
    url?: any;
    path?: any;
    baseUrl?: any;
}): any;
export function hasUrl(s: any): boolean;
