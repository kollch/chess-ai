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
      elmnt.style.pointerEvents = "none";
      let cell = document.elementFromPoint(mouseX, mouseY);
      if (cell.classList.contains("acceptable")) {
        cell.appendChild(elmnt);
      } else if (cell.tagName === "IMG" && (cell.parentNode.classList.contains("acceptable") || true)) {
        cell.parentNode.appendChild(elmnt);
        if (cell.classList.contains("black")) {
          document.getElementById("capturedOpponent").appendChild(cell);
        } else {
          document.getElementById("capturedOwn").appendChild(cell);
        }
      }
      elmnt.style.pointerEvents = "auto";
      elmnt.style.position = "unset";
      elmnt.style.top = "unset";
      elmnt.style.left = "unset";
      document.onmousemove = null;
      document.onmouseup = null;
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
      }
      elmnt.style.pointerEvents = "auto";
      elmnt.style.position = "unset";
      elmnt.style.top = "unset";
      elmnt.style.left = "unset";
      document.ontouchmove = null;
      document.ontouchend = null;
      document.ontouchcancel = null;
    };

    document.ontouchcancel = () => {
      elmnt.style.position = "unset";
      elmnt.style.top = "unset";
      elmnt.style.left = "unset";
      document.ontouchmove = null;
      document.ontouchend = null;
      document.ontouchcancel = null;
    };
  };
});
