import {round} from 'topercent';

const yFormat = (d) =>
{
    const roundNum = round(d);
    if ((roundNum+'').length > 6) {
        return round(d,0);
    } else {
        return roundNum;
    }   
}

export default yFormat;
