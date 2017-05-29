import React from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import get from 'get-object-value';

import Line from '../molecules/Line';
import Area from '../molecules/Area';
import BaseChart from '../molecules/BaseChart';

const LineChart = (props)=>{
    const {
        areas,
        data,
        xValueLocator,
        yValueLocator,
        attrLocator
    } = props;
    return (
        <BaseChart  {...props}>
            {(baseChart)=>{
                const {xScale, yScale} = baseChart; 
                return [
                    data.map((line)=>{
                        const {value} = line;
                        let attr;
                        if (attrLocator) {
                            attr = attrLocator(line);
                        } else {
                            attr = get(line, ['attr']);
                        }
                        const d = baseChart.curve(
                            value,
                            xValueLocator,
                            yValueLocator,
                            xScale,
                            yScale
                        );
                        return  (<Line d={d} {...attr}/>);
                    }),
                    get(areas,null,[]).map((area)=>{
                        const {value} = area; 
                        let attr;
                        if (attrLocator) {
                            attr = attrLocator(area);
                        } else {
                            attr = get(area, ['attr']);
                        }
                        const d = baseChart.hArea(
                            value,
                            (d)=>xScale.scaler(d.x)+xScale.length,
                            (d)=>yScale.scaler(d.y0),
                            (d)=>yScale.scaler(d.y1)
                        );
                        return  (<Area d={d} {...attr}/>);
                    })
                ];
            }}
        </BaseChart>
    );
}

LineChart.defaultProps = {
    xValueLocator: (d)=>d.x,
    yValueLocator: (d)=>d.y,
};

export default LineChart;
