import React, {Component} from 'react'; 
import FBIcon from 'ricon/Facebook';
import {Icon, reactStyle} from 'react-atomic-molecule';

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
       const {page} = this.props;
       if (!state.load) {
           return null;
       } 
       const src = '//www.facebook.com/plugins/like.php?href='+
        page+
        '&amp;width&amp;layout=standard&amp;action=recommend&amp;show_faces=true&amp;share=true&amp;locale=zh_TW&amp;appId=156535691085';
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
        position: 'relative'
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
