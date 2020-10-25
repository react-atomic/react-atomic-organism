"use strict";

const PERMISSION_GRANTED = "granted";
const PERMISSION_DENIED = "denied";
let win;

const getChromeVersion = () => {
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : false;
};

const isSupport = () => {
  if (-1 === document.location.protocol.indexOf("https")) {
    if (getChromeVersion() >= 62) {
      // https://developers.google.com/web/updates/2017/09/chrome-62-deprecations#remove_usage_of_notifications_from_insecure_iframes
      console.error(
        "Chrome 62 not allow notification permission at insecure conection."
      );
      return false;
    }
  }
  if ("Notification" in win) {
    return true;
  } else {
    console.log("Not support Notification!");
    return false;
  }
};

const request = (grantedCallback, deniedCallback) => {
  if (!isSupport()) {
    return false;
  }
  if (typeof deniedCallback !== "function") {
    deniedCallback = (permission) => {
      console.error("Permission denied. [" + permission + "]");
    };
  }
  Notification.requestPermission((permission) => {
    const isGranted = permission === PERMISSION_GRANTED;
    if (isGranted) {
      if (grantedCallback) {
        grantedCallback(permission);
      }
    } else {
      deniedCallback(permission);
    }
  });
};

const notify = (text, params, callback) => {
  request((permission) => {
    const notification = new Notification(text, params);
    if (typeof callback === "function") {
      callback(notification, permission);
    }
  });
};

if ("undefined" !== typeof window) {
  win = window;
  win.webNotify = notify;
}

export default notify;
export { request };
