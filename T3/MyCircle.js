function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);

	this.slices = slices;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {

  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];

	var ang = 2*Math.PI/this.slices;

 	for (i = 0; i < this.slices; i++){
 	    this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), 0);
 	    this.normals.push(0,0,1);
 	    this.texCoords.push((-Math.cos(i*ang)+1)/2,(Math.sin(i*ang)+1)/2);
 	}

 	for (j = 0; j < this.slices-2; j++){
		this.indices.push(0,j+1,j+2);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
