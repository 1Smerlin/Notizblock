const fs = require("fs")
const path = require("path")

module.exports = {
  // save copy
  copyFileSync: function (source, target) {
    var targetFile = target;
    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source));
      }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
  },
  copyFolderRecursiveSync: function (source, target) {
    var files = [];
    // check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }
    // copy
    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source);
      var self = this; // Speichern des 'this'-Werts in 'self'
      files.forEach(function (file) {
        var curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          self.copyFolderRecursiveSync(curSource, targetFolder); // Verwenden von 'self' anstelle von 'this'
        } else {
          self.copyFileSync(curSource, targetFolder); // Verwenden von 'self' anstelle von 'this'
        }
      });
    }
  },
  //Ordner löschen, inhalt verschieben
  moveDirContent: function (folderPath, targetFolder) {
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
  },

  // Löscht Ordner
  löschOrdner: function (pfad) {
    console.log("!!!---löschOrdner---!!!");
    if (fs.existsSync(pfad)) {
      fs.rmSync(pfad, {
        recursive: true,
      });
      console.log('Ordner "' + pfad + '" gelöscht');
    } else {
      console.log('Ordner "' + pfad + '" existiert nicht');
    }
  },

  // Löscht Datei
  löschDatei: function (pfad) {
    console.log("!!!---löschDatei---!!!");
    if (fs.existsSync(pfad)) {
      fs.unlinkSync(pfad, {
        recursive: true,
      });
      console.log('Ordner "' + pfad + '" gelöscht');
    } else {
      console.log('Ordner "' + pfad + '" existiert nicht');
    }
  },

  // Erstelle Ordner
  Ordner: function (pfad) {
    console.log("!!!---Ordner---!!!");
    if (!fs.existsSync(pfad)) {
      fs.mkdirSync(pfad);
      console.log('Ordner "' + pfad + '" erstellt');
    } else {
      console.log('Ordner "' + pfad + '" existiert Bereits');
    }
  }

};