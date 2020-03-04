import callfunc from 'call-func';

let win;

const setMjmlWindow = w => win = w;

const mjml2html = code => callfunc(win.mjml2html, [code]);

export default mjml2html;
export {setMjmlWindow};
