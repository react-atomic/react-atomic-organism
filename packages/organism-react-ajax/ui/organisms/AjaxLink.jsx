import { SemanticUI } from 'react-atomic-molecule';
import AjaxBase from '../organisms/AjaxBase';
import ajaxStore from '../../src/stores/ajaxStore';
import {ajaxDispatch} from '../../src/actions/ajaxDispatcher';

class AjaxLink extends AjaxBase
{
    static defaultProps = {
        updateUrl: true
    }

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
                disableAjax: !this.isRunAjax(),
                updateUrl: this.props.updateUrl,
            }
        });
    }

    render() {
        const { path, href, ...rest } = this.props;
        let myHref = ajaxStore.getRawUrl({
            path: path,
            url: href
        });
        return (
            <SemanticUI
                atom="a"
                href={myHref}
                {...rest}
                onClick={this.handleOnClick.bind(this)}
            />
        );  
    }
}

export default AjaxLink;
