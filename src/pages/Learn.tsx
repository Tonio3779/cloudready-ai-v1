
import { useState } from 'react'

const learningDomains = [
  {
    id: 'cloud',
    number: '01',
    title: 'Describe cloud concepts',
    subtitle: 'Understand the foundations of cloud computing.',
    description:
      'Learn what cloud computing means, why organizations use it, and how cloud service models and deployment models differ.',
    topics: [
      {
        title: 'Cloud computing fundamentals',
        description: 'Understand cloud computing and how it works.',
        duration: '8 min',
      },
      {
        title: 'Benefits of cloud computing',
        description: 'Explore scalability, reliability, and agility.',
        duration: '10 min',
      },
      {
        title: 'Cloud service types',
        description: 'Compare IaaS, PaaS, and SaaS.',
        duration: '12 min',
      },
      {
        title: 'Cloud deployment models',
        description: 'Understand public, private, and hybrid clouds.',
        duration: '10 min',
      },
    ],
    color: 'bg-blue-50 text-blue-700',
    accent: 'bg-blue-600',
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Describe Azure architecture and services',
    subtitle: 'Explore the building blocks of Microsoft Azure.',
    description:
      'Discover Azure’s global infrastructure, core architectural components, and common computing, networking, and storage services.',
    topics: [
      {
        title: 'Azure global infrastructure',
        description: 'Learn about regions, region pairs, and availability zones.',
        duration: '12 min',
      },
      {
        title: 'Azure architectural components',
        description: 'Explore subscriptions, resource groups, and resources.',
        duration: '10 min',
      },
      {
        title: 'Azure compute and networking',
        description: 'Discover virtual machines, containers, and networks.',
        duration: '14 min',
      },
      {
        title: 'Azure storage services',
        description: 'Compare common cloud storage options.',
        duration: '12 min',
      },
    ],
    color: 'bg-indigo-50 text-indigo-700',
    accent: 'bg-indigo-600',
  },
  {
    id: 'governance',
    number: '03',
    title: 'Describe Azure management and governance',
    subtitle: 'Learn how to manage, secure, and control Azure.',
    description:
      'Study security capabilities, governance tools, cost management, and the resources used to monitor Azure environments.',
    topics: [
      {
        title: 'Cost management in Azure',
        description: 'Explore factors that influence cloud costs.',
        duration: '10 min',
      },
      {
        title: 'Security and Microsoft Entra ID',
        description: 'Understand identity, authentication, and access.',
        duration: '12 min',
      },
      {
        title: 'Governance and compliance',
        description: 'Learn about Azure Policy, locks, and compliance tools.',
        duration: '12 min',
      },
      {
        title: 'Monitoring and management tools',
        description: 'Explore Azure Monitor and related tools.',
        duration: '10 min',
      },
    ],
    color: 'bg-violet-50 text-violet-700',
    accent: 'bg-violet-600',
  },
]

export default function Learn() {
  const [expandedDomain, setExpandedDomain] = useState<string | null>('cloud')

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
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
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-7 text-white shadow-xl shadow-blue-950/10 sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
              Your learning library
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn the concepts. Understand the cloud.
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-blue-50">
              Explore the three AZ-900 exam domains through focused topics.
              Work through each concept at your own pace, then practise what
              you have learned.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium">
              <span className="rounded-full bg-white/15 px-4 py-2">
                3 exam domains
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2">
                12 introductory topics
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2">
                Self-paced learning
              </span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Learning paths
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Explore the exam domains
              </h2>
              <p className="mt-2 text-slate-600">
                Select a domain to explore its introductory topics.
              </p>
            </div>
            <a
              href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900"
            >
              Official exam study guide ↗
            </a>
          </div>

          <div className="mt-6 space-y-5">
            {learningDomains.map((domain) => {
              const isExpanded = expandedDomain === domain.id

              return (
                <article
                  key={domain.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedDomain(isExpanded ? null : domain.id)
                    }
                    aria-expanded={isExpanded}
                    className="flex w-full items-start gap-4 p-5 text-left sm:items-center sm:p-7"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${domain.color}`}
                    >
                      {domain.number}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-bold leading-7">
                        {domain.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-500">
                        {domain.subtitle}
                      </span>
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-7">
                      <p className="max-w-3xl leading-7 text-slate-600">
                        {domain.description}
                      </p>

                      <div className="mt-5 space-y-3">
                        {domain.topics.map((topic, index) => (
                          <div
                            key={topic.title}
                            className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${domain.color}`}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>

                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold">{topic.title}</h3>
                              <p className="mt-1 text-sm leading-6 text-slate-500">
                                {topic.description}
                              </p>
                            </div>

                            <span className="shrink-0 text-sm text-slate-500">
                              {topic.duration}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p className="mt-5 text-xs leading-5 text-slate-500">
                        These are introductory topic outlines. Full lesson
                        content and completion tracking will be implemented
                        separately.
                      </p>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-xs leading-5 text-slate-500">
          CloudReady AI is an independent study tool and is not affiliated
          with or endorsed by Microsoft. It does not contain actual exam
          questions. Use the official study guide to verify the current
          skills measured.
        </footer>
      </main>
    </div>
  )
}
