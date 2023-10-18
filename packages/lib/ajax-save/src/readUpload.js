// @ts-check
/**
 * @param {Blob} file
 */
const readUpload = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => resolve(reader.result));
    reader.readAsText(file);
  });
};

export default readUpload;
