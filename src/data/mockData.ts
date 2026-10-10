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

export const initialProject: Project = initialProjects[0];
export const initialAgreement: Agreement = initialAgreements[0];
