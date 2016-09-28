import React,{Component} from 'react'; 

/**
 * Production please use
 * import Animate from "organism-react-animate"
 */
import {
    Monitor,
    Browser,
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
                <div style={{margin:'10px'}}><Monitor /></div>
                <Browser />
            </div>
        );
    }
}

export default Index;
