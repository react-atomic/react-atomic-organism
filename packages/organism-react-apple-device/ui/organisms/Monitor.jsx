import React from 'react';
import { assign } from 'react-atomic-molecule';
import {
    Keyboard
} from "../../src/index"

const Camera = ()=>
<div style={Styles.camera}/>;

const Logo = ()=>
<div style={Styles.logo}/>;

const BaseShadow = ()=>
<div style={Styles.baseShadow}>
    <div style={Styles.baseShadowFirst} />
    <div style={Styles.baseShadowLast} />
</div>

const FootTop = ()=>
<div style={Styles.footTop}>
        <div style={Styles.footTopFirst} />
        <div style={Styles.footTopLast} />
</div>

const FootBottom = ()=>
<div style={Styles.footBottom} />

const Base = ()=>
<div style={Styles.base}>
    <div style={Styles.baseStand}>
        <div style={Styles.baseStandFirst} />
        <div style={Styles.baseStandLast} />
        <BaseShadow />
        <FootTop />
        <FootBottom />
    </div>
</div>

const Screen = (props)=>
<div style={Styles.screen}>
    <Camera />
    <Logo />
    {props.children}
</div>

const Monitor = (props)=>{
    return (
        <div style={assign({}, Styles.container, props.style)}>
            <Screen>{props.children}</Screen>
            <Base />
            <div style={{
                textAlign:'center',
                paddingTop:'10px',
            }}>
                <Keyboard style={{display:'inline-block'}}/>
            </div>
        </div>
    );
};

export default Monitor;

const Styles = {
    container: {
        minWidth: '460px',
        position: 'relative',
        display: 'inline-block',
    },
    screen: {
        minHeight: '280px',
        background: '#ff6860',
        border: '20px solid #474e5d',
        borderRadius: '10px',
        position: 'relative',
    },
    camera: {
        width: '6px',
        height: '6px',
        background: '#a5adbd',
        borderRadius: '6px',
        position: 'absolute',
        left: '50%',
        top: '-10px',
    },
    logo: {
        width: '8px',
        height: '8px',
        borderRadius: '8px',
        background: '#e8ebf0',
        position: 'absolute',
        left: '50%',
        bottom: '-15px',
    },
    base: {
       textAlign: 'center',
    },
    baseStand: {
        width: '90px',
        height: '50px',
        background: '#e8ebf0',
        display: 'inline-block',
        position: 'relative',
    },
    baseStandFirst: {
        borderRight: '0 solid transparent',
        borderBottom: '50px solid #e8ebf0',
        borderLeft: '13px solid transparent',
        left: '-13px',
        position: 'absolute',
    },
    baseStandLast: {
        borderRight: '13px solid transparent',
        borderBottom: '50px solid #e8ebf0',
        borderLeft: '0 solid transparent',
        right: '-13px',
        position: 'absolute',
    },
    baseShadow: {
        background: '#d8dbe1',
        height: '12px'
    },
    baseShadowFirst: {
        borderRight: '0 solid transparent',
        borderBottom: '12px solid #d8dbe1',
        borderLeft: '3px solid transparent',
        left: '-3px',
        position: 'absolute',
    },
    baseShadowLast: {
        borderRight: '3px solid transparent',
        borderBottom: '12px solid #d8dbe1',
        borderLeft: '0 solid transparent',
        right: '-3px',
        position: 'absolute',
    },
    footTop: {
        width: '100%',
        height: '5px',
        position: 'absolute',
        bottom: '5px',
        background: '#e8ebf0',
    },
    footTopFirst: {
        borderRight: '0 solid transparent',
        borderBottom: '5px solid #e8ebf0',
        borderLeft: '16px solid transparent',
        left: '-26px',
        position: 'absolute',
    },
    footTopLast: {
        borderRight: '16px solid transparent',
        borderBottom: '5px solid #e8ebf0',
        borderLeft: '0 solid transparent',
        right: '-26px',
        position: 'absolute',
    },
    footBottom: {
        width: '142px',
        height: '5px',
        position: 'absolute',
        bottom: '0',
        left: '-26px',
        background: '#e8ebf0',
    }        
};
