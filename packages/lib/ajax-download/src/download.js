import {inject, create, remove} from 'create-el';
import getRandomId from 'get-random-id';

const execDownload = (text, fileName, option, isKeep) => {
  const blob = new Blob([text], option);
  const url = createObjectURL(blob);
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
