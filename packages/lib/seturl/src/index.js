import { doc } from "win-doc";
import getKeyReg, { getMultiMatchReg } from "./getKeyReg";

const uriReg = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;

const getPath = (url, key, raw) => {
  const result = uriReg.exec(url);
  if (raw) {
    return result;
  } else {
    return result[key ?? 2];
  }
};

const resetUrl = url => (url ? url : doc().URL);

const getUrl = (key, url) => {
  url = getPath(resetUrl(url), 16);
  if (url.indexOf(key) === url.lastIndexOf(key)) {
    const reg = getKeyReg(key);
    const exec = reg.exec(url);
    return !exec ? undefined : decodeURIComponent(exec[3]);
  } else {
    const reg = getMultiMatchReg(key);
    const results = [];
    let exec;
    while ((exec = reg.exec(url))) {
      results.push(decodeURIComponent(exec[3]));
    }
    return results;
  }
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
  const multi = Array.isArray(value);
  url = unsetUrl(key, resetUrl(url));
  (multi ? value : [value]).forEach(vItem => {
    if (!KeepRawValue) {
      vItem = encodeURIComponent(vItem);
    }
    url = url + (-1 === url.indexOf("?") ? "?" : "&") + key + "=" + vItem;
  });
  return url;
};

export { getUrl, getPath, unsetUrl };
export default setUrl;
