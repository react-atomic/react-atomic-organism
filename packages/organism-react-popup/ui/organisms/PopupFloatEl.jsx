import PopupOverlay from '../organisms/PopupOverlay';
import { connect } from 'reshow-flux';
import getWindowOffset, {
    alignUI,
    getPositionString
} from 'get-window-offset';

class PopupFloatEl extends PopupOverlay
{
   static defaultProps = {
       style: {
           position: 'absolute',
           right: 'auto'
       },
       name: 'float'
   };

   /** 
    * For monitor window resize
    */
   handleResize = () =>
   {
        this.handleMoveTo();        
   }

   handleMoveTo = () =>
   {
        const pos = this.calPos();
        if (!pos) {
            return;
        }
        if (pos.top === this.floatTop &&
            pos.left === this.floatLeft &&
            pos.className === this.floatClassName
        ) {
            return;  
        }
        this.floatLeft = pos.left;
        this.floatTop = pos.top;
        this.floatClassName = pos.className;
        this.setState(pos);
   }

   calPos = () =>
   {
        const {targetEl} = this.props;
        console.log([this.floatEl,targetEl,getWindowOffset(targetEl)]);
        if (!this.floatEl || !targetEl || !getWindowOffset(targetEl)) {
            return false;
        }
        const info = alignUI(targetEl, this.floatEl);
        if (!info) {
            console.error('can not get alignUI info');
            return;
        }
        const {move, loc} = info;
        const result = {
            top: move[1],
            left: move[0],
            className: getPositionString(loc)
        };
        return result;
   }

    setFloatEl = (el) =>
    {
       if (el) {
           this.floatEl = el;
       }
       this.handleMoveTo();        
    }

    constructor(props)
    {
        super(props);
        this.state = {
            ...this.state,
            refCb: this.setFloatEl
        };
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillReceiveProps(nextProps)
    {
        this.isNeedUpdate = true;
    }

    componentDidUpdate()
    {
        if (this.isNeedUpdate) {
            this.handleMoveTo();
            this.isNeedUpdate = false;
        }
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.handleResize);
    }
}

export default connect(
    PopupFloatEl,
    { withProps:true }
);
