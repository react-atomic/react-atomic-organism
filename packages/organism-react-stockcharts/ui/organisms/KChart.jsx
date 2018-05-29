import React from 'react';
import {LineChart, MultiHArea} from 'organism-react-d3-axis-chart';
import yFormat from '../../src/yFormat';
import get from 'get-object-value';

const KChart = ({
    children,
    xValueLocator,
    yValueLocator,
    linesLocator,
    linesValuesLocator,
    areasLocator,
    areasValuesLocator,
    areaY0Locator,
    areaY1Locator,
    threshold,
    data,
    hideAxis,
    ...others,
}) => {
return (
<LineChart
    {...others}
    xValueLocator={xValueLocator}
    yValueLocator={yValueLocator}
    valuesLocator={linesValuesLocator}
    threshold={threshold}
    data={linesLocator(data)} 
    hideAxis={hideAxis}
    xAxisAttr={{
        textAttr: {
            hide: true
        }
    }}
    yAxisAttr={{
        format:yFormat 
    }}
    multiChart="main"
    crosshair={true}
>
   {
    (!areasLocator(data)) ? 
    null :
    <MultiHArea
        valuesLocator={areasValuesLocator}
        areaXLocator={xValueLocator}
        areaY0Locator={areaY0Locator}
        areaY1Locator={areaY1Locator}
        data={areasLocator(data)}
    />
   }
   {children}
</LineChart>
);
}

KChart.defaultProps = {
   hideAxis: false, 
   areasLocator: d => d.areas,
   linesLocator: d => d.lines,
   multiChart: 'main'
};

export default KChart;
