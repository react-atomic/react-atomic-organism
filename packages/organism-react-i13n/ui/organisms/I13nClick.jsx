import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule'; 

import {i13nDispatch} from '../../src/actions/i13nDispatcher';

class I13nClick extends Component
{
    static defaultProps = { 
        component: SemanticUI
    };

    handleClick = (e) =>
    {
        const {onClick, i13n} = this.props;
        if (onClick) {
            onClick(e); 
        }
        i13nDispatch({
            type: 'action',
            params: i13n
        });
    }

    render()
    {
        const {component, onClick, i13n, ...others} = this.props;
        let build;
        if (React.isValidElement(component)) {
            build = React.cloneElement;
        } else {
            build = React.createElement;
        }
        let props = {
            ...others,
            onClick: this.handleClick
        };

        return build(
            component,
            props
        );
    }
}

export default I13nClick;
