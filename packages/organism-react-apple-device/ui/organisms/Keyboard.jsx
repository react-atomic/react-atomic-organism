import React from 'react';

import { assign } from 'react-atomic-molecule';

const keyColor = '#f4f5f7';
const keyboardColor = '#e8ebf0';
const KeyRow = (props) => {
    const height = props.height;
    return (
        <div style={assign({
                height:height,
                background: keyColor
            }, Styles.keyRow, props.style)}>
            <div style={assign({}, Styles.keyRowFirst, {
                borderBottom: height+ 'px solid '+ keyColor,
            })} />
            <div style={assign({},Styles.keyRowLast,{
                borderBottom: height+ 'px solid '+ keyColor,
            })} />
        </div>
    );
};

const Keys = (props) =>{ 
    const height = parseInt(props.height,10);
    const top1 = height;
    const top2 = top1 +  height*2;
    const top3 = top2 +  height*2;
    const top4 = top3 +  height*2;
    return (
        <div style={{position:'relative'}}>
            <KeyRow height={height} style={{top:top1+'px'}} />
            <KeyRow height={height} style={{top:top2+'px',  left:'-1px', right:'-1px'}} />
            <KeyRow height={height} style={{top:top3+'px',  left:'-3px', right:'-3px'}} />
            <KeyRow height={height} style={{top:top4+'px',  left:'-5px', right:'-5px'}} />
        </div>
    );
}

const Keyboard = (props) =>{ 
    const height = props.height;
    const divHeight = Math.floor(height / 8);
    return (
        <div style={assign(
            {},
            Styles.container, 
            {
                height: height,
                background: keyboardColor,
            },
            props.style
        )}>
            <div className="left" style={assign(
                {
                    borderBottom: height+ 'px solid '+ keyboardColor,
                },
                Styles.left,
            )} />
            <div className="btm" style={assign({}, Styles.btm, {
                height: divHeight+'px',
                bottom: '-'+ divHeight+ 'px'
            })} />
            <Keys height={divHeight} />
            <div className="right" style={assign(
                {
                    borderBottom: height+ 'px solid '+ keyboardColor,
                },
                Styles.right,
            )} />
        </div>
    );
}

Keyboard.defaultProps = {
    height: 35 
};

export default Keyboard;

const Styles = {
    container: {
        position: 'relative',
        width: '216px',
    },
    right: {
        borderRight: '14px solid transparent',
        borderLeft: '0 solid transparent',
        position: 'absolute',
        top:0,
        right: '-14px'
    },
    left: {
        borderRight: '0 solid transparent',
        borderLeft: '14px solid transparent',
        position: 'absolute',
        top:0,
        left: '-14px'
    },
    btm: {
        background: '#d8dbe1',
        position: 'absolute',
        left: '-14px',
        right: '-14px'
    },

    keyRow: {
        position: 'absolute',
        left:0,
        right:0,
        zIndex: 1,
    },

    keyRowFirst: {
        borderRight: '0 solid transparent',
        borderLeft: '3px solid transparent',
        position: 'absolute',
        left: '-3px',
    },
    keyRowLast: {
        borderRight: '3px solid transparent',
        borderLeft: '0 solid transparent',
        position: 'absolute',
        right: '-3px',
    },
};
