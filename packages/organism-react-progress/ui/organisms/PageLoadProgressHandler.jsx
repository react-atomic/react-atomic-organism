import React, {Component} from 'react'; 
import { ajaxStore } from 'organism-react-ajax';
import { Container } from 'reduce-flux';
import { popupDispatch } from 'organism-react-popup';
import { Progress, SemanticUI } from 'react-atomic-molecule';

import {ProgressBar} from '../../src/index';


class PageLoadProgressHandle extends Component
{
    _timer = null;


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

    static defaultProps={
        name: 'processBar',
        gap: 200
    };

    componentDidMount()
    {
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: this 
            }
        });
    }

    complete = () =>{
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

    start = (pause, gap)=>
    {
        if (this._timer) {
            return false;
        }
        if (!gap) {
            gap = this.props.gap;
        }
        if (!pause || pause > 100) {
            pause = 100;
        }
        this._start(pause);
        this._timer = setInterval(()=>{
            this._start(pause);
        }, gap);
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

    render()
    {
        const {percent} = this.state;
        let bar = <Progress
            style={Styles.progress}
            barProps={{
                style: Styles.bar
            }}
            percent={percent}
        />;
        return bar; 
    }
}

/*
      let bar = <SemanticUI
          className="float-progress-bar"
          style={{...Styles.floatBar, ...{
                opacity: this.state.opacity
          }}}
          styles={injects.floatBar}
       >
          <ProgressBar 
            style={Styles.bar}
            percent={this.state.percent}
          />
      </SemanticUI>;
 */

export default Container.create(PageLoadProgressHandle);

const Styles = {
    progress: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transition: ['opacity 500ms linear']
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

