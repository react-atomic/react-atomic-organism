import React, {Component} from 'react'; 

/**
 * Production please use
 * import Typing from "organism-react-typing"
 */
import Typing from "../../src/index"


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
            <Typing ref={el=>this.el=el} background="#000" color="#fff">
                <div>abc</div>
                <div>def</div>
            </Typing>
            <button onClick={this.handleStart}>Start</button>
            <button onClick={this.handleStop}>Stop</button>
        </div>
        );
    }
}

export default Index;
