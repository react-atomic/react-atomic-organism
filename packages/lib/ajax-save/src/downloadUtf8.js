import download from './download';

const downloadUtf8 = (text, fileName, option, isKeep) => {
  text = "\ufeff"+text;
  return execDownload(text, fileName, option, isKeep);
};

export default downloadUtf8;
