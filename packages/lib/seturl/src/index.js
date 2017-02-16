'use strict';

const seturl = ( key, value, url, KeepRawValue)=>
{
    const reg = new RegExp('([#?&]'+key+'=)[^&#]*');
    if (!KeepRawValue) {
       value = encodeURIComponent(value);
    }
    if (!url) {
        url = document.URL;
    }
    url = reg.test(url) ?
        url.replace(reg,"$1"+value) :
        url+ ( (-1 === url.indexOf('?')) ? '?' : '&' )+ key+ '='+ value;
    return url;
}

export default seturl;
