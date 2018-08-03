$(() => {
  document.onmousedown = e => {
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
      function checkForSpecialMoves(capturing) {
        let dest;
        if (capturing) {
          let dest = $("#board").children().index($("#" + cell.id).parent());
        } else {
          let dest = $("#board").children().index($("#" + cell.id));
        }
        let src = $("#board").children().index($("#" + elmnt.id).parent());
        /* Can't castle with a moved rook */
        if (elmnt.classList.contains("Rook")) {
          let rookType = elmnt.id.substring(0, 2);
          switch (rookType) {
            case "bL":
              bCastleLeft = false;
              break;
            case "bR":
              bCastleRight = false;
              break;
            case "wL":
              wCastleLeft = false;
              break;
            case "wR":
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
          if (src - dest === 9 || src - dest === 7) {
            let capturedPawn = $("#board > div").get(8 - src + dest).firstChild;
            document.getElementById("capturedOpponent").appendChild(capturedPawn);
          }
          /* Check for hitting end of board */
        }
      }
      elmnt.style.pointerEvents = "none";
      let cell = document.elementFromPoint(mouseX, mouseY);
      if (cell.classList.contains("acceptable")) {
        checkForSpecialMoves(false);
        cell.appendChild(elmnt);
        flip();
      } else if (cell.tagName === "IMG"
        && (cell.parentNode.classList.contains("acceptable"))) {
        checkForSpecialMoves(true);
        cell.parentNode.appendChild(elmnt);
        document.getElementById("capturedOpponent").appendChild(cell);
        flip();
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
        cell.appendChild(elmnt);
        flip();
      } else if (cell.tagName === "IMG" && (cell.parentNode.classList.contains("acceptable"))) {
        cell.parentNode.appendChild(elmnt);
        document.getElementById("capturedOpponent").appendChild(cell);
        flip();
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
