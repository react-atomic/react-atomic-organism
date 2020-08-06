/**
 * Convert path to route object
 *
 * A string or RegExp should be passed,
 * will return { re, src, keys} obj
 *
 * @param  {String / RegExp} path
 * @return {Object}
 */

import { getPath, getUrl } from "seturl";

const Route = (path, fn) => {
  const keys = [];
  const srcArr = getPath(path, null, true);
  const re = pathToRegExp(srcArr[6] || srcArr[16] ? srcArr[13] : path, keys);
  const src = path;

  return { re, src, srcArr, keys, fn };
};

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names.
 * For example "/user/:id" will contain ["id"].
 *
 * @param  {String} path
 * @param  {Array} keys
 * @return {RegExp}
 */
const pathToRegExp = (path, keys) => {
  const nextPath = (path || "")
    .replace(/\?/g, "<<?>>")
    .concat("/?")
    .replace(/\/\(/g, "(?:/")
    .replace(
      /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g,
      (_, slash, format, key, capture, optional) => {
        if (_ === "*") {
          keys && keys.push(undefined);
          return _;
        }

        keys && keys.push(key);
        slash = slash || "";
        return (
          "" +
          (optional ? "" : slash) +
          "(?:" +
          (optional ? slash : "") +
          (format || "") +
          (capture || "([^/]+?)") +
          ")" +
          (optional || "")
        );
      }
    )
    .replace(/([\/.])/g, "\\$1")
    .replace(/\*/g, "(.*)")
    .replace(/<<\?>>/g, ".?");
  return new RegExp("^" + nextPath + "$", "i");
};

const paraseParms = (captures, route) => {
  const { keys, src, fn } = route;
  const params = {};
  const splats = [];
  Object.keys(captures).forEach((cKey, index) => {
    if (!index || isNaN(cKey)) {
      return;
    }
    const item = captures[cKey];
    const key = keys[index - 1];
    const val = "string" === typeof item ? decodeURI(item) : item;
    if (key) {
      params[key] = val;
    } else {
      splats.push(val);
    }
  });
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
 * @param  {Array} routes
 * @param  {String} uri
 * @return {Object}
 */
const match = (routes, uri) => {
  const thisUriArr = getPath(uri, null, true);
  const thisUri = thisUriArr[13];
  const thisHost = thisUriArr[6];
  if (!thisUri) {
    return false;
  }
  let result;
  routes.some((route, index) => {
    const { re, src, srcArr } = route;
    const captures = thisUri.match(re);
    if (captures) {
      const rtHost = srcArr[6];
      if (rtHost && thisHost !== rtHost) {
        return;
      }
      const isQueryNotMatch = srcArr[16]
        ?.replace("?", "")
        .split("&")
        .some((query) => {
          const queryArr = query.split("=");
          const queryReg = pathToRegExp(queryArr[1]);
          const queryMeet = getUrl(queryArr[0], uri).match(queryReg);
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
 * Default "normal" router constructor.
 * accepts path, fn tuples via addRoute
 * returns {fn, params, splats, route} via match
 *
 * @return {Object}
 */

class Router {
  routes = [];

  addRoute(path, fn) {
    if (!path) {
      throw new Error("Route requires a path");
    }
    if (!fn) {
      throw new Error("Route " + path + " requires a callback");
    }
    this.routes.push(Route(path, fn));
  }

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
