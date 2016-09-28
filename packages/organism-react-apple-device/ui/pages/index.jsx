import React from 'react'; 

/**
 * Production please use
 * import {...xxx} from "organism-react-apple-device"
 */
import {
    Monitor,
    Browser,
} from "../../src/index"

const Index = (props)=>{
    return (
        <div style={{margin:'10px'}}>
            <Monitor style={{marginBottom:'10px'}} />
            <Browser />
        </div>
    );
};

export default Index;
