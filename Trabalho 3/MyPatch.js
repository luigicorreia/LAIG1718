/*
* MyPatch
* @constructor
*/
function MyPatch(scene, args) {
	this.scene = scene;
  this.obj = null;
  this.uv = args.attributes[1].nodeValue.split(" ");
  this.points = [];
  for(var j = 0; j < args.children.length; j++){
    let cpoints = args.children[j].children;
		let aux = [];
    for(var i = 0; i < cpoints.length; i++){
      aux.push(
        [
          parseFloat(cpoints[i].attributes[0].value),
          parseFloat(cpoints[i].attributes[1].value),
          parseFloat(cpoints[i].attributes[2].value),
          parseFloat(cpoints[i].attributes[3].value)
        ]
      );
    }
    this.points.push(aux);
  }
	this.makeSurface(
    this.points.length-1,
    this.points[0].length-1,
    this.points
  );
};
MyPatch.prototype.constructor=MyPatch;

MyPatch.prototype.makeSurface = function(degree1, degree2, controlvertexes){
  var knots1 = this.getKnotsVector(degree1);
  var knots2 = this.getKnotsVector(degree2);

  var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};
  this.obj = new CGFnurbsObject(this.scene, getSurfacePoint,parseFloat(this.uv[0]), parseFloat(this.uv[1]) );
}

MyPatch.prototype.getKnotsVector = function(degree){

  var v = new Array();
  for (var i=0; i<=degree; i++){
  	v.push(0);
  }
  for (var i=0; i<=degree; i++){
  	v.push(1);
  }
  return v;
}

MyPatch.prototype.display = function(){
  this.obj.display();
}
