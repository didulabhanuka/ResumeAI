const buildCoverLetterPrompt = (jobDescription, resumeText, settings) => {
  const toneMap = {
    professional: 'formal and polished, suitable for corporate environments',
    enthusiastic: 'warm, energetic, and genuinely excited about the role',
    concise: 'direct and to the point, respecting the reader\'s time',
    storytelling: 'narrative-driven, with a compelling personal story arc',
  };

  const lengthMap = {
    short: '180-220 words',
    medium: '320-380 words',
    long: '480-540 words',
  };

  const focusMap = {
    'technical-skills': 'technical skills and engineering achievements',
    leadership: 'leadership experience and team impact',
    'culture-fit': 'cultural alignment and shared values',
    'career-change': 'transferable skills and motivation for the transition',
  };

  return {
    systemPrompt: `You are an expert career coach who writes compelling, personalised cover letters.
Write in a ${toneMap[settings.tone] || toneMap['professional']} tone.
Target length: ${lengthMap[settings.length] || lengthMap['medium']}.
Focus emphasis: ${focusMap[settings.focus] || focusMap['technical-skills']}.

Rules:
- Use specific details from the resume and job description
- Never use generic filler phrases like 'I am writing to express my interest'
- Write the full letter ready to send
- Include greeting and sign-off
- Do not add any commentary outside the letter itself`,

    userPrompt: `JOB DESCRIPTION:
${jobDescription}

CANDIDATE RESUME:
${resumeText}
${settings.customNote ? `\nADDITIONAL INSTRUCTION:\n${settings.customNote}` : ''}

Write the cover letter now.`,
  };
};

module.exports = { buildCoverLetterPrompt };