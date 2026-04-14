function mapSkills(jdSkills, resumeSkills) {
  const jdList = Array.isArray(jdSkills) ? jdSkills : [];
  const resumeSet = new Set(Array.isArray(resumeSkills) ? resumeSkills : []);

  return jdList.map((skill) => ({
    skill,
    presentInResume: resumeSet.has(skill),
  }));
}

module.exports = {
  mapSkills,
};
