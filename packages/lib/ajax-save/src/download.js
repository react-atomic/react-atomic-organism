import { inject, create, remove } from "create-el";
import getRandomId from "get-random-id";
import { win } from "win-doc";

const isBlob = (o) =>
  o instanceof Blob || Object.prototype.toString.call(o) === "[object Blob]";

const execDownload = (text, fileName, option, isKeep) => {
  const URL = win().URL;
  const blob = isBlob(text) ? text : new Blob([text], option);
  const url = URL.createObjectURL(blob);
  const link = create("a")()({
    download: fileName || getRandomId(),
    href: url,
  });
  inject()(link);
  link.click();
  if (!isKeep) {
    remove(link);
    URL.revokeObjectURL(url);
  }
};

export default execDownload;
