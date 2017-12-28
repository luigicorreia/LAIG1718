/**
 * MyCylinderWithTopAndBottom
 * @constructor
 */
 function MyCylinderWithTopAndBottom(scene, args) {
 	CGFobject.call(this,scene);

	args = args.split(" ");

	this.height = parseFloat(args[0]);
	this.botRad = parseFloat(args[1]);
	this.topRad = parseFloat(args[2]);
	this.stacks = parseFloat(args[3]);
	this.slices = parseFloat(args[4]);
	this.topCap = parseFloat(args[5]);
	this.botCap = parseFloat(args[6]);
	this.heightInc = this.height/this.stacks;

	this.cylinder = new MyCylinder(this.scene, this.height, this.botRad, this.topRad, this.stacks, this.slices);
	this.topCircle = new MyCircle(this.scene, this.slices);
	this.botCircle = new MyCircle(this.scene, this.slices);

 };

 MyCylinderWithTopAndBottom.prototype = Object.create(CGFobject.prototype);
 MyCylinderWithTopAndBottom.prototype.constructor = MyCylinderWithTopAndBottom;

 MyCylinderWithTopAndBottom.prototype.display = function() {

 	this.scene.pushMatrix();
 		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.cylinder.display();
 	this.scene.popMatrix();

  if(this.botCap == 1){
  		this.scene.pushMatrix();
  		this.scene.rotate(-Math.PI/2, 1, 0, 0);
   		this.scene.rotate(Math.PI, 0, 1, 0);
   		this.scene.scale(this.botRad, this.botRad, 1);
  		this.topCircle.display();
   		this.scene.popMatrix();
  	}

	if(this.topCap == 1){
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
 		this.scene.translate(0, 0, this.height);
 		this.scene.scale(this.topRad, this.topRad, 1);
		this.topCircle.display();
 		this.scene.popMatrix();
	}
 };
