/**
 * FB Like Doc
 * https://developers.facebook.com/docs/plugins/like-button
 */

import React, {Component} from 'react'; 
import FBIcon from 'ricon/Facebook';
import {Icon, reactStyle} from 'react-atomic-molecule';

const keys = Object.keys;

class FBLike extends Component
{
   constructor(props) {
        super(props);
        this.state = {
            load: 0
        };
   }

   componentDidMount()
   {
        this.setState({
            load:1
        });
   }

   render()
   {
       let state = this.state;
       const {page, params} = this.props;
       if (!state.load) {
           return null;
       } 
       let url = '//www.facebook.com/plugins/like.php';
       let thisParams = {
            appId: '1579401905644484',
            action: 'like',
            href: page,
            layout: 'standard',
            share: 'true',
            show_faces: 'true',
            ...params
       };
       let paramArr = [];
       const paramKeys = keys(thisParams);
       paramKeys.forEach((key)=>{
           paramArr.push(key+'='+encodeURIComponent(thisParams[key]));
       });
       const src= url + '?'+ paramArr.join('&');
       return (
        <div style={Styles.container}>
            <Icon style={Styles.icon}
                styles={reactStyle({
                    boxShadow: ['5px 0 1em #ddd']
                },null, false)}>
                <a href={page} target="_blank">
                    <FBIcon style={Styles.svg}/>
                </a>
            </Icon>
            <iframe 
                style={Styles.iframe}
                allowTransparency="true"
                src={src}
                onLoad={()=>{console.log('fb like load');}}
            />
        </div>
       );
   }
}

export default FBLike;

const Styles = {
    container: {
        position: 'relative',
        overflow: 'hidden'
    },
    svg: {
        fill: '#3b5998',
    },
    icon: {
        borderRadius: 5,
        width: 30,
        height: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'pointer'
    },
    iframe: {
        paddingLeft: 50,
        border: 'none',
        overflow: 'hidden',
        width:'100%',
        maxWidth: '100%',
        maxHeight: 60
    }
};
