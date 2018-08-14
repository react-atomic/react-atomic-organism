import React from 'react'
import {SemanticUI} from 'react-atomic-molecule'

import BaseString from '../molecules/BaseString'

class Text extends BaseString
{
    render()
    {
       const props = this.resetProps(
        this.props,
        this.state
       )
       return (
        <SemanticUI
            refCb={el => this.el = el}
            atom="text"
            ui={false}
            {...props}
        />
       )
    }
}

export default Text
