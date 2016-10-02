import React, {Component} from 'react'; 
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

class AjaxPage extends Component
{
    constructor(props) {
        super(props);
        ajaxDispatch({
            type: 'config/set',
            params: this.props 
        });
    }

    componentDidMount() {
        window.onpopstate = function (e) {
            let pageState = ajaxStore.getState();
            let url = document.URL;
            if (pageState.get('url')!==url) {
                ajaxDispatch({
                    type: 'ajaxGet',
                    params: {
                        url: url 
                    }
                });
            }
        }
    }

    render() {
        let themePath = this.props.themePath;
        if ('undefined' === typeof this.props.themes[themePath]) {
            if (!themePath) {
                let pageState = ajaxStore.getState();
                themePath = pageState.get('lastThemePath');
            }
            if ('undefined' === typeof this.props.themes[themePath]) {
                console.log('can not find themes on ['+this.props.themePath+']', this.props.themes);
                return null;
            }
        }
        ajaxDispatch({
            type: 'config/set',
            params: {
                lastThemePath: themePath
            }
        });
        return this.props.themes[themePath];
    }
}

export default AjaxPage;
