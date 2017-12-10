import React, {PureComponent} from 'react'; 
import {
    popupDispatch,
} from '../../src/index';

class DisplayPopupEl extends PureComponent
{
    get floatEl()
    {
        const {children} = this.props;
        return children;
    }

    setFloat()
    {
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: this.floatEl 
            }
        });
    }

    componentDidMount() 
    {
        this.setFloat();
    }

    componentDidUpdate(prevProps, prevState)
    {
        this.setFloat();
    }

    componentWillUnmount()
    {
        popupDispatch({
            type: 'dom/cleanOne',
            params: {
                popup: this.floatEl 
            }
        });
    }

    render()
    {
        return null;
    }
}

export default DisplayPopupEl;
