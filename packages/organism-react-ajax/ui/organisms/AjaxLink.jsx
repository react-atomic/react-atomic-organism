import React from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import AjaxBase from '../organisms/AjaxBase';
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/ajaxDispatcher';

class AjaxLink extends AjaxBase
{
    static defaultProps = {
        updateUrl: true,
        disableRandom: false
    }

    handleClick = e => {
        const {target, onClick} = this.props;
        if ('_blank' !== target) {
            e.preventDefault();
        }
        if ('function' === typeof onClick) {
            onClick(e);
        }
        if ('_blank' !== target) {
            const href = e.currentTarget.href;
            this.go(href);
        }
    }

    go(url) {
        const { callback, errorCallback, updateUrl, disableRandom} = this.props;
        ajaxDispatch({
            type: 'ajaxGet',
            params: {
                disableAjax: !this.isRunAjax(),
                url,
                updateUrl,
                disableRandom,
                callback,
                errorCallback,
            }
        });
    }

    render() {
        const { callback, errorCallback, path, href, updateUrl, disableRandom, ...rest } = this.props;
        const thisHref = ajaxStore.getRawUrl({
            path: path,
            url: href
        });
        return (
            <SemanticUI
                atom="a"
                href={thisHref}
                {...rest}
                onClick={this.handleClick}
            />
        );  
    }
}

export default AjaxLink;
