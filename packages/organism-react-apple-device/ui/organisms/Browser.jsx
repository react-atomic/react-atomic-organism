import React from 'react';

import { assign } from 'react-atomic-molecule';

const Bar = (props)=> 
    <div style={Styles.bar}>
        <ActionButtons />
        <URL />
    </div>

const Button = (props)=>
    <div style={assign({
            width:props.size+'px',
            height:props.size+'px',
            borderRadius:props.size+'px',
            marginLeft:props.size+'px'
        },Styles.button,props.style)}
    />

Button.defaultProps = {
    size: 10 
};

const ActionButtons = ()=>
    <div style={Styles.buttons}>
        <Button />
        <Button style={{background:'#fcae52'}} />
        <Button style={{background:'#66b34e'}}/>
    </div>

const URL = (props)=> 
    <div style={Styles.url} />

const Browser = (props)=> {
    const {children, style, ...others} = props;
    return (
    <div {...others} style={assign({},Styles.container,style)}>
        <Bar/>
        {children}
    </div>
    );
};

export default Browser;

const Styles = {
    container: {
        minWidth: '240px',
        minHeight: '180px',
        background: '#fff',
        border: '2px solid #f1f1f1',
        borderTop: '30px solid #f4f5f7',
        borderRadius: '10px',
        position: 'relative'
    },
    bar: {
        position: 'absolute',
        top: '-20px',
        width: '100%'
    },
    buttons: {
        position: 'relative',
        top: '-3px',
        textAlign: 'left',
    },
    button: {
        display: 'inline-block',
        background: '#fc5254',
    },
    url: {
        position: 'absolute',
        background: '#fff',
        borderRadius: '3px',
        height: '13px',
        top: '0',
        left: '80px', 
        right: '10px',
    }
};
