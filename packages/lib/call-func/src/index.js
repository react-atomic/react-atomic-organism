import {FUNCTION} from 'reshow-constant';

const callFunc = (func, args, scope) =>
  FUNCTION === typeof func ? func.apply(scope, args) : undefined;

export default callFunc;
