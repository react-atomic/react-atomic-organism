import React, {Component} from 'react'; 
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

class AjaxPage extends Component
{
    static defaultProps = {
        ajax: true
    }

    constructor(props) {
        super(props);
        ajaxDispatch({
            type: 'config/set',
            params: this.props 
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
        const props = this.props;
        let themePath = props.themePath;
        if ('undefined' === typeof props.themes[themePath]) {
            let pageState = ajaxStore.getState();
            themePath = pageState.get('lastThemePath');
            if ('undefined' === typeof props.themes[themePath]) {
                console.error('can not find themes on ['+props.themePath+']', props.themes);
                return null;
            }
        }
        ajaxDispatch({
            type: 'config/set',
            params: {
                lastThemePath: themePath
            }
        });
        return props.themes[themePath];
    }
}

export default AjaxPage;
