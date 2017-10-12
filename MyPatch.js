/*
*MyPatch
* @constructor
*/

function MyPatch(scene,args) {
CGFobject.call(this,scene);

this.initBuffers();
};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.initBuffers = function() {

};
