/**
 * Export for unit test only
 * @type {LongCacheType}
 */
export const longCache: LongCacheType;
export function getGqlClient({ url, cache, fetch }: GetGqlClientOptions, cacheObj?: SSRCacheType): import("@urql/core/dist/urql-core-chunk").Client;
export function getGqlResult(clientOptions: GetGqlClientOptions, query: any, variables?: any, options?: GqlResultOptions): Promise<any>;
export function getGqlExecute(clientOptions: GetGqlClientOptions, query: any, variables?: any, options?: GqlResultOptions): Promise<any>;
export type SSRCacheType = {
    current: import("@urql/core").SSRExchange;
    createTime: Record<number, EpochTimeStamp>;
};
export type LongCacheType = {
    current: Map<number, any>;
    createTime: Record<number, EpochTimeStamp>;
};
export type GetGqlClientOptions = {
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
