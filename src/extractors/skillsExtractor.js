const { SKILL_DICTIONARY } = require('./skillDictionary');

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSkills(text, skillDictionary = SKILL_DICTIONARY) {
  const input = String(text ?? '');
  const found = new Set();

  for (const skill of skillDictionary) {
    const escapedSkill = escapeRegex(skill);
    const pattern = new RegExp(
      `(^|[^A-Za-z0-9+#])(${escapedSkill})(?=$|[^A-Za-z0-9+#])`,
      'i'
    );

    if (pattern.test(input)) {
      found.add(skill);
    }
  }

  return Array.from(found);
}

module.exports = {
  extractSkills,
};
