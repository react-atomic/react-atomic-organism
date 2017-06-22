import React, {PureComponent} from 'react'; 
import seturl, {getUrl} from 'seturl';

class SortLink extends PureComponent
{
    static defaultProps = { component: 'a' };
    handleClick = (e) =>
    {
        const {onClick} = this.props;
        if (onClick) {
            onClick(e);
        }
        const target = e.currentTarget;
        const sort = target.getAttribute('data-sort');
        const sort2 = target.getAttribute('data-sort2');
        const slice = target.getAttribute('data-slice');
        let url = target.getAttribute('data-url') || document.URL;
        url = seturl('sort', sort, url);
        if (sort2) {
            url = seturl('sort2', sort2, url);
            url = seturl('slice', slice, url);
        }
        const oldSort = getUrl('sort');
        let desc = getUrl('desc');
        if (sort === oldSort) {
           desc = (0 === (desc*1)) ? 1 : 0; 
        } else {
            desc = 1;
        }
        url = seturl('desc', desc, url);
        target.href = url;
    }

    render()
    {
        const {component, ...props} = this.props;
        let build;
        if (React.isValidElement(component)) {
            build = React.cloneElement;
        } else {
            build = React.createElement;
        }
        return build(
            component,
            {
                ...props,
                onClick: this.handleClick,
                href: '#'+props['data-sort']
            }
        );
    }
}

export default SortLink;
