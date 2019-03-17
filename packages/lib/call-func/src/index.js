import {FUNCTION} from 'reshow-constant';

const callFunc = (func, args, scope) => {
  if (FUNCTION === typeof func) {
    func.apply(scope, args);
  }
}

export default callFunc;
