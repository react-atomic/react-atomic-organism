import React, {Component} from 'react'; 
import get from 'get-object-value';

import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

let pages={};

class AjaxPage extends Component
{
    _lastThemePath='';
    
    static defaultProps = {
        ajax: true,
        themes: {}
    }

    constructor(props)
    {
        super(props);
        const updateWithUrl = (url)=>{
            const pageState = ajaxStore.getState();
            if (pageState.get('url')!==url) {
                ajaxDispatch({
                    type: 'ajaxGet',
                    params: {
                        url: url,
                        scrollBack: true
                    }
                });
            }
        };
        /*Need put in constructor else AjaxLink will not get baseUrl*/
        ajaxDispatch({
            type: 'config/set',
            params: {
                ...props,
                updateWithUrl: updateWithUrl
            }
        });
    }

    componentDidMount() {
        const props = this.props;
        setTimeout(()=>{
            if (window.WebSocket && props.webSocketUrl) {
                ajaxStore.initWs(props.webSocketUrl);
            }
        });
        window.onpopstate = (e)=> {
            const updateWithUrl = ajaxStore.getState().get('updateWithUrl');
            updateWithUrl(document.URL);
        };
    }

    render()
    {
        const {themes, themePath, baseUrl} = this.props;
        let thisThemePath = themePath;
        if ('undefined' === typeof themes[thisThemePath]) {
            const pageState = ajaxStore.getState();
            thisThemePath = this._lastThemePath;
            if ('undefined' === typeof themes[thisThemePath]) {
                console.error('Not find themes on ['+themePath+']', themes);
                return null;
            }
        }
        this._lastThemePath = thisThemePath;
        if (!pages[thisThemePath]) {
            const myTheme = themes[thisThemePath];
            if (!myTheme.name) {
                console.error('Not find valid elemet on ['+themePath+']', themes);
                return null;
            }
            let build;
            if (React.isValidElement(myTheme)) {
                build = React.cloneElement;
            } else {
                build = React.createElement;
            }
            pages[thisThemePath] = build(myTheme);
        }
        return pages[thisThemePath];
    }
}

export default AjaxPage;
