// @ts-check
import "array.polyfill";
import { hasWin } from "win-doc";

class NonWorker {
  /**
   * @type {function[]}
   */
  callbacks = [];

  /**
   * @param {any} callback
   */
  constructor(callback) {
    /**
     * Call from inside worker
     * @param {any} data
     */
    this.post = (data) => {
      const e = { data };
      this.callbacks.forEach((c) => c(e));
    };

    this.onmessage = callback;

    if (!hasWin()) {
      try {
        onmessage = callback;
      } catch (e) {
        console.error(e);
      }
      try {
        const post = postMessage;
        if (post) {
          // only trigger for worker
          // use case: https://github.com/react-atomic/react-atomic-organism/blob/main/packages/organism-react-ajax/src/stores/ajaxStore.js#L23-L27
          post({ type: "ready" });
          /**
           * Replace really woker post (insider)
           */
          this.post = post;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Register for outside
   * @param {string} _type
   * @param {function} callback
   */
  addEventListener = (_type, callback) => this.callbacks.push(callback);

  /**
   * Call from outside worker
   * @param {any} data
   */
  postMessage = (data) => {
    const e = { data };
    this.onmessage(e);
  };
}

export default NonWorker;
