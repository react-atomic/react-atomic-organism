import { Client } from "@urql/core";
export type SSRCache = {
    current: import("@urql/core").SSRExchange;
};
export type CacheCreateTime = {
    createTime: Record<number, EpochTimeStamp>;
};
export type SSRCacheType = SSRCache & CacheCreateTime;
export type LongCache = {
    current: Map<number, any>;
};
export type LongCacheType = LongCache & CacheCreateTime;
/**
 * Export for unit test only
 * @type {LongCacheType}
 */
export declare const longCache: LongCacheType;
export type GqlClientOptions = {
    url: string;
    disableCache?: boolean;
    keys?: import("@urql/exchange-graphcache").KeyingConfig;
    debug?: boolean;
    fetch?: Function;
    cacheObj?: SSRCacheType;
};
export type Exchange = import("@urql/core").Exchange;
/**
 * @typedef {object} GqlClientOptions
 * @property {string} url
 * @property {boolean} [disableCache]
 * @property {import("@urql/exchange-graphcache").KeyingConfig} [keys]
 * @property {boolean} [debug]
 * @property {Function} [fetch]
 * @property {SSRCacheType} [cacheObj]
 */
/**
 * @typedef {import("@urql/core").Exchange} Exchange
 */
/**
 * @param {GqlClientOptions} props
 * @param {SSRCache} [cacheObj]
 * @returns {Client}
 */
export declare const getGqlClient: ({ keys, url, fetch, debug }: GqlClientOptions, cacheObj?: SSRCache) => Client;
export type GqlResultOptions = {
    isVerbose?: boolean;
    dataExpireSecs?: number;
    errorExpireSecs?: number;
    failExpireSecs?: number;
    cookResult?: (result: OperationResult) => any;
    onError?: (result: OperationResult) => void;
};
export type OperationResult = import("@urql/core").OperationResult<any, any>;
export type OperationResultOrData = OperationResult | OperationResult["data"];
export type UrGqlVariables = import("@urql/core").AnyVariables;
export type UrGqlQuery = import("@urql/core").TypedDocumentNode<any, UrGqlVariables>;
export type GqlResultCallback = (isDebug?: boolean | null, isVerbose?: boolean | null, disableCache?: boolean | null) => Promise<OperationResultOrData>;
export type handleGqlCallback = (query: UrGqlQuery, variables?: UrGqlVariables, options?: GqlResultOptions) => {
    execute: GqlResultCallback;
    results: GqlResultCallback;
};
/**
 * @typedef {object} GqlResultOptions
 * @property {boolean} [isVerbose]
 * @property {number} [dataExpireSecs]
 * @property {number} [errorExpireSecs]
 * @property {number} [failExpireSecs]
 * @property {(result: OperationResult) => any} [cookResult]
 * @property {(result: OperationResult) => void} [onError]
 */
/**
 * @typedef {import("@urql/core").OperationResult<any, any>} OperationResult
 */
/**
 * @typedef {OperationResult|OperationResult["data"]} OperationResultOrData
 */
/**
 * @typedef {import("@urql/core").AnyVariables} UrGqlVariables
 * @typedef {import("@urql/core").TypedDocumentNode<any, UrGqlVariables>} UrGqlQuery
 */
/**
 * @callback GqlResultCallback
 * @param {boolean?} [isDebug]
 * @param {boolean?} [isVerbose]
 * @param {boolean?} [disableCache]
 * @returns {Promise<OperationResultOrData>}
 */
/**
 * @callback handleGqlCallback
 * @param {UrGqlQuery} query
 * @param {UrGqlVariables} [variables]
 * @param {GqlResultOptions} [options]
 * @returns {{execute: GqlResultCallback, results: GqlResultCallback}}
 */
/**
 * @param {GqlClientOptions} clientOptions
 * @param {GqlResultOptions} [defaultOptions]
 * @returns {handleGqlCallback}
 */
export declare const handleGql: (clientOptions: GqlClientOptions, defaultOptions?: GqlResultOptions) => handleGqlCallback;
