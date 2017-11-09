/*
* MyLinearAnimation
* @constructor
*/

function MyLinearAnimation(scene,args){
  CGFobject.call(this,scene);
  this.scene = scene;
  this.object = null;
}

MyLinearAnimation.prototype = Object.create(CGFobject.prototype);
MyLinearAnimation.prototype.constructor = MyLinearAnimation;

MyLinearAnimation.prototype.display = function(){

}
