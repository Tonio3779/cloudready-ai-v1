export type DomainResult = {
  correct: number
  total: number
}

export type QuizAnswerOption = {
  id: string
  text: string
  explanation: string
}

export type QuizQuestionReview = {
  questionId: string
  domain: string
  question: string
  options: QuizAnswerOption[]
  correctAnswer: string
  selectedAnswer: string | null
}

export type QuizSession = {
  completedAt: string
  correctAnswers: number
  totalQuestions: number
  scorePercent: number
  domainResults: Record<string, DomainResult>
  // Optional so existing saved quiz records from before this feature remain valid.
  questions?: QuizQuestionReview[]
}

export type ProgressSnapshot = {
  quizzesCompleted: number
  questionsAnswered: number
  correctAnswers: number
  averageScorePercent: number | null
  domainResults: Record<string, DomainResult>
  recentSessions: QuizSession[]
}

const STORAGE_KEY = 'cloudready-ai-progress-v1'

function readQuizSessions(): QuizSession[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []
    return parsed as QuizSession[]
  } catch {
    // If browser storage is unavailable or invalid, keep the app usable in demo mode.
    return []
  }
}

export function recordQuizSession(session: QuizSession): void {
  const sessions = readQuizSessions()
  sessions.push(session)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch {
    // Storage may be disabled or full; the app should still be usable.
    // In that case, this session cannot be retained after a page reload.
  }
}


/**
 * Returns the latest saved result for each question, filtered to questions
 * that were most recently answered incorrectly or left unanswered.
 */
export function getIncorrectQuestions(): QuizQuestionReview[] {
  const latestByQuestion = new Map<string, QuizQuestionReview>()

  for (const session of readQuizSessions()) {
    for (const question of session.questions ?? []) {
      latestByQuestion.set(question.questionId, question)
    }
  }

  return [...latestByQuestion.values()].filter(
    (question) => question.selectedAnswer !== question.correctAnswer,
  )
}


export type WeakArea = {
  domain: string
  correct: number
  total: number
  accuracyPercent: number
  status: 'Needs focus' | 'Keep practising' | 'Strong'
  recommendation: string
}

const DOMAIN_RECOMMENDATIONS: Record<string, string> = {
  'Cloud concepts':
    'Review cloud computing benefits, cloud models, shared responsibility, and IaaS, PaaS, and SaaS.',
  'Azure architecture and services':
    'Review Azure regions and availability zones, resource groups, core compute, networking, and storage services.',
  'Azure management and governance':
    'Review Azure Policy, RBAC, locks, cost management, compliance tools, and management options.',
}

export function getWeakAreas(): WeakArea[] {
  const { domainResults } = getProgressSnapshot()

  return Object.entries(domainResults)
    .filter(([, result]) => result.total > 0)
    .map(([domain, result]) => {
      const accuracyPercent = Math.round((result.correct / result.total) * 100)
      const status: WeakArea['status'] =
        accuracyPercent < 60
          ? 'Needs focus'
          : accuracyPercent < 80
            ? 'Keep practising'
            : 'Strong'

      return {
        domain,
        correct: result.correct,
        total: result.total,
        accuracyPercent,
        status,
        recommendation:
          DOMAIN_RECOMMENDATIONS[domain] ??
          'Review the learning material for this domain and practise more questions.',
      }
    })
    .sort((a, b) => a.accuracyPercent - b.accuracyPercent)
}

export function getProgressSnapshot(): ProgressSnapshot {
  const quizSessions = readQuizSessions()

  const questionsAnswered = quizSessions.reduce(
    (total, session) => total + session.totalQuestions,
    0,
  )
  const correctAnswers = quizSessions.reduce(
    (total, session) => total + session.correctAnswers,
    0,
  )
  const averageScorePercent = quizSessions.length
    ? Math.round(
        quizSessions.reduce((total, session) => total + session.scorePercent, 0) /
          quizSessions.length,
      )
    : null

  const domainResults: Record<string, DomainResult> = {}

  for (const session of quizSessions) {
    for (const [domain, result] of Object.entries(session.domainResults)) {
      if (!domainResults[domain]) {
        domainResults[domain] = { correct: 0, total: 0 }
      }
      domainResults[domain].correct += result.correct
      domainResults[domain].total += result.total
    }
  }

  return {
    quizzesCompleted: quizSessions.length,
    questionsAnswered,
    correctAnswers,
    averageScorePercent,
    domainResults,
    recentSessions: [...quizSessions].slice(-5).reverse(),
  }
}
