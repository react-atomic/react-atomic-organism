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
 * @typedef {object} GetGqlClientOptions
 * @property {string} url
 * @property {boolean} [cache]
 * @property {Function} [fetch]
 * @property {SSRCacheType} [cacheObj]
 */

/**
 * @param {GetGqlClientOptions} props
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
 * @param {GetGqlClientOptions} clientOptions
 * @param {any} query
 * @param {any} [variables]
 * @param {GqlResultOptions} [options]
 */
export const getGqlResult = async (
  clientOptions,
  query,
  variables = {},
  options
) => {
  const {
    isVerbose = false,
    dataExpireSecs = 60,
    errorExpireSecs = 10,
    failExpireSecs = 86400,
    cookResult = (/** @type any*/v) => v,
  } = options || {};
  const rawResult = await getGqlClient(clientOptions, ssrCache)
    .query(query, variables)
    .toPromise();
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
        return isVerbose ? failBack : failBack?.data;
      }
    }
  } else {
    longCache.current.set(nextKey, next);
    longCache.createTime[nextKey] = now;
    resetCache(next.operation.key, now, dataExpireSecs, ssrCache);
  }
  return isVerbose ? next : next?.data;
};

/**
 * @param {GetGqlClientOptions} clientOptions
 * @param {any} query
 * @param {any} [variables]
 * @param {GqlResultOptions} [options]
 */
export const getGqlExecute = async (
  clientOptions,
  query,
  variables = {},
  options
) => {
  const {
    isVerbose = false,
    cookResult = (/** @type any*/v) => v,
  } = options || {};
  const rawResult = await getGqlClient(clientOptions, ssrCache)
    .mutation(query, variables)
    .toPromise();
  const next = cookResult(rawResult);
  return isVerbose ? next : next?.data;
}
