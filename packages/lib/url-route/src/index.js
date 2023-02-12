//@ts-check

import { parseUrl, getUrl } from "seturl";
import { isRequired } from "call-func";
import { safeMatch, wildcardToRegExp } from "get-safe-reg";
import { KEYS as getKeys, STRING, castToStr } from "reshow-constant";

/**
 * @typedef {object} RouteProps
 * @property {RegExp} reg
 * @property {CallableFunction} fn
 * @property {string[]} [keys=null]
 * @property {string} [src=null] original route string path
 * @property {string} [host=null]
 * @property {string} [query=null]
 * @property {string} [path=null]
 * @property {number} [nextIndex=null]
 * @property {RouteProps} [next=null]
 */

/**
 * @param {any} v
 * @returns {RegExp}
 */
const toReg = (v) => v;

/**
 * Convert path to route object
 *
 * A string or RegExp should be passed,
 *
 * @param  {(string|RegExp)} routePath
 * @param  {function} fn
 * @return {RouteProps}
 */
const Route = (routePath, fn) => {
  if (STRING === typeof routePath) {
    const { host, query, path } = parseUrl(routePath);
    const { reg, keys } = wildcardToRegExp(host || query ? path : routePath);

    return { reg, keys, fn, src: castToStr(routePath), host, query, path };
  } else {
    return { reg: toReg(routePath), fn };
  }
};

/**
 * @param {RegExpMatchArray} captures
 * @param {RouteProps} route
 */
const paraseParms = (captures, route) => {
  const { keys, src, fn } = route;
  const params = {};
  const splats = [];
  getKeys(captures).forEach(
    /**
     * @param {any} cKey
     * @param {number} index
     */
    (cKey, index) => {
      if (!index || isNaN(cKey)) {
        return;
      }
      const item = captures[cKey];
      const key = keys[index - 1];
      const val = STRING === typeof item ? decodeURI(item) : item;
      if (key) {
        params[key] = val;
      } else {
        splats.push(val);
      }
    }
  );
  const result = {
    fn,
    params,
    splats,
    route: src,
  };
  return result;
};

/**
 * Attempt to match the given request to
 * one of the routes. When successful
 * a  {fn, params, splats} obj is returned
 *
 * @param  {RouteProps[]} routes
 * @param  {string} uri
 * @return {RouteProps}
 */
const match = (routes, uri) => {
  const { host: thisHost, path: thisUri } = parseUrl(uri);
  if (!thisUri) {
    return;
  }
  let result;
  routes.some((route, index) => {
    const { reg, host: rtHost, query: rtQuery } = route;
    const captures = safeMatch(thisUri, reg);
    if (captures) {
      if (rtHost && thisHost !== rtHost) {
        return;
      }
      const isQueryNotMatch = rtQuery
        ?.replace("?", "")
        .split("&")
        .some((query) => {
          const queryArr = query.split("=");
          const { reg: queryReg } = wildcardToRegExp(queryArr[1]);
          const queryMeet = safeMatch(getUrl(queryArr[0], uri), queryReg);
          if (!queryMeet) {
            return true;
          }
          return false;
        });
      if (isQueryNotMatch) {
        return;
      }
      result = paraseParms(captures, route);
      result.nextIndex = index + 1;
      return true;
    } else {
      return false;
    }
  });
  return result;
};

/**
 * const router = new Router();
 * router.addRoute("/xxx*", ()=>{});
 * router.addRoute("/yyy*", ()=>{});
 * let match = router.match("/xxx/foo");
 * if (match) {
 *  match.fn()
 * } else if (match.next) {
 *  match = match.next("/xxx/foo");
 * }
 */

class Router {
  /**
   * @type {RouteProps[]}
   */
  routes = [];

  addRoute(path = isRequired("path"), callback = isRequired("callback")) {
    this.routes.push(Route(path, callback));
  }

  /**
   * @param {string} pathname
   * @param {number} startAt
   * @returns {RouteProps}
   */
  match(pathname, startAt) {
    startAt = startAt || 0;
    const routes = this.routes.slice(startAt);
    const route = match(routes, pathname);
    if (route) {
      route.next = this.match.bind(this, pathname, startAt + route.nextIndex);
    }
    return route;
  }
}

export default Router;
