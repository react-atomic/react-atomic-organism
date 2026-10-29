export type VerifyTurnstileResult = import("./verifyTurnstile").VerifyTurnstileResult;
/**
 * @typedef {import("./verifyTurnstile").VerifyTurnstileResult} VerifyTurnstileResult
 */
/**
 * @returns {Promise<VerifyTurnstileResult>}
 */
declare const checkClient: ({ js, domain, }?: {
    domain?: string;
    js?: string;
}) => Promise<VerifyTurnstileResult>;
export default checkClient;
