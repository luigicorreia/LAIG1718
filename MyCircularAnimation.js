/*
* MyCircularAnimation
* @constructor
*/

function MyCircularAnimation(scene,speed,center,radius,startang,rotang){
  CGFobject.call(this,scene);
  this.scene = scene;
  this.speed = speed;
  this.center = center;
  this.radius = radius;
  this.startang = startang * DEGREE_TO_RAD;
  this.rotang = rotang* DEGREE_TO_RAD;
  this.end = false;  //end flag
  this.matrix = mat4.create();  //matriz
  this.span = (this.rotang*this.radius)/this.speed;
  this.time = 0;
};

MyCircularAnimation.prototype = Object.create(CGFobject.prototype);
MyCircularAnimation.prototype.constructor = MyCircularAnimation;


MyCircularAnimation.prototype.update = function(time){
  //checks if animation ended
  if(this.end){
    return;
  }

  //checks if it is the last movement of animation
  if(this.time > this.span){
    this.end = true;
    this.time = this.span;
  }

    let matrixTmp = mat4.create();

    mat4.translate(matrixTmp,matrixTmp,this.center);
    mat4.rotateY(matrixTmp,matrixTmp,this.startang + (this.time /this.span)*this.rotang);
    mat4.translate(matrixTmp,matrixTmp,[this.radius,0,0]);

    if(this.rotang>0)
        mat4.rotateY(matrixTmp,matrixTmp,90 * DEGREE_TO_RAD);

    this.time += time/1000;
    this.matrix = matrixTmp;
}

//return the animation matrix
MyCircularAnimation.prototype.getMatrix = function(){
return this.matrix;
}
