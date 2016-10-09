import React,{Component} from 'react'; 

/**
 * Production please use
 * import {...xxx} from "organism-react-popup"
 */
import {
    PopupModal,
    PopupElement,
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
            <PopupElement />
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
