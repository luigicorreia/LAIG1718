function MySecondEnvironment(scene){
	CGFobject.call(this, scene);
}

MySecondEnvironment.prototype = Object.create(CGFobject.prototype);
MySecondEnvironment.prototype.constructor = MySecondEnvironment;

MySecondEnvironment.prototype.display = function() {

	let cylinder = new MyCylinderWithTopAndBottom(this.scene, "2 25 25 50 50 1 1");
	let table = new MyCylinderWithTopAndBottom(this.scene, "10 35 35 50 50 1 1");
	let support = new MyCylinderWithTopAndBottom(this.scene, "40 5 5 50 50 1 1");
	let base = new MyCylinderWithTopAndBottom(this.scene, "3 15 15 50 50 1 1");


	this.scene.pushMatrix();
		this.scene.translate(13.5,-2.1,13.5);
		this.scene.redTex.apply();
		cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(13.5,-12.1,13.5);
		this.scene.redTex.apply();
		table.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(13.5,-42.1,13.5);
		this.scene.blackTex.apply();
		support.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(13.5,-45.1,13.5);
		this.scene.blackTex.apply();
		base.display();
	this.scene.popMatrix();

}