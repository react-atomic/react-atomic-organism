// @ts-check

import { FUNCTION, UNDEFINED, T_UNDEFINED } from "reshow-constant";

/**
 * @param {Function|any} maybeFunc
 * @param {Array} args
 * @param {any} scope
 * @param {any} def
 * @returns {any}
 */
const callFunc = (
  maybeFunc,
  args = [],
  scope = T_UNDEFINED,
  def = T_UNDEFINED
) =>
  FUNCTION === typeof maybeFunc
    ? maybeFunc.apply(scope, args)
    : UNDEFINED !== typeof def
    ? def
    : maybeFunc;

export default callFunc;
