
const doc = () => document;

const keys = Object.keys;

const inject = (base, isStart) => dNode => {
    if ('function' === typeof base) {
        base = base();
    }
    if (base && (base.nodeName === 'BODY' || base.nodeName === 'HEAD')) {
        if (isStart && base.firstChild) {
            base.insertBefore(dNode, base.firstChild);
            return;
        } else {
            base.appendChild(dNode);
            return;
        }
    } else {
        const d = doc();
        if (!base) {
            base = d.currentScript;
        }
        const parentNode = base.parentNode;
        if (parentNode) {
            if (!isStart) {
                if (base.nextSibling) {
                    parentNode.insertBefore(dNode, base.nextSibling);
                    return;
                } else {
                    parentNode.appendChild(dNode);
                    return;
                }
            } else {
                parentNode.insertBefore(dNode, base);
                return;
            }
        }
        d.body.appendChild(dNode);
    }
}

const create = tag => callback => attrs =>
{
    const d = doc();
    const dNode = d.createElement(tag);
    keys(attrs).forEach(
        key => dNode[key] = attrs[key]
    );
    if (callback) {
        dNode.onload = callback;
    }
    return dNode;
}

const js = (base, isStart) => callback => (url, attrs) =>
{
    const dNode = create('script')(callback)({
        type: 'text/javascript',
        ...attrs
    })
    if (base) {
        inject(base, isStart)(dNode);
    }
    dNode.src = url;
    return dNode;
}

const css = (base, isStart) => callback => (url, attrs) =>
{
    const dNode = create('link')(callback)({
        rel: 'stylesheet',
        type: 'text/css',
        ...attrs
    })
    if (base) {
        inject(base, isStart)(dNode);
    }
    dNode.href = url;
    return dNode;
}

export {
    js, css
};

