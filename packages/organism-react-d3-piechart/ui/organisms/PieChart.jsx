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
    {value}
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
            fontSize:8
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
    handleMouseEnter = (e) =>
    {
        this.setState({
            fill: lightenColor(
                this.props.color,
                20
            )
        });
    }

    handleMouseLeave = (e) =>
    {
        this.setState({
            fill: this.props.color
        });
    }

    render()
    {
        const {groupIndex, color, path, sectorBorderColor, ...props} = this.props; 
        let fill = get (
            this,
            ['state', 'fill'],
            color
        );
        return (
            <SemanticUI atom="g"
                className="arc"
                ui={false}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                key={groupIndex+'-arc'}
            >
                <SemanticUI 
                    d={path}
                    fill={fill}
                    atom="path"
                    stroke={sectorBorderColor}
                />
                <ValueLabel {...props} />
            </SemanticUI>
        );
    }
}

const elements = ({data, groupIndex, ...props}) =>
{
    const lineStart = 1;
    const lineLength = 10;
    const textDistance = lineStart+ lineLength+ 3;
    return [
        <Arc
            groupIndex={groupIndex}
            {...props}
        />,
        <Line {...props} groupIndex={groupIndex} start={lineStart} length={lineLength} />,
        <NameLabel {...props} groupIndex={groupIndex} label={get(data, ['label'])} distance={textDistance}/>,
    ];
}

const PieChart = ({
    data,
    outerRadius,
    innerRadius,
    labelTextFill,
    valueTextFill,
    sectorBorderColor,
    showOuterLabels,
    showInnerLabels,
    ...props
}) => {
    let items = pie(data, innerRadius, outerRadius); 
    let wBoxSize = items.outerRadius * 2; //use final outerRadius, please don't use props one.
    let hBoxSize = items.outerRadius * 2;
    if (showOuterLabels) {
        wBoxSize = items.outerRadius * 4;
        hBoxSize = items.outerRadius * 3.5;
    }

    return (
        <SemanticUI
            {...props}
            viewBox={`0 0 ${wBoxSize} ${hBoxSize}`}
        >
            <SemanticUI
                atom="g"
                transform={`translate(${wBoxSize/2},${hBoxSize/2})`}
            >
            {
                items.data.map((item, key)=> {
                    return elements({
                        ...item,
                        groupIndex: key,
                        outerRadius: items.outerRadius,
                        labelTextFill: labelTextFill,
                        valueTextFill: valueTextFill,
                        sectorBorderColor: sectorBorderColor
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
    sectorBorderColor: '#000'
};
export default PieChart;
