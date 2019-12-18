import React, {PureComponent} from 'react';
import XIco from 'ricon/X';
import get from 'get-object-value';

import PopupModal from '../molecules/PopupModal';
import DisplayPopupEl from '../organisms/DisplayPopupEl';
import callfunc from 'call-func';
import {popupDispatch} from '../../src/popupDispatcher';

class FullScreen extends PureComponent {
  static defaultProps = {
    name: 'fullscreen'
  }

  xIcoEnter = () => {
    setTimeout(() => {
      if (!this._mounted) {
        return null;
      }
      this.setState({xIcoHoverStyle: Styles.xIcoHover});
    });
  };

  xIcoLeave = () => {
    if (!this._mounted) {
      return null;
    }
    this.setState({xIcoHoverStyle: null});
  };

  handleClose = () => {
    const {onClose, removeOnClose} = this.props;
    callfunc(onClose);
    if (removeOnClose) { 
      popupDispatch({
        type: 'dom/cleanOne',
        params: {
          popup: this,
        },
      });
    }
  };

  getDefaultXIcon() {
    const {xIcoHoverStyle} = get(this, ['state'], {});
    return (
      <XIco
        onMouseEnter={this.xIcoEnter}
        onMouseLeave={this.xIcoLeave}
        style={{
          ...Styles.x,
          ...xIcoHoverStyle,
        }}
        size="75px"
        weight=".1rem"
      />
    );
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const {children, onClose, toPool} = this.props;
    const xico = this.getDefaultXIcon();
    return (
      <DisplayPopupEl>
        <PopupModal
          appear="fadeIn-500"
          enter="fadeIn-500"
          className="full-screen"
          scrolling={true}
          style={Styles.container}
          modalClassName="basic"
          modalStyle={Styles.modal}
          modal={children}
          closeEl={xico}
          onClose={this.handleClose}
          toPool={toPool}
        />
      </DisplayPopupEl>
    );
  }
}

export default FullScreen;

const Styles = {
  container: {
    background: '#fff',
    textAlign: 'left',
  },
  x: {
    width: '70px',
    height: '75px',
    borderRadius: '8px',
    backgroundColor: 'rgba(190,190,190,.39)',
    top: '20px',
    right: '20px',
    opacity: '.3',
  },
  xIcoHover: {
    opacity: '.9',
  },
};
