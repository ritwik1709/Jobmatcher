# JobMatcher

Resume Parsing and Job Matching system with a Node.js backend and React frontend.

This project lets a user:
- Upload a resume PDF
- Add multiple job descriptions
- Run matching
- View parsed details and job-wise matching analysis

## Tech Stack

- Backend: Node.js, Express, Multer, pdf-parse
- Frontend: React (Vite), Tailwind CSS, Axios

## Project Structure

```text
Jobmatcher/
  src/
    extractors/      # Regex/rule-based extractors (skills, salary, experience, name)
    matcher/         # Skill mapping, score calculation, final output builder
    parsers/         # Resume parser and JD parser
    utils/           # Text preprocessing utilities
    main.js          # Reusable matching pipeline
    server.js        # Express API server
  frontend/
    src/
      components/    # UI components (upload, JD input, dashboard, layout)
      pages/         # Main page
      services/      # Axios API layer
```

## Prerequisites

- Node.js 18+
- npm 9+

## Setup Instructions

### 1) Install backend dependencies

From project root:

```bash
npm install
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
```

### 3) Configure frontend API base URL (optional)

Create a file at `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

If not set, frontend defaults to `http://localhost:3000`.

## Run the Project

You need two terminals.

### Terminal A: Start backend API

From project root:

```bash
npm start
```

Backend runs on:
- `http://localhost:3000`

Health check:
- `GET http://localhost:3000/health`

### Terminal B: Start frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:
- `http://localhost:5173`

## How to Use

1. Open frontend in browser.
2. Upload a resume PDF.
3. Paste one or more job descriptions and click Add Job.
4. Click Submit.
5. View results dashboard with:
   - Candidate name
   - Resume skills
   - Extracted experience
   - Per-job score and matched/missing skills

## API Contract

### `POST /match`

Content type: `multipart/form-data`

Fields:
- `resume`: PDF file
- `jobDescriptions`: JSON string array

Supported job item shapes:

```json
[
  { "id": "job-1", "role": "Backend Developer", "rawText": "..." },
  { "jobId": "job-2", "role": "Frontend Engineer", "text": "..." },
  "Raw JD text"
]
```

Success response (example):

```json
{
  "name": "Jane Doe",
  "salary": null,
  "yearOfExperience": "3+ years",
  "resumeSkills": ["Node.js", "React"],
  "matchingJobs": [
    {
      "jobId": "job-1",
      "role": "Backend Developer",
      "aboutRole": "...",
      "skillsAnalysis": [
        { "skill": "Node.js", "presentInResume": true }
      ],
      "matchingScore": 80
    }
  ]
}
```

## Available Scripts

Backend (root):
- `npm start` -> run API server
- `npm run pipeline` -> run local sample pipeline (no HTTP)

Frontend (`frontend/`):
- `npm run dev` -> start Vite dev server
- `npm run build` -> production build
- `npm run preview` -> preview built app

## Troubleshooting

- Backend not reachable:
  - Ensure `npm start` is running from project root.
  - Check `http://localhost:3000/health`.
- Frontend cannot call API:
  - Verify `VITE_API_BASE_URL` in `frontend/.env`.
  - Ensure backend port is `3000`.
- Resume upload fails:
  - Only PDF files are accepted.
  - Max file size is 10 MB.
