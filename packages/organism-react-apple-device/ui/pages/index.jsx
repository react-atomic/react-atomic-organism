import React,{Component} from 'react'; 

/**
 * Production please use
 * import Animate from "organism-react-animate"
 */
import {
    Monitor,
    Keyboard
} from "../../src/index"


class Index extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {
        };
    }

    render()
    {
        return (
            <div style={{margin:'10px'}}>
                <Monitor />
            </div>
        );
    }
}

export default Index;
