import { doc } from "win-doc";
import getKeyReg from "./getKeyReg";

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
  url = resetUrl(url);
  const reg = getKeyReg(key);
  const exec = reg.exec(url);
  return !exec ? "" : decodeURIComponent(exec[3]);
};

const unsetUrl = (key, url) => {
  const reg = getKeyReg(key);
  url = resetUrl(url);
  const exec = reg.exec(url);
  if (exec) {
    url = exec[2] === "?" ? url.replace(reg, "?") : url.replace(reg, "");
  }
  return url;
};

const setUrl = (key, value, url, KeepRawValue) => {
  const reg = getKeyReg(key);
  if (!KeepRawValue) {
    value = encodeURIComponent(value);
  }
  url = resetUrl(url);
  url = reg.test(url)
    ? url.replace(reg, "$1" + value)
    : url + (-1 === url.indexOf("?") ? "?" : "&") + key + "=" + value;
  return url;
};

export { getUrl, getPath, unsetUrl };
export default setUrl;
