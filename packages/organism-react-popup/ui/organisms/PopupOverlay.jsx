import React, {Component} from 'react'; 

import {
    FullscreenIco,
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

export default class PopupOverlay extends Component
{
    render()
    {
        let classes = mixClass (
            this.props.className,
            'popup'
        );
        return (
            <SemanticUI {...this.props} className={classes}>
            {this.props.children}
            <div style={{position:'absolute',top:'5px',right:'5px'}}>
                <FullscreenIco width="30px" height="30px"/>
            </div>
            </SemanticUI>
        );
    }
}
