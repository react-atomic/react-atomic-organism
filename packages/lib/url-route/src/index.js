import { getPath, getUrl } from "seturl";
import { isRequired } from "call-func";
import { safeMatch } from "get-safe-reg";
import { KEYS as getKeys, STRING, T_NULL, T_UNDEFINED } from "reshow-constant";

/**
 * Convert path to route object
 *
 * A string or RegExp should be passed,
 *
 * @param  String|RegExp path
 * @param  function callback
 * @return {Object}
 */
const Route = (path, fn) => {
  const srcArr = getPath(path, T_NULL, true);
  const { reg, keys } = pathToRegExp(
    srcArr[6] || srcArr[16] ? srcArr[13] : path
  );
  const src = path;

  return { reg, src, srcArr, keys, fn };
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
 * @return {reg, keys}
 */
const pathCache = {};
const pathToRegExp = (path) => {
  if (pathCache[path] != T_NULL) {
    return pathCache[path];
  }
  const keys = [];
  const nextPath = (path || "")
    .replace(/\?/g, "<<?>>")
    .concat("/?")
    .replace(/\/\(/g, "(?:/")
    .replace(
      /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g,
      (_, slash, format, key, capture, optional) => {
        if (_ === "*") {
          keys && keys.push(T_UNDEFINED);
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
    .replace(/<<\?>>/g, ".+");
  const regString = "^" + nextPath + "$";
  const reg = new RegExp(regString, "i");
  pathCache[path] = { reg, keys };
  return pathCache[path];
};

const paraseParms = (captures, route) => {
  const { keys, src, fn } = route;
  const params = {};
  const splats = [];
  getKeys(captures).forEach((cKey, index) => {
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
  const thisUriArr = getPath(uri, T_NULL, true);
  const thisUri = thisUriArr[13];
  const thisHost = thisUriArr[6];
  if (!thisUri) {
    return false;
  }
  let result;
  routes.some((route, index) => {
    const { reg, src, srcArr } = route;
    const captures = safeMatch(thisUri, reg);
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
          const { reg: queryReg } = pathToRegExp(queryArr[1]);
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
 * Default "normal" router constructor.
 * accepts path, fn tuples via addRoute
 * returns {fn, params, splats, route} via match
 *
 * @return {Object}
 */

class Router {
  routes = [];

  addRoute(path = isRequired("path"), callback = isRequired("callback")) {
    this.routes.push(Route(path, callback));
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
