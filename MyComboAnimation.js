/*
* MyCircularAnimation
* @constructor
*/

function MyComboAnimation(scene,speed,center,radius,startang,rotang){
  CGFobject.call(this,scene);
  this.matrix = mat4.create();
};

MyComboAnimation.prototype = Object.create(CGFobject.prototype);
MyComboAnimation.prototype.constructor = MyComboAnimation;


MyComboAnimation.prototype.update = function(time){

  let matrixTmp = mat4.create();
  this.matrix = matrixTmp;
}

//return the animation matrix
MyComboAnimation.prototype.getMatrix = function(){
return this.matrix;
}
