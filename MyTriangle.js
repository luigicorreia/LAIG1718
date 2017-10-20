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

  this.AB = vec3.create();
	vec3.sub(this.AB,v2, v1);
	this.AC = vec3.create();
	vec3.sub(this.AC, v3, v1);
	this.BC = vec3.create();
	vec3.sub(this.BC, v3, v2);

	var N = vec3.create();
	vec3.cross(N, this.AB, this.BC);
	vec3.normalize(N, N);

	this.normals = [
		N[0], N[1], N[2],
		N[0], N[1], N[2],
		N[0], N[1], N[2],
    ];


  var tC = (vec3.sqrLen(this.AB) + vec3.sqrLen(this.AC) - vec3.sqrLen(this.BC))/ (vec3.length(this.AB) * 2);
	var sC = Math.sqrt(vec3.sqrLen(this.AC) - tC * tC);
  
  this.originalTexCoords = [
		0,0,
		vec3.length(this.AB),0,
    sC,tC
	];

	this.texCoords = this.originalTexCoords.slice();

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyTriangle.prototype.scaleTexCoordss = function(s, t) {

var cosB = vec3.dot(this.AB,this.BC)/(vec3.length(this.AB)*vec3.length(this.BC));

this.texCoords = [
  0,1,
  vec3.length(this.AB)/s,1,
  (vec3.length(this.AB)-vec3.length(this.BC)*cosB)/s, (1-vec3.length(this.BC)*Math.sqrt(1-(Math.pow(cosB,2))))/t
];
 	this.updateTexCoordsGLBuffers();
}
