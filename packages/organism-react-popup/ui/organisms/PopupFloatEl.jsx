import PopupOverlay from '../organisms/PopupOverlay';

class PopupFloatEl extends PopupOverlay
{
    static defaultProps = {
        style: {
            width: 100,
            height: 100,
            background: 'red',
            position: 'absolute',
            top: 200,
            left: 0,
            display: 'block'
        },
        name: 'float'
    };

}

export default PopupFloatEl;
