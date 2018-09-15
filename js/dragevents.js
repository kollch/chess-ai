document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const boardCells = board.childNodes;
  const pawnUpgrade = document.getElementById("pawnUpgradePrompt");
  const pawnUpgradeBtn = document.getElementById("pawnUpgradeBtn");
  const color = "white";

  function checkForSpecialMoves(capturing, elmnt, cell) {
    let dest;
    if (capturing) {
      dest = [].indexOf.call(boardCells, cell.parentElement);
    } else {
      dest = [].indexOf.call(boardCells, cell);
    }
    const src = [].indexOf.call(boardCells, elmnt.parentElement);
    /* Can't castle with a moved rook */
    if (elmnt.classList.contains("Rook")) {
      const rookType = elmnt.id.substring(0, 2);
      switch (rookType) {
        case "b1":
          bCastleLeft = false;
          break;
        case "b2":
          bCastleRight = false;
          break;
        case "w1":
          wCastleLeft = false;
          break;
        case "w2":
          wCastleRight = false;
          break;
        default:
          console.log("Error: Invalid rook id");
      }
    } else if (elmnt.classList.contains("King")) {
      if (elmnt.id.charAt(0) === "b") {
        bCastleLeft = false;
        bCastleRight = false;
        bKingLoc = dest;
      } else {
        wCastleLeft = false;
        wCastleRight = false;
        wKingLoc = dest;
      }
      /* Check for castling */
      if (dest - src === 2) {
        boardCells[dest - 1].appendChild(boardCells[63].firstChild);
      } else if (dest - src === -2) {
        boardCells[dest + 1].appendChild(boardCells[56].firstChild);
      }
    } else if (elmnt.classList.contains("Pawn")) {
      /* Check for en passant */
      if (src - dest === 16) {
        if (elmnt.id.charAt(0) === "b") {
          bEnPassant[elmnt.id.charAt(1) - 1] = true;
        } else {
          wEnPassant[elmnt.id.charAt(1) - 1] = true;
        }
      }
      if ((src - dest === 9 || src - dest === 7)
        && !boardCells[dest].firstChild) {
        const capturedPawn = boardCells[dest + 8].firstChild;
        document.getElementById("capturedOpponent").appendChild(capturedPawn);
      }
      /* Check for hitting end of board */
      if (dest < 8) {
        board.style.display = 'none';
        pawnUpgrade.style.display = 'block';
        pawnUpgradeBtn.onclick = () => {
          /* Note that this is an async call */
          const result = document.querySelectorAll("input[name=pawnTo]:checked")[0].value;
          pawnUpgrade.style.display = 'none';
          board.style.display = 'block';
          const newPiece = document.createElement('img');
          if (elmnt.id.charAt(0) === "b") {
            const newNum = document.querySelectorAll(".black." + result).length + 1;
            newPiece.id = "b" + newNum + result;
            newPiece.src = "images/black" + result + ".png";
            newPiece.className = "black " + result;
          } else {
            const newNum = document.querySelectorAll(".white." + result).length + 1;
            newPiece.id = "w" + newNum + result;
            newPiece.src = "images/white" + result + ".png";
            newPiece.className = "white " + result;
          }
          /* Swap piece for upgrade */
          elmnt.parentNode.appendChild(newPiece);
          elmnt.remove();
        };
      }
    }
  }

  function makeAIMove(nextMove) {
    const fromElmnt = document.getElementById(nextMove[0]);
    const toElmnt = document.getElementById(nextMove[1]);
    if (!isValidMove(color === "white" ? "black" : "white", fromElmnt, toElmnt)) {
      alert("Uh oh! The AI made an invalid move.");
      return;
    }
    if (toElmnt.firstChild) {
      const capturedPiece = toElmnt.firstChild;
      toElmnt.appendChild(fromElmnt.firstChild);
      document.getElementById("capturedOwn").appendChild(capturedPiece);
    } else {
      toElmnt.appendChild(fromElmnt.firstChild);
    }
  }

  socket.onmessage = socketEvent => {
    console.log('Receiving new move from server');
    const nextMove = socketEvent.data;
    /* Data passed into function as array [src, dest] */
    makeAIMove(nextMove.split(" "));
  }

  /* Prevent action until data can be sent through the socket */
  socket.onopen = socketEvent => {
    document.onmousedown = e => {
      if (e.button !== 0) {
        return;
      }
      let mouseX, mouseY;
      e.preventDefault();
      mouseX = e.clientX;
      mouseY = e.clientY;
      const elmnt = document.elementFromPoint(mouseX, mouseY);
      if (elmnt.tagName !== "IMG") {
        return;
      }
      const possMoves = availMoves(elmnt.id, color);
      for (move of possMoves) {
        move.classList.add("acceptable");
      }

      document.onmousemove = e => {
        e.preventDefault();
        const ePosX = mouseX - e.clientX;
        const ePosY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        elmnt.style.position = "absolute";
        elmnt.style.top = (elmnt.offsetTop - ePosY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - ePosX) + "px";
      };

      document.onmouseup = () => {
        elmnt.style.pointerEvents = "none";
        const cell = document.elementFromPoint(mouseX, mouseY);
        let nextMove;
        const src = elmnt.parentElement.id;
        if (cell.classList.contains("acceptable")) {
          checkForSpecialMoves(false, elmnt, cell);
          const dest = cell.id;
          cell.appendChild(elmnt);
          console.log("Sending move to server");
          socket.send(src + " " + dest);
          //setTimeout(flip, 500);
        } else if (cell.tagName === "IMG" && cell.parentNode.classList.contains("acceptable")) {
          checkForSpecialMoves(true, elmnt, cell);
          const dest = cell.parentElement.id;
          cell.parentNode.appendChild(elmnt);
          document.getElementById("capturedOpponent").appendChild(cell);
          console.log("Sending move to server");
          socket.send(src + " " + dest);
          //setTimeout(flip, 500);
        }
        elmnt.style.pointerEvents = "auto";
        elmnt.style.position = "unset";
        elmnt.style.top = "unset";
        elmnt.style.left = "unset";
        document.onmousemove = null;
        document.onmouseup = null;
        removeClass(boardCells, "acceptable");
      };
    };

    document.ontouchstart = e => {
      if (e.touches.length > 1) {
        return;
      }
      let mouseX, mouseY;
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      const elmnt = document.elementFromPoint(mouseX, mouseY);
      if (elmnt.tagName !== "IMG") {
        return;
      }
      e.preventDefault();
      const possMoves = availMoves(elmnt.id, color);
      for (move of possMoves) {
        move.classList.add("acceptable");
      }

      document.ontouchmove = e => {
        e.preventDefault();
        const ePosX = mouseX - e.touches[0].clientX;
        const ePosY = mouseY - e.touches[0].clientY;
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        elmnt.style.position = "absolute";
        elmnt.style.top = (elmnt.offsetTop - ePosY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - ePosX) + "px";
      };

      document.ontouchend = () => {
        elmnt.style.pointerEvents = "none";
        const cell = document.elementFromPoint(mouseX, mouseY);
        if (cell.classList.contains("acceptable")) {
          checkForSpecialMoves(false, elmnt, cell);
          cell.appendChild(elmnt);
          setTimeout(flip, 500);
        } else if (cell.tagName === "IMG" && (cell.parentNode.classList.contains("acceptable"))) {
          checkForSpecialMoves(true, elmnt, cell);
          cell.parentNode.appendChild(elmnt);
          document.getElementById("capturedOpponent").appendChild(cell);
          setTimeout(flip, 500);
        }
        elmnt.style.pointerEvents = "auto";
        elmnt.style.position = "unset";
        elmnt.style.top = "unset";
        elmnt.style.left = "unset";
        document.ontouchmove = null;
        document.ontouchend = null;
        document.ontouchcancel = null;
        removeClass(boardCells, "acceptable");
      };

      document.ontouchcancel = () => {
        elmnt.style.position = "unset";
        elmnt.style.top = "unset";
        elmnt.style.left = "unset";
        document.ontouchmove = null;
        document.ontouchend = null;
        document.ontouchcancel = null;
        removeClass(boardCells, "acceptable");
      };
    };
  };
});
