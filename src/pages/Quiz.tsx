
import { useState } from 'react'
import { getIncorrectQuestions, recordQuizSession } from '../lib/progress'

type AnswerOption = {
  id: string
  text: string
  explanation: string
}

type Question = {
  id: string
  domain: string
  question: string
  options: AnswerOption[]
  correctAnswer: string
}

const allQuestions: Question[] = [
  {
    id: 'cloud-001',
    domain: 'Cloud concepts',
    question: 'Which cloud benefit describes the ability to increase or decrease resources to meet demand?',
    options: [
      { id: 'a', text: 'High availability', explanation: 'High availability focuses on keeping services accessible and reducing downtime.' },
      { id: 'b', text: 'Scalability', explanation: 'Scalability is the ability to adjust capacity to meet changing workloads.' },
      { id: 'c', text: 'Governance', explanation: 'Governance helps organizations apply rules, policies, and controls.' },
      { id: 'd', text: 'Disaster recovery', explanation: 'Disaster recovery focuses on restoring systems and data after a disruptive event.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'cloud-002',
    domain: 'Cloud concepts',
    question: 'Which cloud service model gives customers the most control over the operating system?',
    options: [
      { id: 'a', text: 'Software as a Service (SaaS)', explanation: 'With SaaS, the provider manages the application and underlying infrastructure.' },
      { id: 'b', text: 'Platform as a Service (PaaS)', explanation: 'With PaaS, the provider manages the platform and operating system.' },
      { id: 'c', text: 'Infrastructure as a Service (IaaS)', explanation: 'IaaS gives customers control over virtual machines, including their operating systems.' },
      { id: 'd', text: 'Function as a Service', explanation: 'Function-based services let you run code without managing the underlying servers. They do not give you direct operating-system control.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'cloud-003',
    domain: 'Cloud concepts',
    question: 'What is a hybrid cloud?',
    options: [
      { id: 'a', text: 'A cloud that uses only public cloud services', explanation: 'A public cloud uses services delivered by a cloud provider. A hybrid cloud combines different cloud or infrastructure environments.' },
      { id: 'b', text: 'A cloud that combines private infrastructure with public cloud services', explanation: 'A hybrid cloud combines private infrastructure with public cloud environments.' },
      { id: 'c', text: 'A cloud used only by one individual', explanation: 'A hybrid cloud is defined by its combination of environments, not by the number of users.' },
      { id: 'd', text: 'A cloud with no internet connectivity', explanation: 'Internet connectivity is not what defines a hybrid cloud.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'azure-001',
    domain: 'Azure architecture and services',
    question: 'What is an Azure region?',
    options: [
      { id: 'a', text: 'A geographical area containing one or more Azure datacenters connected by a low-latency network', explanation: 'An Azure region is a geographical area containing Azure datacenters connected through a dedicated regional network.' },
      { id: 'b', text: 'A billing document for a subscription', explanation: 'Billing documents describe charges; they do not define Azure regions.' },
      { id: 'c', text: 'A user account with administrator permissions', explanation: 'User accounts and permissions are part of identity and access management.' },
      { id: 'd', text: 'A group of cost-management alerts', explanation: 'Cost alerts help monitor spending and are separate from regional infrastructure.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'azure-002',
    domain: 'Azure architecture and services',
    question: 'Which Azure service provides virtual machines?',
    options: [
      { id: 'a', text: 'Azure Policy', explanation: 'Azure Policy helps enforce organizational standards and assess compliance.' },
      { id: 'b', text: 'Azure Virtual Machines', explanation: 'Azure Virtual Machines provides on-demand virtualized computing resources.' },
      { id: 'c', text: 'Microsoft Purview', explanation: 'Microsoft Purview supports data governance and related data-management capabilities.' },
      { id: 'd', text: 'Azure Advisor', explanation: 'Azure Advisor provides recommendations to help optimize Azure environments.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'azure-003',
    domain: 'Azure architecture and services',
    question: 'What is an Azure resource group primarily used for?',
    options: [
      { id: 'a', text: 'To store only user passwords', explanation: 'Resource groups are not password-storage services.' },
      { id: 'b', text: 'To group and manage related Azure resources', explanation: 'A resource group is a logical container for resources that are managed together.' },
      { id: 'c', text: 'To replace every Azure subscription', explanation: 'Resource groups exist within subscriptions; they do not replace them.' },
      { id: 'd', text: 'To guarantee that every service is free', explanation: 'Resource groups do not determine whether services incur charges.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'gov-001',
    domain: 'Azure management and governance',
    question: 'Which Azure service helps enforce organizational rules on resources?',
    options: [
      { id: 'a', text: 'Azure Policy', explanation: 'Azure Policy can audit, restrict, and help enforce resource configurations according to defined rules.' },
      { id: 'b', text: 'Azure Virtual Network', explanation: 'Azure Virtual Network provides private networking capabilities.' },
      { id: 'c', text: 'Azure Virtual Machines', explanation: 'Azure Virtual Machines provides computing resources rather than general governance policy enforcement.' },
      { id: 'd', text: 'Azure Blob Storage', explanation: 'Azure Blob Storage stores unstructured data such as documents, images, and backups.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'gov-002',
    domain: 'Azure management and governance',
    question: 'Which principle gives users only the permissions they need to perform their work?',
    options: [
      { id: 'a', text: 'Unlimited access', explanation: 'Unlimited access gives users more permissions than they may need and increases risk.' },
      { id: 'b', text: 'Least privilege', explanation: 'Least privilege limits permissions to what is necessary for a task or role.' },
      { id: 'c', text: 'High availability', explanation: 'High availability aims to keep services accessible.' },
      { id: 'd', text: 'Elasticity', explanation: 'Elasticity refers to dynamically adjusting resources to workload demand.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'gov-003',
    domain: 'Azure management and governance',
    question: 'Which tool helps estimate the cost of Azure services before deployment?',
    options: [
      { id: 'a', text: 'Azure Pricing Calculator', explanation: 'The Azure Pricing Calculator estimates costs for planned Azure configurations.' },
      { id: 'b', text: 'Azure Service Health', explanation: 'Azure Service Health provides information about Azure service incidents and health events.' },
      { id: 'c', text: 'Microsoft Entra ID', explanation: 'Microsoft Entra ID provides identity and access capabilities.' },
      { id: 'd', text: 'Azure Monitor', explanation: 'Azure Monitor collects and analyzes monitoring data from Azure environments.' },
    ],
    correctAnswer: 'a',
  },

  {
    id: 'cloud-004',
    domain: 'Cloud concepts',
    question: 'Which cloud benefit allows an organization to avoid large upfront purchases of physical infrastructure?',
    options: [
      { id: 'a', text: 'Consumption-based pricing', explanation: 'Consumption-based pricing lets organizations pay for cloud resources they use instead of purchasing all infrastructure upfront.' },
      { id: 'b', text: 'Physical isolation', explanation: 'Physical isolation describes separation of infrastructure; it does not explain avoiding upfront purchases.' },
      { id: 'c', text: 'Manual scaling', explanation: 'Manual scaling is a way to change capacity, not a pricing benefit that avoids initial hardware purchases.' },
      { id: 'd', text: 'Fixed capacity', explanation: 'Fixed capacity keeps resources at a set level and does not provide the pay-for-usage benefit described.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'azure-004',
    domain: 'Azure architecture and services',
    question: 'Which Azure service is designed to host a web application without requiring you to manage the underlying servers?',
    options: [
      { id: 'a', text: 'Azure Virtual Machines', explanation: 'With virtual machines, you are responsible for managing the guest operating system and more of the underlying environment.' },
      { id: 'b', text: 'Azure App Service', explanation: 'Azure App Service is a platform-as-a-service offering for hosting web apps while Azure manages the underlying infrastructure.' },
      { id: 'c', text: 'Azure Resource Manager', explanation: 'Azure Resource Manager is the deployment and management layer for Azure resources, not a web-app hosting service itself.' },
      { id: 'd', text: 'Azure Cost Management', explanation: 'Azure Cost Management helps analyze and manage spending; it does not host web applications.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'gov-004',
    domain: 'Azure management and governance',
    question: 'Which Azure feature provides information about planned maintenance and service issues that may affect your resources?',
    options: [
      { id: 'a', text: 'Azure Pricing Calculator', explanation: 'The Pricing Calculator estimates expected costs; it does not report service incidents or planned maintenance.' },
      { id: 'b', text: 'Azure Policy', explanation: 'Azure Policy evaluates resources against organizational rules and is not the primary source for service-health events.' },
      { id: 'c', text: 'Azure Service Health', explanation: 'Azure Service Health provides personalized information about Azure service incidents, planned maintenance, and health advisories.' },
      { id: 'd', text: 'Microsoft Entra ID', explanation: 'Microsoft Entra ID manages identity and access; it does not provide Azure service-health notifications.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'cloud-005',
    domain: 'Cloud concepts',
    question: 'In the shared responsibility model, who is generally responsible for the physical security of cloud datacenters?',
    options: [
      { id: 'a', text: 'The customer only', explanation: 'Customers are responsible for aspects of their own data and configurations, but they do not operate the provider’s physical datacenters.' },
      { id: 'b', text: 'The cloud provider', explanation: 'The cloud provider is responsible for physical datacenter security, including the facilities and physical infrastructure.' },
      { id: 'c', text: 'Every end user individually', explanation: 'Individual end users do not manage the provider’s datacenter facilities.' },
      { id: 'd', text: 'The internet service provider in every case', explanation: 'An internet service provider supplies network connectivity; it is not generally responsible for the cloud provider’s physical datacenter security.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'azure-005',
    domain: 'Azure architecture and services',
    question: 'What is the purpose of an Azure availability zone?',
    options: [
      { id: 'a', text: 'To separate resources into billing accounts', explanation: 'Billing and subscription organization are separate from availability zones.' },
      { id: 'b', text: 'To define a group of users with the same permissions', explanation: 'User permissions are managed through identity and access controls, not availability zones.' },
      { id: 'c', text: 'To provide physically separate locations within an Azure region for resiliency', explanation: 'Availability zones are physically separate locations within an Azure region, designed to help protect applications and data from datacenter-level failures.' },
      { id: 'd', text: 'To automatically make every resource free', explanation: 'Availability zones are a resiliency capability and do not remove service charges.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'gov-005',
    domain: 'Azure management and governance',
    question: 'Which Azure tool provides recommendations for improving reliability, security, performance, and cost?',
    options: [
      { id: 'a', text: 'Azure Advisor', explanation: 'Azure Advisor analyzes your Azure configuration and usage and recommends ways to optimize reliability, security, performance, operational excellence, and cost.' },
      { id: 'b', text: 'Azure Virtual Network', explanation: 'Azure Virtual Network provides private networking for Azure resources; it is not the general recommendation service described.' },
      { id: 'c', text: 'Azure DNS', explanation: 'Azure DNS hosts DNS domains and manages DNS records; it does not provide broad optimization recommendations.' },
      { id: 'd', text: 'Azure Bastion', explanation: 'Azure Bastion enables secure RDP and SSH access to virtual machines through the Azure portal; it is not the general recommendation service.' },
    ],
    correctAnswer: 'a',
  },

  {
    id: 'cloud-006',
    domain: 'Cloud concepts',
    question: 'Which cloud model combines on-premises infrastructure or a private cloud with public cloud services?',
    options: [
      { id: 'a', text: 'Public cloud', explanation: 'A public cloud provides services over the internet from a cloud provider.' },
      { id: 'b', text: 'Private cloud', explanation: 'A private cloud is dedicated to one organization.' },
      { id: 'c', text: 'Hybrid cloud', explanation: 'A hybrid cloud combines private infrastructure or a private cloud with public cloud services.' },
      { id: 'd', text: 'Community cloud', explanation: 'A community cloud is shared by organizations with common requirements.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'cloud-007',
    domain: 'Cloud concepts',
    question: 'In the shared responsibility model, who is generally responsible for securing the physical datacenter?',
    options: [
      { id: 'a', text: 'The cloud provider', explanation: 'The provider secures the physical facilities and underlying cloud infrastructure.' },
      { id: 'b', text: 'The customer only', explanation: 'Customers have responsibilities, but they do not secure the provider’s physical datacenter.' },
      { id: 'c', text: 'The internet service provider', explanation: 'An internet service provider does not own responsibility for the cloud provider’s physical datacenter.' },
      { id: 'd', text: 'Every customer equally', explanation: 'Physical datacenter security is handled by the cloud provider.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'cloud-008',
    domain: 'Cloud concepts',
    question: 'Which cloud benefit means a service can continue operating despite the failure of a component?',
    options: [
      { id: 'a', text: 'Agility', explanation: 'Agility is the ability to develop and respond quickly to changing needs.' },
      { id: 'b', text: 'High availability', explanation: 'High availability is about keeping a service accessible with minimal downtime.' },
      { id: 'c', text: 'Capital expenditure', explanation: 'Capital expenditure refers to upfront spending on assets.' },
      { id: 'd', text: 'Governance', explanation: 'Governance establishes rules and controls for resources.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'cloud-009',
    domain: 'Cloud concepts',
    question: 'Which expenditure model typically replaces large upfront infrastructure purchases with usage-based payments?',
    options: [
      { id: 'a', text: 'Capital expenditure (CapEx)', explanation: 'CapEx generally involves upfront investment in physical assets.' },
      { id: 'b', text: 'Fixed asset accounting', explanation: 'This is an accounting approach, not the cloud consumption model described.' },
      { id: 'c', text: 'Operational expenditure (OpEx)', explanation: 'OpEx commonly covers ongoing expenses, including paying for cloud services as they are used.' },
      { id: 'd', text: 'Depreciation', explanation: 'Depreciation allocates an asset’s cost over time.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'cloud-010',
    domain: 'Cloud concepts',
    question: 'Which service model gives customers the greatest responsibility for managing the operating system and applications on virtual machines?',
    options: [
      { id: 'a', text: 'Software as a Service (SaaS)', explanation: 'With SaaS, the provider manages the application and its underlying platform.' },
      { id: 'b', text: 'Platform as a Service (PaaS)', explanation: 'With PaaS, the provider manages the operating system and runtime platform.' },
      { id: 'c', text: 'Infrastructure as a Service (IaaS)', explanation: 'With IaaS, customers manage the guest operating system and applications on their virtual machines.' },
      { id: 'd', text: 'Managed database service only', explanation: 'Managed database services abstract much of the underlying infrastructure management.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'azure-arch-006',
    domain: 'Azure architecture and services',
    question: 'What is the primary purpose of an Azure resource group?',
    options: [
      { id: 'a', text: 'To store only user accounts', explanation: 'User accounts are managed through identity services, not resource groups.' },
      { id: 'b', text: 'To logically organize and manage related Azure resources', explanation: 'A resource group is a logical container for resources that are managed together.' },
      { id: 'c', text: 'To replace every Azure subscription', explanation: 'Resource groups exist within subscriptions and do not replace them.' },
      { id: 'd', text: 'To provide a physical datacenter', explanation: 'A resource group is a management construct, not a physical facility.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'azure-arch-007',
    domain: 'Azure architecture and services',
    question: 'Which Azure service is designed to host and scale web applications without requiring you to manage the underlying servers?',
    options: [
      { id: 'a', text: 'Azure App Service', explanation: 'Azure App Service is a platform for hosting web apps and APIs while Azure manages the underlying infrastructure.' },
      { id: 'b', text: 'Azure Virtual Network', explanation: 'A virtual network provides private network connectivity for Azure resources.' },
      { id: 'c', text: 'Azure Files', explanation: 'Azure Files provides managed file shares.' },
      { id: 'd', text: 'Azure Policy', explanation: 'Azure Policy helps enforce organizational standards and assess compliance.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'azure-arch-008',
    domain: 'Azure architecture and services',
    question: 'Which Azure storage service is best suited for storing large amounts of unstructured object data, such as images and video files?',
    options: [
      { id: 'a', text: 'Azure Queue Storage', explanation: 'Queue Storage stores messages for asynchronous processing.' },
      { id: 'b', text: 'Azure Blob Storage', explanation: 'Blob Storage is designed for large amounts of unstructured object data.' },
      { id: 'c', text: 'Azure Disk Storage only', explanation: 'Managed disks provide block storage for Azure virtual machines.' },
      { id: 'd', text: 'Azure DNS', explanation: 'Azure DNS hosts DNS domains and records.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'azure-arch-009',
    domain: 'Azure architecture and services',
    question: 'What does an Azure availability zone provide within a supported region?',
    options: [
      { id: 'a', text: 'A separate billing subscription', explanation: 'Subscriptions are billing and management boundaries, not availability zones.' },
      { id: 'b', text: 'A dedicated identity directory', explanation: 'Identity directories are separate from the physical isolation provided by zones.' },
      { id: 'c', text: 'Physically separate datacenter locations with independent infrastructure', explanation: 'Availability zones are distinct physical locations within a region, designed to help protect workloads from datacenter-level failures.' },
      { id: 'd', text: 'A replacement for all backups', explanation: 'Availability zones improve resilience but do not replace appropriate backup and recovery plans.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'azure-arch-010',
    domain: 'Azure architecture and services',
    question: 'Which Azure service provides private network connectivity between Azure resources?',
    options: [
      { id: 'a', text: 'Azure Virtual Network', explanation: 'Azure Virtual Network enables private networking for Azure resources.' },
      { id: 'b', text: 'Microsoft Cost Management', explanation: 'Cost Management helps analyze and control cloud spending.' },
      { id: 'c', text: 'Azure Advisor', explanation: 'Azure Advisor provides recommendations for improving Azure deployments.' },
      { id: 'd', text: 'Azure Marketplace', explanation: 'Azure Marketplace is a catalog for solutions and services.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'azure-gov-006',
    domain: 'Azure management and governance',
    question: 'Which Azure feature can prevent accidental deletion of a resource by applying a delete lock?',
    options: [
      { id: 'a', text: 'Azure Service Health', explanation: 'Service Health reports Azure service issues and planned maintenance.' },
      { id: 'b', text: 'Resource locks', explanation: 'A delete lock can prevent a resource from being deleted until the lock is removed.' },
      { id: 'c', text: 'Azure Monitor metrics', explanation: 'Metrics help measure resource performance and health.' },
      { id: 'd', text: 'Azure Advisor', explanation: 'Advisor offers recommendations but does not itself prevent deletion.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'azure-gov-007',
    domain: 'Azure management and governance',
    question: 'What is the main purpose of Azure Policy?',
    options: [
      { id: 'a', text: 'To create virtual machines automatically in every region', explanation: 'Policy evaluates and enforces organizational rules; it is not a general-purpose VM deployment service.' },
      { id: 'b', text: 'To manage employee payroll', explanation: 'Azure Policy is a resource governance service, not a payroll system.' },
      { id: 'c', text: 'To create, assign, and assess rules for resource compliance', explanation: 'Azure Policy helps enforce standards and assess whether resources comply with organizational requirements.' },
      { id: 'd', text: 'To replace Microsoft Entra ID', explanation: 'Microsoft Entra ID provides identity and access management.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'azure-gov-008',
    domain: 'Azure management and governance',
    question: 'Which Azure service helps estimate expected costs before deploying resources?',
    options: [
      { id: 'a', text: 'Azure Pricing Calculator', explanation: 'The Pricing Calculator estimates costs for planned Azure services and configurations.' },
      { id: 'b', text: 'Azure Service Health', explanation: 'Service Health provides information about incidents and service health.' },
      { id: 'c', text: 'Azure Monitor', explanation: 'Azure Monitor collects and analyzes telemetry from resources.' },
      { id: 'd', text: 'Azure Bastion', explanation: 'Azure Bastion provides secure RDP and SSH connectivity to virtual machines.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'azure-gov-009',
    domain: 'Azure management and governance',
    question: 'Which Microsoft service helps administrators manage user identities and access to Azure resources?',
    options: [
      { id: 'a', text: 'Azure Blob Storage', explanation: 'Blob Storage stores unstructured data.' },
      { id: 'b', text: 'Microsoft Entra ID', explanation: 'Microsoft Entra ID provides identity and access management capabilities.' },
      { id: 'c', text: 'Azure Load Balancer', explanation: 'Load Balancer distributes network traffic across backend resources.' },
      { id: 'd', text: 'Azure Files', explanation: 'Azure Files provides managed file shares.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'azure-gov-010',
    domain: 'Azure management and governance',
    question: 'What is the purpose of multi-factor authentication (MFA)?',
    options: [
      { id: 'a', text: 'To eliminate the need for passwords in every situation', explanation: 'MFA adds verification factors; it does not always remove the need for a password.' },
      { id: 'b', text: 'To ensure every user has administrator privileges', explanation: 'MFA verifies identity and does not grant administrator permissions.' },
      { id: 'c', text: 'To require two or more different types of verification during sign-in', explanation: 'MFA combines multiple verification factors to make account compromise more difficult.' },
      { id: 'd', text: 'To encrypt every file stored in Azure automatically', explanation: 'MFA is an identity verification control, not a file encryption service.' },
    ],
    correctAnswer: 'c',
  },

]

export default function Quiz() {
  const isMistakesMode = new URLSearchParams(window.location.search).get('mode') === 'mistakes'
  const questions: Question[] = isMistakesMode
    ? getIncorrectQuestions().map((question) => ({
        id: question.questionId,
        domain: question.domain,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
      }))
    : allQuestions

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)
  const [reviewing, setReviewing] = useState(false)

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const hasAnswered = selectedAnswer !== undefined
  const answeredCount = Object.keys(answers).length

  const score = questions.filter(
    (question) => answers[question.id] === question.correctAnswer,
  ).length

  const progress = questions.length > 0
    ? Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / questions.length) * 100)
    : 0

  function selectAnswer(optionId: string) {
    if (hasAnswered) return

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }))
  }

  function finishQuiz() {
    const domainResults: Record<string, { correct: number; total: number }> = {}

    for (const question of questions) {
      if (!domainResults[question.domain]) {
        domainResults[question.domain] = { correct: 0, total: 0 }
      }

      domainResults[question.domain].total += 1

      if (answers[question.id] === question.correctAnswer) {
        domainResults[question.domain].correct += 1
      }
    }

    recordQuizSession({
      completedAt: new Date().toISOString(),
      correctAnswers: score,
      totalQuestions: questions.length,
      scorePercent: Math.round((score / questions.length) * 100),
      domainResults,
      questions: questions.map((question) => ({
        questionId: question.id,
        domain: question.domain,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        selectedAnswer: answers[question.id] ?? null,
      })),
    })

    setFinished(true)
  }

  function restartQuiz() {
    setCurrentIndex(0)
    setAnswers({})
    setFinished(false)
    setReviewing(false)
  }

  if (isMistakesMode && questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-blue-950">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
            <a href="/dashboard" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">C</span>
              <span className="text-xl font-bold tracking-tight">CloudReady <span className="text-blue-600">AI</span></span>
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl text-green-700">✓</div>
            <h1 className="mt-5 text-2xl font-bold">No mistakes to practise right now</h1>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              Complete a practice quiz first, and any questions you answer incorrectly or leave unanswered will appear here.
              If you've answered all previously missed questions correctly in a later attempt, they won't be included.
            </p>
            <a href="/quiz" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
              Take a full practice quiz
            </a>
            <div>
              <a href="/dashboard" className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900">
                ← Back to dashboard
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (finished && reviewing) {
    return (
      <div className="min-h-screen bg-slate-50 text-blue-950">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
            <a href="/dashboard" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">C</span>
              <span className="text-xl font-bold tracking-tight">CloudReady <span className="text-blue-600">AI</span></span>
            </a>
            <button type="button" onClick={() => setReviewing(false)} className="text-sm font-semibold text-slate-600 hover:text-blue-700">Back to results</button>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Practice session review</p>
          <h1 className="mt-2 text-3xl font-bold">Review your answers</h1>
          <p className="mt-3 leading-7 text-slate-600">Review your selection, the correct answer, and the explanation for each question. Use this to identify topics to revisit.</p>

          <div className="mt-7 space-y-5">
            {questions.map((question, index) => {
              const selectedId = answers[question.id]
              const selectedOption = question.options.find((option) => option.id === selectedId)
              const correctOption = question.options.find((option) => option.id === question.correctAnswer)
              const wasCorrect = selectedId === question.correctAnswer

              return (
                <article key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Question {index + 1} · {question.domain}</span>
                    <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${wasCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{wasCorrect ? 'Correct' : 'Incorrect'}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold leading-7">{question.question}</h2>

                  <div className="mt-4 space-y-3">
                    <div className={`rounded-xl border p-4 ${wasCorrect ? 'border-emerald-200 bg-emerald-50/60' : 'border-rose-200 bg-rose-50/60'}`}>
                      <p className={`text-xs font-bold uppercase tracking-wide ${wasCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>Your answer</p>
                      <p className="mt-1 font-semibold">{selectedOption ? selectedOption.text : 'No answer recorded'}</p>
                      {selectedOption && <p className="mt-2 text-sm leading-6 text-slate-700">{selectedOption.explanation}</p>}
                    </div>
                    {!wasCorrect && correctOption && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Correct answer</p>
                        <p className="mt-1 font-semibold">{correctOption.text}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{correctOption.explanation}</p>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => setReviewing(false)} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">Back to results</button>
            <button type="button" onClick={restartQuiz} className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Try again</button>
          </div>
          <p className="mt-6 text-center text-xs leading-5 text-slate-500">These are original practice questions, not actual Microsoft exam questions.</p>
        </main>
      </div>
    )
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <main className="min-h-screen bg-slate-50 px-5 py-12 text-blue-950 sm:px-8">
        <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-blue-950/5 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            {percentage >= 70 ? '🎉' : '📘'}
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-600">
            Practice session complete
          </p>
          <h1 className="mt-3 text-3xl font-bold">Your results</h1>
          <p className="mt-3 text-slate-600">
            Every practice session is an opportunity to understand something new.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 p-7">
            <p className="text-sm text-slate-500">Your score</p>
            <p className="mt-2 text-5xl font-bold tracking-tight">
              {score}
              <span className="text-2xl text-slate-400">
                {' '}/ {questions.length}
              </span>
            </p>
            <p className="mt-3 font-semibold text-blue-700">
              {percentage}% correct
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Correct</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {score}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Incorrect</p>
              <p className="mt-2 text-2xl font-bold text-rose-600">
                {questions.length - score}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            This score belongs to your current local practice session. Results
            are not saved to an account yet.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setReviewing(true)}
              className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Review answers
            </button>
            <button
              type="button"
              onClick={restartQuiz}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Try again
            </button>
            <a
              href="/dashboard"
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to dashboard
            </a>
          </div>
        </section>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
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
            className="text-sm font-semibold text-slate-600 hover:text-blue-700"
          >
            Exit quiz
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              AZ-900 practice
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Check your understanding
            </h1>
          </div>
          <span className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div
          className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={currentIndex + (hasAnswered ? 1 : 0)}
        >
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-950/5 sm:p-9">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
            {currentQuestion.domain}
          </span>

          <h2 className="mt-5 text-xl font-bold leading-8 sm:text-2xl">
            {currentQuestion.question}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Select the best answer. Explanations will appear for every option
            after you make your selection.
          </p>

          <div className="mt-6 space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.id
              const isCorrect = currentQuestion.correctAnswer === option.id

              let cardStyle = 'border-slate-200 bg-white'

              if (hasAnswered && isCorrect) {
                cardStyle = 'border-emerald-300 bg-emerald-50/50'
              } else if (hasAnswered && isSelected && !isCorrect) {
                cardStyle = 'border-rose-300 bg-rose-50/50'
              }

              let badgeStyle =
                'border-slate-200 bg-slate-50 text-slate-600'

              if (hasAnswered && isCorrect) {
                badgeStyle = 'border-emerald-600 bg-emerald-600 text-white'
              } else if (hasAnswered && isSelected && !isCorrect) {
                badgeStyle = 'border-rose-500 bg-rose-500 text-white'
              }

              return (
                <article
                  key={option.id}
                  className={`overflow-hidden rounded-2xl border transition-colors ${cardStyle}`}
                >
                  <button
                    type="button"
                    disabled={hasAnswered}
                    onClick={() => selectAnswer(option.id)}
                    aria-pressed={isSelected}
                    className="flex w-full items-start gap-4 p-4 text-left sm:p-5 disabled:cursor-default"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-bold ${badgeStyle}`}
                    >
                      {option.id.toUpperCase()}
                    </span>

                    <span className="min-w-0 flex-1 pt-1">
                      <span className="block font-semibold leading-6">
                        {option.text}
                      </span>

                      {hasAnswered && isCorrect && (
                        <span className="mt-2 block text-sm font-bold text-emerald-700">
                          ✓ Correct answer
                        </span>
                      )}

                      {hasAnswered && isSelected && !isCorrect && (
                        <span className="mt-2 block text-sm font-bold text-rose-700">
                          ✕ Your selected answer
                        </span>
                      )}
                    </span>
                  </button>

                  {hasAnswered && (
                    <div className="border-t border-slate-200/80 px-4 py-4 sm:px-5">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                          aria-hidden="true"
                        >
                          {isCorrect ? '✓' : 'i'}
                        </span>

                        <div>
                          <p
                            className={`text-sm font-bold ${
                              isCorrect
                                ? 'text-emerald-800'
                                : 'text-slate-700'
                            }`}
                          >
                            {isCorrect
                              ? 'Why this answer is correct'
                              : isSelected
                                ? 'Why your answer is incorrect'
                                : 'Why this option is incorrect'}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">
                            {option.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          {hasAnswered && (
            <div
              className={`mt-6 rounded-2xl p-4 ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-emerald-50 text-emerald-900'
                  : 'bg-amber-50 text-amber-950'
              }`}
              role="status"
              aria-live="polite"
            >
              <p className="font-bold">
                {selectedAnswer === currentQuestion.correctAnswer
                  ? 'Correct answer!'
                  : 'Not quite — review the explanations above.'}
              </p>
              <p className="mt-1 text-sm leading-6">
                {selectedAnswer === currentQuestion.correctAnswer
                  ? 'Great work. Read the other explanations too to reinforce your understanding.'
                  : 'The correct answer is highlighted in green. Review why each option is right or wrong before continuing.'}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              {answeredCount} of {questions.length} questions answered
            </p>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                disabled={!hasAnswered}
                onClick={() => setCurrentIndex((index) => index + 1)}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Next question →
              </button>
            ) : (
              <button
                type="button"
                disabled={!hasAnswered}
                onClick={finishQuiz}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                View results →
              </button>
            )}
          </div>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          These are original practice questions, not actual Microsoft exam
          questions. Verify exam objectives with the official study guide.
        </p>
      </main>
    </div>
  )
}
