/*
* MyCircularAnimation
* @constructor
*/

function MyCircularAnimation(scene,speed,center,radius,startang,rotang) extends MyAnimation{
  MyAnimation.call(this);
  this.scene = scene;
  this.angularSpeed = speed / radius;
  this.center = center;
  this.radius = radius;
  this.startang = startang;
  this.rotang = rotang;
  this.angTmp = this.startang;
  this.matrix;
}

MyCircularAnimation.prototype = Object.create(CGFobject.prototype);
MyCircularAnimation.prototype.constructor = MyCircularAnimation;


MyCircularAnimation.prototype.update = function(time){
  if(this.angTmp < (this.startang + this.rotang)){
    this.angtmp += this.angularSpeed*time;
    let matrixTmp = mat4.create();
    matrixTmp.translate(this.center[0],this.center[1],this.center[2]);
    matrixTmp.rotate(aux * DEGREE_TO_RAD,0,1,0);
    matrixTmp.translate(this.radius,0,0);
    matrixTmp.rotate(90 * DEGREE_TO_RAD,0,1,0);
    this.matrix = matrixTmp;
  }
}

MyCircularAnimation.prototype.getMatrix = function(){
return this.matrix;
}
