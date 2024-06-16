// @ts-check
import { getTubeData } from "./getTubeData";
import { jsonQuery, firstItem } from "./jsonQuery";

/**
 * @typedef {object} SearchOptions
 * @property {string=} host
 * @property {boolean=} isLive
 * @property {string=} hl
 * @property {string=} gl
 */

/**
 * @param {string} keyword
 * @param {SearchOptions} payload
 */
export const queryTubeSearch = async (
  keyword,
  {
    host = "https://www.youtube.com/results",
    isLive = false,
    hl = "en",
    gl = "us",
  },
) => {
  const url = new URL(host);
  url.searchParams.set("search_query", keyword);
  url.searchParams.set("hl", hl);
  url.searchParams.set("gl", gl);
  if (isLive) {
    url.searchParams.set("sp", "CAMSBBABQAE%3D");
  }
  const sUrl = url.toString();
  const { ytInitialData } = await getTubeData(sUrl);
  const items = jsonQuery(ytInitialData, "$..itemSectionRenderer..contents.*");
  const arr = [];
  for (let item of items) {
    const itemData =
      firstItem(item, "$..compactVideoRenderer") ||
      firstItem(item, "$..videoRenderer");
    const watchingLabel = jsonQuery(itemData, "$..viewCountText..text");
    const title =
      firstItem(item, "$..title..text") ||
      firstItem(item, "$..title..simpleText");
    const description =
      jsonQuery(item, "$..detailedMetadataSnippets..snippetText..text").join(
        "",
      ) ||
      jsonQuery(item, "$..description..text").join("") ||
      jsonQuery(item, "$..descriptionSnippet..text").join("");
    if (itemData) {
      arr.push({
        videoId: itemData.videoId,
        watching:
          watchingLabel && watchingLabel.length
            ? watchingLabel[0].replace(",", "")
            : 0,
        title,
        description,
      });
    }
  }
  return arr;
};
