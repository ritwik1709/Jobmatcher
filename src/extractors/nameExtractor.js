function extractName(text) {
  const input = String(text ?? '');
  const firstLine = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (!firstLine) {
    return null;
  }

  const cleaned = firstLine.replace(/\s{2,}/g, ' ').trim();
  return cleaned || null;
}

module.exports = {
  extractName,
};
