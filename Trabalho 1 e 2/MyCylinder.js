/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, height, botRad, topRad, stacks, slices) {
 	CGFobject.call(this,scene);

 	this.height = height;
 	this.botRad = botRad;
 	this.topRad = topRad;
 	this.stacks = stacks;
 	this.slices = slices;

	this.deltaHeight = this.height/this.stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];

	var ang = 2*Math.PI/this.slices;
	var currRad = this.botRad;
	var deltaRadius = (this.topRad - this.botRad)/this.stacks;


	for(j = 0; j <= this.stacks; j++){
		for(i = 0; i <= this.slices; i++){

		this.vertices.push(currRad * Math.cos(i*ang), currRad * Math.sin(i*ang), j * this.deltaHeight);
		this.normals.push(currRad * Math.cos(ang/2 + i*ang), currRad * Math.sin(ang/2 + i*ang), 0);
		this.texCoords.push(i / this.slices, j / this.stacks);
		}
		currRad += deltaRadius;
	}

	for(j = 0; j < this.stacks + 1; j++){
		for(i = 0; i < this.slices; i++){

			this.indices.push(j*this.slices+i,j*this.slices+((i+1)%this.slices),(j+1)*this.slices+(i+1)%this.slices);
			this.indices.push(j*this.slices+i,(j+1)*this.slices+((i+1)%this.slices),(j+1)*this.slices+i);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
