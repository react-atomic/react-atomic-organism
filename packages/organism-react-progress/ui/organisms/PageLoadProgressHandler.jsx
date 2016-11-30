import React, {Component} from 'react'; 
import { ajaxStore } from 'organism-react-ajax';
import { Container } from 'reduce-flux';
import { popupDispatch } from 'organism-react-popup';
import { Progress, SemanticUI } from 'react-atomic-molecule';

class PageLoadProgressHandle extends Component
{
    _timer = null;

    static defaultProps={
        name: 'processBar',
        delay: 200,
        isFloat: true
    };

    static getStores()
    {
        return [ajaxStore];
    }

    static calculateState(prevState)
    {

    }

    constructor(props)
    {
        super(props);
        this.state = {
            percent: 0,
            opacity: 1
        };
    }

    complete = () =>
    {
        this.pause();
        this.setState({
            percent: 100, 
        });
        setTimeout(()=>{
            this.reset();
        },500);
    }

    reset = () =>
    {
        this.setState({
            opacity: 0 
        });
        setTimeout(()=>{
            this.setState({
                percent: 0, 
            });
            setTimeout(()=>{
                this.setState({
                    opacity: 1 
                });
            },500);
        },500);
    }

    pause = () =>
    {
        clearInterval(this._timer);
        this._timer = false;
    }

    start = (pause, delay)=>
    {
        if (this._timer) {
            return false;
        }
        if (!delay) {
            delay = this.props.delay;
        }
        if (!pause || pause > 100) {
            pause = 100;
        }
        this._start(pause);
        this._timer = setInterval(()=>{
            this._start(pause);
        }, delay);
    }

    _start = (pause) =>
    {
        let end = this.state.percent + 5;
        if (end >= pause) {
            end = pause;
            this.pause();
        }
        if (end >= 100) {
            return this.complete();
        }
        this.setState({
            percent: end
        });
    }
    
    componentDidMount()
    {
        if (this.props.isFloat) {
        }
    }

    render()
    {
        const {name, isFloat} = this.props;
        const {percent, opacity} = this.state;
        let bar = <Progress
            style={{...Styles.progress,...{
                opacity: opacity
            }}}
            barProps={{
                style: Styles.bar
            }}
            percent={percent}
            name={name}
        />;
        if (isFloat) {
            setTimeout(()=>{
                popupDispatch({
                    type: 'dom/update',
                    params: {
                        popup: bar 
                    }
                });
            });
            return null;
        } else {
            return bar; 
        }
    }
}

export default Container.create(PageLoadProgressHandle);

const Styles = {
    progress: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transition: ['opacity 500ms linear'],
        zIndex: 1
    },
    bar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        display: 'inline-block',
        background: '#77b6ff',
        transition: ['width 500ms ease'],
        boxShadow: ['0 0 10px rgba(119,182,255,0.7)']
    }
};

