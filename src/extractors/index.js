const { extractSalary } = require('./salaryExtractor');
const { extractExperienceYears } = require('./experienceExtractor');
const { extractSkills } = require('./skillsExtractor');
const { SKILL_DICTIONARY } = require('./skillDictionary');
const { extractName } = require('./nameExtractor');

function extractEntities(text) {
  // TODO: Implement shared entity extraction logic.
  return {
    text,
    entities: {},
  };
}

module.exports = {
  extractSalary,
  extractExperienceYears,
  extractSkills,
  SKILL_DICTIONARY,
  extractName,
  extractEntities,
};
