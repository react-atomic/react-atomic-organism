import React, {Component} from 'react'; 
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

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
        ajaxDispatch({
            type: 'config/set',
            params: {
                lastThemePath: themePath,
                baseUrl: baseUrl
            }
        });
        return themes[thisThemePath];
    }
}

export default AjaxPage;
