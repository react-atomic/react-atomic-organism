import React, {PureComponent} from 'react'
import {Graph, Rect} from 'organism-react-graph'

import BoxGroup from './BoxGroup'
import Box from './Box'

class UMLGraph extends PureComponent
{
    render()
    {
        return (
            <Graph>
                <BoxGroup>
                    <Box>col1</Box>
                    <Box>col2</Box>
                </BoxGroup>
                <BoxGroup>
                    <Box>col1</Box>
                    <Box>col2</Box>
                </BoxGroup>
            </Graph> 
        )
    }
}

export default UMLGraph
