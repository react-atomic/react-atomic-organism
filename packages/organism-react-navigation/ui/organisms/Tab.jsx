import React, {Component} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
export default class Tab extends Component
{
    render()
    {
        return (<SemanticUI {...this.props} />);
    }
}
