import { Dispatcher } from "reshow-flux";

const instance = new Dispatcher();
export default instance;

export const popupDispatch = instance.dispatch.bind(instance);
