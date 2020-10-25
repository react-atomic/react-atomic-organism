"use strict";

const uriencode = (uri) => {
  if (!uri) {
    return uri;
  }
  uri = uri.replace(/#/g, "\uff03");
  uri = encodeURIComponent(uri)
    .replace(/%20/g, "+")
    .replace(/%26/g, "&")
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]");
  return uri;
};

export default uriencode;
