import React, {PureComponent} from 'react'; 
import get from 'get-object-value';

import {ajaxDispatch} from '../../src/ajaxDispatcher';

let pages={};

class AjaxPage extends PureComponent
{
    _lastThemePath='';
    
    static defaultProps = {
        ajax: true,
        themes: {}
    }

    constructor(props)
    {
        super(props);
        /*Need put in constructor else AjaxLink will not get baseUrl*/
        ajaxDispatch({
            type: 'config/set',
            params: props
        });
    }

    componentDidMount() {
        const props = this.props;
        const win = window;
        setImmediate(()=>{
            if (win.WebSocket && props.webSocketUrl) {
                ajaxDispatch({
                    type: 'ws/init',
                    params: {
                        url: props.webSocketUrl
                    }
                });
            }
        });
        win.onpopstate = e => ajaxDispatch('updateWithUrl');
    }

    render()
    {
        const {themes, themePath, defaultThemePath} = this.props;
        let thisThemePath = themePath || defaultThemePath;
        if ('undefined' === typeof themes[thisThemePath]) {
            thisThemePath = this._lastThemePath;
            if ('undefined' === typeof themes[thisThemePath]) {
                console.error('Not find a theme for name: ['+themePath+']', themes);
                return null;
            }
        }
        this._lastThemePath = thisThemePath;
        if (!pages[thisThemePath]) {
            const myTheme = themes[thisThemePath];
            let build;
            if (React.isValidElement(myTheme)) {
                build = React.cloneElement;
            } else {
                build = React.createElement;
            }
            const builded = build(myTheme);
            if (!React.isValidElement(builded)) {
                console.error('Not findi a valid element for name: ['+themePath+']', themes);
                return null;
            } else {
                pages[thisThemePath] = builded;
            }
        }
        return pages[thisThemePath];
    }
}

export default AjaxPage;
