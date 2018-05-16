import React, {PureComponent} from 'react';
import { FullScreen } from "organism-react-popup";
import {
    Button,
    SemanticUI
} from 'react-atomic-molecule';

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

    handleCloseCallback = () =>
    {
        const {id, closeCallback} = this.props;
        const url = document.URL;
        const idIndex = url.lastIndexOf('#'+id);
        if (-1 !== idIndex) {
            updateUrl(url.substring(0,idIndex));
        }
        if ('function' === typeof closeCallback) {
          closeCallback();
        }
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
                  closeCallback={this.handleCloseCallback}
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
