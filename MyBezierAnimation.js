/*
* MyLinearAnimation
* @constructor
*/

function MyBezierAnimation(scene,speed,controlPoints) extends MyAnimation{
  super(this);
  this.scene = scene;
  this.speed = speed;
  this.controlPoints = controlPoints;
}

MyBezierAnimation.prototype = Object.create(CGFobject.prototype);
MyBezierAnimation.prototype.constructor = MyBezierAnimation;

MyBezierAnimation.prototype.display = function(){

}
