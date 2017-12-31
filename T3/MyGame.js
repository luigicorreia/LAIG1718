var board = [];
var move = [];
var gameMode;
var gameDifficulty;
var currentPlayer;
var boardHistory = [];
var movesHistory;
var winner;
var player1Type;
var player2Type;
var gameIndex;
//GAME STATES: MAIN_MENU, INITIALIZING_GAME, WAITING_NEW_BOARD, WAITING_VALID_MOVES, WAITING_MOVE, WAITING_BOT_MOVE, CHECKING_GAME_OVER, GAME_OVER
var gameState = "MAIN_MENU";

function initializeGameVariables(newGameMode, newGameDifficulty) {
    gameState = "INITIALIZING_GAME";
    console.log(gameState);
    board = [];
    move = [];
    gameMode = newGameMode || 1;
    gameDifficulty = newGameDifficulty || 1;
    currentPlayer = 1;
    boardHistory = [];
    movesHistory = [];
    gameIndex = 0;
    winner = 0;
    switch (gameMode) {
    case 1:
        player1Type = 0;
        player2Type = 0;
        break;
    case 2:
        player1Type = 0;
        player2Type = 1;
        break;
    case 3:
        player1Type = 1;
        player2Type = 1;
        break;
    default:
        return false;
    }
    gameState = "WAITING_NEW_BOARD";
    isMoving = false;
    getPrologRequest("initBoard", (function(data) {
        setBoard(JSON.parse(data.target.response));
    }), (function() {
        console.log("Erro");
    }));

    console.log(board);

    return true;
}

//change player
function changeCurrentPlayer() {
    if (currentPlayer == 1) {
        console.log("changed player");
        currentPlayer = 2;
    } else if (currentPlayer == 2) {
        console.log("changed player");
        currentPlayer = 1;
    } else {
        return false;
    }
    return true;
}

//bot move
function botMove() {
    gameState = "WAITING_BOT_MOVE";
    let aux = gameIndex + 1;
    getPrologRequest(("askPlayPC(" + aux + "," + JSON.stringify(board) + ")"), (function(data) {
        setBoard(JSON.parse(data.target.response));
    }), (function() {
        console.log("Erro");
        botMove();
    }));
}

function playerMove(row,col,NewRow,newcol) {
    gameState = "WAITING_BOT_MOVE";
    getPrologRequest("askPlay(" + currentPlayer + "," + row + "," + col + "," + NewRow + "," + newcol + "," + JSON.stringify(board) + ")", (function(data) {
        setBoard(JSON.parse(data.target.response));
    }), (function() {
        console.log("Erro");
    }));
}

function updateGameState(newBoard) {
    setBoard(newBoard);
    movesHistory.push(move);
    gameIndex++;
    checkGameOver();
}

//checks if the game ended
function checkGameOver() {
    gameState = "CHECKING_GAME_OVER";
    getPrologRequest("checkEnd(" + gameIndex + "," + JSON.stringify(board) + ")", (function(data) {

      let aux = JSON.parse(data.target.response);
      if (aux[1] != 1 && aux[1] != 2) {
          winner = aux[1];
          console.log(winner);
          return;
        } else {
            move = [];
            if(gameMode == 2){
                currentPlayer = 1;
            }
            changeCurrentPlayer();
            //passTurnIfPossible();
        }
    }), (function() {
        console.log("ERRO");
    }));
}
function passTurnIfPossible() {
        if (currentPlayer == 1) {
            if (player1Type == 0) {

            } else if (player1Type == 1) {
                botMove();
            }
        } else if (currentPlayer == 2) {
            if (player2Type == 0) {

            } else if (player2Type == 1) {
                botMove();
            }
        }
}

function setInitialPosition(initialX, initialY) {
    move[0] = initialX;
    move[1] = initialY;
}

function setFinalPosition(finalX, finalY) {
    move[2] = finalX;
    move[3] = finalY;
}

//sets boarda and adds board to history
function setBoard(newBoard) {
    board = newBoard;
    boardHistory.push(newBoard);
}

function getBoard() {
    return board;
}


//sets new game state
function setGameState(newGameState) {
    gameState = newGameState;
}

function undoPlay(){
    if(gameIndex == 0 || gameMode == 3 || (gameMode == 2 && currentPlayer == 2))
      return;
    if (gameMode == 1){
        nUndos = 1;
    }else if (gameMode == 2){
        nUndos = 2;
    }
    for(var i = 0; i < nUndos; i++) {
        gameIndex--;
        board = boardHistory[gameIndex];
        boardHistory.pop();
        movesHistory.pop();
        move = [];
        changeCurrentPlayer();
    }
    passTurnIfPossible();
}

function getWinner(){
    return winner;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
