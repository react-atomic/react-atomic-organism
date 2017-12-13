import React, {PureComponent} from 'react'; 
import XIco from 'ricon/X';
import get from 'get-object-value';

import PopupModal from '../organisms/PopupModal';
import DisplayPopupEl from '../organisms/DisplayPopupEl';

class FullScreen extends PureComponent
{
    xIcoEnter = () =>
    {
        this.setState({
            xIcoHoverStyle: Styles.xIcoHover
        });
    }

    xIcoLeave = () =>
    {
        this.setState({
            xIcoHoverStyle: null 
        });
    }

    getDefaultXIcon()
    {
        const {xIcoHoverStyle} = get(this, ['state'], {});
        return (
            <XIco
                onMouseEnter={ this.xIcoEnter } 
                onMouseLeave={ this.xIcoLeave } 
                style={{
                    ...Styles.x,
                    ...xIcoHoverStyle
                }}
                size="75px"
                weight=".1rem"
            />
        );
    }

    render()
    {
        const {children, closeCallBack} = this.props;
        const xico = this.getDefaultXIcon();
        return (
            <DisplayPopupEl>
                <PopupModal
                    appear="fadeIn-500"
                    enter="fadeIn-500"
                    className="full-screen"
                    scrolling={true}
                    style={Styles.container}
                    modal={children}
                    closeEl={xico}
                    closeCallBack={()=>{this.xIcoLeave();closeCallBack();}}
                />
            </DisplayPopupEl>
        );
    }
}

export default FullScreen;

const Styles = {
    container: {
        background: '#fff',
        textAlign: 'left'
    },
    x: {
        width: '70px',
        height: '75px',
        borderRadius: '8px',
        backgroundColor: 'rgba(190,190,190,.39)',
        top: '20px',
        right: '20px',
        opacity: '.3'
    },
    xIcoHover: {
        opacity: '.9'
    }
};
