const isArray = Array.isArray;
class minMaxHelper {
    max = null
    min = null
    process = locater => data => {
        if (!isArray(data)) {
            return;
        }
        if ('function' !== typeof locater) {
            locater = d => d;
        }
        if (!this.max && !this.min) {
            const firstItem = locater(data.shift());
            this.max = firstItem;
            this.min = firstItem;
        }
        data.forEach(d => {
            d = locater(d);
            if (d > this.max) {
                this.max = d;
            } else if (d < this.min) {
                this.min = d;
            }
        });
    }
    toArray = () => [this.min, this.max]
}

export default minMaxHelper;
