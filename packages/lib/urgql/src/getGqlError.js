// @ts-check

import get from "get-object-value";

/**
 * @typedef {import("@urql/core").CombinedError} UrGqlError
 */

/**
 * @param {UrGqlError} error
 */
export const handleGqlError = (error) => {
  const data = get(error, ["graphQLErrors", 0, "originalError", "message"]);
  if (data) {
    try {
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (_e) {
      return data;
    }
  }
};
