import { useState } from 'react';
import Layout from '../components/Layout';
import ResumeUpload from '../components/ResumeUpload';
import JobDescriptionInput from '../components/JobDescriptionInput';
import ResultsDashboard from '../components/ResultsDashboard';
import { submitResumeAndJobs } from '../services/api';

function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit() {
    setSubmitError('');
    setSuccessMessage('');

    if (!selectedFile) {
      setSubmitError('Please select a resume PDF before submitting.');
      return;
    }

    if (jobs.length === 0) {
      setSubmitError('Please add at least one job description.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        resumeFile: selectedFile,
        jobDescriptions: jobs.map((job) => ({
          id: job.id,
          rawText: job.rawText,
        })),
      };

      const response = await submitResumeAndJobs(payload);
      setResult(response);
      setSuccessMessage('Resume and jobs submitted successfully.');
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to submit data. Please try again.';

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Resume Job Matching</h2>
        <p className="text-sm text-slate-600 sm:text-base">
          Follow the flow: upload resume, add job descriptions, submit, then view results.
        </p>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 1</p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">Upload Resume</h3>
          <p className="mb-4 mt-1 text-sm text-slate-600">Select a PDF resume file.</p>

          <ResumeUpload
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            isSubmitting={isSubmitting}
          />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 2</p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">Add Job Descriptions</h3>
          <p className="mb-4 mt-1 text-sm text-slate-600">Paste one or more JDs and add them to the list.</p>

          <JobDescriptionInput
            jobs={jobs}
            onJobsChange={setJobs}
            isSubmitting={isSubmitting}
          />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 3</p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">Submit for Matching</h3>
          <p className="mb-4 mt-1 text-sm text-slate-600">
            Ready status: {selectedFile ? 'Resume added' : 'Resume missing'} | {jobs.length} JD(s) added
          </p>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedFile || jobs.length === 0}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </section>

        {successMessage ? (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        {submitError ? (
          <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {submitError}
          </div>
        ) : null}

        {result ? (
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 4</p>
            <ResultsDashboard result={result} />
          </section>
        ) : null}
      </div>
    </Layout>
  );
}

export default HomePage;
