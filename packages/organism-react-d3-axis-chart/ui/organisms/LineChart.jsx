import React, {cloneElement, Children} from 'react'; 
import get from 'get-object-value';

import MultiLine from '../molecules/MultiLine';
import BaseChart from '../molecules/BaseChart';

const LineChart = ({
    children,
    data,
    valuesLocator,
    xValueLocator,
    yValueLocator,
    attrsLocator,
    ...others
}) =>
(!data) ? null : 
<BaseChart
    {...others}
    data={data}
    valuesLocator={valuesLocator}
    xValueLocator={xValueLocator}
    yValueLocator={yValueLocator}
>
    {baseChart => {
        return [
            <MultiLine
                {...{
                    ...baseChart,
                    attrsLocator,
                    valuesLocator,
                    xValueLocator,
                    yValueLocator,
                    data,
                }}
            />,
            Children.map(
                children,
                c => cloneElement(c, {
                    ...baseChart
                }) 
            )
        ];
    }}
</BaseChart>

LineChart.defaultProps = {
    xValueLocator: d => d.x,
    yValueLocator: d => d.y,
    valuesLocator: d => d.values,
    attrsLocator: d => d.attrs
};

export default LineChart;
