import { IS_ARRAY } from "reshow-constant";

const arrayMerge = (...args) => {
  let arg1 = args.shift();
  if (!IS_ARRAY(arg1)) {
    arg1 = [arg1];
  }
  args.forEach((a) => {
    if (null == a) {
      return;
    }
    if (IS_ARRAY(a)) {
      arg1 = arg1.concat(a);
    } else {
      arg1.push(a);
    }
  });
  return arg1;
};

export default arrayMerge;
