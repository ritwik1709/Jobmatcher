import httpClient from './httpClient';

export async function submitResumeAndJobs({ resumeFile, jobDescriptions }) {
  const jobs = Array.isArray(jobDescriptions) ? jobDescriptions : [];

  if (!resumeFile) {
    throw new Error('resumeFile is required');
  }

  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobDescriptions', JSON.stringify(jobs));

  const response = await httpClient.post('/match', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
