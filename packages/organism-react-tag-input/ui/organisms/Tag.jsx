import React from 'react';
import {Label} from 'react-atomic-molecule';
import callfunc from 'call-func';

const handleDel = func => e => {
  e.preventDefault();
  callfunc(func);
};

const Tag = ({children, onDel, buttonStyle, ...props}) => {
  return (
    <Label className="tiny" {...props}>
      {children}
      <button style={buttonStyle} onClick={handleDel(onDel)}>x</button>
    </Label>
  );
};

export default Tag;
