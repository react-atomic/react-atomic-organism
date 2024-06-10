// @ts-check

const isArray = Array.isArray;

class minMaxHelper {
  max = null;
  min = null;
  process =
    (/**@type {Function}*/ locater = (/**@type any*/ d) => d) =>
    (/**@type any*/ data) => {
      if (!isArray(data) || !data.length) {
        return this;
      }
      const thisData = data.concat([]);
      if (!this.max && !this.min) {
        const firstItem = locater(thisData.shift());
        this.max = firstItem;
        this.min = firstItem;
      }
      thisData.forEach((d) => {
        d = locater(d);
        if (isNaN(d)) {
          return;
        }
        if (null != this.max && d > this.max) {
          this.max = d;
        } else if (null != this.min && d < this.min) {
          this.min = d;
        }
      });
      return this;
    };
  toArray = () => [this.min, this.max].filter((n) => null !== n);
}

export default minMaxHelper;
