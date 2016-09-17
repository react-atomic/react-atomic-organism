import React,{Component} from 'react'; 
import Animate from "../../src/index"

const hello = (<div>Hello world!!</div>);

class Index extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {
            text: hello 
        };
    }

    render()
    {
        return (
            <div>
                <Animate
                    appear="fadeInLeft"
                    enter="fadeInRight"
                    leave="fadeOutRight"
                >
                {this.state.text}    
                </Animate>
                <a href="#" onClick={(()=>{
                    this.setState({
                        text: null
                    });
                }).bind(this)}>leave</a>
                <a href="#" 
                    style={{marginLeft:'10px'}}
                    onClick={(()=>{
                        this.setState({
                            text: hello 
                        });
                    }).bind(this)}
                >enter</a>
            </div>
        );
    }
}

export default Index;
