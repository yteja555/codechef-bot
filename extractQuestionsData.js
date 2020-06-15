const axios = require("axios");
const { createDirectory, createFile } = require("./createFiles");

async function extractDataForSingleProblem(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    if (err)
      console.log(
        "something wrong while fetching data for single problem",
        err.message
      );
  }
}

async function extractQuestionsDataAndCreateFiles(
  url,
  contestName,
  path,
  language
) {
  try {
    let problemCodes = [];
    const { data } = await axios.get(url);
    const problemsDetails = data["problems"];
    // if problem details not found return
    if (!problemsDetails) return problemCodes;
    // now extarct problem codes
    path = createDirectory(path, contestName);
    for (let problemCode in problemsDetails) {
      if (problemsDetails[problemCode]["category_name"] === "main") {
        // console.log(problemCode);
        problemCodes.push(problemCode);
      }
    }
    // console.log("problem codes are ", problemCodes);
    // if problems data is available store that
    const problemsData = data["problems_data"];
    problemCodes.forEach(async (code, i) => {
      let problemData;
      if (problemsData && problemsData[code]) problemData = problemsData[code];
      else {
        problemData = await extractDataForSingleProblem(
          url + "/problems/" + code
        );
      }
      // console.log("problem data for  ", i, " is ", problemData);
      const { problem_name, body } = problemData;
      const fileName = problem_name
        .split(" ")
        .map((w) => w.toLocaleLowerCase())
        .join("_");
      let inputOutput =
        "Example " +
        body.split("Explanation")[0].split("Example").slice(1).join("");
      // console.log({ fileName, inputOutput });
      createFile({ fileName, inputOutput }, path, language);
    });
    return problemCodes;
  } catch (error) {
    console.log("something went wrong", ex.message);
  }
}
// extractQuestionsData("https://www.codechef.com/api/contests/JUNE20B");
module.exports = extractQuestionsDataAndCreateFiles;
