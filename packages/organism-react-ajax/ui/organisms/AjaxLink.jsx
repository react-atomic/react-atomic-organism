import React, {cloneElement, createElement, isValidElement} from 'react'; 
import AjaxBase from '../organisms/AjaxBase';
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/ajaxDispatcher';

class AjaxLink extends AjaxBase
{
    isAlreadyTouchStart = false;

    static defaultProps = {
        updateUrl: true,
        disableRandom: false,
        component: 'a',
    }

    handleClick = onClick => type => e =>
    {
        const {target} = this.props;
        if ('_blank' !== target) {
            e.preventDefault();
        }
        if ('touchStart' === type) {
            this.isAlreadyTouchStart = true;
        } else {
            if (this.isAlreadyTouchStart) {
                this.isAlreadyTouchStart = false;
                return;
            }
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
        const { component, callback, errorCallback, path, href, updateUrl, disableRandom, ...rest } = this.props;
        let {onClick, onTouchStart} = this.props;
        if (true === onTouchStart) {
            onTouchStart = this.handleClick(onTouchStart)('touchStart'); 
        }
        const thisHref = ajaxStore.getRawUrl({
            path: path,
            url: href
        });
        const build = (isValidElement(component)) ?
            cloneElement:
            createElement
            ;
        return build(
           component,
           {
                ...rest,
                href: thisHref,
                onTouchStart,
                onClick: this.handleClick(onClick)('click')
           }
        );
    }
}

export default AjaxLink;
