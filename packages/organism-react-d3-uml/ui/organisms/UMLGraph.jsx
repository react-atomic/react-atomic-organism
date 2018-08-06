import React, {PureComponent} from 'react'
import {Graph, Rect} from 'organism-react-graph'
import DragAndDrop from './DragAndDrop'

class UMLGraph extends PureComponent
{
    render()
    {
        return (
            <Graph>
                <DragAndDrop>
                    <Rect width="100" height="100" />
                </DragAndDrop>
            </Graph> 
        )
    }
}

export default UMLGraph
