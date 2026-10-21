
import { supabase } from './supabase'
import type { QuizSession } from './progress'

export async function saveQuizSessionToCloud(
  session: QuizSession,
): Promise<{ error: string | null }> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      return { error: 'Sign in to save your quiz results to the cloud.' }
    }

    const { error } = await supabase.from('quiz_sessions').insert({
      user_id: user.id,
      completed_at: session.completedAt,
      correct_answers: session.correctAnswers,
      total_questions: session.totalQuestions,
      score_percent: session.scorePercent,
      domain_results: session.domainResults,
      questions: session.questions ?? [],
    })

    if (error) throw error

    return { error: null }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Unable to save your quiz results to the cloud.',
    }
  }
}

export async function getCloudQuizSessions(): Promise<{
  sessions: QuizSession[]
  error: string | null
}> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      return {
        sessions: [],
        error: 'Sign in to view your cloud quiz history.',
      }
    }

    const { data, error } = await supabase
      .from('quiz_sessions')
      .select(
        'completed_at, correct_answers, total_questions, score_percent, domain_results, questions',
      )
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })

    if (error) throw error

    const sessions: QuizSession[] = (
      (data ?? []) as Array<{
        completed_at: string
        correct_answers: number
        total_questions: number
        score_percent: number
        domain_results: QuizSession['domainResults']
        questions: NonNullable<QuizSession['questions']>
      }>
    ).map((row) => ({
      completedAt: row.completed_at,
      correctAnswers: row.correct_answers,
      totalQuestions: row.total_questions,
      scorePercent: row.score_percent,
      domainResults: row.domain_results,
      questions: row.questions,
    }))

    return { sessions, error: null }
  } catch (error) {
    return {
      sessions: [],
      error:
        error instanceof Error
          ? error.message
          : 'Unable to load your cloud quiz history.',
    }
  }
}

export async function deleteCloudQuizSession(
  completedAt: string,
): Promise<{ error: string | null }> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      return { error: 'Sign in to manage your cloud quiz history.' }
    }

    const { error } = await supabase
      .from('quiz_sessions')
      .delete()
      .eq('user_id', user.id)
      .eq('completed_at', completedAt)

    if (error) throw error

    return { error: null }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Unable to delete your cloud quiz session.',
    }
  }
}
