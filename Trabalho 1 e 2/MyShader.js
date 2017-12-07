function MyShader(scene, object, texturePath) {
    this.scene = scene;
    this.obj = object;
    this.wireframe = false;
    this.shader = new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag");
    this.texture = null;
    this.texture2 = texturePath;

}

MyShader.prototype.constructor = MyShader;

MyShader.prototype.display = function() {
	this.scene.pushMatrix();
		this.appearance.apply();
		this.scene.setActiveShader(this.shader);
		this.texture.bind(1);
		this.MyShader.display();
	this.scene.popMatrix();

	this.scene.setActiveShader(this.scene.defaultShader);
};
