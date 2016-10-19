'use strict';

import {Dispatcher} from 'reduce-flux';

const instance = new Dispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './TodoDispatcher';`

export const ajaxDispatch = instance.dispatch.bind(instance);
