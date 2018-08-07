function checkForSpecialMoves(capturing, elmnt, cell) {
  let dest;
  if (capturing) {
    dest = $("#board").children().index($("#" + cell.id).parent());
  } else {
    dest = $("#board").children().index($("#" + cell.id));
  }
  let src = $("#board").children().index($("#" + elmnt.id).parent());
  /* Can't castle with a moved rook */
  if (elmnt.classList.contains("Rook")) {
    let rookType = elmnt.id.substring(0, 2);
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
      $("#board > div").get(src - 1).appendChild($("#board > div").get(56));
    } else if (dest - src === -2) {
      $("#board > div").get(src + 1).appendChild($("#board > div").get(63));
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
      && !$("#board > div").get(dest).firstChild) {
      console.log("Doing en passant");
      let capturedPawn = $("#board > div").get(dest + 8).firstChild;
      document.getElementById("capturedOpponent").appendChild(capturedPawn);
    }
    /* Check for hitting end of board */
    if (dest < 8) {
      $("#board").hide();
      $("#pawnUpgradePrompt").show();
      $("#pawnUpgradePrompt > button").click(() => {
        let result = $('input[name=pawnTo]:checked').val();
        $("#pawnUpgradePrompt").hide();
        $("#board").show();
        let newPiece = document.createElement('img');
        if (elmnt.id.charAt(0) === "b") {
          let newNum = $(".black + ." + result).length + 1;
          newPiece.id = "b" + newNum + result;
          newPiece.src = "images/black" + result + ".png";
          newPiece.className = "black " + result;
        } else {
          let newNum = $(".white + ." + result).length + 1;
          newPiece.id = "w" + newNum + result;
          newPiece.src = "images/white" + result + ".png";
          newPiece.className = "white " + result;
        }
        /* Swap piece for upgrade */
        elmnt.remove();
        cell.appendChild(newPiece);
      });
    }
  }
}

$(() => {
  document.onmousedown = e => {
    if (e.button !== 0) {
      return;
    }
    let mouseX, mouseY, elmnt;
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;
    elmnt = document.elementFromPoint(mouseX, mouseY);
    if (elmnt.tagName !== "IMG") {
      return;
    }
    availMoves(elmnt.id);

    document.onmousemove = e => {
      e.preventDefault();
      let ePosX = mouseX - e.clientX;
      let ePosY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      elmnt.style.position = "absolute";
      elmnt.style.top = (elmnt.offsetTop - ePosY) + "px";
      elmnt.style.left = (elmnt.offsetLeft - ePosX) + "px";
    };

    document.onmouseup = () => {
      elmnt.style.pointerEvents = "none";
      let cell = document.elementFromPoint(mouseX, mouseY);
      if (cell.classList.contains("acceptable")) {
        checkForSpecialMoves(false, elmnt, cell);
        cell.appendChild(elmnt);
        setTimeout(flip, 500);
      } else if (cell.tagName === "IMG"
        && (cell.parentNode.classList.contains("acceptable"))) {
        checkForSpecialMoves(true, elmnt, cell);
        cell.parentNode.appendChild(elmnt);
        document.getElementById("capturedOpponent").appendChild(cell);
        setTimeout(flip, 500);
      }
      elmnt.style.pointerEvents = "auto";
      elmnt.style.position = "unset";
      elmnt.style.top = "unset";
      elmnt.style.left = "unset";
      document.onmousemove = null;
      document.onmouseup = null;
      $("#board > div").removeClass("acceptable");
    };
  };

  document.ontouchstart = e => {
    if (e.touches.length > 1) {
      return;
    }
    let mouseX, mouseY, elmnt;
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
    elmnt = document.elementFromPoint(mouseX, mouseY);
    if (elmnt.tagName !== "IMG") {
      return;
    }
    e.preventDefault();
    availMoves(elmnt.id);

    document.ontouchmove = e => {
      e.preventDefault();
      let ePosX = mouseX - e.touches[0].clientX;
      let ePosY = mouseY - e.touches[0].clientY;
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      elmnt.style.position = "absolute";
      elmnt.style.top = (elmnt.offsetTop - ePosY) + "px";
      elmnt.style.left = (elmnt.offsetLeft - ePosX) + "px";
    };

    document.ontouchend = () => {
      elmnt.style.pointerEvents = "none";
      let cell = document.elementFromPoint(mouseX, mouseY);
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
      $("#board > div").removeClass("acceptable");
    };

    document.ontouchcancel = () => {
      elmnt.style.position = "unset";
      elmnt.style.top = "unset";
      elmnt.style.left = "unset";
      document.ontouchmove = null;
      document.ontouchend = null;
      document.ontouchcancel = null;
      $("#board > div").removeClass("acceptable");
    };
  };
});
