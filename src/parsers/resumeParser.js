const fs = require('fs');
const pdfParse = require('pdf-parse');
const { preprocessText } = require('../utils');
const {
  extractSkills,
  extractExperienceYears,
  extractName,
} = require('../extractors');

async function extractTextFromPdfInput(resumeInput) {
  if (Buffer.isBuffer(resumeInput)) {
    const result = await pdfParse(resumeInput);
    return result.text || '';
  }

  if (typeof resumeInput === 'string' && fs.existsSync(resumeInput)) {
    const fileBuffer = fs.readFileSync(resumeInput);
    const result = await pdfParse(fileBuffer);
    return result.text || '';
  }

  return String(resumeInput ?? '');
}

async function parseResume(resumeInput) {
  const rawText = await extractTextFromPdfInput(resumeInput);
  const normalizedText = preprocessText(rawText);
  const lines = String(rawText)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    rawText,
    parsedData: {
      name: extractName(rawText),
      skills: extractSkills(rawText),
      experience: extractExperienceYears(rawText),
      normalizedText,
      firstLine: lines[0] || null,
    },
  };
}

module.exports = {
  parseResume,
};
