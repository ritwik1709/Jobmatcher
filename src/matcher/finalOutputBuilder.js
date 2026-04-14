const { mapSkills } = require('./skillMapper');
const { calculateMatchScore } = require('./scoreCalculator');

function normalizeTextField(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function normalizeSkills(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((skill) => String(skill).trim())
    .filter(Boolean);
}

function normalizeJob(job, resumeSkills) {
  const jdSkills = normalizeSkills(job?.skills || job?.parsedData?.skills);
  const skillsAnalysis = Array.isArray(job?.skillsAnalysis)
    ? job.skillsAnalysis
    : mapSkills(jdSkills, resumeSkills);

  const matchingScore = Number.isInteger(job?.matchingScore)
    ? job.matchingScore
    : calculateMatchScore({ skills: resumeSkills }, { skills: jdSkills }).score;

  return {
    jobId: normalizeTextField(job?.jobId),
    role: normalizeTextField(job?.role),
    aboutRole: normalizeTextField(
      job?.aboutRole || job?.parsedData?.cleanedJobDescriptionSummary
    ),
    skillsAnalysis,
    matchingScore,
  };
}

function generateFinalOutput(resumeData, jobs) {
  const resumeSkills = normalizeSkills(
    resumeData?.resumeSkills || resumeData?.skills || resumeData?.parsedData?.skills
  );
  const matchingJobsInput = Array.isArray(jobs)
    ? jobs
    : Array.isArray(resumeData?.matchingJobs)
      ? resumeData.matchingJobs
      : [];

  return {
    name: normalizeTextField(resumeData?.name || resumeData?.parsedData?.name),
    salary: normalizeTextField(resumeData?.salary || resumeData?.parsedData?.salary),
    yearOfExperience: normalizeTextField(
      resumeData?.yearOfExperience ||
        resumeData?.experience ||
        resumeData?.parsedData?.experience
    ),
    resumeSkills,
    matchingJobs: matchingJobsInput.map((job) => normalizeJob(job, resumeSkills)),
  };
}

module.exports = {
  generateFinalOutput,
};
