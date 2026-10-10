import {
  Agreement,
  Delivery,
  Dispute,
  Milestone,
  PaymentRecord,
  Project,
  Review,
  UserProfile,
} from '../types/fairwork';

export const mockUsers: Record<string, UserProfile> = {
  client_01: {
    id: 'client_01',
    displayName: 'Nexus Ventures (Alice)',
    role: 'CLIENT',
    verificationStatus: 'ID_VERIFIED',
    email: 'alice@nexusventures.io',
    bio: 'Fintech and Web3 venture studio commissioning high-assurance engineering.',
    reputationScore: 98,
    createdAt: '2026-01-10T09:00:00Z',
  },
  freelancer_01: {
    id: 'freelancer_01',
    displayName: 'Bob Martinez',
    role: 'FREELANCER',
    verificationStatus: 'VERIFIED_PRO',
    email: 'bob@martinez.tech',
    skills: ['TypeScript', 'React 19', 'Solidity', 'Zero-Knowledge Proofs', 'Vitest'],
    reputationScore: 99,
    createdAt: '2026-01-12T14:30:00Z',
  },
  arbitrator_01: {
    id: 'arbitrator_01',
    displayName: 'Claire Justice, Esq.',
    role: 'ARBITRATOR',
    verificationStatus: 'VERIFIED_PRO',
    email: 'claire@fairwork-arbitration.org',
    reputationScore: 100,
    createdAt: '2026-01-01T00:00:00Z',
  },
};

export const initialProjects: Project[] = [
  {
    id: 'prj_00',
    title: 'E-commerce Website Platform',
    description: 'Modern full-stack e-commerce store with verifiable milestone escrow, responsive UI, catalog browsing, cart checkout, and payment webhook integration.',
    clientId: 'client_01',
    freelancerId: 'freelancer_01',
    currency: 'INR',
    totalBudgetMinor: 3000000, // ₹30,000.00 (30,000 * 100 minor units)
    startDate: '2026-02-01',
    targetCompletionDate: '2026-04-30',
    status: 'ACTIVE',
    activeAgreementId: 'agr_00_v2',
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 'prj_01',
    title: 'Decentralized Analytics Dashboard MVP',
    description: 'Verifiable analytics dashboard with audit trail, reactive charts, and tamper-evident data exports.',
    clientId: 'client_01',
    freelancerId: 'freelancer_01',
    currency: 'USD',
    totalBudgetMinor: 500000, // $5,000.00
    startDate: '2026-02-01',
    targetCompletionDate: '2026-03-31',
    status: 'ACTIVE',
    activeAgreementId: 'agr_01_v1',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'prj_02',
    title: 'Cross-Border Payment Gateway Integration',
    description: 'High-throughput payment gateway integration with multi-currency settlement and automated reconciliation.',
    clientId: 'client_01',
    freelancerId: 'freelancer_01',
    currency: 'USD',
    totalBudgetMinor: 850000, // $8,500.00
    startDate: '2026-01-15',
    targetCompletionDate: '2026-04-15',
    status: 'ACTIVE',
    activeAgreementId: 'agr_02_v1',
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-10T11:00:00Z',
  },
  {
    id: 'prj_03',
    title: 'Zero-Knowledge Proof Identity Verifier',
    description: 'Privacy-preserving identity circuit verifier with client-side proof generation and benchmark reports.',
    clientId: 'client_01',
    freelancerId: 'freelancer_01',
    currency: 'USD',
    totalBudgetMinor: 420000, // $4,200.00
    startDate: '2026-02-10',
    targetCompletionDate: '2026-04-30',
    status: 'ACTIVE',
    activeAgreementId: 'agr_03_v1',
    createdAt: '2026-02-10T14:00:00Z',
    updatedAt: '2026-02-20T16:00:00Z',
  },
];

export const initialAgreements: Agreement[] = [
  // E-commerce Website Platform - v1 (Archived historical base version)
  {
    id: 'agr_00_v1',
    projectId: 'prj_00',
    versionNumber: 1,
    structuredTerms: {
      scopeSummary: 'Design and build modern E-commerce website with responsive design, basic product catalog, cart, and payment checkout.',
      deliverablesSummary: 'Figma prototypes, Next.js frontend repository, Express/Node API backend, and basic deployment guide.',
      intellectualPropertyClause: 'ON_PAYMENT',
      confidentiality: true,
      governingLaw: 'Commercial Arbitration Rules',
      customClauses: [
        {
          title: 'Acceptance Verification',
          content: 'Every milestone must be independently verified against agreed acceptance criteria before funds release.',
        },
        {
          title: 'Escrow Requirement',
          content: 'Freelancer shall not begin work on any milestone until funds are verified in escrow.',
        },
      ],
    },
    proposedBy: 'client_01',
    acceptedBy: {
      client_01: {
        acceptedAt: '2026-02-01T09:15:00Z',
        signatureHash: 'sig_client01_ecom_v1_00a1',
      },
      freelancer_01: {
        acceptedAt: '2026-02-01T09:45:00Z',
        signatureHash: 'sig_free01_ecom_v1_88b2',
      },
    },
    isActive: false, // Superseded by v2
    agreementHash: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
    createdAt: '2026-02-01T09:15:00Z',
  },
  // E-commerce Website Platform - v2 (Current Active Version with Enhanced Performance SLA & 2-revision cap)
  {
    id: 'agr_00_v2',
    projectId: 'prj_00',
    versionNumber: 2,
    structuredTerms: {
      scopeSummary: 'Design and build modern E-commerce website with responsive design, product catalog, instant search filtering, cart state persistence, and automated payment webhook reconciliation.',
      deliverablesSummary: 'Figma interactive component library, Next.js production frontend (Lighthouse >= 90), Node.js idempotent payment API, and Docker CI/CD deployment runbook.',
      intellectualPropertyClause: 'ON_PAYMENT',
      confidentiality: true,
      governingLaw: 'Commercial Arbitration Rules',
      customClauses: [
        {
          title: 'Acceptance Verification',
          content: 'Every milestone must be independently verified against agreed acceptance criteria before funds release.',
        },
        {
          title: 'Escrow Requirement',
          content: 'Freelancer shall not begin work on any milestone until funds are verified in escrow.',
        },
        {
          title: 'Performance & Lighthouse SLA',
          content: 'Frontend deliverable must attain a minimum Google Lighthouse performance score of 90 on mobile & desktop before milestone sign-off.',
        },
        {
          title: 'Review Window & Revision Limits',
          content: 'Client agrees to review submitted deliverables within 5 calendar days. Up to 2 standard revisions included per milestone before formal amendment.',
        },
      ],
    },
    proposedBy: 'client_01',
    acceptedBy: {
      client_01: {
        acceptedAt: '2026-02-12T10:00:00Z',
        signatureHash: 'sig_client01_ecom_v2_f81c',
      },
      freelancer_01: {
        acceptedAt: '2026-02-12T10:30:00Z',
        signatureHash: 'sig_free01_ecom_v2_93d4',
      },
    },
    isActive: true,
    agreementHash: '3a7c9d1e2f4b5a6c8e0d1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    createdAt: '2026-02-12T10:00:00Z',
  },
  {
    id: 'agr_01_v1',
    projectId: 'prj_01',
    versionNumber: 1,
    structuredTerms: {
      scopeSummary: 'Develop frontend React components, integration tests, and reproducible state machine for analytics.',
      deliverablesSummary: 'Clean source code repository, documentation, test coverage report >= 90%, docker-compose setup.',
      intellectualPropertyClause: 'ON_PAYMENT',
      confidentiality: true,
      governingLaw: 'Delaware, USA (Commercial Arbitration)',
      customClauses: [
        {
          title: 'Inspection & Review Window',
          content: 'Client agrees to review submitted deliverables within 5 business days of notification.',
        },
        {
          title: 'Verifiable Delivery Integrity',
          content: 'All deliverable files must include an immutable SHA-256 content hash upon submission.',
        },
      ],
    },
    proposedBy: 'client_01',
    acceptedBy: {
      client_01: {
        acceptedAt: '2026-02-01T10:15:00Z',
        signatureHash: 'sig_client01_a9f4e2c',
      },
      freelancer_01: {
        acceptedAt: '2026-02-01T11:45:00Z',
        signatureHash: 'sig_freelance_83cb10d',
      },
    },
    isActive: true,
    agreementHash: 'b4a1f6e2978932ca23d7890fca78e1208945cf4598127394857291a273891024',
    createdAt: '2026-02-01T10:15:00Z',
  },
  {
    id: 'agr_02_v1',
    projectId: 'prj_02',
    versionNumber: 1,
    structuredTerms: {
      scopeSummary: 'End-to-end payment gateway adapters, webhook verification, and automated settlement cron.',
      deliverablesSummary: 'TypeScript API SDK, integration tests suite, and deployment terraform manifests.',
      intellectualPropertyClause: 'ON_PAYMENT',
      confidentiality: true,
      governingLaw: 'Delaware, USA',
    },
    proposedBy: 'client_01',
    acceptedBy: {
      client_01: { acceptedAt: '2026-01-15T09:30:00Z', signatureHash: 'sig_client01_p2' },
      freelancer_01: { acceptedAt: '2026-01-15T10:00:00Z', signatureHash: 'sig_free01_p2' },
    },
    isActive: true,
    agreementHash: '9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    createdAt: '2026-01-15T09:30:00Z',
  },
  {
    id: 'agr_03_v1',
    projectId: 'prj_03',
    versionNumber: 1,
    structuredTerms: {
      scopeSummary: 'Circom circuits for identity proof verification, wasm proof generation, and verification contract.',
      deliverablesSummary: 'Audited circom circuits, proving benchmarks, unit tests with 100% path coverage.',
      intellectualPropertyClause: 'ON_PAYMENT',
      confidentiality: false,
      governingLaw: 'Delaware, USA',
    },
    proposedBy: 'client_01',
    acceptedBy: {
      client_01: { acceptedAt: '2026-02-10T14:30:00Z', signatureHash: 'sig_client01_p3' },
      freelancer_01: { acceptedAt: '2026-02-10T15:00:00Z', signatureHash: 'sig_free01_p3' },
    },
    isActive: true,
    agreementHash: '4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e',
    createdAt: '2026-02-10T14:30:00Z',
  },
];

export const initialMilestones: Milestone[] = [
  // E-commerce Project Milestones (Total ₹30,000 = 3000000 minor units)
  {
    id: 'ms_ecom_01',
    projectId: 'prj_00',
    title: 'UI/UX Design',
    description: 'Complete Figma wireframes, component library, and responsive design systems for desktop and mobile.',
    amountMinor: 500000, // ₹5,000.00
    deadline: '2026-02-15',
    acceptanceCriteria: [
      'Complete desktop and mobile responsive Figma component designs',
      'Design tokens for colors, typography, spacing, and buttons',
      'Interactive prototype walkthrough and design system guide',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 1,
    status: 'RELEASED', // Fully approved and funds released!
    fundedAt: '2026-02-02T10:00:00Z',
    submittedAt: '2026-02-10T14:00:00Z',
    approvedAt: '2026-02-12T11:00:00Z',
    releasedAt: '2026-02-12T11:30:00Z',
    createdAt: '2026-02-01T09:30:00Z',
    updatedAt: '2026-02-12T11:30:00Z',
  },
  {
    id: 'ms_ecom_02',
    projectId: 'prj_00',
    title: 'Frontend Development',
    description: 'Responsive Next.js web application with product catalog browsing, search filters, and shopping cart state.',
    amountMinor: 1200000, // ₹12,000.00
    deadline: '2026-03-05',
    acceptanceCriteria: [
      'Responsive product grid and search filtering with instant state update',
      'Persistent shopping cart with quantity adjustments and coupon input',
      'Client-side performance Lighthouse score >= 90',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 1,
    status: 'SUBMITTED', // Funded and submitted! Ready for client review
    fundedAt: '2026-02-13T10:00:00Z',
    submittedAt: '2026-02-28T16:00:00Z',
    createdAt: '2026-02-01T09:30:00Z',
    updatedAt: '2026-02-28T16:00:00Z',
  },
  {
    id: 'ms_ecom_03',
    projectId: 'prj_00',
    title: 'Backend Integration',
    description: 'REST API, inventory management, user authentication, and payment gateway webhook receiver.',
    amountMinor: 800000, // ₹8,000.00
    deadline: '2026-03-25',
    acceptanceCriteria: [
      'Secure payment gateway checkout session creation and webhook signature validation',
      'Database idempotency for order fulfillment and stock reservation',
      'API test suite with integration tests passing 100%',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 0,
    status: 'FUNDED', // Funded by client! Freelancer is working on it
    fundedAt: '2026-02-13T10:00:00Z',
    createdAt: '2026-02-01T09:30:00Z',
    updatedAt: '2026-02-13T10:00:00Z',
  },
  {
    id: 'ms_ecom_04',
    projectId: 'prj_00',
    title: 'Final Delivery',
    description: 'Production deployment, end-to-end user acceptance testing, SSL setup, and admin training handover.',
    amountMinor: 500000, // ₹5,000.00
    deadline: '2026-04-15',
    acceptanceCriteria: [
      'Production deployment on cloud infrastructure with SSL and automated CI/CD',
      'Full test suite pass report and zero high-severity vulnerabilities',
      'Comprehensive admin documentation and maintenance runbook',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 0,
    status: 'AWAITING_FUNDING', // Unfunded upcoming milestone
    createdAt: '2026-02-01T09:30:00Z',
    updatedAt: '2026-02-01T09:30:00Z',
  },

  // Project 1 Milestones
  {
    id: 'ms_01',
    projectId: 'prj_01',
    title: 'Milestone 1: Core Architecture & Data Engine',
    description: 'Project setup, strict state transitions, invariant checks, and unit test suite.',
    amountMinor: 200000, // $2,000.00
    deadline: '2026-02-28',
    acceptanceCriteria: [
      'Comprehensive TypeScript type definitions',
      'Deterministic state transition validator',
      '100% passing automated unit tests',
      'Verifiable SHA-256 fingerprinting helper',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 1,
    status: 'SUBMITTED', // Awaiting client review!
    fundedAt: '2026-02-02T12:00:00Z',
    submittedAt: '2026-02-24T18:30:00Z',
    createdAt: '2026-02-01T10:30:00Z',
    updatedAt: '2026-02-24T18:30:00Z',
  },
  {
    id: 'ms_02',
    projectId: 'prj_01',
    title: 'Milestone 2: Interactive UI & Dispute Protocol',
    description: 'React user interface with dual-persona switcher, revision requests, and structured settlement.',
    amountMinor: 300000, // $3,000.00
    deadline: '2026-03-31',
    acceptanceCriteria: [
      'Working UI showing Agreement -> Deliverable -> Decision -> Payment pipeline',
      'Role-based permission gating (Client vs Freelancer)',
      'Clear simulation badges for escrow and payouts',
      'Audit log tracking every state mutation',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 0,
    status: 'AWAITING_FUNDING', // Waiting for client deposit!
    createdAt: '2026-02-01T10:30:00Z',
    updatedAt: '2026-02-01T10:30:00Z',
  },

  // Project 2 Milestones
  {
    id: 'ms_03',
    projectId: 'prj_02',
    title: 'Milestone 1: Webhook & Payment Engine Adapter',
    description: 'Core webhook receiver, cryptographic signature verification, and idempotent transaction processing.',
    amountMinor: 350000, // $3,500.00
    deadline: '2026-02-15',
    acceptanceCriteria: [
      'Zero-loss webhook event processing with signature verification',
      'Database idempotency keys for all payouts',
      'Full integration test suite against test gateways',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 1,
    status: 'RELEASED', // Fully approved and paid out!
    fundedAt: '2026-01-16T10:00:00Z',
    submittedAt: '2026-02-12T14:00:00Z',
    approvedAt: '2026-02-14T09:00:00Z',
    releasedAt: '2026-02-14T09:30:00Z',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-14T09:30:00Z',
  },
  {
    id: 'ms_04',
    projectId: 'prj_02',
    title: 'Milestone 2: Multi-Currency Settlement Engine',
    description: 'Real-time FX conversion adapter, batch settlement pipeline, and automated fee reconciliation.',
    amountMinor: 250000, // $2,500.00
    deadline: '2026-03-20',
    acceptanceCriteria: [
      'Multi-currency support (USD, EUR, GBP, USDC)',
      'Automated batch settlement trigger with retry logic',
      'Exportable CSV & JSON financial reconciliation',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 0,
    status: 'FUNDED', // Escrow verified, in progress!
    fundedAt: '2026-02-15T11:00:00Z',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-15T11:00:00Z',
  },
  {
    id: 'ms_05',
    projectId: 'prj_02',
    title: 'Milestone 3: Security Hardening & Penetration Testing',
    description: 'Security audit remediation, rate-limiting, and production deployment runbook.',
    amountMinor: 250000, // $2,500.00
    deadline: '2026-04-15',
    acceptanceCriteria: [
      'Pass security vulnerability audit with zero high/critical issues',
      'Rate-limiting middleware and DDoS mitigation configuration',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 0,
    status: 'AWAITING_FUNDING', // Unfunded upcoming milestone
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },

  // Project 3 Milestones
  {
    id: 'ms_06',
    projectId: 'prj_03',
    title: 'Milestone 1: Circom Circuit & Benchmark Suite',
    description: 'Implementation of private identity proof circuits and proving benchmarks.',
    amountMinor: 420000, // $4,200.00
    deadline: '2026-03-15',
    acceptanceCriteria: [
      'Circom circuit with constraint count under 25k constraints',
      'Browser WASM proof generation in < 1.2s',
      'Comprehensive test vectors for valid and forged claims',
    ],
    reviewPeriodDays: 5,
    revisionPolicy: { maxRevisions: 2, reviewPeriodDays: 5, gracePeriodDays: 2 },
    currentRevisionCount: 1,
    status: 'REVISION_REQUESTED', // Client asked for revision!
    fundedAt: '2026-02-11T09:00:00Z',
    submittedAt: '2026-02-18T16:00:00Z',
    createdAt: '2026-02-10T14:30:00Z',
    updatedAt: '2026-02-20T10:00:00Z',
  },
];

export const initialDeliveries: Delivery[] = [
  {
    id: 'del_ecom_01_r1',
    milestoneId: 'ms_ecom_01',
    revisionNumber: 1,
    submittedBy: 'freelancer_01',
    notes: 'Completed full high-fidelity Figma components, mobile responsive artboards, interactive design tokens, and prototype links.',
    files: [
      {
        name: 'ecommerce_figma_design_system_v1.zip',
        url: 'https://storage.fairwork.sim/del_ecom_01/design_system.zip',
        sizeBytes: 12450000,
        mimeType: 'application/zip',
        sha256Hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
        isSimulated: true,
      },
    ],
    externalUrl: 'https://figma.com/@fairwork/ecommerce-prototype',
    timestamp: '2026-02-10T14:00:00Z',
    deliveryHash: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
  },
  {
    id: 'del_ecom_02_r1',
    milestoneId: 'ms_ecom_02',
    revisionNumber: 1,
    submittedBy: 'freelancer_01',
    notes: 'Next.js frontend catalog implementation complete with instant search filters, cart drawer, and responsive layout across all screen breakpoints.',
    files: [
      {
        name: 'frontend_ecom_nextjs_src.tar.gz',
        url: 'https://storage.fairwork.sim/del_ecom_02/nextjs_src.tar.gz',
        sizeBytes: 4890000,
        mimeType: 'application/gzip',
        sha256Hash: 'c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3',
        isSimulated: true,
      },
    ],
    externalUrl: 'https://github.com/fairwork-demo/ecom-frontend',
    timestamp: '2026-02-28T16:00:00Z',
    deliveryHash: 'd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4',
  },
  {
    id: 'del_ms01_r1',
    milestoneId: 'ms_01',
    revisionNumber: 1,
    submittedBy: 'freelancer_01',
    notes: 'Completed all TypeScript type models, state transition engine, and 18 unit tests with 100% pass rate. Ready for client inspection.',
    files: [
      {
        name: 'fairwork_core_engine.tar.gz',
        url: 'https://storage.fairwork.sim/del_ms01_r1/fairwork_core_engine.tar.gz',
        sizeBytes: 1845000,
        mimeType: 'application/gzip',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        isSimulated: true,
      },
    ],
    externalUrl: 'https://github.com/fairwork-demo/core-engine',
    timestamp: '2026-02-24T18:30:00Z',
    deliveryHash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
  },
  {
    id: 'del_ms03_r1',
    milestoneId: 'ms_03',
    revisionNumber: 1,
    submittedBy: 'freelancer_01',
    notes: 'Webhook engine with HMAC-SHA256 signature verification and idempotency tests complete.',
    files: [
      {
        name: 'payment_gateway_adapter.zip',
        url: 'https://storage.fairwork.sim/del_ms03/adapter.zip',
        sizeBytes: 3200000,
        mimeType: 'application/zip',
        sha256Hash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        isSimulated: true,
      },
    ],
    externalUrl: 'https://github.com/fairwork-demo/payment-adapter',
    timestamp: '2026-02-12T14:00:00Z',
    deliveryHash: '3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
  },
  {
    id: 'del_ms06_r1',
    milestoneId: 'ms_06',
    revisionNumber: 1,
    submittedBy: 'freelancer_01',
    notes: 'Circom circuit implementation and test claims setup.',
    files: [
      {
        name: 'zk_identity_circuit.tar.gz',
        url: 'https://storage.fairwork.sim/del_ms06/circuit.tar.gz',
        sizeBytes: 940000,
        mimeType: 'application/gzip',
        sha256Hash: 'f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1',
        isSimulated: true,
      },
    ],
    timestamp: '2026-02-18T16:00:00Z',
    deliveryHash: '8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e',
  },
];

export const initialReviews: Review[] = [
  {
    id: 'rev_ecom_01',
    deliveryId: 'del_ecom_01_r1',
    milestoneId: 'ms_ecom_01',
    reviewer: 'client_01',
    decision: 'APPROVED',
    feedback: 'Approved without reservations. Wireframes and Figma component tokens match our brand specifications perfectly.',
    criteriaChecklist: [
      { criteria: 'Complete desktop and mobile responsive Figma component designs', satisfied: true },
      { criteria: 'Design tokens for colors, typography, spacing, and buttons', satisfied: true },
      { criteria: 'Interactive prototype walkthrough and design system guide', satisfied: true },
    ],
    timestamp: '2026-02-12T11:00:00Z',
  },
  {
    id: 'rev_ms03',
    deliveryId: 'del_ms03_r1',
    milestoneId: 'ms_03',
    reviewer: 'client_01',
    decision: 'APPROVED',
    feedback: 'Outstanding quality. Webhook verification passed load test with 5,000 simulated events without a single dropped packet.',
    criteriaChecklist: [
      { criteria: 'Zero-loss webhook event processing with signature verification', satisfied: true },
      { criteria: 'Database idempotency keys for all payouts', satisfied: true },
      { criteria: 'Full integration test suite against test gateways', satisfied: true },
    ],
    timestamp: '2026-02-14T09:00:00Z',
  },
  {
    id: 'rev_ms06',
    deliveryId: 'del_ms06_r1',
    milestoneId: 'ms_06',
    reviewer: 'client_01',
    decision: 'REVISION_REQUESTED',
    feedback: 'Please include the WASM proof benchmark report on mobile Safari and Chrome as specified in criterion #2.',
    criteriaChecklist: [
      { criteria: 'Circom circuit with constraint count under 25k constraints', satisfied: true },
      { criteria: 'Browser WASM proof generation in < 1.2s', satisfied: false },
      { criteria: 'Comprehensive test vectors for valid and forged claims', satisfied: true },
    ],
    timestamp: '2026-02-20T10:00:00Z',
  },
];

export const initialPayments: PaymentRecord[] = [
  // E-commerce Payments
  {
    id: 'pay_dep_ecom_01',
    projectId: 'prj_00',
    milestoneId: 'ms_ecom_01',
    type: 'ESCROW_DEPOSIT',
    amountMinor: 500000, // ₹5,000.00
    currency: 'INR',
    status: 'COMPLETED',
    reference: 'sim_tx_dep_ecom_9124',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'escrow_smart_contract_vault',
    timestamp: '2026-02-02T10:00:00Z',
  },
  {
    id: 'pay_rel_ecom_01',
    projectId: 'prj_00',
    milestoneId: 'ms_ecom_01',
    type: 'ESCROW_RELEASE',
    amountMinor: 500000, // ₹5,000.00
    currency: 'INR',
    status: 'COMPLETED',
    reference: 'sim_tx_rel_ecom_4812',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'freelancer_01',
    timestamp: '2026-02-12T11:30:00Z',
  },
  {
    id: 'pay_dep_ecom_02',
    projectId: 'prj_00',
    milestoneId: 'ms_ecom_02',
    type: 'ESCROW_DEPOSIT',
    amountMinor: 1200000, // ₹12,000.00
    currency: 'INR',
    status: 'COMPLETED',
    reference: 'sim_tx_dep_ecom_8371',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'escrow_smart_contract_vault',
    timestamp: '2026-02-13T10:00:00Z',
  },
  {
    id: 'pay_dep_ecom_03',
    projectId: 'prj_00',
    milestoneId: 'ms_ecom_03',
    type: 'ESCROW_DEPOSIT',
    amountMinor: 800000, // ₹8,000.00
    currency: 'INR',
    status: 'COMPLETED',
    reference: 'sim_tx_dep_ecom_7204',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'escrow_smart_contract_vault',
    timestamp: '2026-02-13T10:00:00Z',
  },

  {
    id: 'pay_dep_ms01',
    projectId: 'prj_01',
    milestoneId: 'ms_01',
    type: 'ESCROW_DEPOSIT',
    amountMinor: 200000,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'sim_tx_dep_9941a87b',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'escrow_smart_contract_vault',
    timestamp: '2026-02-02T12:00:00Z',
  },
  {
    id: 'pay_dep_ms03',
    projectId: 'prj_02',
    milestoneId: 'ms_03',
    type: 'ESCROW_DEPOSIT',
    amountMinor: 350000,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'sim_tx_dep_8820c41a',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'escrow_smart_contract_vault',
    timestamp: '2026-01-16T10:00:00Z',
  },
  {
    id: 'pay_rel_ms03',
    projectId: 'prj_02',
    milestoneId: 'ms_03',
    type: 'ESCROW_RELEASE',
    amountMinor: 350000,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'sim_tx_rel_7719b32d',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'freelancer_01',
    timestamp: '2026-02-14T09:30:00Z',
  },
  {
    id: 'pay_dep_ms04',
    projectId: 'prj_02',
    milestoneId: 'ms_04',
    type: 'ESCROW_DEPOSIT',
    amountMinor: 250000,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'sim_tx_dep_6608a21c',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'escrow_smart_contract_vault',
    timestamp: '2026-02-15T11:00:00Z',
  },
  {
    id: 'pay_dep_ms06',
    projectId: 'prj_03',
    milestoneId: 'ms_06',
    type: 'ESCROW_DEPOSIT',
    amountMinor: 420000,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'sim_tx_dep_5597f10e',
    isSimulated: true,
    payerId: 'client_01',
    recipientId: 'escrow_smart_contract_vault',
    timestamp: '2026-02-11T09:00:00Z',
  },
];

export const initialDisputes: Record<string, Dispute> = {
  ms_06: {
    id: 'dsp_ms_06',
    milestoneId: 'ms_06',
    projectId: 'prj_03',
    initiatorId: 'client_01',
    reason: 'Criterion #2 not satisfied: Browser WASM proof benchmarks exceeded 1.2s threshold (clocked at 2.4s on mobile Safari). Deliverables require optimization.',
    evidenceReferences: [
      {
        id: 'ev_01',
        title: 'Safari iOS Benchmark Log File',
        urlOrContent: 'https://storage.fairwork.sim/disputes/dsp_ms_06/safari_benchmark.log',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        submittedBy: 'client_01',
        timestamp: '2026-02-21T10:00:00Z',
      },
      {
        id: 'ev_02',
        title: 'Circom Constraint Profile Report',
        urlOrContent: 'https://storage.fairwork.sim/disputes/dsp_ms_06/circom_profile.json',
        sha256Hash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        submittedBy: 'freelancer_01',
        timestamp: '2026-02-22T14:30:00Z',
      },
    ],
    responses: [
      {
        id: 'msg_01',
        authorId: 'freelancer_01',
        message: 'The constraint count is within the 25k limit (23,410 constraints). The mobile lag was due to non-optimized threading in web workers on iOS. I can apply multithreading fix or propose a 20% scope discount.',
        timestamp: '2026-02-22T15:00:00Z',
      },
      {
        id: 'msg_02',
        authorId: 'client_01',
        message: 'A mutual settlement where $3,360 is paid for current circuit work and $840 is refunded to client would be agreeable.',
        timestamp: '2026-02-23T09:30:00Z',
      },
    ],
    settlementProposal: {
      proposedBy: 'client_01',
      freelancerAmountMinor: 336000, // $3,360.00 (80%)
      clientRefundMinor: 84000,      // $840.00 (20%)
      proposalNotes: 'Client receives $840.00 refund; Freelancer receives $3,360.00 for the valid Circom base circuit.',
      acceptedByClient: true,
      acceptedByFreelancer: false, // Awaiting Bob Martinez confirmation
    },
    status: 'SETTLEMENT_PROPOSED',
    createdAt: '2026-02-21T09:30:00Z',
  },
};

export const initialProject: Project = initialProjects[0];
export const initialAgreement: Agreement = initialAgreements[0];
