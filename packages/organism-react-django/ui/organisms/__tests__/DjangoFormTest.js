import React from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import DjangoForm from '../DjangoForm';
import djangoFormParser from '../../../src/djangoFormParser';

const form = `
  <li><label for="id_username">Username:</label> <input type="text" name="username" maxlength="150" autofocus required id="id_username"> <span class="helptext">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span></li>
      <li><label for="id_password1">Password:</label> <input type="password" name="password1" required id="id_password1"> <span class="helptext"><ul><li>Your password can&#39;t be too similar to your other personal information.</li><li>Your password must contain at least 8 characters.</li><li>Your password can&#39;t be a commonly used password.</li><li>Your password can&#39;t be entirely numeric.</li></ul></span></li>
      <li><label for="id_password2">Password confirmation:</label> <input type="password" name="password2" required id="id_password2"> <span class="helptext">Enter the same password as before, for verification.</span></li>
`;

describe('Test Checkbox Component', () => {
  it('test disabled', () => {
    const data = djangoFormParser({form});
    const wrapper = shallow(<DjangoForm {...data.form}/>);
    expect(wrapper.html()).to.have.string('<form method="post" class="form ui">');
  });
});
