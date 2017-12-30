function MyFirstEnvironment(scene){
	CGFobject.call(this, scene);
}

MyFirstEnvironment.prototype = Object.create(CGFobject.prototype);
MyFirstEnvironment.prototype.constructor = MyFirstEnvironment;

MyFirstEnvironment.prototype.display = function() {


	let square = new MySquare(this.scene);
	let rectangle = new MyRectangle(this.scene, "0 180 180 0");

	this.scene.pushMatrix();
		this.scene.translate(-2.5,-3,-2.5);
		this.scene.translate(-58,-5.6,-58);
		this.scene.scale(15,0.7,15);
		this.scene.woodTex.apply();
		square.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-26,-6.7,-26);
		this.scene.scale(8,0.8,8);
		this.scene.woodTex.apply();
		square.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(1,10,1);
		this.scene.translate(-20,-8.5,-25);
		square.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(1,10,1);
		this.scene.translate(40,-8.5,-25);
		square.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(1,10,1);
		this.scene.translate(-20,-8.5,40);
		square.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(1,10,1);
		this.scene.translate(40,-8.5,40);
		square.display();
	this.scene.popMatrix();


}