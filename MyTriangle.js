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

   var coordenates = args.split(" ").map(Number);


 	this.vertices = [
 	coordenates[0], coordenates[1], coordenates[2],
 	coordenates[3], coordenates[4], coordenates[5],
 	coordenates[6], coordenates[7], coordenates[8],
 	];

 	this.indices = [
 	0, 1, 2,
 	];
  var v1 = vec3.fromValues(coordenates[0], coordenates[1], coordenates[2]);
	var v2 = vec3.fromValues(coordenates[3], coordenates[4], coordenates[5]);
	var v3 = vec3.fromValues(coordenates[6], coordenates[7], coordenates[8]);

  var AB = vec3.create();
	vec3.sub(AB,v2, v1);
	var AC = vec3.create();
	vec3.sub(AC, v3, v1);
	var BC = vec3.create();
	vec3.sub(BC, v3, v2);

	var N = vec3.create();
	vec3.cross(N, AB, BC);
	vec3.normalize(N, N);

	this.normals = [
		N[0], N[1], N[2],
		N[0], N[1], N[2],
		N[0], N[1], N[2],
    ];

  var cosB = vec3.dot(AB,BC)/(vec3.length(AB)*vec3.length(BC));
//  var tC = (vec3.sqrLen(AB) + vec3.sqrLen(AC) - vec3.sqrLen(BC))/ (vec3.length(AB) * 2);
	//var sC = Math.sqrt(vec3.sqrLen(AC) - tC * tC);
  this.originalTexCoords = [
		0,1,
		vec3.length(AB),1,
		vec3.length(AB)-vec3.length(BC)*cosB, 1-vec3.length(BC)*Math.sqrt(1-(Math.pow(cosB,2)))
	];

	this.texCoords = this.originalTexCoords.slice();

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyTriangle.prototype.scaleTexCoordss = function(s, t) {

   for (var i = 0; i < this.texCoords.length; i += 2) {
 		this.texCoords[i] = this.originalTexCoords[i] / s;
 		this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
 	}
 	this.updateTexCoordsGLBuffers();
}
