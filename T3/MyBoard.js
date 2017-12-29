function MyBoard(scene){
	CGFobject.call(this, scene);

	this.board = this.matrix();

	this.rectangle = new MyRectangle(this.scene, "0 4 4 0");

	this.tiles = [];

	this.pieces = [];

	this.initPieces();

	console.log(this.pieces);

};

MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.matrix = function() {
	var matrix = [];

	for(var i = 0; i < 8; i++){
		for(var j=0 ; j<8 ; j++){
			matrix.push([i*4,j*4]); 
		}
	}

	return matrix;
}

MyBoard.prototype.initPieces = function() {

	for(let i = 0; i < 64; i++){
		if(i < 8 || (9 <= i && i <= 14) || (18 <= i && i <= 21)){
				let piece = new MyPiece(this.scene, "black man");
				this.pieces.push([piece,this.board[i][0],this.board[i][1]]);
		}
		else if((42 <= i && i <= 45) || (49 <= i && i <= 54) || (56 <= i && i <= 63)){
				let piece = new MyPiece(this.scene, "white man");
				this.pieces.push([piece,this.board[i][0],this.board[i][1]]);
		}
	}
}

MyBoard.prototype.color = function(i) {
	if((0 <= i && i <= 7) || (16 <= i && i <= 23) || (32 <= i && i <= 39) || (48 <= i && i <= 55)){
		if((i == 0) || (i%2 == 0)){
			return this.scene.whiteTex;
		}
		else{
			return this.scene.blackTex;
		}
	}
	else if((8 <= i <= 15) || (24 <= i <= 31) || (40 <= i <= 47) || (56 <= i <= 63) ){
		if((i == 0) || (i%2 == 0)){
			return this.scene.blackTex;
		}
		else{
			return this.scene.whiteTex;
		}
	}
}

MyBoard.prototype.fill = function() {

	var n = 0;

	for(let i = 0; i < 64; i++){
		if(i < 8 || (9 <= i && i <= 14) || (18 <= i && i <= 21)){
			this.scene.pushMatrix();
				this.scene.translate(this.pieces[n][1],0,this.pieces[n][2]);
				this.pieces[n][0].display();
				n = n+1;
			this.scene.popMatrix();
		}
		else if((42 <= i && i <= 45) || (49 <= i && i <= 54) || (56 <= i && i <= 63)){
			this.scene.pushMatrix();
				this.scene.translate(this.pieces[n][1],0,this.pieces[n][2]);
				this.pieces[n][0].display();
				n = n+1;
			this.scene.popMatrix();
		}
	}
}

MyBoard.prototype.display = function() {

	this.scene.logPicking();
	this.scene.clearPickRegistration();

	this.fill();

	for(var i=0 ; i<64 ; i++){
		this.scene.pushMatrix();
			this.scene.translate((this.board[i][0])-2, 0, (this.board[i][1])+2);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.color(i).apply();
			this.tiles.push(this.rectangle);
			this.scene.registerForPick(i+1, this.tiles[i]);
			this.rectangle.display();
		this.scene.popMatrix();
	}
	
}