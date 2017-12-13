 function MyPiece(scene, args) {
 	CGFobject.call(this,scene);

	args = args.split(" ");

	this.color = args[0];
	this.type = args[1];
	this.botRad = 1.5;
	this.topRad = 1.5;
	this.stacks = 20;
	this.slices = 20;
	this.height = 0;

	this.texture;

	if(this.type == "man")
		this.height = 1;
	else if(this.type == "king")
		this.height = 3;
	else
		console.log("Wrong type of piece... Possible types: man, king");


	if(this.color == "white")
		this.texture = this.scene.whiteTex;
	else if(this.color == "black")
		this.texture = this.scene.blackTex;
	else
		console.log("Wrong color of piece... Possible types: black, white");

	this.cylinder = new MyCylinder(this.scene, this.height, this.botRad, this.topRad, this.stacks, this.slices);
	this.topCircle = new MyCircle(this.scene, this.slices);
	this.botCircle = new MyCircle(this.scene, this.slices);

 };

 MyPiece.prototype = Object.create(CGFobject.prototype);
 MyPiece.prototype.constructor = MyPiece;

 MyPiece.prototype.display = function() {

 	this.scene.pushMatrix();
 		this.texture.apply();
 		this.scene.rotate(-Math.PI/2, 1, 0, 0);
 		this.cylinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-Math.PI/2, 1, 0, 0);
 		this.scene.rotate(Math.PI, 0, 1, 0);
 		this.scene.scale(this.botRad, this.botRad, 1);
 		this.topCircle.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-Math.PI/2, 1, 0, 0);
 		this.scene.translate(0, 0, this.height);
 		this.scene.scale(this.topRad, this.topRad, 1);
 		this.topCircle.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(-Math.PI/2, 1, 0, 0);
 	this.scene.popMatrix();
	
 };