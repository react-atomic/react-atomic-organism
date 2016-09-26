import React,{Component} from 'react'; 

/**
 * Production please use
 * import Animate from "organism-react-animate"
 */
import {
    PopupModal,
    PopupDom,
    PopupClick
} from "../../src/index"

class Index extends Component
{

    render()
    {
        return (
            <div>

            <PopupClick
                style={Styles.click}
                popup={()=>{
                    return <PopupModal show={true}>
                        xxx
                    </PopupModal>;
                }}
                container={<a />}
            >show</PopupClick>
            <PopupDom />
            </div>
        );
    }
}

const Styles = {
    click: {
        color: 'blue',
        textDecoration: 'underline'
    }
};

export default Index;
