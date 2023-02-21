//Werte
main = document.querySelector("main");

//Code
loadPage();
function loadPage() {
  navigation();
  newBoxen();
  controlBar();
  boxBarSytem();
  if (!window.location.href.includes("verzeichnis.html")) {
    clickHold();
  }
}

//CATEGORY Loaddirectory
function navigation() {
  //CATEGORY Constante Daten
  let pfad = window.location.pathname.slice(
    window.location.pathname.search("hauptverzeichnis")
  );
  // Pfadname
  //ANCHOR Verzeichnisnamen & Filter
  let ausgabe = pfad.split("/");
  //ANCHOR Ausnahme Filter
  function htmlReplace(ausdruck) {
    return ausdruck.replace(".html", "");
  }
  for (let i = 0; i < ausgabe.length; i++) {
    ausgabe[i] = filter(ausgabe[i]);
  }
  // Standort
  standort = "";
  for (let i = 0; i < pfad.split("/").length - 2; i++) {
    standort += "../";
  }
  standort += "./";
  //Favicon icon
  let link = document.createElement("link");
  link.setAttribute("rel", "shortcut icon");
  link.setAttribute("href", standort + "../icons/png/favicon.ico");
  link.setAttribute("type", "image/x-icon");
  document.querySelector("link").insertAdjacentElement("beforebegin", link);
  //ANCHOR Hauptverzeichnis
  loadDirectory();
  function loadDirectory() {
    let requestURL = standort + "verzeichnis.json";
    //Anfrage senden
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "text";
    request.send();
    request.onload = function alpha() {
      navlist = JSON.parse(request.response);
      navigationBar(navlist);
    };
  }
  //!CATEGORY
  //CATEGORY Navigation Function
  function navigationBar(navlist) {
    //ANCHOR Verändernde Daten
    leistenZahl = 0;
    //ANCHOR Hauptfunction
    if (ausgabe[0] === "hauptverzeichnis") {
      header = document.createElement("header");
      console.log(pfad.split("/").length - 1);
      for (let i = 0; i < pfad.split("/").length - 1; i++) {
        switch (i) {
          case 0:
            //1 Leiste
            if (navlist !== undefined) {
              leiste(navlist, ausgabe[i + 1]);
            }
            continue;
          case 1:
            //2 Leiste
            if (navlist[ausgabe[i]][2] !== undefined) {
              leiste(navlist[ausgabe[i]][2], ausgabe[i + 1]);
            }
            continue;
          case 2:
            //3 Leiste
            if (navlist[ausgabe[i - 1]][2][ausgabe[i]][2] !== undefined) {
              leiste(navlist[ausgabe[i - 1]][2][ausgabe[i]][2], ausgabe[i + 1]);
            }
            continue;
          case 3:
            //4 Leiste
            console.log(ausgabe[i + 1]);
            console.log(navlist[ausgabe[i - 2]][2]);
            console.log(navlist[ausgabe[i - 2]][2][ausgabe[i - 1]]);
            console.log(navlist[ausgabe[i - 2]][2][ausgabe[i - 1]][2]);
            console.log(
              navlist[ausgabe[i - 2]][2][ausgabe[i - 1]][2][ausgabe[i]]
            );
            console.log(
              navlist[ausgabe[i - 2]][2][ausgabe[i - 1]][2][ausgabe[i]][2]
            );
            console.log(
              navlist[ausgabe[i - 2]][2][ausgabe[i - 1]][2][ausgabe[i]][2] ===
                undefined
            );
            console.log(ausgabe[i]);
            if (
              navlist[ausgabe[i - 2]][2][ausgabe[i - 1]][2][ausgabe[i]] !==
              undefined
            ) {
              leiste(
                navlist[ausgabe[i - 2]][2][ausgabe[i - 1]][2][ausgabe[i]][2],
                ausgabe[i + 1]
              );
            }
            continue;
        }
      }
      function leiste(navliste, ausgaben) {
        leistenZahl++;
        let nav = document.createElement("nav");
        nav.setAttribute("class", "navi" + leistenZahl);
        let ul = document.createElement("ul");
        //ANCHOR Link einpacken
        for (key in navliste) {
          let li = document.createElement("li");
          let a = document.createElement("a");
          a.innerHTML = navliste[key][0];
          if (ausgaben === navliste[key][0].toLowerCase()) {
            a.setAttribute("class", "aktuell");
          }
          a.setAttribute("href", standort + navliste[key][1]);
          li.appendChild(a);
          if (navliste[key][3] !== undefined && navliste[key][3].length !== 0) {
            let div = document.createElement("div");
            let ul2 = document.createElement("ul");
            for (let i = 0; i < navliste[key][3].length; i++) {
              let li2 = document.createElement("li");
              let a2 = document.createElement("a");
              a2.innerHTML = navliste[key][3][i][0];
              a2.setAttribute("href", standort + navliste[key][3][i][1]);
              li2.appendChild(a2);
              ul2.appendChild(li2);
              if (
                filter(pfad.replace("hauptverzeichnis/", "")) ===
                navliste[key][3][i][1]
              ) {
                a2.setAttribute("class", "aktuell2");
                a.replaceWith(a2.cloneNode(true));
                let newLI = document.createElement("li");
                newLI.appendChild(a);
                ul2.insertBefore(newLI, ul2.children[0]);
              }
            }
            div.appendChild(ul2);
            li.appendChild(div);
            li.setAttribute("class", "wahl");
          }
          ul.appendChild(li);
        }
        nav.appendChild(ul);
        header.appendChild(nav);
      }
      //ANCHOR Alles einpacken
      let h1 = document.querySelector("h1");
      h1.insertAdjacentElement("beforebegin", header);
    }
  }
}

function controlBar() {
  console.log("!!!---controlBar---!!!");
  const controller = document.createElement("div");
  controller.id = "controller";
  function boxBar() {
    console.log("!!!---boxBar---!!!");
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
// NewBoxen System
function newBoxen() {
  allDivs = main.getElementsByTagName("div");
  console.log(allDivs);
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
    console.log("!!!---Boxen---!!!");
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
      let ClapBox = "none";
      boxHead = main.getElementsByTagName(e.target.classList[0]);
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

//Schreiben
function clickHold() {
  console.log("!!!---clickHold---!!!");
  document.body.addEventListener("mousedown", (e) => {
    console.log("!!!---Test---!!!");
    console.log(e);
    console.log(e.composedPath());
    console.log(e.composedPath().length);
    console.log(e.composedPath()[e.composedPath().length - 5]);
    if (
      document.getElementById("ElementSeletction") === null &&
      document.getElementById("ElementOption") === null &&
      document.getElementById("overriteFinishButton") === null
    ) {
      if (e.composedPath().length >= 5) {
        if (e.composedPath()[e.composedPath().length - 5].matches("main")) {
          function EndMouseEvent() {
            console.log("!!!---EndMouseEvent---!!!");
            document.body.removeEventListener("mouseup", EndMouseEvent);
            document.body.removeEventListener("mouseout", EndMouseEvent);
            clearTimeout(mouseHold);
          }
          document.body.addEventListener("mouseout", EndMouseEvent);
          document.body.addEventListener("mouseup", EndMouseEvent);
          mouseHold = setTimeout(() => {
            document.body.removeEventListener("mouseup", EndMouseEvent);
            document.body.removeEventListener("mouseout", EndMouseEvent);
            windowsItemSelection(e.target);
            ElementOption();
            overriteFinish();
            attributeBar();
            overwritePointer();
            overwritePfeile();
          }, 1000);
        }
      }
    }
  });
}
//Overwrite navigation
function windowsItemSelection(e) {
  console.log("!!!---windowsItemSelection---!!!");
  if (document.getElementById("ElementSeletction") !== null) {
    controller.removeChild(document.getElementById("ElementSeletction"));
  }
  FocusElement = seekFocus();
  if (FocusElement !== undefined) {
    FocusElement.classList.remove("Focus");
  }
  e.classList.add("Focus");
  //Navigation Table
  FocusElement = seekFocus();
  let table = document.createElement("table");
  table.id = "ElementSeletction";
  let caption = document.createElement("caption");
  caption.innerText = FocusElement.tagName;
  let tbody = document.createElement("tbody");
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let div = document.createElement("div");
  let ul = document.createElement("ul");
  for (let i = 0; i < FocusElement.children.length; i++) {
    let auswahl = FocusElement.children[i].tagName;
    let li = document.createElement("li");
    li.innerText = auswahl;
    ul.appendChild(li);
  }
  div.appendChild(ul);
  td.appendChild(div);
  tr.appendChild(td);
  tbody.appendChild(tr);
  table.appendChild(caption);
  table.appendChild(tbody);
  console.log(FocusElement);
  console.log(FocusElement.parentElement);
  console.log(FocusElement.parentElement.tagName);
  if (FocusElement.parentElement.tagName !== "BODY") {
    let tfoot = document.createElement("tfoot");
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerText = "Zurück";
    tr.appendChild(td);
    tfoot.appendChild(tr);
    table.appendChild(tfoot);
  }
  controller.appendChild(table);
  focusMovFunc();
  attributeBar();
}
function focusMovFunc(position) {
  console.log("!!!---focusMovFunc---!!!");
  document
    .getElementById("ElementSeletction")
    .addEventListener("click", (e) => {
      console.log("!!!---click---!!!");
      console.log(e);
      if (e.target.matches("li")) {
        if (e.target.classList.contains("Focus2")) {
          liPosition = Array.prototype.slice
            .call(e.target.parentElement.children)
            .indexOf(e.target);
          let targetedItem = FocusElement.children[liPosition];
          if (targetedItem.style.length < 2) {
            targetedItem.removeAttribute("style");
            console.log(targetedItem);
          } else {
            targetedItem.style.opacity = "";
          }
          windowsItemSelection(targetedItem);
        } else {
          if (
            document
              .getElementById("ElementSeletction")
              .getElementsByClassName("Focus2")[0] !== undefined
          ) {
            document
              .getElementById("ElementSeletction")
              .getElementsByClassName("Focus2")[0].style.backgroundColor = "";
            if (
              document
                .getElementById("ElementSeletction")
                .getElementsByClassName("Focus2")[0].style.length === 0
            ) {
              document
                .getElementById("ElementSeletction")
                .getElementsByClassName("Focus2")[0]
                .removeAttribute("style");
            }
            document
              .getElementById("ElementSeletction")
              .getElementsByClassName("Focus2")[0]
              .removeAttribute("class");
          }
          e.target.style.backgroundColor = "red";
          e.target.classList.add("Focus2");
        }
      } else if (e.target.matches("td")) {
        if (e.target.innerText === "Zurück") {
          if (FocusElement.parentElement.style.length < 2) {
            FocusElement.parentElement.removeAttribute("style");
            console.log(FocusElement.parentElement);
          } else {
            FocusElement.parentElement.style.opacity = "";
          }
          let GoBack = FocusElement.parentElement;
          windowsItemSelection(GoBack);
        }
      }
    });
  document
    .getElementById("ElementSeletction")
    .addEventListener("mouseover", (e) => {
      // console.log('!!!---mouseover---!!!')
      if (e.target.matches("li")) {
        liPosition = Array.prototype.slice
          .call(e.target.parentElement.children)
          .indexOf(e.target);
        let targetedItem = FocusElement.children[liPosition];
        targetedItem.style.opacity = "0.5";
      } else if (e.target.matches("td")) {
        if (e.target.innerText === "Zurück") {
          FocusElement.parentElement.style.opacity = "0.5";
        }
      }
    });
  document
    .getElementById("ElementSeletction")
    .addEventListener("mouseout", (e) => {
      // console.log('!!!---mouseout---!!!')
      if (e.target.matches("li")) {
        liPosition = Array.prototype.slice
          .call(e.target.parentElement.children)
          .indexOf(e.target);
        let targetedItem = FocusElement.children[liPosition];
        if (targetedItem.style.length < 2) {
          targetedItem.removeAttribute("style");
        } else {
          targetedItem.style.opacity = "";
        }
      } else if (e.target.matches("td")) {
        if (e.target.innerText === "Zurück") {
          if (FocusElement.parentElement.style.length < 2) {
            FocusElement.parentElement.removeAttribute("style");
          } else {
            FocusElement.parentElement.style.opacity = "";
          }
        }
      }
    });
}
//Overwrite Finish
function overriteFinish() {
  console.log("!!!---overriteFinish---!!!");
  let button = document.createElement("button");
  button.innerText = "Finish";
  button.id = "overriteFinishButton";
  controller.appendChild(button);
  button.addEventListener("click", (e) => {
    controller.removeChild(document.getElementById("ElementSeletction"));
    controller.removeChild(document.getElementById("ElementOption"));
    controller.removeChild(document.getElementById("overriteFinishButton"));
    controller.removeChild(document.getElementById("attributeBar"));
    controller.removeChild(document.getElementById("overwritePointer"));
    controller.removeChild(document.getElementById("overwritePfeile"));
    FocusElement = seekFocus();
    if (FocusElement !== undefined) {
      FocusElement.classList.remove("Focus");
    }
    reviseSend();
  });
}

// Overwritepointer
function overwritePointer() {
  console.log("!!!---overwritePointer Aktiv---!!!");
  let overwritebutton = document.createElement("button");
  overwritebutton.id = "overwritePointer";
  overwritebutton.innerText = "Point";
  controller.appendChild(overwritebutton);
  overwritebutton.addEventListener("click", function usedPointer() {
    console.log("!!!---overwritePointer click---!!!");
    main.addEventListener(
      "click",
      (e) => {
        console.log("!!!---overwritePointer click Auswahl---!!!");
        windowsItemSelection(e.target);
      },
      { once: true }
    );
  });
}

//Overwrite ElementOptions
function ElementOption() {
  console.log("!!!---ElementOption---!!!");
  overwriteElemente = {
    Write: ["HTML", "NewElement", "CopyElement", "PasteElement", "delete"],
    ["Einzelne"]: ["li", "td", "th", "tr", "a", "p"],
  };
  readyMadeOptions = {
    BoxSystem: ["article", "section", "div"],
    Auflistung: ["table", "ul", "ol"],
    ["vorgefertigt"]: ["Methoden", "Tabellenzeile", "Tabellenspalte"],
  };
  let div = document.createElement("div");
  div.id = "ElementOption";
  function optionTable(tableContent, headlines) {
    let table = document.createElement("table");
    let caption = document.createElement("caption");
    caption.innerText = headlines;
    table.appendChild(caption);
    Object.keys(tableContent).forEach((auswahl) => {
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      th.innerText = auswahl;
      tr.appendChild(th);
      table.appendChild(tr);
      tableContent[auswahl].forEach((element) => {
        let tr = document.createElement("tr");
        tr.style.display = "none";
        let td = document.createElement("td");
        td.innerText = element;
        tr.appendChild(td);
        table.appendChild(tr);
      });
    });
    div.appendChild(table);
  }
  optionTable(overwriteElemente, "overwriteElemente");
  optionTable(readyMadeOptions, "readyMadeOptions");
  controller.appendChild(div);
  ElementOptionFunc();
}
function ElementOptionFunc() {
  console.log("!!!---ElementOptionFunc---!!!");
  document.getElementById("ElementOption").addEventListener("click", (e) => {
    if (e.target.matches("td")) {
      console.log("!!!---ElementOptionFunc click---!!!");
      switch (e.target.innerText) {
        case "HTML":
          overwriteHTML();
          break;
        case "NewElement":
          NewElement();
          break;
        case "CopyElement":
          copyElement();
          break;
        case "PasteElement":
          pasteElement();
          break;
        case "delete":
          overwriteDelete();
          break;
        case "article":
          overwriteArticle();
          break;
        case "section":
          overwriteSection();
          break;
        case "div":
          overwriteDIV();
          break;
        case "table":
          ElementOptionTableNumber();
          break;
        case "ul":
          ElementOptionULNumber();
          break;
        case "ol":
          ElementOptionOLNumber();
          break;
        case "li":
          ElementOptionLINumber();
          break;
        case "td":
          ElementOptionTDNumber();
          break;
        case "th":
          ElementOptionTHNumber();
          break;
        case "tr":
          ElementOptionTR();
          break;
        case "a":
          ElementOptionA();
          break;
        case "p":
          ElementOptionP();
          break;
        case "Methoden":
          ElementOptionMethods();
          break;
        case "Tabellenzeile":
          ElementOptionTablesRow();
          break;
        case "Tabellenspalte":
          ElementOptionTablesColumn();
          break;
      }
    }
    if (e.target.matches("th")) {
      console.log("!!!---ElementOption tabelle---!!!");
      console.log(e.target);
      let nextElementOption =
        e.target.parentElement.nextElementSibling.firstChild;
      console.log(nextElementOption.tagName);
      while (nextElementOption.tagName === "TD") {
        console.log(nextElementOption.tagName);
        if (nextElementOption.parentElement.style.display === "none") {
          nextElementOption.parentElement.style.display = "";
          if (nextElementOption.parentElement.style.length === 0) {
            nextElementOption.parentElement.removeAttribute("style");
          }
        } else {
          nextElementOption.parentElement.style.display = "none";
        }
        if (nextElementOption.parentElement.nextElementSibling !== null) {
          nextElementOption =
            nextElementOption.parentElement.nextElementSibling.firstChild;
        } else {
          break;
        }
      }
    }
    if (e.target.matches("caption")) {
      console.log("!!!---ElementOption caption---!!!");
      let headlines = e.target.parentElement.getElementsByTagName("th");
      let closeOption = 0;
      let openOption = 0;
      for (let i = 0; i < headlines.length; i++) {
        if (
          headlines[i].parentElement.nextElementSibling.style.display === "none"
        ) {
          closeOption += 1;
        } else {
          openOption += 1;
        }
      }
      console.log("closeOption " + closeOption);
      console.log("openOption " + openOption);
      let options = e.target.parentElement.getElementsByTagName("td");
      if (closeOption > openOption) {
        for (let i = 0; i < options.length; i++) {
          options[i].parentElement.removeAttribute("style");
        }
      } else {
        for (let i = 0; i < options.length; i++) {
          options[i].parentElement.style.display = "none";
        }
      }
    }
  });
}

// overwrite HTML
function overwriteHTML() {
  console.log("!!!---overwriteHTML---!!!");
  let div = NewInput(
    "HTMLInput",
    FocusElement.innerHTML,
    "writeCancel(1)",
    "writeFinish(this)"
  );
  FocusElement.replaceWith(div);
  document.getElementById("textInput").focus();
}

// write buttons
function writeCancel(exception) {
  console.log("!!!---writeCancel---!!!");
  document.getElementById("HTMLInput").replaceWith(FocusElement);
  if (exception !== undefined && exception === 1) {
    if (typeof jumpTo !== "undefined") {
      delete jumpTo;
    }
  }
}
function writeFinish(button) {
  console.log("!!!---writeFinish---!!!");
  console.log(FocusElement);
  FocusElement.innerHTML = button.parentElement.querySelector("textarea").value;
  document.getElementById("HTMLInput").replaceWith(FocusElement);
  if (typeof jumpTo !== "undefined" && jumpTo.length > 0) {
    windowsItemSelection(jumpTo[0][0]);
    if (jumpTo.shift()[1]) {
      overwriteHTML();
    }
  } else {
    windowsItemSelection(FocusElement);
  }
}

// NewElement
function NewElement() {
  console.log("!!!---NewElement---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  let div = NewInput(
    "NewElementDiv",
    "",
    "overwriteDelete(this)",
    "writeNewElement(this)"
  );
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(div);
    document.getElementById("HTMLInput").click();
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      div
    );
  }
  document.getElementById("textInput").focus();
}
function writeNewElement(button) {
  console.log("!!!---writeNewElement---!!!");
  let textContent = button.parentElement.querySelector("textarea").value;
  let textElement = document.createElement(textContent);
  button.parentElement.replaceWith(textElement);
  windowsItemSelection(textElement);
}

// copyElement
function copyElement() {
  console.log("!!!---copyElement---!!!");
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    text = FocusElement.outerHTML;
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    text = FocusElement.children[Focus2Number].outerHTML;
  }
  //Copy
  let copyText = document.createElement("textarea");
  copyText.value = text;
  document.body.appendChild(copyText);
  let inp = copyText;
  inp.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
}
// pasteElement
function pasteElement() {
  console.log("!!!---pasteElement---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  let div = NewInput(
    "pasteElementDiv",
    "",
    "overwriteDelete(this)",
    "pushElement(this)"
  );
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(div);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      div
    );
  }
  document.getElementById("textInput").focus();
}
function pushElement(button) {
  console.log("!!!---pushElement---!!!");
  let textContent = button.parentElement.querySelector("textarea").value;
  console.log(textContent);
  let range = document.createRange();
  let textElement = range.createContextualFragment(textContent);
  console.log(textElement);
  button.parentElement.replaceWith(textElement);
  console.log(FocusElement);
  windowsItemSelection(FocusElement);
  /*
  <tr class="Focus" style="">
                <td class="" style="">b</td>
                <td style="">Fett</td>
                <td style=""></td>
              </tr>
              <tr>
                <td>b</td>
                <td>Fett</td>
                <td></td>
              </tr>
              */
}

// delete
function overwriteDelete(button) {
  console.log("!!!---overwriteDelete---!!!");
  console.log(FocusElement);
  console.log(button);
  let GoBack = FocusElement.parentElement;
  if (button === undefined) {
    if (
      document
        .getElementById("ElementSeletction")
        .getElementsByClassName("Focus2")[0] === undefined
    ) {
      if (FocusElement.parentElement.tagName !== "BODY") {
        FocusElement.parentElement.removeChild(FocusElement);
        windowsItemSelection(GoBack);
      }
    } else {
      Focus2Number = Array.prototype.slice
        .call(
          document
            .getElementById("ElementSeletction")
            .getElementsByClassName("Focus2")[0].parentElement.children
        )
        .indexOf(
          document
            .getElementById("ElementSeletction")
            .getElementsByClassName("Focus2")[0]
        );
      FocusElement.removeChild(FocusElement.children[Focus2Number]);
      windowsItemSelection(FocusElement);
    }
  } else {
    button.parentElement.parentElement.removeChild(button.parentElement);
    windowsItemSelection(FocusElement);
  }
}

// Vorgefertigte Elemente
// BoxSystem
function overwriteArticle() {
  console.log("!!!---overwriteArticle---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  jumpTo = [];
  let article = document.createElement("article");
  let h2 = document.createElement("h2");
  jumpTo.push([h2, 1]);
  let div = document.createElement("div");
  article.appendChild(h2);
  jumpTo.push([div, 0]);
  article.appendChild(div);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(article);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      article
    );
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}
function overwriteSection() {
  console.log("!!!---overwriteSection---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  jumpTo = [];
  let section = document.createElement("section");
  let h3 = document.createElement("h3");
  jumpTo.push([h3, 1]);
  let div = document.createElement("div");
  jumpTo.push([div, 0]);
  section.appendChild(h3);
  section.appendChild(div);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(section);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      section
    );
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}
function overwriteDIV() {
  console.log("!!!---overwriteDIV---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  jumpTo = [];
  let h4 = document.createElement("h4");
  let div = document.createElement("div");
  jumpTo.push([h4, 1]);
  jumpTo.push([div, 0]);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(h4);
    FocusElement.appendChild(div);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      h4
    );
    FocusElement.children[Focus2Number + 1].insertAdjacentElement(
      "beforebegin",
      div
    );
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}

// Auflistung
// Table
function ElementOptionTableNumber() {
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  // create input field
  if (document.getElementById("objetNumber") !== null) {
    ElementOptionTable(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "objetNumber",
      "",
      "overwriteDelete(this)",
      "ElementOptionTable(this)"
    );
    controller.appendChild(div);
    document.getElementById("textInput").focus();
  }
}
function ElementOptionTable(button) {
  console.log("!!!---ElementOptionTable2---!!!");
  jumpTo = [];
  let tableLengthNumber = button.parentElement.querySelector("textarea").value;
  if (tableLengthNumber === "") {
    tableLengthNumber = 1;
  }
  document
    .getElementById("objetNumber")
    .parentElement.removeChild(document.getElementById("objetNumber"));
  let newtable = document.createElement("table");
  let caption = document.createElement("caption");
  newtable.appendChild(caption);
  jumpTo.push([caption, 1]);
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  for (let i = 0; i < tableLengthNumber; i++) {
    let th = document.createElement("th");
    tr.appendChild(th);
    jumpTo.push([th, 1]);
  }
  thead.appendChild(tr);
  newtable.appendChild(thead);
  let tbody = document.createElement("tbody");
  tr = document.createElement("tr");
  for (let i = 0; i < tableLengthNumber; i++) {
    let td = document.createElement("td");
    tr.appendChild(td);
    jumpTo.push([td, 1]);
  }
  tbody.appendChild(tr);
  newtable.appendChild(tbody);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(newtable);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      newtable
    );
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}

// UL
function ElementOptionULNumber() {
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  if (document.getElementById("objetNumber") !== null) {
    ElementOptionUL(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "objetNumber",
      "",
      "overwriteDelete(this)",
      "ElementOptionUL(this)"
    );
    controller.appendChild(div);
    document.getElementById("textInput").focus();
  }
}
function ElementOptionUL(button) {
  console.log("!!!---ElementOptionUL---!!!");
  jumpTo = [];
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("objetNumber")
    .parentElement.removeChild(document.getElementById("objetNumber"));
  let ul = document.createElement("ul");
  for (let i = 0; i < ListLengthNumber; i++) {
    let li = document.createElement("li");
    ul.appendChild(li);
    jumpTo.push([li, 1]);
  }
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(ul);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      ul
    );
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}
// OL
function ElementOptionOLNumber() {
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  if (document.getElementById("objetNumber") !== null) {
    ElementOptionOL(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "objetNumber",
      "",
      "overwriteDelete(this)",
      "ElementOptionOL(this)"
    );
    controller.appendChild(div);
    document.getElementById("textInput").focus();
  }
}
function ElementOptionOL(button) {
  console.log("!!!---ElementOptionOL---!!!");
  jumpTo = [];
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("objetNumber")
    .parentElement.removeChild(document.getElementById("objetNumber"));
  let ol = document.createElement("ol");
  for (let i = 0; i < ListLengthNumber; i++) {
    let li = document.createElement("li");
    ol.appendChild(li);
    jumpTo.push([li, 1]);
  }
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(ol);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      ol
    );
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}

// Individual items
// LI
function ElementOptionLINumber() {
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  if (document.getElementById("objetNumber") !== null) {
    ElementOptionLI(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "objetNumber",
      "",
      "overwriteDelete(this)",
      "ElementOptionLI(this)"
    );
    controller.appendChild(div);
    document.getElementById("textInput").focus();
  }
}
function ElementOptionLI(button) {
  console.log("!!!---ElementOptionLI---!!!");
  jumpTo = [];
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("objetNumber")
    .parentElement.removeChild(document.getElementById("objetNumber"));
  for (let i = 0; i < ListLengthNumber; i++) {
    let li = document.createElement("li");
    jumpTo.push([li, 1]);
  }
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    for (let i = 0; i < ListLengthNumber; i++) {
      FocusElement.appendChild(jumpTo[i][0]);
    }
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    console.log(ListLengthNumber);
    console.log(jumpTo[ListLengthNumber - 1][0]);
    for (let i = ListLengthNumber - 1; i >= 0; i--) {
      console.log(
        ListLengthNumber + " - " + i + " = " + (ListLengthNumber - i)
      );
      console.count("runde");
      FocusElement.children[Focus2Number].insertAdjacentElement(
        "beforebegin",
        jumpTo[i][0]
      );
    }
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}

// TD
function ElementOptionTDNumber() {
  if (document.getElementById("HTMTDnput") !== null) {
    writeCancel();
  }
  if (document.getElementById("objetNumber") !== null) {
    ElementOptionTD(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "objetNumber",
      "",
      "overwriteDelete(this)",
      "ElementOptionTD(this)"
    );
    controller.appendChild(div);
    document.getElementById("textInput").focus();
  }
}
function ElementOptionTD(button) {
  console.log("!!!---ElementOptionTD---!!!");
  jumpTo = [];
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("objetNumber")
    .parentElement.removeChild(document.getElementById("objetNumber"));
  for (let i = 0; i < ListLengthNumber; i++) {
    let td = document.createElement("td");
    jumpTo.push([td, 1]);
  }
  console.log(jumpTo);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    for (let i = 0; i < ListLengthNumber; i++) {
      FocusElement.appendChild(jumpTo[i][0]);
    }
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    console.log(ListLengthNumber);
    console.log(jumpTo[ListLengthNumber - 1][0]);
    for (let i = ListLengthNumber - 1; i >= 0; i--) {
      console.log(
        ListLengthNumber + " - " + i + " = " + (ListLengthNumber - i)
      );
      console.count("runde");
      FocusElement.children[Focus2Number].insertAdjacentElement(
        "beforebegin",
        jumpTo[i][0]
      );
    }
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}

// TH
function ElementOptionTHNumber() {
  if (document.getElementById("HTMTHnput") !== null) {
    writeCancel();
  }
  if (document.getElementById("objetNumber") !== null) {
    ElementOptionTH(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "objetNumber",
      "",
      "overwriteDelete(this)",
      "ElementOptionTH(this)"
    );
    controller.appendChild(div);
    document.getElementById("textInput").focus();
  }
}
function ElementOptionTH(button) {
  console.log("!!!---ElementOptionTH---!!!");
  jumpTo = [];
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("objetNumber")
    .parentElement.removeChild(document.getElementById("objetNumber"));
  for (let i = 0; i < ListLengthNumber; i++) {
    let th = document.createElement("th");
    jumpTo.push([th, 1]);
  }
  console.log(jumpTo);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    for (let i = 0; i < ListLengthNumber; i++) {
      FocusElement.appendChild(jumpTo[i][0]);
    }
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    console.log(ListLengthNumber);
    console.log(jumpTo[ListLengthNumber - 1][0]);
    for (let i = ListLengthNumber - 1; i >= 0; i--) {
      console.log(
        ListLengthNumber + " - " + i + " = " + (ListLengthNumber - i)
      );
      console.count("runde");
      FocusElement.children[Focus2Number].insertAdjacentElement(
        "beforebegin",
        jumpTo[i][0]
      );
    }
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}

function ElementOptionTR() {
  console.log("!!!---ElementOptionTR---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  let tr = document.createElement("tr");
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(tr);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      tr
    );
  }
  windowsItemSelection(tr);
}

function ElementOptionA() {
  console.log("!!!---ElementOptionA---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  let a = document.createElement("a");
  a.href = "";
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(a);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement("beforebegin", a);
  }
  windowsItemSelection(a);
  overwriteHTML();
  let attributeButton = document
    .getElementById("attributeBar")
    .getElementsByTagName("td");
  let attributeButtonPosition;
  for (let i = 0; i < attributeButton.length; i++) {
    if (attributeButton[i].innerText === "href") {
      attributeButtonPosition = i;
      break;
    }
  }
  console.log(attributeButton[attributeButtonPosition]);
  attributeButton[attributeButtonPosition].click();
}
function ElementOptionP() {
  console.log("!!!---ElementOptionP---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  let p = document.createElement("p");
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(p);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement("beforebegin", p);
  }
  windowsItemSelection(p);
  overwriteHTML();
}

// prefabricated elements
function ElementOptionMethods() {
  console.log("!!!---ElementOptionTable---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  jumpTo = [];
  subclasses = ["Methoden", "Wirkung", "Syntax", "Beispiel"];
  let newtable = document.createElement("table");
  let caption = document.createElement("caption");
  newtable.appendChild(caption);
  caption.innerText = subclasses[0];
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  for (let i = 0; i < subclasses.length; i++) {
    let th = document.createElement("th");
    th.innerText = subclasses[i];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  newtable.appendChild(thead);
  let tbody = document.createElement("tbody");
  tr = document.createElement("tr");
  for (let i = 0; i < subclasses.length; i++) {
    let td = document.createElement("td");
    tr.appendChild(td);
    jumpTo.push([td, 1]);
  }
  tbody.appendChild(tr);
  newtable.appendChild(tbody);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(newtable);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      newtable
    );
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteHTML();
}
function ElementOptionTablesRow() {
  console.log("!!!---ElementOptionTablesRow---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  let searchedElement = FocusElement;
  let insideTbody;
  let orientationElement;
  while (
    searchedElement.tagName !== "MAIN" &&
    searchedElement.tagName !== "TABLE"
  ) {
    switch (searchedElement.tagName) {
      case "TBODY":
        insideTbody = 1;
        break;
      case "THEAD":
        insideTbody = 0;
        break;
      case "TR":
        orientationElement = searchedElement;
        break;
      default:
        break;
    }
    searchedElement = searchedElement.parentElement;
  }
  if (searchedElement.tagName !== "TABLE") {
  } else {
    if (insideTbody === undefined) {
    } else {
      let selectDiv = document.createElement("div");
      selectDiv.id = "selectDiv";
      let tdButton = document.createElement("button");
      tdButton.innerText = "td";
      tdButton.id = "selectTd";
      selectDiv.appendChild(tdButton);

      let thButton = document.createElement("button");
      thButton.innerText = "th";
      thButton.id = "selectTh";
      selectDiv.appendChild(thButton);
      controller.appendChild(selectDiv);

      document
        .getElementById("selectTd")
        .addEventListener("click", function trFillTd() {
          selectTrContent = 1;
          createTableRow();
          controller.removeChild(document.getElementById("selectDiv"));
        });
      document
        .getElementById("selectTh")
        .addEventListener("click", function trFillTh() {
          selectTrContent = 0;
          createTableRow();
          controller.removeChild(document.getElementById("selectDiv"));
        });
      function createTableRow() {
        let tableRowLength;
        if (insideTbody) {
          tableRowLength =
            searchedElement.querySelector("tbody").children[0].children.length;
        } else {
          tableRowLength =
            searchedElement.querySelector("thead").children[0].children.length;
        }
        let itemSelection;
        if (selectTrContent) {
          itemSelection = "td";
        } else {
          itemSelection = "th";
        }
        jumpTo = [];
        let tr = document.createElement("tr");
        for (let i = 0; i < tableRowLength; i++) {
          let td = document.createElement(itemSelection);
          tr.appendChild(td);
          jumpTo.push([td, 1]);
        }
        if (orientationElement !== undefined) {
          trNumber = Array.prototype.slice
            .call(orientationElement.parentElement.children)
            .indexOf(orientationElement);
          orientationElement.parentElement.children[
            trNumber
          ].insertAdjacentElement("afterend", tr);
        } else {
          if (
            document
              .getElementById("ElementSeletction")
              .getElementsByClassName("Focus2")[0] === undefined
          ) {
            FocusElement.appendChild(tr);
          } else {
            Focus2Number = Array.prototype.slice
              .call(
                document
                  .getElementById("ElementSeletction")
                  .getElementsByClassName("Focus2")[0].parentElement.children
              )
              .indexOf(
                document
                  .getElementById("ElementSeletction")
                  .getElementsByClassName("Focus2")[0]
              );
            FocusElement.children[Focus2Number].insertAdjacentElement(
              "beforebegin",
              tr
            );
          }
        }
        windowsItemSelection(jumpTo[0][0]);
        overwriteHTML();
      }
    }
  }
}
function ElementOptionTablesColumn() {
  console.log("!!!---ElementOptionTablesColumn---!!!");
  if (document.getElementById("HTMLInput") !== null) {
    writeCancel();
  }
  let searchedElement = FocusElement;
  let orientationElement;
  while (
    searchedElement.tagName !== "MAIN" &&
    searchedElement.tagName !== "TABLE"
  ) {
    if (searchedElement.tagName === "TD") {
      orientationElement = searchedElement;
    }
    searchedElement = searchedElement.parentElement;
  }
  if (searchedElement.tagName !== "TABLE") {
    console.log("in Keiner Tabelle");
  } else {
    console.log("Tabelle vollständig");
    let selectDiv = document.createElement("div");
    selectDiv.id = "selectDiv";

    let leftButton = document.createElement("button");
    leftButton.id = "selectleft";
    let leftImg = document.createElement("img");
    leftImg.setAttribute("src", standort + "../icons/svg/west_black_24dp.svg");
    leftButton.appendChild(leftImg);
    selectDiv.appendChild(leftButton);

    let rigthButton = document.createElement("button");
    rigthButton.id = "selectrigth";
    let rigthImg = document.createElement("img");
    rigthImg.setAttribute("src", standort + "../icons/svg/east_black_24dp.svg");
    rigthButton.appendChild(rigthImg);
    selectDiv.appendChild(rigthButton);

    controller.appendChild(selectDiv);

    document
      .getElementById("selectleft")
      .addEventListener("click", function trFillTd() {
        selectDirection = 1;
        createTableColumn();
        controller.removeChild(document.getElementById("selectDiv"));
      });
    document
      .getElementById("selectrigth")
      .addEventListener("click", function trFillTh() {
        selectDirection = 0;
        createTableColumn();
        controller.removeChild(document.getElementById("selectDiv"));
      });
    function createTableColumn() {
      orientationtNumber = Array.prototype.slice
        .call(orientationElement.parentElement.children)
        .indexOf(orientationElement);
      let allCells =
        orientationElement.parentElement.parentElement.parentElement.querySelectorAll(
          "tr"
        );
      jumpTo = [];
      for (let i = 0; i < allCells.length; i++) {
        let cell = document.createElement(
          allCells[i].children[0].tagName.toLowerCase()
        );
        jumpTo.push([cell, 1]);
        if (selectDirection) {
          allCells[i].children[orientationtNumber].insertAdjacentElement(
            "beforebegin",
            cell
          );
        } else {
          allCells[i].children[orientationtNumber].insertAdjacentElement(
            "afterend",
            cell
          );
        }
      }
      windowsItemSelection(jumpTo[0][0]);
      overwriteHTML();
    }
  }
}

// Attribute bar
function attributeBar() {
  FocusAttribute = FocusElement.getAttributeNames();
  if (document.getElementById("attributeBar") !== null) {
    document
      .getElementById("attributeBar")
      .parentElement.removeChild(document.getElementById("attributeBar"));
  }
  if (FocusAttribute.length !== 0) {
    let table = document.createElement("table");
    table.id = "attributeBar";
    let tr = document.createElement("tr");
    for (let i = 0; i < FocusAttribute.length; i++) {
      let td = document.createElement("td");
      td.innerText = FocusAttribute[i];
      tr.appendChild(td);
    }
    let td = document.createElement("td");
    td.innerText = "Hinzufügen";
    tr.appendChild(td);
    table.appendChild(tr);
    td = document.createElement("td");
    td.innerText = "Löschen";
    tr.appendChild(td);
    table.appendChild(tr);
    controller.appendChild(table);
    attributeBarFunc();
  }
}
function attributeBarFunc() {
  document
    .getElementById("attributeBar")
    .addEventListener("click", readAttribute);
}
function readAttribute(e) {
  console.log(typeof e);
  console.log(e);
  console.log(typeof e.target);
  console.log(e.target);
  if (e.target.matches("td")) {
    if (e.target.classList.contains("Focus")) {
      attributeCancel();
    } else {
      if (
        e.target.innerText !== "Löschen" &&
        !document
          .getElementById("attributeBar")
          .lastElementChild.lastElementChild.classList.contains("Focus")
      ) {
        console.log("Ist nicht Lösch");
        if (document.getElementById("attributeBox") === null) {
          e.target.classList.add("Focus");
          //New Code
          let content = "";
          if (e.target.innerText !== "Hinzufügen") {
            speziolAttribute = {
              class: FocusElement.className,
              style: FocusElement[e.target.innerText]?.cssText,
            };
            content =
              speziolAttribute[e.target.innerText] ||
              FocusElement[e.target.innerText];
          }
          let newdiv = NewInput(
            "attributeBox",
            content,
            "attributeCancel()",
            "attributeValidate()",
            "attributeInput"
          );
          controller.appendChild(newdiv);
          document.getElementById("attributeInput").focus();
        } else {
          document
            .getElementById("attributeBar")
            .querySelector(".Focus")
            .classList.remove("Focus");
          e.target.classList.add("Focus");
          if (e.target.innerText !== "Hinzufügen") {
            document.getElementById("attributeInput").value =
              FocusElement[e.target.innerText];
          } else {
            document.getElementById("attributeInput").value = "";
          }
        }
      } else {
        console.log("Ist Lösch");
        if (!e.target.classList.contains("Focus")) {
          e.target.classList.add("Focus");
        }
        if (e.target.innerText !== "Löschen") {
          console.log(e.target.innerText);
          document
            .getElementById("attributeBar")
            .querySelector(".Focus")
            .classList.remove("Focus");
          FocusElement.removeAttribute(e.target.innerText);
          attributeBar();
        }
      }
    }
  }
}
function attributeCancel() {
  if (document.getElementById("attributeBox") !== null) {
    document
      .getElementById("attributeBox")
      .parentElement.removeChild(document.getElementById("attributeBox"));
  }
  if (
    document.getElementById("attributeBar").querySelector(".Focus") !== null
  ) {
    document
      .getElementById("attributeBar")
      .querySelector(".Focus")
      .classList.remove("Focus");
  }
}
function attributeValidate() {
  if (
    document.getElementById("attributeBar").querySelector(".Focus")
      .innerText !== "Hinzufügen"
  ) {
    console.log("Verändern");
    if (document.getElementById("attributeInput").value !== "") {
      let wert = document.getElementById("attributeInput").value;
      let attributeName = document
        .getElementById("attributeBar")
        .querySelector(".Focus").innerText;
      console.log(attributeName);
      console.log(wert);
      console.log(FocusElement);
      FocusElement.setAttribute(attributeName, wert);
      attributeCancel();
      document
        .getElementById("attributeBar")
        .parentElement.removeChild(document.getElementById("attributeBar"));
      attributeBar();
    }
  } else {
    console.log("Hinzufügen");
    console.log(document.getElementById("attributeInput"));
    if (document.getElementById("attributeInput").value !== "") {
      console.log("Hinzufügen2");
      let wert = document.getElementById("attributeInput").value;
      console.log(wert);
      console.log(seekFocus());
      seekFocus().setAttribute(wert, "");
      document.getElementById("attributeInput").value = "";
      document
        .getElementById("attributeBar")
        .parentElement.removeChild(document.getElementById("attributeBar"));
      attributeBar();
      document
        .getElementById("attributeBar")
        .firstChild.querySelector("td:nth-last-child(3)")
        .classList.add("Focus");
    }
  }
}

// movement arrows
function overwritePfeile() {
  console.log("!!!---overwritePfeile---!!!");
  let div = document.createElement("div");
  div.id = "overwritePfeile";
  let pfeilTop = document.createElement("button");
  pfeilTop.setAttribute("onclick", "ElementGoLeftUp()");
  let img = document.createElement("img");
  img.setAttribute("src", standort + "../icons/svg/north_black_24dp.svg");
  pfeilTop.appendChild(img);
  div.appendChild(pfeilTop);
  // Bottom
  let pfeilBottom = document.createElement("button");
  pfeilBottom.setAttribute("onclick", "ElementGoRightDown()");
  img = document.createElement("img");
  img.setAttribute("src", standort + "../icons/svg/south_black_24dp.svg");
  pfeilBottom.appendChild(img);
  div.appendChild(pfeilBottom);
  controller.appendChild(div);
}
function ElementGoLeftUp() {
  console.log("!!!---ElementGoLeftUp---!!!");
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    if (seekFocus().parentElement.tagName !== "BODY") {
      FocusElement.insertAdjacentElement(
        "afterend",
        FocusElement.previousElementSibling
      );
    }
    windowsItemSelection(FocusElement);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "afterend",
      FocusElement.children[Focus2Number].previousElementSibling
    );
    windowsItemSelection(FocusElement);
    document
      .getElementById("ElementSeletction")
      .querySelector("ul")
      .children[Focus2Number - 1].classList.add("Focus2");
    document.getElementById("ElementSeletction").querySelector("ul").children[
      Focus2Number - 1
    ].style.backgroundColor = "red";
    let myElement = document
      .getElementById("ElementSeletction")
      .querySelector("ul").children[Focus2Number - 1];
    console.log(Focus2Number);
    console.log(myElement);
    let topPos = myElement.offsetTop;
    document
      .getElementById("ElementSeletction")
      .querySelector("div").scrollTop = topPos;
  }
}
function ElementGoRightDown() {
  console.log("!!!---ElementGoRightDown---!!!");
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement = seekFocus();
    if (FocusElement.parentElement.tagName !== "BODY") {
      FocusElement.insertAdjacentElement(
        "beforebegin",
        FocusElement.nextElementSibling
      );
    }
    windowsItemSelection(FocusElement);
  } else {
    Focus2Number = Array.prototype.slice
      .call(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0].parentElement.children
      )
      .indexOf(
        document
          .getElementById("ElementSeletction")
          .getElementsByClassName("Focus2")[0]
      );
    FocusElement.children[Focus2Number].insertAdjacentElement(
      "beforebegin",
      FocusElement.children[Focus2Number].nextElementSibling
    );
    windowsItemSelection(FocusElement);
    document
      .getElementById("ElementSeletction")
      .querySelector("ul")
      .children[Focus2Number + 1].classList.add("Focus2");
    document.getElementById("ElementSeletction").querySelector("ul").children[
      Focus2Number + 1
    ].style.backgroundColor = "red";
    let myElement = document
      .getElementById("ElementSeletction")
      .querySelector("ul").children[Focus2Number + 1];
    let topPos = myElement.offsetTop;
    document
      .getElementById("ElementSeletction")
      .querySelector("div").scrollTop = topPos;
  }
}

// Alt
function writeallPfeile() {
  console.log("!!!---writeallPfeile---!!!");
  if (e.parentNode?.tagName === "UL" || e.parentNode?.tagName === "OL") {
    e.setAttribute("style", "position: relative");
    // Top
    let pfeilTop = document.createElement("button");
    pfeilTop.setAttribute(
      "style",
      "position: absolute; left: 40%; top: -50px;"
    );
    pfeilTop.setAttribute("onclick", "ElementGoLeftup(this)");
    let img = document.createElement("img");
    img.setAttribute("src", standort + "../icons/svg/north_black_24dp.svg");
    pfeilTop.appendChild(img);
    e.appendChild(pfeilTop);
    // Bottom
    let pfeilBottom = document.createElement("button");
    pfeilBottom.setAttribute(
      "style",
      "position: absolute; left: 40%; bottom: -50px;"
    );
    pfeilBottom.setAttribute("onclick", "ElementGoRightDown(this)");
    img = document.createElement("img");
    img.setAttribute("src", standort + "../icons/svg/south_black_24dp.svg");
    pfeilBottom.appendChild(img);
    e.appendChild(pfeilBottom);
  }
  if (e.parentNode?.tagName === "TR" || e.parentNode?.tagName === "TH") {
    e.setAttribute("style", "position: relative");
    // Left
    let pfeilLeft = document.createElement("button");
    pfeilLeft.setAttribute("style", "position: absolute; left: -100px;");
    pfeilLeft.setAttribute("onclick", "ElementGoLeftup(this)");
    let img = document.createElement("img");
    img.setAttribute("src", standort + "../icons/svg/west_black_24dp.svg");
    pfeilLeft.appendChild(img);
    e.appendChild(pfeilLeft);
    // Right
    let pfeilRight = document.createElement("button");
    pfeilRight.setAttribute("style", "position: absolute; right: -100px;");
    pfeilRight.setAttribute("onclick", "ElementGoRightDown(this)");
    img = document.createElement("img");
    img.setAttribute("src", standort + "../icons/svg/east_black_24dp.svg");
    pfeilRight.appendChild(img);
    e.appendChild(pfeilRight);
    // Top
    let pfeilTop = document.createElement("button");
    pfeilTop.setAttribute(
      "style",
      "position: absolute; left: 40%; top: -50px;"
    );
    pfeilTop.setAttribute("onclick", "ElementparentGoUp(this)");
    img = document.createElement("img");
    img.setAttribute("src", standort + "../icons/svg/north_black_24dp.svg");
    pfeilTop.appendChild(img);
    e.appendChild(pfeilTop);
    // Bottom
    let pfeilBottom = document.createElement("button");
    pfeilBottom.setAttribute(
      "style",
      "position: absolute; left: 40%; bottom: -50px;"
    );
    pfeilBottom.setAttribute("onclick", "ElementparentGoDown(this)");
    img = document.createElement("img");
    img.setAttribute("src", standort + "../icons/svg/south_black_24dp.svg");
    pfeilBottom.appendChild(img);
    e.appendChild(pfeilBottom);
  }
}
function ElementparentGoUp(e) {
  e.parentNode.parentNode.insertAdjacentElement(
    "afterend",
    e.parentNode.parentNode.previousElementSibling
  );
}
function ElementparentGoDown(e) {
  e.parentNode.parentNode.insertAdjacentElement(
    "beforebegin",
    e.parentNode.parentNode.nextElementSibling
  );
}

// revise Send

function reviseSend() {
  console.log("!!!---reviseSend---!!!");
  console.log("!!!!123Test !!!!!!!!!");
  console.log(window.location.href);
  console.log(window.location.hostname);
  console.log(window.location.pathname);
  console.log(window.location.protocol);
  console.log(
    window.location.protocol + "//" + window.location.hostname + ":8005"
  );
  url = window.location.protocol + "//" + window.location.hostname + ":8005";
  main2 = main.cloneNode(true);
  ExtraButton = Array.prototype.slice.call(
    main2.getElementsByClassName("allURLOpen")
  );
  for (let i = 0; i < ExtraButton.length; i++) {
    ExtraButton[i].parentElement.removeChild(ExtraButton[i]);
  }
  deleteStyle = main2.querySelectorAll("[style]");
  for (let i = 0; i < deleteStyle.length; i++) {
    deleteStyle[i].removeAttribute("style");
  }
  let request = new Request(url, {
    method: "post",
    credentials: "omit",
    headers: {
      "accept-encoding": "gzip, deflate",
      "Content-Type": "multipart/form-data",
      "Content-Type": "text/plain",
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": "application/json",
    },
    body: JSON.stringify([window.location.pathname, main2.innerHTML]),
  });
  // console.log(JSON.stringify([window.location.pathname, main2.innerHTML]))
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      console.log("Server sagt:", data[0]);
      console.log("Server sagt:", data[1]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function

function filter(ausdruck) {
  ausgabe = ausdruck;
  while (
    ausgabe.includes("%C3%A4") ||
    ausgabe.includes("%C3%B6") ||
    ausgabe.includes("%C3%BC") ||
    ausgabe.includes("%23") ||
    ausgabe.includes("%20") ||
    ausgabe.includes("#Focus")
  ) {
    ausgabe = ausgabe
      .replace("%C3%A4", "ä")
      .replace("%C3%B6", "ö")
      .replace("%C3%BC", "ü")
      .replace("%23", "#")
      .replace("%20", " ")
      .replace("#Focus", "");
  }
  return ausgabe;
}

function AllKeys(key, pop, number) {
  let keylength;
  if (number === undefined) {
    keylength = Object.keys(key).length;
  } else {
    keylength = number;
  }
  for (let i = 0; i < keylength; i++) {
    console.log(i, Object.keys(key)[i]);
    if (pop) {
      console.log(key[Object.keys(key)[i]]);
    }
  }
}

function seekFocus() {
  console.log("!!!---seekFocus---!!!");
  if (main.classList.contains("Focus")) {
    let findFocus = main;
    return findFocus;
  } else {
    let findFocus = main.getElementsByClassName("Focus")[0];
    console.log(findFocus);
    if (findFocus === undefined) {
      findFocus = document.getElementsByClassName("Focus")[0];
      return findFocus;
    } else {
      return findFocus;
    }
  }
}

//New construction site
function NewInput(divId, content, func1, func2, inputID) {
  console.log("!!!---NewInput---!!!");
  let div = document.createElement("div");
  div.id = divId;
  // cancelButton
  let cancelButton = document.createElement("button");
  cancelButton.setAttribute("onclick", func1);
  cancelButton.id = "canselButton";
  let img = document.createElement("img");
  img.setAttribute("src", standort + "../icons/svg/cancel_black_24dp.svg");
  cancelButton.appendChild(img);
  // validateButton
  let validateButton = document.createElement("button");
  validateButton.setAttribute("onclick", func2);
  validateButton.id = "validateButton";
  img = document.createElement("img");
  img.setAttribute("src", standort + "../icons/svg/check_black_24dp.svg");
  validateButton.appendChild(img);
  //writeTextarea
  let textarea = document.createElement("textarea");
  textarea.setAttribute(
    "onkeydown",
    "useKeyButton(this, '" + func2.slice(0, func2.length - 6) + "')"
  );
  if (inputID === undefined) {
    textarea.id = "textInput";
  } else {
    textarea.id = inputID;
  }
  (textarea.value = content),
    //Hinzufügen
    div.appendChild(cancelButton);
  div.appendChild(textarea);
  div.appendChild(validateButton);
  return div;
}

function useKeyButton(keyButton, func2) {
  console.log(keyButton);
  console.log(func2);
  document.onkeydown = function (e) {
    console.log(e);
    console.log(e.code);
    if (e.code === "Enter") {
      e.preventDefault();
      console.log("Dückt Enter");
      window[func2](keyButton);
    }
  };
}

/*
document.onkeydown = function (e) {
  console.log(e)
  console.log(e.code)
  if (e.code == 'space') {
    // Leertaste gedrückt
    console.log('Dückt Leertaste')
  }

  if (e.code == 'ArrowUp') {
    // Nach oben gedrückt
    console.log('Dückt nach oben')
  }

  if (e.code == 'ArrowDown') {
    // Nach unten gedrückt
    console.log('Dückt nach unten')
  }
}
document.onkeyup = function (e) {
  console.log(e)
  if (e.code == 'space') {
    // Leertaste losgelassen
    console.log('Loslasen Leertaste')
  }

  if (e.code == 'ArrowUp') {
    // Nach oben losgelassen
    console.log('Loslasen nach oben')
  }

  if (e.code == 'ArrowDown') {
    // Nach unten losgelassen
    console.log('Loslasen nach unten')
  }
}
*/
function newSpalt(body) {
  for (let i = 0; i < body.children.length; i++) {
    let td = document.createElement("td");
    body.children[i].appendChild(td);
  }
}

function gibAus() {
  let text = "Hallo";
  console.log("text: " + text);
  let userName = "Rudolf";
  console.log("userName: " + userName);
  let zahl1 = 5;
  let zahl2 = 2;
  let summe = zahl1 + zahl2;
  console.log(zahl1 + " + " + zahl2 + " + " + summe);
  let single = true;
  console.log("single: " + single);
}
