# Gets hand-typed input of the opponent's move, then prints out its own move

class MoveError(Exception):
    """Illegal move attempted."""
    pass

class Board:
   pass

class Piece:
    def __init__(self, board, x, y):
        self.moveto(board, x, y)

    def loc():
        return (x, y)

    def moveto(board, x, y):
        if board.empty_loc(x, y):
            self.x = x
            self.y = y
        else:
            raise MoveError

class Pawn(Piece):
    def __init__(self):
        # Tuples of options for a single move, then the number of moves possible
        self.move = [(0, 1)]
        self.num_moves = 1

    def canmoveto(board, x, y):
        diff = (x - self.x, y - self.y)
        for i, move in enumerate(self.move):
            if diff[0] == 0:
                if move[0] != 0:
                    continue
            elif diff[0] > 0:
                if move[0] <= 0:
                    continue
            else:
                if move[0] >= 0:
                    continue
            if diff[1] == 0:
                if move[1] != 0:
                    continue
            elif diff[1] > 0:
                if move[1] <= 0:
            else:
                if move[1] >= 0:
                    continue
            wanted_move = i
            break
        else:
            return False
        for i in range(self.num_moves):
            if not board.empty_loc(self.x + self.move[wanted_move][0], self.y + self.move[wanted_move][1]):
                return False
        return True

class Rook(Piece):
    def __init__(self):
        self.move = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        self.num_moves = 8

class Knight(Piece):
    def __init__(self):
        self.move = [(-1, 2), (1, 2), (2, 1), (2, -1), (1, -2), (-1, -2), (-2, -1), (-2, 1)]
        self.num_moves = 1

class Bishop(Piece):
    def __init__(self):
        self.move = [(1, 1), (1, -1), (-1, -1), (-1, 1)]
        self.num_moves = 8

class Queen(Piece):
    def __init__(self):
        self.move = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]
        self.num_moves = 8

class King(Piece):
    def __init__(self):
        self.move = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]
        self.num_moves = 1

board = [[i for i in range(8)] for j in range(8)]
