import {expect} from 'chai';
import {create} from 'create-el';

import exec from '../cjs/src/index.js';

let cmd = ''

window.eval = s => cmd = s 

describe('Exec Script', ()=>{
    it('simple', ()=>{
       const div = create('div')()({
        innerHTML: "<script>window.a = 1</script>"
       }) 
       exec(div)
       expect(cmd).to.equal('window.a = 1')
    });
});
