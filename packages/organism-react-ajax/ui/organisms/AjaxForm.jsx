import React, {cloneElement, createElement, isValidElement} from 'react'; 
import AjaxBase from '../organisms/AjaxBase';
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/ajaxDispatcher';
import formSerialize from '../../src/lib/formSerialize';

class AjaxForm extends AjaxBase 
{
    static defaultProps = {
        updateUrl: false,
        stop: false,
        component: 'form',
    }

    handleSubmit = e => {
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
            component,
            ...rest
        } = this.props;
        const thisUrl = ajaxStore.getRawUrl({
            url: action,
            path: path
        });
        const build = (isValidElement(component)) ?
            cloneElement:
            createElement
            ;
        return build(
           component,
           {
                action: thisUrl,
                onSubmit: this.handleSubmit,
                ...rest
            }
        );
    }
}

export default AjaxForm;
