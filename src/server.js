const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { runMatchingPipeline } = require('./main');

const app = express();
const PORT = Number(process.env.PORT || 3000);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/match', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }

    const isPdf =
      req.file.mimetype === 'application/pdf' ||
      String(req.file.originalname || '').toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      return res.status(400).json({ message: 'Only PDF resume files are supported.' });
    }

    let jobDescriptions = req.body.jobDescriptions;

    if (typeof jobDescriptions === 'string') {
      try {
        jobDescriptions = JSON.parse(jobDescriptions);
      } catch (_error) {
        return res.status(400).json({ message: 'jobDescriptions must be valid JSON.' });
      }
    }

    if (!Array.isArray(jobDescriptions) || jobDescriptions.length === 0) {
      return res
        .status(400)
        .json({ message: 'jobDescriptions must be a non-empty array.' });
    }

    const normalizedJobs = jobDescriptions
      .map((job, index) => {
        if (typeof job === 'string') {
          return {
            jobId: `job-${index + 1}`,
            role: `Job ${index + 1}`,
            text: job,
          };
        }

        return {
          jobId: job?.id || job?.jobId || `job-${index + 1}`,
          role: job?.role || `Job ${index + 1}`,
          text: job?.rawText || job?.text || '',
        };
      })
      .filter((job) => String(job.text || '').trim().length > 0);

    if (normalizedJobs.length === 0) {
      return res.status(400).json({ message: 'At least one non-empty job description is required.' });
    }

    const result = await runMatchingPipeline(req.file.buffer, normalizedJobs);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to process matching request.',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`JobMatcher API server running on port ${PORT}`);
});
