import React from 'react';

const BBandsWidthChart = props =>
    <LineChart
        data={areas} 
        xValueLocator={(d)=>d.x}
        yValueLocator={(d)=>d.width}
        multiChart="sub"
        crosshair={true}
        xAxisAttr={{
            textAttr: {
                hide: true
            }
        }}
        yAxisAttr={{
            num: 5,
            format:yFormat 
        }}
        attrLocator={(d)=>get(d, ['attr2'])}
    />

export default BBandsWidthChart;
