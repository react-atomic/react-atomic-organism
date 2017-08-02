import FSS from './fss';

const FSS_Worker = function (opt, element) {

    opt = opt || {};
    var MESH = {},
        LIGHT = [{}],
        VERTEX = {},
        LINE = {};

    //------------------------------
    // Mesh Properties
    //------------------------------
    var mesh_default = {
        width: 1.2,
        height: 1.2,
        depth: 10,
        columns: undefined,
        columns_auto: true,
        rows: undefined,
        rows_auto: true,
        zoom: 1,
        xRange: 0.8,
        yRange: 0.1,
        zRange: 1.0,
        ambient: 'rgba(85, 85, 85, 1)',
        diffuse: 'rgba(255, 255, 255, 1)',
        background: 'rgb(255, 255, 255)',
        speed: 0.0002,
        fluctuationSpeed: 0.5,
        fluctuationIntensity: 0,
        onRender: function () {
        },
        floorPosition: false,
        draw: true
    };

    var vertex_default = {
        radius: 0,
        fill: "rgba(0, 0, 0, 0)",
        fluctuationSpeed: 0.5,
        fluctuationIntensity: 0,
        strokeWidth: 0,
        strokeColor: "rgba(0, 0, 0, 0)",
        draw: false
    };

    var line_default = {
        fill: "rgba(0, 0, 0, 0)",
        thickness: 1,
        fluctuationIntensity: 0,
        fluctuationSpeed: 0.5,
        draw: false
    };

    //------------------------------
    // Light Properties
    //------------------------------
    var light_default = {
        count: 1,
        xyScalar: 1,
        zOffset: 100,
        ambient: 'rgba(255,0,102, 1)',
        diffuse: 'rgba(255,136,0, 1)',
        speed: 0.010,
        gravity: 1200,
        dampening: 0.95,
        minLimit: 10,
        maxLimit: null,
        minDistance: 20,
        maxDistance: 400,
        autopilot: false,
        draw: false, //show circle
        bounds: FSS.Vector3.create(),
        step: FSS.Vector3.create(
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0)
                )
    };

    var self = element;

    var createValues = function (opt) {
        opt.mesh = opt.mesh || MESH;
        opt.lights = opt.lights || LIGHT;
        opt.vertex = opt.vertex || VERTEX;
        opt.line = opt.line || LINE;

        MESH = { ...mesh_default, ...MESH, ...opt.mesh };
        VERTEX = { ...vertex_default, ...VERTEX, ...opt.vertex };
        LINE = { ...line_default, ...LINE, ...opt.line };
        for (var i = 0; i < LIGHT.length; i++) {
            LIGHT[i] = { ...light_default, ...LIGHT[i], ...opt.lights[i] };
        }

        MESH.columns_auto = (typeof opt.mesh.columns === "undefined");
        MESH.rows_auto = (typeof opt.mesh.rows === "undefined");
    };
    createValues(opt);

    var container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "0";
    container.style.right = "0";
    container.style.top = "0";
    container.style.bottom = "0";
    container.style.background = MESH.background;
    container.style.zIndex = "-100";
    container.setAttribute('class', 'fss-output');
    self.insertBefore(container, null);



    //------------------------------
    // Render Properties
    //------------------------------
    var WEBGL = 'webgl';
    var CANVAS = 'canvas';
    var SVG = 'svg';
    var RENDER = {
        renderer: CANVAS 
    };

    //------------------------------
    // UI Properties
    //------------------------------
    var UI = {
        show: true
    };

    //------------------------------
    // Global Properties
    //------------------------------
    var now, start = Date.now();
    var center = FSS.Vector3.create();
    var attractor = FSS.Vector3.create();
    //var container = document.getElementById('container'); -- taken from JQuery element
    /* 		var output = document.getElementById('output'); */
    var ui = document.getElementById('ui');
    var renderer, scene, mesh, geometry, material;
    var webglRenderer, canvasRenderer, svgRenderer;
    var gui, autopilotController;

    //------------------------------
    // Methods
    //------------------------------
    function initialise() {
        createRenderer();
        createScene();
        createMesh();
        createLights();
        addEventListeners();
        callbacks.resize(container.offsetWidth, container.offsetHeight);
        animate();
    }

    function createRenderer() {
        webglRenderer = new FSS.WebGLRenderer();
        canvasRenderer = new FSS.CanvasRenderer();
        svgRenderer = new FSS.SVGRenderer();
        setRenderer(RENDER.renderer);
    }

    function setRenderer(index) {
        if (renderer) {
            /* 				output.removeChild(renderer.element); */
        }
        switch (index) {
            case WEBGL:
                renderer = webglRenderer;
                break;
            case CANVAS:
                renderer = canvasRenderer;
                break;
            case SVG:
                renderer = svgRenderer;
                break;
        }
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.insertBefore(renderer.element, null);

        var style = window.getComputedStyle(self);

        if (style.getPropertyValue('position') == 'static' || style.getPropertyValue('position').length == 0) {
            self.style.position = 'relative';
        }

    }

    function createScene() {
        scene = new FSS.Scene();
        scene.VERTEX = VERTEX;
        scene.LINE = LINE;
        scene.MESH = MESH;
    }

    function createMesh() {
        scene.remove(mesh);
        renderer.clear();
        geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.columns, MESH.rows);
        material = new FSS.Material(MESH.ambient, MESH.diffuse);
        mesh = new FSS.Mesh(geometry, material);
        scene.add(mesh);

        // Augment vertices for animation
        var v, vertex;
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
            vertex = geometry.vertices[v];
            vertex.anchor = FSS.Vector3.floor(FSS.Vector3.clone(vertex.position));
            vertex.step = FSS.Vector3.create(
                    Math.randomInRange(0.2, 1.0),
                    Math.randomInRange(0.2, 1.0),
                    Math.randomInRange(0.2, 1.0)
                    );
            vertex.time = Math.randomInRange(0, Math.PIM2);
        }
    }

    function createLights() {
        var l, light;
        for (l = scene.lights.length - 1; l >= 0; l--) {
            light = scene.lights[l];
            scene.remove(light);
        }
        renderer.clear();
        for (l = 0; l < LIGHT.length; l++) {
            for (var u = 0; u < LIGHT[l].count; u++) {
                light = new FSS.Light(LIGHT[l].ambient, LIGHT[l].diffuse);
                scene.add(light);

                // Augment light for animation
                light.mass = Math.randomInRange(0.5, 1);
                light.velocity = FSS.Vector3.create();
                light.acceleration = FSS.Vector3.create();
                light.force = FSS.Vector3.create();

                // Ring SVG Circle
                light.ring = document.createElementNS(FSS.SVGNS, 'circle');
                light.ring.setAttributeNS(null, 'stroke', light.ambient);
                light.ring.setAttributeNS(null, 'stroke-width', '0.5');
                light.ring.setAttributeNS(null, 'fill', 'none');
                light.ring.setAttributeNS(null, 'r', '10');

                // Core SVG Circle
                light.core = document.createElementNS(FSS.SVGNS, 'circle');
                light.core.setAttributeNS(null, 'fill', light.diffuseHex);
                light.core.setAttributeNS(null, 'r', '4');
            }
        }
    }
    let isRun = opt.autoStart;
    var callbacks = {
        resize: function (width, height) {

            if (typeof width == "undefined" || typeof width === undefined) {
                width = self.width();
            }
            if (typeof height == "undefined" || typeof height === undefined) {
                height = self.height();
            }
            var ratio_x = width / 1000;
            var ratio_y = height / 1000;
            var x_tiles = Math.round(ratio_x * 10) * MESH.zoom;
            var y_tiles = Math.round(ratio_y * 10) * MESH.zoom;
            MESH.columns = (MESH.columns_auto === true ? x_tiles : MESH.columns);
            MESH.rows = (MESH.rows_auto === true ? y_tiles : MESH.rows);
            renderer.setSize(width, height);
            FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
            createMesh();
        },
        update: function (opt) {
            createValues(opt);
            scene.vertex = VERTEX;
            scene.line = LINE;
            //Ambient
            for (i = 0, l = scene.meshes.length; i < l; i++) {
                scene.meshes[i].material.ambient.set(MESH.ambient);
                scene.meshes[i].material.diffuse.set(MESH.diffuse);
            }
            //width
            if (geometry.width !== MESH.width * renderer.width) {
                createMesh();
            }
            if (geometry.height !== MESH.height * renderer.height) {
                createMesh();
            }
            if (geometry.segments !== MESH.columns) {
                createMesh();
            }
            if (geometry.slices !== MESH.rows) {
                createMesh();
            }

            var light_index = 0;

            for (l = 0; l < LIGHT.length; l++) {

                for (var i = 0; i < LIGHT[l].count; i++) {
                    light = scene.lights[light_index];
                    light.ambient.set(LIGHT[l].ambient);

                    light = scene.lights[light_index];
                    light.diffuse.set(LIGHT[l].diffuse);

                    light_index++;
                }
            }

            if (scene.lights.length !== light_index) {
                createLights();
            }

        },
        animateValues: function (colors) {

            var body = document.body,
                    html = document.documentElement, scrollTop = ((window.pageYOffset || html.scrollTop) - (html.clientTop || 0));

            var height = Math.max(body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight);


            var length = colors.length;
            var height = Math.round(height / length); // Height of the segment between two colors
            var i = Math.floor(scrollTop / height); // Start color index
            var d = scrollTop % height / height; // Which part of the segment between start color and end color is passed
            var c1 = colors[i]; // Start color
            var c2 = colors[(i + 1) % length]; // End color
            var result = [];
            for (var i = 0; i < c1.length; i++) {
                result[i] = c1[i] + ((c2[i] - c1[i]) * d);
                if (i !== 3) {
                    result[i] = Math.round(result[i]);
                }
            }
            return result;
        },
        formatRGBA: function (a) {
            var string = "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + a[3] + ")";
            return string;
        },
        start: ()=>{
            if (!isRun) {
                isRun = true;
                animate();
            }
        },
        stop: ()=>{
            isRun = false;
        }
    };


    function animate() {
        now = Date.now() - start;
        update();
        render();
        if (isRun) {
            requestAnimationFrame(animate);
        }
    }

    function update() {
        var ox, oy, oz, l, light, v, vertex, offset = MESH.depth / 2;
        var light_index = 0;
        var render_vector = FSS.Vector3.floor(FSS.Vector3.create(renderer.halfWidth, renderer.halfHeight, 0));

        // Animate Lights
        for (l = 0; l < LIGHT.length; l++) {

            for (var i = 0; i < LIGHT[l].count; i++) {

                light = scene.lights[light_index];

                // Update Bounds
                FSS.Vector3.copy(LIGHT[l].bounds, center);
                FSS.Vector3.multiplyScalar(LIGHT[l].bounds, LIGHT[l].xyScalar);

                // Update Attractor
                FSS.Vector3.setZ(attractor, LIGHT[l].zOffset);

                // Overwrite the Attractor position
                if (LIGHT[l].autopilot && typeof LIGHT[l].position === "undefined") {
                    ox = Math.sin(LIGHT[l].step[0] * now * LIGHT[l].speed);
                    oy = Math.cos(LIGHT[l].step[1] * now * LIGHT[l].speed);
                    FSS.Vector3.set(attractor,
                            LIGHT[l].bounds[0] * ox,
                            LIGHT[l].bounds[1] * oy,
                            LIGHT[l].zOffset);
                }

                // Reset the z position of the light
                FSS.Vector3.setZ(light.position, LIGHT[l].zOffset);

                if (typeof LIGHT[l].position !== "undefined") {
                    FSS.Vector3.set(light.position);
                    FSS.Vector3.add(light.position, FSS.Vector3.create(LIGHT[l].position[0], LIGHT[l].position[1], LIGHT[l].zOffset));
                } else {
                    // Calculate the force Luke!
                    var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT[l].minDistance, LIGHT[l].maxDistance);
                    var F = LIGHT[l].gravity * light.mass / D;
                    FSS.Vector3.subtractVectors(light.force, attractor, light.position);
                    FSS.Vector3.normalise(light.force);
                    FSS.Vector3.multiplyScalar(light.force, F);
                    // Update the light position
                    FSS.Vector3.set(light.acceleration);
                    FSS.Vector3.add(light.acceleration, light.force);
                    FSS.Vector3.add(light.velocity, light.acceleration);
                    FSS.Vector3.multiplyScalar(light.velocity, LIGHT[l].dampening);
                    FSS.Vector3.limit(light.velocity, LIGHT[l].minLimit, LIGHT[l].maxLimit);
                    FSS.Vector3.add(light.position, light.velocity);
                }

                light_index++;
            }
        }



        // Animate Vertices
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
            vertex = geometry.vertices[v];
            ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
            oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
            oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
            vertex.position = FSS.Vector3.create(
                    MESH.xRange * geometry.segmentWidth * ox,
                    MESH.yRange * geometry.sliceHeight * oy,
                    MESH.zRange * offset * oz - offset);
            if (MESH.positionFloor === true) {
                vertex.position = FSS.Vector3.floor(vertex.position);
            }
            FSS.Vector3.add(vertex.position, vertex.anchor);
            FSS.Vector3.add(vertex.position, render_vector);
        }

        // Set the Geometry to dirty
        geometry.dirty = true;
    }

    function render() {
        renderer.render(scene);

        // Draw Lights
        if (LIGHT.draw) {
            var l, lx, ly, light;
            for (l = scene.lights.length - 1; l >= 0; l--) {
                light = scene.lights[l];
                lx = light.position[0];
                ly = light.position[1];
                switch (RENDER.renderer) {
                    case CANVAS:
                        renderer.context.lineWidth = 0.5;
                        renderer.context.beginPath();
                        renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
                        renderer.context.strokeStyle = light.ambient;
                        renderer.context.stroke();
                        renderer.context.beginPath();
                        renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
                        renderer.context.fillStyle = light.diffuse;
                        renderer.context.fill();
                        break;
                    case SVG:
                        /* 							lx += renderer.halfWidth; */
                        /* 							ly = renderer.halfHeight - ly; */
                        light.core.setAttributeNS(null, 'fill', light.diffuse);
                        light.core.setAttributeNS(null, 'cx', lx);
                        light.core.setAttributeNS(null, 'cy', ly);
                        renderer.element.appendChild(light.core);
                        light.ring.setAttributeNS(null, 'stroke', light.ambient);
                        light.ring.setAttributeNS(null, 'cx', lx);
                        light.ring.setAttributeNS(null, 'cy', ly);
                        renderer.element.appendChild(light.ring);
                        break;
                }
            }
        }
        MESH.onRender(scene, renderer.context);
    }

    function addEventListeners() {
        if(window.attachEvent) {
            window.addEventHandler = window.attachEvent;
        }
        window.addEventListener('resize', onWindowResize, false);
        self.addEventListener('click', onMouseClick, false);
        self.addEventListener('mousemove', onMouseMove, true);
    }

    //------------------------------
    // Callbacks
    //------------------------------
    function onMouseClick(event) {
        FSS.Vector3.set(attractor, event.x, event.y);
        /* 			FSS.Vector3.subtract(attractor, center); */
        LIGHT.autopilot = !LIGHT.autopilot;
    }

    function onMouseMove(event) {
        FSS.Vector3.set(attractor, event.x, event.y);
        /* 			FSS.Vector3.subtract(attractor, center); */
    }

    function onWindowResize(event) {
        callbacks.resize(self.offsetWidth, self.offsetHeight);
        render();
    }


    // Let there be light!
    initialise();
    return callbacks;
};

export default FSS_Worker;
