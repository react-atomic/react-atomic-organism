import React, {Component} from 'react'; 
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

class AjaxLink extends Component
{

    handleOnClick(e) {
        e.preventDefault();
        let href = e.currentTarget.href;
        this.go(href);
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    go(url) {
        ajaxDispatch({
            type: 'ajaxGet',
            params: {
                url: url,
                updateUrl: true
            }
        });
    }

    render() {
        const { path, href, run, ...rest } = this.props;
        let myHref = href;
        if (!myHref) {
            if (path) {
                let baseUrl = ajaxStore.getState().get('baseUrl');
                myHref = baseUrl+path;
            } else {
                myHref = '#';
            }
        }
        if (run && '#'!==myHref) {
            this.go(myHref);
            return null;
        }
        return (
            <a href={myHref}
                {...rest}
                onClick={this.handleOnClick.bind(this)}
            >
                {this.props.children}
            </a>
        );  
    }
}

export default AjaxLink;
