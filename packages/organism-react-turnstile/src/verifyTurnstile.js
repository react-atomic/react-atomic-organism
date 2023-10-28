// @ts-check

import get from "get-object-value";

/**
 * @typedef {object} VerifyTurnstileProps
 * @property {string=} secret
 * @property {string?=} response
 * @property {string=} url 
 */

/**
 * @param {VerifyTurnstileProps} props 
 */
const verifyTurnstile = async ({
  secret,
  response,
  url = "https://challenges.cloudflare.com/turnstile/v0/siteverify",
}={}) => {
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
