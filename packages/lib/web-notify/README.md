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

## Chrome 62 not allow permision on insecure connection
Check the following announce, it not only appear on iframe both apply on all insecure connection (non-https).

* https://developers.google.com/web/updates/2017/09/chrome-62-deprecations#remove_usage_of_notifications_from_insecure_iframes

