import PopupOverlay from '../organisms/PopupOverlay';

class PopupFloatEl extends PopupOverlay
{
    static defaultProps = {
        style: {
            position: 'absolute',
            right: 'auto'
        },
        name: 'float'
    };

}

export default PopupFloatEl;
