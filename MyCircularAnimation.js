/*
* MyCircularAnimation
* @constructor
*/

function MyCircularAnimation(scene,args){
  CGFobject.call(this,scene);
  this.scene = scene;
  this.object = null;
}

MyCircularAnimation.prototype = Object.create(CGFobject.prototype);
MyCircularAnimation.prototype.constructor = MyCircularAnimation;

MyCircularAnimation.prototype.display = function(){

}
