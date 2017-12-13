/*
* MyBezierAnimation
* @constructor
*/

function MyBezierAnimation(scene,speed,bezierPoints){
  
  this.scene = scene;
  this.speed = speed;
  this.bezierPoints = bezierPoints;
  this.matrix = mat4.create();
  this.end = false;
  this.time = 0;
  //bezeier points
  this.p1 = bezierPoints[0];
  this.p2 = bezierPoints[1];
  this.p3 = bezierPoints[2];
  this.p4 = bezierPoints[3];

 //initial position
  this.x = this.p1[0];
  this.y = this.p1[1];
  this.z = this.p1[2];

  this.totalDistance = this.getTotalDistance();  // distancia total

  this.totalTime = this.totalDistance / this.speed;  //tempo que demorea a percorrer o trajeto inteiro
}

MyBezierAnimation.prototype = Object.create(CGFobject.prototype);
MyBezierAnimation.prototype.constructor = MyBezierAnimation;

MyBezierAnimation.prototype.getMatrix = function(){
  return this.matrix;
}

MyBezierAnimation.prototype.update = function(time){

  if(!this.end){
    var currPoint = this.bezierFormula(this.time);
    let matrixTmp = mat4.create();
    mat4.translate(matrixTmp, matrixTmp, currPoint);
    mat4.rotateY(matrixTmp, matrixTmp, Math.atan2(currPoint[0],currPoint[2]));

    this.time += time/1000;  //incrementa o time
    this.matrix = matrixTmp;
  }
}

//calculates the total distance
MyBezierAnimation.prototype.getTotalDistance = function() {
  var l2 = this.calculateIntermediatePoints(this.p1, this.p2);
  var h = this.calculateIntermediatePoints(this.p2, this.p3);
  var l3 = this.calculateIntermediatePoints(l2, h);
  var r3 = this.calculateIntermediatePoints(this.p3, this.p4);
  var r2 = this.calculateIntermediatePoints(h, r3);

  return this.calculateDistance(this.p1, l2) +  this.calculateDistance(l2, l3) +
          this.calculateDistance(l3, r2) +  this.calculateDistance(r2, r3) +
          this.calculateDistance(r3, this.p4);
}

//calculate
MyBezierAnimation.prototype.calculateIntermediatePoints = function(p1, p2) {
  return [((p1[0] + p2[0])/2),((p1[1] + p2[1])/2),((p1[2] + p2[2])/2)];
}

MyBezierAnimation.prototype.bezierFormula = function(time){

  this.t = time/this.totalTime;
  if(this.t < 1){
    var x = Math.pow((1-this.t), 3)*this.x + 3*this.t*Math.pow(1-this.t,2)*this.p2[0] + 3*Math.pow(this.t,2)*(1-this.t)*this.p3[0] + Math.pow(this.t,3)*this.p4[0];
	  var y = Math.pow((1-this.t), 3)*this.y + 3*this.t*Math.pow(1-this.t,2)*this.p2[1] + 3*Math.pow(this.t,2)*(1-this.t)*this.p3[1] + Math.pow(this.t,3)*this.p4[1];
    var z = Math.pow((1-this.t), 3)*this.z + 3*this.t*Math.pow(1-this.t,2)*this.p2[2] + 3*Math.pow(this.t,2)*(1-this.t)*this.p3[2] + Math.pow(this.t,3)*this.p4[2];

    this.x = x;
    this.y = y;
    this.z = z;

    return [this.x,this.y,this.z];
  }
  else{
    this.end = true;
    return [this.x,this.y,this.z];
  }
}

MyBezierAnimation.prototype.calculateDistance = function(point0, point1) {
  return Math.sqrt(Math.pow((point1[0] - point0[0]), 2) + Math.pow((point1[1] - point0[1]), 2) + Math.pow((point1[2] - point0[2]), 2));
}

//return true if animation end,else returns false
MyBezierAnimation.prototype.getEnd = function() {
  return this.end;
}

//clones the animation
MyBezierAnimation.prototype.clone = function() {
  return new MyBezierAnimation(this.scene,this.speed,this.bezierPoints);
}

//restarts time
MyBezierAnimation.prototype.restartTime = function() {
  return this.time = 0;
}
