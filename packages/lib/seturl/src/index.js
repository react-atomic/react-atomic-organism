import { doc } from "win-doc";
import { oneItemArrayToString } from "with-array";
import { T_UNDEFINED, IS_ARRAY } from "reshow-constant";
import getKeyReg, { getMultiMatchReg } from "./getKeyReg";
import getUrlAnaly from "./getUrlAnaly";

const defaultValue = T_UNDEFINED;

const parseUrl = (url) => {
  const oUrl = getUrlAnaly(url);
  return {
    host: oUrl[11],
    query: oUrl[16],
    path: oUrl[13],
  };
};

const resetUrl = (url) => (url ? url : doc().URL);

const getUrl = (keys, origUrl) => {
  const { query = "" } = parseUrl(resetUrl(origUrl));
  const getOne = (key) => {
    const keyEq = key + "=";
    if (query.indexOf(keyEq) === query.lastIndexOf(keyEq)) {
      const reg = getKeyReg(key);
      const exec = reg.exec(query);
      return !exec ? defaultValue : decodeURIComponent(exec[3]);
    } else {
      const results = getUrlArray(key, query);
      return oneItemArrayToString(results);
    }
  };
  if (IS_ARRAY(keys)) {
    const results = {};
    keys.forEach((key) => {
      results[key] = getOne(key);
    });
    return results;
  } else {
    return keys ? getOne(keys) : defaultValue;
  }
};

const getMultiKey = (key, query) => {
  const reg = getMultiMatchReg(key);
  const results = [];
  let exec;
  while ((exec = reg.exec(query))) {
    results.push(decodeURIComponent(exec[3]));
  }
  return results;
};

const getUrlArray = (key, origUrl) => {
  const { query = "" } = parseUrl(resetUrl(origUrl));
  return getMultiKey(key, query);
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
  const multi = IS_ARRAY(value);
  url = unsetUrl(key, resetUrl(url));
  (multi ? value : [value]).forEach((vItem) => {
    if (!KeepRawValue) {
      vItem = encodeURIComponent(vItem);
    }
    url = url + (-1 === url.indexOf("?") ? "?" : "&") + key + "=" + vItem;
  });
  return url;
};

export { getUrl, getUrlArray, parseUrl, unsetUrl };
export default setUrl;
