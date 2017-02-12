import React, {Component} from 'react'; 
import { SemanticUI, Unsafe } from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import {reshow, pageStore} from 'reshow';
import get from 'get-object-value';
import {ajaxDispatch, ajaxStore} from 'organism-react-ajax';

import i13nStore from '../../src/stores/i13nStore';
import {i13nDispatch} from '../../src/actions/i13nDispatcher';

const keys = Object.keys;

class MonitorPvid extends Component
{
    static getStores()
    {
        return [pageStore];
    }

    static calculateState(prevState)
    {
        const pvid = pageStore.getState().get('pvid');
        return {
            pvid: pvid,
            I13N: get(pageStore.getMap('data'), ['I13N'])
        };
    }

    updatePvid(pvid, I13N)
    {
        if (!pvid) {
            return;
        }
        i13nDispatch({
            type: 'config/set',
            params: {
                pvid: pvid,
                I13N: I13N
            }
        });
    }

    componentDidMount() 
    {
        const {pvid, I13N} = this.state;
        this.updatePvid(pvid, I13N);
    }

    componentDidUpdate(prevProps, prevState)
    {
        const {pvid, I13N} = this.state;
        if (prevState.pvid !== pvid) {
            this.updatePvid(pvid, I13N);
        }
    }

    render()
    {
        return null;
    }
}

const MonitorPvidContainer = reshow(MonitorPvid);

class MonitorBrowserBF extends Component
{
    static getStores()
    {
        return [ajaxStore];
    }

    componentDidUpdate(prevProps, prevState)
    {
        const {currentLocation} = this.state;
        if (prevState.currentLocation !== currentLocation) {
            setTimeout(()=>{
                i13nDispatch({
                    type: 'action',
                    params: {
                        action: 'bfChange',
                        before: prevState.currentLocation,
                        after: currentLocation
                    }
                });
            },0);
        }
    }

    static calculateState(prevState)
    {
        return {
            currentLocation: ajaxStore.getState().get('currentLocation')
        };
    }

    render()
    {
        return null;
    }
}

const MonitorBrowserBFContainer = reshow(MonitorBrowserBF);

class I13nElement extends Component
{
    static getStores()
    {
        return [i13nStore];
    }

    static calculateState(prevState)
    {
        const state = i13nStore.getState();
        let I13N = state.get('I13N'); 
        if (I13N && I13N.toJS) {
            I13N = I13N.toJS();
        }
        return {
            pvid: state.get('pvid'),
            I13N: I13N
        };
    }

    update()
    {
        const self = this;
        const {src} = this.props;
        const {pvid, I13N} = this.state;
        let query = {
           pvid: pvid,
           url: document.URL,
           params: I13N
        };
        if (window.startUpTime) {
            query.sp = (new Date().getTime()) - window.startUpTime;
        }
        setTimeout(()=>{
            ajaxDispatch({
                type: 'ajaxPost',
                params: {
                   url: src+'view',
                   query: query,
                   callback: (json,text) => {
                        self.setState({
                            iframe: text
                        });
                   },
                   disableProgress: true 
                }
            });
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        const {pvid} = this.state;
        if (prevState.pvid !== pvid) {
            this.update();
        }
    }

    componentDidMount() 
    {
        const {src} = this.props;
        i13nDispatch({
            type: 'config/set',
            params: {
                src: src,
                element: this
            }
        });
    }

    render()
    {
        const {iframe} = this.state;
        let thisIframe;
        if (iframe) {
            thisIframe = (
                <Iframe style={Styles.iframe} ref={el=>this.iframe=el}>
                    <Unsafe>{iframe}</Unsafe>
                </Iframe>
            );
        }
        return (
        <SemanticUI>
            <MonitorPvidContainer />
            <MonitorBrowserBFContainer />
            {thisIframe}
        </SemanticUI>
        );
    }
}

export default reshow(I13nElement);

const Styles = {
    iframe: {
        width: 1,
        height: 1,
        position: 'absolute',
        top: -999
    }
};

