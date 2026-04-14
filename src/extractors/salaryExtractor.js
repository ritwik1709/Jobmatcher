function extractSalary(text) {
  const input = String(text ?? '');

  const patterns = [
    /\b\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?\s*LPA\b/i,
    /\b\d+(?:\.\d+)?\s*LPA\b/i,
    /₹\s*\d{1,3}(?:,\d{2,3})+(?:\.\d+)?\s*(?:per\s*annum|p\.a\.|pa)?/i,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }

  return null;
}

module.exports = {
  extractSalary,
};
