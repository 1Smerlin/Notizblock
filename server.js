//Module
const fs = require("fs");
const url = require("url");
const http = require("http");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const tool = require('./ToolModule.js');
const analy = require('./ToolAnalyse.js');

// Variablen
const PORT = 8000;
const folderLocation = "";
const vorlage = fs.readFileSync(folderLocation + "./vorlage/vorlage.html", { encoding: "utf8", flag: "r", });

// Debuging
analyseOutput = 1

// Testlauf
test = 0
writeTest = test
verzeichnisTest = test
moveTest = test
hinzufügTest = test
löschTest = test

// Server
// File Server
if (fs.existsSync(folderLocation + "./hauptverzeichnis")) {
  /*Server*/
  http
    .createServer(function (req, res) {
      var q = url.parse(req.url, true);
      var filename = "." + q.pathname;
      for (let i = 0; i < 2; i++) {
        filename = decodeURIComponent(filename);
      }
      fs.readFile(filename, function (err, data) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("404 Not Found");
        }
        dateiName = filename.split("/")[filename.split("/").length - 1];
        dateiTyp = dateiName.split(".");
        switch (dateiTyp[dateiTyp.length - 1]) {
          case "html":
            headers = { "Content-Type": "text/html" };
            res.writeHead(200, headers);
            break;
          case "css":
            headers = { "Content-Type": "text/css" };
            res.writeHead(200, headers);
            break;
          case "js":
            headers = { "Content-Type": "text/javascript" };
            res.writeHead(200, headers);
            break;
          case "json":
            // headers = { 'Content-Type': 'application/json' }
            headers = { "Content-Type": "text/json" };
            res.writeHead(200, headers);
            break;
          case "svg":
            // headers = { 'Content-Type': 'text/xml' }
            headers = { "Content-Type": "image/svg+xml" };
            res.writeHead(200, headers);
            break;
          // default:
          //   headers = { 'Content-Type': 'text/html' }
          // res.writeHead(200, headers)
          //   break
        }
        res.write(data);
        return res.end();
      });
    })
    .listen(PORT, () => {
      analy.log("Server Port " + PORT + " running!")
    });


  //verzeichnis
  //Variablen
  const verzeichnis = express();

  //Extra
  verzeichnis.use(express.urlencoded({ extended: true }));
  verzeichnis.use(express.json());
  verzeichnis.use(cors());
  verzeichnis.options("*", cors());
  //Extra

  const upload = multer({
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });

  verzeichnis.post("/", upload.none(), (req, res) => {
    analy.log("!!!!!Directory!!!!!");
    navlist = req.body[0];
    moveFileArray = req.body[1];
    changenFile = req.body[2];
    // 1. !!!---Directory structure---!!!
    analy.log("1.!!!---Directory structure---!!!");
    if (!verzeichnisTest) {
      analy.log("!!!---Neues Verzeichnis Ausgeführt", folderLocation + "./hauptverzeichnis/verzeichnis.json");
      if (!writeTest) {
        fs.writeFileSync(folderLocation + "./hauptverzeichnis/verzeichnis.json", JSON.stringify(navlist));
      }
    }


    // 2. !!!---changingFile---!!!
    analy.log("!!!---changingFile---!!!");
    switch (changenFile[0]) {
      case 0:
        if (changenFile[1].length) {
          addNewWebsite(changenFile[1])
        }
        break;
      case 1:
        deleteWebsite(changenFile[1])
        break;
      case 2:
        deleteWebsiteComplet(changenFile[1])
        break;
    }


    // add File
    function addNewWebsite(changingFile) {
      analy.log("!!!---hinzufügen---!!!");
      changingFile = addPath(changingFile)
      addingName = changingFile[0][2]
      addingURL = changingFile[0][3]
      analy.log(addingName);
      analy.log(addingURL);
      ordner = urlSchnitt(addingURL);
      urOrdner = urlSchnitt(ordner);
      if (!hinzufügTest) {
        if (fs.existsSync(urOrdner)) {
          if (!fs.existsSync(addingURL)) {
            tool.Ordner(ordner)
            pfad = pathLocation(addingURL)
            analy.log("!!!---Neues Webseite Ausgeführt", addingURL);
            if (!writeTest) {
              fs.writeFileSync(addingURL, newWebsite(addingName, pfad));
            }
            analy.log("Server: Datei:" + addingURL + " wurde erstellt");
          } else {
            analy.log("Server: Datei:" + addingURL + " Existiert bereits");
          }
        } else {
          analy.log("Server: urOrdner:" + urOrdner + " Existiert nicht");
        }
      } else {
        analy.log("Code Inaktiv");
        analy.log("Servertest:hinzufüg ausgabe:" + addingURL);
      }
    }


    // delete File
    // function deleteWebsite(changingFile) { }
    function deleteWebsite(changingFile) {

      let movePacket = moveFileArray[0];
      let allFile = moveFileArray[1];
      movePacket = addPath(movePacket)
      allFile = addPath(allFile)
      changingURLRewrite(movePacket)
      changingURLRewrite(allFile)
      analy.log(movePacket)
      analy.log(allFile)
      // all Files overwrite
      overwriteAllFile(allFile)
      // move all Files
      moveAllFile(movePacket)

      analy.log("!!!!!-----lösch-----!!!!!");
      changingFile = addPath(changingFile)
      addingName = changingFile[0][0]
      addingURL = changingFile[0][1]
      analy.log(addingName);
      analy.log(addingURL);

      ordner = urlSchnitt(addingURL);
      ordnerName = OrdnerName(addingURL);
      dateiName = DateiName(addingURL);
      typName = DateiTyp(addingURL);
      if (!löschTest) {
        if (fs.existsSync(ordner)) {
          if (ordnerName !== dateiName) {
            tool.Ordner(folderLocation + "./save/" + ordnerName);
            tool.copyFileSync(addingURL, folderLocation + "./save/" + ordnerName + "/" + dateiName + "." + typName);
            tool.löschDatei(addingURL);
            analy.log("Server: Datei:" + addingName + " wurde geslöscht");
          } else {
            tool.copyFolderRecursiveSync(ordner, folderLocation + "./save");
            tool.löschOrdner(ordner);
            analy.log("Server: Ordner und Datei:" + addingName + " wurde geslöscht");
          }
        } else {
          analy.log("Hallo Client von Port " + (PORT + 1) + "! " + addingName + " Existiert nicht");
        }
      } else {
        analy.log("ServerTest: Löschen ausgabe:" + addingName);
      }
    }
    function deleteWebsiteComplet(changingFile) {
      analy.log("!!!!!-----lösch alles-----!!!!!");
      changingFile = addPath(changingFile)
      addingName = changingFile[0][0]
      addingURL = changingFile[0][1]
      analy.log(addingName);
      analy.log(addingURL);

      ordner = urlSchnitt(addingURL);
      ordnerName = OrdnerName(addingURL);
      dateiName = DateiName(addingURL);
      typName = DateiTyp(addingURL);
      if (!löschTest) {
        if (fs.existsSync(ordner)) {
          if (ordnerName !== dateiName) {
            tool.Ordner(folderLocation + "./save/" + ordnerName);
            tool.copyFileSync(addingURL, folderLocation + "./save/" + ordnerName + "/" + dateiName + "." + typName);
            tool.löschDatei(addingURL);
            analy.log("Server: Datei:" + addingName + " wurde geslöscht");
          } else {
            tool.copyFolderRecursiveSync(ordner, folderLocation + "./save");
            tool.löschOrdner(ordner);
            analy.log("Server: Ordner und Datei:" + addingName + " wurde geslöscht");
          }
        } else {
          analy.log("Hallo Client von Port " + (PORT + 1) + "! " + addingName + " Existiert nicht");
        }
      } else {
        analy.log("ServerTest: Löschen ausgabe:" + addingName);
      }
    }


    // 3. !!!---Move Files---!!!
    analy.log("!!!---Move Files---!!!");
    let movePacket = moveFileArray[0];
    let allFile = moveFileArray[1];
    movePacket = addPath(movePacket)
    allFile = addPath(allFile)
    changingURLRewrite(movePacket)
    changingURLRewrite(allFile)
    analy.log(movePacket)
    analy.log(allFile)
    if (!moveTest) {
      if (changenFile[0] === 0) {
        analy.log("Code Aktiv");
        if (OrdnerName(movePacket[0][1]) === DateiName(movePacket[0][1])) {
          mainFile = "Ordner"
        } else {
          mainFile = "Unterwahl"
        }
        if (OrdnerName(movePacket[0][3]) === DateiName(movePacket[0][3])) {
          mainFile2 = "Ordner"
        } else {
          mainFile2 = "Unterwahl"
        }
        analy.log(mainFile + " zu " + mainFile2);
        if (OrdnerName(movePacket[0][1]) !== DateiName(movePacket[0][1]) && OrdnerName(movePacket[0][3]) === DateiName(movePacket[0][3])) {
          Ordner(urlSchnitt(movePacket[0][3]));
        }
        analy.info(allFile);
        // all Files overwrite
        overwriteAllFile(allFile)
        // move all Files
        if (OrdnerName(movePacket[0][1]) === DateiName(movePacket[0][1]) && OrdnerName(movePacket[0][3]) !== DateiName(movePacket[0][3])) {
          moveDirContent(urlSchnitt(allFile[0][1]), urlSchnitt(allFile[0][3]));
        } else {
          moveAllFile(movePacket)
        }
        // analy.log(["move: " + mainFile + " zu " + mainFile2, movePacket, allFile]);
      } else {
        analy.log("Code Inaktiv");
        // analy.log(["moveTest:", movePacket, allFile]);
      }
    }


    res.json("new Directory!");
  });

  verzeichnis.listen(PORT + 1, () => {
    analy.log("Directory Port " + (PORT + 1) + " running!");
  });
}






















// Funktion

// create element
function newWebsite(seiteName, pfad) {
  fertigVorlage = vorlage;
  for (let i = 0; i < vorlage.split(":Pfad:").length - 1; i++) {
    fertigVorlage = fertigVorlage.replace(":Pfad:", pfad);
  }
  for (let i = 0; i < vorlage.split("Überschrift").length - 1; i++) {
    fertigVorlage = fertigVorlage.replace("Überschrift", seiteName);
  }
  return fertigVorlage;
}


// File Overwrite
function replaceTitle(textReplace, oldTitle, newTitle) {
  textReplace = textReplace.replace(
    "<h1>" + oldTitle + "</h1>",
    "<h1>" + newTitle + "</h1>"
  );
  textReplace = textReplace.replace(
    "<title>" + oldTitle + "</title>",
    "<title>" + newTitle + "</title>"
  );
  return textReplace
}
function pathReplace(textReplace, searchPath, searchPath2) {
  textReplace = textReplace.replace(
    'href="' + searchPath + './styleHandy.css"',
    'href="' + searchPath2 + './styleHandy.css"'
  );
  textReplace = textReplace.replace(
    'href="' + searchPath + './styleDesk.css"',
    'href="' + searchPath2 + './styleDesk.css"'
  );
  textReplace = textReplace.replace(
    'href="' + searchPath + './styleFix.css"',
    'href="' + searchPath2 + './styleFix.css"'
  );
  textReplace = textReplace.replace(
    'src="' + searchPath + './navi.js"',
    'src="' + searchPath2 + './navi.js"'
  );
  textReplace = textReplace.replace(
    'src="' + searchPath + './overwrite.js"',
    'src="' + searchPath2 + './overwrite.js"'
  );
  textReplace = textReplace.replace(
    'src="' + searchPath + './boxBar.js"',
    'src="' + searchPath2 + './boxBar.js"'
  );
  return textReplace
}
function overwriteAllFile(allFile) {
  for (let i = 0; i < allFile.length; i++) {
    text = fs.readFileSync(allFile[i][1], "utf8");
    if (allFile[i][0] !== allFile[i][2]) {
      text = replaceTitle(text, allFile[i][0], allFile[i][2])
    }
    if (
      allFile[i][1].split("/").length !==
      allFile[i][3].split("/").length
    ) {
      pfad = pathLocation(allFile[i][1])
      pfad2 = pathLocation(allFile[i][3])
      text = pathReplace(text, pfad, pfad2)
      fs.writeFileSync(allFile[i][1], text);
    }
  }
}
function moveAllFile(movePacket) {
  for (let i = 0; i < movePacket.length; i++) {
    if (movePacket[i][1] !== movePacket[i][3]) {
      if (
        OrdnerName(movePacket[i][1]) === DateiName(movePacket[i][1])
      ) {
        tool.copyFolderRecursiveSync(
          urlSchnitt(movePacket[i][1]),
          urlSchnitt(urlSchnitt(movePacket[i][3]))
        );
        if (fs.existsSync(movePacket[i][3])) {
          tool.löschOrdner(urlSchnitt(movePacket[i][1]));
        }
      } else {
        fs.renameSync(movePacket[i][1], movePacket[i][3]);
      }
    }
  }
}


// URL rewrite
function addPath(pathArray) {
  for (let i = 0; i < pathArray.length; i++) {
    for (let j = 0; j < pathArray[i].length; j++) {
      pathArray[i][j] = decodeURIComponent(
        pathArray[i][j].replace("../", folderLocation + "./hauptverzeichnis/")
      );
    }
  }
  return pathArray
}
function changingURLRewrite(urlArray) {
  if (urlArray[0] !== undefined && urlArray[0][1] === "") {
    urlArray[0][1] = urlArray[0][3]
  }
}

// URL read
function pathLocation(searchPath) {
  pathOutput = "";
  for (let i = 0; i < searchPath.slice(searchPath.search("./hauptverzeichnis/")).split("/").length - 3; i++) {
    pathOutput += "../";
  }
  return pathOutput
}
function urlSchnitt(datei) {
  let ausgabe = datei.replace(
    "/" + datei.split("/")[datei.split("/").length - 1],
    ""
  );
  return ausgabe;
}
function DateiVolName(datei) {
  let ausgabe = datei.split("/")[datei.split("/").length - 1];
  return ausgabe;
}
function OrdnerName(datei) {
  let ausgabe = datei.split("/")[datei.split("/").length - 2];
  return ausgabe;
}
function DateiName(datei) {
  let ausgabe = datei.split("/")[datei.split("/").length - 1].split(".")[0];
  return ausgabe;
}
function DateiTyp(datei) {
  let ausgabe = datei.split("/")[datei.split("/").length - 1].split(".")[1];
  return ausgabe;
}