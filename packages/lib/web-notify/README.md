Simple Web Notification
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/web-notify 
   * NPM
      * https://npm.im/web-notify

## Spec
```

import notify from 'web-notify';

notify(text, params)

```
   * Arguments
      * text (Object): Publish message. 
      * params (Array): Other notification parameters 
   * More paramters
      * https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification#Parameters
```

import {request} from 'web-notify';

request(grantedCallback, deniedCallback)

```

   * Description
      * Let user could ask premission manually.
   * Arguments
      * grantedCallback (function): Run after user accept permission
      * deniedCallback (function): Run after user reject permission

### Code:
   * https://github.com/react-atomic/react-atomic-organism/blob/master/packages/lib/web-notify/src/index.js
      
## Example Usage

```

import notify from 'web-notify';

notify('hello');

```

