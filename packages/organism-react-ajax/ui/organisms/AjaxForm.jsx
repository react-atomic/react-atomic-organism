import React, {Component} from 'react'; 
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';
import { SemanticUI } from 'react-atomic-molecule';

class AjaxForm extends Component
{

    handleOnSubmit(e) {
        e.preventDefault();
        let formDom = e.target;
        let elements = formDom.elements;
        let action = formDom.action;
        var el;
        var formParams = {};
        for (let i=0, j=elements.length; i < j; i++ ) { 
            el = elements[i];
            if (el.value) {
                formParams[el.name] = el.value;
            }   
        }
        let type;
        let updateUrl = false;
        switch(formDom.method){
            case 'get':
                type = 'ajaxGet'; 
                updateUrl = this.props.updateUrl;
                break;
            case 'post':
            default:
                type = 'ajaxPost';
                break;
        }

        ajaxDispatch({
            type: type,
            params: {
                url: action,
                updateUrl: updateUrl,
                query: formParams,
                callback: this.props.callback,
                errorCallback: this.props.errorCallback
            }
        });
    }


    render() {
        const {path, callback, errorCallback, ...rest} = this.props;
        let baseUrl = ajaxStore.getState().get('baseUrl')+path;
        return (
            <SemanticUI
                atom="form"
                action={baseUrl}
                {...rest}
                onSubmit={this.handleOnSubmit.bind(this)}
            />
        );  
    }
}

export default AjaxForm;
