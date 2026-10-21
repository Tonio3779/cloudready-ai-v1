import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [checkingSession, setCheckingSession] = useState(true)
  const [hasRecoverySession, setHasRecoverySession] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    let active = true

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return

      if (event === 'PASSWORD_RECOVERY' && session) {
        setHasRecoverySession(true)
        setCheckingSession(false)
      } else if (event === 'SIGNED_OUT') {
        setHasRecoverySession(false)
        setCheckingSession(false)
      }
    })

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return

      if (error) {
        setErrorMessage('Unable to verify your reset link. Request a new one and try again.')
        setHasRecoverySession(false)
      } else {
        // Supabase may establish the recovery session from the email link
        // before this page mounts, so accept an existing authenticated session.
        setHasRecoverySession(Boolean(data.session))
      }

      setCheckingSession(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (password.length < 6) {
      setErrorMessage('Your password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('The passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) throw error

      setSuccessMessage('Your password has been updated. You can now sign in with your new password.')

      // End the recovery session so the user returns to the normal login flow.
      await supabase.auth.signOut()
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to update your password. Request a new reset link and try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5EFE6] px-4 py-10 text-[#4A3F35]">
        <p className="text-sm text-gray-600">Verifying your password-reset link...</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5EFE6] px-4 py-10 text-[#4A3F35]">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <Link to="/login" className="text-sm text-[#7A6A5D] hover:underline">
          ← Back to sign in
        </Link>

        <div className="mb-8 mt-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B735F]">
            CloudReady AI
          </p>
          <h1 className="text-3xl font-semibold">Choose a new password</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Use at least 6 characters for your new password.
          </p>
        </div>

        {!hasRecoverySession ? (
          <div className="space-y-4">
            <p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-800">
              {errorMessage || 'This reset link is invalid, expired, or has already been used. Request a new password-reset email to continue.'}
            </p>
            <Link
              to="/login"
              className="inline-flex w-full justify-center rounded-lg bg-[#4A3F35] px-4 py-3 font-medium text-white transition hover:bg-[#625447]"
            >
              Return to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="new-password" className="mb-2 block text-sm font-medium">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#8B735F] focus:ring-2 focus:ring-[#8B735F]/20"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">
                Confirm new password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#8B735F] focus:ring-2 focus:ring-[#8B735F]/20"
                placeholder="Re-enter your new password"
              />
            </div>

            {errorMessage && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || Boolean(successMessage)}
              className="w-full rounded-lg bg-[#4A3F35] px-4 py-3 font-medium text-white transition hover:bg-[#625447] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Updating password...' : 'Update password'}
            </button>

            {successMessage && (
              <button
                type="button"
                onClick={() => navigate('/login', { replace: true })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 font-medium text-[#4A3F35] transition hover:bg-gray-50"
              >
                Continue to sign in
              </button>
            )}
          </form>
        )}
      </section>
    </main>
  )
}
