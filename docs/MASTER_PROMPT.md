Act as a senior product designer, staff-level software engineer, database architect, and QA engineer. Build CloudReady AI, a polished, maintainable, production-minded AZ-900 exam preparation platform.

## 1. PRODUCT VISION

Product name: CloudReady AI
Descriptor: An independent AZ-900 learning and practice platform.

Help beginners and aspiring cloud professionals understand Microsoft Azure Fundamentals through original practice questions, immediate feedback, detailed explanations, targeted revision, and engaging learning challenges.

This must be a coherent, genuinely interactive application—not merely a landing page or static dashboard mockup. Prioritize educational value, correctness, accessibility, security, and maintainable architecture.

## 2. TECHNOLOGY AND IMPLEMENTATION STRATEGY

Use Lovable's supported React, TypeScript, and Tailwind CSS stack. Reuse the existing project setup and dependencies where possible. Use reusable components, strict types, modular code, and clear separation of presentation, domain logic, data access, and sample content.

Use Supabase for PostgreSQL persistence and authentication when the integration is available and configured.

IMPORTANT BUILD ORDER:

1. Inspect the project and existing integrations before changing files.
2. Build the complete core user journey with original local sample data.
3. Verify question selection, answer feedback, scoring, results, review, and retry.
4. Connect Supabase using secure, maintainable data-access functions.
5. Verify persistence, authentication, authorization, loading, and error states.
6. Never leave the application unusable because a backend integration is not configured. Provide a clearly labeled demo mode when necessary, without pretending demo data is persisted.

Do not expose service-role keys, API secrets, or private credentials in client code. Never disable security policies to make the application work.

## 3. VISUAL DESIGN AND BRAND IDENTITY

Create a premium, modern, clean educational SaaS interface.

Visual direction:

- Light mode as the default, with a polished dark mode.
- Light background #F8FAFC, white surfaces, primary blue #2563EB, dark text #172554.
- Dark mode with carefully selected backgrounds, readable text, and accessible contrast.
- Clean typography, consistent spacing, refined cards, restrained shadows, subtle borders, and tasteful motion.
- Professional, friendly, and technically sophisticated rather than childish or overly futuristic.
- Responsive layouts designed mobile-first and refined for desktop.
- Keyboard accessibility, semantic HTML, visible focus states, reduced-motion support, and accessible labels.
- Use an existing icon library when available.
- Avoid excessive gradients, clutter, decorative graphics, and unnecessary dependencies.

Create a consistent design system with reusable buttons, cards, progress bars, badges, dialogs, answer options, feedback panels, navigation, and empty states.

## 4. APPLICATION ROUTES AND SCREENS

Implement working navigation for:

1. / — Landing page
2. /dashboard — Learner dashboard and home
3. /learn — Topic and practice-mode selection
4. /quiz — Interactive quiz
5. /results — Completed quiz results
6. /review — Incorrect-answer review
7. /settings — Theme and learning preferences, if practical

Use the existing router if available. Handle invalid routes gracefully. Ensure browser refreshes do not unnecessarily break supported routes.

### LANDING PAGE

Include:

- CloudReady AI branding and a concise value proposition.
- A primary Start Practising action.
- Benefits explaining active recall, detailed explanations, and targeted revision.
- A preview of the learning experience.
- A link to the official AZ-900 study guide.
- The unofficial product disclaimer.

Do not invent testimonials, users, partnerships, pass rates, or performance statistics.

### HOME AND DASHBOARD

Show:

- Welcome message and clear Start Practising action.
- Cards or rings showing mastery by exam domain.
- Completed quizzes, questions answered, and recent performance when real data exists.
- Daily learning goal and study streak, clearly distinguishing recorded activity from demo data.
- Achievement badges earned through actual defined conditions.
- Recommended next study action based on recorded performance.
- Recent attempts when history exists.
- Helpful empty states for new learners.

Do not fabricate mastery, activity, achievements, or streaks. Define the mastery calculation explicitly and avoid treating a tiny sample as definitive proof of competence.

### TOPIC AND PRACTICE SELECTION

Use the three AZ-900 domains:

1. Cloud Concepts.
2. Azure Architecture and Services.
3. Azure Management and Governance.

Allow learners to choose:

- A specific domain.
- Mixed practice across domains.
- Weak Spots, based on questions the learner answered incorrectly most recently.

Show relevant topic descriptions, available question counts, and a suitable difficulty choice if supported by the question bank.

Use the current official Microsoft AZ-900 study guide as the authoritative blueprint:
https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900

Do not hardcode exam weightings without checking the current guide.

## 5. QUESTION BANK AND EDUCATIONAL CONTENT

Create 15 original sample questions distributed across the three exam domains for the initial working version.

Use a well-defined TypeScript Question type with:

- Stable unique ID.
- Question text.
- Four answer options with stable option IDs.
- Exactly one correct option for the initial MVP.
- Explanation of why the correct answer is correct.
- An individual explanation for every incorrect option.
- Exam domain and specific topic.
- Difficulty.
- Relevant official Microsoft Learn source URL.
- Content status, such as sample or reviewed, if useful.

Keep questions in a separate data module, not embedded in UI components.

Write original educational questions. Never copy real exam questions, exam dumps, or proprietary question banks. Do not invent URLs or falsely claim content has been independently verified. Clearly identify initial sample questions as sample content and design the model to support editorial review later.

## 6. QUIZ EXPERIENCE

Create a polished, one-question-at-a-time experience.

Requirements:

- Domain, mixed-practice, and weak-spot modes.
- One question visible at a time.
- Clear progress bar and question count.
- Four accessible answer options.
- Require a deliberate answer selection before submission.
- Reveal correctness immediately after the learner submits.
- Clearly distinguish correct and incorrect options using accessible green/red states plus text and icons, not color alone.
- Display an explanation for EVERY option, including the correct answer and each distractor.
- Lock the submitted answer to prevent score manipulation or duplicate scoring.
- Provide a Next button and a completion state.
- Support navigation safeguards and empty question sets.
- Track question attempts and answer timing when practical.
- Handle repeated attempts without corrupting previous results.

Add an Explain it differently action. For the initial version, provide a deterministic alternative explanation or a curated simplified explanation from the question data. Do not pretend to call an AI service when no AI service is configured. Design the interface so a real AI tutor can be integrated later.

Implement a tasteful celebration when the learner reaches a five-answer correct streak. Respect reduced-motion settings and avoid excessive animations. A streak is a UI reward, not proof of topic mastery.

## 7. SCORING AND LEARNING INTELLIGENCE

Implement scoring in pure, testable functions.

Requirements:

- Count correct, incorrect, answered, and total questions accurately.
- Calculate score as correct answers divided by the total questions in the completed quiz.
- Handle empty quizzes safely.
- Never count skipped questions as correct.
- Prevent duplicate submissions from increasing the score.
- Calculate domain breakdown from actual question attempts.
- Maintain a list of incorrect questions for review.
- Recommend a topic based on actual recent errors.
- Ensure retrying a quiz creates a new attempt instead of silently overwriting history.

Define Weak Spots as questions the learner answered incorrectly most recently, with a documented selection and ordering rule. Exclude questions already answered correctly on a later attempt if that is the chosen rule, and apply it consistently.

Distinguish a descriptive quiz score from an exam-readiness estimate. Do not claim to predict official exam outcomes.

## 8. RESULTS SCREEN

After a quiz, show:

- Final score and correct/incorrect counts.
- Domain-level performance.
- Questions missed and explanations.
- A personalized next-step recommendation.
- Review Mistakes and Retry Quiz actions.
- A shareable score card image or downloadable image generated from actual results.

The score card should include product branding, quiz mode, date, and score. Do not include personal information without consent. Ensure the share/export control works, or clearly indicate any unsupported capability rather than displaying a dead button.

Never overwrite the history of previous attempts.

## 9. LEARNING CHALLENGES AND ACHIEVEMENTS

Implement a small, honest engagement system:

- Daily question goal.
- Recorded study streak.
- First quiz completed.
- Five correct answers in a row.
- Topic practice milestones.

Define the conditions for each achievement and award it only when those conditions are met. Make the system understandable and supportive rather than manipulative. Do not invent a user's past learning activity.

For anonymous demo mode, label any sample statistics as demo data and do not claim that they are permanently saved.

## 10. SUPABASE AND DATA MODEL

Connect to Supabase after the local quiz flow works.

Design a normalized schema using appropriate UUID primary keys, foreign keys, timestamps, constraints, and indexes.

Suggested tables:

- profiles: user preferences and profile metadata.
- topics: domain and topic metadata.
- questions: question content, options, explanations, difficulty, source URL, and publication status.
- quiz_sessions: user or session reference, mode, start time, completion time, and calculated results.
- question_attempts: quiz session, question, selected option, correctness, and response timing where available.
- user_achievements: earned achievement identifiers and timestamps, if achievement persistence is implemented.

A question attempt must reference the appropriate session and question. Ensure the data model supports reviewing previous attempts and calculating weak spots from history.

Security requirements:

- Enable row-level security on private user-data tables.
- Authenticated users may read only their own profiles, sessions, attempts, and achievements.
- Restrict question-bank writes to authorized administrative access.
- Public or anonymous users may read only published practice questions if this access is intentionally enabled.
- Do not expose private records through overly broad queries.
- Never put the Supabase service-role key in browser code.
- Do not invent credentials or assume environment variables exist.
- Use the actual configured Supabase project and its supported integration.
- Provide useful authentication and connection errors.

Do not create unsafe policies just to bypass permission errors. If Supabase configuration or credentials are missing, explain the exact manual setup needed and keep demo mode working.

## 11. DATA ACCESS AND PERSISTENCE

Keep database operations in a dedicated data-access layer instead of scattering Supabase queries across UI components.

Create clear functions for:

- Loading published questions.
- Starting a quiz session.
- Saving an answer attempt.
- Completing a session.
- Loading a learner's previous sessions.
- Loading recent incorrect questions.
- Loading profile and achievement data.

Use appropriate loading, empty, success, and error states. Prevent duplicate writes on repeated clicks. Avoid presenting a successful-save message until the save actually succeeds.

Handle a failed save without silently discarding learner input. Use safe retry or recovery behavior where appropriate.

Clearly distinguish:

- Local demo data.
- Unsaved session state.
- Persisted database data.

## 12. TESTING AND ENGINEERING QUALITY

Create or use the project's existing test setup where practical.

Test pure domain functions for:

- Correct score calculation.
- Incorrect answer handling.
- Empty quiz handling.
- Skipped questions.
- Duplicate submissions.
- Domain breakdown.
- Weak-spot selection.
- Achievement eligibility.
- Quiz completion and retry behavior.

Test the critical user journeys:

1. Landing page to topic selection.
2. Topic selection to quiz.
3. Answer submission and per-option explanations.
4. Quiz completion and accurate results.
5. Review mistakes and retry.
6. Supabase persistence when configured.
7. Authorization and access boundaries when the backend is connected.
8. Responsive behavior and keyboard accessibility.

Check for TypeScript errors, broken routes, dead buttons, runtime exceptions, incorrect state updates, duplicate scoring, and inaccessible contrast.

Do not claim tests passed unless they were actually run. Fix discovered errors instead of merely listing them.

## 13. ARCHITECTURE AND MAINTAINABILITY

Use a clear, proportionate structure adapted to the existing repository:

- components/
- pages/
- data/
- types/
- lib/
- hooks/ if needed
- tests/ if supported

Separate:

- UI and reusable components.
- Question content and metadata.
- Quiz domain logic.
- Persistence and Supabase queries.
- Progress and achievement calculations.

Avoid giant single-file components, duplicated scoring logic, unnecessary abstractions, hardcoded credentials, and dependencies that do not add meaningful value.

Keep future AI integration, editorial question review, additional certifications, and analytics possible without overengineering the first version.

## 14. COMPLIANCE AND PRODUCT IDENTITY

Do not use Microsoft logos or imply official affiliation.

Display this disclaimer in an appropriate visible location:
"CloudReady AI is an independent study tool and is not affiliated with or endorsed by Microsoft. It does not contain actual exam questions."

Link to the official AZ-900 study guide. Clearly label sample content and do not claim certification or endorsement.

## 15. IMPLEMENTATION AND DELIVERY

Inspect the existing project before editing. Build incrementally and preserve working functionality.

Do not add payments, subscriptions, administrator dashboards, complex gamification, or a generative AI backend in this initial implementation.

Prioritize a reliable end-to-end learning loop and a secure, maintainable foundation.

When finished, provide a concise implementation report:

1. Routes and components implemented.
2. Features that genuinely work.
3. Database schema and security policies created, if applicable.
4. Tests and checks actually executed and their results.
5. Any manual setup still required.
6. Known limitations.
7. The recommended next engineering milestone.

Never fabricate implementation results or claim functionality that has not been verified.
