require("setimmediate");
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
    _bar = null;

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
        },500);
    }

    pause = () =>
    {
        clearInterval(this._timer);
        clearTimeout(this._timerComplete);
        clearTimeout(this._timerReset1);
    }

    start = (pause, delay)=>
    {
        clearInterval(this._timer);
        if (!delay) {
            delay = this.props.delay;
        }
        this._start(pause);
        this._timer = setInterval(()=>{
            this._start(pause);
        }, delay);
    }

    _start = (pause) =>
    {
        if (!pause || pause > 100) {
            pause = 100;
        }
        let end = this.state.percent + 5;
        if (end >= pause) {
            end = pause;
            this.pause();
        }
        if (end >= 100) {
            return this.complete();
        } else {
            this.setState({
                percent: end,
                opacity: 1 
            });
        }
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
        const self = this;
        const {isRunning} = self.state;
        self.setFloat();
        if (self.props.ajax && prevState && prevState.isRunning !== isRunning) {
            setImmediate(()=>{
                if (isRunning) {
                    self.start(self.props.pause);
                } else {
                    self.complete();
                }
            });
        }
    }

    componentDidMount() 
    {
        this.setFloat();
    }

    setFloat()
    {
        setImmediate(()=>{
            const {isFloat} = this.props;
            if (!isFloat) {
                return;
            }
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: this._bar 
                }
            });
        });
    }

    render()
    {
        const {percent, opacity} = this.state;
        const {name, zIndex, isFloat} = this.props;
        this._bar = <Progress
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
            return null;
        } else {
            return this._bar; 
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

