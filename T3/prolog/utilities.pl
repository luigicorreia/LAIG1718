:- use_module(library(lists)).
:- use_module(library(random)).

% Clear screen
clear :- write('\e[2J').

% get input from user
getNewLine:- get_code(T), (T == 10 -> ! ; getNewLine).
getDigit(D):- get_code(Dt), D is Dt - 48, (Dt == 10 -> ! ; getNewLine).
getChar(C):- get_char(C), char_code(C, Co), (Co == 10 -> ! ; getNewLine).

% Verifica a vez do jogador
par(Jogada):- Jogada mod 2 =:= 0.

not(X):- X,!,fail.
not(_X).

% Conta o número pecas de um determinado valor
countPieces(_,[],0).
countPieces(Element, [H|T], Number) :- countList(Element, H, T, Number).
countList(Element, [H|T], L2, Number):- ((Element == H,(countList(Element, T, L2, Y), Number is Y + 1)); countList(Element, T, L2, Number)).
countList(Element,[], L2, Number) :- countPieces(Element, L2, Number).

% Verifica input se está entre 1 a 8
verifyRow(Row):- (Row >= 1, Row =< 8); nl, write('Introduza uma linha valida (1 a 8)'),nl,fail.

% Verifica input se está entre A a H e converte 1 a 9
verifyColumn(Col,Number):-
  (
    ((Col == ('A');Col == (a)), Number is 1);
    ((Col == ('B');Col == (b)), Number is 2);
    ((Col == ('C');Col == (c)), Number is 3);
    ((Col == ('D');Col == (d)), Number is 4);
    ((Col == ('E');Col == (e)), Number is 5);
    ((Col == ('F');Col == (f)), Number is 6);
    ((Col == ('G');Col == (g)), Number is 7);
    ((Col == ('H');Col == (h)), Number is 8)
  ); nl,write('Introduza uma coluna valida (A a H)'),nl,false.

% Retorna elemento de uma posicao X,Y
getPiece(Board, Row, Col, Element):- nth1(Row, Board, Aux),nth1(Col, Aux, Element).

% Faz update a Board
updateTo(_,[],[],_,_).
updateTo(ElemToChange,[[_|Xs]|Ys],[[ElemToChange|Xs1]|Ys1],1,1) :-
                    !,updateTo(ElemToChange,[Xs|Ys],[Xs1|Ys1],0,0).

updateTo(ElemToChange,[[X]|Xs],[[X]|Xs1],0,0) :-
                    updateTo(ElemToChange,Xs,Xs1,0,0),!.

updateTo(ElemToChange,[[X|Xs]|Ys],[[X|Xs1]|Ys1],0,0) :-
                    updateTo(ElemToChange,[Xs|Ys],[Xs1|Ys1],0,0).

updateTo(ElemToChange,[[X|Xs]|Ys],[[X|Xs1]|Ys1],N,1) :-
                    N1 is N-1,
                    updateTo(ElemToChange,[Xs|Ys],[Xs1|Ys1],N1,1).

updateTo(ElemToChange,[Xs|Ys],[Xs|Ys1],N,M) :-
                    M1 is M-1,
                    updateTo(ElemToChange,Ys,Ys1,N,M1),!.

updateBoard(ElemToChange,Y,X,Board,NewBoard) :-
                    updateTo(ElemToChange,Board,NewBoard,X,Y).
