/**
 * MyTriangle
 * @constructor
 */
  function MyTriangle(scene,args) {
 	CGFobject.call(this,scene);

 	this.initBuffers(args);
 };

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 MyTriangle.prototype.initBuffers = function(args) {

   var coordenates = args.split(" ");


 	this.vertices = [
 	coordenates[0], coordenates[1], coordenates[2],
 	coordenates[3], coordenates[4], coordenates[5],
 	coordenates[6], coordenates[7], coordenates[8],
 	coordenates[0], coordenates[1], coordenates[2],
  coordenates[3], coordenates[4], coordenates[5],
 	coordenates[6], coordenates[7], coordenates[8]
 	];

 	this.indices = [
 	0, 1, 2,
 	5,4,3
 	];

 	this.normals = [
 	0,0,1,
 	0,0,1,
 	0,0,1,
    0,0,-1,
    0,0,-1,
    0,0,-1,
 	];

 	this.texCoords = [
    0.0,1.0,
    1.0,1.0,
    1.0,0.0,
    1.0,1.0,
    0.0,1.0,
    0.0,0.0,
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 /*MyTriangle.prototype.scaleTexCoordss = function(s, t) {

   for (var i = 0; i < this.texCoords.length; i += 2) {
 		this.texCoords[i] = this.textCoords[i] / s;
 		this.texCoords[i + 1] = this.textCoords[i+1] / t;
 	}

 	this.updateTexCoordsGLBuffers();
}*/
