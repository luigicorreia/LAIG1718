/**
 * MyQuad
 * @constructor
 */
 var minS,minT,maxS,maxT;
  function MyRectangle(scene,args) {
 	CGFobject.call(this,scene);
  this.args = args
 	minS =  0.0;
 	minT = 0.0;
 	maxS =1.0;
 	maxT = 1.0;


 	this.initBuffers();
 };

 MyRectangle.prototype = Object.create(CGFobject.prototype);
 MyRectangle.prototype.constructor = MyRectangle;

 MyRectangle.prototype.initBuffers = function() {

   var coordenates = this.args.split(" ").map(Number); //left-top--- right-bottom

 	this.vertices = [
 	coordenates[0], coordenates[3], 0,
 	coordenates[2],coordenates[3], 0,
 	coordenates[0],coordenates[1], 0,
 	coordenates[2],coordenates[1], 0
 	];

 	this.indices = [
 	0, 1, 2,
 	3, 2, 1,
 	];

 	this.normals = [
 	0,0,1,
 	0,0,1,
 	0,0,1,
 	0,0,1,
 	];

 	this.originalTexCoords = [
        0,0,
        Math.abs(coordenates[2]-coordenates[0]),0,
        0,Math.abs(coordenates[3]-coordenates[1]),
        Math.abs(coordenates[2]-coordenates[0]),Math.abs(coordenates[3]-coordenates[1])
    ];

    this.texCoords = this.originalTexCoords.slice();

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyRectangle.prototype.scaleTexCoordss = function(s, t) {
	for (var i = 0; i < this.texCoords.length; i += 2) {
			this.texCoords[i] = this.originalTexCoords[i] / s;
			this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
	}
	this.updateTexCoordsGLBuffers();
}
