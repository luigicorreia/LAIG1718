function MySquare(scene){
	CGFobject.call(this, scene);
}

MySquare.prototype = Object.create(CGFobject.prototype);
MySquare.prototype.constructor = MySquare;

MySquare.prototype.display = function(){
	let rectangle = new MyRectangle(this.scene, "0 4 5 0");

	this.scene.pushMatrix();
		this.scene.translate(2.5,4,7.5);
		rectangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2.5,4,2.5);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		rectangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(7.5,4,7.5);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		rectangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(7.5,4,2.5);
		this.scene.rotate(Math.PI, 0, 1, 0);
		rectangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.translate(2.5,-7.5,8);
		this.scene.scale(1,1.25,1);
		rectangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2.5,4,2.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1,1.25,1);
		rectangle.display();
	this.scene.popMatrix();
}