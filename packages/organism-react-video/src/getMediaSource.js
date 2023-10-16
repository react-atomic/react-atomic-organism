// @ts-check
import callfunc from "call-func";
const defaultSourceType = 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"';
const getMediaSource = ({ url, onUpdate, sourceType = defaultSourceType }) => {
  const mediaSource = new MediaSource();
  mediaSource.addEventListener(
    "sourceopen",
    () => {
      const sourceBuffer = mediaSource.addSourceBuffer(sourceType);
      sourceBuffer.addEventListener("updateend", () => {
        if (!sourceBuffer.updating && mediaSource.readyState === "open") {
          mediaSource.endOfStream();
        }
        callfunc(onUpdate);
      });
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          // Append the data into the new sourceBuffer.
          sourceBuffer.appendBuffer(data);
        })
        .catch(() => {});
    },
    { once: true }
  );
  const src = URL.createObjectURL(mediaSource);
  return src;
};

export default getMediaSource;
