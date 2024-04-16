/**
 * Export for unit test only
 * @type {LongCacheType}
 */
export const longCache: LongCacheType;
export function getGqlClient({ keys, url, fetch, debug }: GqlClientOptions, cacheObj?: SSRCache): Client;
export function handleGql(clientOptions: GqlClientOptions, defaultGqlResultOptions?: GqlResultOptions): handleGqlCallback;
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
export type GqlClientOptions = {
    url: string;
    disableCache?: boolean;
    keys?: import("@urql/exchange-graphcache").KeyingConfig;
    debug?: boolean;
    fetch?: Function;
    cacheObj?: SSRCacheType;
};
export type Exchange = import("@urql/core").Exchange;
export type GqlResultOptions = {
    isVerbose?: boolean;
    dataExpireSecs?: number;
    errorExpireSecs?: number;
    failExpireSecs?: number;
    cookResult?: (arg0: any) => any;
};
export type OperationResult = import("@urql/core").OperationResult<any, any>;
export type OperationResultOrData = OperationResult | OperationResult["data"];
export type UrGqlVariables = import("@urql/core").AnyVariables;
export type UrGqlQuery = import("@urql/core").TypedDocumentNode<any, UrGqlVariables>;
export type GqlResultCallback = (isDebug?: boolean | null, isVerbose?: boolean | null, isDisableCache?: boolean | null) => Promise<OperationResultOrData>;
export type handleGqlCallback = (query: UrGqlQuery, variables?: UrGqlVariables, options?: GqlResultOptions) => {
    execute: GqlResultCallback;
    results: GqlResultCallback;
};
import { Client } from "@urql/core";
