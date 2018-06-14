const queryFrom = base =>
{

    if ('function' !== typeof base) {
        console.error('query base should pass with function');
    }

    const doc = base;

    const queryOne = sel => doc().querySelector(sel);

    const queryAll = sel => Array.from(doc().querySelectorAll(sel));

    const queryEl = el => ('string' === typeof el) ? queryOne(el) : el;

    const queryAncestor = (el, ancestor) =>
    {
        el = queryEl(el);
        let hit = false;

        queryAll(ancestor).some(
            p => {
                if (p.contains(el)) {
                    hit = p;
                    return true;
                } else {
                    return false;
                }   
            }   
        );  
        return hit;
    }
    return {
        queryOne,
        queryAll,
        queryEl,
        queryAncestor
    }
}

export default queryFrom;
