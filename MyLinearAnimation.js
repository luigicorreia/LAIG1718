/*
 * MyLinearAnimation
 * @constructor
 */

function MyLinearAnimation(scene, controlPoints, speed){
  //CGFobject.call(this,scene);
  this.speed = speed;
  this.controlPoints = controlPoints;
  this.end = false;  //end flag
  this.time = 0;

  this.curIndex = 0;  //current Index
  this.timePerPoint = []; //Quanto tempo dura cada vetor.
  this.timeOffset = 0; //simplifica o calculo de distancia percorrida
  this.calculateTimePerPoint();  //calcula quanto tempo dura cada vetor
  this.degree = []/*os ângulos de cada trajeto*/
  this.unitVectors = this.calculateUnitsDegrees();  //calculo dos vetores unitarios
  this.matrix = mat4.create(); //matriz de retorno

}

MyLinearAnimation.prototype = Object.create(MyAnimation.prototype);
MyLinearAnimation.prototype.constructor = MyLinearAnimation;

MyLinearAnimation.prototype.update = function(time) {

  if(this.end)
    return;

  if(this.time > this.timePerPoint[this.curIndex]){ //Verificar se já excedemos o vetor atual
      this.curIndex++;
      if(this.curIndex == this.controlPoints.length - 1){ //Se chegamos ao fim retorna-mos a ultima posição
        this.end = true;
        return;
      }
      this.timeOffset = this.timePerPoint[this.curIndex - 1] //Apartir de cada novo ponto de controlo assumimos um deltaT inicial = 0
  }
    let pointTmp = this.controlPoints[this.curIndex]; //Ponto atual
    let vetorTmp = this.unitVectors[this.curIndex]; //Vetor unitário atual
    var aux = [
      pointTmp[0]+vetorTmp[0]*this.speed*(this.time - this.timeOffset),
      pointTmp[1]+vetorTmp[1]*this.speed*(this.time - this.timeOffset),
      pointTmp[2]+vetorTmp[2]*this.speed*(this.time - this.timeOffset)
    ];
    let matrixTmp = mat4.create();
    mat4.translate(matrixTmp, matrixTmp, aux);
    mat4.rotateY(matrixTmp, matrixTmp, this.degree[this.curIndex]);

    this.time += time/1000;  //incrementa o tempo
    this.matrix = matrixTmp;
}

MyLinearAnimation.prototype.calculateTimePerPoint = function () {
  let length = 0;
  let totalTime = 0;
  for (var i = 0; i < this.controlPoints.length - 1; i++) { //obter distancias de todos os pontos
    let point1 = this.controlPoints[i], point2 = this.controlPoints[i + 1];
    let dist = this.calculateDistance(point1,point2);
    length += dist;
    totalTime += dist / this.speed;
    this.timePerPoint.push(totalTime); //Quanto tempo passa em cada distancia
  }
}


MyLinearAnimation.prototype.calculateUnitsDegrees = function () { //Obter vetores e angulos dos vetores
  let uVectors = [];
  for (let i = 0; i < this.controlPoints.length - 1; i++) { //Calcular vetor unitário para cada ponto
    let point1 = this.controlPoints[i], point2 = this.controlPoints[i + 1];
    let vectortmp = [point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]];
    var dist = this.calculateDistance(point1,point2);
    uVec = [];
    for (var j = 0; j < 3; j++) {
      uVec.push(vectortmp[j] / dist);
    }
    uVectors.push(uVec); //Adicionar vetor unitario
    this.degree.push(Math.atan2(vectortmp[0], vectortmp[2])); //angulo respetivo por distancia
  }
  return uVectors; //Retornar lista vetores unitarios
}

MyLinearAnimation.prototype.getMatrix = function() {
  return this.matrix;
}

MyLinearAnimation.prototype.calculateDistance = function(p0, p1) {
  return Math.sqrt(Math.pow((p1[0] - p0[0]), 2) + Math.pow((p1[1] - p0[1]), 2) + Math.pow((p1[2] - p0[2]), 2));
}
