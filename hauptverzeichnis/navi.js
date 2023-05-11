import { filter, determineLocation, fileDirectory } from "./testModule.js";
//constants values
const main = document.querySelector("main");
const PORT = 8000;
const pagePath = window.location.pathname.slice(
  window.location.pathname.search("hauptverzeichnis")
);
const locationPath = determineLocation();
let navlist;

async function asyncLoaderSequence() {
  navlist = await fileDirectory();
  navigation();
}

// loader sequence
loaderSequence();
function loaderSequence() {
  faviconIcon();
  asyncLoaderSequence();
}

//Favicon icon
function faviconIcon() {
  let link = document.createElement("link");
  link.setAttribute("rel", "shortcut icon");
  link.setAttribute("href", locationPath + "../icons/png/favicon.ico");
  link.setAttribute("type", "image/x-icon");
  document.querySelector("link").insertAdjacentElement("beforebegin", link);
}

function navigation() {
  let pathSection = pagePath.split("/");
  for (let i = 0; i < pathSection.length; i++) {
    pathSection[i] = filter(pathSection[i]);
  }
  navigationBar(navlist);
  function navigationBar(navlist) {
    if (pathSection[0] === "hauptverzeichnis") {
      let navBarNumber = 0;
      let header = document.createElement("header");
      let actNav = navlist;
      for (let i = 0; i < pagePath.split("/").length - 1; i++) {
        if (Object.keys(actNav).length !== 0) {
          leiste(actNav, pathSection[i + 1]);
          if (![pathSection[i + 1]][0].includes(".html")) {
            actNav = actNav[pathSection[i + 1]][2];
          }
        }
      }
      function leiste(navliste, pathSectionn) {
        navBarNumber++;
        let nav = document.createElement("nav");
        nav.classList.add("navi" + navBarNumber);
        let ul = document.createElement("ul");
        for (let key in navliste) {
          let li = document.createElement("li");
          let a = document.createElement("a");
          a.innerHTML = navliste[key][0];
          if (pathSectionn === navliste[key][0].toLowerCase()) {
            a.classList.add("aktuell");
          }
          a.href = locationPath + navliste[key][1];
          li.appendChild(a);
          if (navliste[key][3].length !== 0) {
            let div = document.createElement("div");
            let ul2 = document.createElement("ul");
            for (let i = 0; i < navliste[key][3].length; i++) {
              let li2 = document.createElement("li");
              let a2 = document.createElement("a");
              a2.innerHTML = navliste[key][3][i][0];
              a2.href = locationPath + navliste[key][3][i][1];
              li2.appendChild(a2);
              ul2.appendChild(li2);
              if (
                filter(pagePath.replace("hauptverzeichnis/", "")) ===
                navliste[key][3][i][1]
              ) {
                a2.classList.add("aktuell2");
                a.replaceWith(a2.cloneNode(true));
                let newLI = document.createElement("li");
                newLI.appendChild(a);
                ul2.insertBefore(newLI, ul2.children[0]);
              }
            }
            div.appendChild(ul2);
            li.appendChild(div);
            li.classList.add("wahl");
          }
          ul.appendChild(li);
        }
        nav.appendChild(ul);
        header.appendChild(nav);
      }
      let h1 = document.querySelector("h1");
      h1.insertAdjacentElement("beforebegin", header);
    }
  }
}
