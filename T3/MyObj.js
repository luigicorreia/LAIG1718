/**
 * My objs
 * @constructor
 */
function MyObj(scene, name_obj) {
    CGFobject.call(this, scene);

    this.name = name_obj;

    this.initBuffers();
};
  
MyObj.prototype = Object.create(CGFobject.prototype);
MyObj.prototype.constructor = MyObj;
  
/**
 * Initiates all WEBCGF atributes of the primitive
 */
MyObj.prototype.initBuffers = function () {
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    this.indices = [];
  
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.read_file();

    var mesh = new OBJ.Mesh(this.content);

    console.log(mesh.vertices.length);

    this.vertices = mesh.vertices;
    this.normals = mesh.vertexNormals;
    this.texCoords = mesh.textures;
    this.indices = mesh.indices;

    this.initGLBuffers();
};
  
/**
 * Function that applies the amp factors of the texture, since it is isnt necessary on the circle this 
 * function only exist to overload convenience
 */
MyObj.prototype.loadTexture = function (texture) {
  
}

MyObj.prototype.read_file = function(){
    console.log("read_file " + this.name);
    
    var client = new XMLHttpRequest();
    
    this.file_read  = false;
    
    client.open('GET', 'models/'+this.name+'.obj',false);
    client.send();
    
    if(client.status === 200){
        this.file_read = true;
        this.content = client.responseText;
        console.log(this.content);
    }
}
  