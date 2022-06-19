const readUpload = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });
};

export default readUpload;
