const { parseResume } = require('./parsers/resumeParser');
const { parseJobDescription } = require('./parsers/jdParser');
const { mapSkills } = require('./matcher/skillMapper');
const { calculateMatchScore } = require('./matcher/scoreCalculator');
const { generateFinalOutput } = require('./matcher/finalOutputBuilder');

const SAMPLE_RESUME_TEXT = [
  'Jane Doe',
  'Full Stack Developer',
  '3+ years of experience in web development',
  'Skills: Node.js, React, MongoDB, JavaScript, Docker',
].join('\n');

const SAMPLE_JOBS = [
  {
    jobId: 'J101',
    role: 'Backend Developer',
    text: [
      'Backend Developer role',
      'Salary: 10-15 LPA',
      'Experience: minimum 4 years',
      'Skills required: Node.js, MongoDB, Docker',
      'Build APIs and scalable backend services.',
    ].join('\n'),
  },
  {
    jobId: 'J102',
    role: 'Frontend Engineer',
    text: [
      'Frontend Engineer position',
      'Compensation: 12 LPA',
      'Need 2-5 years experience',
      'Skills required: React, TypeScript, CSS',
      'Work on modern UI architecture.',
    ].join('\n'),
  },
  {
    jobId: 'J103',
    role: 'MERN Developer',
    text: [
      'MERN Developer opening',
      'Budget: ₹10,00,000 per annum',
      'Required: 3+ years',
      'Skills required: Node.js, React, MongoDB, Express.js',
      'Own end-to-end feature delivery.',
    ].join('\n'),
  },
];

async function runMatchingPipeline(resumeInput = SAMPLE_RESUME_TEXT, jobs = SAMPLE_JOBS) {
  // 1) Parse resume.
  const parsedResume = await parseResume(resumeInput);
  const resumeSkills = parsedResume?.parsedData?.skills || [];

  // 2) Parse multiple job descriptions.
  const parsedJobs = jobs.map((job) => {
    const parsedJD = parseJobDescription(job.text);

    return {
      jobId: job.jobId,
      role: job.role,
      parsedData: parsedJD.parsedData,
      skills: parsedJD.parsedData.skills || [],
      aboutRole: parsedJD.parsedData.cleanedJobDescriptionSummary,
    };
  });

  // 3) Perform skill matching and 4) calculate scores.
  const enrichedJobs = parsedJobs.map((job) => {
    const skillsAnalysis = mapSkills(job.skills, resumeSkills);
    const { score } = calculateMatchScore(
      { skills: resumeSkills },
      { skills: job.skills }
    );

    return {
      ...job,
      skillsAnalysis,
      matchingScore: score,
    };
  });

  // 5) Generate final JSON output.
  return generateFinalOutput(
    {
      name: parsedResume?.parsedData?.name,
      salary: parsedResume?.parsedData?.salary || null,
      yearOfExperience: parsedResume?.parsedData?.experience,
      resumeSkills,
    },
    enrichedJobs
  );
}

if (require.main === module) {
  runMatchingPipeline()
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch((error) => {
      console.error('Pipeline execution failed:', error.message);
      process.exit(1);
    });
}

module.exports = {
  runMatchingPipeline,
  SAMPLE_RESUME_TEXT,
  SAMPLE_JOBS,
};
