import { useState } from 'react'
import { getProgressSnapshot, getWeakAreas } from '../lib/progress'

const domains = [
  {
    number: '01',
    title: 'Describe cloud concepts',
    progressKey: 'Cloud concepts',
    description: 'Cloud computing, benefits, and service types.',
    icon: '☁',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    number: '02',
    title: 'Describe Azure architecture and services',
    progressKey: 'Azure architecture and services',
    description: 'Core Azure architecture and cloud services.',
    icon: '▦',
    color: 'bg-indigo-50 text-indigo-700',
  },
  {
    number: '03',
    title: 'Describe Azure management and governance',
    progressKey: 'Azure management and governance',
    description: 'Security, governance, and cost management.',
    icon: '◇',
    color: 'bg-violet-50 text-violet-700',
  },
]

export default function Dashboard() {
  const progress = getProgressSnapshot()
  const recentSessions = progress.recentSessions
  const weakAreas = getWeakAreas()
  const [selectedSessionIndex, setSelectedSessionIndex] = useState<number | null>(null)
  const selectedSession = selectedSessionIndex === null
    ? null
    : recentSessions[selectedSessionIndex]

  const stats = [
    {
      label: 'Quizzes completed',
      value: String(progress.quizzesCompleted),
      helper: progress.quizzesCompleted === 0
        ? 'Complete a practice quiz to begin'
        : 'Completed practice sessions',
    },
    {
      label: 'Questions practiced',
      value: String(progress.questionsAnswered),
      helper: 'Questions in completed quizzes',
    },
    {
      label: 'Correct answers',
      value: String(progress.correctAnswers),
      helper: progress.questionsAnswered === 0
        ? 'Your correct answers will appear here'
        : `Out of ${progress.questionsAnswered} questions`,
    },
    {
      label: 'Average score',
      value: progress.averageScorePercent === null
        ? '—'
        : `${progress.averageScorePercent}%`,
      helper: progress.averageScorePercent === null
        ? 'Complete a quiz to calculate your average'
        : `Across ${progress.quizzesCompleted} completed ${progress.quizzesCompleted === 1 ? 'quiz' : 'quizzes'}`,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-slate-200 bg-white px-5 py-7 lg:flex">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold tracking-tight">
            CloudReady <span className="text-blue-600">AI</span>
          </span>
        </a>

        <p className="mb-3 mt-12 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          Workspace
        </p>

        <nav className="space-y-2" aria-label="Main navigation">
          <a href="/dashboard" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-700">
            <span aria-hidden="true">▦</span> Dashboard
          </a>
          <a href="/learn" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700">
            <span aria-hidden="true">▤</span> Learn
          </a>
          <a href="/quiz" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700">
            <span aria-hidden="true">✓</span> Practice quiz
          </a>
          <a href="/review" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700">
            <span aria-hidden="true">↻</span> Review mistakes
          </a>
        </nav>

        <div className="mt-auto rounded-2xl bg-blue-950 p-5 text-white">
          <p className="text-sm font-semibold">Small steps add up.</p>
          <p className="mt-2 text-sm leading-6 text-blue-100">
            A little focused practice today can make tomorrow easier.
          </p>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
          <div>
            <p className="text-sm text-slate-500">Your workspace</p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">Dashboard</h1>
          </div>
          <a href="/settings" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-semibold text-blue-700" aria-label="Settings">
            ⚙
          </a>
        </header>

        <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 sm:py-10">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-7 text-white shadow-xl shadow-blue-950/10 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[36px] border-white/10" />
            <div className="relative max-w-2xl">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-50">
                AZURE FUNDAMENTALS · AZ-900
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Your cloud journey starts here.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-blue-50">
                Build your understanding of Azure at your own pace. Choose a learning domain or try a practice quiz when you're ready.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/learn" className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">
                  Explore learning paths →
                </a>
                <a href="/quiz" className="rounded-xl border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                  Try a practice quiz
                </a>
              </div>
            </div>
          </section>

          <section aria-labelledby="overview-heading">
            <div className="mb-5">
              <h2 id="overview-heading" className="text-xl font-bold">Your study overview</h2>
              <p className="mt-1 text-sm text-slate-500">
                Progress from completed practice quizzes appears here. Demo progress resets when you refresh the page.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-xs text-slate-400">{stat.helper}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="mistakes-heading" className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Focused practice</p>
                <h2 id="mistakes-heading" className="mt-2 text-xl font-bold text-blue-950">Practice My Mistakes</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Revisit questions you most recently answered incorrectly or left unanswered. Questions you later answer correctly are removed from this list.
                </p>
              </div>
              <a
                href="/quiz?mode=mistakes"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Start focused practice →
              </a>
            </div>
          </section>

          <section aria-labelledby="history-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="mb-5">
              <h2 id="history-heading" className="text-xl font-bold">Recent quiz history</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your five most recent completed practice quizzes.
              </p>
            </div>

            {recentSessions.length === 0 ? (
              <div className="rounded-xl bg-slate-50 p-6 text-center">
                <p className="font-semibold text-slate-700">No quiz history yet</p>
                <p className="mt-2 text-sm text-slate-500">
                  Complete a practice quiz to see your score and date here.
                </p>
                <a href="/quiz" className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
                  Start a quiz →
                </a>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentSessions.map((session, index) => (
                  <button
                    key={`${session.completedAt}-${index}`}
                    type="button"
                    onClick={() => setSelectedSessionIndex(index)}
                    className={`flex w-full flex-col gap-3 py-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${
                      selectedSessionIndex === index ? 'rounded-xl bg-blue-50 px-3' : 'hover:bg-slate-50'
                    }`}
                    aria-pressed={selectedSessionIndex === index}
                  >
                    <div>
                      <p className="font-semibold text-blue-950">AZ-900 Practice Quiz</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {new Date(session.completedAt).toLocaleString()} · {session.totalQuestions} questions
                      </p>
                      <p className="mt-1 text-xs font-semibold text-blue-600">Click to review this attempt →</p>
                    </div>
                    <div className="flex items-center gap-3 sm:justify-end">
                      <span className="text-sm text-slate-600">
                        {session.correctAnswers}/{session.totalQuestions} correct
                      </span>
                      <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                        session.scorePercent >= 80
                          ? 'bg-green-50 text-green-700'
                          : session.scorePercent >= 60
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                      }`}>
                        {session.scorePercent}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedSession && (
              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-6">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-lg font-bold text-blue-950">Attempt review</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {new Date(selectedSession.completedAt).toLocaleString()} · {selectedSession.correctAnswers} of {selectedSession.totalQuestions} correct
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSessionIndex(null)}
                    className="self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Close review
                  </button>
                </div>

                {!selectedSession.questions || selectedSession.questions.length === 0 ? (
                  <p className="mt-4 rounded-xl bg-white p-4 text-sm leading-6 text-slate-600">
                    Individual answers were not saved for this older attempt. New quiz attempts will include full question-by-question review.
                  </p>
                ) : (
                  <div className="mt-5 space-y-5">
                    {selectedSession.questions.map((question, questionIndex) => {
                      const selectedOption = question.options.find((option) => option.id === question.selectedAnswer)
                      const correctOption = question.options.find((option) => option.id === question.correctAnswer)
                      const wasCorrect = question.selectedAnswer === question.correctAnswer

                      return (
                        <article key={`${question.questionId}-${questionIndex}`} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                              Question {questionIndex + 1} · {question.domain}
                            </p>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                              wasCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {wasCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <h4 className="mt-3 font-semibold leading-6 text-blue-950">{question.question}</h4>

                          <div className="mt-4 space-y-3">
                            {question.options.map((option) => {
                              const isSelected = option.id === question.selectedAnswer
                              const isCorrect = option.id === question.correctAnswer

                              return (
                                <div
                                  key={option.id}
                                  className={`rounded-lg border p-3 ${
                                    isCorrect
                                      ? 'border-green-200 bg-green-50'
                                      : isSelected
                                        ? 'border-red-200 bg-red-50'
                                        : 'border-slate-200 bg-white'
                                  }`}
                                >
                                  <p className="text-sm font-semibold text-slate-800">
                                    {option.id}. {option.text}
                                    {isCorrect && <span className="ml-2 text-green-700">Correct answer</span>}
                                    {isSelected && !isCorrect && <span className="ml-2 text-red-700">Your answer</span>}
                                    {isSelected && isCorrect && <span className="ml-2 text-green-700">Your answer</span>}
                                  </p>
                                  {option.explanation && (
                                    <p className="mt-1 text-sm leading-6 text-slate-600">{option.explanation}</p>
                                  )}
                                </div>
                              )
                            })}
                            {question.selectedAnswer === null && (
                              <p className="text-sm font-medium text-amber-700">You left this question unanswered.</p>
                            )}
                            {!selectedOption && question.selectedAnswer !== null && (
                              <p className="text-sm text-slate-500">Your selected answer is not available in the saved options.</p>
                            )}
                            {!correctOption && (
                              <p className="text-sm text-slate-500">The correct answer could not be matched to the saved options.</p>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </section>

          <section aria-labelledby="weak-areas-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Performance insights</p>
                <h2 id="weak-areas-heading" className="mt-2 text-xl font-bold text-blue-950">Weak Areas Analysis</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Your exam domains are ranked from lowest to highest accuracy, based on your saved completed quizzes.
                </p>
              </div>
              <a href="/learn" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                Review learning paths →
              </a>
            </div>

            {weakAreas.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <p className="font-semibold text-slate-800">Your analysis will appear here</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Complete a practice quiz to see your accuracy, performance level, and recommended topics for each domain.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {weakAreas.map((area, index) => (
                  <article key={area.domain} className="rounded-xl border border-slate-200 p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Priority {index + 1}
                          </span>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            area.status === 'Needs focus'
                              ? 'bg-red-50 text-red-700'
                              : area.status === 'Keep practising'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-green-50 text-green-700'
                          }`}>
                            {area.status}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-bold text-blue-950">{area.domain}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {area.correct} correct out of {area.total} questions
                        </p>
                      </div>
                      <p className="text-2xl font-bold tabular-nums text-blue-800">{area.accuracyPercent}%</p>
                    </div>

                    <div
                      className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
                      role="progressbar"
                      aria-label={`${area.domain} accuracy`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={area.accuracyPercent}
                    >
                      <div
                        className={`h-full rounded-full transition-all ${
                          area.status === 'Needs focus'
                            ? 'bg-red-500'
                            : area.status === 'Keep practising'
                              ? 'bg-amber-500'
                              : 'bg-green-500'
                        }`}
                        style={{ width: `${area.accuracyPercent}%` }}
                      />
                    </div>

                    <div className="mt-4 rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Recommended review</p>
                      <p className="mt-1 text-sm leading-6 text-slate-700">{area.recommendation}</p>
                    </div>
                    <a href="/learn" className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900">
                      Study this domain →
                    </a>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section aria-labelledby="domains-heading">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <h2 id="domains-heading" className="text-xl font-bold">Explore the exam domains</h2>
                <p className="mt-1 text-sm text-slate-500">Three core areas form the foundation of AZ-900.</p>
              </div>
              <a href="/learn" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                View learning paths →
              </a>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-3">
              {domains.map((domain) => {
                const result = progress.domainResults[domain.progressKey]
                const percentage = result && result.total > 0
                  ? Math.round((result.correct / result.total) * 100)
                  : null

                return (
                  <article key={domain.number} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5">
                    <div className="flex items-start justify-between">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${domain.color}`}>
                        {domain.icon}
                      </span>
                      <span className="text-sm font-semibold text-slate-400">DOMAIN {domain.number}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold leading-7">{domain.title}</h3>
                    <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{domain.description}</p>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">Quiz accuracy</span>
                        <span className="font-semibold text-blue-800">
                          {percentage === null ? 'No data yet' : `${percentage}%`}
                        </span>
                      </div>
                      <div
                        className="h-2 overflow-hidden rounded-full bg-slate-100"
                        role="progressbar"
                        aria-label={`${domain.title} quiz accuracy`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={percentage ?? 0}
                      >
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{ width: `${percentage ?? 0}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        {result
                          ? `${result.correct} correct out of ${result.total} questions across completed quizzes`
                          : 'Complete a quiz to see your results for this domain.'}
                      </p>
                    </div>

                    <a href="/learn" className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 group-hover:text-blue-900">
                      Start learning <span aria-hidden="true">→</span>
                    </a>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">A good place to begin</p>
                <h2 className="mt-2 text-xl font-bold">
                  {progress.quizzesCompleted === 0 ? 'Take your first practice quiz' : 'Keep building your confidence'}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Try original practice questions, get feedback, and see which concepts to revisit.
                </p>
              </div>
              <a href="/quiz" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                Start a quiz →
              </a>
            </div>
          </section>

          <footer className="border-t border-slate-200 py-6 text-xs leading-5 text-slate-500">
            CloudReady AI is an independent study tool and is not affiliated with or endorsed by Microsoft. It does not contain actual exam questions.
          </footer>
        </div>
      </main>
    </div>
  )
}
