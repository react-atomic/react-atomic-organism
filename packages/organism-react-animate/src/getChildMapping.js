import { Children } from 'react';

const getChildMapping = (children, mapFn) =>
{
    const mapper = (child, key) => mapFn ? mapFn(child, key) : child;
    let result = {};
    if (children) {
        // map for auto assign child.key
        Children.map(children, c => c).
            forEach((child) => {
                result[child.key] = mapper(
                    child,
                    child.key
                );
            });
    }
    return result;
};

export default getChildMapping;
