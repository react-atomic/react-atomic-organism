export default callFunc;
/**
 * @param {Function|any} maybeFunc
 * @param {any[]|null} [functionArguments]
 * @param {any} [scope]
 * @param {any} [defaultReturns]
 * @returns {any}
 */
declare function callFunc(maybeFunc: Function | any, functionArguments?: any[] | null, scope?: any, defaultReturns?: any): any;
