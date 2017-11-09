/*
* MyLinearAnimation
* @constructor
*/

function MyBezierAnimation(scene,args){
  CGFobject.call(this,scene);
  this.scene = scene;
  this.object = null;
}

MyBezierAnimation.prototype = Object.create(CGFobject.prototype);
MyBezierAnimation.prototype.constructor = MyBezierAnimation;

MyBezierAnimation.prototype.display = function(){

}
