// @ts-check

import { createClient, ssrExchange, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import { getTimestamp, expireCallback } from "get-random-id";
import { NEW_OBJ } from "reshow-constant";

/**
 * @typedef {object} SSRCacheType
 * @property {import("@urql/core").SSRExchange} current
 * @property {Record<number, EpochTimeStamp>} createTime
 */

/**
 * @typedef {object} LongCacheType
 * @property {Map<number, any>} current
 * @property {Record<number, EpochTimeStamp>} createTime
 */

/**
 * https://github.com/urql-graphql/urql/blob/main/packages/core/src/exchanges/ssr.test.ts
 * @type {SSRCacheType}
 */
const ssrCache = {
  current: ssrExchange({ isClient: false }),
  createTime: NEW_OBJ(),
};

/**
 * Export for unit test only
 * @type {LongCacheType}
 */
export const longCache = {
  current: new Map(),
  createTime: NEW_OBJ(),
};

/**
 * @typedef {object} GqlClientOptions
 * @property {string} url
 * @property {boolean} [cache]
 * @property {Function} [fetch]
 * @property {SSRCacheType} [cacheObj]
 */

/**
 * @param {GqlClientOptions} props
 * @param {SSRCacheType} [cacheObj]
 */
export const getGqlClient = ({ url, cache, fetch }, cacheObj) => {
  const options = {
    url,
    exchanges: [fetchExchange],
  };
  if (null !== fetch) {
    options.fetch = fetch;
  }
  if (cache) {
    options.exchanges.push(
      cacheExchange({}),
      /**@type SSRCacheType */ (cacheObj).current
    );
  }
  const client = createClient(options);
  return client;
};

/**
 * @param {number} key
 * @param {EpochTimeStamp} createTime
 * @param {number} expireSecs
 * @param {SSRCacheType} cacheObj
 */
const resetCache = (key, createTime, expireSecs, cacheObj) => {
  const cacheData = cacheObj.current.extractData();
  const curItem = cacheData[key];
  if (!curItem) {
    return;
  }
  if (!cacheObj.createTime[key]) {
    cacheObj.createTime[key] = createTime;
  }
  expireCallback(cacheObj.createTime[key], expireSecs * 1000, null, () => {
    delete cacheData[key];
    delete cacheObj.createTime[key];
    cacheObj.current = ssrExchange({
      isClient: false,
      initialState: cacheData,
    });
  });
};

/**
 * @typedef {object} GqlResultOptions
 * @property {boolean} [isVerbose]
 * @property {number} [dataExpireSecs]
 * @property {number} [errorExpireSecs]
 * @property {number} [failExpireSecs]
 * @property {function(any):any} [cookResult]
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
 * @callback handleGqlCallback
 * @param {UrGqlQuery} query
 * @param {UrGqlVariables} [variables]
 * @param {GqlResultOptions} [options]
 * @returns {{execute: function():Promise<OperationResultOrData>, results: function():Promise<OperationResultOrData>}}}
 */

/**
 * @param {GqlClientOptions} clientOptions
 * @param {GqlResultOptions} [defaultGqlResultOptions]
 * @returns {handleGqlCallback}
 */
export const handleGql =
  (clientOptions, defaultGqlResultOptions) =>
  (query, variables = {}, options) => {
    const {
      isVerbose = false,
      dataExpireSecs = 60,
      errorExpireSecs = 10,
      failExpireSecs = 86400,
      cookResult = (/** @type OperationResult*/ v) => v,
    } = { ...defaultGqlResultOptions, ...options };
    const clinet = getGqlClient(clientOptions, ssrCache);
    /**
     * @param {{data:any}} next
     * @returns {OperationResultOrData}
     */
    const toVerbose = (next) => (isVerbose ? next : next?.data);

    return {
      execute: async () => {
        const rawResult = await clinet.mutation(query, variables).toPromise();
        return toVerbose(cookResult(rawResult));
      },
      results: async () => {
        const rawResult = await clinet.query(query, variables).toPromise();
        const next = cookResult(rawResult);
        const nextKey = next.operation.key;
        const now = getTimestamp();
        if (next.error) {
          resetCache(nextKey, now, errorExpireSecs, ssrCache);
          if (longCache.current.has(nextKey)) {
            expireCallback(
              longCache.createTime[nextKey],
              failExpireSecs * 1000,
              null,
              () => {
                longCache.current.delete(nextKey);
                delete longCache.createTime[nextKey];
              }
            );
            if (longCache.createTime[nextKey]) {
              const failBack = longCache.current.get(nextKey);
              return toVerbose(failBack);
            }
          }
        } else {
          longCache.current.set(nextKey, next);
          longCache.createTime[nextKey] = now;
          resetCache(next.operation.key, now, dataExpireSecs, ssrCache);
        }
        return toVerbose(next);
      },
    };
  };
