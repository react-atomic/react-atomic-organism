'use strict';

import {hexToDec} from './index';

const hexToRgba = (hex, opacity) =>
{
    let rgba ='rgba(';
    const decColors = hexToDec(hex);
    rgba+= decColors.join(',');
    rgba+=','+ opacity + ')';
    return rgba;
}

export default hexToRgba;
