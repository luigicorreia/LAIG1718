/*
* MyCircularAnimation
* @constructor
*/

function MyCircularAnimation(scene,speed,center,radius,startang,rotang) extends MyAnimation{
  MyAnimation.call(this);
  this.scene = scene;
  this.speed = speed;
  this.center = center;
  this.radius = radius;
  this.startang = startang;
  this.rotang = rotang;
}

MyCircularAnimation.prototype = Object.create(CGFobject.prototype);
MyCircularAnimation.prototype.constructor = MyCircularAnimation;

MyCircularAnimation.prototype.display = function(){

}
