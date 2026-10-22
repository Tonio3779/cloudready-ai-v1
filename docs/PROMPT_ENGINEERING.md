# Prompt Engineering Notes — CloudReady AI

## Transparency

CloudReady AI was developed iteratively with AI assistance(ChatGpt) under a practical constraint: limited access to credits in a hosted low-code builder(Lovable). This document records reusable prompt patterns and principles, not a verbatim transcript of every prompt used. 

## Pattern 1 — Add a feature safely

> You are maintaining an existing React + TypeScript + Vite application. Implement only the requested feature. Preserve existing behavior, routes, types, and styling. Avoid unrelated refactors and new dependencies. Return the complete updated file when practical. State assumptions and give exact build/test commands.

**Why it helps:** provides stack context, scope, constraints, output format, and verification steps.

## Pattern 2 — Diagnose a build failure

> Diagnose these TypeScript/Vite errors against the existing code. Identify the root cause before proposing a fix. Make the smallest safe correction and preserve runtime behavior. Return the complete corrected file. Do not claim the fix works until `npm run build` passes; ask me to run it and share the output.

**Why it helps:** prioritizes evidence, minimal changes, and testable acceptance criteria.

## Pattern 3 — Secure cloud persistence

> Review the existing Supabase persistence flow. Ensure quiz sessions belong to the authenticated user, save/load errors are handled clearly, and database access is restricted by Row Level Security. Do not expose environment values or service-role credentials in frontend code. Identify what must be verified in Supabase and in production.

**Why it helps:** states security requirements and separates code from dashboard configuration.

## Pattern 4 — AZ-900 question quality

> Draft AZ-900 practice questions aligned to the current official Microsoft exam skills outline. For each item provide the topic/domain, question, options, correct answer, explanation for the correct answer, and explanations for plausible distractors. Avoid ambiguous wording, outdated names, and unsupported claims. Flag anything requiring verification against Microsoft documentation.

**Why it helps:** specifies structure, alignment, explanation quality, and a verification step. Review generated content before publishing.

## Pattern 5 — UX review

> Review this exam-preparation screen from the perspective of a first-time AZ-900 learner. Identify the three highest-impact usability issues. Prioritize clarity, feedback, keyboard accessibility, mobile layout, and useful loading/error/empty states. Recommend small changes that fit the existing design and can be tested quickly.

## Prompt design principles

1. **Context:** name the stack and learning goal.
2. **Constraints:** preserve working behavior and avoid unrelated changes.
3. **Structured output:** define fields required for questions and explanations.
4. **Acceptance criteria:** specify build success, accuracy, and UX checks.
5. **Grounding:** align study content with the current official exam outline.
6. **Human verification:** use AI to accelerate work, not replace accuracy checks.
7. **Iteration:** change one thing, build, test, and commit only after verification.

## Narration

“I used AI as a collaborative coding and reasoning tool, not a one-shot app generator. I broke the product into small changes, asked for explicit constraints to preserve existing behavior, used build errors as feedback, and manually tested features before committing. For question content, effective prompts specify the AZ-900 objective, structured answer/explanation fields, and a verification step. Accuracy matters more than generating a large volume of questions.”
