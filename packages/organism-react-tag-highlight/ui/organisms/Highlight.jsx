import React, {Component, PropTypes} from 'react';

import {split} from '../../src/index';

class Highlight extends Component
{
    render()
    {
        const props = this.props;
        let a = split(props.children);
        return (
            <div>
            {a.map((item, i)=>{
                if (item[0]) {
                    return <b style={props.bStyle}>{item[1]}</b>
                } else {
                    return item[1];
                }
            })}
            </div>
        );
    }
}
export default Highlight;
