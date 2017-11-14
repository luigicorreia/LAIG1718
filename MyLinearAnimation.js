/*
* MyLinearAnimation
* @constructor
*/

function MyLinearAnimation(scene,controlPoints,speed) extends MyAnimation{
  MyAnimation.call(this);
  this.distance = 0;
  this.speed = speed;


  for(var i = 0; i < controlPoints.length-1; i++){
    distance += calculateDistance(controlPoints[i], controlPoints[i+1]);
  }

  this.time = this.distance / this.speed;

}

MyLinearAnimation.prototype = Object.create(MyAnimation.prototype);
MyLinearAnimation.prototype.constructor = MyLinearAnimation;

MyLinearAnimation.prototype.display = function(){
  console.log(distance);
}

MyLinearAnimation.prototype.calculateDistance = function(p0, p1){
  Math.sqrt(
    Math.pow((p1[0] - p0[0]), 2) + Math.pow((p1[1] - p0[1]), 2) + Math.pow((p1[2] - p0[2]), 2)
  );
}
