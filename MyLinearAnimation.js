/*
 * MyLinearAnimation
 * @constructor
 */

function MyLinearAnimation(scene, controlPoints, speed) extends MyAnimation {
  MyAnimation.call(this);
  this.totalDistance = 0;
  this.partialDistances = [];
  this.matrix;
  this.speed = speed;


  for (var i = 0; i < controlPoints.length - 1; i++) {
    let distance = calculateDistance(controlPoints[i], controlPoints[i + 1]);
    this.totalDistance += distance;
    this.partialDistances.push(distance);
  }

  this.velocity = this.totalDistance / this.speed;

}

MyLinearAnimation.prototype = Object.create(MyAnimation.prototype);
MyLinearAnimation.prototype.constructor = MyLinearAnimation;

MyLinearAnimation.prototype.update = function(time) {

}

MyLinearAnimation.prototype.getMatrix = function() {
  return this.matrix;
}

MyLinearAnimation.prototype.calculateDistance = function(p0, p1) {
  return Math.sqrt(Math.pow((p1[0] - p0[0]), 2) + Math.pow((p1[1] - p0[1]), 2) + Math.pow((p1[2] - p0[2]), 2));
}

MyLinearAnimation.prototype.calculateAng = function(p0, p1) {
  return Math.atan2(p1[0]-p0[0],p1[2]-p0[2]);
}
