'use strict';

import {Dispatcher} from 'reduce-flux';

const instance = new Dispatcher();
export default instance;

export const i13nDispatch = instance.dispatch.bind(instance);
