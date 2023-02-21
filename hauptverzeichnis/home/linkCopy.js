let suchListe = function liste() {
  document
    .querySelectorAll(
      "button.yt-spec-button-shape-next.yt-spec-button-shape-next--text.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--size-m.yt-spec-button-shape-next--align-by-text"
    )[2]
    .click();
  block = document.body.getElementsByTagName("ytd-grid-playlist-renderer");
  ol2 = document.createElement("ol");
  div2 = document.createElement("div");
  div2.setAttribute("class", "h3");
  div = document.createElement("div");
  div.setAttribute("class", "h2");
  //Zählen
  ablist = 0;
  eiglist = 0;
  übers = 0;
  alvid = 0;
  for (i = 0; i < block.length; i++) {
    //Link erstellen
    console.log(i + 1);
    plname = block[i].querySelector("h3 a").innerHTML;
    console.log(plname);
    plhref = block[i].querySelector("yt-formatted-string#view-more a").href;
    console.log(plhref);
    plbesi = block[i].querySelector("yt-formatted-string#text a").innerHTML;
    console.log(plbesi);
    nummer = block[i].querySelector(
      "ytd-playlist-thumbnail yt-formatted-string.style-scope.ytd-thumbnail-overlay-side-panel-renderer"
    ).innerHTML;
    console.log(nummer);
    if (
      nummer ===
      '<!--css-build:shady--><yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>'
    ) {
      nummer = "0";
    }
    console.log("!!!!!-----Test-----!!!!!!");
    alvid += Number(nummer);
    console.log(alvid);
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerHTML = plname;
    console.log("der name " + plname);
    a.href = plhref;
    li.appendChild(a);
    li.innerHTML += " V: " + nummer;
    //sortieren
    console.log(plbesi === "Smerlin Hollender");
    if (plbesi === "Smerlin Hollender") {
      console.log(a.innerHTML.includes("-", 1));
      if (a.innerHTML.includes("-", 1)) {
        console.log(typeof ol !== "undefined");
        if (typeof ol !== "undefined") {
          h3.innerHTML += " :1 " + eiglist;
          section.appendChild(h3);
          div1 = document.createElement("div");
          div1.setAttribute("class", "h3");
          div1.appendChild(ol);
          section.appendChild(div1);
          console.log("neue Nummer " + eiglist);
          div.innerHTML +=
            "<!--ANCHOR " +
            block[i - eiglist].querySelector("h3 a").innerHTML +
            "-->";
          div.appendChild(section);
          eiglist = 0;
        }
        section = document.createElement("section");
        h3 = document.createElement("h3");
        h3.innerHTML = "Playlisten: " + plname;
        console.log("der name 2" + plname);
        ol = document.createElement("ol");
        ol.appendChild(li);
        übers++;
        eiglist++;
        console.log("kategiorie geht");
      } else {
        ol.appendChild(li);
        eiglist++;
        console.log("kategiorie geht nicht");
      }
      console.log("Besitz geht");
    } else {
      ol2.appendChild(li);
      ablist++;
      console.log("Besitz geht nicht");
    }
  }
  //Letzter Schriet
  h3.innerHTML += " :3 " + eiglist;
  section.appendChild(h3);
  eiglist = 0;
  div1 = document.createElement("div");
  div1.setAttribute("class", "h3");
  div1.appendChild(ol);
  section.appendChild(div1);
  div.innerHTML += "<!--ANCHOR 8-Melissa-->";
  div.appendChild(section);
  //abonierte liste Endeinpacken
  h32 = document.createElement("h3");
  h32.innerHTML = "Abonirte Playliste: " + ablist;
  section = document.createElement("section");
  section.appendChild(h32);
  div2.appendChild(ol2);
  section.appendChild(div2);
  div.innerHTML += "<!--ANCHOR Abonirte Playliste-->";
  div.appendChild(section);
  //große überschrift
  h2 = document.createElement("h2");
  alEig = block.length - übers;
  h2.innerHTML =
    "Alle Youtube Playlisten: " + alEig + " in " + übers + " Themenbereichen";
  h6 = document.createElement("h6");
  h6.innerHTML = "Alle Youtube videos: " + alvid;
  inhalt = div.innerHTML;
  div.innerHTML = "";
  div.appendChild(h6);
  div.innerHTML += inhalt;
  //Letztes Einpacken
  article = document.createElement("article");
  article.appendChild(h2);
  article.appendChild(div);
  //Ausgabe
  console.log("article");
  console.log(article);
  console.log(alvid);
  console.log("!!!---Copy---!!!");
  let copyText = document.createElement("textarea");
  copyText.value = article.outerHTML;
  document.body.appendChild(copyText);
  let inp = copyText;
  inp.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
};

// ANCHOR Anwendungen
//Youtube Playlisten link copie
let copybutton = document.getElementById("copiebutton");
copybutton.addEventListener("click", function (e) {
  console.log("!!!---Copy---!!!");
  let copyText = document.createElement("textarea");
  copyText.value = suchListe.toString() + "\nliste()";
  document.body.appendChild(copyText);
  let inp = copyText;
  inp.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
});

//Öffnen der Playlisten
function hinzufügen() {
  YoutubeBlock = document.querySelector("article+article");
  sectionDiv = YoutubeBlock.querySelectorAll("section > div");
  for (let i = 0; i < sectionDiv.length; i++) {
    if (sectionDiv[i].children.length !== 0) {
      let button = document.createElement("button");
      button.innerText = "Öffnen";
      button.classList.add("allURLOpen");
      sectionDiv[i].style.position = "relative";
      sectionDiv[i].firstElementChild.insertAdjacentElement(
        "beforebegin",
        button
      );
    }
  }
  YoutubeBlock.addEventListener("click", (a) => {
    if (a.target.matches("button")) {
      let link = a.target.parentElement.getElementsByTagName("a");
      for (let i = 0; i < link.length; i++) {
        window.open(link[i].href);
      }
    }
  });
}
hinzufügen();

function CopyToClipboard(text) {
  let copyText = document.createElement("textarea");
  copyText.value = text;
  document.body.appendChild(copyText);
  let inp = copyText;
  inp.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
}
