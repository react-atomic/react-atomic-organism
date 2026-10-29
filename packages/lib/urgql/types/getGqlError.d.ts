export type UrGqlError = import("@urql/core").CombinedError;
/**
 * @typedef {import("@urql/core").CombinedError} UrGqlError
 */
/**
 * @param {UrGqlError} error
 */
export declare const handleGqlError: (error: UrGqlError) => any;
