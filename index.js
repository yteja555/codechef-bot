const config = require("./config");
const extractQuestionsDataAndCreateFiles = require("./extractQuestionsData");
const path = config["path"];
const baseUrl = config["baseUrl"];

const contestName = process.argv[2] && process.argv[2].toLocaleUpperCase();
const providedLanuage = process.argv[3] || "cpp";

const language = providedLanuage.toLocaleLowerCase();

const url = baseUrl + contestName;

// console.log("path is ", path);
// console.log("baseUrl is ", baseUrl);
// console.log("url is ", url);
// console.log("language is ", language);
const contestCodeErrorMessage = `
please provide valid contest code
for division based challenges specify 'a' or 'b' at the end of contestcode
{a means division1}
{b means division2}
example:- june20b 
`;
if (!contestName) {
  console.log(contestCodeErrorMessage);
  process.exit(555);
}
async function doWhatYouCan() {
  const problemsCodes = await extractQuestionsDataAndCreateFiles(
    url,
    contestName,
    path,
    language
  );
  if (problemsCodes.length === 0) {
    console.log(contestCodeErrorMessage);
    process.exit(555);
  }
}
console.log("loading ........");
doWhatYouCan();
