// Analyse Tools
module.exports = {
  title: function (string) {
    if (typeof analyseOutput === "undefined") {
      analyseOutput = 1
    }
    if (analyseOutput) {
      console.log("!!!!!-----" + string + "-----!!!!!")
    }
  },
  log: function (...string) {
    if (typeof analyseOutput === "undefined") {
      analyseOutput = 1
    }
    if (analyseOutput) {
      console.log(...string)
    }
  },
  count: function (...string) {
    if (typeof analyseOutput === "undefined") {
      analyseOutput = 1
    }
    if (analyseOutput) {
      console.count(...string)
    }
  },
  info: function (...string) {
    if (typeof analyseOutput === "undefined") {
      analyseOutput = 1
    }
    if (analyseOutput) {
      console.info(...string)
    }
  },
  logVar: function (obj) {
    for (let key in obj) {
      console.log(`${key}: ${obj[key]}`);
    }
  },
  objecktKeys: function (objeckt) {
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
};