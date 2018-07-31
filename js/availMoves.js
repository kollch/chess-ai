function availMoves(pieceId) {
  let piece = $("#" + pieceId);
  const color = pieceId.substring(0, 1);
  // Note: this will chop off the first letter of the King and Queen piece types
  const pieceType = pieceId.substring(2);
  console.log("The piece type is " + pieceType);
  let location = $("#board").children().index(piece.parent());
  console.log("The location of the piece is " + location);
  let allowedList = [];
  function pushItem(i) {
    let newLocation = $("#board").get(i);
    if (newLocation.children().eq(0).id.substring(0, 1) === color) {
      return false;
    }
    allowedList.push(newLocation);
    return true;
  }
  switch (pieceType) {
    case "Rook":
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
      if ((location - 15) % 8 !== 0 && location - 15 > 0) {
        pushItem(location - 15);
      }
      if ((location - 6) % 8 !== 0 && (location - 6) % 8 !== 1 && location - 6 > 0) {
        pushItem(location - 6);
      }
      if () {
        pushItem(location);
      }
      if () {
        pushItem(location);
      }
      if () {
        pushItem(location);
      }
      if () {
        pushItem(location);
      }
      if () {
        pushItem(location);
      }
      if () {
        pushItem(location);
      }
      break;
    case "Bishop":
      break;
    case "ueen":
      break;
    case "ing":
      break;
    case "Pawn":
      break;
  }
}
