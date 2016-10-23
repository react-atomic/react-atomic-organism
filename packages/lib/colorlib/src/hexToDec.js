'use strict';

// convert to decimal
const hexToDec = (hex) =>
{
    let colors = [];
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    for (let i = 0; i < 3; i++) {
        colors.push(parseInt(hex.substr(i*2,2), 16));
    }
    return colors;
}
export default hexToDec;
