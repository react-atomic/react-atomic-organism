/**
 * Export for unit test only
 * @type {LongCacheType}
 */
export const longCache: LongCacheType;
export function getGqlClient({ url, cache, fetch }: GqlClientOptions, cacheObj?: SSRCacheType): import("@urql/core/dist/urql-core-chunk").Client;
export function handleGql(clientOptions: GqlClientOptions, defaultGqlResultOptions?: GqlResultOptions): handleGqlCallback;
export type SSRCacheType = {
    current: import("@urql/core").SSRExchange;
    createTime: Record<number, EpochTimeStamp>;
};
export type LongCacheType = {
    current: Map<number, any>;
    createTime: Record<number, EpochTimeStamp>;
};
export type GqlClientOptions = {
    url: string;
    cache?: boolean;
    fetch?: Function;
    cacheObj?: SSRCacheType;
};
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
export type handleGqlCallback = (query: UrGqlQuery, variables?: UrGqlVariables, options?: GqlResultOptions) => {
    execute: () => Promise<OperationResultOrData>;
    results: () => Promise<OperationResultOrData>;
};
