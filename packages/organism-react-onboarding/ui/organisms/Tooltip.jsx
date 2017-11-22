import React, {PureComponent} from 'react';
import {
    PopupModal,
    PopupFloatEl 
} from 'organism-react-popup';

class Tooltip extends PureComponent
{
    render()
    {
        const {targetEl, modalStyle, children, name, ...props}  = this.props;
        return (
            <div>
                <PopupModal {...props}
                    name={name}
                    modal={<div />}
                />
                <PopupFloatEl name={name} style={{...modalStyle, zIndex:99999}} targetEl={targetEl}>
                    {children}
                </PopupFloatEl>
            </div>
        );
    }
}

export default Tooltip;
