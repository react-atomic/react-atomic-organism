import {expect} from 'chai';

import exec from '../cjs/src/index.js';

let cmd = ''

window.eval = s => cmd = s 

describe('Exec Script', ()=>{
    it('simple', ()=>{
       exec('<script>window.a = 1</script>')
       expect(cmd).to.equal('(function(){ window.a = 1 }())')
    });
});
