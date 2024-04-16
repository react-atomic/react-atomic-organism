// @ts-check

import { Client, ssrExchange, fetchExchange, debugExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import { getTimestamp, expireCallback } from "get-random-id";
import { NEW_OBJ } from "reshow-constant";

/**
 * @typedef {object} SSRCache
 * @property {import("@urql/core").SSRExchange} current
 */

/**
 * @typedef {object} CacheCreateTime
 * @property {Record<number, EpochTimeStamp>} createTime
 */

/**
 * @typedef { SSRCache & CacheCreateTime } SSRCacheType
 */

/**
 * @typedef {object} LongCache
 * @property {Map<number, any>} current
 */

/**
 * @typedef { LongCache & CacheCreateTime } LongCacheType
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
export const getGqlClient = ({ keys = {}, url, fetch, debug }, cacheObj) => {
  /**
   * @type Exchange[]
   */
  const exchanges = [];
  const options = {
    url,
    exchanges,
  };
  if (debug) {
    // Debug must at first item.
    exchanges.push(debugExchange);
  }
  if (null !== fetch) {
    options.fetch = fetch;
  }
  if (cacheObj?.current) {
    exchanges.push(
      /**@type any*/ (cacheExchange({ keys })),
      /**@type SSRCacheType */ (cacheObj).current
    );
  }
  // SSRCacheType must in front of the `fetchExchange
  exchanges.push(fetchExchange);
  options.exchanges = exchanges;
  const client = new Client(options);
  return client;
};

/**
 * @param {number} key
 * @param {EpochTimeStamp} createTime
 * @param {number} expireSecs
 * @param {SSRCacheType} cacheObj
 */
const cleanCache = (key, createTime, expireSecs, cacheObj) => {
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
    } = {
      ...defaultGqlResultOptions,
      ...options,
    };
    let shouldVerbose = isVerbose;
    /**
     * @param {{data:any}} next
     * @param {boolean?} [isVerbose]
     * @returns {OperationResultOrData}
     */
    const toVerbose = (next, isVerbose) =>
      isVerbose || shouldVerbose ? next : next?.data;

    /**
     * @param {boolean?} [isDebug]
     * @param {boolean?} [disableCache]
     */
    const resetClientOptions = (isDebug, disableCache) => {
      const nextClientOptions = { ...clientOptions };
      if (null != isDebug) {
        nextClientOptions.debug = isDebug;
      }
      if (null != disableCache) {
        nextClientOptions.disableCache = disableCache;
      }
      return nextClientOptions;
    };

    return {
      /**
       * @param {boolean?} [isDebug]
       * @param {boolean?} [isVerbose]
       */
      execute: async (isDebug, isVerbose) => {
        const clinet = getGqlClient(resetClientOptions(isDebug, true));
        const rawResult = await clinet.mutation(query, variables).toPromise();
        return toVerbose(cookResult(rawResult), isVerbose);
      },
      /**
       * @param {boolean?} [isDebug]
       * @param {boolean?} [isVerbose]
       * @param {boolean?} [disableCache]
       */
      results: async (isDebug, isVerbose, disableCache) => {
        const nextClientOptions = resetClientOptions(isDebug, disableCache);
        const clinet =
          nextClientOptions.disableCache || !dataExpireSecs
            ? getGqlClient(nextClientOptions)
            : getGqlClient(nextClientOptions, ssrCache);
        const rawResult = await clinet.query(query, variables).toPromise();
        const next = cookResult(rawResult);
        const nextKey = next.operation.key;
        const now = getTimestamp();
        if (next.error) {
          cleanCache(nextKey, now, errorExpireSecs, ssrCache);
          if (
            longCache.current.has(nextKey) &&
            !nextClientOptions.disableCache
          ) {
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
              return toVerbose(failBack, isVerbose);
            }
          }
        } else {
          cleanCache(nextKey, now, dataExpireSecs, ssrCache);
          longCache.current.set(nextKey, next);
          longCache.createTime[nextKey] = now;
        }
        return toVerbose(next, isVerbose);
      },
    };
  };
