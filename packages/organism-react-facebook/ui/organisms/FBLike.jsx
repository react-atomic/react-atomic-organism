/**
 * FB Like Doc
 * https://developers.facebook.com/docs/plugins/like-button
 */

import React, {Component, createElement, cloneElement, isValidElement} from 'react'; 
import FBIcon from 'ricon/Facebook';
import {reactStyle, Icon, SemanticUI} from 'react-atomic-molecule';

const keys = Object.keys;

class FBLike extends Component
{
   static defaultProps = {
    linkComponent: 'a' 
   };

   constructor(props) {
        super(props);
        this.state = {
            load: 0
        };
   }

   update()
   {
       const {page, params} = this.props;
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
       if (this.src === src) {
            return;
       }
       let iframe = ( 
            <SemanticUI 
                atom="iframe"
                src={src}
                refCb={d=>this.iframe=d}
                style={Styles.iframe}
                allowTransparency="true"
                onLoad={()=>{
                    console.log('fb like load');
                }}
            />
       );
        this.src = src;
        this.setState({
            iframe:null
        });
        setTimeout(()=>{
            this.setState({
                iframe: iframe
            });
        }, 300);
   }

   componentDidUpdate(prevProps, prevState)
   {
        this.update();
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
       const {page, linkComponent} = this.props;
       if (!state.load) {
           return null;
       } 
       let build;
       let linkParams = {
            href: page 
       };
       if (isValidElement(linkComponent)) {
            build = cloneElement;
            linkParams.target = '_blank';
       } else {
            build = createElement;
       }
       let pageLink = build(
            linkComponent,
            linkParams,
            <FBIcon style={Styles.svg}/>
       );
       return (
        <SemanticUI style={Styles.container}>
            <Icon style={Styles.icon}
                styles={reactStyle({
                    boxShadow: ['5px 0 1em #ddd']
                },null, false)}>
                {pageLink}
            </Icon>
            {state.iframe}
        </SemanticUI>
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
