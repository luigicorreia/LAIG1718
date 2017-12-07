/*
* MyComboAnimation
* @constructor
*/

function MyComboAnimation(scene,animationsIds){
  this.scene = scene;
  this.ComboAnimationsID = animationsIds;
  this.currAnimation = null;
  this.end = false;
  this.Index = 0;
  this.endMatrix = mat4.create();
  mat4.identity(this.endMatrix);
  this.matrix = mat4.create();
};

MyComboAnimation.prototype = Object.create(CGFobject.prototype);
MyComboAnimation.prototype.constructor = MyComboAnimation;


MyComboAnimation.prototype.update = function(time){

  //checks if ended
  if (this.end)
      return;
  else if (this.ComboAnimationsID.length > 0) {

      // gets next animation and restarts the time
      if (this.currAnimation == null) {
          this.currAnimation = this.scene.graph.animations[this.ComboAnimationsID[this.Index]].clone();
          this.currAnimation.restartTime();
      }

      this.currAnimation.update(time); //updates the animation

      let matrixTmp = this.currAnimation.getMatrix();  //returns the matrix
      var matrixToReturn = mat4.create();
      mat4.multiply(matrixToReturn, this.endMatrix, matrixTmp);

      //if animation ended
      if (this.currAnimation.getEnd()) {
          this.currAnimation = null;
          this.Index++;
          mat4.multiply(this.endMatrix, this.endMatrix, matrixTmp);
      }
      //if all animations ended
      if (this.Index >= this.ComboAnimationsID.length)
          this.end = true;

      this.matrix = matrixToReturn;
  }
}

//return the animation matrix
MyComboAnimation.prototype.getMatrix = function(){
  return this.matrix;
}

//clones the animation
MyComboAnimation.prototype.clone = function(){
  return new MyComboAnimation(this.scene,this.ComboAnimationsID);
}

//return true if animation end,else returns false
MyComboAnimation.prototype.getEnd = function(){
  return this.end;
}

//restarts the time
MyComboAnimation.prototype.restartTime = function(){};
