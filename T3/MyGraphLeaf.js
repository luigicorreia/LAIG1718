/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
 **/

 function MyGraphLeaf(graph, xmlelem) {
  this.graph = graph;
  this.obj = null;

  if(xmlelem.attributes.length == 3){
   this.id   = xmlelem.attributes[0].value;
   this.type = xmlelem.attributes[1].value;
   this.args = xmlelem.attributes[2].value;

 }else if(xmlelem.attributes.length == 2){
   this.type = xmlelem.attributes[0].value;
   this.args = xmlelem.attributes[1].value;
 }else if(xmlelem.attributes.length == 1){
    this.type = xmlelem.attributes[0].value;
 }
 else alert("wrong number of arguments! ");

 switch(this.type){
   case "rectangle":
   this.obj = new MyRectangle(graph.scene, String(this.args));
   break;
   case "triangle":
   this.obj = new MyTriangle(graph.scene, String(this.args));
   break;
   case "sphere":
   this.obj = new MySphere(graph.scene,String(this.args));
   break;
   case "cylinder":
   this.obj = new MyCylinderWithTopAndBottom(graph.scene,String(this.args));
   break;
   case "patch":
   this.obj = new MyPatch(graph.scene,xmlelem);
   break;
   case "piece":
   this.obj = new MyPiece(graph.scene, String(this.args));
   break;
   case "object":
   this.obj = new MyObj(graph.scene, String(this.args));
   break;
  case "board":
   this.obj = new MyBoard(graph.scene);
   break;
   default:
   break;
 }
}

MyGraphLeaf.prototype.display = function(){
 if(this.obj != null){
  this.obj.display();
}
}

MyGraphLeaf.prototype.scaleTexCoords = function(s,t){
  if(this.type == "rectangle" || this.type == "triangle"){
   this.obj.scaleTexCoordss(s,t);
 }
}
