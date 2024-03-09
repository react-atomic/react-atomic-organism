// @ts-check

/**
 * @typedef {import("./verifyTurnstile").VerifyTurnstileResult} VerifyTurnstileResult
 */

/**
 * @returns {Promise<VerifyTurnstileResult>}
 */
const checkClient = async ({
  js = "https://challenges.cloudflare.com/turnstile/v0/api.js",
  domain = "https://challenges.cloudflare.com",
} = {}) => {
  const jsResult = await fetch(js).then((res) => res.status);
  const domainResult = await fetch(domain).then((res) => res.status);
  return {
    success: 200 === jsResult && 200 === domainResult,
    "error-codes": ["challenges-cloudflare-is-not-work"],
  };
};
export default checkClient;
