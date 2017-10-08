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

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
  var stepAng = 2*Math.PI / this.slices;
	var radius = Math.PI / this.stacks;
	var curRadius = 0;

 	for (var i = 0; i <this.stacks; i++){
		curRadius = i * radius;
		for (var j = 0; j < this.slices; j++){
			this.vertices.push(this.radius * Math.sin(curRadius) * Math.cos(j*stepAng),
                     this.radius * Math.sin(curRadius) * Math.sin(j*stepAng),
                      this.radius * Math.cos(curRadius));
      this.vertices.push(this.radius * Math.sin(curRadius + radius) * Math.cos(j*stepAng),
                     this.radius * Math.sin(curRadius + radius) * Math.sin(j*stepAng),
                      this.radius * Math.cos(radius * (i+1)));

      this.normals.push(this.radius * Math.sin(curRadius) * Math.cos(j*stepAng),
                     this.radius * Math.sin(curRadius) * Math.sin(j*stepAng),
                      this.radius * Math.cos(curRadius));
			this.normals.push(this.radius * Math.sin(curRadius + radius) * Math.cos(j*stepAng),
                     this.radius * Math.sin(curRadius + radius) * Math.sin(j*stepAng),
                      this.radius * Math.cos(radius * (i+1)));

			this.texCoords.push(((i + 1)/this.stacks) * (Math.cos(j*stepAng)/2 + 0.5),
                           (i + 1)/this.stacks) * (1- (Math.sin(j*stepAng)/2 + 0.5));
			this.texCoords.push(((i + 1)/this.stacks) * (Math.cos(j*stepAng)/2 + 0.5),
                           (i + 2)/this.stacks) * (1- (Math.sin(j*stepAng)/2 + 0.5));


      this.indices.push((i*2*this.slices)+(2*j)+0);
			this.indices.push((i*2*this.slices)+(2*j)+1);
      this.indices.push((i*2*this.slices)+(((2*j)+3)% (this.slices * 2)));

      this.indices.push((i*2*this.slices)+(((2*j)+2) % (this.slices * 2)));
			this.indices.push((i*2*this.slices)+(((2*j)+0) % (this.slices * 2)));
      this.indices.push((i*2*this.slices)+(((2*j)+3) % (this.slices * 2)));

		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
