import { expect } from "chai";
import List from "../list";

describe("dagre/data/List", () => {
  let list;
  beforeEach(function () {
    list = new List();
  });
  describe("dequeue", () => {
    it("returns undefined with an empty list",  () => {
      expect(list.dequeue()).to.be.undefined;
    });

    it("unlinks and returns the first entry",  () => {
      const obj = {};
      list.enqueue(obj);
      expect(list.dequeue()).to.equal(obj);
    });

    it("unlinks and returns multiple entries in FIFO order", () => {
      const obj1 = {};
      const obj2 = {};
      list.enqueue(obj1);
      list.enqueue(obj2);

      expect(list.dequeue()).to.equal(obj1);
      expect(list.dequeue()).to.equal(obj2);
    });

    it("unlinks and relinks an entry if it is re-enqueued", () => {
      const obj1 = {};
      const obj2 = {};
      list.enqueue(obj1);
      list.enqueue(obj2);
      list.enqueue(obj1);

      expect(list.dequeue()).to.equal(obj2);
      expect(list.dequeue()).to.equal(obj1);
    });

    it("unlinks and relinks an entry if it is enqueued on another list", () => {
      const obj = {};
      const list2 = new List();
      list.enqueue(obj);
      list2.enqueue(obj);

      expect(list.dequeue()).to.be.undefined;
      expect(list2.dequeue()).to.equal(obj);
    });

    it("can return a string representation", () => {
      list.enqueue({ entry: 1 });
      list.enqueue({ entry: 2 });

      expect(list.toString()).to.equal('[{"entry":1}, {"entry":2}]');
    });
  });
});
