import {Dispatcher} from 'reshow-flux';

const dispatcher = new Dispatcher();

/**
 * Dispatcher
 */
export default dispatcher;

/**
 * Dispatch 
 *
 * import {urlDispatch} from 'reshow';
 * urlDispatch({xxx:yyy});
 */
export const urlDispatch = dispatcher.dispatch;
