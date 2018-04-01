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

const getUrl = (key, url) =>
{
    url = resetUrl(url);
    const reg = getKeyReg(key);
    const exec = reg.exec(url);
    return (!exec) ?
        '':
        decodeURIComponent(exec[3]); 
}

const unsetUrl = (key, url) =>
{
    const reg = getKeyReg(key);
    url = resetUrl(url);
    const exec = reg.exec(url);
    if (exec) {
        url = (exec[2]==='?') ? 
            url.replace(reg,'?'):
            url.replace(reg,'');
    }
    return url;
}

const setUrl = ( key, value, url, KeepRawValue)=>
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

export {getUrl, unsetUrl};
export default setUrl;
