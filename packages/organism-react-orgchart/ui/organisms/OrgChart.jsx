import React, {Component} from 'react'; 
import {
    mixClass,
    assign,
    reactStyle,
    SemanticUI
} from 'react-atomic-molecule';

const branchStyle = {
    content: '',
    position: 'absolute',
    top: 0,
    height: '20px'
};

const Styles = {
    firstBranch: reactStyle(assign(
        {},
        branchStyle,
        {
            left: '50%',
            width: 0,
            borderLeft: '1px solid #ccc'
        }
    ), '.org-tree ul ul::before'),

    removeFirstTop: reactStyle({
        paddingTop:0
    }, '.org-tree li:only-child'),

    secondBranch: reactStyle(assign(
        {},
        branchStyle,
        {
            right: '50%',
            width: '50%',
            borderTop: '1px solid #ccc'
        }
    ), '.org-tree li::before, .org-tree li::after'),

    secondBranchLeft: reactStyle({
       right: 'auto',
       left: '50%',
       borderLeft: '1px solid #ccc'
    }, '.org-tree li::after'),

    secondBranchLeftSide: reactStyle({
        border: '0 none'
    }, '.org-tree li:first-child::before'),

    secondBranchRight: reactStyle({
        borderRight: '1px solid #ccc',
        borderRadius: ['0 5px 0 0']
    }, '.org-tree li:last-child::before'),

    secondBranchRightSide: reactStyle({
        borderRadius: ['5px 0 0 0'],
    }, '.org-tree li:first-child::after'),

    noChild: reactStyle({
        display: 'none' 
    }, '.org-tree li:only-child::after, .org-tree li:only-child::before'),

    removeLeftRight: reactStyle({
        border: 'none'   
    }, '.org-tree li:first-child::before, .org-tree li:last-child::after'),

    clean: reactStyle({
        content: '.',
        display: 'block',
        visibility: 'hidden',
        height: 0,
        clear: 'both'
    }, '.org-tree ul::after')
};

export default class OrgChart extends Component
{
    render()
    {
        let classes = mixClass(
            this.props,
            'org-tree'
        );
        return (
            <SemanticUI
                {...this.props}
                className={classes}
            />
        );
    }
}
