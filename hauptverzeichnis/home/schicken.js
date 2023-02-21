function tableAuslesen() {
  console.log("!!!!!!!!!!-------tableAuslesen-------!!!!!!!!!!!");
  newlist = {};
  table = document.getElementById("Verzeichnis");
  tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td");
    nummer = 0;
    for (let j = 0; j < td.length; j++) {
      if (td[j].getElementsByTagName("a").length === 1) {
        let aText = td[j].querySelector("a").innerText;
        let ahref = td[j].querySelector("a").href;
        klass = 0;
        let klassen = td[j].classList;
        if (klassen.contains("unterwahl")) {
          klass = 1;
        }
        //Pfad Scheiden
        ahrefZahl = ahref.search("hauptverzeichnis/");
        ahref = filter(ahref.slice(ahrefZahl + 17));
        list(nummer, aText, ahref, klass);
        nummer += 1;
      } else if (td[j].innerText.includes(i)) {
        nummer += 1;
      } else {
        nummer += 1;
      }
    }
  }
  console.log(newlist);
  console.dir(newlist);
  schick(newlist);
}

function list(nummer, name, pfad, klass) {
  // console.log(
  //   'nummer: ' +
  //     nummer +
  //     '\nname: ' +
  //     name +
  //     '\npfad: ' +
  //     pfad +
  //     '\nklass: ' +
  //     klass,
  // )
  switch (nummer) {
    case 1:
      //naviliste 1
      newlist[name.toLowerCase(0)] = [name, pfad, {}, []];
      break;
    case 2:
      let nav2key1 = Object.keys(newlist)[Object.keys(newlist).length - 1];
      //naviliste 2
      if (klass === 0) {
        newlist[nav2key1][2][name.toLowerCase(0)] = [name, pfad, {}, []];
      } else {
        newlist[nav2key1][3].push([name, pfad]);
      }
      break;
    case 3:
      let nav3key1 = Object.keys(newlist)[Object.keys(newlist).length - 1];
      let nav3Ele2 = newlist[nav3key1][2];
      let nav3key2 = Object.keys(nav3Ele2)[Object.keys(nav3Ele2).length - 1];

      //naviliste 3
      if (klass === 0) {
        newlist[nav3key1][2][nav3key2][2][name.toLowerCase(0)] = [
          name,
          pfad,
          {},
          [],
        ];
      } else {
        newlist[nav3key1][2][nav3key2][3].push([name, pfad]);
      }
      break;
    case 4:
      let nav4key1 = Object.keys(newlist)[Object.keys(newlist).length - 1];
      let nav4Ele1 = newlist[nav4key1][2];
      let nav4key2 = Object.keys(nav4Ele1)[Object.keys(nav4Ele1).length - 1];
      let nav4Ele2 = newlist[nav4key1][2][nav4key2][2];
      let nav4key3 = Object.keys(nav4Ele2)[Object.keys(nav4Ele2).length - 1];

      //naviliste 4
      if (klass === 0) {
        newlist[nav4key1][2][nav4key2][2][nav4key3][2][name.toLowerCase(0)] = [
          name,
          pfad,
          {},
          [],
        ];
      } else {
        newlist[nav4key1][2][nav4key2][2][nav4key3][3].push([name, pfad]);
      }
      break;
    case 5:
      let nav5key1 = Object.keys(newlist)[Object.keys(newlist).length - 1];
      let nav5Ele1 = newlist[nav5key1][2];
      let nav5key2 = Object.keys(nav5Ele1)[Object.keys(nav5Ele1).length - 1];
      let nav5Ele2 = newlist[nav5key1][2][nav5key2][2];
      let nav5key3 = Object.keys(nav5Ele2)[Object.keys(nav5Ele2).length - 1];
      let nav5Ele3 = newlist[nav5key1][2][nav5key2][2][nav5key3][2];
      let nav5key4 = Object.keys(nav5Ele3)[Object.keys(nav5Ele3).length - 1];

      //naviliste 5
      if (klass === 0) {
        newlist[nav5key1][2][nav5key2][2][nav5key3][2][nav5key4][2][
          name.toLowerCase(0)
        ] = [name, pfad, {}, []];
      } else {
        newlist[nav5key1][2][nav5key2][2][nav5key3][2][nav5key4][3].push([
          name,
          pfad,
        ]);
      }
      break;
  }
}
function filter(ausdruck) {
  ausgabe = ausdruck;
  nochmal: while (true) {
    switch (0) {
      case 0:
        if (ausgabe.includes("%C3%A4", "ä")) {
          ausgabe = ausgabe.replace("%C3%A4", "ä");
          continue nochmal;
        }
      case 0:
        if (ausgabe.includes("%C3%B6", "ö")) {
          ausgabe = ausgabe.replace("%C3%B6", "ö");
          continue nochmal;
        }
      case 0:
        if (ausgabe.includes("%C3%BC", "ü")) {
          ausgabe = ausgabe.replace("%C3%BC", "ü");
          continue nochmal;
        }
      case 0:
        if (ausgabe.includes("%20", " ")) {
          ausgabe = ausgabe.replace("%20", " ");
          continue nochmal;
        }
    }
    return ausgabe;
  }
}

//Funtionen
function eigen(objeckt) {
  zahl = 0;
  console.info("------keys-----");
  for (key of Object.keys(objeckt)) {
    console.info(zahl + ": " + key);
    zahl += 1;
  }
}

//Code
function schick(ausgabe) {
  url = "http://localhost:8001";
  let request = new Request(url, {
    method: "post",
    credentials: "omit",
    headers: {
      "accept-encoding": "gzip, deflate",
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ausgabe),
  });
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      console.log("Server sagt:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function ordnerLöschen(text, href) {
  console.log("!!!---ordnerLöschen---!!!");
  console.log(AktuelTr);
  console.log(text);
  console.log(href);
  let packet = [text, href];

  url = "http://localhost:8003";
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
    body: JSON.stringify(packet),
  });
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      console.log("Server sagt:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function ordnerHinzufügen(text, href) {
  console.log("!!!---ordnerHinzufügen---!!!");
  console.log(text);
  console.log(href);
  let packet = [text, href];

  url = "http://localhost:8002";
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
    body: JSON.stringify(packet),
  });
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      console.log("Server sagt:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function ordnerRename(packet, allUnterOrdner) {
  url = "http://localhost:8004";
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
    body: JSON.stringify([packet, allUnterOrdner]),
  });
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      console.log("Server sagt:", data[0]);
      console.log("moveOrdner");
      console.log(data[1]);
      console.log("moveAllOrdner");
      console.log(data[2]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
