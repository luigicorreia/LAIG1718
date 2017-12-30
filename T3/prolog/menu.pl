:- consult(utilities).
:- consult(dameo).

% Menus
dameo :- clear,
  write('-----------------------------'),nl,
  write('            Dameo            '),nl,
  write('-----------------------------'),nl,
  write('                             '),nl,
  write('          1: Jogar           '),nl,
  write('          2: Creditos        '),nl,
  write('          3: Sair            '),nl,
  write('                             '),nl,
  write('-----------------------------'),nl,
  menu_option(1).


menu_option(OPTION) :- write('Introduza a sua escolha'), nl,getDigit(INPUT),
  ((OPTION == 1, check_menu_option(INPUT));(OPTION == 2, check_menu_game_option(INPUT))).

check_menu_option(INPUT):- (INPUT > 3 ; INPUT < 0), nl, write('Introduza uma opcao valida (1 a 3)'),nl ,nl, menu_option(1).
check_menu_option(1):- menu_game.
check_menu_option(2):- credits.
check_menu_option(3):- halt.

check_menu_game_option(INPUT):- (INPUT > 4 ; INPUT < 0), nl, write('Introduza uma opcao valida (1 a 4)'),nl ,nl, menu_option(2).
check_menu_game_option(1):- start(1),nl, nl,write('Pressione qualquer tecla para voltar ao menu principal'),nl,getDigit(_),dameo.
check_menu_game_option(2):- start(2),nl, nl,write('Pressione qualquer tecla para voltar ao menu principal'),nl,getDigit(_),dameo.
check_menu_game_option(3):- start(3),nl, nl,write('Pressione qualquer tecla para voltar ao menu principal'),nl,getDigit(_),dameo.
check_menu_game_option(4):- dameo.

menu_game :- clear,
  write('-----------------------------'),nl,
  write('            Dameo            '),nl,
  write('-----------------------------'),nl,
  write('                             '),nl,
  write('  1: Jogador vs Jogador      '),nl,
  write('  2: Jogador vs Computador   '),nl,
  write('  3: Computador vs Computador'),nl,
  write('  4: Voltar ao menu principal'),nl,
  write('                             '),nl,
  write('-----------------------------'),nl,
  menu_option(2).

credits :- clear,
  write('-----------------------------'),nl,
  write('            Dameo            '),nl,
  write('-----------------------------'),nl,
  write('                             '),nl,
  write('         Luis Correia        '),nl,
  write('        Vicente Espinha      '),nl,
  write('                             '),nl,
  write('-----------------------------'),nl,
  nl,write('Pressione qualquer tecla para voltar ao menu principal'),nl,
  getDigit(_),dameo.


display_all(Board,Jogada):-
  show_board(Board,1),
  state_info_display(Jogada,Board).

display_all_pc(Board,Jogada):-
  show_board(Board,1),
  state_info_display(Jogada,Board),
  get_code(_).


displayPlayPc(Type,Player,Row,Col,NewRow,NewCol):-
  ((Col == 1, Letter = 'A');(Col == 2, Letter = 'B');
  (Col == 3, Letter = 'C');(Col == 4, Letter = 'D');
  (Col == 5, Letter = 'E');(Col == 6, Letter = 'F');
  (Col == 7, Letter = 'G');(Col == 8, Letter = 'H')),
  ((NewCol == 1, NewLetter = 'A');(NewCol == 2, NewLetter = 'B');
  (NewCol == 3, NewLetter = 'C');(NewCol == 4, NewLetter = 'D');
  (NewCol == 5, NewLetter = 'E');(NewCol == 6, NewLetter = 'F');
  (NewCol == 7, NewLetter = 'G');(NewCol == 8, NewLetter = 'H')),
  ((Player == 1, write('Jogaram as "o"'),nl);(Player == 2, write('Jogaram as "x"'),nl)),
  write('Jogada do Computador:'),nl,
  write('Posicao Inicial :'),nl,
  format('Coluna : ~w ',[Letter]),nl,format('Linha : ~d ',[Row]),nl,
  write('Posicao Final :'),nl,
  format('Coluna : ~w ',[NewLetter]),nl,format('Linha : ~d ',[NewRow]),nl,nl,
  (Type==2,write('Pressione qualquer tecla para continuar'),get_char(_);true).

state_info_display(Jogada,Board):-nl,
  countPieces(2,Board,NPretas),
  countPieces(1,Board,NBrancas),
	countPieces(4,Board,NKingPretas),
	countPieces(3,Board,NKingBrancas),
  write('Jogada | "x" | "o" | "X" | "O"'), nl,
	format('   ~d   ', [Jogada]),
  format('  ~d  ', [NPretas]),
	format('  ~d   ', [NBrancas]),
	format('  ~d   ', [NKingPretas]),
	format('  ~d   ', [NKingBrancas]),nl,nl.

% =========== BOARDS ===========
/* exemplo da board no inicio*/
board_start([
	[2,2,2,2,2,2,2,2],
	[0,2,2,2,2,2,2,0],
	[0,0,2,2,2,2,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,1,1,1,1,0,0],
	[0,1,1,1,1,1,1,0],
	[1,1,1,1,1,1,1,1]
]).

/*exemplo de uma board durante o jogo*/
board_midgame([
	[1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,1,0],
	[0,1,1,0,1,1,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,2,0,2,2,0],
	[0,0,0,2,2,0,0,0],
	[0,0,0,0,2,0,2,0],
	[2,2,3,2,0,2,2,2]
]).

/*exemplo de uma board no final do jogo*/
board_end([
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,2,0,0,0,0],
	[0,0,0,1,0,0,0,0],
	[3,0,0,0,0,0,0,0]
]).


% =========== Display ===========
show_board([],_) :-
	write('  ---------------------------------\n'),
	write('    A   B   C   D   E   F   G   H  \n').

show_board([A|B],N) :-
	write('  ---------------------------------\n'),
	write(N),
  	show_line(A),
  	nl,
  	N1 is N+1,
  	show_board(B,N1).

/*imprime uma linha*/
show_line([]) :- write(' | ').
show_line([A|B]) :-
  	write(' | '),
  	analyse_piece(A),
  	show_line(B).


analyse_piece(X) :-
 	blank_space(X);
 	first_team(X);
 	second_team(X);
 	first_team_king(X);
 	second_team_king(X).

/*predicados utilizados para substituir os valores das peças pelas suas representações*/
blank_space(X) :- X == 0, write(' ').
first_team(X) :- X == 1, write('o').
second_team(X) :- X == 2, write('x').
first_team_king(X) :- X == 3, write('O').
second_team_king(X) :- X == 4, write('X').
