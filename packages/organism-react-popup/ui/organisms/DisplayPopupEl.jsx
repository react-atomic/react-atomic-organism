import React, {PureComponent} from 'react'; 
import {
    popupDispatch,
} from '../../src/index';

const isArray = Array.isArray;

class DisplayPopupEl extends PureComponent
{
    getChildren()
    {
        let {children} = this.props;
        if (isArray(children)) {
            children = children[0];
        }
        return children;
    }

    setFloat()
    {
        setTimeout(()=>
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: this.getChildren() 
                }
            })
        );
    }

    componentDidMount() 
    {
        this.setFloat();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        this.setFloat();
    }

    componentWillUnmount()
    {
        popupDispatch({
            type: 'dom/cleanOne',
            params: {
                popup: this.getChildren() 
            }
        });
    }

    render()
    {
        return null;
    }
}

export default DisplayPopupEl;
