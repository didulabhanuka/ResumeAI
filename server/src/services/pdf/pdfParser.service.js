const pdfParse = require('pdf-parse-fork');

const extractText = async (buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new Error('No file buffer received.');
  }

  const data = await pdfParse(buffer);
  const text = data.text.trim();

  if (text.length < 100) {
    throw new Error(
      'Could not extract text from PDF. Make sure your resume is not a scanned image.'
    );
  }

  return text;
};

module.exports = { extractText };