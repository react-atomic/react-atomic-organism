export default setUrl;
export function getUrl(keys: any, origUrl: any): any;
export function getUrlArray(key: any, origUrl: any): string[];
export function parseUrl(url: any): {
    host: any;
    query: any;
    path: any;
};
export function unsetUrl(key: any, url: any): any;
declare function resetUrl(url: any): any;
declare function setUrl(key: any, value: any, url: any, KeepRawValue: any): any;
export { resetUrl as url };
