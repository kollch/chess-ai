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
    case "ueen":
      break;
    case "ing":
      break;
    case "Pawn":
      break;
  }
}
