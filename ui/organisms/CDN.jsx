import React, {Component} from 'react'; 
import {
    Image
} from 'react-atomic-molecule';
const keys  = Object.keys;

export default class CDN extends Component
{
    render()
    {
        let props = {...this.props}; 
        let propsKeys = keys(props); 
        let key;
        let cdnProps=[];
        for (let i=0,len=propsKeys.length; i<len; i++)
        {
            key = propsKeys[i];
            if ('cdn' === key.substr(0,3)) {
                cdnProps[key.substr(4)] = this.props[key];
                delete props[key];
            }
        }
        let query = cdnProps.map((k,v)=>k+'='+encodeURIComponent(v)).join('&');
        let link = this.props.src.replace(/^(http)?(s)?(\:)?(\/\/)/gi,'');
        let url = '//i2.wp.com/'+ link;
        let src = url+ '?'+ query;
        return (
          <Image {...props} style={{margin: '0 auto'}} src={src} />
        );
    }
}

