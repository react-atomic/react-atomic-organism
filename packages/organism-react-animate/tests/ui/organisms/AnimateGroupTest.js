'use strict';
import React, {Component} from 'react';

import {expect} from 'chai';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


import Animate from '../../../cjs/src/index';

describe('AnimateGroup', ()=>{ 
    it('constructor', ()=>{
        let changeState;
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
