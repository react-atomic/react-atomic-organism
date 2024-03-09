export default verifyTurnstile;
export type VerifyTurnstileProps = {
    secret?: string | undefined;
    response?: (string | null) | undefined;
    url?: string | undefined;
};
export type VerifyTurnstileResult = {
    success: boolean;
    "error-codes"?: string[] | undefined;
    /**
     * ISO timestamp for the time the challenge was solved.
     */
    challenge_ts?: string | undefined;
    /**
     * Hostname for which the challenge was served.
     */
    hostname?: string | undefined;
    /**
     * The customer widget identifier passed to the widget on the client side.
     */
    action?: string | undefined;
    /**
     * The customer data passed to the widget on the client side.
     */
    cdata?: string | undefined;
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
declare function verifyTurnstile({ secret, response, url, }?: VerifyTurnstileProps): Promise<VerifyTurnstileResult>;
