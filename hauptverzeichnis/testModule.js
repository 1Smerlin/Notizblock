// Variable
const main = document.querySelector("main");
const pagePath = window.location.pathname.slice(
  window.location.pathname.search("hauptverzeichnis")
);
export const locationPath = determineLocation();

// read the directory

export async function fileDirectory() {
  let requestURL = locationPath + "verzeichnis.json";
  try {
    let response = await fetch(requestURL);
    let directory = await response.json();
    return directory;
  } catch (error) {
    console.error("Fehler beim Laden der Verzeichnisdatei:", error);
  }
}

// Location
export function determineLocation() {
  let path = "";
  for (let i = 0; i < pagePath.split("/").length - 2; i++) {
    path += "../";
  }
  path += "./";
  return path;
}

// Filter
export function filter(ausdruck) {
  let ausgabe = ausdruck;
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

export function sentenceBreakFilter(ausdruck) {
  ausgabe = ausdruck;
  while (ausgabe.includes("\n")) {
    ausgabe = ausgabe.replace("\n", "");
  }
  return ausgabe;
}

// Fokus
export function seekFocus() {
  if (main.classList.contains("Focus")) {
    let findFocus = main;
    return findFocus;
  } else {
    let findFocus = main.getElementsByClassName("Focus")[0];
    if (findFocus === undefined) {
      findFocus = document.getElementsByClassName("Focus")[0];
      return findFocus;
    } else {
      return findFocus;
    }
  }
}

// construction Elements
export function NewInput(
  divId,
  content,
  func1,
  func2,
  inputID = "textInput",
  textareaClass = "textarea_for_overwrite"
) {
  let div = document.createElement("div");
  div.id = divId;
  // cancelButton
  let cancelButton = document.createElement("button");
  cancelButton.setAttribute("onclick", func1);
  cancelButton.id = "canselButton";
  let img = document.createElement("img");
  img.setAttribute("src", locationPath + "../icons/svg/cancel_black_24dp.svg");
  cancelButton.appendChild(img);
  // validateButton
  let validateButton = document.createElement("button");
  validateButton.setAttribute("onclick", func2);
  validateButton.id = "validateButton";
  img = document.createElement("img");
  img.setAttribute("src", locationPath + "../icons/svg/check_black_24dp.svg");
  validateButton.appendChild(img);
  //writeTextarea
  let textarea = document.createElement("textarea");
  textarea.classList.add(textareaClass);
  textarea.setAttribute(
    "onkeydown",
    "useKeyButton(this, '" +
    func1.split("(")[0] +
    "', '" +
    func2.split("(")[0] +
    "')"
  );
  textarea.id = inputID;
  (textarea.value = content),
    //Hinzufügen
    div.appendChild(cancelButton);
  div.appendChild(textarea);
  div.appendChild(validateButton);
  return div;
}

export function useKeyButton(keyButton, func1, func2) {
  document.onkeydown = function (e) {
    switch (e.code) {
      case "Enter":
        if (!e.shiftKey) {
          e.preventDefault();
          document.onkeydown = null;
          window[func2](keyButton);
        }
        break;
      case "Escape":
        e.preventDefault();
        document.onkeydown = null;
        window[func1](1);
        break;
    }
  };
}

export function newSpalt(body) {
  for (let i = 0; i < body.children.length; i++) {
    let td = document.createElement("td");
    body.children[i].appendChild(td);
  }
}

export function selectionBar(array) {
  let selectDiv = document.createElement("div");
  selectDiv.id = "selectDiv";

  for (let i = 0; i < array.length; i++) {
    let button = document.createElement("button");
    button.id = "select-" + i;

    if (array[i][0]) {
      let img = document.createElement("img");
      img.setAttribute("src", locationPath + array[i][1]);
      button.appendChild(img);
    } else {
      button.innerText = array[i][1]
    }

    selectDiv.appendChild(button);
    button.addEventListener("click", function () {
      array[i][2]();
      window.removeEventListener("keydown", handleKeyDown);
      controller.removeChild(document.getElementById("selectDiv"));
    });
  }
  controller.appendChild(selectDiv);
  window.addEventListener("keydown", handleKeyDown)
  function handleKeyDown(event) {
    event.preventDefault()
    let numberRegex = /[1-9]/;
    let otherRegex = /Escape/;

    if (numberRegex.test(event.key)) {
      if (array.length >= event.key) {
        array[event.key - 1][2]()
      }
      window.removeEventListener("keydown", handleKeyDown);
      controller.removeChild(document.getElementById("selectDiv"));
    } else if (otherRegex.test(event.key)) {
      window.removeEventListener("keydown", handleKeyDown);
      controller.removeChild(document.getElementById("selectDiv"));
    }
  }
}

// function
export function writeFieldClose() {
  if (document.getElementById("TextInput") !== null) {
    textWriteCancel();
  }
}

// Tools
export function screen() {
  //Screen Breite und Höhe
  let grAn = document.createElement("div");
  grAn.id = "screenGröße";
  let gs = grAn.style;
  gs.position = "fixed";
  gs.left = "0px";
  gs.top = "0px";
  gs.border = "black 5px ridge";
  gs.borderRadius = "10px";
  gs.backgroundColor = "white";

  document.body.appendChild(grAn);

  //Seiten Aktualisierung
  setInterval(() => {
    let sw = window.screen.width;
    let sh = window.screen.height;
    let ow = window.outerWidth;
    let oh = window.outerHeight;
    let iw = window.innerWidth;
    let ih = window.innerHeight;
    let anzeige = document.querySelector("#screenGröße");
    anzeige.style.width = "20%";
    anzeige.style.height = "20%";
    anzeige.style.borderWidth = "0.5vw";
    anzeige.style.borderRadius = "0.5vw";
    anzeige.style.fontSize = "1vw";
    anzeige.innerHTML =
      "Bildschirm: " +
      sw +
      " B x " +
      sh +
      " H" +
      "<br/>" +
      "Fenster: " +
      ow +
      " B x " +
      oh +
      " H" +
      "<br/>" +
      "Ansichtsfenster: " +
      iw +
      " B x " +
      ih +
      " H" +
      "<br/>" +
      document.location;
  }, 100);
}



// simple code

export function childIndex(element) {
  let position = Array.from(element.parentElement.children).indexOf(element)
  return position;
}