// const Anthropic = require('@anthropic-ai/sdk');
// const { buildScreenerPrompt } = require('../../prompts/screener.prompt');

// const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// const MODEL = 'claude-sonnet-4-20250514';

// // NON-STREAMING: Resume screener — returns parsed JSON
// const screenResume = async (jobDescription, resumeText) => {
//   const { systemPrompt, userPrompt } = buildScreenerPrompt(jobDescription, resumeText);

//   const message = await client.messages.create({
//     model: MODEL,
//     max_tokens: 1024,
//     system: systemPrompt,
//     messages: [{ role: 'user', content: userPrompt }],
//   });

//   const raw = message.content[0].text;

//   // Strip markdown code fences if Claude wraps response in ```json
//   const clean = raw.replace(/```json|```/g, '').trim();

//   try {
//     return JSON.parse(clean);
//   } catch (err) {
//     throw new Error('AI returned unexpected format. Please try again.');
//   }
// };

// module.exports = { screenResume };




const Anthropic = require('@anthropic-ai/sdk');
const { buildScreenerPrompt } = require('../../prompts/screener.prompt');
const { buildCoverLetterPrompt } = require('../../prompts/coverLetter.prompt');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = 'claude-sonnet-4-20250514';

// Check if running in demo mode
const isDemoMode = () =>
  !process.env.ANTHROPIC_API_KEY ||
  process.env.ANTHROPIC_API_KEY === 'your_key_here';

// Mock response for demo mode
const getMockScreenResult = () => ({
  jobTitle: 'Senior Node.js Developer',
  companyName: 'Tech Corp',
  matchScore: 73,
  summary: 'Strong backend candidate with relevant Node.js experience but missing some cloud skills.',
  strengths: [
    '5 years Node.js experience',
    'MongoDB and PostgreSQL',
    'REST API design',
    'Express framework',
  ],
  gaps: [
    'AWS or GCP experience',
    'Kubernetes or Docker',
    'CI/CD pipeline experience',
  ],
  redFlags: [],
  recommendation: 'INTERVIEW',
});

const getMockCoverLetter = () =>
  `Dear Hiring Manager,

I am excited to apply for the Senior Node.js Developer position at Tech Corp. With five years of hands-on experience building scalable REST APIs and working extensively with MongoDB and PostgreSQL, I am confident I can make an immediate impact on your engineering team.

Throughout my career I have designed and maintained high-performance backend systems using Node.js and Express, consistently delivering reliable APIs that serve thousands of users. My experience with both relational and non-relational databases has given me a strong foundation in data modelling and query optimisation.

I am particularly drawn to Tech Corp because of your focus on building developer tools that make engineering teams more productive. I thrive in collaborative environments where clean code and thoughtful architecture are valued.

I would welcome the opportunity to discuss how my background aligns with your needs. Thank you for your time and consideration.

Yours sincerely,
John Doe`;

// NON-STREAMING: Resume screener — returns parsed JSON
const screenResume = async (jobDescription, resumeText) => {
  if (isDemoMode()) {
    console.log('[DEMO MODE] Returning mock screen result');
    return getMockScreenResult();
  }

  const { systemPrompt, userPrompt } = buildScreenerPrompt(jobDescription, resumeText);

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const raw = message.content[0].text;
  const clean = raw.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(clean);
  } catch (err) {
    throw new Error('AI returned unexpected format. Please try again.');
  }
};

// STREAMING: Cover letter — yields chunks to caller via onChunk callback
const streamCoverLetter = async (jobDescription, resumeText, settings, onChunk) => {
  // Demo mode — simulate streaming with mock data
  if (isDemoMode()) {
    console.log('[DEMO MODE] Simulating cover letter stream');
    const mockLetter = getMockCoverLetter();
    const words = mockLetter.split(' ');

    // Simulate streaming word by word
    for (const word of words) {
      onChunk(word + ' ');
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    return mockLetter;
  }

  const { systemPrompt, userPrompt } = buildCoverLetterPrompt(
    jobDescription,
    resumeText,
    settings
  );

  const stream = await client.messages.stream({
    model: MODEL,
    max_tokens: 1500,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  let fullText = '';

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      onChunk(chunk.delta.text);
      fullText += chunk.delta.text;
    }
  }

  return fullText;
};

module.exports = { screenResume, streamCoverLetter };