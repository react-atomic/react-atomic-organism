import React, {Component} from 'react'; 
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

let pages={};

class AjaxPage extends Component
{
    static defaultProps = {
        ajax: true,
        themes: {}
    }

    constructor(props) {
        super(props);
        ajaxDispatch({
            type: 'config/set',
            params: props 
        });
    }

    componentDidMount() {
        const updateWithUrl = (url)=>{
            const pageState = ajaxStore.getState();
            if (pageState.get('url')!==url) {
                ajaxDispatch({
                    type: 'ajaxGet',
                    params: {
                        url: url 
                    }
                });
                window.scrollTo(0,0);
            }
        };
        setTimeout(()=>{
            ajaxDispatch({
                type: 'config/set',
                params: {
                    updateWithUrl: updateWithUrl
                }
            });
        });
        window.onpopstate = (e)=> {
            const pageState = ajaxStore.getState();
            const updateWithUrl = pageState.get('updateWithUrl');
            updateWithUrl(document.URL);
        };
    }

    render() {
        const {themes, themePath, baseUrl} = this.props;
        let thisThemePath = themePath;
        if ('undefined' === typeof themes[thisThemePath]) {
            const pageState = ajaxStore.getState();
            thisThemePath = pageState.get('lastThemePath');
            if ('undefined' === typeof themes[thisThemePath]) {
                console.error('can not find themes on ['+themePath+']', themes);
                return null;
            }
        }
        setTimeout(()=>{
            ajaxDispatch({
                type: 'config/set',
                params: {
                    lastThemePath: themePath,
                    baseUrl: baseUrl
                }
            });
        });
        if (!pages[thisThemePath]) {
            const myTheme = themes[thisThemePath];
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
