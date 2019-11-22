import React, {PureComponent} from 'react';
import { FullScreen } from "organism-react-popup";
import {
    Button,
    SemanticUI
} from 'react-atomic-molecule';

import callfunc from 'call-func';

const getLastHash = () =>
{
    const urls = document.URL.split('#');
    const lastIndex = urls.length-1;
    const last = urls[lastIndex];
    return last;
}

const updateUrl = url => history.pushState('','',url);

class FullScreenExample extends PureComponent
{
    static defaultProps = { button: 'Open full screen'}

    state = {
        showFullScreen: false 
    };

    handleClick = () =>
    {
        const {id} = this.props;
        const last = getLastHash();
        if (id && id !== last) {
           updateUrl(document.URL+'#'+id); 
        }
        this.setState({
            showFullScreen: true 
        });
    }

    handleClose = () =>
    {
        const {id, onClose} = this.props;
        const url = document.URL;
        const idIndex = url.lastIndexOf('#'+id);
        if (-1 !== idIndex) {
            updateUrl(url.substring(0,idIndex));
        }
        callfunc(onClose);
        this.setState({showFullScreen: false});
    }

    componentDidMount()
    {
        const {id} = this.props;
        const last = getLastHash();
        if (id === last) {
            this.setState({
                showFullScreen: true 
            });
        }
    }

    render()
    {
        const {button, children} = this.props;
        const {showFullScreen} = this.state;
        let thisFullScreen = null;
        if (showFullScreen) {
           thisFullScreen = (
                <FullScreen
                  onClose={this.handleClose}
                >
                  {children}
                </FullScreen>
           );
        }
        return (
            <SemanticUI>
                <Button
                    onClick={this.handleClick}
                >
                    {button}
                </Button>
                {thisFullScreen}
            </SemanticUI>
        );
    }
}

export default FullScreenExample;
