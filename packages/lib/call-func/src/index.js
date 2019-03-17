import {FUNCTION, UNDEFINED} from 'reshow-constant';

const callFunc = (func, args, scope) =>
  FUNCTION === typeof func ? func.apply(scope, args) : UNDEFINED;

export default callFunc;
