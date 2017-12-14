import {removeClass} from 'class-lib';
import query from 'css-query-selector';

const cleanClass = (className) =>
{
    const allEl = query.all('.'+className);
    allEl.forEach( el => {
        if (el instanceof SVGElement) {
            el.setAttribute('class', removeClass(
                el.getAttribute('class'),
                className
            ));
        } else {
            el.className = removeClass(
                el.className,
                className
            );
        }
    });
}

export default cleanClass;
