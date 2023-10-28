export default verifyTurnstile;
export type VerifyTurnstileProps = {
    secret?: string | undefined;
    response?: (string | null) | undefined;
    url?: string | undefined;
};
/**
 * @typedef {object} VerifyTurnstileProps
 * @property {string=} secret
 * @property {string?=} response
 * @property {string=} url
 */
/**
 * @param {VerifyTurnstileProps} props
 */
declare function verifyTurnstile({ secret, response, url, }?: VerifyTurnstileProps): Promise<any>;
