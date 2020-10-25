import { Dispatcher } from "reshow-flux";

const instance = new Dispatcher();
export default instance;

export const navigationDispatch = instance.dispatch;
