'use strict';

import {Dispatcher} from 'reshow';

const instance = new Dispatcher();
export default instance;

export const i13nDispatch = instance.dispatch.bind(instance);
