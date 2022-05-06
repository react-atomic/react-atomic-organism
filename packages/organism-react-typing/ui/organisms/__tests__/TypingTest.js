import {expect} from 'chai';
import {render} from "reshow-unit";

import Typing from '../Typing';

describe('Test Typing', ()=>{ 
  it('simple test', ()=>{
    const wrap = render(<Typing />);
    expect(wrap.html()).to.have.string('react-typing');
  });
});
