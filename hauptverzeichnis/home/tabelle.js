// Debug
function Test(testMessage) {
  if (testMessage === undefined) {
    testMessage = "";
  } else {
    testMessage = "-" + testMessage;
  }
  console.count("!!!!!----Test" + testMessage + "----!!!!!");
}
// code
let request = new XMLHttpRequest();
request.open("GET", "../verzeichnis.json");
request.responseType = "text";
request.send();
request.onload = function () {
  let navlist = JSON.parse(request.response);
  fillTable(navlist);
};
function fillTable(navlist) {
  key = Object.keys(navlist);
  nummer = 1;
  table = document.getElementById("Verzeichnis");
  // Tabelle Füllen
  for (let i of key) {
    // 1 Reihe
    // Zahl
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerHTML = nummer;
    tr.appendChild(td);
    // 1 Reihe
    td = document.createElement("td");
    a = document.createElement("a");
    a.innerHTML = navlist[i][0];
    a.setAttribute("href", "../" + navlist[i][1]);
    i1 = filter3(navlist[i][0]);
    td.setAttribute("ondblclick", "option('" + i1 + "', " + nummer + ")");
    td.classList.add(i1);
    td.appendChild(a);
    tr.appendChild(td);
    // End Leere td
    for (let z = 0; z < 4; z++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
    nummer += 1;
    if (navlist[i][3].length !== 0) {
      for (let z = 0; z < navlist[i][3].length; z++) {
        // Zahl
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = nummer;
        tr.appendChild(td);
        // An Leere td
        for (let z = 0; z < 1; z++) {
          let td = document.createElement("td");
          tr.appendChild(td);
        }
        //Unterwahl
        td = document.createElement("td");
        a = document.createElement("a");
        a.innerHTML = navlist[i][3][z][0];
        a.setAttribute("href", "../" + navlist[i][3][z][1]);
        td.setAttribute(
          "ondblclick",
          "option('" +
            filter2(navlist[i][3][z][0]) +
            "', " +
            nummer +
            ", 'unterwahl')"
        );
        td.setAttribute("class", "unterwahl");
        td.classList.add(i1, filter2(navlist[i][3][z][0]));
        td.appendChild(a);
        tr.appendChild(td);
        // End Leere td
        for (let z = 0; z < 3; z++) {
          let td = document.createElement("td");
          tr.appendChild(td);
        }
        table.appendChild(tr);
        nummer += 1;
      }
    }
    if (
      Object.keys(navlist[i][2]).length !== 0 &&
      Object.keys(navlist[i][2]).length !== undefined
    ) {
      // 2 Reihe
      key1 = Object.keys(navlist[i][2]);
      for (let j of key1) {
        // Zahl
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = nummer;
        tr.appendChild(td);
        // An Leere td
        for (let z = 0; z < 1; z++) {
          let td = document.createElement("td");
          tr.appendChild(td);
        }
        //Kategorie
        td = document.createElement("td");
        a = document.createElement("a");
        a.innerHTML = navlist[i][2][j][0];
        a.setAttribute("href", "../" + navlist[i][2][j][1]);
        j1 = filter3(navlist[i][2][j][0]);
        td.setAttribute("ondblclick", "option('" + j1 + "', " + nummer + ")");
        td.classList.add(i1, j1);
        td.appendChild(a);
        tr.appendChild(td);
        // End Leere td
        for (let z = 0; z < 3; z++) {
          let td = document.createElement("td");
          tr.appendChild(td);
        }
        table.appendChild(tr);
        nummer += 1;
        if (navlist[i][2][j][3].length !== 0) {
          for (let z = 0; z < navlist[i][2][j][3].length; z++) {
            // Zahl
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.innerHTML = nummer;
            tr.appendChild(td);
            // An Leere td
            for (let z = 0; z < 2; z++) {
              let td = document.createElement("td");
              tr.appendChild(td);
            }
            //Unterwahl
            td = document.createElement("td");
            a = document.createElement("a");
            a.innerHTML = navlist[i][2][j][3][z][0];
            a.setAttribute("href", "../" + navlist[i][2][j][3][z][1]);
            td.setAttribute(
              "ondblclick",
              "option('" +
                filter2(navlist[i][2][j][3][z][0]) +
                "', " +
                nummer +
                ", 'unterwahl')"
            );
            td.setAttribute("class", "unterwahl");
            td.classList.add(i1, j1, filter2(navlist[i][2][j][3][z][0]));
            td.appendChild(a);
            tr.appendChild(td);
            // End Leere td
            for (let z = 0; z < 2; z++) {
              let td = document.createElement("td");
              tr.appendChild(td);
            }
            table.appendChild(tr);
            nummer += 1;
          }
        }
        if (
          Object.keys(navlist[i][2][j][2]).length !== 0 &&
          Object.keys(navlist[i][2][j][2]).length !== undefined
        ) {
          // 3 Reihe
          key2 = Object.keys(navlist[i][2][j][2]);
          for (let k of key2) {
            // Zahl
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.innerHTML = nummer;
            tr.appendChild(td);
            // An Leere td
            for (let z = 0; z < 2; z++) {
              let td = document.createElement("td");
              tr.appendChild(td);
            }
            td = document.createElement("td");
            a = document.createElement("a");
            a.innerHTML = navlist[i][2][j][2][k][0];
            a.setAttribute("href", "../" + navlist[i][2][j][2][k][1]);
            k1 = filter3(navlist[i][2][j][2][k][0]);
            td.setAttribute(
              "ondblclick",
              "option('" + k1 + "', " + nummer + ")"
            );
            td.classList.add(i1, j1);
            if (k1 === "Elektro-Technik") {
              td.classList.add("Elektro-Technik");
            } else {
              td.classList.add(k1);
            }
            td.appendChild(a);
            tr.appendChild(td);
            // End Leere td
            for (let z = 0; z < 2; z++) {
              let td = document.createElement("td");
              tr.appendChild(td);
            }
            table.appendChild(tr);
            nummer += 1;
            if (navlist[i][2][j][2][k][3].length !== 0) {
              for (let z = 0; z < navlist[i][2][j][2][k][3].length; z++) {
                // Zahl
                tr = document.createElement("tr");
                td = document.createElement("td");
                td.innerHTML = nummer;
                tr.appendChild(td);
                // An Leere td
                for (let z = 0; z < 3; z++) {
                  let td = document.createElement("td");
                  tr.appendChild(td);
                }
                //Unterwahl
                td = document.createElement("td");
                a = document.createElement("a");
                a.innerHTML = navlist[i][2][j][2][k][3][z][0];
                a.setAttribute("href", "../" + navlist[i][2][j][2][k][3][z][1]);
                td.setAttribute(
                  "ondblclick",
                  "option('" +
                    filter2(navlist[i][2][j][2][k][3][z][0]) +
                    "', " +
                    nummer +
                    ", 'unterwahl')"
                );
                td.setAttribute("class", "unterwahl");
                td.classList.add(
                  i1,
                  j1,
                  k1,
                  filter2(navlist[i][2][j][2][k][3][z][0])
                );
                td.appendChild(a);
                tr.appendChild(td);
                // End Leere td
                for (let z = 0; z < 1; z++) {
                  let td = document.createElement("td");
                  tr.appendChild(td);
                }
                table.appendChild(tr);
                nummer += 1;
              }
            }
            if (
              Object.keys(navlist[i][2][j][2][k][2]).length !== 0 &&
              Object.keys(navlist[i][2][j][2][k][2]).length !== undefined
            ) {
              // 4 Reihe
              key3 = Object.keys(navlist[i][2][j][2][k][2]);
              for (let l of key3) {
                // Zahl
                tr = document.createElement("tr");
                td = document.createElement("td");
                td.innerHTML = nummer;
                tr.appendChild(td);
                // An Leere td
                for (let z = 0; z < 3; z++) {
                  let td = document.createElement("td");
                  tr.appendChild(td);
                }
                td = document.createElement("td");
                a = document.createElement("a");
                a.innerHTML = navlist[i][2][j][2][k][2][l][0];
                a.setAttribute("href", "../" + navlist[i][2][j][2][k][2][l][1]);
                l1 = filter3(navlist[i][2][j][2][k][2][l][0]);
                td.setAttribute(
                  "ondblclick",
                  "option('" + l1 + "', " + nummer + ")"
                );
                td.classList.add(i1, j1, k1, l1);
                td.appendChild(a);
                tr.appendChild(td);
                // End Leere td
                for (let z = 0; z < 1; z++) {
                  let td = document.createElement("td");
                  tr.appendChild(td);
                }
                table.appendChild(tr);
                nummer += 1;
                if (navlist[i][2][j][2][k][2][l][3].length !== 0) {
                  for (
                    let z = 0;
                    z < navlist[i][2][j][2][k][2][l][3].length;
                    z++
                  ) {
                    // Zahl
                    tr = document.createElement("tr");
                    td = document.createElement("td");
                    td.innerHTML = nummer;
                    tr.appendChild(td);
                    // An Leere td
                    for (let z = 0; z < 4; z++) {
                      let td = document.createElement("td");
                      tr.appendChild(td);
                    }
                    //Unterwahl
                    td = document.createElement("td");
                    a = document.createElement("a");
                    a.innerHTML = navlist[i][2][j][2][k][2][l][3][z][0];
                    a.setAttribute(
                      "href",
                      "../" + navlist[i][2][j][2][k][2][l][3][z][1]
                    );
                    td.setAttribute(
                      "ondblclick",
                      "option('" +
                        filter2(navlist[i][2][j][2][k][2][l][3][z][0]) +
                        "', " +
                        nummer +
                        ", 'unterwahl')"
                    );
                    td.setAttribute("class", "unterwahl");
                    td.classList.add(
                      i1,
                      j1,
                      k1,
                      l1,
                      filter2(navlist[i][2][j][2][k][2][l][3][z][0])
                    );
                    td.appendChild(a);
                    tr.appendChild(td);
                    // End Leere td
                    for (let z = 0; z < 0; z++) {
                      let td = document.createElement("td");
                      tr.appendChild(td);
                    }
                    table.appendChild(tr);
                    nummer += 1;
                  }
                }
                if (
                  Object.keys(navlist[i][2][j][2][k][2][l][2]).length !== 0 &&
                  Object.keys(navlist[i][2][j][2][k][2][l][2]).length !==
                    undefined
                ) {
                  // 5 Reihe
                  key4 = Object.keys(navlist[i][2][j][2][k][2][l][2]);
                  for (let e of key4) {
                    // Zahl
                    tr = document.createElement("tr");
                    td = document.createElement("td");
                    td.innerHTML = nummer;
                    tr.appendChild(td);
                    // An Leere td
                    for (let z = 0; z < 4; z++) {
                      let td = document.createElement("td");
                      tr.appendChild(td);
                    }
                    td = document.createElement("td");
                    a = document.createElement("a");
                    a.innerHTML = navlist[i][2][j][2][k][2][l][2][e][0];
                    a.setAttribute(
                      "href",
                      "../" + navlist[i][2][j][2][k][2][l][2][e][1]
                    );
                    e1 = filter3(navlist[i][2][j][2][k][2][l][2][e][0]);
                    td.setAttribute(
                      "ondblclick",
                      "option('" + e1 + "', " + nummer + ")"
                    );
                    td.classList.add(i1, j1, k1, l1, e1);
                    td.appendChild(a);
                    tr.appendChild(td);
                    // End Leere td
                    for (let z = 0; z < 0; z++) {
                      let td = document.createElement("td");
                      tr.appendChild(td);
                    }
                    table.appendChild(tr);
                    nummer += 1;
                    if (navlist[i][2][j][2][k][2][l][2][e][3].length !== 0) {
                      for (
                        let z = 0;
                        z < navlist[i][2][j][2][k][2][l][2][e][3].length;
                        z++
                      ) {
                        // Zahl
                        tr = document.createElement("tr");
                        td = document.createElement("td");
                        td.innerHTML = nummer;
                        tr.appendChild(td);
                        // An Leere td
                        for (let z = 0; z < 5; z++) {
                          let td = document.createElement("td");
                          tr.appendChild(td);
                        }
                        //Unterwahl
                        td = document.createElement("td");
                        a = document.createElement("a");
                        a.innerHTML =
                          navlist[i][2][j][2][k][2][l][2][e][3][z][0];
                        a.setAttribute(
                          "href",
                          "../" + navlist[i][2][j][2][k][2][l][2][e][3][z][1]
                        );
                        td.setAttribute(
                          "ondblclick",
                          "option('" +
                            filter2(
                              navlist[i][2][j][2][k][2][l][2][e][3][z][0]
                            ) +
                            "', " +
                            nummer +
                            ", 'unterwahl')"
                        );
                        td.setAttribute("class", "unterwahl");
                        td.classList.add(
                          i1,
                          j1,
                          k1,
                          l1,
                          e1,
                          filter2(navlist[i][2][j][2][k][2][l][2][e][3][z][0])
                        );
                        td.appendChild(a);
                        tr.appendChild(td);
                        // End Leere td
                        for (let z = 0; z < 0; z++) {
                          let td = document.createElement("td");
                          tr.appendChild(td);
                        }
                        table.appendChild(tr);
                        nummer += 1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  klapBox();
}
function klapBox() {
  console.log("!!!---klapBox---!!!");
  // Über und Unterkatergorie
  allTr = table.querySelectorAll("tr");
  allTd = table.querySelectorAll("td[class]");
  for (let i = 1; i < allTr.length; i++) {
    //Nummerierung
    allTr[i].firstChild.innerHTML = i;
    if (allTr[i].querySelector("td[class]") !== null) {
      if (
        table.getElementsByClassName(
          allTr[i].querySelector("td[class]").classList[
            allTr[i].querySelector("td[class]").classList.length - 1
          ]
        ).length !== 1
      ) {
        nummerTd = allTr[i].firstChild;
        // Klappzeichen
        img = document.createElement("img");
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
function klap(klasse) {
  console.log("klap");
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

memory = {};
//STEP Öffnet optionen
function option(klasse, position, art) {
  console.log("!!!---option---!!!");
  //Werte
  AktuelTd = table
    .getElementsByTagName("tr")
    [position].querySelector('td[class*="' + klasse + '"]');
  AktuelTr = AktuelTd.parentElement;
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
  textarea = document.createElement("textarea");
  textarea.setAttribute(
    "style",
    "resize: none; box-sizing: border-box; margin: 0px; height: 100%; width: 100%;"
  );
  textarea.classList.add("textarea-" + klasse);
  //href
  //Test Einfügen
  if (AktuelTd.querySelectorAll("a").length) {
    textarea.innerText = AktuelTd.innerText;
    memory[AktuelTd.innerText] = [AktuelTd.innerText, art];
  }
  AktuelTd.style.padding = "0px";
  AktuelTd.innerText = "";
  //einfügen
  AktuelTd.appendChild(textarea);
}
function einAusbutton(AktuelTd, klasse, position) {
  console.log("!!!---einAusbutton---!!!");
  // Abbruchbutton
  abbruchButton = document.createElement("button");
  abbruchButton.setAttribute(
    "style",
    "background-color: red;; position: absolute; left: -50px; border-radius: 10%;"
  );
  abbruchButton.setAttribute(
    "onclick",
    "optionAbbrechen('" + klasse + "', " + position + ")"
  );
  abbruchButton.classList.add("abbrechen-" + klasse);
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/cancel_black_24dp.svg");
  abbruchButton.appendChild(img);
  AktuelTd.appendChild(abbruchButton);
  // Fertigbutton
  fertigButton = document.createElement("button");
  fertigButton.setAttribute(
    "style",
    "background-color: green; position: absolute; right: -50px; border-radius: 10%;"
  );
  fertigButton.setAttribute(
    "onclick",
    "optionEnde('" + klasse + "', " + position + ")"
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
  UnterwahlButton = document.createElement("button");
  UnterwahlButton.setAttribute(
    "style",
    "background-color: blue; position: absolute; top: -40px; right: -50px;"
  );
  UnterwahlButton.classList.add("unterwahl-" + klasse);
  UnterwahlButton.setAttribute(
    "onclick",
    "zurUnterwahl('unterwahl-" + klasse + "', " + position + ")"
  );
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/check_black_24dp.svg");
  UnterwahlButton.appendChild(img);
  AktuelTd.appendChild(UnterwahlButton);
}
function allPfeile(AktuelTd, klasse, position) {
  console.log("!!!---allPfeile---!!!");
  // Left
  pfeilLeft = document.createElement("button");
  pfeilLeft.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: -100px;"
  );
  pfeilLeft.classList.add("pfeilLeft-" + klasse);
  pfeilLeft.setAttribute(
    "onclick",
    "goLeft('" + klasse + "', " + position + ")"
  );
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/west_black_24dp.svg");
  pfeilLeft.appendChild(img);
  AktuelTd.appendChild(pfeilLeft);
  if (AktuelTd.previousElementSibling.innerHTML !== "") {
    pfeilLeft.disabled = true;
  }
  // Right
  pfeilRight = document.createElement("button");
  pfeilRight.setAttribute(
    "style",
    "background-color: #404649; position: absolute; right: -100px;"
  );
  pfeilRight.classList.add("pfeilRight-" + klasse);
  pfeilRight.setAttribute(
    "onclick",
    "goRight('" + klasse + "', " + position + ")"
  );
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/east_black_24dp.svg");
  pfeilRight.appendChild(img);
  AktuelTd.appendChild(pfeilRight);
  // Top
  pfeilTop = document.createElement("button");
  pfeilTop.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: 40%; top: -50px;"
  );
  pfeilTop.classList.add("pfeilTop-" + klasse);
  pfeilTop.setAttribute("onclick", "goTop('" + klasse + "', " + position + ")");
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/north_black_24dp.svg");
  pfeilTop.appendChild(img);
  if (
    AktuelTd.parentElement.previousElementSibling.querySelector("td") === null
  ) {
    pfeilTop.disabled = true;
  }
  AktuelTd.appendChild(pfeilTop);
  // Bottom
  pfeilBottom = document.createElement("button");
  pfeilBottom.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: 40%; bottom: -50px;"
  );
  pfeilBottom.classList.add("pfeilBottom-" + klasse);
  pfeilBottom.setAttribute(
    "onclick",
    "goBottom('" + klasse + "', " + position + ")"
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
  pfeilLeft = document.createElement("button");
  pfeilLeft.setAttribute(
    "style",
    "background-color: #404649; position: absolute; left: -100px;"
  );
  pfeilLeft.setAttribute(
    "onclick",
    "unterEnd('pfeilLeft-" + klasse + "', " + position + ")"
  );
  pfeilLeft.classList.add("pfeilLeft-" + klasse);
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/west_black_24dp.svg");
  pfeilLeft.appendChild(img);
  AktuelTd.appendChild(pfeilLeft);
}
// Zeilen option//Zeilen
function zeilenOption(AktuelTd, klasse, position) {
  console.log("!!!---zeilenOption---!!!");
  position = AktuelTd.parentElement.firstChild.innerText;
  div = document.createElement("div");
  div.classList.add("hinzufügButton");
  div2 = document.createElement("div");
  div2.classList.add("löschButton");
  buttonOben = document.createElement("button");
  buttonOben.setAttribute(
    "onclick",
    "newZeileOben('" + klasse + "', " + position + ")"
  );
  buttonOben.innerText = "Oben";
  div.appendChild(buttonOben);
  buttonUnten = document.createElement("button");
  buttonUnten.setAttribute(
    "onclick",
    "newZeileUnten('" + klasse + "', " + position + ")"
  );
  buttonUnten.innerText = "Unten";
  div.appendChild(buttonUnten);
  zeileLöschen = document.createElement("button");
  zeileLöschen.setAttribute(
    "onclick",
    "löschZeile('" + klasse + "', " + position + ")"
  );
  zeileLöschen.innerText = "Löschen";
  div2.appendChild(zeileLöschen);
  AktuelTd.parentElement.appendChild(div2);
  AktuelTd.parentElement.appendChild(div);
}
function zeilenOptionEnd() {
  console.log("zeilenOptionEnd");
  div = table.querySelectorAll("div");
  for (let i = 0; i < div.length; i++) {
    div[i].parentElement.removeChild(div[i]);
  }
}
//!STEP
//STEP Unterwahl Function
function unterEnd(klasse, position) {
  console.log("!!!---unterEnd----!!!");
  // Werte
  AktuelTdClass = klasse.replace("pfeilLeft-", "");
  AktuelTd = table
    .getElementsByTagName("tr")
    [position].querySelector('td[class*="' + AktuelTdClass + '"]');
  // Attribute ändern
  AktuelTd.classList.remove("unterwahl");
  //Button entfernen
  document
    .getElementsByTagName("tr")
    [position].querySelector('td[class*="' + AktuelTdClass + '"]')
    .removeChild(
      document
        .getElementsByTagName("tr")
        [position].querySelector('[class="' + klasse + '"]')
    );
  // Buttons hinzufügen
  // Unterwahlbutton
  UnterwahlButton = document.createElement("button");
  UnterwahlButton.setAttribute(
    "style",
    "background-color: blue; position: absolute; top: -40px; right: -50px;"
  );
  UnterwahlButton.classList.add("unterwahl-" + AktuelTdClass);
  UnterwahlButton.setAttribute(
    "onclick",
    "zurUnterwahl('unterwahl-" + AktuelTdClass + "', " + position + ")"
  );
  img = document.createElement("img");
  img.setAttribute("src", "../../icons/svg/check_black_24dp.svg");
  UnterwahlButton.appendChild(img);
  AktuelTd.appendChild(UnterwahlButton);
  allPfeile(AktuelTd, AktuelTdClass, position);
}
function zurUnterwahl(klasse, position) {
  console.log("!!!---zurUnterwahl---!!!");
  // Werte
  AktuelTdClass = klasse.replace("unterwahl-", "");
  AktuelTd = table
    .getElementsByTagName("tr")
    [position].querySelector('td[class*="' + AktuelTdClass + '"]');
  // Attribute ändern
  NewClass = "unterwahl";
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

function optionEnde(klasse, position) {
  console.log("!!!---optionEnde---!!!");
  text = filter4(
    AktuelTd.querySelector('[class="textarea-' + klasse + '"]').value
  );
  // Werte
  if (text !== "") {
    // Function
    a = document.createElement("a");
    a.innerText = text;
    AktuelTd.innerHTML = "";
    AktuelTd.appendChild(a);
    if (AktuelTd.classList.contains("unterwahl")) {
      unterwahlTest = ", 'unterwahl'";
    } else {
      unterwahlTest = "";
    }
    if (klasse === "neue-zeile") {
      neueKato = 1;
    } else {
      neueKato = 0;
      tdNummer = tdPosition(position);
      // ClassBox Fühlen
      classBox = classBoxen(klasse, position);
      packet = [
        [
          memory[filter(klasse)][0],
          newhref2(classBox[0], memory[filter(klasse)][1]),
          position,
        ],
      ];
      allUnterOrdner = [
        [
          memory[filter(klasse)][0],
          newhref2(classBox[0], memory[filter(klasse)][1]),
        ],
      ];
      if (
        classBox[classBox.length - 1].parentElement.nextElementSibling !== null
      ) {
        nextTd =
          classBox[
            classBox.length - 1
          ].parentElement.nextElementSibling.querySelector("td[class]");
        nextTdPosition = nextTd.parentElement.firstElementChild.innerText;
        nextTdKlasse = nextTd.classList[nextTd.classList.length - 1];
        nextTdNummer = tdPosition(nextTdPosition);
      }
      let alteNummer = 10;
      for (let i = 1; i < classBox.length; i++) {
        allUnterOrdner.push([
          classBox[i].querySelector("a").innerText,
          newhref(classBox[i]),
        ]);
      }
      if (
        classBox[classBox.length - 1].parentElement.nextElementSibling !== null
      ) {
        while (tdNummer < nextTdNummer) {
          allUnterOrdner.push([
            nextTd.querySelector("a").innerText,
            newhref(nextTd),
          ]);
          if (alteNummer >= nextTdNummer) {
            alteNummer = nextTdNummer;
            packet.push([
              nextTd.querySelector("a").innerText,
              newhref(nextTd),
              Number(nextTdPosition),
            ]);
          }
          nextTd =
            nextTd.parentElement.nextElementSibling.querySelector("td[class]");
          nextTdPosition = nextTd.parentElement.firstElementChild.innerText;
          nextTdKlasse = nextTd.classList[nextTd.classList.length - 1];
          nextTdNummer = tdPosition(nextTdPosition);
        }
      }
      console.log(packet);
    }
    if (klasse !== "neue-zeile") {
      delete memory[klasse];
    }
    zeilenButtonLöschen();
    AktuelTd.removeAttribute("style");
    AktuelTr.removeAttribute("style");
    zeilenOptionEnd();
    reload();
    tableAuslesen();
    if (neueKato) {
      ordnerHinzufügen(text, filter(newhref(AktuelTd)));
    } else {
      // ClassBox neue Fühlen
      boxKlasse = classBox[0].classList[classBox[0].classList.length - 1];
      boxPosition = classBox[0].parentElement.firstElementChild.innerText;
      classBox = classBoxen(boxKlasse, boxPosition);
      if (zähler !== 0) {
        for (let i = 0; i < zähler; i++) {
          AktuelTd = table
            .getElementsByTagName("tr")
            [allUnterOrdner[i + 1][2]].querySelector("a").parentElement;
          allUnterOrdner[i + 1].splice(2);
          allUnterOrdner[i + 1].push(
            AktuelTd.querySelector("a").innerText,
            newhref(AktuelTd)
          );
        }
      }
      for (let i = 0; i < classBox.length; i++) {
        allUnterOrdner[i].push(
          classBox[i].querySelector("a").innerText,
          newhref(classBox[i])
        );
      }
      let lastTdPosition = packet[0].pop() - 1;
      let lastA = table.querySelectorAll("a")[lastTdPosition];
      packet[0].push(lastA.innerText, newhref(lastA.parentElement));
      if (!lastA.parentElement.classList.contains("unterwahl")) {
        for (let i = 1; i < packet.length; i++) {
          let lastTdPosition = packet[i].pop() - 1;
          let lastA = table.querySelectorAll("a")[lastTdPosition];
          packet[i].push(lastA.innerText, newhref(lastA.parentElement));
        }
      } else {
        packet.splice(1);
      }
      console.log("!!!---packet---!!!");
      console.log(packet);
      console.log(allUnterOrdner);
      ordnerRename(packet, allUnterOrdner);
    }
  }
}
function optionAbbrechen(klasse, position) {
  console.log("!!!---optionAbbrechen---!!!");
  // Werte#
  if (klasse !== "neue-zeile") {
    text = memory[filter(klasse)][0];
    unterwahlTest = memory[filter(klasse)][1];
    // Function
    a = document.createElement("a");
    a.innerText = text;
    AktuelTd.innerHTML = "";
    AktuelTd.appendChild(a);
    if (unterwahlTest === "unterwahl") {
      if (!AktuelTd.classList.contains("unterwahl")) {
        AktuelTd.classList.add("unterwahl");
      }
    } else {
      if (AktuelTd.classList.contains("unterwahl")) {
        AktuelTd.classList.remove("unterwahl");
      }
    }
    delete memory[klasse];
    zeilenButtonLöschen();
    AktuelTd.removeAttribute("style");
    AktuelTr.removeAttribute("style");
    zeilenOptionEnd();
    reload();
  }
}

//Zeilen
function newZeileOben(klasse, position) {
  console.log("!!!---newZeileOben: " + klasse);
  optionAbbrechen(klasse);
  newZeileErzeugen(position - 1);
  AktuelTr = table.getElementsByTagName("tr")[position];
  AktuelTr.insertAdjacentElement("beforebegin", tr);
  zeilenButtonLöschen();
  klapBox();
}
function newZeileUnten(klasse, position) {
  console.log("!!!---newZeileUnten: " + klasse);
  optionAbbrechen(klasse);
  newZeileErzeugen(position + 1);
  AktuelTr = table.getElementsByTagName("tr")[position];
  AktuelTr.insertAdjacentElement("afterend", tr);
  zeilenButtonLöschen();
  klapBox();
}
function newZeileErzeugen(position) {
  console.log("!!!---newZeileErzeugen---!!!");
  tr = document.createElement("tr");
  td = document.createElement("td");
  tr.appendChild(td);
  for (let i = 1; i < 6; i++) {
    td = document.createElement("td");
    hinzufügPosition = document.createElement("button");
    hinzufügPosition.setAttribute(
      "onclick",
      "newSpalte('" + i + "', " + position + ")"
    );
    hinzufügPosition.innerText = "Hinzufügen";
    td.appendChild(hinzufügPosition);
    tr.appendChild(td);
  }
}
function newSpalte(zeile, position) {
  console.log("!!!---newSpalte: " + (position - 1));
  let alleZufügButtons = table.querySelectorAll("[onclick*='newSpalte']");
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
function löschZeile(klasse, position) {
  console.log("löschZeile " + klasse);
  AktuelTr = table.getElementsByTagName("tr")[position];
  AktuelTd = table
    .getElementsByTagName("tr")
    [position].querySelector('td[class*="' + klasse + '"]');
  ordnerLöschen(
    AktuelTr.querySelector('[class="textarea-' + klasse + '"]').value,
    filter(newhref(AktuelTd))
  );
  AktuelTr.parentElement.removeChild(AktuelTr);
  klapBox();
  reload();
  tableAuslesen();
}

//Funktion
function zeilenButtonLöschen() {
  console.log("!!!---zeilenButtonLöschen---!!!");
  divs = table.querySelectorAll("div");
  for (let i = 0; i < divs.length; i++) {
    divs[i].parentElement.removeChild(divs[i]);
  }
}
function reload() {
  console.log("!!!---reload---!!!");
  //werte
  let alleA = table.querySelectorAll("a");
  let vorNummer = 0;
  allclass = [];
  let alteNummer = 10;
  let runde = 1;
  let unterRunde = 0;
  zähler = 0;
  for (let i = 0; i < alleA.length; i++) {
    // 1. Überschrift
    let text = alleA[i].innerText;
    // 2. position
    nummer = tdPosition(i + 1);
    if (alleA[i].parentElement.parentElement.nextElementSibling !== null) {
      // Tabelle Zurecht Rücken
      //Unterwahl
      if (
        alleA[i].parentElement.classList.contains("unterwahl") &&
        !unterRunde
      ) {
        if (
          nummer <
          tdPosition(
            Number(
              alleA[i].parentElement.parentElement.nextElementSibling
                .firstElementChild.innerText
            )
          )
        ) {
          runde = 4;
          unterClass =
            alleA[i].parentElement.classList[
              alleA[i].parentElement.classList.length - 1
            ];
          unterRunde = 1;
        }
      }
      if (
        unterRunde &&
        alleA[i].parentElement.parentElement.nextElementSibling
          .querySelector("[class]")
          .classList.contains(unterClass)
      ) {
        for (let j = 0; j < 1; j++) {
          schiebObjekt =
            alleA[
              i
            ].parentElement.parentElement.nextElementSibling.querySelector(
              "[class]"
            );
          zähler += 1;
          allUnterOrdner[zähler].push(
            schiebObjekt.parentElement.firstChild.innerText
          );

          schiebObjekt.insertAdjacentElement(
            "afterend",
            schiebObjekt.previousElementSibling
          );
        }
      } else {
        unterRunde = 0;
      }
      //Ordner
      // runde 3
      if (runde === 2 && endNummer + 1 >= nummer) {
        runde = 3;
      }
      // runde 2
      if (runde === 2) {
        if (highNummer > nummer) {
          diferenz = 0;
          while (endNummer + 1 !== tdPosition(i + 1)) {
            alleA[i].parentElement.insertAdjacentElement(
              "afterend",
              alleA[i].parentElement.previousElementSibling
            );
            diferenz += 1;
          }
          highNummer = nummer;
        } else {
          for (let j = 0; j < diferenz; j++) {
            alleA[i].parentElement.insertAdjacentElement(
              "afterend",
              alleA[i].parentElement.previousElementSibling
            );
          }
        }
      }
      // runde 1
      if (runde && alteNummer + 1 < nummer) {
        diferenz = 0;
        while (alteNummer + 1 !== tdPosition(i + 1)) {
          alleA[i].parentElement.insertAdjacentElement(
            "afterend",
            alleA[i].parentElement.previousElementSibling
          );
          diferenz += 1;
        }
        endNummer = alteNummer;
        highNummer = nummer;
        runde = 2;
      }
      alteNummer = nummer;
      nummer = tdPosition(i + 1);
    }
    //3. class
    if (vorNummer < nummer) {
      // kein Wechsel
      vorNummer = nummer;
      allclass.push(" " + filter2(text));
    } else {
      // oberKategorie Wechsel
      allclass.splice(nummer - 1);
      allclass.push(" " + filter2(text));
      vorNummer = nummer;
    }
    ausgabeAllclass = "";
    for (let i = 0; i < allclass.length; i++) {
      ausgabeAllclass += "" + allclass[i];
    }
    // 4. Unterclasse
    if (alleA[i].parentElement.classList.contains("unterwahl")) {
      unterwahl = ", 'unterwahl'";
      unterKlass = "unterwahl";
    } else {
      unterwahl = "";
      unterKlass = "";
    }
    // Attribute Hinzufügen
    // Onclick
    if (
      alleA[i].parentElement.parentElement.firstElementChild.innerHTML === "178"
    ) {
      console.log("Start");
    }
    alleA[i].parentElement.removeAttribute("class");
    alleA[i].parentElement.setAttribute(
      "ondblclick",
      "option('" + filter2(text) + "', " + (i + 1) + unterwahl + ")"
    );
    // Klasse
    alleA[i].parentElement.setAttribute("class", unterKlass + ausgabeAllclass);
    // Link Korektur
    newHref = newhref(alleA[i].parentElement);
    alleA[i].parentElement.querySelector("a").href = newHref;
  }
  klapBox();
}

function goLeft(klasse, position) {
  classBox = classBoxen(klasse, position);
  for (let i = 0; i < classBox.length; i++) {
    classBox[i].insertAdjacentElement(
      "afterend",
      classBox[i].previousElementSibling
    );
    if (classBox[0].previousElementSibling.hasChildNodes()) {
      classBox[0].querySelector(
        '[class="pfeilLeft-' + klasse + '"]'
      ).disabled = true;
    }
    if (classBox[i].nextElementSibling !== null) {
      classBox[0].querySelector(
        '[class="pfeilRight-' + klasse + '"]'
      ).disabled = false;
    }
  }
}
function goRight(klasse, position) {
  classBox = classBoxen(klasse, position);
  for (let i = 0; i < classBox.length; i++) {
    classBox[i].insertAdjacentElement(
      "beforebegin",
      classBox[i].nextElementSibling
    );
    if (classBox[i].nextElementSibling === null) {
      classBox[0].querySelector(
        '[class="pfeilRight-' + klasse + '"]'
      ).disabled = true;
    }
    if (!classBox[0].previousElementSibling.hasChildNodes()) {
      classBox[0].querySelector(
        '[class="pfeilLeft-' + klasse + '"]'
      ).disabled = false;
    }
  }
}
function goTop(klasse, position) {
  console.log("!!!---goTop---!!!");
  tdNummer = tdPosition(position);
  // ClassBox Fühlen
  classBox = classBoxen(klasse, position);
  if (
    classBox[0].parentElement.previousElementSibling.querySelector("a")
      .parentElement.classList[0] !== "unterwahl"
  ) {
    obenIstUnterwahl = 1;
  } else {
    obenIstUnterwahl = 0;
  }
  obenBoxClass =
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
  unterAllclassBox = table.getElementsByClassName(obenBoxClass);
  while (
    classBox[0].parentElement.previousElementSibling
      .querySelector("a")
      .parentElement.classList.contains(obenBoxClass)
  ) {
    for (let i = 0; i < classBox.length; i++) {
      classBox[i].parentElement.insertAdjacentElement(
        "afterend",
        classBox[i].parentElement.previousElementSibling
      );
    }
  }
  if (
    classBox[0].parentElement.previousElementSibling.querySelectorAll("tr")
      .length !== 0
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
  buttonLöschen = classBox[0].getElementsByTagName("button");
  for (let i = 0; i < buttonLöschen.length; i++) {
    buttonLöschen[i].parentElement.removeChild(buttonLöschen[i]);
  }
  newPosition = classBox[0].parentElement.firstElementChild.innerText;
  einAusbutton(classBox[0], klasse, newPosition);
  //Kategorie
  // unterwahlButton
  unterwahlButton(classBox[0], klasse, newPosition);
  //Richtungspfeile
  allPfeile(classBox[0], klasse, newPosition);
  //Fokus
  classBox[0].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute(
    "id",
    "Offen"
  );
  window.location = "./verzeichnis.html#Offen";
  document.getElementById("Offen").removeAttribute("id");
}
function goBottom(klasse, position) {
  console.log("!!!---goBottom---!!!");
  // ClassBox Fühlen
  classBox = classBoxen(klasse, position);
  unterBoxClass = filter2(
    classBox[
      classBox.length - 1
    ].parentElement.nextElementSibling.querySelector("a").innerText
  );
  // unterAllclassBox = table.querySelectorAll("." + unterBoxClass)
  while (
    classBox[classBox.length - 1].parentElement.nextElementSibling
      .querySelector("a")
      .parentElement.classList.contains(unterBoxClass)
  ) {
    for (let i = classBox.length - 1; i > -1; i -= 1) {
      classBox[i].parentElement.insertAdjacentElement(
        "beforebegin",
        classBox[i].parentElement.nextElementSibling
      );
    }
    if (
      classBox[classBox.length - 1].parentElement.nextElementSibling === null
    ) {
      break;
    }
  }
  if (classBox[classBox.length - 1].parentElement.nextElementSibling === null) {
    pfeilBottom.disabled = true;
  }
  if (
    classBox[0].parentElement.previousElementSibling.querySelectorAll("tr")
      .length === 0
  ) {
    classBox[0].parentElement.querySelector(
      '[class="pfeilTop-' + klasse + '"]'
    ).disabled = false;
  }
  klapBox();
  buttonLöschen = classBox[0].getElementsByTagName("button");
  for (let i = 0; i < buttonLöschen.length; i++) {
    buttonLöschen[i].parentElement.removeChild(buttonLöschen[i]);
  }
  newPosition = classBox[0].parentElement.firstElementChild.innerText;
  einAusbutton(classBox[0], klasse, newPosition);
  //Kategorie
  // unterwahlButton
  unterwahlButton(classBox[0], klasse, newPosition);
  //Richtungspfeile
  allPfeile(classBox[0], klasse, newPosition);
  classBox[0].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute(
    "id",
    "Offen"
  );
  window.location = "./verzeichnis.html#Offen";
  document.getElementById("Offen").removeAttribute("id");
}

//Zwischen Funktionen

function newhref(AktuelTd) {
  href2 = "..";
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
  let classBox = [];
  AktuelTr = table.getElementsByTagName("tr")[position];
  nextTr = AktuelTr;
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
  td = table.getElementsByTagName("tr")[positon].querySelector("td[class]");
  for (let i = 0; i < td.parentElement.children.length; i++) {
    if (td.parentElement.children.item(i) === td) {
      return i;
    }
  }
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

function start() {
  const myInterval = setInterval(myTimer, 1000);
  allHref = table.getElementsByTagName("a");
  let AZähler = 0;
  function myTimer() {
    window.open(allHref[AZähler].href);
    AZähler += 1;
    if (AZähler === allHref.length) {
      clearInterval(myInterval);
    }
  }
  function Stop() {
    clearInterval(myInterval);
  }
}
