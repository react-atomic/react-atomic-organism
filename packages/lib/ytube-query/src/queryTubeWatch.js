// @ts-check
import { getTubeData } from "./getTubeData";
import { jsonQuery, firstItem } from "./jsonQuery";

/**
 * @param {string} videoId
 * @param {string=} host
 */
export const queryTubeWatch = async (
  videoId,
  host = "https://www.youtube.com/watch?v=",
) => {
  const url = `${host}${videoId}&hl=en`;
  const { ytInitialPlayerResponse } = await getTubeData(url, [
    "ytInitialData",
    "ytInitialPlayerResponse",
  ]);
  const status = firstItem(ytInitialPlayerResponse, "$..status");
  const reason = firstItem(ytInitialPlayerResponse, "$..reason");
  return {
    success: null == reason ? true : false,
    status,
    reason,
    videoId,
  };
};
