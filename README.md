# CloudReady AI

**Smarter AZ-900 practice through topic-organized quizzes, instant feedback, and explanations.**

CloudReady AI is a web-based exam-preparation prototype built for the hackathon theme **“Building Smarter Exam Prep Tools from Our Own Learning Journey.”** It addresses **Practice & Assessment — Smart Quiz Builder**.

## Problem

Studying for a cloud certification can become passive and fragmented. Learners need to check whether they understand a concept, learn why an answer is correct, and know what to revisit after making a mistake. CloudReady AI focuses on the loop: **answer → feedback → explanation → review mistakes → track progress**.

This is the product hypothesis motivating the prototype, not a claim that formal learner research has been conducted.

## Implemented features

- AZ-900 multiple-choice practice quiz.
- Immediate feedback and answer explanations.
- Questions/results organized by AZ-900 topic/domain.
- Supabase authentication: sign-up, email confirmation, sign-in, and password recovery.
- Dashboard for practice progress.
- Cloud-saved quiz sessions for signed-in users.
- Review page for questions most recently answered incorrectly or left unanswered.
- Vercel deployment and GitHub source repository.

**Scope note:** This is an independent study aid, not an official Microsoft product and not a guarantee of passing AZ-900. Verify question wording, answer keys, explanations, and topic mappings against Microsoft's current official AZ-900 study guide.

## Target users

AZ-900 beginners, students, and career-switchers who want structured practice and understandable feedback.

## Core learning loop

1. Sign in.
2. Start a practice quiz.
3. Answer and read the explanation.
4. Finish the quiz and inspect results.
5. Use the dashboard to identify topics to revisit.
6. Use Review to revisit missed or skipped questions.

## Technology

- Frontend: React, TypeScript, Vite
- Authentication: Supabase Auth
- Database and Cloud Persistence: Supabase Postgres
- Data Security: Supabase Row Level Security (RLS)
- Hosting and Deployment: Vercel
- Version Control: Git and GitHub
- GitHub version control

## Run locally

Requirements: Install Node.js and npm.

```bash
npm install
```

Create `.env.local` in the project root:

```dotenv
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Then run:

```bash
npm run dev
npm run build
```

for starting development server and build for production respectively

Never commit `.env.local` or include credential values in screenshots, issues, or documentation.

## Deployment and authentication

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel Project Settings → Environment Variables. Set Supabase Site URL to the production domain and add the production domain to Redirect URLs. Verify that the quiz-session table has RLS enabled and policies limit each user to their own rows.

`vercel.json` provides a rewrite so client-side routes such as `/dashboard` and `/review` can load directly or refresh correctly.

## AI-assisted / vibe-coding workflow

The app was built iteratively with AI assistance while access to hosted low-code builder credits was limited. The workflow emphasized small, testable changes: inspect existing code, update one feature, run the production build, manually test, then commit and push. See `docs/PROMPT_ENGINEERING.md` for reusable prompt patterns and the prompt-design approach. That document is not a verbatim transcript of every prompt used.

## Limitations and next steps

- Verify all questions and topic mappings against the current official exam objectives.
- Expand and balance question coverage across the current domains.
- Add automated tests for scoring, cloud persistence, and review filtering.
- Test accessibility and mobile layouts.
- Consider runtime AI question generation later; do not imply it exists unless implemented.

## Links

- Live prototype: https://cloudready-ai-v1.vercel.app
- GitHub: https://github.com/Tonio3779/cloudready-ai-v1
- Demo video: https://drive.google.com/file/d/1M-bbLzxTpyKx5oKCCIoduUV9T_g0rRF6/view?usp=drive_link
- Pitch deck: https://canva.link/ixmifpzsshrztro

## Disclaimer

CloudReady AI is an independent hackathon prototype. It is not affiliated with or endorsed by Microsoft. Azure and Microsoft AZ-900 are Microsoft trademarks.

The purpose of this project is to make exam practice more understandable, actionable, and accessible through feedback, explanations, and progress tracking.
