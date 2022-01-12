import download from "./download";

const downloadUtf8 = (text, fileName, option = {}, isKeep) => {
  text = "\ufeff" + text;
  option = option || {};
  if (!option.type) {
    option.type = "text/plain;charset=utf-8";
  }
  return download(text, fileName, option, isKeep);
};

export default downloadUtf8;
