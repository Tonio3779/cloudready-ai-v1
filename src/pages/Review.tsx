import { useEffect, useMemo, useState } from 'react'
import { getCloudQuizSessions } from '../lib/cloudProgress'
import type { QuizSession } from '../lib/progress'

type ReviewQuestion = NonNullable<QuizSession['questions']>[number]

type Mistake = {
  question: ReviewQuestion
  completedAt: string
}

export default function Review() {
  const [sessions, setSessions] = useState<QuizSession[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadHistory() {
      setLoading(true)
      setErrorMessage('')

      const result = await getCloudQuizSessions()
      if (!active) return

      if (result.error) {
        setErrorMessage(
          'We could not load your cloud quiz history. Please check your connection and try again.',
        )
        setLoading(false)
        return
      }

      setSessions(result.sessions)
      setLoading(false)
    }

    void loadHistory()

    return () => {
      active = false
    }
  }, [])

  const mistakes = useMemo(() => {
    // The cloud history is ordered newest first. Keep each question's latest
    // attempt so a question disappears from this list after it is answered
    // correctly in a later quiz.
    const latestAttemptByQuestion = new Map<string, Mistake>()

    const orderedSessions = [...sessions].sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
    )

    for (const session of orderedSessions) {
      for (const question of session.questions ?? []) {
        if (!latestAttemptByQuestion.has(question.questionId)) {
          latestAttemptByQuestion.set(question.questionId, {
            question,
            completedAt: session.completedAt,
          })
        }
      }
    }

    return [...latestAttemptByQuestion.values()]
      .filter(
        ({ question }) =>
          !question.selectedAnswer ||
          question.selectedAnswer !== question.correctAnswer,
      )
      .sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      )
  }, [sessions])

  const groupedMistakes = useMemo(() => {
    const groups = new Map<string, Mistake[]>()

    for (const mistake of mistakes) {
      const domain = mistake.question.domain || 'Other topics'
      const current = groups.get(domain) ?? []
      current.push(mistake)
      groups.set(domain, current)
    }

    return [...groups.entries()]
  }, [mistakes])

  function formatDate(value: string) {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'Date unavailable'
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              C
            </span>
            <span className="text-xl font-bold tracking-tight">
              CloudReady <span className="text-blue-600">AI</span>
            </span>
          </a>
          <a
            href="/dashboard"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
          >
            Back to dashboard
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Your learning progress
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Review your mistakes
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Revisit questions you answered incorrectly or skipped. Your latest
          attempt for each question is used, so questions you later answer
          correctly are removed from this list.
        </p>

        {loading && (
          <div
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600"
            role="status"
          >
            Loading your saved quiz history…
          </div>
        )}

        {!loading && errorMessage && (
          <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <h2 className="font-bold text-rose-900">
              Your review history is unavailable
            </h2>
            <p className="mt-2 leading-6 text-rose-800">{errorMessage}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !errorMessage && mistakes.length === 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700">
              ✓
            </div>
            <h2 className="mt-5 text-2xl font-bold">
              {sessions.length === 0
                ? 'Your cloud review list is ready'
                : 'No outstanding mistakes'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              {sessions.length === 0
                ? 'You do not have any cloud-saved quiz attempts yet. Complete a practice quiz while signed in, and your missed or unanswered questions will appear here.'
                : 'Great work. Based on your latest saved attempt for each question, there are no incorrect or unanswered questions to review.'}
            </p>
            <a
              href="/quiz"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Take a practice quiz
            </a>
            <div>
              <a
                href="/dashboard"
                className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                ← Back to dashboard
              </a>
            </div>
          </section>
        )}

        {!loading && !errorMessage && mistakes.length > 0 && (
          <>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Questions to review</p>
                <p className="mt-2 text-3xl font-bold">{mistakes.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Topics to revisit</p>
                <p className="mt-2 text-3xl font-bold">{groupedMistakes.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Source</p>
                <p className="mt-2 text-lg font-bold">Cloud history</p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {groupedMistakes.map(([domain, domainMistakes]) => (
                <section key={domain}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold">{domain}</h2>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {domainMistakes.length}{' '}
                      {domainMistakes.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {domainMistakes.map(({ question, completedAt }, index) => {
                      const selectedOption = question.options.find(
                        (option) => option.id === question.selectedAnswer,
                      )
                      const correctOption = question.options.find(
                        (option) => option.id === question.correctAnswer,
                      )

                      return (
                        <article
                          key={`${question.questionId}-${completedAt}`}
                          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                              Question {index + 1}
                            </span>
                            <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
                              {question.selectedAnswer ? 'Incorrect' : 'Not answered'}
                            </span>
                          </div>

                          <h3 className="mt-4 text-lg font-bold leading-7">
                            {question.question}
                          </h3>
                          <p className="mt-2 text-xs text-slate-500">
                            Last attempted {formatDate(completedAt)}
                          </p>

                          <div className="mt-4 space-y-3">
                            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-rose-700">
                                Your answer
                              </p>
                              <p className="mt-1 font-semibold text-blue-950">
                                {selectedOption
                                  ? selectedOption.text
                                  : 'No answer recorded'}
                              </p>
                              {selectedOption?.explanation && (
                                <p className="mt-2 text-sm leading-6 text-slate-700">
                                  {selectedOption.explanation}
                                </p>
                              )}
                            </div>

                            {correctOption && (
                              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                  Correct answer
                                </p>
                                <p className="mt-1 font-semibold text-blue-950">
                                  {correctOption.text}
                                </p>
                                {correctOption.explanation && (
                                  <p className="mt-2 text-sm leading-6 text-slate-700">
                                    {correctOption.explanation}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}

        <p className="mt-8 text-center text-xs leading-5 text-slate-500">
          These are original practice questions, not actual Microsoft exam
          questions. Verify exam objectives with the official study guide.
        </p>
      </main>
    </div>
  )
}
