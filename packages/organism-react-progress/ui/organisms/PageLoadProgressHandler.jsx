import React, {Component} from 'react'; 
import { ajaxStore } from 'organism-react-ajax';
import { Container } from 'reduce-flux';
import { popupDispatch } from 'organism-react-popup';
import { Progress, SemanticUI } from 'react-atomic-molecule';

class PageLoadProgressHandle extends Component
{
    _timer = null;
    _timerComplete = null;
    _timerReset1 = null;
    _timerReset2 = null;

    static defaultProps={
        name: 'processBar',
        delay: 200,
        isFloat: true,
        ajax: false,
        pause: 90,
        zIndex: 1
    };

    static getStores()
    {
        return [ajaxStore];
    }

    static calculateState(prevState)
    {
        const state = ajaxStore.getState();
        return {
            isRunning: state.get('isRunning')
        };
    }

    constructor(props)
    {
        super(props);
        this.state = {
            percent: 0,
            opacity: 1,
            isLoad: 1
        };
    }

    complete = () =>
    {
        this.pause();
        this.setState({
            percent: 100, 
        });
        this._timerComplete=setTimeout(()=>{
            this.reset();
        },500);
    }

    reset = () =>
    {
        this.setState({
            opacity: 0 
        });
        this._timerReset1 = setTimeout(()=>{
            this.setState({
                percent: 0, 
            });
            this._timerReset2 = setTimeout(()=>{
                this.setState({
                    opacity: 1 
                });
            },500);
        },500);
    }

    pause = () =>
    {
        clearInterval(this._timer);
        clearTimeout(this._timerComplete);
        clearTimeout(this._timerReset1);
        clearTimeout(this._timerReset2);
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
    
    componentWillUnmount()
    {
        this.pause();
        popupDispatch({
            type: 'dom/cleanOne',
            params: {
                popup: this.props.name
            }
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        const {isRunning} = this.state; 
        const self = this;
        if (self.props.ajax && prevState && prevState.isRunning !== isRunning) {
            if (isRunning) {
                setTimeout(()=>{
                    self.start(self.props.pause);
                });
            } else {
                setTimeout(()=>{
                    self.complete();
                });
            }
        }
    }

    componentDidMount()
    {
        this.setState({
            isLoad: 1
        });
    }

    render()
    {
        const {percent, opacity, isLoad} = this.state;
        if (!isLoad) {
            return null;
        }
        const {name, zIndex, isFloat} = this.props;
        let bar = <Progress
            style={{...Styles.progress,...{
                opacity: opacity,
                zIndex: zIndex
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

