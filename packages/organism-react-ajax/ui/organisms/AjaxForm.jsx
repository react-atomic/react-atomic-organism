import React from 'react'; 
import { Form } from 'react-atomic-molecule';
import AjaxBase from '../organisms/AjaxBase';
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

class AjaxForm extends AjaxBase 
{
    static defaultProps = {
        updateUrl: false 
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { callback, errorCallback, updateUrl} = this.props;
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
        let otherParams = {};
        switch(formDom.method){
            case 'get':
                type = 'ajaxGet'; 
                otherParams = {
                    disableAjax: !this.isRunAjax(),
                    updateUrl: updateUrl
                };
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
                query: formParams,
                callback: callback,
                errorCallback: errorCallback,
                ...otherParams
            }
        });
    }


    render() {
        const {
            action,
            path,
            callback,
            errorCallback,
            updateUrl,
            ...rest
        } = this.props;
        const thisUrl = ajaxStore.getRawUrl({
            url: action,
            path: path
        });
        return (
            <Form
                atom="form"
                action={thisUrl}
                {...rest}
                onSubmit={this.handleOnSubmit}
            />
        );  
    }
}

export default AjaxForm;
