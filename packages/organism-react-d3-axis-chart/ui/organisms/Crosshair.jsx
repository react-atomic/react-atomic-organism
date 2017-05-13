import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import Line from '../molecules/Line';

const CrossLine = (props) =>
<Line {...props} />

class Crosshair extends Component
{
    render()
    {
    const {
        x,
        y,
        scaleW,
        scaleH,
        hideX,
        hideY,
    } = this.props;
    let xline = null;
    let yline = null;
    if (!hideX && y) {
        xline = <CrossLine className="x" start={{x:0, y:y}} end={{x:scaleW, y:y}} />;
    }
    if (!hideY && x) {
        yline = <CrossLine className="y" start={{x:x, y:0}} end={{x:x, y:scaleH}} />;
    }
    return (
    <SemanticUI 
        atom="g"
        className="crosshair"
    >
        {xline}
        {yline}
    </SemanticUI>
    );
    }
}

export default Crosshair;
