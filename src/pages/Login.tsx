import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
    '/dashboard'

  const [isSignUp, setIsSignUp] = useState(false)
  const [isResetMode, setIsResetMode] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      if (isResetMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/reset-password`,
          },
        )

        if (error) throw error

        setSuccessMessage(
          'If an account exists for that email, a password-reset link will be sent. Check your inbox.',
        )
        return
      }

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        })

        if (error) throw error

        if (data.session) {
          navigate(redirectTo, { replace: true })
        } else {
          setSuccessMessage(
            'Your account has been created. Check your email for a confirmation link, then sign in.',
          )
          setIsSignUp(false)
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        if (error) throw error

        navigate(redirectTo, { replace: true })
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  function changeMode(mode: 'signIn' | 'signUp' | 'reset') {
    setIsSignUp(mode === 'signUp')
    setIsResetMode(mode === 'reset')
    setErrorMessage('')
    setSuccessMessage('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5EFE6] px-4 py-10 text-[#4A3F35]">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <Link to="/" className="text-sm text-[#7A6A5D] hover:underline">
          ← Back to home
        </Link>

        <div className="mb-8 mt-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B735F]">
            CloudReady AI
          </p>

          <h1 className="text-3xl font-semibold">
            {isResetMode
              ? 'Reset your password'
              : isSignUp
                ? 'Create your account'
                : 'Welcome back'}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {isResetMode
              ? 'Enter your account email and we will send you a password-reset link.'
              : isSignUp
                ? 'Create an account to begin your AZ-900 learning journey.'
                : 'Sign in to continue your AZ-900 preparation.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#8B735F] focus:ring-2 focus:ring-[#8B735F]/20"
            />
          </div>

          {!isResetMode && (
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#8B735F] focus:ring-2 focus:ring-[#8B735F]/20"
              />
            </div>
          )}

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
            disabled={loading}
            className="w-full rounded-lg bg-[#4A3F35] px-4 py-3 font-medium text-white transition hover:bg-[#625447] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'Please wait...'
              : isResetMode
                ? 'Send reset link'
                : isSignUp
                  ? 'Create account'
                  : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm text-gray-600">
          {!isResetMode && !isSignUp && (
            <p>
              <button
                type="button"
                onClick={() => changeMode('reset')}
                className="font-semibold text-[#7A5C43] hover:underline"
              >
                Forgot password?
              </button>
            </p>
          )}

          <p>
            {isResetMode ? (
              <button
                type="button"
                onClick={() => changeMode('signIn')}
                className="font-semibold text-[#7A5C43] hover:underline"
              >
                Back to sign in
              </button>
            ) : (
              <>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => changeMode(isSignUp ? 'signIn' : 'signUp')}
                  className="font-semibold text-[#7A5C43] hover:underline"
                >
                  {isSignUp ? 'Sign in' : 'Create one'}
                </button>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
