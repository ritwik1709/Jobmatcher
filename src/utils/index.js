function preprocessText(input) {
  return String(input ?? '')
    .replace(/[\r\n]+/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeText(input) {
  return preprocessText(input);
}

module.exports = {
  preprocessText,
  normalizeText,
};
