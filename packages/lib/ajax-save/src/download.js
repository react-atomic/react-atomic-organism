import {inject, create, remove} from 'create-el';
import getRandomId from 'get-random-id';
import {win} from 'win-doc';

const isBlob = o =>
  o instanceof Blob || Object.prototype.toString.call(o) === '[object Blob]';

const execDownload = (text, fileName, option, isKeep) => {
  const blob = isBlob(text) ? text : new Blob([text], option);
  const url = win().URL.createObjectURL(blob);
  const link = create('a')()({
    download: fileName || getRandomId(),
    href: url,
  });
  inject()(link);
  link.click();
  if (!isKeep) {
    remove(link);
  }
}

export default execDownload;
