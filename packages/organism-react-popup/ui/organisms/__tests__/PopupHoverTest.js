import React, {useState, useEffect} from 'react';
import {expect} from 'chai';
import { render, waitFor } from "reshow-unit";

import PopupHover from '../PopupHover';

describe('Test PopupHover', () => {
  it('basic test', async () => {
    const wrap = render(<PopupHover />);
    await waitFor(() => {
      expect(wrap.html()).to.have.string('name="popup-hover"');
    });
  });
});
