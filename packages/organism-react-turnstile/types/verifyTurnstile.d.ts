export default verifyTurnstile;
export type VerifyTurnstileProps = {
    secret?: string | undefined;
    response?: (string | null) | undefined;
    url?: string | undefined;
};
export type VerifyTurnstileResult = {
    success: boolean;
    "error-codes": string[];
};
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
declare function verifyTurnstile({ secret, response, url, }?: VerifyTurnstileProps): Promise<boolean | VerifyTurnstileResult>;
