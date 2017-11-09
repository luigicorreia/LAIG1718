/*
* MyAnimation
* @constructor
*/

function MyAnimation(scene,args){
  CGFobject.call(this,scene);
  this.scene = scene;
  this.object = null;
}

MyAnimation.prototype = Object.create(CGFobject.prototype);
MyAnimation.prototype.constructor = MyAnimation;

MyAnimation.prototype.display = function(){

}
