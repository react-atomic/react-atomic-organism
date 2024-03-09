// @ts-check

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
 * @property {string[]=} error-codes
 * @property {string=} challenge_ts ISO timestamp for the time the challenge was solved.
 * @property {string=} hostname Hostname for which the challenge was served.
 * @property {string=} action The customer widget identifier passed to the widget on the client side.
 * @property {string=} cdata The customer data passed to the widget on the client side.
 */

/**
 * @param {VerifyTurnstileProps} props
 * @returns {Promise<VerifyTurnstileResult>}
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
  return result;
};

export default verifyTurnstile;
