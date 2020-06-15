const fs = require("fs");
const cppTemplate = require("./cppFileTemplate");
const pythonTemplate = require("./pythonFileTemplate");
const javaTemplate = require("./javaFileTemplate");

const templates = {
  cpp: cppTemplate,
  java: javaTemplate,
  python: pythonTemplate,
};
const comments = {
  cpp: ["/*", "*/"],
  java: ["/*", "*/"],
  python: ["'''", "'''"],
};
const extensions = {
  cpp: ".cpp",
  java: ".java",
  python: ".py",
};

function correctPath(path) {
  path += path[path.length - 1] === "/" ? "" : "/";
  return path;
}

function createDirectory(path, contestName) {
  path = correctPath(path) + contestName + "/";
  //  creating directory with contest name
  fs.mkdir(path, (err) => {
    if (err) console.log("some thing wrong while creating contest directory");
  });
  return path;
}

function titleCase(string) {
  var sentence = string.toLowerCase().split("_");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join("");
}

function createContent(inputOutput, language) {
  comment = comments[language];
  startComment = comment[0];
  endComment = comment[1];
  return templates[language] + "\n" + startComment + inputOutput + endComment;
}

function createFile(questionData, path, language) {
  let { fileName, inputOutput } = questionData;
  const content = createContent(inputOutput, language);
  if (language === "java") fileName = titleCase(fileName);
  fileName += extensions[language];
  fs.writeFile(path + fileName, content, (err) => {
    if (err) {
      console.log("some thing wrong while creating file ", fileName);
    } else {
      console.log("successfully created file ", fileName);
    }
  });
}

module.exports = { createFile, createDirectory };
