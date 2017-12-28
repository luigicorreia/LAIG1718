var DEGREE_TO_RAD = Math.PI / 180;
var FPS = 60;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};

    this.selectables = {};

    this.totalTime = 0;

    this.scenes = {};

}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.scenes = ["wood","red"];

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);
    this.setUpdatePeriod(1000/FPS);

    this.whiteTex = new CGFappearance(this);
    this.whiteTex.setAmbient(0.3,0.3,0.3,1);
    this.whiteTex.setDiffuse(1,1,1,1);
    this.whiteTex.setSpecular(0.8,0.8,0.8,1);
    this.whiteTex.setShininess(120);

    this.blackTex = new CGFappearance(this);
    this.blackTex.setAmbient(0.3,0.3,0.3,1);
    this.blackTex.setDiffuse(0,0,0,1);
    this.blackTex.setSpecular(0.2,0.2,0.2,1); 
    this.blackTex.setShininess(120);

    this.woodTex = new CGFappearance(this);
    this.woodTex.setAmbient(0.3,0.3,0.3,1);
    this.woodTex.setDiffuse(0.6,0.6,0.6,1);
    this.woodTex.setSpecular(0.8,0.8,0.8,1); 
    this.woodTex.setShininess(120);
    this.woodTex.loadTexture("../T3/scenes/images/wooden.png");
    this.woodTex.setTextureWrap("MIRRORED_REPEAT", "MIRRORED_REPEAT");

    this.redTex = new CGFappearance(this);
    this.redTex.setAmbient(0.5,0.1,0.1,1);
    this.redTex.setDiffuse(0.9,0,0,1);
    this.redTex.setSpecular(0.8,0.3,0.3,1); 
    this.redTex.setShininess(120);


    this.setPickEnabled(true);

}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    this.cameraPerspectives = [];
    this.cameraPerspectives[0] = [vec3.fromValues(24, 20, 4), vec3.fromValues(-2, -1, 4)];
    this.cameraPerspectives[1] = [vec3.fromValues(-18, 120, 18), vec3.fromValues(18, 0, 18)];

    this.camera = new CGFcamera(0.4,0.1,500,this.cameraPerspectives[0][0],this.cameraPerspectives[0][1]);
}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function()
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);

    this.interface.addSelectables(this.graph.selectables, this.graph);

    this.interface.chooseScene(this.scenes, this.graph);
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk)
    {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.graph.displayScene();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}


    this.popMatrix();

    // ---- END Background, camera and axis setup
}

XMLscene.prototype.update = function(currTime) {

    this.lasTime = this.lasTime || 0.0;
    this.deltatime = currTime - this.lastTime || 0.0;
    this.lastTime = currTime;
    this.totalTime += this.deltatime;
}


XMLscene.prototype.logPicking = function ()
{
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i=0; i< this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj)
                {
                    var customId = this.pickResults[i][1];              
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                }
            }
            this.pickResults.splice(0,this.pickResults.length);
        }       
    }
}

