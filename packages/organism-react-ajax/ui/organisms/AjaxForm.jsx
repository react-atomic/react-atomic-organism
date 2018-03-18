import React from 'react'; 
import { Form } from 'react-atomic-molecule';
import AjaxBase from '../organisms/AjaxBase';
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/ajaxDispatcher';
import formSerialize from '../../src/lib/formSerialize';

class AjaxForm extends AjaxBase 
{
    static defaultProps = {
        updateUrl: false,
        stop: false
    }

    handleSubmit = (e) => {
        if (this.props.stop) {
            return;
        }
        e.preventDefault();
        const { callback, errorCallback, updateUrl, beforeSubmit, afterSubmit} = this.props;
        let otherParams = {};
        if (beforeSubmit) {
            otherParams = beforeSubmit(e);
            if (!otherParams) {
                otherParams = {};
            }
        }

        if (otherParams.pause) {
            // pause by beforeSubmit
            return false;
        }

        let formDom = e.target;
        let action = formDom.action;
        const formParams = formSerialize(formDom);
        let type;
        switch(formDom.method.toLowerCase()){
            case 'post':
                type = 'ajaxPost';
                break;
            // default method
            // https://www.w3schools.com/tags/att_form_method.asp
            default:
            case 'get':
                type = 'ajaxGet'; 
                otherParams = {
                    ...otherParams,    
                    disableAjax: !this.isRunAjax(),
                    updateUrl
                };
                break;
        }

        ajaxDispatch({
            type: type,
            params: {
                url: action,
                query: formParams,
                callback,
                errorCallback,
                ...otherParams
            }
        });

        if (afterSubmit) {
            afterSubmit(e);
        }
    }


    render() {
        const {
            action,
            path,
            callback,
            errorCallback,
            updateUrl,
            beforeSubmit,
            afterSubmit,
            stop,
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
                onSubmit={this.handleSubmit}
                {...rest}
            />
        );  
    }
}

export default AjaxForm;
