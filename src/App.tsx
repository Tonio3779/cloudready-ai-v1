
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Learn from './pages/Learn'
import Quiz from './pages/Quiz'

function Home() {
  return (
    <main className="flex min-h-screen items-center bg-slate-50 px-6 text-blue-950">
      <div className="mx-auto w-full max-w-5xl py-20">
        <a href="/" className="text-xl font-bold">
          CloudReady <span className="text-blue-600">AI</span>
        </a>

        <p className="mt-12 text-sm font-bold uppercase tracking-widest text-blue-600">
          Your AZ-900 learning companion
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Build your Azure knowledge.{' '}
          <span className="text-blue-600">One concept at a time.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Prepare for Azure Fundamentals with structured learning, original
          practice questions, and explanations that help concepts make sense.
        </p>

        <a
          href="/dashboard"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Explore your dashboard →
        </a>

        <p className="mt-12 max-w-2xl text-sm leading-6 text-slate-500">
          CloudReady AI is an independent study tool and is not affiliated with
          or endorsed by Microsoft. It does not contain actual exam questions.
        </p>
      </div>
    </main>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-blue-950">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-12">
        <a href="/dashboard" className="text-sm font-semibold text-blue-600">
          ← Back to dashboard
        </a>
        <p className="mt-8 text-sm font-bold uppercase tracking-widest text-blue-600">
          CloudReady AI
        </p>
        <h1 className="mt-3 text-3xl font-bold">{title}</h1>
        <p className="mt-4 leading-7 text-slate-600">
          This page has a working route. Its learning features will be added in
          the next development steps.
        </p>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<PlaceholderPage title="Quiz results" />} />
        <Route path="/review" element={<PlaceholderPage title="Review mistakes" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
