:-dynamic flagEated/1.
:-dynamic flagCheckEated/1.
:-dynamic flagKingEating/1.
:-dynamic backBoard/1.

%inicio do jogo
start(Type) :- board_start(Board), Play is 1, gameCycle(Board, Play, Type,0).

%ciclo do jogo
gameCycle(Board,Play,_,2):-display_all(Board, Play),write('"x" GANHOU!!').
gameCycle(Board,Play,_,1):-display_all(Board, Play),write('"o" GANHOU!!').
gameCycle(Board,Play,Type,_):-
  (Type \= 3, display_all(Board, Play);true),
  play(Play, Board, NewBoard, Type),
  checkEnd(Play, NewPlay,NewBoard,NewEnd),
  gameCycle(NewBoard, NewPlay, Type,NewEnd).

%verifica o final
checkEnd(Play, NewPlay,Board,NewEnd):-
  countPieces(1,Board,NBrancas),countPieces(3,Board,NKingBrancas),
  countPieces(2,Board,NPretas),countPieces(4,Board,NKingPretas),
  (
    ((NBrancas == 0, NKingBrancas == 0),NewEnd is 2, NewPlay is Play);
    ((NPretas == 0, NKingPretas == 0),NewEnd is 1, NewPlay is Play);
    (NewPlay is Play + 1,NewEnd is 0)
  ).

%jogada
play(Play, Board, NewBoard3, Type):-
  ((par(Play), Player = 2);(not(par(Play)), Player = 1)),
  repeat,
    (
      (Type == 1, askPlay(Player,Row,Col,NewRow,NewCol,Board,NewBoard));
      (Type == 2, askPlayPvsC(Player,Row,Col,NewRow,NewCol,Board,NewBoard),((Player = 2, displayPlayPc(Type,Player,Row,Col,NewRow,NewCol));true));
      (Type == 3, askPlayCvsC(Player,Row,Col,NewRow,NewCol,Board,NewBoard),displayPlayPc(Type,Player,Row,Col,NewRow,NewCol))
    ),
  !,
  movement(Player,NewBoard,Row,Col,NewRow,NewCol,NewBoard2),
  checkEatMore(Player,NewBoard2,NewRow,NewCol,Type,NewBoard3).

/* Player vs Player */

%pede uma jogada e verifica se esta é valida
askPlay(Player,Row,Col,NewRow,NewCol,Board,NewBoard):-
  ((Player == 2, write('Jogam as "x"'));Player == 1, write('Jogam as "o"')),nl,
  FlagEat is 0, asserta(flagEated(FlagEat)),
  repeat,
    askPiece(Row,Col),verifyPiecePosition(Player,Row,Col,Board),!,
  repeat,
    askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),!,
    getPiece(Board,Row,Col,Element),
  (
    (((Element == 1);(Element == 2)), validMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,1));
    (((Element == 3);(Element == 4)), valideKingMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,1))
  ),
  flagEated(FlagEated), ((FlagEated == 0, checkEaten(NewBoard,Player,1,1,0),flagCheckEated(Reply),retract(flagCheckEated(_)),((Reply == 1,nl,write('Obrigado a comer'),nl,nl,!,fail);true));true).

/* Player vs PC */

askPlayPvsC(Player,Row,Col,NewRow,NewCol,Board,NewBoard):-
  ((Player == 1, write('Jogam as "o"'),nl);true),
  FlagEat is 0, asserta(flagEated(FlagEat)),
  repeat,
    ((Player == 1, askPiece(Row,Col));(Player == 2, askPiecePc(Row,Col))),
    ((Player == 1, verifyPiecePosition(Player,Row,Col,Board));(Player == 2, verifyPiecePositionPc(Player,Row,Col,Board))),
  !,getPiece(Board,Row,Col,Element),
  repeat,
    ((Player == 1, askNewPiece(NewRow,NewCol));(Player == 2, askNewPiecePc(NewRow,NewCol))),
    ((Player == 1, verifiyNewPiece(NewRow,NewCol,Board));(Player == 2, verifiyNewPiecePc(NewRow,NewCol,Board))),
  !,
  (
    (((Element == 1);(Element == 2)), ((Player == 1, validMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,1));(Player == 2, validMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,0))));
    (((Element == 3);(Element == 4)), ((Player == 1, valideKingMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,1));(Player == 2, valideKingMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,0))))
  ),
  flagEated(FlagEated), ((FlagEated == 0, checkEaten(NewBoard,Player,1,1,0),flagCheckEated(Reply),retract(flagCheckEated(_)),((Reply == 1, Player == 1,nl,write('Obrigado a comer'),nl,nl,!,fail);(Reply == 1, Player == 2,!,fail);true));true).

/* PC vs PC */

askPlayCvsC(Player,Row,Col,NewRow,NewCol,Board,NewBoard):-
  FlagEat is 0, asserta(flagEated(FlagEat)),
  repeat,
    askPiecePc(Row,Col),
    verifyPiecePositionPc(Player,Row,Col,Board),
  !,
  repeat,
    askNewPiecePc(NewRow,NewCol),
    verifiyNewPiecePc(NewRow,NewCol,Board),
  !,getPiece(Board,Row,Col,Element),
  (
    (((Element == 1);(Element == 2)), validMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,0));
    (((Element == 3);(Element == 4)), valideKingMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,0))
  ),
  flagEated(FlagEated), ((FlagEated == 0, checkEaten(NewBoard,Player,1,1,0),flagCheckEated(Reply),retract(flagCheckEated(_)),((Reply == 1, !,fail); true));true).


askPiecePc(Row,Col):-
  repeat,
    random(1,9,Col),verifyRow(Col),!,
  repeat,
    random(1,9,Row),verifyRow(Row),!.

verifyPiecePositionPc(Player,Row,Col,Board):-
  getPiece(Board,Row,Col,Element),((Element == 0,!,fail);
  (((Player == 2,(Element == 2; Element == 4));(Player == 1,(Element == 1; Element == 3))); !,fail)).

askNewPiecePc(NewRow,NewCol):-
  repeat,
    random(1,9,NewCol),verifyRow(NewCol),!,
  repeat,
    random(1,9,NewRow),verifyRow(NewRow),!.

verifiyNewPiecePc(NewRow,NewCol,Board):-
  getPiece(Board,NewRow,NewCol,Element),
  ((Element == 0);fail).

/* RULES */

%changes state of board
movement(Player,Board,Row,Col,NewRow,NewCol,NewBoard):-
  verifyNormalToKing(Player,Board,Row,Col,NewRow,Element),
  getPiece(Board,NewRow,NewCol,NewElement),
  updateBoard(Element,NewRow,NewCol,Board,NewBoardTmp),
  updateBoard(NewElement,Row,Col,NewBoardTmp,NewBoard).

%verify is can eat more
checkEatMore(Player,NewBoard2,Row,Col,Type,NewBoard3):-
  flagEated(FlagEated),
  (
    (FlagEated == 1, asserta(backBoard(NewBoard2)),
      (
        (getPiece(NewBoard2,Row,Col,Element), (Element == 2; Element == 1),
          (((Type == 1; (Type == 2, Player == 1)), checkCanEatMore(Player,Row,Col));(checkCanEatMorePc(Player,Row,Col)))
        );
        (getPiece(NewBoard2,Row,Col,Element), (Element == 4; Element == 3),
          (
            ((Type == 1; (Type == 2, Player == 1)), checkKingEatMore(Player,Row,Col));
            (checkKingEatMorePc(Player,Row,Col))
          )
        )
      ),
      backBoard(NewBoard3),retract(backBoard(_)),retract(flagEated(_)));
    (NewBoard3 = NewBoard2)
  ).

askPiece(Row,Col):-
  repeat,
    write('Introduza a coluna da peca a mover:'),
    getChar(Coluna_Letra),verifyColumn(Coluna_Letra,Col),!,
  repeat,
    write('Introduza a linha da peca a mover:'),
    getDigit(Row),verifyRow(Row),!.


askNewPiece(NewRow,NewCol):-
  repeat,
    write('Introduza a coluna da posicao a mover:'),
    getChar(NovaColuna_Letra),verifyColumn(NovaColuna_Letra,NewCol),!,
  repeat,
    write('Introduza a linha da posicao a mover:'),
    getDigit(NewRow),verifyRow(NewRow),!.



verifyPiecePosition(Player,Row,Col,Board):-
  getPiece(Board,Row,Col,Element),
  ((Element == 0, nl,write('Nao pode escolher uma casa vazia'),nl,nl,!,fail);
  (((Player == 2,(Element == 2; Element == 4));
  (Player == 1,(Element == 1; Element == 3)));
  nl,write('Nao pode escolher uma peca do adversario'),nl,nl,!,fail)).


verifiyNewPiece(NewRow,NewCol,Board):-
  getPiece(Board,NewRow,NewCol,Element),
  ((Element == 0);nl,write('A sua nova posicao tem de ser uma casa vazia'),nl,nl,fail).

/* Verifica se esta na casa do adversario e atualiza para rei */
verifyNormalToKing(Player,Board,Row,Col,NewRow,Element):-
  (NewRow \= 1, NewRow \= 8, getPiece(Board,Row,Col,Element);
    ((Player == 2, ((NewRow == 8, Element is 4);(getPiece(Board,Row,Col,Element), NewRow == 1, Element == 4, true);(Element is 2)));
      (Player == 1, ((NewRow == 1, Element is 3);(getPiece(Board,Row,Col,Element), NewRow == 8, Element == 3, true);(Element is 1))))).

%verifica se o movimento é valido
validMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,FlagNotPc):-
  (
    (
      (Player == 1, Aux1 is (Row - NewRow));
      (Player == 2, Aux1 is (NewRow - Row))
    ), AuxColuna is (Col - NewCol), AuxColuna2 is abs(AuxColuna),
    (
      ((Aux1 == 0; Aux1 == 2; Aux1 == -2), AuxColuna2 \= 1, eatPiece(Player,Row,Col,NewRow,NewCol,Board,NewBoard));
      (Aux1 == 1, (Aux2 is (Col - NewCol), Aux22 is abs(Aux2), Aux22 >= 0, Aux22 =< 1),NewBoard = Board)
    )
  );
  (
    (
      (Player == 1, Row > NewRow, DeltaLinha is (Row - NewRow));
      (Player == 2, NewRow > Row, DeltaLinha is (NewRow - Row))
    ), AuxColuna is (Col - NewCol), DeltaColuna is abs(AuxColuna),
    (
      ((Aux is abs(DeltaLinha), Aux < 2; DeltaColuna == 1), ((FlagNotPc == 1, nl,write('Movimento linear errado'),nl,!,fail);!,fail));
      (AuxDeltaLinha is DeltaLinha - 1, (DeltaColuna == 0, AuxDeltaColuna is 0; AuxDeltaColuna is DeltaColuna -1), checkSamePieces(Player,Row,Col,NewRow,NewCol,Board,AuxDeltaLinha, AuxDeltaColuna),NewBoard = Board)
    )
  );
  ((FlagNotPc == 1, nl,write('Efetuou um movimento invalido'),nl,fail);fail).

%verifica se entre a posição inicial e final estão apenas peças do jogador
checkSamePieces(_,_,_,_,_,_,0,0).
checkSamePieces(Player,Row,Col,NewRow,NewCol,Board,DeltaLinha,DeltaColuna):-
  (Player == 1,
    (DeltaColuna == 0, DeltaColuna \= DeltaLinha, (Y is Row - 1, X is Col, getPiece(Board,Y,X,Element), Element == 1, AuxDeltaLinha is DeltaLinha -1, !,checkSamePieces(Player,Y,X,NewRow,NewCol,Board,AuxDeltaLinha, DeltaColuna));
    (DeltaColuna == DeltaLinha, (Y is Row - 1, (NewCol > Col, X is Col + 1; X is Col - 1), getPiece(Board,Y,X,Element), Element == 1, AuxDeltaLinha is DeltaLinha - 1, AuxDeltaColuna is DeltaColuna - 1, !,checkSamePieces(Player,Y,X,NewRow,NewCol,Board,AuxDeltaLinha,AuxDeltaColuna))))
  );
  (Player == 2,
    (DeltaColuna == 0, DeltaColuna \= DeltaLinha,  (Y is Row + 1, X is Col, getPiece(Board,Y,X,Element), Element == 2, AuxDeltaLinha is DeltaLinha -1, !,checkSamePieces(Player,Y,X,NewRow,NewCol,Board,AuxDeltaLinha,DeltaColuna));
    (DeltaColuna == DeltaLinha, (Y is Row + 1, (NewCol > Col, X is Col + 1; X is Col - 1), getPiece(Board,Y,X,Element), Element == 2, AuxDeltaLinha is DeltaLinha - 1, AuxDeltaColuna is DeltaColuna - 1, !,checkSamePieces(Player,Y,X,NewRow,NewCol,Board,AuxDeltaLinha,AuxDeltaColuna))))
  );
  !,fail.

%verifica se pode comer peça do adversário
eatPiece(Player,Row,Col,NewRow,NewCol,Board,NewBoard):-
  (
  AuxLinha is (Row - NewRow), AuxLinha2 is abs(AuxLinha),
  AuxColuna is (Col - NewCol),AuxColuna2 is abs(AuxColuna),
  (
    (
      /* vertical */
      (AuxLinha2 == 2, AuxColuna2 == 0, X is Col,
        ((NewRow > Row, Y is Row + 1); (NewRow < Row, Y is Row - 1)),
        getPiece(Board,Y,X,Element),
        (Element\=0, ((Player == 1, (Element == 2; Element == 4));((Player == 2, (Element == 1; Element == 3))))),
        updateBoard(0,Y,X,Board,NewBoard),retract(flagEated(_)), FlagEat is 1, asserta(flagEated(FlagEat))
      );
      /*horizontal */
      (AuxLinha2 == 0, AuxColuna2 == 2, Y is Row,
        ((NewCol > Col, X is Col + 1); (NewCol < Col,X is Col - 1)),
        getPiece(Board,Y,X,Element),
        (Element\=0, ((Player == 1, (Element == 2; Element == 4));((Player == 2, (Element == 1; Element == 3))))),
        updateBoard(0,Y,X,Board,NewBoard),retract(flagEated(_)), FlagEat is 1, asserta(flagEated(FlagEat))
      )
    )
  )
  );fail.

%verifica o movimento do rei
valideKingMovement(Player,Row,Col,NewRow,NewCol,Board,NewBoard,FlagNotPc):-
  (
  AuxLinha is (Row - NewRow),
  AuxLinhaABS is abs(AuxLinha),
  AuxColuna is (Col - NewCol),
  AuxColunaABS is abs(AuxColuna),
    (
      /* Vertical  1 */
      ((AuxLinhaABS > 0, AuxColunaABS == 0), Delta is AuxLinhaABS, checkKingEating(Player,Row,Col,NewRow,NewCol,Board,Delta,1,0), kingEat(Player,Row,Col,NewRow,NewCol,Board,NewBoard,Delta,1));
      /* Horizontal  2 */
      ((AuxLinhaABS == 0, AuxColunaABS > 0), Delta is AuxColunaABS, checkKingEating(Player,Row,Col,NewRow,NewCol,Board,Delta,2,0), kingEat(Player,Row,Col,NewRow,NewCol,Board,NewBoard,Delta,2));
      /* Diagonal  3 */
      ((AuxLinhaABS > 0, AuxColunaABS > 0, AuxLinhaABS == AuxColunaABS), Delta is AuxColunaABS,checkKingEating(Player,Row,Col,NewRow,NewCol,Board,Delta,3,0), kingEat(Player,Row,Col,NewRow,NewCol,Board,NewBoard,Delta,3))
    )
  );
  ((FlagNotPc == 1, nl,write('Movimento invalido do rei'),nl,nl,fail); fail).

%verifica se é possivel o rei comer
checkKingEating(_,_,_,_,_,_,0,_,0):-true.
checkKingEating(_,_,_,_,_,_,0,_,1):-true.
checkKingEating(_,_,_,_,_,_,_,_,2):-!,fail.
checkKingEating(Player,Row,Col,NewRow,NewCol,Board,Delta,TypeMove,Conta):-
  (
    (TypeMove == 1, X is Col, ((NewRow > Row, Y is Row + 1); (NewRow < Row,Y is Row - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,checkKingEating(Player,Y,X,NewRow,NewCol,Board,AuxDelta,1,Conta));
        (Player == 1, (((Element == 1; Element == 3), !,fail);(Element == 2; Element == 4), AuxConta is Conta + 1, !,checkKingEating(1,Y,X,NewRow,NewCol,Board,AuxDelta,1,AuxConta)));
        (Player == 2, (((Element == 2; Element == 4), !,fail);(Element == 1; Element == 3), AuxConta is Conta + 1, !,checkKingEating(2,Y,X,NewRow,NewCol,Board,AuxDelta,1,AuxConta)))
      )
    );
    (TypeMove == 2, Y is Row, ((NewCol > Col, X is Col + 1);(NewCol < Col, X is Col - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,checkKingEating(Player,Y,X,NewRow,NewCol,Board,AuxDelta,2,Conta));
        (Player == 1, (((Element == 1; Element == 3), !,fail);(Element == 2; Element == 4), AuxConta is Conta + 1, !,checkKingEating(1,Y,X,NewRow,NewCol,Board,AuxDelta,2,AuxConta)));
        (Player == 2, (((Element == 2; Element == 4), !,fail);(Element == 1; Element == 3), AuxConta is Conta + 1, !,checkKingEating(2,Y,X,NewRow,NewCol,Board,AuxDelta,2,AuxConta)))
      )
    );
    (TypeMove == 3, ((NewRow > Row, Y is Row + 1); (NewRow < Row,Y is Row - 1)), ((NewCol > Col, X is Col + 1);(NewCol < Col, X is Col - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,checkKingEating(Player,Y,X,NewRow,NewCol,Board,AuxDelta,3,Conta));
        (Player == 1, (((Element == 1; Element == 3), !,fail);(Element == 2; Element == 4), AuxConta is Conta + 1, !,checkKingEating(1,Y,X,NewRow,NewCol,Board,AuxDelta,2,AuxConta)));
        (Player == 2, (((Element == 2; Element == 4), !,fail);(Element == 1; Element == 3), AuxConta is Conta + 1, !,checkKingEating(2,Y,X,NewRow,NewCol,Board,AuxDelta,2,AuxConta)))
      )
    )
  ).

%atualiza a board caso coma
kingEat(_,_,_,_,_,Board,NewBoard,0,_):-NewBoard = Board, true.
kingEat(Player,Row,Col,NewRow,NewCol,Board,NewBoard,Delta,TypeMove):-
  (
    (TypeMove == 1, X is Col, ((NewRow > Row, Y is Row + 1); (NewRow < Row,Y is Row - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,kingEat(Player,Y,X,NewRow,NewCol,Board,NewBoard,AuxDelta,1));
        (Player == 1, (Element == 2; Element == 4), updateBoard(0,Y,X,Board,NewBoard),retract(flagEated(_)), FlagEat is 1, asserta(flagEated(FlagEat)), !,kingEat(1,Y,X,NewRow,NewCol,NewBoard,_,AuxDelta,1));
        (Player == 2, (Element == 1; Element == 3), updateBoard(0,Y,X,Board,NewBoard),retract(flagEated(_)), FlagEat is 1, asserta(flagEated(FlagEat)), !,kingEat(2,Y,X,NewRow,NewCol,NewBoard,_,AuxDelta,1))
      )
    );
    (TypeMove == 2, Y is Row, ((NewCol > Col, X is Col + 1);(NewCol < Col, X is Col - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,kingEat(Player,Y,X,NewRow,NewCol,Board,NewBoard,AuxDelta,2));
        (Player == 1, (Element == 2; Element == 4), updateBoard(0,Y,X,Board,NewBoard),retract(flagEated(_)), FlagEat is 1, asserta(flagEated(FlagEat)), !,kingEat(1,Y,X,NewRow,NewCol,NewBoard,_,AuxDelta,2));
        (Player == 2, (Element == 1; Element == 3), updateBoard(0,Y,X,Board,NewBoard),retract(flagEated(_)), FlagEat is 1, asserta(flagEated(FlagEat)), !,kingEat(2,Y,X,NewRow,NewCol,NewBoard,_,AuxDelta,2))
      )
    );
    (TypeMove == 3, ((NewRow > Row, Y is Row + 1); (NewRow < Row,Y is Row - 1)), ((NewCol > Col, X is Col + 1);(NewCol < Col, X is Col - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,kingEat(Player,Y,X,NewRow,NewCol,Board,NewBoard,AuxDelta,3))
      )
    )
  ).

%verifica se comeu alguma peça
checkEaten(_,_,_,_,1):-true.
checkEaten(_,_,8,8,0):-true.
checkEaten(Board,Player,X,Y,Reply):-
  (Flag is 0, asserta(flagCheckEated(Flag)),
    (getPiece(Board,Y,X,Element), ((Player == 1, (Element == 1;Element == 3));(Player == 2, (Element == 2;Element == 4))),
      ((Element == 2; Element == 1),checkNeighbours(Board,Player,X,Y);(Element == 4; Element == 3),checkKingNeighbours(Board,Player,X,Y)),
      flagCheckEated(Reply2),(X < 8, AuxX is X + 1, AuxY is Y;Y < 8, AuxY is Y + 1, AuxX is 1), !,checkEaten(Board,Player,AuxX,AuxY,Reply2));
    ((X < 8, AuxX is X + 1, AuxY is Y;Y < 8, AuxY is Y + 1, AuxX is 1),!,checkEaten(Board,Player,AuxX,AuxY,Reply))
  ).

%verifica se tem peças do adversario para comer
checkNeighbours(Board,Player,X,Y):-
  (
    (AuxY is Y - 1, getPiece(Board,AuxY,X,Element), ((Player == 1,(Element == 2; Element == 4));(Player == 2,(Element == 1; Element == 3))), AuxY2 is Y - 2, getPiece(Board,AuxY2,X,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)),true);
    (AuxX is X + 1, getPiece(Board,Y,AuxX,Element), ((Player == 1,(Element == 2; Element == 4));(Player == 2,(Element == 1; Element == 3))), AuxX2 is X + 2, getPiece(Board,Y,AuxX2,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)),true);
    (AuxY is Y + 1, getPiece(Board,AuxY,X,Element), ((Player == 1,(Element == 2; Element == 4));(Player == 2,(Element == 1; Element == 3))), AuxY2 is Y + 2, getPiece(Board,AuxY2,X,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)),true);
    (AuxX is X - 1, getPiece(Board,Y,AuxX,Element), ((Player == 1,(Element == 2; Element == 4));(Player == 2,(Element == 1; Element == 3))), AuxX2 is X - 2, getPiece(Board,Y,AuxX2,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)),true)
  ).

%verifica se tem peças do adversario para comer
checkKingNeighbours(Board,Player,X,Y):-
  (
    (loopKing(Board,Player,X,Y,0,1), flagKingEating(AuxY2), AuxY is AuxY2 - 1, retract(flagKingEating(_)), getPiece(Board,AuxY,X,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)));
    (loopKing(Board,Player,X,Y,0,2), flagKingEating(AuxX2), AuxX is AuxX2 + 1, retract(flagKingEating(_)), getPiece(Board,Y,AuxX,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)));
    (loopKing(Board,Player,X,Y,0,3), flagKingEating(AuxY2), AuxY is AuxY2 + 1, retract(flagKingEating(_)), getPiece(Board,AuxY,X,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)));
    (loopKing(Board,Player,X,Y,0,4), flagKingEating(AuxX2), AuxX is AuxX2 - 1, retract(flagKingEating(_)), getPiece(Board,Y,AuxX,Peca2), Peca2 == 0, retract(flagCheckEated(_)), FlagEat is 1, asserta(flagCheckEated(FlagEat)))
  ).

%verifica se na linha e na coluna existe alguma peça adversário
loopKing(_,_,_,_,0,_):-fail.
loopKing(_,_,_,_,1,_):-true.
loopKing(Board,Player,X,Y,_,Type):-
  (
    (
      (Type == 1, (Y > 0, AuxY is Y - 1, AuxX is X,asserta(flagKingEating(AuxY))));
      (Type == 2, (X < 8, AuxY is Y, AuxX is X + 1,asserta(flagKingEating(AuxX))));
      (Type == 3, (Y < 8, AuxY is Y + 1, AuxX is X,asserta(flagKingEating(AuxY))));
      (Type == 4, (X > 0, AuxY is Y, AuxX is X - 1,asserta(flagKingEating(AuxX))))
    ), getPiece(Board,AuxY,AuxX,Element), (((Player == 1,(Element == 2; Element == 4));(Player == 2,(Element == 1; Element == 3))),loopKing(Board,Player,AuxX,AuxY,1,Type),!;loopKing(Board,Player,AuxX,AuxY,0,Type),!)
  ).

checkKingEatMore(Player,Row,Col):-
  (/*cima*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,1),
    flagKingEating(AuxY2), AuxLinha is AuxY2 - 1, retract(flagKingEating(_)), getPiece(Board,AuxLinha,Col,Element), Element == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMore(Player,NewRow,NewCol)
  );
  (/*Baixo*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,3),
    flagKingEating(AuxY2), AuxLinha is AuxY2 + 1, retract(flagKingEating(_)), getPiece(Board,AuxLinha,Col,Element), Element == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMore(Player,NewRow,NewCol)
  );
  (/*Direita*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,2),
    flagKingEating(AuxX2), AuxColuna is AuxX2 + 1, retract(flagKingEating(_)), getPiece(Board,Row,AuxColuna,Element), Element == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMore(Player,NewRow,NewCol)
  );
  (/*Esquerda*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,4),
    flagKingEating(AuxX2), AuxColuna is AuxX2 - 1, retract(flagKingEating(_)), getPiece(Board,Row,AuxColuna,Element), Element == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMore(Player,NewRow,NewCol)
  );true.

checkKingEatMorePc(Player,Row,Col):-
  (/*cima*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,1),
    flagKingEating(AuxY2), AuxLinha is AuxY2 - 1, retract(flagKingEating(_)), getPiece(Board,AuxLinha,Col,Element), Element == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMorePc(Player,NewRow,NewCol)
  );
  (/*Baixo*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,3),
    flagKingEating(AuxY2), AuxLinha is AuxY2 + 1, retract(flagKingEating(_)), getPiece(Board,AuxLinha,Col,Element), Element == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMorePc(Player,NewRow,NewCol)
  );
  (/*Direita*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,2),
    flagKingEating(AuxX2), AuxColuna is AuxX2 + 1, retract(flagKingEating(_)), getPiece(Board,Row,AuxColuna,Element), Element == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMorePc(Player,NewRow,NewCol)
  );
  (/*Esquerda*/
    backBoard(Board), loopKing(Board,Player,Col,Row,0,4),
    flagKingEating(AuxX2), AuxColuna is AuxX2 - 1, retract(flagKingEating(_)), getPiece(Board,Row,AuxColuna,Element), Element == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkKingEatMorePc(Player,NewRow,NewCol)
  );true.

checkKingMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard,FlagNotPc):-
  (
  AuxLinha is (Row - NewRow),AuxLinhaABS is abs(AuxLinha),
  AuxColuna is (Col - NewCol),AuxColunaABS is abs(AuxColuna),
    (
      /* Horizontal 1 */
      ((AuxLinhaABS > 0, AuxColunaABS == 0), Delta is AuxLinhaABS, checkKingEatingForMore(Player,Row,Col,NewRow,NewCol,Board,Delta,1,0), kingEat(Player,Row,Col,NewRow,NewCol,Board,NewBoard,Delta,1));
      /* Vertical  2 */
      ((AuxLinhaABS == 0, AuxColunaABS > 0), Delta is AuxColunaABS, checkKingEatingForMore(Player,Row,Col,NewRow,NewCol,Board,Delta,2,0), kingEat(Player,Row,Col,NewRow,NewCol,Board,NewBoard,Delta,2))
    )
  );
  ((FlagNotPc == 1, nl,write('Tem de comer a Element do adversario'),nl,!,fail); !,fail).


checkKingEatingForMore(_,_,_,_,_,_,0,_,1):-true.
checkKingEatingForMore(_,_,_,_,_,_,0,_,0):-!,fail.
checkKingEatingForMore(_,_,_,_,_,_,_,_,2):-!,fail.
checkKingEatingForMore(Player,Row,Col,NewRow,NewCol,Board,Delta,TypeMove,Conta):-
  (
    (TypeMove == 1, X is Col, ((NewRow > Row, Y is Row + 1); (NewRow < Row, Y is Row - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,checkKingEatingForMore(Player,Y,X,NewRow,NewCol,Board,AuxDelta,1,Conta));
        (Player == 1, (((Element == 1; Element == 3), !,fail);(Element == 2; Element == 4), AuxConta is Conta + 1, !,checkKingEatingForMore(1,Y,X,NewRow,NewCol,Board,AuxDelta,1,AuxConta)));
        (Player == 2, (((Element == 2; Element == 4), !,fail);(Element == 1; Element == 3), AuxConta is Conta + 1, !,checkKingEatingForMore(2,Y,X,NewRow,NewCol,Board,AuxDelta,1,AuxConta)))
      )
    );
    (TypeMove == 2, Y is Row, ((NewCol > Col, X is Col + 1); (NewCol < Col,X is Col - 1)), getPiece(Board,Y,X,Element), AuxDelta is Delta -1,
      (
        (Element == 0, !,checkKingEatingForMore(Player,Y,X,NewRow,NewCol,Board,AuxDelta,2,Conta));
        (Player == 1, (((Element == 1; Element == 3), !,fail);(Element == 2; Element == 4), AuxConta is Conta + 1, !,checkKingEatingForMore(1,Y,X,NewRow,NewCol,Board,AuxDelta,2,AuxConta)));
        (Player == 2, (((Element == 2; Element == 4), !,fail);(Element == 1; Element == 3), AuxConta is Conta + 1, !,checkKingEatingForMore(2,Y,X,NewRow,NewCol,Board,AuxDelta,2,AuxConta)))
      )
    )
  ).

checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard,FlagNotPc):-
  (((Player == 1, Aux1 is (Row - NewRow));(Player == 2, Aux1 is (NewRow - Row))),
    AuxColuna is (Col - NewCol), AuxColuna2 is abs(AuxColuna),
    ((Aux1 == 0; Aux1 == 2; Aux1 == -2), AuxColuna2 \= 1, eatPiece(Player,Row,Col,NewRow,NewCol,Board,NewBoard)));
    ((FlagNotPc == 1, nl,write('Tem de comer a peca do adversario'),nl,nl,!,fail);(!,fail)).

checkCanEatMorePc(Player,Row,Col):-
  (/*cima*/
    backBoard(Board),
    AuxLinha is (Row-1), getPiece(Board,AuxLinha,Col,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxLinha2 is (Row-2), getPiece(Board,AuxLinha2,Col,Peca2), Peca2 == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMorePc(Player,NewRow,NewCol)
  );
  (/* Baixo*/
    backBoard(Board),
    AuxLinha is (Row+1), getPiece(Board,AuxLinha,Col,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxLinha2 is (Row+2), getPiece(Board,AuxLinha2,Col,Peca2), Peca2 == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMorePc(Player,NewRow,NewCol)
  );
  (/* Direita*/
    backBoard(Board),
    AuxColuna is (Col+1), getPiece(Board,Row,AuxColuna,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxColuna2 is (Col+2), getPiece(Board,Row,AuxColuna2,Peca2), Peca2 == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMorePc(Player,NewRow,NewCol)
  );
  (/*Esquerda*/
    backBoard(Board),
    AuxColuna is (Col-1), getPiece(Board,Row,AuxColuna,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxColuna2 is (Col-2), getPiece(Board,Row,AuxColuna2,Peca2), Peca2 == 0,
    repeat,
      askNewPiecePc(NewRow,NewCol),verifiyNewPiecePc(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,0),
    !,
    displayPlayPc(1,Player,Row,Col,NewRow,NewCol),
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMorePc(Player,NewRow,NewCol)
  );true.


checkCanEatMore(Player,Row,Col):-
  (/*cima*/
    backBoard(Board),
    AuxLinha is (Row-1), getPiece(Board,AuxLinha,Col,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxLinha2 is (Row-2), getPiece(Board,AuxLinha2,Col,Peca2), Peca2 == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMore(Player,NewRow,NewCol)
  );
  (/*Baixo*/
    backBoard(Board),
    AuxLinha is (Row+1), getPiece(Board,AuxLinha,Col,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxLinha2 is (Row+2), getPiece(Board,AuxLinha2,Col,Peca2), Peca2 == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMore(Player,NewRow,NewCol)
  );
  (/*Direita*/
    backBoard(Board),
    AuxColuna is (Col+1), getPiece(Board,Row,AuxColuna,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxColuna2 is (Col+2), getPiece(Board,Row,AuxColuna2,Peca2), Peca2 == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMore(Player,NewRow,NewCol)
  );
  (/*Esquerda*/
    backBoard(Board),
    AuxColuna is (Col-1), getPiece(Board,Row,AuxColuna,Element), ((Player == 1, (Element == 2; Element == 4));(Player == 2, (Element == 1; Element == 3))),
    AuxColuna2 is (Col-2), getPiece(Board,Row,AuxColuna2,Peca2), Peca2 == 0, show_board(Board,1), write('Tem de comer a peca do advesario'),nl,
    repeat,
      askNewPiece(NewRow,NewCol),verifiyNewPiece(NewRow,NewCol,Board),
      checkMoveEatMore(Player,Row,Col,NewRow,NewCol,Board,NewBoard2,1),
    !,
    movement(Player,NewBoard2,Row,Col,NewRow,NewCol,NewBoard), retract(backBoard(_)), asserta(backBoard(NewBoard)),!,checkCanEatMore(Player,NewRow,NewCol)
  );true.
