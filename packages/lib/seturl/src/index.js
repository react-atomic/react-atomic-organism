'use strict';

import getKeyReg from './getKeyReg';

const resetUrl = (url) =>
{
    if (!url) {
        return document.URL;
    } else {
        return url;
    }
}

const seturl = ( key, value, url, KeepRawValue)=>
{
    const reg = getKeyReg(key);
    if (!KeepRawValue) {
       value = encodeURIComponent(value);
    }
    url = resetUrl(url);
    url = reg.test(url) ?
        url.replace(reg,"$1"+value) :
        url+ ( (-1 === url.indexOf('?')) ? '?' : '&' )+ key+ '='+ value;
    return url;
}

const getUrl = (key, url) =>
{
    url = resetUrl(url);
    const reg = getKeyReg(key);
    const exec = reg.exec(url);
    return (!exec) ?
        '':
        decodeURIComponent(exec[2]); 
}
export {getUrl};
export default seturl;
