const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractResumeText = async (filePath) => {

  console.log("Reading file:", filePath);

  const dataBuffer = fs.readFileSync(filePath);

  console.log("Buffer created");

  const data = await pdfParse(dataBuffer);

  console.log("PDF parsed");

  return data.text;
};

module.exports = extractResumeText;