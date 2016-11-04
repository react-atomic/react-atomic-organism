import React, {Component} from 'react'; 

import FssWorker from "../../src/fss_worker";
import fss from "../../src/fss";

class GeometryAngle extends Component
{
    componentDidMount()
    {
        const {vertex, line, mesh, lights, autoStart} = this.props;
        this.fss = FssWorker({
            vertex: vertex,
            line: line,
            mesh: mesh,
            lights: lights,
            autoStart: autoStart 
        },this.dom);
    }

    start()
    {
        this.fss.start();
    }

    stop()
    {
        this.fss.stop();
    }

    render()
    {
        return (
            <div ref={dom=>this.dom=dom} style={Styles.container}></div>
        );
    }
}

GeometryAngle.defaultProps = {
    autoStart: true,

    // Set the point attributes for the vertex. 
    vertex: {

      // Radius of vertice circle.
      radius: 2,

      fill: "rgba(255, 255, 255, 0.3)",

      // Fluctuates opacity of vertex.
      fluctuationSpeed: 1,

      fluctuationIntensity: 0.5,
      strokeWidth: 0.001,
      strokeColor: "rgba(0, 104, 149, 1)",

      // Instead of setting alpha channel to zero
      // Set draw to false to avoid computing.
      draw: false

    },

    // specify the thickness, color, stroke, etc. 
    line: {

      fill: "rgba(255, 255, 255, 0.1)",
      thickness: 0,
      fluctuationIntensity: 0,
      fluctuationSpeed: 0,
      draw: false

    }, 

    // handle transparent colors
    mesh:{

      width: 1.6,
      height: 1.5,

      // How far should the mesh vary into z-space.
      depth: 6,

      // Number of columns for the mesh.
      columns: undefined,

      columns_auto: true,

      // Number of rows for the mesh.
      rows: undefined,

      rows_auto: true,
      zoom: 1,
      xRange: 0.4,
      yRange: 0.2,
      zRange: 8.0,
      ambient: 'rgba(45, 69, 90, 0.8)',
      diffuse: 'rgba(149, 149, 149, 0.43)',
      background: 'rgba(92, 121, 117, 1)',
      //main color
      // background: 'rgba(46, 213, 219, 1)'
      speed: 0.0008,
      fluctuationSpeed: 0.5,
      fluctuationIntensity: 0,
      onRender: function () {

      },
      floorPosition: false,
      draw: true

    }, 

    lights: {
      // How many light sources belong to this light.
      count: 0,

      xyScalar: 0,

      // Position of light source.
      zOffset: 0,

      // ambient: 'rgba(0, 104, 149, 1)',
      // diffuse: 'rgba(0, 104, 149, 1)',
      speed: 0,
      gravity: 0,

      // Dampening of light's movements.
      dampening: 0,
      minLimit: 0,
      maxLimit: null,
      minDistance: 20,
      maxDistance: 400,
      autopilot: false,
      draw: false, //show circle
      bounds: fss.Vector3.create(),
      step: fss.Vector3.create(
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0)
      )

    },
};

export default GeometryAngle;

const Styles ={
    container: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0
    }
};
