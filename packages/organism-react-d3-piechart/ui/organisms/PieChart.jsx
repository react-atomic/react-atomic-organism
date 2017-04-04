import React, {Component} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import {pie} from 'd3-lib';
import get from 'get-object-value';
import {lightenColor} from 'colorlib';

const ValueLabel = ({value, valueTextFill, centroid, groupIndex, ...props}) =>
{
    return (
    <SemanticUI
        key={groupIndex+'-value'}
        atom="text"
        transform={`translate(${centroid.join(',')})`}
        dy=".35em"
        style={{
          shapeRendering: 'crispEdges',
          textAnchor: 'middle',
          fill: valueTextFill,
          fontSize: 8
        }}
    >
    {value}%
    </SemanticUI>
    );
}

const NameLabel = ({
    startAngle,
    endAngle,
    outerRadius,
    label,
    labelTextFill,
    distance,
    groupIndex,
    ...props
}) =>
{
    const angle = (startAngle + endAngle) / 2;
    const dist = outerRadius + distance;
    const x = dist * (1.2 * Math.sin(angle));
    const y = -dist * Math.cos(angle);
    const translate = `translate(${x},${y})`;
    return (
    <SemanticUI
        key={groupIndex+'-name'}
        atom="text"
        transform={translate}
        dy=".35em"
        style={{
            fill: labelTextFill,
            textAnchor: 'middle',
            shapeRendering: 'crispEdges',
            fontSize:10
        }}
    >
    {label}
    </SemanticUI>
    );
}

const Line = ({
    groupIndex,
    outerRadius,
    labelTextFill,
    startAngle,
    endAngle,
    start,
    length,
    ...props
}) => {
    const rotate = `rotate(${(startAngle + endAngle) / 2 * (180 / Math.PI)})`;
    return (
    <SemanticUI
        atom="line"
        key={groupIndex+'-line'}
        x1="0"
        x2="0"
        y1={-outerRadius - start}
        y2={-outerRadius - length}
        stroke={labelTextFill}
        transform={rotate}
        style={{
            fill: labelTextFill,
            strokeWidth: 1 
        }}
    />
    );
}

class Arc extends Component
{
    handleMouseOver = (e) =>
    {
        this.setState({
            fill: lightenColor(
                this.props.fill,
                20
            )
        });
    }

    handleMouseLeave = (e) =>
    {
        this.setState({
            fill: this.props.fill
        });
    }

    render()
    {
        const {groupIndex, ...props} = this.props; 
        let fill = get(
            this,
            ['state', 'fill'],
            this.props.fill 
        );
        return (
            <SemanticUI 
                {...props}
                fill={fill}
                atom="path"
                key={groupIndex+'-arc'}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
            />
        );
    }
}

const elements = ({data, path, color, groupIndex, ...props}) =>
{
    const lineStart = 1;
    const lineLength = 15;
    const textDistance = lineStart+lineLength;
    return [
        <Arc d={path} fill={color} groupIndex={groupIndex}/>,
        <Line {...props} groupIndex={groupIndex} start={lineStart} length={lineLength} />,
        <NameLabel {...props} groupIndex={groupIndex} label={get(data, ['label'])} distance={textDistance}/>,
        <ValueLabel {...props} groupIndex={groupIndex} />
    ];
}

const PieChart = ({
    data,
    outerRadius,
    innerRadius,
    labelTextFill,
    valueTextFill,
    showOuterLabels,
    showInnerLabels,
    ...props
}) => {
    let items = pie(data, innerRadius, outerRadius); 
    let boxSize = items.outerRadius * 2; //use final outerRadius, please don't use props one.
    if (showOuterLabels) {
        boxSize = items.outerRadius * 5;
    }

    return (
        <SemanticUI
            {...props}
            viewBox={`0 0 ${boxSize} ${boxSize}`}
        >
            <SemanticUI
                atom="g"
                transform={`translate(${boxSize/2},${boxSize/2})`}
            >
            {
                items.data.map((item, key)=> {
                    return elements({
                        ...item,
                        groupIndex: key,
                        outerRadius: items.outerRadius,
                        labelTextFill: labelTextFill,
                        valueTextFill: valueTextFill
                    });
                })
            }
            </SemanticUI>
        </SemanticUI>
    );
}

PieChart.defaultProps = {
    innerRadius: 20,
    labelTextFill: '#000',
    valueTextFill: '#000',
    atom: 'svg',
    width: '100%',
    data: [],
    showInnerLabels: true,
    showOuterLabels: true,
};
export default PieChart;
