import get from 'get-object-value';

const position = {
    tl: 'top left',
    tr: 'top right',
    bl: 'bottom left',
    br: 'bottom right',
    tc: 'top center',
    rc: 'right center',
    bc: 'bottom center',
    lc: 'left center',
};

const getPositionString = loc => get(position, [loc]);

export default getPositionString;
