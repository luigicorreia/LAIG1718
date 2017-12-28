function MySecondEnvironment(scene){
	CGFobject.call(this, scene);
}

MySecondEnvironment.prototype = Object.create(CGFobject.prototype);
MySecondEnvironment.prototype.constructor = MySecondEnvironment;

MySecondEnvironment.prototype.display = function() {

	let cylinder = new MyCylinderWithTopAndBottom(this.scene, "2 25 25 50 50 1 1");

	this.scene.pushMatrix();
		this.scene.translate(13.5,-2.1,13.5);
		this.scene.redTex.apply();
		cylinder.display();
	this.scene.popMatrix();


}