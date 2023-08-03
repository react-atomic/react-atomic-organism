// @ts-check

import { FUNCTION, UNDEFINED, T_UNDEFINED } from "reshow-constant";

/**
 * @param {Function|any} maybeFunc
 * @param {any[]|null} [functionArguments]
 * @param {any} [scope]
 * @param {any} [defaultReturns]
 * @returns {any}
 */
const callFunc = (
  maybeFunc,
  functionArguments = [],
  scope = T_UNDEFINED,
  defaultReturns = T_UNDEFINED
) =>
  FUNCTION === typeof maybeFunc
    ? maybeFunc.apply(scope, functionArguments)
    : UNDEFINED !== typeof defaultReturns
    ? defaultReturns
    : maybeFunc;

export default callFunc;
