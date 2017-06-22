/**
 * FB Like Doc
 * https://developers.facebook.com/docs/plugins/like-button
 */

import React, {Component, createElement, cloneElement, isValidElement} from 'react'; 
import FBIcon from 'ricon/Facebook';
import LinkIcon from 'ricon/Link';
import {lazyInject, Icon, SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';

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
        injects = lazyInject (
            injects,
            InjectStyles
        );
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
       const {page, params, linkComponent} = this.props;
       if (!state.load) {
           return null;
       } 
       const href = get(params, ['href']);
       let build;
       if (isValidElement(linkComponent)) {
            build = cloneElement;
       } else {
            build = createElement;
       }
       let fansLink = build(
            linkComponent,
            {
                target: '_blank',
                href: page,
            },
            <FBIcon style={Styles.fbSvg}/>
       );
        let pageLink;
       if (href && page !== href) {
           pageLink = ( 
               <Icon styles={injects.icon} style={{left:0}}>
                   {build( linkComponent, { href: href}, <LinkIcon style={Styles.linkSvg}/>)}
               </Icon>
           );
       }
       return (
        <SemanticUI style={Styles.container}>
            <Icon styles={injects.icon}>
                {fansLink}
            </Icon>
            {pageLink}
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
    fbSvg: {
        fill: '#3b5998',
    },
    linkSvg: {
        fill: '#586069',
    },
    iframe: {
        paddingLeft: 70,
        border: 'none',
        overflow: 'hidden',
        width:'100%',
        maxWidth: '100%',
        maxHeight: 60
    }
};

let injects;
const InjectStyles = {
    icon: [{
        borderRadius: 5,
        width: 30,
        height: 30,
        position: 'absolute',
        top: 0,
        left: 30,
        cursor: 'pointer',
        boxShadow: ['5px 0 1em #ddd']
    }],
};
