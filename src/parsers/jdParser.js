const { preprocessText } = require('../utils');
const {
  extractSalary,
  extractExperienceYears,
  extractSkills,
} = require('../extractors');

function buildCleanedSummary(text) {
  const lines = String(text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(' ');

  // Keep the summary as a string so it remains easy to display, index, or reuse later.
  return preprocessText(lines).slice(0, 400);
}

function parseJobDescription(jobDescriptionText) {
  const rawText = String(jobDescriptionText ?? '');
  const cleanedJobDescriptionSummary = buildCleanedSummary(rawText);

  return {
    rawText,
    parsedData: {
      salary: extractSalary(rawText),
      experience: extractExperienceYears(rawText),
      skills: extractSkills(rawText),
      cleanedJobDescriptionSummary,
    },
  };
}

module.exports = {
  parseJobDescription,
};
