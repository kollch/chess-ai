function flip() {
  let board = document.getElementById("board");
  let captured = document.getElementById("captured");
  let capturedOwn = document.getElementById("capturedOwn");
  let capturedOpponent = document.getElementById("capturedOpponent");
  board.append(...Array.from(board.childNodes).reverse());
  capturedOwn.id = "capturedOpponent";
  capturedOpponent.id = "capturedOwn";
  captured.append(...Array.from(captured.childNodes).reverse());
}
