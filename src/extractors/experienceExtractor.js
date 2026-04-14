function extractExperienceYears(text) {
  const input = String(text ?? '');

  const patterns = [
    /\b\d+(?:\.\d+)?\s*\+\s*years?\b/i,
    /\b\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?\s*years?\b/i,
    /\bminimum\s+\d+(?:\.\d+)?\s*years?\b/i,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      // Return string to preserve qualifiers like "+" and ranges without lossy conversion.
      return match[0].trim();
    }
  }

  return null;
}

module.exports = {
  extractExperienceYears,
};
