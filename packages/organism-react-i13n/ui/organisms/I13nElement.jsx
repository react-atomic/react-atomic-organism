import React, {Component} from 'react'; 
import { SemanticUI, Unsafe } from 'react-atomic-molecule';
import Iframe from 'organism-react-iframe';
import {reshow, pageStore} from 'reshow';
import get from 'get-object-value';
import {ajaxDispatch} from 'organism-react-ajax';

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
            pvid: pvid
        };
    }

    updatePvid(pvid)
    {
        if (!pvid) {
            return;
        }
        i13nDispatch({
            type: 'config/set',
            params: {
                pvid: pvid
            }
        });
    }

    componentDidMount() 
    {
        const {pvid} = this.state;
        this.updatePvid(pvid);
    }

    componentDidUpdate(prevProps, prevState)
    {
        const {pvid} = this.state;
        if (prevState.pvid !== pvid) {
            this.updatePvid(pvid);
        }
    }

    render()
    {
        return null;
    }
}

const MonitorPvidContainer = reshow(MonitorPvid);

class I13nElement extends Component
{
    static getStores()
    {
        return [i13nStore];
    }

    static calculateState(prevState)
    {
        return {
            pvid: i13nStore.getState().get('pvid')
        };
    }

    update()
    {
        const self = this;
        const {src} = this.props;
        const {pvid} = this.state;
        setTimeout(()=>{
            ajaxDispatch({
                type: 'ajaxPost',
                params: {
                   url: src+'view',
                   query: {
                       pvid: pvid,
                       url: document.URL
                   },
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

