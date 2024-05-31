// @ts-check

import { parse } from "node-html-parser";

const jsonReg = /{.*}/;
/**
 * @param {string} url
 * @returns {Promise<any>}
 */
export const getTubeData = async (
  url,
  keys = ["ytInitialData"],
  timeout = 3000
) => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const DEFAULT_USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15";
  const options = {
    headers: {
      "user-agent": DEFAULT_USER_AGENT,
      accept: "text/html",
      "accept-language": "en",
    },
    signal,
  };
  const timer = new Promise((_, reject) => {
    const timeId = setTimeout(() => {
      reject(new Error("Request timed out"));
      abortController.abort();
      clearTimeout(timeId);
    }, timeout);
  });
  const response = await Promise.race([fetch(url, options), timer]);
  const responseText = await response.text();
  const root = parse(responseText);
  /**
   * @param {string} s
   */
  const parseJson = (s) => {
    const match = jsonReg.exec(s);
    const sJson = match ? match[0] : "";
    try {
      const data = JSON.parse(sJson);
      return data;
    } catch (e) {}
  };
  /**
   * @type {any}
   */
  const results = {};
  keys.forEach((/**@type string*/ key) => {
    const script = /**@type any*/ (
      root.querySelector(`script:contains("var ${key}")`)
    );
    const txt = script.innerText;
    if (-1 !== txt.indexOf(`var ${key}`)) {
      results[key] = parseJson(txt);
      return;
    }
  });
  return results;
};
