/**
 * MySphere
 * @constructor
 */

function MySphere(scene, args) {
 	CGFobject.call(this,scene);

  this.args = args.split(" ");

	this.radius=parseFloat(this.args[0]);
	this.slices=parseFloat(this.args[1]);
	this.stacks=parseFloat(this.args[2]);

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {

    this.indices = [];
  	this.vertices = [];
  	this.normals = [];
  	this.texCoords = [];

  	var ang1 = Math.PI / this.stacks;
  	var ang2 = 2 * Math.PI / this.slices;

 	for (var i = 0; i <= this.stacks; ++i) {
 		for (var j = 0; j <= this.slices; ++j) {
 			this.vertices.push(this.radius * Math.sin(i * ang1) * Math.cos(j * ang2), this.radius * Math.sin(i * ang1) * Math.sin(j * ang2), this.radius * Math.cos(i * ang1));
 			this.normals.push(Math.sin(i * ang1) * Math.cos(j * ang2), Math.sin(i * ang1) * Math.sin(j * ang2), Math.cos(i * ang1));
 			this.texCoords.push(1-j/this.slices, 1-i/this.stacks);
 		}
 	}

 	for (var i = 0; i < this.stacks; ++i) {
 		for (var j = 0; j < this.slices; ++j) {
 			this.indices.push(i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j + 1);
 			this.indices.push(i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j + 1, i * (this.slices + 1) + j + 1);
 		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
