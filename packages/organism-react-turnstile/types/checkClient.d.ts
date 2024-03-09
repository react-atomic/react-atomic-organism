export default checkClient;
export type VerifyTurnstileResult = import("./verifyTurnstile").VerifyTurnstileResult;
/**
 * @typedef {import("./verifyTurnstile").VerifyTurnstileResult} VerifyTurnstileResult
 */
/**
 * @returns {Promise<VerifyTurnstileResult>}
 */
declare function checkClient({ js, domain, }?: {
    js?: string;
    domain?: string;
}): Promise<VerifyTurnstileResult>;
