import {
  selectionBar,
  childIndex,
} from ".././testModule.js";
// Variablen
window.selectionBar = selectionBar;
window.childIndex = childIndex;
let navlist
// code
let request = new XMLHttpRequest();
request.open("GET", "../verzeichnis.json");
request.responseType = "text";
request.send();
request.onload = function () {
  navlist = JSON.parse(request.response);
  fillTable(navlist);
};
function fillTable(navlist) {
  window.table = document.getElementById("Verzeichnis");
  window.tbody = table.querySelector("tbody")
  window.nummer = 0;
  window.spalten = 0;
  window.columnLength = 0
  window.allClass = []
  // Tabelle Füllen
  buildFolderStructure(tbody, navlist, spalten)
  klapBox();
}


function rowsNumber(nummer) {
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  td.innerHTML = nummer;
  tr.appendChild(td);
  return tr
}
function newRows(row, spalte, name, url, unterwahl = 0) {
  // Zahl
  let tr = rowsNumber(row)
  // An Leere td
  for (let z = 0; z < spalte - 1; z++) {
    let td = document.createElement("td");
    tr.appendChild(td);
  }
  //Unterwahl
  let td = document.createElement("td");
  let a = document.createElement("a");
  a.innerHTML = name;
  a.setAttribute("href", "../" + url);
  if (!unterwahl) {
    allClass.splice(spalte - 1);
    allClass.push(filter3(name));
  }
  td.setAttribute("ondblclick", "option(this)");
  if (unterwahl) {
    td.classList.add("unterwahl");
  }
  allClass.forEach(e => {
    td.classList.add(e);
  });
  if (unterwahl) {
    td.classList.add(filter2(name));
  }
  td.appendChild(a);
  tr.appendChild(td);
  // An Leere td
  for (let z = 0; z < columnLength - spalte; z++) {
    let td = document.createElement("td");
    tr.appendChild(td);
  }
  return tr
}
function buildFolderStructure(tbody, navlist, spalten) {
  // 1 Reihe
  var key = Object.keys(navlist);
  for (let i of key) {
    // create row
    nummer += 1;
    let newspalten = spalten + 1
    if (columnLength < newspalten) {
      columnLength = newspalten
      fillTbody()
    }
    let tr = newRows(nummer, newspalten, navlist[i][0], navlist[i][1])
    tbody.appendChild(tr);
    if (navlist[i][3].length !== 0) {
      for (let z = 0; z < navlist[i][3].length; z++) {
        // create row
        if (columnLength < newspalten + 1) {
          columnLength = newspalten + 1
          fillTbody()
        }
        nummer += 1;
        let tr = newRows(nummer, newspalten + 1, navlist[i][3][z][0], navlist[i][3][z][1], 1)
        tbody.appendChild(tr);
      }
    }
    if (
      Object.keys(navlist[i][2]).length !== 0 &&
      Object.keys(navlist[i][2]).length !== undefined
    ) {
      buildFolderStructure(tbody, navlist[i][2], newspalten)
    }
  }
}
function fillTbody() {
  let th = document.createElement("th");
  th.innerText = table.querySelector("thead").firstElementChild.children.length
  table.querySelector("thead").firstElementChild.appendChild(th);
  for (let i = 0; i < tbody.children.length; i++) {
    let td = document.createElement("td");
    tbody.children[i].appendChild(td);
  };
}
function cutTbody() {
  let emptyTDs
  do {
    emptyTDs = true
    for (let i = 0; i < tbody.children.length; i++) {
      if (tbody.children[i].querySelectorAll("td")[tbody.children[i].querySelectorAll("td").length - 1].innerHTML !== "") {
        emptyTDs = false
        break
      }
    }
    if (emptyTDs) {
      table.querySelector("thead").firstElementChild.lastElementChild.remove()
      for (let i = 0; i < tbody.children.length; i++) {
        tbody.children[i].querySelectorAll("td")[tbody.children[i].querySelectorAll("td").length - 1].remove()
      };
    }
  } while (emptyTDs)
}

function klapBox() {
  console.log("!!!---klapBox---!!!");
  // Über und Unterkatergorie
  let allTr = tbody.querySelectorAll("tr");
  for (let i = 0; i < allTr.length; i++) {
    //Nummerierung
    allTr[i].firstChild.innerHTML = i + 1;
    if (allTr[i].querySelector("td[class]") !== null) {
      if (
        tbody.getElementsByClassName(
          allTr[i].querySelector("td[class]").classList[
          allTr[i].querySelector("td[class]").classList.length - 1
          ]
        ).length !== 1
      ) {
        let nummerTd = allTr[i].firstChild;
        // Klappzeichen
        let img = document.createElement("img");
        img.setAttribute("src", "../../icons/svg/expand_more_black_24dp.svg");
        nummerTd.appendChild(img);
        nummerTd.setAttribute(
          "onclick",
          "klap('" + allTr[i].querySelector("td[class]").innerText + "')"
        );
      }
    }
  }
}
window.klap = klap
function klap(klasse) {
  katego = document.getElementsByClassName(klasse);
  if (katego[1].parentElement.hasAttribute("style") === false) {
    for (let i = 1; i < katego.length; i++) {
      Tr = katego[i].parentElement;
      katego[0].parentElement.firstChild
        .querySelector("img")
        .setAttribute("src", "../../icons/svg/chevron_right_black_24dp.svg");
      Tr.setAttribute("style", "display:none");
      if (katego[i].parentElement.firstChild.querySelector("img") !== null) {
        katego[i].parentElement.firstChild
          .querySelector("img")
          .setAttribute("src", "../../icons/svg/chevron_right_black_24dp.svg");
        Tr.setAttribute("style", "display:none");
      }
    }
  } else {
    for (let i = 1; i < katego.length; i++) {
      Tr = katego[i].parentElement;
      katego[0].parentElement.firstChild
        .querySelector("img")
        .setAttribute("src", "../../icons/svg/expand_more_black_24dp.svg");
      Tr.removeAttribute("style", "display:none");
      if (katego[i].parentElement.firstChild.querySelector("img") !== null) {
        katego[i].parentElement.firstChild
          .querySelector("img")
          .setAttribute("src", "../../icons/svg/expand_more_black_24dp.svg");
        Tr.removeAttribute("style", "display:none");
      }
    }
  }
}

let memory = {};
//STEP Öffnet optionen
window.option = option
function option(e) {
  console.log("!!!---option---!!!")
  let klasse = e.classList[e.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(e.parentElement)
  let art
  if (e.classList[0] === "unterwahl") {
    art = "unterwahl"
  }
  //Werte
  window.AktuelTd = tbody.getElementsByTagName("tr")[position].querySelector('td[class*="' + klasse + '"]');
  window.AktuelTr = AktuelTd.parentElement;
  // Start Funktionen
  AktuelTd.removeAttribute("ondblclick");
  AktuelTd.setAttribute("style", "position: relative");
  AktuelTr.setAttribute("style", "position: relative");
  //Function
  //Eingabefeld!!!
  eingabe(AktuelTd, klasse, art);
  // Buttons
  einAusbutton(AktuelTd, klasse, position);
  zeilenOption(AktuelTd, klasse, position);
  if (!AktuelTd.classList.contains("unterwahl")) {
    //Kategorie
    // unterwahlButton
    unterwahlButton(AktuelTd, klasse, position);
    //Richtungspfeile
    allPfeile(AktuelTd, klasse, position);
  } else {
    // Unterwahl
    ausUnterwahl(AktuelTd, klasse, position);
  }
}
function eingabe(AktuelTd, klasse, art) {
  console.log("!!!---eingabe---!!!");
  //Eingabefeld Erzeugen
  //Name
  let textarea = document.createElement("textarea");
  textarea.setAttribute(
    "style",
    "resize: none; box-sizing: border-box; margin: 0px; height: 100%; width: 100%;"
  );
  textarea.classList.add("textarea-" + klasse);
  //href
  //Test Einfügen
  if (AktuelTd.querySelectorAll("a").length) {
    textarea.innerText = AktuelTd.innerText;
    memory[AktuelTd.querySelector("a").innerText] = [AktuelTd.querySelector("a").innerText, filterRelativURL(AktuelTd.querySelector("a").href), art];
  }
  AktuelTd.style.padding = "0px";
  AktuelTd.innerText = "";
  //einfügen
  AktuelTd.appendChild(textarea);
}
function einAusbutton(AktuelTd, klasse, position) {
  console.log("!!!---einAusbutton---!!!");
  // Abbruchbutton
  let abbruchButton = document.createElement("button");
  abbruchButton.setAttribute(
    "style",
    "background-color: red;; position: absolute; left: -50px; border-radius: 10%;"
  );
  abbruchButton.setAttribute(
    "onclick",
    "optionAbbrechen(this)"
  );
  abbruchButton.classList.add("abbrechen-" + klasse);
  let img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/cancel_black_24dp.svg");
  abbruchButton.appendChild(img);
  AktuelTd.appendChild(abbruchButton);
  // Fertigbutton
  let fertigButton = document.createElement("button");
  fertigButton.setAttribute(
    "style",
    "background-color: green; position: absolute; right: -50px; border-radius: 10%;"
  );
  fertigButton.setAttribute(
    "onclick",
    "optionEnde(this)"
  );
  fertigButton.classList.add("fertig-" + klasse);
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/check_black_24dp.svg");
  fertigButton.appendChild(img);
  AktuelTd.appendChild(fertigButton);
}
//Kategorien
function unterwahlButton(AktuelTd, klasse, position) {
  console.log("!!!---unterwahlButton---!!!");
  // unterwahlButton
  let UnterwahlButton = document.createElement("button");
  UnterwahlButton.setAttribute(
    "style",
    "background-color: blue; position: absolute; top: -40px; right: -50px;"
  );
  UnterwahlButton.classList.add("unterwahl-" + klasse);
  UnterwahlButton.setAttribute(
    "onclick",
    "zurUnterwahl(this)"
  );
  let img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/check_black_24dp.svg");
  UnterwahlButton.appendChild(img);
  AktuelTd.appendChild(UnterwahlButton);
}
function allPfeile(AktuelTd, klasse, position) {
  console.log("!!!---allPfeile---!!!");
  // Left
  let pfeilLeft = document.createElement("button");
  pfeilLeft.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: -100px;"
  );
  pfeilLeft.classList.add("pfeilLeft-" + klasse);
  pfeilLeft.setAttribute(
    "onclick",
    "goLeft(this)"
  );
  let img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/west_black_24dp.svg");
  pfeilLeft.appendChild(img);
  AktuelTd.appendChild(pfeilLeft);
  if (AktuelTd.previousElementSibling.innerHTML !== "") {
    pfeilLeft.disabled = true;
  }
  // Right
  let pfeilRight = document.createElement("button");
  pfeilRight.setAttribute(
    "style",
    "background-color: #404649; position: absolute; right: -100px;"
  );
  pfeilRight.classList.add("pfeilRight-" + klasse);
  pfeilRight.setAttribute(
    "onclick",
    "goRight(this)"
  );
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/east_black_24dp.svg");
  pfeilRight.appendChild(img);
  AktuelTd.appendChild(pfeilRight);
  // Top
  let pfeilTop = document.createElement("button");
  pfeilTop.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: 40%; top: -50px;"
  );
  pfeilTop.classList.add("pfeilTop-" + klasse);
  pfeilTop.setAttribute("onclick", "goTop(this)");
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/north_black_24dp.svg");
  pfeilTop.appendChild(img);
  if (
    AktuelTd.parentElement.previousElementSibling === null
  ) {
    pfeilTop.disabled = true;
  }
  AktuelTd.appendChild(pfeilTop);
  // Bottom
  let pfeilBottom = document.createElement("button");
  pfeilBottom.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: 40%; bottom: -50px;"
  );
  pfeilBottom.classList.add("pfeilBottom-" + klasse);
  pfeilBottom.setAttribute(
    "onclick",
    "goBottom(this)"
  );
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/south_black_24dp.svg");
  pfeilBottom.appendChild(img);
  AktuelTd.appendChild(pfeilBottom);
  if (AktuelTd.parentElement.nextElementSibling === null) {
    pfeilBottom.disabled = true;
  }
}
//Unterwahl
function ausUnterwahl(AktuelTd, klasse, position) {
  console.log("!!!---ausUnterwahl---!!!");
  // Left
  let pfeilLeft = document.createElement("button");
  pfeilLeft.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: -100px;"
  );
  pfeilLeft.setAttribute(
    "onclick",
    "unterEnd(this)"
  );
  pfeilLeft.classList.add("pfeilLeft-" + klasse);
  let img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/west_black_24dp.svg");
  pfeilLeft.appendChild(img);
  AktuelTd.appendChild(pfeilLeft);
}
// Zeilen option//Zeilen
function zeilenOption(AktuelTd, klasse, position) {
  console.log("!!!---zeilenOption---!!!");
  let div = document.createElement("div");
  div.classList.add("hinzufügButton");
  let div2 = document.createElement("div");
  div2.classList.add("löschButton");
  let buttonOben = document.createElement("button");
  buttonOben.setAttribute(
    "onclick",
    "newZeileOben(this)"
  );
  buttonOben.innerText = "Oben";
  div.appendChild(buttonOben);
  let buttonUnten = document.createElement("button");
  buttonUnten.setAttribute(
    "onclick",
    "newZeileUnten(this)"
  );
  buttonUnten.innerText = "Unten";
  div.appendChild(buttonUnten);
  let zeileLöschen = document.createElement("button");
  zeileLöschen.setAttribute(
    "onclick",
    "löschZeile(this)"
  );
  zeileLöschen.innerText = "Löschen";
  div2.appendChild(zeileLöschen);
  AktuelTd.parentElement.appendChild(div2);
  AktuelTd.parentElement.appendChild(div);
  // AktuelTd.parentElement.setAttribute("id", "actuelRow");
  // AktuelTd.setAttribute("id", "actuelCelle");
}
function zeilenOptionEnd() {
  let div = tbody.querySelectorAll("div");
  for (let i = 0; i < div.length; i++) {
    div[i].parentElement.removeChild(div[i]);
  }
}
//!STEP
//STEP Unterwahl Function

window.unterEnd = unterEnd
function unterEnd(buttonElement) {
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---unterEnd----!!!");
  // Werte
  let AktuelTdClass = klasse.replace("pfeilLeft-", "");
  AktuelTd = tbody
    .getElementsByTagName("tr")
  [position].querySelector('td[class*="' + AktuelTdClass + '"]');
  // Attribute ändern
  AktuelTd.classList.remove("unterwahl");
  //Button entfernen
  buttonElement.remove();
  // Buttons hinzufügen
  // Unterwahlbutton
  let UnterwahlButton = document.createElement("button");
  UnterwahlButton.setAttribute(
    "style",
    "background-color: blue; position: absolute; top: -40px; right: -50px;"
  );
  UnterwahlButton.classList.add("unterwahl-" + AktuelTdClass);
  UnterwahlButton.setAttribute(
    "onclick",
    "zurUnterwahl(this)"
  );
  let img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/check_black_24dp.svg");
  UnterwahlButton.appendChild(img);
  AktuelTd.appendChild(UnterwahlButton);
  allPfeile(AktuelTd, AktuelTdClass, position);
}
window.zurUnterwahl = zurUnterwahl
function zurUnterwahl(buttonElement) {
  let klasse = "unterwahl-" + buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---zurUnterwahl---!!!");
  // Werte
  let AktuelTdClass = klasse.replace("unterwahl-", "");
  AktuelTd = tbody
    .getElementsByTagName("tr")
  [position].querySelector('td[class*="' + AktuelTdClass + '"]');
  // Attribute ändern
  let NewClass = "unterwahl";
  for (let i = 0; i < AktuelTd.classList.length; i++) {
    NewClass += " " + AktuelTd.classList[i];
  }
  AktuelTd.setAttribute("class", NewClass);
  // Buttons entfernen
  // Left
  document
    .querySelector('[class="pfeilLeft-' + AktuelTdClass + '"]')
    .parentElement.removeChild(
      document.querySelector('[class="pfeilLeft-' + AktuelTdClass + '"]')
    );
  // Right
  document
    .querySelector('[class="pfeilRight-' + AktuelTdClass + '"]')
    .parentElement.removeChild(
      document.querySelector('[class="pfeilRight-' + AktuelTdClass + '"]')
    );
  // Unterwahlbutton
  document
    .querySelector('[class="unterwahl-' + AktuelTdClass + '"]')
    .parentElement.removeChild(
      document.querySelector('[class="unterwahl-' + AktuelTdClass + '"]')
    );
  // Top
  document
    .querySelector('[class="pfeilTop-' + AktuelTdClass + '"]')
    .parentElement.removeChild(
      document.querySelector('[class="pfeilTop-' + AktuelTdClass + '"]')
    );
  // Bottom
  document
    .querySelector('[class="pfeilBottom-' + AktuelTdClass + '"]')
    .parentElement.removeChild(
      document.querySelector('[class="pfeilBottom-' + AktuelTdClass + '"]')
    );
  ausUnterwahl(AktuelTd, AktuelTdClass, position);
}
//!STEP

window.optionEnde = optionEnde
function optionEnde(buttonElement) {
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  console.log("!!!---optionEnde---!!!");
  let text = filter4(AktuelTd.querySelector('[class="textarea-' + klasse + '"]').value);
  if (text !== "") {
    // close the Link
    let a = document.createElement("a");
    if (klasse !== "neue-zeile") {
      a.href = memory[filter(klasse)][1]
    }
    a.innerText = text;
    AktuelTd.innerHTML = "";
    AktuelTd.appendChild(a);
    // button remove und style entfernen
    zeilenButtonLöschen();
    AktuelTd.removeAttribute("style");
    AktuelTr.removeAttribute("style");
    zeilenOptionEnd();


    //-1Veränderung 
    // 1.File to Folder |reloadFunc= [displaceColumn=true, saveURL=true, unpacking=false]
    // 2.Folder to File |reloadFunc= [displaceColumn=true, saveURL=true, unpacking=true]
    //-2Hinzufügen 
    // 3.File           |reloadFunc= [displaceColumn=true, saveURL=true, unpacking=false]
    // 4.Folder         |reloadFunc= [displaceColumn=true, saveURL=true, unpacking=false]
    let displaceColumn = true
    let saveURL = true
    let unpacking = false
    console.log(memory)
    // console.log(Object.keys(memory))
    // console.log(Object.keys(memory).length !== 0)
    // console.log(memory[klasse][2] === undefined)
    // console.log(AktuelTd.classList.contains("unterwahl"))
    // console.log(Object.keys(memory).length !== 0 && memory[klasse][2] === undefined && AktuelTd.classList.contains("unterwahl"))
    if (Object.keys(memory).length !== 0 && memory[klasse][2] === undefined && AktuelTd.classList.contains("unterwahl")) {
      unpacking = true
    }
    let reloadFunc = [displaceColumn, saveURL, unpacking]

    let headTD = AktuelTd
    let headName = klasse
    let headTRIndex = childIndex(headTD.parentElement)
    let headURLColumn = childIndex(headTD)
    let headElemnet = [headTD, headName, headTRIndex, headURLColumn]

    let changingPacket = []
    // allPacket = [movePacket, allFile, changingPacket]
    let allPacket = reload(reloadFunc, headElemnet, changingPacket)
    let newNavi = tableAuslesen();
    let changFunc = 0
    // 1. Verzeichnistrucktur
    console.log("newNavi: ", newNavi)
    // 2.
    console.log("movePacket: ", allPacket[0])
    console.log("allFile: ", allPacket[1])
    // 3.
    console.log("changingPacket: ", changFunc, allPacket[2])
    let sendPacket = [newNavi, [allPacket[0], allPacket[1]], [changFunc, allPacket[2]]]
    // sendNewDiretory([{Verzeichnistrucktur}, ZuBewegendeDateien[allMovefolder, allMovefile]], [löschen/hinzufügen, [Name, url]])
    sendNewDiretory(sendPacket)
  }
}
window.optionAbbrechen = optionAbbrechen
function optionAbbrechen(buttonElement) {
  console.log("!!!---optionAbbrechen---!!!");
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  // Werte
  delete memory[klasse];
  tbody.innerHTML = ""
  let thead = table.querySelector("thead");
  let children = Array.from(thead.firstElementChild.children);
  for (let i = children.length - 1; i > 0; i--) {
    children[i].parentElement.removeChild(children[i]);
  }
  fillTable(navlist);
}
//Zeilen
window.newZeileOben = newZeileOben
function newZeileOben(buttonElement) {
  console.log(buttonElement)
  console.log(buttonElement.parentElement.parentElement.querySelector('[class*="abbrechen-"]'))
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---newZeileOben: " + klasse);
  optionAbbrechen(buttonElement.parentElement.parentElement.querySelector('[class*="abbrechen-"]'))
  newZeileErzeugen(position - 1);
  AktuelTr = tbody.getElementsByTagName("tr")[position];
  AktuelTr.insertAdjacentElement("beforebegin", tr);
  zeilenButtonLöschen();
  klapBox();
}
window.newZeileUnten = newZeileUnten
function newZeileUnten(buttonElement) {
  console.log(buttonElement)
  console.log(buttonElement.parentElement.parentElement.querySelector('[class*="abbrechen-"]'))
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---newZeileUnten: " + klasse);
  optionAbbrechen(buttonElement.parentElement.parentElement.querySelector('[class*="abbrechen-"]'))
  newZeileErzeugen(position + 1);
  AktuelTr = tbody.getElementsByTagName("tr")[position];
  AktuelTr.insertAdjacentElement("afterend", tr);
  zeilenButtonLöschen();
  klapBox();
}
function newZeileErzeugen(position) {
  console.log("!!!---newZeileErzeugen---!!!");
  window.tr = document.createElement("tr");
  let td = document.createElement("td");
  tr.appendChild(td);
  for (let i = 1; i < 6; i++) {
    let td = document.createElement("td");
    let hinzufügPosition = document.createElement("button");
    hinzufügPosition.setAttribute(
      "onclick",
      "newSpalte('" + i + "', " + position + ")"
    );
    hinzufügPosition.innerText = "Hinzufügen";
    td.appendChild(hinzufügPosition);
    tr.appendChild(td);
  }
}
window.newSpalte = newSpalte
function newSpalte(zeile, position) {
  console.log("!!!---newSpalte: " + (position - 1));
  let alleZufügButtons = tbody.querySelectorAll("[onclick*='newSpalte']");
  AktuelTd = alleZufügButtons[zeile - 1].parentElement;
  for (let i = 0; i < alleZufügButtons.length; i++) {
    alleZufügButtons[i].parentElement.removeChild(alleZufügButtons[i]);
  }
  AktuelTd.setAttribute("style", "position: relative");
  AktuelTd.setAttribute("class", "neue-zeile");
  eingabe(AktuelTd, "neue-zeile");
  einAusbutton(AktuelTd, "neue-zeile");
  unterwahlButton(AktuelTd, "neue-zeile", position);
  allPfeile(AktuelTd, "neue-zeile", position);
  zeilenOption(AktuelTd, "neue-zeile", position);
}

let changingPacket = []
window.löschZeile = löschZeile
function löschZeile(buttonElement) {
  let selectArray = [[0, "Lösch", () => deleteOneFile(buttonElement)], [0, "Lösch alles", () => deleteAllFile(buttonElement)]]
  selectionBar(selectArray)
  function deleteOneFile(buttonElement) {
    console.log(buttonElement)
    let AktuelTd = buttonElement.parentElement.parentElement.querySelector("[class]")
    let AktuelTr = AktuelTd.parentElement
    let klasse = AktuelTd.classList[AktuelTd.classList.length - 1]
    let position = Array.from(tbody.children).indexOf(AktuelTr)
    // close Textarea
    let text = memory[filter(klasse)][0];
    let href = memory[filter(klasse)][1];
    // Function
    let a = document.createElement("a");
    a.innerText = text;
    a.href = href
    AktuelTd.innerHTML = "";
    AktuelTd.appendChild(a);
    // read the URL
    let classBox = classBoxen(klasse, position)
    let changingPacket = []
    let fileName = classBox[0].querySelector("a").innerText
    let fileURL = classBox[0].querySelector("a").href
    changingPacket.push([fileName, filterRelativURL(fileURL)])
    // updating the table
    klapBox();
    // Löschen 
    // teil Löschen   |Eingabe= [displaceColumn=true, saveURL=true, unpacking=true]
    // alles Löschen  |Eingabe= [displaceColumn=false, saveURL=false, unpacking=false]
    let displaceColumn = true
    let saveURL = true
    let unpacking = true
    let reloadFunc = [displaceColumn, saveURL, unpacking]

    let headTD = AktuelTd
    let headName = klasse
    let headTRIndex = childIndex(headTD.parentElement)
    let headURLColumn = childIndex(headTD)
    let headElemnet = [headTD, headName, headTRIndex, headURLColumn]

    // delete the file
    classBox[0].parentElement.remove()

    // allPacket = [movePacket, allFile, changingPacket]
    let allPacket = reload(reloadFunc, headElemnet, changingPacket)
    let newNavi = tableAuslesen();
    let changFunc = 1
    // 1. Verzeichnistrucktur
    console.log("newNavi: ", newNavi)
    // 2.
    console.log("movePacket: ", allPacket[0])
    console.log("allFile: ", allPacket[1])
    // 3.
    console.log("changingPacket: ", changFunc, allPacket[2])
    let sendPacket = [newNavi, [allPacket[0], allPacket[1]], [changFunc, allPacket[2]]]
    // sendNewDiretory([{Verzeichnistrucktur}, ZuBewegendeDateien[allMovefolder, allMovefile]], [löschen/hinzufügen, [Name, url]])
    sendNewDiretory(sendPacket)
  }

  function deleteAllFile(buttonElement) {
    console.log(buttonElement)
    let AktuelTd = buttonElement.parentElement.parentElement.querySelector("[class]")
    let AktuelTr = AktuelTd.parentElement
    let klasse = AktuelTd.classList[AktuelTd.classList.length - 1]
    let position = Array.from(tbody.children).indexOf(AktuelTr)
    // close Textarea
    let text = memory[filter(klasse)][0];
    let href = memory[filter(klasse)][1];
    // Function
    let a = document.createElement("a");
    a.innerText = text;
    a.href = href
    AktuelTd.innerHTML = "";
    AktuelTd.appendChild(a);
    // read the URL
    let classBox = classBoxen(klasse, position)
    let changingPacket = []
    let fileName = classBox[0].querySelector("a").innerText
    let fileURL = classBox[0].querySelector("a").href
    changingPacket.push([fileName, filterRelativURL(fileURL)])
    // updating the table
    klapBox();
    // Löschen 
    // teil Löschen   |Eingabe= [displaceColumn=true, saveURL=true, unpacking=true]
    // alles Löschen  |Eingabe= [displaceColumn=false, saveURL=false, unpacking=false]
    let displaceColumn = false
    let saveURL = false
    let unpacking = false
    let reloadFunc = [displaceColumn, saveURL, unpacking]

    let headTD = AktuelTd
    let headName = klasse
    let headTRIndex = childIndex(headTD.parentElement)
    let headURLColumn = childIndex(headTD)
    let headElemnet = [headTD, headName, headTRIndex, headURLColumn]

    // delete the file
    for (let i = 0; i < classBox.length; i++) {
      classBox[i].parentElement.remove()
    }
    // allPacket = [movePacket, allFile, changingPacket]
    let allPacket = reload(reloadFunc, headElemnet, changingPacket)
    let newNavi = tableAuslesen();
    let changFunc = 2
    // 1. Verzeichnistrucktur
    console.log("newNavi: ", newNavi)
    // 2.
    console.log("movePacket: ", allPacket[0])
    console.log("allFile: ", allPacket[1])
    // 3.
    console.log("changingPacket: ", changFunc, allPacket[2])
    let sendPacket = [newNavi, [allPacket[0], allPacket[1]], [changFunc, allPacket[2]]]
    // sendNewDiretory([{Verzeichnistrucktur}, ZuBewegendeDateien[allMovefolder, allMovefile]], [löschen/hinzufügen, [Name, url]])
    sendNewDiretory(sendPacket)
  }
}

//Funktion
function zeilenButtonLöschen() {
  console.log("!!!---zeilenButtonLöschen---!!!");
  let divs = tbody.querySelectorAll("div");
  for (let i = 0; i < divs.length; i++) {
    divs[i].parentElement.removeChild(divs[i]);
  }
}
function reload(reloadFunc = [false, false, false], headElemnet = [, , ,], changingPacket) {
  console.log("!!!---reload---!!!");
  // Funktion
  function saveInArray(array, elementTR, index) {
    if (index === undefined) {
      array.push([elementTR.querySelector("a").innerText, filterRelativURL(elementTR.querySelector("a").href)]);
    } else {
      array[index].push(elementTR.querySelector("a").innerText, filterRelativURL(elementTR.querySelector("a").href));
    }
  }
  // Head Werte
  let headTD = headElemnet[0]
  let headName = headElemnet[1]
  let headTRIndex = headElemnet[2]
  let headURLColumn = headElemnet[3]
  let headTDUnder = headTD.classList.contains("unterwahl")
  // reload Function
  let displaceColumn = reloadFunc[0]
  let saveURL = reloadFunc[1]
  let unpacking = reloadFunc[2]
  // werte
  let allA = tbody.querySelectorAll("a");
  let columnLastFolder
  let previLineColumn = 0;
  let lastRowOfColumn = []
  let allclass = []
  let urlSaveAct = false
  // Packen werte
  let movePacket = []
  let allFile = []
  let previAllFile
  let previPacket
  let previChangingPacket
  let previPacketIndex
  console.log(changingPacket)

  for (let i = 0; i < allA.length; i++) {
    console.log(allA[i])
    // werte
    // actuel File
    let actText = allA[i].innerText;
    let actTD = allA[i].parentElement
    let actTR = actTD.parentElement
    let aktTdUnder = actTD.classList.contains("unterwahl")
    let actTDColumn = childIndex(actTD)
    if (!aktTdUnder) {
      columnLastFolder = childIndex(actTD)
      lastRowOfColumn[columnLastFolder - 1] = actTD
    }


    // 1.einrücken
    if (allA[i + 1] !== undefined && displaceColumn) {
      // next File
      let nextTD = allA[i + 1].parentElement
      let nextTR = nextTD.parentElement
      let nextTDColumn = childIndex(nextTD)
      let nextTDUnder = nextTD.classList.contains("unterwahl")
      // -1Regel all Column to left
      if (columnLastFolder + 1 < nextTDColumn) {
        while (columnLastFolder + 1 < nextTDColumn) {
          nextTD.insertAdjacentElement("afterend", nextTD.previousElementSibling);
          nextTDColumn = childIndex(nextTD);
        }
        if (headTD === nextTD) {
          headURLColumn = childIndex(nextTD);
        }
      }
      // -2Regel File Column one to rigth
      if (nextTDUnder && nextTDColumn === 1) {
        nextTD.insertAdjacentElement("beforebegin", nextTD.nextElementSibling);
        nextTDColumn = childIndex(nextTD);
        if (headTD === nextTD) {
          headURLColumn = childIndex(nextTD);
        }
      }
      // -Ausnahme verrückung
      if (unpacking && nextTD.classList[nextTD.classList.length - 2] === headName) {
        nextTD.insertAdjacentElement("afterend", nextTD.previousElementSibling);
        nextTDColumn = childIndex(nextTD);
        if (headTD === nextTD && headTD.parentElement.parentElement === null) {
          headURLColumn = childIndex(nextTD);
        }
      }
      // -3Regel File Column to top
      let overTdUnder = nextTR.previousElementSibling.children[nextTDColumn].classList.contains("unterwahl")
      console.log(nextTDUnder)
      console.log(lastRowOfColumn)
      console.log(nextTDColumn)
      console.log(nextTDColumn - 2)
      // console.log(childIndex(lastRowOfColumn[nextTDColumn - 2].parentElement) + 1 < i)
      console.log(!overTdUnder)
      console.log(nextTDUnder && childIndex(lastRowOfColumn[nextTDColumn - 2].parentElement) + 1 <= i && !overTdUnder)
      if (nextTDUnder && childIndex(lastRowOfColumn[nextTDColumn - 2].parentElement) + 1 <= i && !overTdUnder) {
        console.log(nextTR)
        let index = childIndex(nextTR);
        while (childIndex(lastRowOfColumn[nextTDColumn - 2].parentElement) + 1 < index && !overTdUnder) {
          nextTR.insertAdjacentElement("afterend", nextTR.previousElementSibling);
          index = childIndex(nextTR);
          overTdUnder = nextTR.previousElementSibling.children[nextTDColumn].classList.contains("unterwahl")
        }
      }
    }


    // 2.änderung speicher
    if (saveURL) {
      // -1packet
      // eingabe beenden
      if (previPacket !== undefined) {
        saveInArray(movePacket, previPacket, movePacket.length - 1)
        previPacket = undefined
      }

      // Weiter speichern
      if (urlSaveAct) {
        console.log(actTD)
        console.log(actTR)
        console.log("mittel1")
        console.log(!actTD.classList.contains(headName))
        console.log(headURLColumn < actTDColumn)
        console.log(previPacketIndex >= actTDColumn)
        console.log(previPacketIndex === undefined)
        console.log(!actTD.classList.contains(headName) && headURLColumn < actTDColumn && (previPacketIndex >= actTDColumn || previPacketIndex === undefined))
        console.log("mittel2")
        console.log(unpacking)
        console.log(actTD.classList[actTD.classList.length - 2] === headName)
        console.log(unpacking && actTD.classList[actTD.classList.length - 2] === headName)
        console.log("groß")
        console.log(!actTD.classList.contains(headName) && headURLColumn < actTDColumn && (previPacketIndex >= actTDColumn || previPacketIndex === undefined) || unpacking && actTD.classList[actTD.classList.length - 2] === headName)
        if (!actTD.classList.contains(headName) && headURLColumn < actTDColumn && (previPacketIndex >= actTDColumn || previPacketIndex === undefined) || unpacking && actTD.classList[actTD.classList.length - 2] === headName) {
          saveInArray(movePacket, actTR)
          previPacket = actTR
          previPacketIndex = actTDColumn
        }
      }


      // -2allFile
      // eingabe beenden
      if (previAllFile !== undefined) {
        saveInArray(allFile, previAllFile, allFile.length - 1)
        previAllFile = undefined
      }



      // Weiter speichern
      if (urlSaveAct) {
        if (headURLColumn < actTDColumn || actTD.classList.contains(headName)) {
          saveInArray(allFile, actTR)
          previAllFile = actTR
        } else {
          urlSaveAct = false
        }
      }

      // -3changingPacket
      // eingabe beenden
      if (previChangingPacket !== undefined) {
        saveInArray(changingPacket, previChangingPacket, changingPacket.length - 1)
        previChangingPacket = undefined
      }


      // Start
      if (headTD === actTD || headTD.parentElement.parentElement === null && headTRIndex === i) {
        if (allA[i].href !== "" || !headTDUnder) {
          urlSaveAct = true
          saveInArray(movePacket, actTR)
          saveInArray(allFile, actTR)
          previPacket = actTR
          previAllFile = actTR
        }
        if (allA[i].href === "") {
          saveInArray(changingPacket, actTR)
          previChangingPacket = actTR
        }
      }
    }

    // 3.URL Erzeugung
    // -1Klassen Speicher


    if (!aktTdUnder) {
      if (previLineColumn < actTDColumn) {
        // kein Wechsel
        allclass.push(filter2(actText));
      } else {
        // oberKategorie Wechsel
        allclass.splice(actTDColumn - 1);
        allclass.push(filter2(actText));
      }
    }
    previLineColumn = actTDColumn;


    // -2Klassen verteilung
    // -unterwahl
    if (allA[i].parentElement.classList.contains("unterwahl")) {
      allA[i].parentElement.removeAttribute("class");
      allA[i].parentElement.classList.add("unterwahl");
    } else {
      allA[i].parentElement.removeAttribute("class");
    }
    // -klasse verteilen
    for (let j = 0; j < actTDColumn - 1; j++) {
      allA[i].parentElement.classList.add(allclass[j]);
    }
    allA[i].parentElement.classList.add(filter2(actText));


    // -3URL Erzeugung
    let newHref = newhref(actTD);
    allA[i].href = newHref;
    //4. Onclick
    actTD.setAttribute(
      "ondblclick",
      "option(this)"
    );


  }
  console.log(movePacket)
  console.log(allFile)
  console.log(changingPacket)
  let allPacket = [movePacket, allFile, changingPacket]
  return allPacket
}

window.goLeft = goLeft
function goLeft(buttonElement) {
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---goLeft---!!!")
  let classBox = classBoxen(klasse, position);
  for (let i = 0; i < classBox.length; i++) {
    classBox[i].insertAdjacentElement(
      "afterend",
      classBox[i].previousElementSibling
    );
    console.log(classBox[0])
    console.log(classBox[0].previousElementSibling)
    console.log(classBox[0].previousElementSibling.hasChildNodes())
    if (classBox[0].previousElementSibling.hasChildNodes()) {
      console.log(classBox[0].querySelector('[class="pfeilLeft-' + klasse + '"]'))
      classBox[0].querySelector('[class="pfeilLeft-' + klasse + '"]').disabled = true;
    }
    cutTbody()
  }
}
window.goRight = goRight
function goRight(buttonElement) {
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---goRight---!!!")
  let classBox = classBoxen(klasse, position);
  for (let i = 0; i < classBox.length; i++) {
    if (classBox[i].nextElementSibling === null || classBox[i].nextElementSibling.tagName === "DIV") {
      fillTbody()
      if (classBox[i].nextElementSibling.tagName === "DIV") {
        classBox[i].nextElementSibling.nextElementSibling.insertAdjacentElement("beforebegin", classBox[i].nextElementSibling.nextElementSibling.nextElementSibling);
        classBox[i].nextElementSibling.insertAdjacentElement("beforebegin", classBox[i].nextElementSibling.nextElementSibling);
      }
    }
    classBox[i].insertAdjacentElement("beforebegin", classBox[i].nextElementSibling);
    if (!classBox[0].previousElementSibling.hasChildNodes()) {
      classBox[0].querySelector(
        '[class="pfeilLeft-' + klasse + '"]'
      ).disabled = false;
    }
  }
}
window.goTop = goTop
function goTop(buttonElement) {
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---goTop---!!!");
  let tdNummer = tdPosition(position);
  // ClassBox Fühlen
  let classBox = classBoxen(klasse, position);
  let obenIstUnterwahl
  if (
    classBox[0].parentElement.previousElementSibling.querySelector("a")
      .parentElement.classList[0] !== "unterwahl"
  ) {
    obenIstUnterwahl = 1;
  } else {
    obenIstUnterwahl = 0;
  }
  let obenBoxClass =
    classBox[0].parentElement.previousElementSibling.querySelector("a")
      .parentElement.classList[tdNummer - obenIstUnterwahl];
  if (obenBoxClass === undefined) {
    obenBoxClass =
      classBox[0].parentElement.previousElementSibling.querySelector("a")
        .parentElement.classList[tdNummer - obenIstUnterwahl - 1];
  } else {
    obenBoxClass =
      classBox[0].parentElement.previousElementSibling.querySelector("a")
        .parentElement.classList[tdNummer - obenIstUnterwahl];
  }
  while (
    classBox[0].parentElement.previousElementSibling !== null && classBox[0].parentElement.previousElementSibling.querySelector("a").parentElement.classList.contains(obenBoxClass)
  ) {
    for (let i = 0; i < classBox.length; i++) {
      classBox[i].parentElement.insertAdjacentElement("afterend", classBox[i].parentElement.previousElementSibling);
    }
    console.log(classBox[0].parentElement.previousElementSibling)
    console.log(classBox[0].parentElement.previousElementSibling !== null)
  }
  if (
    classBox[0].parentElement.previousElementSibling === null
  ) {
    classBox[0].parentElement.querySelector(
      '[class="pfeilTop-' + klasse + '"]'
    ).disabled = true;
  }
  if (classBox[classBox.length - 1].parentElement.nextElementSibling !== null) {
    classBox[0].parentElement.querySelector(
      '[class="pfeilBottom-' + klasse + '"]'
    ).disabled = false;
  }
  klapBox();
  // Website Fokus
  document.getElementsByTagName("textarea")[0].setAttribute("id", "Offen");
  scrollToCenter("Offen")
  document.getElementById("Offen").removeAttribute("id");
}

window.goBottom = goBottom
function goBottom(buttonElement) {
  let klasse = buttonElement.parentElement.classList[buttonElement.parentElement.classList.length - 1]
  let position = Array.from(tbody.children).indexOf(buttonElement.parentElement.parentElement)
  console.log("!!!---goBottom---!!!");
  // Variablen
  // Aktuelle
  let classBox = classBoxen(klasse, position)
  let tdColumn = tdPosition(position);

  // Nexte
  let nextClass = classBox[classBox.length - 1].parentElement.nextElementSibling.querySelector('[class]').classList[classBox[classBox.length - 1].parentElement.nextElementSibling.classList.length - 1]
  let nextTRPosition = Array.from(tbody.children).indexOf(classBox[classBox.length - 1].parentElement.nextElementSibling)
  let nextTDColumn = tdPosition(nextTRPosition);
  let nextClassBox = classBoxen(nextClass, nextTRPosition)
  let obenIstUnterwahl
  // Funktionen
  if (classBox[classBox.length - 1].parentElement.nextElementSibling !== null) {
    if (tdColumn > nextTDColumn) {
      for (let i = classBox.length - 1; i > -1; i -= 1) {
        classBox[i].parentElement.insertAdjacentElement("beforebegin", classBox[i].parentElement.nextElementSibling);
      }
    } else {
      // unterwahl
      if (classBox[classBox.length - 1].parentElement.nextElementSibling.querySelector('[class]').classList.contains("unterwahl")) {
        obenIstUnterwahl = 0;
      } else {
        obenIstUnterwahl = 1;
      }
      let nameOfClassBox = classBox[classBox.length - 1].parentElement.nextElementSibling.querySelector('[class]').classList[tdColumn - obenIstUnterwahl]
      while (classBox[classBox.length - 1].parentElement.nextElementSibling !== null && classBox[classBox.length - 1].parentElement.nextElementSibling.querySelector('[class]').classList.contains(nameOfClassBox)) {
        for (let i = classBox.length - 1; i > -1; i -= 1) {
          classBox[i].parentElement.insertAdjacentElement("beforebegin", classBox[i].parentElement.nextElementSibling);
        }
      }
    }
    // Button Disabled
    if (classBox[classBox.length - 1].parentElement.nextElementSibling === null) {
      let pfeilBottom = document.querySelector(".pfeilBottom-" + klasse)
      pfeilBottom.disabled = true;
    }
    if (
      classBox[0].parentElement.previousElementSibling.querySelectorAll("tr")
        .length === 0
    ) {
      classBox[0].parentElement.querySelector('[class="pfeilTop-' + klasse + '"]').disabled = false;
    }
    klapBox();
    // Website Fokus
    document.getElementsByTagName("textarea")[0].setAttribute("id", "Offen");
    scrollToCenter("Offen")
    document.getElementById("Offen").removeAttribute("id");
  }
}

function scrollToCenter(elementId) {
  const element = document.getElementById(elementId);
  const elementRect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const offset = elementRect.top - (windowHeight / 2) + (elementRect.height / 2);
  window.scrollBy({ top: offset, behavior: 'smooth' });
}
//Zwischen Funktionen

function newhref(AktuelTd) {
  let href2 = "..";
  if (AktuelTd.classList[0] === "unterwahl") {
    for (let i = 1; i < AktuelTd.classList.length; i++) {
      let klassen = AktuelTd.classList[i];
      href2 += "/" + klassen.toLowerCase();
    }
    href2 += ".html";
  } else {
    for (let i = 0; i < AktuelTd.classList.length; i++) {
      let klassen = AktuelTd.classList[i];
      href2 += "/" + klassen.toLowerCase();
      if (i === AktuelTd.classList.length - 1) {
        href2 += "/" + klassen.toLowerCase();
      }
    }
    href2 += ".html";
  }
  return href2;
}

window.newhref2 = newhref2
function newhref2(AktuelTd, unterwahl) {
  href2 = "..";
  if (unterwahl === "unterwahl") {
    if (AktuelTd.classList[0] === "unterwahl") {
      for (let i = 1; i < AktuelTd.classList.length; i++) {
        let klassen = AktuelTd.classList[i];
        href2 += "/" + klassen.toLowerCase();
      }
      href2 += ".html";
    } else {
      for (let i = 0; i < AktuelTd.classList.length; i++) {
        let klassen = AktuelTd.classList[i];
        href2 += "/" + klassen.toLowerCase();
      }
      href2 += ".html";
    }
  } else {
    if (AktuelTd.classList[0] === "unterwahl") {
      for (let i = 1; i < AktuelTd.classList.length; i++) {
        let klassen = AktuelTd.classList[i];
        href2 += "/" + klassen.toLowerCase();
        if (i === AktuelTd.classList.length - 1) {
          href2 += "/" + klassen.toLowerCase();
        }
      }
      href2 += ".html";
    } else {
      for (let i = 0; i < AktuelTd.classList.length; i++) {
        let klassen = AktuelTd.classList[i];
        href2 += "/" + klassen.toLowerCase();
        if (i === AktuelTd.classList.length - 1) {
          href2 += "/" + klassen.toLowerCase();
        }
      }
      href2 += ".html";
    }
  }
  return href2;
}

function classBoxen(klasse, position) {
  console.log("classBoxen")
  let classBox = [];
  AktuelTr = tbody.getElementsByTagName("tr")[position];
  let nextTr = AktuelTr;
  while (nextTr.querySelector("[class]").classList.contains(klasse)) {
    classBox.push(nextTr.querySelector("[class]"));
    nextTr = nextTr.nextElementSibling;
    if (nextTr === null) {
      break;
    }
  }
  return classBox;
}

function tdPosition(positon) {
  let td = tbody.getElementsByTagName("tr")[positon].querySelector("td[class]");
  let position = Array.from(td.parentElement.children).indexOf(td)
  return position;
}
function filterRelativURL(url) {
  return url.replace(window.location.origin + "/hauptverzeichnis/", "../");
}
function filter(Name) {
  let ausgabe = Name;
  while (ausgabe.includes("%20")) {
    ausgabe = ausgabe.replace("%20", " ");
  }
  return ausgabe;
}
function filter2(Name) {
  let ausgabe = Name;
  while (ausgabe.includes(" ")) {
    ausgabe = ausgabe.replace(" ", "%20");
  }
  return ausgabe;
}

function filter3(Name) {
  let ausgabe = Name;
  while (ausgabe.includes(" ")) {
    ausgabe = ausgabe.replace(" ", "-");
  }
  return ausgabe;
}
function filter4(Name) {
  let ausgabe = Name;
  while (ausgabe.includes("\n")) {
    ausgabe = ausgabe.replace("\n", "");
  }
  return ausgabe;
}
