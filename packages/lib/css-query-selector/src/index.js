'use strict';

const doc = () => document;

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

export default {
    all: queryAll,
    ancestor: queryAncestor,
    el: queryEl,
    one: queryOne
};
