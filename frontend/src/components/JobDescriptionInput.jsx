import { useState } from 'react';

function JobDescriptionInput({ jobs, onJobsChange, isSubmitting }) {
  const [jdDraft, setJdDraft] = useState('');

  function handleAddJob() {
    const rawText = jdDraft.trim();

    if (!rawText) {
      return;
    }

    const jobEntry = {
      id: `job-${Date.now()}`,
      rawText,
      parsedData: null,
      matchingScore: null,
      createdAt: new Date().toISOString(),
    };

    onJobsChange([...jobs, jobEntry]);
    setJdDraft('');
  }

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">Job Descriptions</h3>
        <p className="text-sm text-slate-600">
          Paste a JD and add it to the list for later matching.
        </p>
      </div>

      <textarea
        value={jdDraft}
        onChange={(event) => setJdDraft(event.target.value)}
        placeholder="Paste job description here..."
        rows={6}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-slate-300 transition focus:ring"
      />

      <button
        type="button"
        onClick={handleAddJob}
        disabled={!jdDraft.trim() || isSubmitting}
        className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Add Job
      </button>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-800">
          Added Job Descriptions ({jobs.length})
        </h4>

        {jobs.length === 0 ? (
          <p className="text-sm text-slate-500">No job descriptions added yet.</p>
        ) : (
          <ul className="space-y-2">
            {jobs.map((job, index) => (
              <li
                key={job.id}
                className="rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700"
              >
                <p className="font-medium text-slate-900">Job {index + 1}</p>
                <p className="mt-1 line-clamp-3 whitespace-pre-wrap">{job.rawText}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default JobDescriptionInput;
