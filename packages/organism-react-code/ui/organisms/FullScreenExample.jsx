import React, {PureComponent} from 'react';
import { FullScreen } from "organism-react-popup";
import {
    Button,
    SemanticUI
} from 'react-atomic-molecule';

class FullScreenExample extends PureComponent
{
    state = {
        showFullScreen: false 
    };

    handleClick = () =>
    {
        this.setState({
            showFullScreen: true 
        });
    }

    handleCloseCallback = () =>
    {
        const {closeCallback} = this.props;
        if ('function' === typeof closeCallback) {
          closeCallback();
        }
        this.setState({showFullScreen: false});
    }

    componentDidMount()
    {
        const {id} = this.props;
        const urls = document.URL.split('#');
        const lastIndex = urls.length-1;
        const last = urls[lastIndex];
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
