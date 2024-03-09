// @ts-check

import get from "get-object-value";

/**
 * @typedef {object} VerifyTurnstileProps
 * @property {string=} secret
 * @property {string?=} response
 * @property {string=} url
 */

/**
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#accepted-parameters
 * @typedef {object} VerifyTurnstileResult
 * @property {boolean} success
 * @property {string[]} error-codes
 */

/**
 * @param {VerifyTurnstileProps} props
 * @returns {Promise<boolean|VerifyTurnstileResult>}
 */
const verifyTurnstile = async ({
  secret,
  response,
  url = "https://challenges.cloudflare.com/turnstile/v0/siteverify",
} = {}) => {
  /**
   * @type VerifyTurnstileResult
   */
  const result = await fetch(url, {
    body: JSON.stringify({
      secret,
      response,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return get(result, ["success"]) || result;
};

export default verifyTurnstile;
