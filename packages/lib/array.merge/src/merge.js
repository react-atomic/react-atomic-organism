const isArray = Array.isArray;

const arrayMerge = (...args) => {
  let arg1 = args.shift();
  if (!isArray(arg1)) {
    arg1 = [arg1];
  }
  args.forEach(a => {
    if (null === a || 'undefined' === typeof a) {
      return;
    }
    if (isArray(a)) {
      arg1 = arg1.concat(a);
    } else {
      arg1.push(a);
    }
  });
  return arg1;
};

export default arrayMerge;
