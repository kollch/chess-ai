function inCheck(kingPos, dest, src) {
  const board = document.getElementById("board");
  const boardCells = board.childNodes;
  const capturedOwn = document.getElementById("capturedOwn");
  function inCheckBy(pieceType, loc) {
    const opponentColor = capturedOwn.classList.contains("black") ? "white" : "black";
    const position = boardCells[loc];
    if (position.firstChild
      && position.firstChild.classList.contains(pieceType)
      && position.firstChild.classList.contains(opponentColor)) {
      return true;
    }
    return false;
  }

  /* Check for knights */
  if ((kingPos - 10) % 8 !== 6 && (kingPos - 10) % 8 !== 7 && kingPos - 10 >= 0) {
    if (inCheckBy("Knight", kingPos - 10) && kingPos - 10 !== dest) {
      return true;
    }
  }
  if ((kingPos - 17) % 8 !== 7 && kingPos - 17 >= 0) {
    if (inCheckBy("Knight", kingPos - 17) && kingPos - 17 !== dest) {
      return true;
    }
  }
  if ((kingPos - 15) % 8 !== 0 && kingPos - 15 >= 0) {
    if (inCheckBy("Knight", kingPos - 15) && kingPos - 15 !== dest) {
      return true;
    }
  }
  if ((kingPos - 6) % 8 !== 0 && (kingPos - 6) % 8 !== 1 && kingPos - 6 >= 0) {
    if (inCheckBy("Knight", kingPos - 6) && kingPos - 6 !== dest) {
      return true;
    }
  }
  if ((kingPos + 10) % 8 !== 0 && (kingPos + 10) % 8 !== 1 && kingPos + 10 < 64) {
    if (inCheckBy("Knight", kingPos + 10) && kingPos + 10 !== dest) {
      return true;
    }
  }
  if ((kingPos + 17) % 8 !== 0 && kingPos + 17 < 64) {
    if (inCheckBy("Knight", kingPos + 17) && kingPos + 17 !== dest) {
      return true;
    }
  }
  if ((kingPos + 15) % 8 !== 7 && kingPos + 15 < 64) {
    if (inCheckBy("Knight", kingPos + 15) && kingPos + 15 !== dest) {
      return true;
    }
  }
  if ((kingPos + 6) % 8 !== 6 && (kingPos + 6) % 8 !== 7 && kingPos + 6 < 64) {
    if (inCheckBy("Knight", kingPos + 6) && kingPos + 6 !== dest) {
      return true;
    }
  }

  /* Check for king */
  if ((kingPos - 1) % 8 !== 7 && kingPos - 1 >= 0) {
    if (inCheckBy("King", kingPos - 1)) {
      return true;
    }
  }
  if ((kingPos + 1) % 8 !== 0 && kingPos + 1 < 64) {
    if (inCheckBy("King", kingPos + 1)) {
      return true;
    }
  }
  if (kingPos - 8 >= 0) {
    if (inCheckBy("King", kingPos - 8)) {
      return true;
    }
  }
  if (kingPos + 8 < 64) {
    if (inCheckBy("King", kingPos + 8)) {
      return true;
    }
  }

  /* Check for rooks and queen */
  function checkedBySomethingAndQ(i, something) {
    /* Returns 1 for true, 0 for false, -1 for break from loop */
    if (i === dest) {
      return -1;
    }
    const position = boardCells[i];
    if (position.firstChild) {
      if (i === src) {
        return 0;
      } else if (inCheckBy(something, i) || inCheckBy("Queen", i)) {
        return 1;
      }
      return -1;
    }
    return 0;
  }
  for (let i = kingPos + 8; i < 64; i += 8) {
    const result = checkedBySomethingAndQ(i, "Rook");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }
  for (let i = kingPos - 8; i >= 0; i -= 8) {
    const result = checkedBySomethingAndQ(i, "Rook");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }
  for (let i = kingPos + 1; i % 8 !== 0; i++) {
    const result = checkedBySomethingAndQ(i, "Rook");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }
  for (let i = kingPos - 1; i >= 0 && i % 8 !== 7; i--) {
    const result = checkedBySomethingAndQ(i, "Rook");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }

  /* Check for pawns and king */
  if ((kingPos - 9) % 8 !== 7 && kingPos - 9 >= 0) {
    if (inCheckBy("Pawn", kingPos - 9)
      || inCheckBy("King", kingPos - 9)) {
      return true;
    }
  }
  if ((kingPos - 7) % 8 !== 0 && kingPos - 7 >= 0) {
    if (inCheckBy("Pawn", kingPos - 7)
      || inCheckBy("King", kingPos - 7)) {
      return true;
    }
  }
  if ((kingPos + 7) % 8 !== 7 && kingPos + 7 < 64) {
    if (inCheckBy("Pawn", kingPos + 7)
      || inCheckBy("King", kingPos + 7)) {
      return true;
    }
  }
  if ((kingPos + 9) % 8 !== 0 && kingPos + 9 < 64) {
    if (inCheckBy("Pawn", kingPos + 9)
      || inCheckBy("King", kingPos + 9)) {
      return true;
    }
  }

  /* Check for bishops and queen */
  for (let i = kingPos + 9; i % 8 !== 0 && i < 64; i += 9) {
    const result = checkedBySomethingAndQ(i, "Bishop");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }
  for (let i = kingPos - 9; i % 8 !== 7 && i >= 0; i -= 9) {
    const result = checkedBySomethingAndQ(i, "Bishop");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }
  for (let i = kingPos + 7; i % 8 !== 7 && i < 64; i += 7) {
    const result = checkedBySomethingAndQ(i, "Bishop");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }
  for (let i = kingPos - 7; i % 8 !== 0 && i >= 0; i -= 7) {
    const result = checkedBySomethingAndQ(i, "Bishop");
    if (result === 1) {
      return true;
    } else if (result === -1) {
      break;
    }
  }
  return false;
}

function availMoves(pieceId) {
  const board = document.getElementById("board");
  const boardCells = board.childNodes;
  const capturedOwn = document.getElementById("capturedOwn");
  const piece = document.getElementById(pieceId);
  const color = pieceId.charAt(0);

  /* Check that piece is the right color */
  if (capturedOwn.classList.contains("black")) {
    if (color !== "b") {
      return;
    }
  } else if (color !== "w") {
    return;
  }

  /* Remove possibility of en passant from pieces of current color
   * (forces the opponent to only have one turn to capture) */
  const pawnArray = color === "b" ? bEnPassant : wEnPassant;
  for (let i = 0; i < pawnArray.length; i++) {
    pawnArray[i] = false;
  }

  const opponentColor = color === "b" ? "w" : "b";
  const pieceType = pieceId.substring(2);
  const location = [].indexOf.call(boardCells, piece.parentElement);
  const allowedList = [];

  function pushItem(i) {
    /* Returns true if a piece is solid, false if moves can go through it */
    const newLocation = boardCells[i];
    if (newLocation.firstChild) {
      if (newLocation.firstChild.id.charAt(0) !== color) {
        allowedList.push(newLocation);
      }
      return false;
    }
    allowedList.push(newLocation);
    return true;
  }

  switch (pieceType) {
    case "Rook":
      /* x 2 x
       * 4 o 3
       * x 1 x
       */
      for (let i = location + 8; i < 64; i += 8) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location - 8; i >= 0; i -= 8) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location + 1; i % 8 !== 0; i++) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location - 1; i >= 0 && i % 8 !== 7; i--) {
        if (!pushItem(i)) {
          break;
        }
      }
      break;
    case "Knight":
      /* x 2 x 3 x
       * 1 x x x 4
       * x x o x x
       * 8 x x x 5
       * x 7 x 6 x
       */
      if ((location - 10) % 8 !== 6 && (location - 10) % 8 !== 7 && location - 10 >= 0) {
        pushItem(location - 10);
      }
      if ((location - 17) % 8 !== 7 && location - 17 >= 0) {
        pushItem(location - 17);
      }
      if ((location - 15) % 8 !== 0 && location - 15 >= 0) {
        pushItem(location - 15);
      }
      if ((location - 6) % 8 !== 0 && (location - 6) % 8 !== 1 && location - 6 >= 0) {
        pushItem(location - 6);
      }
      if ((location + 10) % 8 !== 0 && (location + 10) % 8 !== 1 && location + 10 < 64) {
        pushItem(location + 10);
      }
      if ((location + 17) % 8 !== 0 && location + 17 < 64) {
        pushItem(location + 17);
      }
      if ((location + 15) % 8 !== 7 && location + 15 < 64) {
        pushItem(location + 15);
      }
      if ((location + 6) % 8 !== 6 && (location + 6) % 8 !== 7 && location + 6 < 64) {
        pushItem(location + 6);
      }
      break;
    case "Queen":
      /* Note: since half of the queen's moves are that of the bishop, there is
       * no break so it falls through the bishop case as well. */
      /* 8 2 6
       * 4 o 3
       * 5 1 7
       */
      for (let i = location + 8; i < 64; i += 8) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location - 8; i >= 0; i -= 8) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location + 1; i % 8 !== 0; i++) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location - 1; i >= 0 && i % 8 !== 7; i--) {
        if (!pushItem(i)) {
          break;
        }
      }
    case "Bishop":
      /* 4 x 2
       * x o x
       * 1 x 3
       */
      for (let i = location + 7; i < 64 && i % 8 !== 7; i += 7) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location - 7; i >= 0 && i % 8 !== 0; i -= 7) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location + 9; i < 64 && i % 8 !== 0; i += 9) {
        if (!pushItem(i)) {
          break;
        }
      }
      for (let i = location - 9; i >= 0 && i % 8 !== 7; i -= 9) {
        if (!pushItem(i)) {
          break;
        }
      }
      break;
    case "King":
      /* x 1 2 3 x
       * 9 4 o 5 10
       * x 6 7 8 x
       */
      function canCastleLeft(loc) {
        if (inCheck(loc, -1, -1)
          || (color === "b" && !bCastleLeft)
          || (color === "w" && !wCastleLeft)) {
          return false;
        }
        for (let i = loc - 1; i > 56; i--) {
          if (boardCells[i].firstChild
            || (inCheck(i, i, loc) && i > loc - 3)) {
            return false;
          }
        }
        return true;
      }

      function canCastleRight(loc) {
        if (inCheck(loc, -1, -1)
          || (color === "b" && !bCastleRight)
          || (color === "w" && !wCastleRight)) {
          return false;
        }
        for (let i = loc + 1; i < 63; i++) {
          if (boardCells[i].firstChild
            || (inCheck(i, i, loc) && i < loc + 3)) {
            return false;
          }
        }
        return true;
      }

      if ((location - 9) % 8 !== 7 && location - 9 >= 0) {
        pushItem(location - 9);
      }
      if (location - 8 >= 0) {
        pushItem(location - 8);
      }
      if ((location - 7) % 8 !== 0 && location - 7 >= 0) {
        pushItem(location - 7);
      }
      if ((location - 1) % 8 !== 7 && location - 1 >= 0) {
        pushItem(location - 1);
      }
      if ((location + 1) % 8 !== 0 && location + 1 < 64) {
        pushItem(location + 1);
      }
      if ((location + 7) % 8 !== 7 && location + 7 < 64) {
        pushItem(location + 7);
      }
      if (location + 8 < 64) {
        pushItem(location + 8);
      }
      if ((location + 9) % 8 !== 0 && location + 9 < 64) {
        pushItem(location + 9);
      }
      if (canCastleLeft(location)) {
        pushItem(location - 2);
      }
      if (canCastleRight(location)) {
        pushItem(location + 2);
      }
      break;
    case "Pawn":
      /* x 2 x
       * 3 1 4
       * x o x
       */
      function canEnPassant(pawn) {
        const pawnArray = color === "b" ? wEnPassant : bEnPassant;
        if (pawn && pawn.id.charAt(0) !== color && pawnArray[pawn.id.charAt(1) - 1]) {
          return true;
        }
        return false;
      }

      const newLocation = boardCells[location - 8];
      if (!newLocation.firstChild) {
        if (pushItem(location - 8) && location > 47 && location < 56) {
          if (!boardCells[location - 16].firstChild) {
            pushItem(location - 16);
          }
        }
      }
      if (location % 8 !== 0) {
        const newLocation = boardCells[location - 9];
        if (newLocation.firstChild && newLocation.firstChild.id.substring(0, 1) === opponentColor
          || canEnPassant(boardCells[location - 1].firstChild)) {
          allowedList.push(newLocation);
        }
      }
      if (location % 8 !== 7) {
        const newLocation = boardCells[location - 7];
        if (newLocation.firstChild && newLocation.firstChild.id.substring(0, 1) === opponentColor
          || canEnPassant(boardCells[location + 1].firstChild)) {
          allowedList.push(newLocation);
        }
      }
      break;
  }
  /* Check that a new move doesn't put the king in check; if not, add the class */
  for (spot of allowedList) {
    let kingLoc;
    const newLoc = [].indexOf.call(boardCells, spot);
    if (pieceType === "King") {
      kingLoc = newLoc;
    } else {
      kingLoc = color === "b" ? bKingLoc : wKingLoc;
    }
    if (!inCheck(kingLoc, newLoc, location)) {
      spot.classList.add("acceptable");
    }
  }
}
