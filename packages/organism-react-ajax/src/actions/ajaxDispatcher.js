'use strict';

import {Dispatcher} from 'reshow-flux';

const instance = new Dispatcher();
export default instance;

export const ajaxDispatch = instance.dispatch.bind(instance);
