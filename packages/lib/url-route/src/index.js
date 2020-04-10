/**
 * Convert path to route object
 *
 * A string or RegExp should be passed,
 * will return { re, src, keys} obj
 *
 * @param  {String / RegExp} path
 * @return {Object}
 */

import {getPath} from 'seturl';

const Route = (path, fn) => {
  const keys = [];
  const re = pathToRegExp(path, keys);
  const src = path;

  return {re, src, keys, fn};
};

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String} path
 * @param  {Array} keys
 * @return {RegExp}
 */
const pathToRegExp = (path, keys) => {
  path = path
    .concat('/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g, (
      _,
      slash,
      format,
      key,
      capture,
      optional,
    ) => {
      if (_ === '*') {
        keys.push(undefined);
        return _;
      }

      keys.push(key);
      slash = slash || '';
      return (
        '' +
        (optional ? '' : slash) +
        '(?:' +
        (optional ? slash : '') +
        (format || '') +
        (capture || '([^/]+?)') +
        ')' +
        (optional || '')
      );
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + path + '$', 'i');
};

const paraseParms = (captures, route) => {
  const {keys, src, fn} = route;
  const params = {};
  const splats = [];
  Object.keys(captures).forEach((cKey, index) => {
    const item = captures[cKey];
    const key = keys[index];
    const val = 'string' === typeof item ? decodeURI(item) : item;
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
  const thisUri = getPath(uri);
  if (!thisUri) {
    return false;
  }
  let result;
  routes.some((route, index) => {
    const {re} = route;
    const captures = thisUri.match(re);
    if (captures) {
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
 * returns {fn, params, splats, route}
 *  via match
 *
 * @return {Object}
 */

class Router {
  routes = [];

  addRoute(path, fn) {
    if (!path) {
      throw new Error('Route requires a path');
    }
    if (!fn) {
      throw new Error('Route ' + path.toString() + ' requires a callback');
    }
    this.routes.push(Route(path, fn));
  }

  match(pathname, startAt) {
    startAt = startAt ? startAt : 0;
    const routes = this.routes.slice(startAt);
    const route = match(routes, pathname);
    if (route) {
      route.next = this.match.bind(this, pathname, startAt + route.nextIndex);
    }
    return route;
  }
}

export default Router;
