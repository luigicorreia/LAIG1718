/*
* MyLinearAnimation
* @constructor
*/

function MyLinearAnimation(scene, id, speed, controlPoints) {
  this.scene = scene;
  this.id = id;
  this.controlPoints = controlPoints;
  this.distance = 0;

  for(var i = 0; i < this.controlPoints.length-1; i++){
    this.distance += this.calculateDistance(this.controlPoints[i], this.controlPoints[i+1]);
  }

  this.time = this.distance / this.speed;
}

MyLinearAnimation.prototype = Object.create(MyAnimation.prototype);
MyLinearAnimation.prototype.constructor = MyLinearAnimation;


MyLinearAnimation.prototype.display = function(){
  console.log(distance);
}

MyLinearAnimation.prototype.calculateDistance = function(p0, p1){
  return Math.sqrt(
    Math.pow((p1[0] - p0[0]), 2) + Math.pow((p1[1] - p0[1]), 2) + Math.pow((p1[2] - p0[2]), 2)
  );
}
