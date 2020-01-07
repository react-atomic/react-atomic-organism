'use strict';
import React, {Component} from 'react';

import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import sinon from 'sinon';
const sandbox = sinon.createSandbox();


import Animate from '../Animate';
import AnimateGroup from '../AnimateGroup';


describe('Animate', ()=>{ 
    it('constructor', ()=>{
        let vDom = (
            <Animate>
                <div>abc</div>
            </Animate>
        );
        const html = mount(vDom);
        const actual = html.html();
        html.update();
        html.setProps({children: [<p>def</p>,<div>abc</div>]});
        html.update();
    });
});


describe('AnimateGroup', ()=>{ 
    before(()=> {
        sandbox.spy(AnimateGroup.prototype, 'render');
    });
    after(()=> {
        sandbox.restore();
    });
    it('Test handleExit', ()=>{
        let vDom = (
            <AnimateGroup timeout={1000}>
                <div>abc</div>
            </AnimateGroup>
        );
        const html = mount(vDom);
        expect(AnimateGroup.prototype.render.callCount).to.equal(1);
        html.setProps({children: null});
        expect(AnimateGroup.prototype.render.callCount).to.equal(2);
    });
});
