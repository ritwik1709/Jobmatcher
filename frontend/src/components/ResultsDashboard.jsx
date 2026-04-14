function normalizeSkills(skills) {
  return Array.isArray(skills) ? skills : [];
}

function normalizeJobs(matchingJobs) {
  return Array.isArray(matchingJobs) ? matchingJobs : [];
}

function scoreTone(score) {
  if (score >= 75) {
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }

  if (score >= 40) {
    return 'bg-amber-100 text-amber-800 border-amber-200';
  }

  return 'bg-rose-100 text-rose-800 border-rose-200';
}

function ResultsDashboard({ result }) {
  const candidateName = result?.name || 'Not available';
  const resumeSkills = normalizeSkills(result?.resumeSkills);
  const experience = result?.yearOfExperience || 'Not available';
  const jobs = normalizeJobs(result?.matchingJobs);

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-semibold text-slate-900">Results Dashboard</h3>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Candidate</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{candidateName}</p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Extracted Experience</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{experience}</p>
        </article>
      </div>

      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Resume Skills</p>
        {resumeSkills.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No skills found.</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {resumeSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </article>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Job Matches</h4>

        {jobs.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
            No matching jobs returned yet.
          </p>
        ) : (
          <div className="grid gap-3">
            {jobs.map((job) => {
              const skillsAnalysis = Array.isArray(job?.skillsAnalysis) ? job.skillsAnalysis : [];
              const matchedSkills = skillsAnalysis.filter((item) => item?.presentInResume);
              const missingSkills = skillsAnalysis.filter((item) => !item?.presentInResume);
              const matchingScore = Number.isFinite(job?.matchingScore)
                ? Math.round(job.matchingScore)
                : 0;

              return (
                <article
                  key={job?.jobId || job?.role}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h5 className="text-base font-semibold text-slate-900">{job?.role || 'Unknown role'}</h5>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${scoreTone(matchingScore)}`}
                    >
                      Match: {matchingScore}%
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">{job?.aboutRole || 'No role summary provided.'}</p>

                  {skillsAnalysis.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-500">No skills analysis available.</p>
                  ) : (
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <section className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                            Matched Skills
                          </p>
                          <span className="rounded-full border border-emerald-300 bg-white px-2 py-0.5 text-xs font-semibold text-emerald-800">
                            {matchedSkills.length}
                          </span>
                        </div>

                        {matchedSkills.length === 0 ? (
                          <p className="text-xs text-emerald-700">No matched skills for this job.</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {matchedSkills.map((item) => (
                              <span
                                key={`${job?.jobId}-${item?.skill}-matched`}
                                className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-medium text-emerald-800"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true"></span>
                                {item?.skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </section>

                      <section className="rounded-md border border-rose-200 bg-rose-50 p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                            Missing Skills
                          </p>
                          <span className="rounded-full border border-rose-300 bg-white px-2 py-0.5 text-xs font-semibold text-rose-800">
                            {missingSkills.length}
                          </span>
                        </div>

                        {missingSkills.length === 0 ? (
                          <p className="text-xs text-rose-700">No missing skills for this job.</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {missingSkills.map((item) => (
                              <span
                                key={`${job?.jobId}-${item?.skill}-missing`}
                                className="inline-flex items-center gap-1 rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-medium text-rose-800"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" aria-hidden="true"></span>
                                {item?.skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </section>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResultsDashboard;
