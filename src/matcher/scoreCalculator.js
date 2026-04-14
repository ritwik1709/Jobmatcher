function calculateMatchScore(resumeData, jobData) {
  const resumeSkills = Array.isArray(resumeData?.skills) ? resumeData.skills : [];
  const jdSkills = Array.isArray(jobData?.skills) ? jobData.skills : [];

  if (jdSkills.length === 0) {
    return {
      score: 0,
      details: {
        matchedSkills: 0,
        totalJDskills: 0,
        matchedSkillList: [],
        resumeSkills,
        jdSkills,
      },
    };
  }

  const resumeSkillSet = new Set(resumeSkills);
  const matchedSkillList = jdSkills.filter((skill) => resumeSkillSet.has(skill));
  const matchedSkills = matchedSkillList.length;
  const totalJDskills = jdSkills.length;
  const matchingScore = (matchedSkills / totalJDskills) * 100;

  return {
    score: Math.round(matchingScore),
    details: {
      matchedSkills,
      totalJDskills,
      matchedSkillList,
      resumeSkills,
      jdSkills,
    },
  };
}

module.exports = {
  calculateMatchScore,
};
