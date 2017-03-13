'use strict';

const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';

const isSupport = () =>
{
    if ("Notification" in window) {
        return true;
    } else {
        console.log('Not support Notification!');
        return false;
    }
}

const request = (grantedCallback, deniedCallback) =>
{
    if (!isSupport()) {
        return false;
    }
    window.Notification.requestPermission((permission) => {
        const isGranted = permission === PERMISSION_GRANTED;
        if (isGranted) {
            if (grantedCallback) {
                grantedCallback();
            }
        } else {
            deniedCallback();
        }
    });
}

export {request};

const notify = ( text, params, callback )=>
{
    request(()=>{
        let notification = new Notification(text, params); 
        if (typeof callback === 'function') {
            callback(notification);
        }
    });
}

export default notify;
