import React, {Component} from 'react'; 
import {
    mixClass,
    reactStyle,
    List 
} from 'react-atomic-molecule';

const Styles = {
    ul: reactStyle({
        padding: '20px 0 0 0',
        margin: 0,
        position: 'relative',
        transition: ['all 0.5s'],
        top: '-5px',
        zoom: 1
    })
};

export default class OrganizationChart extends Component
{
    render()
    {
        let classes = mixClass (
            this.props.className,
            'org-chart'
        );
        return (
            <List
                atom="ul"
                ui={false}
                {...this.props}
                className={classes}
                styles={Styles.ul}
            />
        );
    }
}
