import React, {Component} from 'react'; 

/**
 * Production please use
 * import GeometryAngle from 'organism-react-geometryangle';
 */
import GeometryAngle from "../../src/index"

class Index extends Component
{

    handleStart = ()=>{
       this.el.start(); 
    }

    handleStop = ()=>{
       this.el.stop(); 
    }

    render()
    {
        return (
        <div>
        <GeometryAngle ref={el=>this.el=el} autoStart={true}/>
        <button style={Styles.button} onClick={this.handleStart}>start</button>
        <button style={Styles.button} onClick={this.handleStop}>stop</button>
        </div>
        );
    }
}

export default Index;

const Styles = {
    button: {
        position: 'relative'
    }
};
