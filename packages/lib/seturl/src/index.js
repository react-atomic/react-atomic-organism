import { doc } from "win-doc";
import { toStringForOneArray } from "get-object-value";
import getKeyReg, { getMultiMatchReg } from "./getKeyReg";

const uriReg = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;

const isArray = Array.isArray;
const defaultValue = undefined;

const getPath = (url, key, raw) => {
  const result = uriReg.exec(url);
  if (raw) {
    return result;
  } else {
    return result[key ?? 2];
  }
};

const resetUrl = (url) => (url ? url : doc().URL);

const getUrl = (keys, origUrl) => {
  const url = getPath(resetUrl(origUrl), 16) || "";
  const getOne = (key) => {
    const keyEq = key + "=";
    if (url.indexOf(keyEq) === url.lastIndexOf(keyEq)) {
      const reg = getKeyReg(key);
      const exec = reg.exec(url);
      return !exec ? defaultValue : decodeURIComponent(exec[3]);
    } else {
      const results = getUrlArray(key, url);
      return toStringForOneArray(results);
    }
  };
  if (isArray(keys)) {
    const results = {};
    keys.forEach((key) => {
      results[key] = getOne(key);
    });
    return results;
  } else {
    return keys ? getOne(keys) : defaultValue;
  }
};

const getMultiKey = (key, url) => {
  const reg = getMultiMatchReg(key);
  const results = [];
  let exec;
  while ((exec = reg.exec(url))) {
    results.push(decodeURIComponent(exec[3]));
  }
  return results;
};

const getUrlArray = (key, origUrl) => {
  const url = getPath(resetUrl(origUrl), 16) || "";
  return getMultiKey(key, url);
};

const unsetUrl = (key, url) => {
  url = resetUrl(url);
  const reg = getKeyReg(key);
  let exec;
  while ((exec = reg.exec(url))) {
    url = exec[2] === "?" ? url.replace(reg, "?") : url.replace(reg, "");
  }
  return url;
};

const setUrl = (key, value, url, KeepRawValue) => {
  const multi = isArray(value);
  url = unsetUrl(key, resetUrl(url));
  (multi ? value : [value]).forEach((vItem) => {
    if (!KeepRawValue) {
      vItem = encodeURIComponent(vItem);
    }
    url = url + (-1 === url.indexOf("?") ? "?" : "&") + key + "=" + vItem;
  });
  return url;
};

export { getUrl, getUrlArray, getPath, unsetUrl };
export default setUrl;
