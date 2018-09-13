require("setimmediate");
import React, {PureComponent, Component} from 'react'; 
import { SemanticUI, Unsafe } from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import {reshow, pageStore} from 'reshow';
import get from 'get-object-value';
import {ajaxStore} from 'organism-react-ajax';

import i13nStore from '../../src/stores/i13nStore';
import {i13nDispatch} from '../../src/index';

const keys = Object.keys;
const urlDecode = decodeURIComponent;
let win;

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
            pvid,
            I13N: get(pageStore.getMap('data'), ['I13N'])
        };
    }

    updatePvid(pvid, I13N)
    {
        if (!pvid) {
            return
        }
        i13nDispatch(
            'config/set',
            { pvid, I13N }
        )
    }

    componentDidMount() 
    {
        const {pvid, I13N} = this.state;
        this.updatePvid(pvid, I13N);
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        const {pvid, I13N} = nextState;
        if (this.state.pvid !== pvid) {
            this.updatePvid(pvid, I13N);
        }
        return false
    }

    render()
    {
        return null
    }
}

const MonitorPvidContainer = reshow(MonitorPvid);

class MonitorBrowserBF extends Component
{
    static getStores()
    {
        return [ajaxStore];
    }

    static calculateState(prevState)
    {
        const ajaxState = ajaxStore.getState()
        return {
            bfApplyUrl: ajaxState.get('bfApplyUrl'),
            toggleBfChange: ajaxState.get('toggleBfChange'),
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        const {bfApplyUrl, toggleBfChange} = this.state;
        const {bfApplyUrl: nextBfApplyUrl, toggleBfChange: nextToggleBfChange} = nextState
        if (toggleBfChange !== nextToggleBfChange) {
            setImmediate(()=>{
                const i13nState = i13nStore.getState();
                i13nDispatch(
                    'action',
                    {
                        I13N: {
                            action: 'bfChange',
                            before: urlDecode(get(i13nState.get('lastUrl'), null, '')),
                            after: urlDecode(nextBfApplyUrl),
                            last: urlDecode(get(bfApplyUrl, null, ''))
                        }
                    }
                )
            })
        }
        return false
    }

    render()
    {
        return null
    }
}

const MonitorBrowserBFContainer = reshow(MonitorBrowserBF);

class I13nElement extends PureComponent
{
    static getStores()
    {
        return [i13nStore];
    }

    static calculateState(prevState)
    {
        const state = i13nStore.getState();
        return {
            pvid: state.get('pvid'),
            I13N: state.get('I13N')
        };
    }

    update()
    {
        const self = this;
        const {I13N} = this.state;
        let query = {};
        if (win && win.startUpTime) {
            query.sp = Math.round(
                (new Date().getTime()) - 
                win.startUpTime
            );
            win.startUpTime = false; //only log in page refresh
        }
        setTimeout(()=>{
            let i13n = I13N
            if (i13n && i13n.toJS) {
                i13n = i13n.toJS()
            }
            i13nDispatch( 
                'view',
                {
                    query,
                    I13N: i13n,
                    callback: (json, text) => {
                        self.setState({
                            iframe: text
                        });
                    },
                }
            )
        }, 500);
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
        win = window;
        win.i13nDispatch = i13nDispatch;
        i13nDispatch(
            'config/set',
            {
                ...this.props,
                element: this
            }
        )
        this.setState({
            isLoad: true
        })
    }

    render()
    {
        const {iframe, isLoad} = this.state;
        if (!isLoad) {
            return null;
        }
        let dIframe;
        if (iframe) {
            dIframe = (
                <Iframe style={Styles.iframe} ref={el=>this.iframe=el}>
                    <Unsafe>{iframe}</Unsafe>
                </Iframe>
            );
        }
        return (
        <SemanticUI>
            <MonitorPvidContainer />
            <MonitorBrowserBFContainer />
            {dIframe}
        </SemanticUI>
        );
    }
}

export default reshow(I13nElement)

const Styles = {
    iframe: {
        width: 1,
        height: 1,
        position: 'absolute',
        top: -99999
    }
}
