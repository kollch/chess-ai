let wKingLoc = 60;
let bKingLoc = 59;
let wCastleLeft = true;
let bCastleLeft = true;
let wCastleRight = true;
let bCastleRight = true;
let wEnPassant = [false, false, false, false, false, false, false, false];
let bEnPassant = [false, false, false, false, false, false, false, false];
const socket = new WebSocket('ws://localhost:8888');

/* Adds a class to a selection */
function addClass(pieces, className) {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].classList.add(className);
  }
}

/* Removes a class from a selection */
function removeClass(pieces, className) {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].classList.remove(className);
  }
}

/* Toggles a class in a selection */
function toggleClass(pieces, className) {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].classList.toggle(className);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  for (let i = board.childNodes.length; i > 0; i--) {
    board.childNodes[i - 1].remove();
  }
  const locations = ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"];
  locations.push("a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7");
  locations.push("a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6");
  locations.push("a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5");
  locations.push("a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4");
  locations.push("a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3");
  locations.push("a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2");
  locations.push("a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1");
  const pieceIds = ["1", "2", "3", "4", "5", "6", "7", "8"];
  pieceIds.push("1", "1", "1", "1", "1", "2", "2", "2");
  const pieces = ["Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"];
  pieces.push("Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook");
  const bImgs = [];
  const wImgs = [];
  for (let i = 0; i < pieceIds.length; i++) {
    const newPiece = document.createElement('img');
    if (i == 11) {
      newPiece.id = "b" + pieceIds[i + 1] + pieces[i + 1];
      newPiece.src = "images/black" + pieces[i + 1] + ".png";
      newPiece.className = "black " + pieces[i + 1];
    } else if (i == 12) {
      newPiece.id = "b" + pieceIds[i - 1] + pieces[i - 1];
      newPiece.src = "images/black" + pieces[i - 1] + ".png";
      newPiece.className = "black " + pieces[i - 1];
    } else {
      newPiece.id = "b" + pieceIds[i] + pieces[i];
      newPiece.src = "images/black" + pieces[i] + ".png";
      newPiece.className = "black " + pieces[i];
    }
    bImgs.push(newPiece);
  }
  for (let i = 0; i < pieceIds.length; i++) {
    const newPiece = document.createElement('img');
    newPiece.id = "w" + pieceIds[i] + pieces[i];
    newPiece.src = "images/white" + pieces[i] + ".png";
    newPiece.className = "white " + pieces[i];
    wImgs.push(newPiece);
  }
  /*if (opponentColor === "white") {
    locations.reverse();
  }*/
  for (let i = 0; i < locations.length; i++) {
    const newElement = document.createElement('div');
    newElement.id = locations[i];
    newElement.className = "boardSquare";
    if ((i / 8) % 2 < 1 && i % 2 == 1 || (i / 8) % 2 >= 1 && i % 2 == 0) {
      newElement.className = "boardSquare even";
    }
    switch (newElement.id) {
      case "a8":
        newElement.append(bImgs[15]);
        break;
      case "b8":
        newElement.append(bImgs[14]);
        break;
      case "c8":
        newElement.append(bImgs[13]);
        break;
      case "d8":
        newElement.append(bImgs[12]);
        break;
      case "e8":
        newElement.append(bImgs[11]);
        break;
      case "f8":
        newElement.append(bImgs[10]);
        break;
      case "g8":
        newElement.append(bImgs[9]);
        break;
      case "h8":
        newElement.append(bImgs[8]);
        break;
      case "a7":
        newElement.append(bImgs[7]);
        break;
      case "b7":
        newElement.append(bImgs[6]);
        break;
      case "c7":
        newElement.append(bImgs[5]);
        break;
      case "d7":
        newElement.append(bImgs[4]);
        break;
      case "e7":
        newElement.append(bImgs[3]);
        break;
      case "f7":
        newElement.append(bImgs[2]);
        break;
      case "g7":
        newElement.append(bImgs[1]);
        break;
      case "h7":
        newElement.append(bImgs[0]);
        break;
      case "a2":
        newElement.append(wImgs[0]);
        break;
      case "b2":
        newElement.append(wImgs[1]);
        break;
      case "c2":
        newElement.append(wImgs[2]);
        break;
      case "d2":
        newElement.append(wImgs[3]);
        break;
      case "e2":
        newElement.append(wImgs[4]);
        break;
      case "f2":
        newElement.append(wImgs[5]);
        break;
      case "g2":
        newElement.append(wImgs[6]);
        break;
      case "h2":
        newElement.append(wImgs[7]);
        break;
      case "a1":
        newElement.append(wImgs[8]);
        break;
      case "b1":
        newElement.append(wImgs[9]);
        break;
      case "c1":
        newElement.append(wImgs[10]);
        break;
      case "d1":
        newElement.append(wImgs[11]);
        break;
      case "e1":
        newElement.append(wImgs[12]);
        break;
      case "f1":
        newElement.append(wImgs[13]);
        break;
      case "g1":
        newElement.append(wImgs[14]);
        break;
      case "h1":
        newElement.append(wImgs[15]);
        break;
    }
    board.append(newElement);
  }
});
