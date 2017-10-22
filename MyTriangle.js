/**
 * MyTriangle
 * @constructor
 */
  function MyTriangle(scene,args) {
 	/*CGFobject.call(this,scene);

 	this.initBuffers(args);*/
  CGFobject.call(this,scene);

	this.args = args;
	this.initBuffers();
 };

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 MyTriangle.prototype.initBuffers = function() {

   var coordenates = this.args.split(" ");

   //lados do triangulo
   this.a = Math.sqrt(Math.pow(coordenates[0] - coordenates[6], 2) + Math.pow(coordenates[1] - coordenates[7], 2) + Math.pow(coordenates[2] - coordenates[8], 2));
   this.b = Math.sqrt(Math.pow(coordenates[3] - coordenates[0], 2) + Math.pow(coordenates[4] - coordenates[1], 2) + Math.pow(coordenates[5] - coordenates[2], 2));
   this.c = Math.sqrt(Math.pow(coordenates[6] - coordenates[3], 2) + Math.pow(coordenates[7] - coordenates[4], 2) + Math.pow(coordenates[8] - coordenates[5], 2));

  //cosb e sinb
  this.cos_b = Math.cos((Math.pow(this.a, 2) - Math.pow(this.b, 2) + Math.pow(this.c, 2))/(2 * this.b * this.c));
  this.sin_b = Math.sqrt(1 - Math.pow(this.cos_b, 2));

  this.vertices = [
          coordenates[0], coordenates[1], coordenates[2],
          coordenates[3], coordenates[4], coordenates[5],
          coordenates[6], coordenates[7], coordenates[8],
    ];

  this.indices = [
    0, 1, 2
  ];

  this.normals = [
      0, 1, 0,
      0, 1, 0,
      0, 1, 0
    ];


  this.originalTexCoords = [
      0, 0,
      0, 1,
      1, 1
    ];

  this.texCoords = this.originalTexCoords.slice();

this.primitiveType=this.scene.gl.TRIANGLES;
this.initGLBuffers();
 };

 MyTriangle.prototype.scaleTexCoordss = function(s, t) {

  this.texCoords = [
			0, 1,
			this.c/s, 1,
			(this.c - this.a * this.cos_b)/s, (1 - this.a * this.sin_b)/(t)
		];
	this.updateTexCoordsGLBuffers();
}
