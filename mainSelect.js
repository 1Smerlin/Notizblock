//Module
const fs = require("fs");
const url = require("url");
const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const folderLocation = "";
const PORT = 8000;

if (fs.existsSync(folderLocation + "./hauptverzeichnis")) {
  /*Server*/
  http
    .createServer(function (req, res) {
      var q = url.parse(req.url, true);
      var filename = "." + q.pathname;
      for (let i = 0; i < 2; i++) {
        filename = filter(filename);
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
      if (processComment) {
        console.info("Server Port " + PORT + " läuft!");
      }
    });

  /*Veränderung*/
  const vorlage = fs.readFileSync(folderLocation + "./vorlage/vorlage.html", {
    encoding: "utf8",
    flag: "r",
  });
  //Test Einstellungen
  rückspulen = 0;
  processComment = 1;

  q = 1;
  //Komandozeile
  verzeichnisTest = q;
  hinzufügTest = q;
  löschTest = q;
  moveTest = q;
  overwriteTest = q;

  // Debug Tool
  if (rückspulen) {
    if (fs.existsSync(folderLocation + "./hauptverzeichnis")) {
      löschOrdner(folderLocation + "./hauptverzeichnis");
    }
    copyFolderRecursiveSync(
      "C:/Users/smerl/Desktop/HTML-Save/Arbeitsplatz/hauptverzeichnis/",
      folderLocation + "./"
    );
  }

  // copyFolderRecursiveSync(
  //   folderLocation + '.././Arbeitsplatz',
  //   'C:/Users/smerl/Desktop/HTML-Groß-Save',
  // )

  //verzeichnis
  //Variablen
  const verzeichnis = express();

  //Extra
  verzeichnis.use(express.urlencoded({ extended: true }));
  verzeichnis.use(express.json());
  verzeichnis.use(cors());
  verzeichnis.options("*", cors());
  //Extra

  // Hier wird Multer konfiguriert, um Dateien mit einer Größe von bis zu 10 MB zu akzeptieren
  const upload = multer({
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  });

  verzeichnis.post("/", upload.none(), (req, res) => {
    if (processComment) {
      console.info("!!!!!Verzeichnis!!!!!");
    }
    navlist = req.body;
    if (verzeichnisTest) {
      if (
        fs.existsSync(folderLocation + "./hauptverzeichnis/verzeichnis.json")
      ) {
        fs.unlinkSync(folderLocation + "./hauptverzeichnis/verzeichnis.json");
      }
      if (processComment) {
        console.info("!!!!!Neues Verzeichnis!!!!!");
      }
      fs.writeFileSync(
        folderLocation + "./hauptverzeichnis/verzeichnis.json",
        JSON.stringify(navlist)
      );
    }
    res.json("Neues Verzeichnis!");
  });

  verzeichnis.listen(PORT + 1, () => {
    if (processComment) {
      console.info("Verzeichnis Port " + (PORT + 1) + " läuft!");
    }
  });

  //hinzufügen
  //Variablen
  const hinzufügen = express();

  //Extra
  hinzufügen.use(express.urlencoded({ extended: true }));
  hinzufügen.use(express.json());
  hinzufügen.use(cors());
  hinzufügen.options("*", cors());

  hinzufügen.post("/", upload.none(), (req, res) => {
    if (processComment) {
      console.info("!!!!!hinzufügen!!!!!");
    }
    datei = req.body;
    datei[1] = datei[1].replace("../", folderLocation + "./hauptverzeichnis/");
    datei[1] = filter(datei[1]);
    ordner = vorOrdner(datei[1]);
    urOrdner = vorOrdner(ordner);
    if (hinzufügTest) {
      if (fs.existsSync(urOrdner)) {
        if (!fs.existsSync(datei[1])) {
          if (fs.existsSync(ordner)) {
            pfad = "";
            for (
              let i = 0;
              i <
              datei[1].slice(datei[1].search("./hauptverzeichnis/")).split("/")
                .length -
                3;
              i++
            ) {
              pfad += "../";
            }
            pfad += "./";
            fs.writeFileSync(datei[1], NeuerDatei(datei[0], pfad));
            res.json("Server: Datei:" + datei[1] + " wurde erstellt");
          } else {
            fs.mkdirSync(ordner);
            pfad = "";
            for (
              let i = 0;
              i <
              datei[1].slice(datei[1].search("./hauptverzeichnis/")).split("/")
                .length -
                3;
              i++
            ) {
              pfad += "../";
            }
            pfad += "./";
            fs.writeFileSync(datei[1], NeuerDatei(datei[0], pfad));
            res.json(
              "Server: Ordner:" +
                ordner +
                " und Datei:" +
                datei[1] +
                " wurden erstellt"
            );
          }
        } else {
          res.json("Server: Datei:" + datei[1] + " Existiert bereits");
        }
      } else {
        res.json("Server: urOrdner:" + urOrdner + " Existiert nicht");
      }
    } else {
      res.json("Servertest:hinzufüg ausgabe:" + datei);
    }
  });

  hinzufügen.listen(PORT + 2, () => {
    if (processComment) {
      console.info("hinzufügen Port " + (PORT + 2) + " läuft!");
    }
  });

  //lösch
  //Variablen
  const lösch = express();

  //Extra
  lösch.use(express.urlencoded({ extended: true }));
  lösch.use(express.json());
  lösch.use(cors());
  lösch.options("*", cors());

  lösch.post("/", upload.none(), (req, res) => {
    if (processComment) {
      console.info("!!!!!lösch!!!!!");
    }
    datei = req.body;
    datei[1] = datei[1].replace("../", folderLocation + "./hauptverzeichnis/");
    ordner = urlSchnitt(datei[1]);
    ordnerName = OrdnerName(datei[1]);
    dateiName = DateiName(datei[1]);
    typName = DateiTyp(datei[1]);
    if (löschTest) {
      if (fs.existsSync(ordner)) {
        if (ordnerName !== dateiName) {
          Ordner(folderLocation + "./save/" + ordnerName);
          copyFileSync(
            datei[1],
            folderLocation +
              "./save/" +
              ordnerName +
              "/" +
              dateiName +
              "." +
              typName
          );
          löschDatei(datei[1]);

          res.json("Server: Datei:" + datei[0] + " wurde geslöscht");
        } else {
          copyFolderRecursiveSync(ordner, folderLocation + "./save");
          löschOrdner(ordner);
          res.json("Server: Ordner und Datei:" + datei[0] + " wurde geslöscht");
        }
      } else {
        res.json(
          "Hallo Client von Port " +
            (PORT + 3) +
            "! " +
            datei[0] +
            " Existiert nicht"
        );
      }
    } else {
      res.json("ServerTest: Löschen ausgabe:" + datei);
    }
  });

  lösch.listen(PORT + 3, () => {
    if (processComment) {
      console.info("lösch Port " + (PORT + 3) + " läuft!");
    }
  });

  //move
  //Variablen
  const move = express();

  //Extra
  move.use(express.urlencoded({ extended: true }));
  move.use(express.json());
  move.use(cors());
  move.options("*", cors());

  move.post("/", upload.none(), (req, res) => {
    if (processComment) {
      console.info("!!!!!move!!!!!");
    }
    let moveOrdner = req.body[0];
    let moveAllOrdner = req.body[1];
    for (let i = 0; i < moveOrdner.length; i++) {
      moveOrdner[i][1] = filter(
        moveOrdner[i][1].replace("../", folderLocation + "./hauptverzeichnis/")
      );
      moveOrdner[i][3] = filter(
        moveOrdner[i][3].replace("../", folderLocation + "./hauptverzeichnis/")
      );
    }
    for (let i = 0; i < moveAllOrdner.length; i++) {
      moveAllOrdner[i][1] = filter(
        moveAllOrdner[i][1].replace(
          "../",
          folderLocation + "./hauptverzeichnis/"
        )
      );
      moveAllOrdner[i][3] = filter(
        moveAllOrdner[i][3].replace(
          "../",
          folderLocation + "./hauptverzeichnis/"
        )
      );
    }
    if (moveTest) {
      if (processComment) {
        console.log("Code Aktiv");
      }
      if (OrdnerName(moveOrdner[0][1]) === DateiName(moveOrdner[0][1])) {
        if (processComment) {
          console.log("Ordner");
        }
        if (OrdnerName(moveOrdner[0][3]) === DateiName(moveOrdner[0][3])) {
          if (processComment) {
            console.log("Ordner zu Ordner");
          }
          text = fs.readFileSync(moveOrdner[0][1], "utf8");
          //Inhalt Umbenenen
          if (processComment) {
            console.log("Umschreiben", moveOrdner[0][0] !== moveOrdner[0][2]);
          }
          if (moveOrdner[0][0] !== moveOrdner[0][2]) {
            text = text.replace(
              "<h1>" + moveOrdner[0][0] + "</h1>",
              "<h1>" + moveOrdner[0][2] + "</h1>"
            );
            text = text.replace(
              "<title>" + moveOrdner[0][0] + "</title>",
              "<title>" + moveOrdner[0][2] + "</title>"
            );
          }
          if (processComment) {
            console.log(
              "Pfad",
              moveOrdner[0][1].split("/").length !==
                moveOrdner[0][3].split("/").length
            );
          }
          if (
            moveOrdner[0][1].split("/").length !==
            moveOrdner[0][3].split("/").length
          ) {
            if (processComment) {
              console.log("PfadLength", moveOrdner[0][1].split("/").length);
            }
            pfad = "";
            for (
              let i = 0;
              i <
              moveOrdner[0][1]
                .slice(moveOrdner[0][1].search("./hauptverzeichnis/"))
                .split("/").length -
                3;
              i++
            ) {
              pfad += "../";
            }
            if (processComment) {
              console.log("Pfad", pfad);
              console.log("Pfad2Length", moveOrdner[0][3].split("/").length);
            }
            pfad2 = "";
            for (
              let i = 0;
              i <
              moveOrdner[0][3]
                .slice(moveOrdner[0][3].search("./hauptverzeichnis/"))
                .split("/").length -
                3;
              i++
            ) {
              pfad2 += "../";
            }
            if (processComment) {
              console.log("Pfad2", pfad2);
            }
            text = text.replace(
              'href="' + pfad + './styleHandy.css"',
              'href="' + pfad2 + './styleHandy.css"'
            );
            text = text.replace(
              'href="' + pfad + './styleDesk.css"',
              'href="' + pfad2 + './styleDesk.css"'
            );
            text = text.replace(
              'href="' + pfad + './styleFix.css"',
              'href="' + pfad2 + './styleFix.css"'
            );
            text = text.replace(
              'src="' + pfad + './app.js"',
              'src="' + pfad2 + './app.js"'
            );
          }
          fs.writeFileSync(moveOrdner[0][1], text);
          // UnterOrdner
          if (processComment) {
            console.log("Pfad", moveAllOrdner.length !== 1);
          }
          if (moveAllOrdner.length !== 1) {
            for (let i = 1; i < moveAllOrdner.length; i++) {
              if (
                moveAllOrdner[i][1].split("/").length !==
                moveAllOrdner[i][3].split("/").length
              ) {
                text = fs.readFileSync(moveAllOrdner[i][1], "utf8");
                pfad = "";
                for (
                  let i = 0;
                  i <
                  moveAllOrdner[i][1]
                    .slice(moveAllOrdner[i][1].search("./hauptverzeichnis/"))
                    .split("/").length -
                    3;
                  i++
                ) {
                  pfad += "../";
                }
                pfad2 = "";
                for (
                  let i = 0;
                  i <
                  moveAllOrdner[i][3]
                    .slice(moveAllOrdner[i][3].search("./hauptverzeichnis/"))
                    .split("/").length -
                    3;
                  i++
                ) {
                  pfad2 += "../";
                }
                text = text.replace(
                  'href="' + pfad + './styleHandy.css"',
                  'href="' + pfad2 + './styleHandy.css"'
                );
                text = text.replace(
                  'href="' + pfad + './styleDesk.css"',
                  'href="' + pfad2 + './styleDesk.css"'
                );
                text = text.replace(
                  'href="' + pfad + './styleFix.css"',
                  'href="' + pfad2 + './styleFix.css"'
                );
                text = text.replace(
                  'src="' + pfad + './app.js"',
                  'src="' + pfad2 + './app.js"'
                );
                fs.writeFileSync(moveAllOrdner[i][1], text);
              }
            }
          }
          // umbenennen
          if (DateiName(moveOrdner[0][1]) !== DateiName(moveOrdner[0][3])) {
            fs.renameSync(
              moveOrdner[0][1],
              urlSchnitt(moveOrdner[0][1]) +
                "/" +
                DateiVolName(moveOrdner[0][3])
            );
            fs.renameSync(
              urlSchnitt(moveOrdner[0][1]),
              urlSchnitt(urlSchnitt(moveOrdner[0][1])) +
                "/" +
                OrdnerName(moveOrdner[0][3])
            );
            moveOrdner[0][1] =
              urlSchnitt(urlSchnitt(moveOrdner[0][1])) +
              "/" +
              OrdnerName(moveOrdner[0][3]) +
              "/" +
              DateiVolName(moveOrdner[0][3]);
          }
          for (let i = 0; i < moveOrdner.length; i++) {
            if (moveOrdner[i][1] !== moveOrdner[i][3]) {
              if (
                OrdnerName(moveOrdner[i][1]) === DateiName(moveOrdner[i][1])
              ) {
                copyFolderRecursiveSync(
                  urlSchnitt(moveOrdner[i][1]),
                  urlSchnitt(urlSchnitt(moveOrdner[i][3]))
                );
                if (fs.existsSync(moveOrdner[i][3])) {
                  löschOrdner(urlSchnitt(moveOrdner[i][1]));
                }
              } else {
                fs.renameSync(moveOrdner[i][1], moveOrdner[i][3]);
                if (fs.existsSync(moveOrdner[i][3])) {
                  löschDatei(moveOrdner[i][1]);
                }
              }
            }
          }
          res.json(["move: Ordner zu Ordner", moveOrdner, moveAllOrdner]);
        } else {
          if (processComment) {
            console.log("Ordner zu Unterwahl");
          }
          text = fs.readFileSync(moveOrdner[0][1], "utf8");
          //Inhalt Umbenenen
          if (processComment) {
            console.log("Umschreiben", moveOrdner[0][0] !== moveOrdner[0][2]);
          }
          if (moveOrdner[0][0] !== moveOrdner[0][2]) {
            text = text.replace(
              "<h1>" + moveOrdner[0][0] + "</h1>",
              "<h1>" + moveOrdner[0][2] + "</h1>"
            );
            text = text.replace(
              "<title>" + moveOrdner[0][0] + "</title>",
              "<title>" + moveOrdner[0][2] + "</title>"
            );
          }
          if (processComment) {
            console.log(
              "Pfad",
              moveOrdner[0][1].split("/").length !==
                moveOrdner[0][3].split("/").length
            );
          }
          if (
            moveOrdner[0][1].split("/").length !==
            moveOrdner[0][3].split("/").length
          ) {
            pfad = "";
            for (
              let i = 0;
              i <
              moveAllOrdner[0][1]
                .slice(moveAllOrdner[0][1].search("./hauptverzeichnis/"))
                .split("/").length -
                3;
              i++
            ) {
              pfad += "../";
            }
            pfad2 = "";
            for (
              let i = 0;
              i <
              moveAllOrdner[0][3]
                .slice(moveAllOrdner[0][3].search("./hauptverzeichnis/"))
                .split("/").length -
                3;
              i++
            ) {
              pfad2 += "../";
            }
            text = text.replace(
              'href="' + pfad + './styleHandy.css"',
              'href="' + pfad2 + './styleHandy.css"'
            );
            text = text.replace(
              'href="' + pfad + './styleDesk.css"',
              'href="' + pfad2 + './styleDesk.css"'
            );
            text = text.replace(
              'href="' + pfad + './styleFix.css"',
              'href="' + pfad2 + './styleFix.css"'
            );
            text = text.replace(
              'src="' + pfad + './app.js"',
              'src="' + pfad2 + './app.js"'
            );
          }
          fs.writeFileSync(moveOrdner[0][1], text);
          // UnterOrdner
          if (processComment) {
            console.log("Pfad", moveAllOrdner.length !== 1);
          }
          if (moveAllOrdner.length !== 1) {
            for (let i = 1; i < moveAllOrdner.length; i++) {
              if (
                moveAllOrdner[i][1].split("/").length !==
                moveAllOrdner[i][3].split("/").length
              ) {
                text = fs.readFileSync(moveAllOrdner[i][1], "utf8");
                pfad = "";
                for (
                  let i = 0;
                  i <
                  moveAllOrdner[i][1]
                    .slice(moveAllOrdner[i][1].search("./hauptverzeichnis/"))
                    .split("/").length -
                    3;
                  i++
                ) {
                  pfad += "../";
                }
                pfad2 = "";
                for (
                  let i = 0;
                  i <
                  moveAllOrdner[i][3]
                    .slice(moveAllOrdner[i][3].search("./hauptverzeichnis/"))
                    .split("/").length -
                    3;
                  i++
                ) {
                  pfad2 += "../";
                }
                text = text.replace(
                  'href="' + pfad + './styleHandy.css"',
                  'href="' + pfad2 + './styleHandy.css"'
                );
                text = text.replace(
                  'href="' + pfad + './styleDesk.css"',
                  'href="' + pfad2 + './styleDesk.css"'
                );
                text = text.replace(
                  'href="' + pfad + './styleFix.css"',
                  'href="' + pfad2 + './styleFix.css"'
                );
                text = text.replace(
                  'src="' + pfad + './app.js"',
                  'src="' + pfad2 + './app.js"'
                );
                fs.writeFileSync(moveAllOrdner[i][1], text);
              }
            }
          }
          moveDirContent(
            urlSchnitt(moveAllOrdner[0][1]),
            urlSchnitt(moveAllOrdner[0][3])
          );

          res.json(["move: Ordner zu Unterwahl", moveOrdner, moveAllOrdner]);
        }
      } else {
        if (processComment) {
          console.log("Unterwahl");
        }
        if (OrdnerName(moveOrdner[0][3]) === DateiName(moveOrdner[0][3])) {
          if (processComment) {
            console.log("Unterwahl zu Ordner");
          }
          Ordner(urlSchnitt(moveOrdner[0][3]));
          text = fs.readFileSync(moveOrdner[0][1], "utf8");
          //Inhalt Umbenenen
          if (moveOrdner[0][0] !== moveOrdner[0][2]) {
            text = text.replace(
              "<h1>" + moveOrdner[0][0] + "</h1>",
              "<h1>" + moveOrdner[0][2] + "</h1>"
            );
            text = text.replace(
              "<title>" + moveOrdner[0][0] + "</title>",
              "<title>" + moveOrdner[0][2] + "</title>"
            );
          }
          if (
            moveOrdner[0][1].split("/").length !==
            moveOrdner[0][3].split("/").length
          ) {
            pfad = "";
            for (
              let i = 0;
              i <
              moveOrdner[0][1]
                .slice(moveOrdner[0][1].search("./hauptverzeichnis/"))
                .split("/").length -
                3;
              i++
            ) {
              pfad += "../";
            }
            pfad2 = "";
            for (
              let i = 0;
              i <
              moveOrdner[0][3]
                .slice(moveOrdner[0][3].search("./hauptverzeichnis/"))
                .split("/").length -
                3;
              i++
            ) {
              pfad2 += "../";
            }
            text = text.replace(
              'href="' + pfad + './styleHandy.css"',
              'href="' + pfad2 + './styleHandy.css"'
            );
            text = text.replace(
              'href="' + pfad + './styleDesk.css"',
              'href="' + pfad2 + './styleDesk.css"'
            );
            text = text.replace(
              'href="' + pfad + './styleFix.css"',
              'href="' + pfad2 + './styleFix.css"'
            );
            text = text.replace(
              'src="' + pfad + './app.js"',
              'src="' + pfad2 + './app.js"'
            );
          }
          fs.writeFileSync(moveOrdner[0][3], text);
          if (fs.existsSync(moveOrdner[0][3])) {
            löschDatei(moveOrdner[0][1]);
          }
          // UnterOrdner
          if (moveAllOrdner.length !== 1) {
            for (let i = 1; i < moveAllOrdner.length; i++) {
              if (
                moveAllOrdner[i][1].split("/").length !==
                moveAllOrdner[i][3].split("/").length
              ) {
                text = fs.readFileSync(moveAllOrdner[i][1], "utf8");
                pfad = "";
                for (
                  let i = 0;
                  i <
                  moveAllOrdner[i][1]
                    .slice(moveAllOrdner[i][1].search("./hauptverzeichnis/"))
                    .split("/").length -
                    3;
                  i++
                ) {
                  pfad += "../";
                }
                pfad2 = "";
                for (
                  let i = 0;
                  i <
                  moveAllOrdner[i][3]
                    .slice(moveAllOrdner[i][3].search("./hauptverzeichnis/"))
                    .split("/").length -
                    3;
                  i++
                ) {
                  pfad2 += "../";
                }
                text = text.replace(
                  'href="' + pfad + './styleHandy.css"',
                  'href="' + pfad2 + './styleHandy.css"'
                );
                text = text.replace(
                  'href="' + pfad + './styleDesk.css"',
                  'href="' + pfad2 + './styleDesk.css"'
                );
                text = text.replace(
                  'href="' + pfad + './styleFix.css"',
                  'href="' + pfad2 + './styleFix.css"'
                );
                text = text.replace(
                  'src="' + pfad + './app.js"',
                  'src="' + pfad2 + './app.js"'
                );
                fs.writeFileSync(moveAllOrdner[i][1], text);
              }
            }
            for (let i = 1; i < moveOrdner.length; i++) {
              copyFolderRecursiveSync(
                urlSchnitt(moveOrdner[i][1]),
                urlSchnitt(urlSchnitt(moveOrdner[i][3]))
              );
            }
          }
          res.json(["move: Unterwahl zu Ordner", moveOrdner, moveAllOrdner]);
        } else {
          if (processComment) {
            console.log("Unterwahl zu Unterwahl");
          }
          if (moveOrdner[0][1] !== moveOrdner[0][3]) {
            text = fs.readFileSync(moveOrdner[0][1], "utf8");
            //Inhalt Umbenenen
            if (moveOrdner[0][0] !== moveOrdner[0][2]) {
              text = text.replace(
                "<h1>" + moveOrdner[0][0] + "</h1>",
                "<h1>" + moveOrdner[0][2] + "</h1>"
              );
              text = text.replace(
                "<title>" + moveOrdner[0][0] + "</title>",
                "<title>" + moveOrdner[0][2] + "</title>"
              );
            }
            if (
              moveOrdner[0][1].split("/").length !==
              moveOrdner[0][3].split("/").length
            ) {
              pfad = "";
              for (
                let i = 0;
                i <
                moveAllOrdner[0][1]
                  .slice(moveAllOrdner[0][1].search("./hauptverzeichnis/"))
                  .split("/").length -
                  3;
                i++
              ) {
                pfad += "../";
              }
              pfad2 = "";
              for (
                let i = 0;
                i <
                moveAllOrdner[0][3]
                  .slice(moveAllOrdner[0][3].search("./hauptverzeichnis/"))
                  .split("/").length -
                  3;
                i++
              ) {
                pfad2 += "../";
              }
              text = text.replace(
                'href="' + pfad + './styleHandy.css"',
                'href="' + pfad2 + './styleHandy.css"'
              );
              text = text.replace(
                'href="' + pfad + './styleDesk.css"',
                'href="' + pfad2 + './styleDesk.css"'
              );
              text = text.replace(
                'href="' + pfad + './styleFix.css"',
                'href="' + pfad2 + './styleFix.css"'
              );
              text = text.replace(
                'src="' + pfad + './app.js"',
                'src="' + pfad2 + './app.js"'
              );
            }
            fs.writeFileSync(moveOrdner[0][3], text);
            if (fs.existsSync(moveOrdner[0][3])) {
              löschDatei(moveOrdner[0][1]);
            }
          }
          res.json(["move: Unterwahl zu Unterwahl", moveOrdner, moveAllOrdner]);
        }
      }
    } else {
      if (processComment) {
        console.log("Code Inaktiv");
      }
      res.json(["moveTest:", moveOrdner, moveAllOrdner]);
      // res.json(moveOrdner)
    }
  });

  move.listen(PORT + 4, () => {
    if (processComment) {
      console.info("lösch Port " + (PORT + 4) + " läuft!");
    }
  });

  //overwrite
  //Variablen
  const overwrite = express();

  //Extra
  overwrite.use(express.urlencoded({ limit: "10mb", extended: true }));
  overwrite.use(express.json({ limit: "10mb" }));
  // overwrite.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  // overwrite.use(bodyParser.json({ limit: "10mb" }));
  overwrite.use(cors());
  overwrite.options("*", cors());

  overwrite.post("/", upload.none(), (req, res) => {
    if (processComment) {
      console.info("!!!!!overwrite!!!!!");
    }
    let dateiPfad = req.body[0];
    let dateiText = req.body[1];
    if (dateiPfad.includes("/hauptverzeichnis/")) {
      let startPunkt = dateiPfad.search("/hauptverzeichnis/");
      dateiPfad = dateiPfad.slice(startPunkt);
    }
    dateiPfad = filter(
      dateiPfad.replace(
        "/hauptverzeichnis/",
        folderLocation + "./hauptverzeichnis/"
      )
    );
    dateiText = textFilter(dateiText);
    if (overwriteTest) {
      if (processComment) {
        console.log("Code Aktiv");
      }
      if (fs.existsSync(dateiPfad)) {
        let aktuelerDatei = fs.readFileSync(dateiPfad, "utf8");
        startNumber = aktuelerDatei.search("<main>");
        endNumber = aktuelerDatei.search("</main>");
        aktuelerText = aktuelerDatei.slice(startNumber, endNumber + 7);
        newText = aktuelerDatei.replace(
          aktuelerText,
          "<main>" + dateiText + "</main>"
        );
        // fs.writeFileSync('test.html', newText)
        fs.writeFileSync(dateiPfad, newText);
      }
      res.json(["Aktiv:", dateiPfad, dateiText]);
    } else {
      if (processComment) {
        console.log("Code Inaktiv");
      }
      res.json(["moveTest:", dateiPfad, dateiText]);
    }
  });

  overwrite.listen(PORT + 5, () => {
    if (processComment) {
      console.info("Überschreiben Port " + (PORT + 5) + " läuft!");
    }
  });

  //Funtionen
  function eigen(objeckt) {
    zahl = 0;
    if (processComment) {
      console.info("------keys-----");
    }
    for (key of Object.keys(objeckt)) {
      if (processComment) {
        console.info(zahl + ": " + key);
      }
      zahl += 1;
    }
  }
  function vorOrdner(pfad) {
    let Ausgabe = pfad.replace(
      "/" + pfad.split("/")[pfad.split("/").length - 1],
      ""
    );
    return Ausgabe;
  }

  // save copy
  function copyFileSync(source, target) {
    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source));
      }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
  }
  function copyFolderRecursiveSync(source, target) {
    var files = [];

    // check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    // copy
    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source);
      files.forEach(function (file) {
        var curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          copyFolderRecursiveSync(curSource, targetFolder);
        } else {
          copyFileSync(curSource, targetFolder);
        }
      });
    }
  }
  //Ordner löschen, inhalt verschieben
  function moveDirContent(folderPath, targetFolder) {
    foldercontent = fs.readdirSync(folderPath);
    for (let i = 0; i < foldercontent.length; i++) {
      if (fs.statSync(folderPath + "/" + foldercontent[i]).isDirectory()) {
        copyFolderRecursiveSync(
          folderPath + "/" + foldercontent[i],
          targetFolder
        );
      } else {
        fs.renameSync(
          folderPath + "/" + foldercontent[i],
          targetFolder + "/" + foldercontent[i]
        );
      }
    }
    löschOrdner(folderPath);
  }

  // Löscht Ordner
  function löschOrdner(pfad) {
    if (processComment) {
      console.log("!!!---löschOrdner---!!!");
    }
    if (fs.existsSync(pfad)) {
      fs.rmSync(pfad, {
        recursive: true,
      });
      if (processComment) {
        console.log('Ordner "' + pfad + '" gelöscht');
      }
    } else {
      if (processComment) {
        console.log('Ordner "' + pfad + '" existiert nicht');
      }
    }
  }

  // Löscht Datei
  function löschDatei(pfad) {
    if (processComment) {
      console.log("!!!---löschDatei---!!!");
    }
    if (fs.existsSync(pfad)) {
      fs.unlinkSync(pfad, {
        recursive: true,
      });
      if (processComment) {
        console.log('Ordner "' + pfad + '" gelöscht');
      }
    } else {
      if (processComment) {
        console.log('Ordner "' + pfad + '" existiert nicht');
      }
    }
  }

  // Erstelle Ordner
  function Ordner(pfad) {
    if (processComment) {
      console.log("!!!---Ordner---!!!");
    }
    if (!fs.existsSync(pfad)) {
      fs.mkdirSync(pfad);
      if (processComment) {
        console.log('Ordner "' + pfad + '" erstellt');
      }
    } else {
      if (processComment) {
        console.log('Ordner "' + pfad + '" existiert Bereits');
      }
    }
  }

  //Neuer ordner
  function NeuerDatei(seiteName, pfad) {
    fertigVorlage = vorlage;
    for (let i = 0; i < vorlage.split(":Pfad:").length - 1; i++) {
      fertigVorlage = fertigVorlage.replace(":Pfad:", pfad);
    }
    for (let i = 0; i < vorlage.split("Überschrift").length - 1; i++) {
      fertigVorlage = fertigVorlage.replace("Überschrift", seiteName);
    }
    return fertigVorlage;
  }
  //URL Auslesen
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

  //Filter
  function filter(ausdruck) {
    ausgabe = ausdruck;
    while (
      ausgabe.includes("%C3%A4") ||
      ausgabe.includes("%C3%B6") ||
      ausgabe.includes("%C3%BC") ||
      ausgabe.includes("%23") ||
      ausgabe.includes("%20")
    ) {
      ausgabe = ausgabe
        .replace("%C3%A4", "ä")
        .replace("%C3%B6", "ö")
        .replace("%C3%BC", "ü")
        .replace("%23", "#")
        .replace("%20", " ");
    }
    return ausgabe;
  }
  function textFilter(ausdruck) {
    ausgabe = ausdruck;
    while (
      ausgabe.includes(' style="display: none;"') ||
      ausgabe.includes(" style='display: none;'") ||
      ausgabe.includes(' style="display: block;"') ||
      ausgabe.includes(" style='display: block;'") ||
      ausgabe.includes(' style=""') ||
      ausgabe.includes(" style=''") ||
      ausgabe.includes(' class=""') ||
      ausgabe.includes(" class=''") ||
      ausgabe.includes("&amp;") ||
      ausgabe.includes("&gt;") ||
      ausgabe.includes("<br>")
    ) {
      ausgabe = ausgabe
        .replace(' style="display: none;"', "")
        .replace(" style='display: none;'", "")
        .replace(' style="display: block;"', "")
        .replace(" style='display: block;'", "")
        .replace(' style=""', "")
        .replace(" style=''", "")
        .replace(' class=""', "")
        .replace(" class=''", "")
        .replace("&amp;", "&")
        .replace("&gt;", ">")
        .replace("<br>", "<br/>");
    }
    return ausgabe;
  }
} else {
  if (processComment) {
    console.error("Ordner wurde nicht gefunden");
  }
}
