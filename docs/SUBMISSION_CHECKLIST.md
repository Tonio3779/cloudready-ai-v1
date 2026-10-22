# Hackathon Submission Checklist

## Required links

- [ ] Live prototype: https://cloudready-ai-v1.vercel.app
- [ ] GitHub: https://github.com/Tonio3779/cloudready-ai-v1
- [ ] Demo video: add final public URL
- [ ] Pitch deck: https://canva.link/ixmifpzsshrztro

## Production smoke test

- [ ] Homepage opens.
- [ ] Sign-up confirmation works.
- [ ] Confirmed user can sign in.
- [ ] Password recovery returns to production domain.
- [ ] Dashboard loads cloud progress.
- [ ] Quiz can be completed.
- [ ] Quiz session is saved to cloud.
- [ ] Review shows missed/unanswered questions from saved history.
- [ ] Refresh `/dashboard` and `/review`; neither returns 404.
- [ ] Sign out and sign in again; saved history remains.
- [ ] Check mobile layout.
- [ ] No obvious broken links, blank screens, or console errors.

## Repository hygiene

- [ ] README describes the actual implemented features.
- [ ] `.env.local` is not tracked.
- [ ] No service-role key or other secret is in frontend code/repository.
- [ ] `.gitignore` excludes `node_modules`, `dist`, and local environment files.
- [ ] `npm run build` passes.
- [ ] Latest changes are committed and pushed.
- [ ] `vercel.json` is included and routes refresh correctly.
- [ ] Prompt engineering and demo docs are included.
- [ ] Public GitHub repository opens in a private window.

## Pitch quality

- [ ] Explain the problem using an honest personal learning observation.
- [ ] Name the chosen challenge: Practice & Assessment — Smart Quiz Builder.
- [ ] Show the actual product, not just slides.
- [ ] Explain the feedback/explanation loop.
- [ ] Identify target users and use case.
- [ ] Explain AI-assisted iteration and rapid prototyping.
- [ ] Discuss impact and realistic scalability.
- [ ] State limitations honestly; avoid unsupported metrics.
- [ ] Include live app and repository links.

## Before submitting

- [ ] Tested every link while logged out/in a private browser.
- [ ] Checked event rules for duration, formats, and link permissions.
- [ ] Made sure judges can open the prototype without requesting access.
- [ ] Kept a backup of the deck, video, and repository URL.
