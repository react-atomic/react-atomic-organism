import React from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import AjaxBase from '../organisms/AjaxBase';
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

class AjaxLink extends AjaxBase
{
    static defaultProps = {
        updateUrl: true,
        disableRandom: false
    }

    handleOnClick = (e) => {
        e.preventDefault();
        if (this.props.onClick) {
            this.props.onClick();
        }
        const href = e.currentTarget.href;
        this.go(href);
    }

    go(url) {
        ajaxDispatch({
            type: 'ajaxGet',
            params: {
                url: url,
                disableAjax: !this.isRunAjax(),
                updateUrl: this.props.updateUrl,
                disableRandom: this.props.disableRandom
            }
        });
    }

    render() {
        const { path, href, updateUrl, disableRandom, ...rest } = this.props;
        const thisHref = ajaxStore.getRawUrl({
            path: path,
            url: href
        });
        return (
            <SemanticUI
                atom="a"
                href={thisHref}
                {...rest}
                onClick={this.handleOnClick}
            />
        );  
    }
}

export default AjaxLink;
