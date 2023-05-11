//Werte
const main = document.querySelector("main");

//Code
loadPage();
function loadPage() {
  cssOverflow();
  newBoxen();
  controlBar();
  boxBarSytem();
}

// Boxen System
function cssOverflow() {
  function cssCode() {
    let allElement = main.querySelectorAll("div:has(table)");
    for (let i = allElement.length - 1; i >= 0; i--) {
      if (allElement[i].style.display !== "none") {
        if (allElement[i].style.wordBreak === "break-all") {
          allElement[i].style.wordBreak = "initial";
        }
        if (
          allElement[i].scrollWidth > allElement[i].clientWidth ||
          allElement[i].scrollHeight > allElement[i].clientHeight
        ) {
          allElement[i].style.wordBreak = "break-all";
        }
      }
    }
  }
  cssCode();
  setInterval(() => {
    cssCode();
  }, 1000);
}

function controlBar() {
  const controller = document.createElement("div");
  controller.id = "controller";
  function boxBar() {
    let table = document.createElement("table");
    table.id = "BoxBar";
    let tr = document.createElement("tr");
    for (let i = 2; i < 5; i++) {
      let th = document.createElement("th");
      th.innerText = "h" + i;
      tr.appendChild(th);
    }
    table.appendChild(tr);
    tr = document.createElement("tr");
    for (let i = 2; i < 5; i++) {
      let td = document.createElement("td");
      td.classList.add("h" + i);
      td.innerText = "Öffnen";
      tr.appendChild(td);
    }
    table.appendChild(tr);
    tr = document.createElement("tr");
    for (let i = 2; i < 5; i++) {
      let td = document.createElement("td");
      td.classList.add("h" + i);
      td.innerText = "Schliesen";
      tr.appendChild(td);
    }
    table.appendChild(tr);
    controller.appendChild(table);
  }

  function upDown() {
    let upDownButton = document.createElement("div");
    //up
    let up = document.createElement("div");
    let upLink = document.createElement("a");
    upLink.href = "#titel";
    up.innerText = "up";
    up.id = "up";
    upLink.appendChild(up);
    upDownButton.appendChild(upLink);
    //down
    let down = document.createElement("div");
    let downLink = document.createElement("a");
    downLink.href = "#footer";
    down.innerText = "down";
    down.id = "down";
    downLink.appendChild(down);
    upDownButton.appendChild(downLink);
    controller.appendChild(upDownButton);
  }

  boxBar();
  upDown();
  document.body.appendChild(controller);
}

function newBoxen() {
  let allDivs = main.querySelectorAll(":is(h2, h3, h4) + div");
  for (let i = 0; i < allDivs.length; i++) {
    allDivs[i].style.display = "none";
  }
  document.body.addEventListener("click", (e) => {
    if (e.composedPath().length >= 5) {
      if (e.composedPath()[e.composedPath().length - 5].matches("main")) {
        switch (e.target.tagName) {
          case "H2":
            Boxen(e);
            break;
          case "H3":
            Boxen(e);
            break;
          case "H4":
            Boxen(e);
            break;
        }
      }
    }
  });
  function Boxen(e) {
    if (e.target.nextElementSibling.style.display === "none") {
      e.target.nextElementSibling.style.display = "";
      if (e.target.nextElementSibling.style.length === 0) {
        e.target.nextElementSibling.removeAttribute("style");
      }
    } else {
      e.target.nextElementSibling.style.display = "none";
    }
  }
}
function boxBarSytem() {
  let boxBar = document.getElementById("BoxBar");
  boxBar.addEventListener("click", (e) => {
    if (e.target.matches("td")) {
      let boxHead = main.getElementsByTagName(e.target.classList[0]);
      for (let i = 0; i < boxHead.length; i++) {
        if (e.target.innerText === "Öffnen") {
          boxHead[i].nextElementSibling.style.display = "";
          if (boxHead[i].nextElementSibling.style.length === 0) {
            boxHead[i].nextElementSibling.removeAttribute("style");
          }
        } else {
          boxHead[i].nextElementSibling.style.display = "none";
        }
      }
    }
  });
}
