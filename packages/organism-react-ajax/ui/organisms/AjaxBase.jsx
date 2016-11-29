import React, {Component} from 'react'; 
import ajaxStore from '../../src/stores/ajaxStore';

class AjaxBase extends Component
{
    isRunAjax()
    {
        if (this.props.ajax) {
            return this.props.ajax;
        }
        const state = ajaxStore.getState();
        return state.get('ajax');
    }
}

export default AjaxBase;
