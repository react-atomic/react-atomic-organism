const uriReg =
  /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;

const urlAnalyCache = {};

const getUrlAnaly = (url) => {
  if (!urlAnalyCache[url]) {
    urlAnalyCache[url] = uriReg.exec(url);
  }
  return urlAnalyCache[url];
};

export default getUrlAnaly;
