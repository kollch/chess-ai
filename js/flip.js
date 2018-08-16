function flip() {
  const board = document.getElementById("board");
  const boardCells = board.childNodes;
  const captured = document.getElementById("captured");
  const capturedOwn = document.getElementById("capturedOwn");
  const capturedOpponent = document.getElementById("capturedOpponent");
  const pieces = document.querySelectorAll("#board img");
  const fromColor = capturedOwn.classList.contains("white") ? "white" : "black";
  board.classList.toggle("showRot");
  toggleClass(pieces, "showRot");
  if (fromColor === "white") {
    board.classList.toggle("rotClock");
    toggleClass(pieces, "rotCClock");
  } else {
    board.classList.toggle("rotCClock");
    toggleClass(pieces, "rotClock");
  }
  setTimeout(() => {
    board.classList.toggle("showRot");
    toggleClass(pieces, "showRot");
    if (fromColor === "white") {
      board.classList.toggle("rotClock");
      toggleClass(pieces, "rotCClock");
    } else {
      board.classList.toggle("rotCClock");
      toggleClass(pieces, "rotClock");
    }
    board.append(...Array.from(boardCells).reverse());
  }, 2000);
  capturedOwn.id = "capturedOpponent";
  capturedOpponent.id = "capturedOwn";
  captured.append(...Array.from(captured.childNodes).reverse());
}
