import {
  seekFocus,
  NewInput,
  useKeyButton,
  writeFieldClose,
  locationPath,
  selectionBar,
} from "./testModule.js";
//Werte
const main = document.querySelector("main");
const PORT = 8000;
var jumpTo = [];
var FocusElement;
var Focus2Number;
// functions to global sccope
window.selectionBar = selectionBar;
window.attributeCancel = attributeCancel;
window.attributeValidate = attributeValidate;
window.useKeyButton = useKeyButton;
window.ElementGoLeftUp = ElementGoLeftUp;
window.ElementGoRightDown = ElementGoRightDown;
window.writeCancel = writeCancel;
window.textWriteCancel = textWriteCancel;
window.writeFinish = writeFinish;
window.textWriteFinish = textWriteFinish;
window.writeNewElement = writeNewElement;
window.pushElement = pushElement;
window.overwriteDelete = overwriteDelete;
// Elemente
window.ElementOptionLI = ElementOptionLI;
window.ElementOptionTD = ElementOptionTD;
window.ElementOptionTH = ElementOptionTH;
window.ElementOptionTable = ElementOptionTable;
window.ElementOptionUL = ElementOptionUL;
window.ElementOptionOL = ElementOptionOL;
// window.ElementOptionMethods = ElementOptionMethods;
// global variable
window.main = main;
window.logOutput = true;

//Code
loadPage();
function loadPage() {
  if (
    !window.location.href.includes("verzeichnis.html") &&
    !window.location.href.includes("senden.html")
  ) {
    OverwriteClick();
  }
}

var clickCount = 0;
var lastClickTime = 0;
//Schreiben
function OverwriteClick() {
  console.log("!!!---OverwriteClick---!!!");
  document.body.addEventListener("mousedown", (e) => {
    var now = new Date().getTime();
    if (clickCount === 0 || now - lastClickTime < 500) {
      clickCount++;
      lastClickTime = now;
      if (clickCount === 3) {
        if (
          document.getElementById("ElementSeletction") === null &&
          document.getElementById("ElementOption") === null &&
          document.getElementById("overriteFinishButton") === null
        ) {
          if (e.composedPath()[e.composedPath().length - 5].matches("main")) {
            console.log("!!!---open Option---!!!");
            openOverwriteOption(e.target);
          }
        }
      }
    } else {
      clickCount = 1;
      lastClickTime = now;
    }
  });
}
//Overwrite open the Overwrite Options
function openOverwriteOption(Element) {
  windowsItemSelection(Element);
  ElementOption();
  overriteFinish();
  attributeBar();
  overwritePointer();
  overwritePfeile();
  dropLink();
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
      if (e.target.matches("li")) {
        if (e.target.classList.contains("Focus2")) {
          let liPosition = Array.prototype.slice
            .call(e.target.parentElement.children)
            .indexOf(e.target);
          let targetedItem = FocusElement.children[liPosition];
          if (targetedItem.style.length < 2) {
            targetedItem.removeAttribute("style");
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
        let liPosition = Array.prototype.slice
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
        let liPosition = Array.prototype.slice
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
    let field = document.getElementsByClassName("textarea_for_overwrite");
    if (field.length === 0) {
      controller.removeChild(document.getElementById("ElementSeletction"));
      controller.removeChild(document.getElementById("ElementOption"));
      controller.removeChild(document.getElementById("overriteFinishButton"));
      controller.removeChild(document.getElementById("attributeBar"));
      controller.removeChild(document.getElementById("overwritePointer"));
      controller.removeChild(document.getElementById("overwritePfeile"));
      main.removeEventListener("dragover", handleDragOver);
      main.removeEventListener("drop", handleDrop);
      FocusElement = seekFocus();
      if (FocusElement !== undefined) {
        FocusElement.classList.remove("Focus");
      }
      reviseSend();
    }
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
    let field = document.getElementsByClassName("textarea_for_overwrite");
    if (field.length === 0) {
      main.addEventListener(
        "click",
        (e) => {
          console.log("!!!---overwritePointer click Auswahl---!!!");
          windowsItemSelection(e.target);
        },
        { once: true }
      );
    }
  });
}

//Overwrite ElementOptions
function ElementOption() {
  console.log("!!!---ElementOption---!!!");
  let overwriteElemente = {
    Write: [
      "Text",
      "HTML",
      "NewElement",
      "CopyElement",
      "PasteElement",
      "delete",
    ],
    ["Einzelne"]: ["li", "td", "th", "tr", "a", "p"],
  };
  let readyMadeOptions = {
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
        case "Text":
          overwriteText();
          break;
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
      let nextElementOption =
        e.target.parentElement.nextElementSibling.firstChild;
      while (nextElementOption.tagName === "TD") {
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

// overwrite Text
function overwriteText() {
  console.log("!!!---overwriteText---!!!");
  let div = NewInput(
    "TextInput",
    FocusElement.innerText,
    "textWriteCancel(1)",
    "textWriteFinish(this)"
  );
  FocusElement.replaceWith(div);
  document.getElementById("textInput").focus();
}

// write buttons
function textWriteCancel(exception) {
  console.log("!!!---textWriteCancel---!!!");
  document.getElementById("TextInput").replaceWith(FocusElement);
  if (exception !== undefined && exception === 1) {
    if (typeof jumpTo !== "undefined") {
      jumpTo = [];
    }
  }
}
function textWriteFinish(button) {
  console.log("!!!---textWriteFinish---!!!");
  FocusElement.innerText = button.parentElement.querySelector("textarea").value;
  document.getElementById("TextInput").replaceWith(FocusElement);
  if (typeof jumpTo !== "undefined" && jumpTo.length > 0) {
    windowsItemSelection(jumpTo[0][0]);
    if (jumpTo.shift()[1]) {
      overwriteText();
    }
  } else {
    windowsItemSelection(FocusElement);
  }
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
      jumpTo = [];
    }
  }
}
function writeFinish(button) {
  console.log("!!!---writeFinish---!!!");
  let text = button.parentElement.querySelector("textarea").value;
  text = text.replace('class="Focus"', "");
  FocusElement.innerHTML = text
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
  writeFieldClose();
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
  let text;
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
  writeFieldClose();
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
  textContent = textContent.replace('class="Focus"', "");
  console.log(textContent)
  let range = document.createRange();
  let textElement = range.createContextualFragment(textContent);
  button.parentElement.replaceWith(textElement);
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
  writeFieldClose();
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
  overwriteText();
}
function overwriteSection() {
  console.log("!!!---overwriteSection---!!!");
  writeFieldClose();
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
  overwriteText();
}
function overwriteDIV() {
  console.log("!!!---overwriteDIV---!!!");
  writeFieldClose();
  let divContainer = document.createElement("div");
  let h4 = document.createElement("h4");
  let div = document.createElement("div");
  jumpTo.push([h4, 1]);
  jumpTo.push([div, 0]);
  divContainer.appendChild(h4);
  divContainer.appendChild(div);
  if (
    document
      .getElementById("ElementSeletction")
      .getElementsByClassName("Focus2")[0] === undefined
  ) {
    FocusElement.appendChild(divContainer);
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
  overwriteText();
}

// Auflistung
// Table
function ElementOptionTableNumber() {
  writeFieldClose();
  // create input field
  if (document.getElementById("inputContainer") !== null) {
    ElementOptionTable(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "inputContainer",
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
  let tableLengthNumber = button.parentElement.querySelector("textarea").value;
  if (tableLengthNumber === "") {
    tableLengthNumber = 1;
  }
  document
    .getElementById("inputContainer")
    .parentElement.removeChild(document.getElementById("inputContainer"));
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
  overwriteText();
}

// UL
function ElementOptionULNumber() {
  writeFieldClose();
  if (document.getElementById("inputContainer") !== null) {
    ElementOptionUL(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "inputContainer",
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
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("inputContainer")
    .parentElement.removeChild(document.getElementById("inputContainer"));
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
  overwriteText();
}
// OL
function ElementOptionOLNumber() {
  writeFieldClose();
  if (document.getElementById("inputContainer") !== null) {
    ElementOptionOL(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "inputContainer",
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
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("inputContainer")
    .parentElement.removeChild(document.getElementById("inputContainer"));
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
  overwriteText();
}

// Individual items
// LI
function ElementOptionLINumber() {
  writeFieldClose();
  if (document.getElementById("inputContainer") !== null) {
    ElementOptionLI(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "inputContainer",
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
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("inputContainer")
    .parentElement.removeChild(document.getElementById("inputContainer"));
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
    for (let i = ListLengthNumber - 1; i >= 0; i--) {
      FocusElement.children[Focus2Number].insertAdjacentElement(
        "beforebegin",
        jumpTo[i][0]
      );
    }
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteText();
}

// TD
function ElementOptionTDNumber() {
  if (document.getElementById("HTMTDnput") !== null) {
    writeCancel();
  }
  if (document.getElementById("inputContainer") !== null) {
    ElementOptionTD(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "inputContainer",
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
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("inputContainer")
    .parentElement.removeChild(document.getElementById("inputContainer"));
  for (let i = 0; i < ListLengthNumber; i++) {
    let td = document.createElement("td");
    jumpTo.push([td, 1]);
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
    for (let i = ListLengthNumber - 1; i >= 0; i--) {
      console.count("runde");
      FocusElement.children[Focus2Number].insertAdjacentElement(
        "beforebegin",
        jumpTo[i][0]
      );
    }
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteText();
}

// TH
function ElementOptionTHNumber() {
  if (document.getElementById("HTMTHnput") !== null) {
    writeCancel();
  }
  if (document.getElementById("inputContainer") !== null) {
    ElementOptionTH(document.getElementById("validateButton"));
  } else {
    let div = NewInput(
      "inputContainer",
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
  let ListLengthNumber = button.parentElement.querySelector("textarea").value;
  if (ListLengthNumber === "") {
    ListLengthNumber = 1;
  }
  document
    .getElementById("inputContainer")
    .parentElement.removeChild(document.getElementById("inputContainer"));
  for (let i = 0; i < ListLengthNumber; i++) {
    let th = document.createElement("th");
    jumpTo.push([th, 1]);
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
    for (let i = ListLengthNumber - 1; i >= 0; i--) {
      FocusElement.children[Focus2Number].insertAdjacentElement(
        "beforebegin",
        jumpTo[i][0]
      );
    }
  }
  windowsItemSelection(jumpTo.shift()[0]);
  overwriteText();
}

function ElementOptionTR() {
  console.log("!!!---ElementOptionTR---!!!");
  writeFieldClose();
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
  writeFieldClose();
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
  overwriteText();
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
  attributeButton[attributeButtonPosition].click();
}
function ElementOptionP() {
  console.log("!!!---ElementOptionP---!!!");
  writeFieldClose();
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
  overwriteText();
}

// prefabricated elements
function ElementOptionMethods() {
  console.log("!!!---ElementOptionTable---!!!");
  writeFieldClose();
  let subclasses = ["Methoden", "Wirkung", "Syntax", "Beispiel"];
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
  overwriteText();
}
function ElementOptionTablesRow() {
  console.log("!!!---ElementOptionTablesRow---!!!");
  writeFieldClose();
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
    if (insideTbody !== undefined) {
      let selectArray = [[0, "td", () => createTableRow(1)], [0, "th", () => createTableRow(0)]]
      selectionBar(selectArray)
      function createTableRow(selectTrContent) {
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

        let tr = document.createElement("tr");
        for (let i = 0; i < tableRowLength; i++) {
          let td = document.createElement(itemSelection);
          tr.appendChild(td);
          jumpTo.push([td, 1]);
        }
        if (orientationElement !== undefined) {
          let trNumber = Array.prototype.slice
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
        windowsItemSelection(jumpTo.shift()[0]);
        overwriteText();
      }
    }
  }
}
function ElementOptionTablesColumn() {
  console.log("!!!---ElementOptionTablesColumn---!!!");
  writeFieldClose();
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
  } else {
    let selectArray = [[1, "../icons/svg/west_black_24dp.svg", () => createTableColumn(1)], [1, "../icons/svg/east_black_24dp.svg", () => createTableColumn(0)]]
    selectionBar(selectArray)
    function createTableColumn(selectDirection) {
      let orientationtNumber = Array.prototype.slice
        .call(orientationElement.parentElement.children)
        .indexOf(orientationElement);
      let allCells =
        orientationElement.parentElement.parentElement.parentElement.querySelectorAll(
          "tr"
        );

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
      windowsItemSelection(jumpTo.shift()[0]);
      overwriteText();
    }
  }
}





// Attribute bar
function attributeBar() {
  var FocusAttribute = FocusElement.getAttributeNames();
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
        if (document.getElementById("attributeBox") === null) {
          e.target.classList.add("Focus");
          //New Code
          let content = "";
          if (e.target.innerText !== "Hinzufügen") {
            let speziolAttribute = {
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
        if (!e.target.classList.contains("Focus")) {
          e.target.classList.add("Focus");
        }
        if (e.target.innerText !== "Löschen") {
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
    if (document.getElementById("attributeInput").value !== "") {
      let wert = document.getElementById("attributeInput").value;
      let attributeName = document
        .getElementById("attributeBar")
        .querySelector(".Focus").innerText;
      let pfadSearch =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname.slice(0, 18);
      if (attributeName === "href" && wert.includes(wert)) {
        wert = wert.replace(pfadSearch, locationPath);
      }
      FocusElement.setAttribute(attributeName, wert);
      attributeCancel();
      document
        .getElementById("attributeBar")
        .parentElement.removeChild(document.getElementById("attributeBar"));
      attributeBar();
    }
  } else {
    if (document.getElementById("attributeInput").value !== "") {
      let wert = document.getElementById("attributeInput").value;
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
  img.setAttribute("src", locationPath + "../icons/svg/north_black_24dp.svg");
  pfeilTop.appendChild(img);
  div.appendChild(pfeilTop);
  // Bottom
  let pfeilBottom = document.createElement("button");
  pfeilBottom.setAttribute("onclick", "ElementGoRightDown()");
  img = document.createElement("img");
  img.setAttribute("src", locationPath + "../icons/svg/south_black_24dp.svg");
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
// Drag and Drop
function dropLink() {
  console.log("!!!---dropLink---!!!");
  main.addEventListener("dragover", handleDragOver);
  main.addEventListener("drop", handleDrop);
}
function handleDragOver(event) {
  event.preventDefault();
}
function handleDrop(event) {
  if (event.target.tagName === "UL" || event.target.tagName === "OL") {
    event.preventDefault();
    let url = event.dataTransfer.getData("URL");
    insertLink(url, event.target);
  }
  if (event.target.tagName === "LI") {
    event.preventDefault();
    let url = event.dataTransfer.getData("URL");
    insertLink(url, event.target.parentElement);
  }
  if (event.target.tagName === "A") {
    if (event.target.parentElement.tagName === "LI") {
      event.preventDefault();
      let url = event.dataTransfer.getData("URL");
      insertLink(url, event.target.parentElement.parentElement);
    }
  }
  if (event.target.tagName === "TD") {
    event.preventDefault();
    let url = event.dataTransfer.getData("URL");
    insertLinkTD(url, event.target);
  }
}
function insertLink(url, dropInElement) {
  let title = url.split("/")[2];
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.innerText = title;
  a.href = url;
  li.appendChild(a);
  dropInElement.appendChild(li);
  windowsItemSelection(a);
  overwriteText();
}
function insertLinkTD(url, dropInElement) {
  let title = url.split("/")[2];
  let a = document.createElement("a");
  a.innerText = title;
  a.href = url;
  dropInElement.appendChild(a);
  windowsItemSelection(a);
  overwriteText();
}
// revise Send

function reviseSend() {
  console.log("!!!---reviseSend---!!!");
  let url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    (PORT + 5);
  let main2 = main.cloneNode(true);
  let ExtraButton = Array.prototype.slice.call(
    main2.getElementsByClassName("notSave")
  );
  for (let i = 0; i < ExtraButton.length; i++) {
    ExtraButton[i].parentElement.removeChild(ExtraButton[i]);
  }
  let deleteStyle = main2.querySelectorAll("[style]");
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
