import React,{Component} from 'react'; 
import {assign} from 'react-atomic-molecule';

/**
 * Production please use
 * import ScrollAnimate from "organism-react-scroll-animate"
 */
import ScrollAnimate from "../../src/index"

const BlackCircle = (props) => 
    <ScrollAnimate {...props} style={Styles.block}>
        <div 
            style={assign({},Styles.circle,{
                background: '#000',
                color: '#fff',
            })}
        >
            {props.children}
        </div>
    </ScrollAnimate>

const WhiteCircle = (props) =>
    <ScrollAnimate {...props} style={Styles.block}>
        <div 
            style={assign({},Styles.circle,{
                border: '1px solid #000'
            })}
        >
            {props.children}
        </div>
    </ScrollAnimate>


class Index extends Component
{
    render()
    {
        return (
            <div>
                <div style={Styles.row}>
                    <BlackCircle enter="fadeInRight-1000">Hello</BlackCircle>
                    <WhiteCircle enter="fadeInLeft-1000">World</WhiteCircle>
                    <BlackCircle enter="fadeInUp-1000">!!!</BlackCircle>
                </div>
                <div style={Styles.row}>
                    <BlackCircle once={true} enter="fadeInLeft-1000">Hello</BlackCircle>
                    <WhiteCircle enter="fadeInDown-1000">World</WhiteCircle>
                    <BlackCircle once={true} enter="fadeInRight-1000">222</BlackCircle>
                </div>
                <div style={Styles.row}>
                    <BlackCircle enter="fadeOutRight-1000">Hello</BlackCircle>
                    <WhiteCircle enter="fadeOutUp-1000">World</WhiteCircle>
                    <BlackCircle enter="fadeOutLeft-1000">333</BlackCircle>
                </div>
            </div>
        );
    }
}

export default Index;

const size = '100px';
const Styles = {
    row: {
        minHeight: "200px",
        marginBottom:"160px"
    },
    block: {
        display:"inline-block",
        margin: "0 50px",
        minHeight: size,
        minWidth: size
    },
    circle: {
        borderRadius: '50%',
        width: size,
        height: size,
        lineHeight: size,
        textAlign: 'center',
    }
};
