import React from 'react';
import {
  CheckCircle2,
  Clock,
  Lock,
  Upload,
  Eye,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  Scale,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';
import {
  Delivery,
  Milestone,
  MilestoneStatus,
  Project,
  Review,
  UserProfile,
} from '../types/fairwork';
import { formatMoney } from '../core/money';

interface MilestoneCardProps {
  milestone: Milestone;
  project: Project;
  currentUser: UserProfile;
  deliveries: Delivery[];
  reviews: Review[];
  onFundEscrow: (milestone: Milestone) => void;
  onSubmitDeliverable: (milestone: Milestone) => void;
  onReviewDeliverable: (milestone: Milestone, delivery: Delivery) => void;
  onReleasePayment: (milestone: Milestone) => void;
  onOpenDispute: (milestone: Milestone) => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  project,
  currentUser,
  deliveries,
  reviews,
  onFundEscrow,
  onSubmitDeliverable,
  onReviewDeliverable,
  onReleasePayment,
  onOpenDispute,
}) => {
  const milestoneDeliveries = deliveries.filter((d) => d.milestoneId === milestone.id);
  const latestDelivery = milestoneDeliveries[milestoneDeliveries.length - 1];
  const milestoneReviews = reviews.filter((r) => r.milestoneId === milestone.id);
  const latestReview = milestoneReviews[milestoneReviews.length - 1];

  const isClient = currentUser.id === project.clientId;
  const isFreelancer = currentUser.id === project.freelancerId;

  const statusConfig: Record<
    MilestoneStatus,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    DRAFT: {
      label: 'Draft',
      color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    AGREED: {
      label: 'Terms Agreed',
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      icon: <FileCheck className="w-3.5 h-3.5" />,
    },
    AWAITING_FUNDING: {
      label: 'Awaiting Escrow Deposit',
      color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      icon: <Lock className="w-3.5 h-3.5 text-amber-500" />,
    },
    FUNDED: {
      label: 'Escrow Funded (Ready to Work)',
      color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      icon: <Lock className="w-3.5 h-3.5 text-indigo-500" />,
    },
    IN_PROGRESS: {
      label: 'In Progress',
      color: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800',
      icon: <Clock className="w-3.5 h-3.5 text-sky-500" />,
    },
    SUBMITTED: {
      label: 'Deliverable Submitted',
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      icon: <Upload className="w-3.5 h-3.5 text-purple-500" />,
    },
    UNDER_REVIEW: {
      label: 'Under Client Review',
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      icon: <Eye className="w-3.5 h-3.5 text-purple-500" />,
    },
    REVISION_REQUESTED: {
      label: 'Revision Requested',
      color: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      icon: <RotateCcw className="w-3.5 h-3.5 text-orange-500" />,
    },
    APPROVED: {
      label: 'Approved (Pending Release)',
      color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />,
    },
    RELEASED: {
      label: 'Escrow Released (Completed)',
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
    },
    DISPUTED: {
      label: 'Dispute Active',
      color: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      icon: <Scale className="w-3.5 h-3.5 text-rose-500" />,
    },
    RESOLVED: {
      label: 'Dispute Resolved',
      color: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />,
    },
    CANCELLED: {
      label: 'Cancelled',
      color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
    },
  };

  const status = statusConfig[milestone.status] ?? statusConfig.DRAFT;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-700">
      {/* Top Header: Title, Amount, Status Badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}
            >
              {status.icon}
              <span>{status.label}</span>
            </span>

            <span className="text-xs text-slate-400 font-medium">
              Deadline: {milestone.deadline}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {milestone.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {milestone.description}
          </p>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {formatMoney(milestone.amountMinor, project.currency)}
          </div>
          <div className="text-[11px] text-slate-400">
            Revisions: {milestone.currentRevisionCount ?? 0} /{' '}
            {milestone.revisionPolicy.maxRevisions} used
          </div>
        </div>
      </div>

      {/* Acceptance Criteria Checklist (Relationship #2) */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 mb-4">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Verifiable Acceptance Criteria
        </span>
        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {milestone.acceptanceCriteria.map((criterion, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Deliverable & Revision History Preview (Relationship #3) */}
      {latestDelivery && (
        <div className="p-3.5 rounded-xl bg-purple-50/40 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/40 mb-4 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-purple-500" />
              Latest Submission: Revision #{latestDelivery.revisionNumber}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {new Date(latestDelivery.timestamp).toLocaleString()}
            </span>
          </div>

          <p className="text-slate-700 dark:text-slate-300 italic mb-2">
            &ldquo;{latestDelivery.notes}&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-100 dark:border-purple-900/30">
            <div className="text-[11px] text-purple-700 dark:text-purple-400 font-mono truncate max-w-md">
              SHA-256 Deliverable Fingerprint:{' '}
              {latestDelivery.deliveryHash?.slice(0, 24)}...
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-200/50 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
              {latestDelivery.files.length} file(s) attached
            </span>
          </div>
        </div>
      )}

      {/* Latest Review Feedback (Relationship #4) */}
      {latestReview && (
        <div
          className={`p-3.5 rounded-xl border mb-4 text-xs ${
            latestReview.decision === 'APPROVED'
              ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300'
              : 'bg-orange-50/40 dark:bg-orange-950/10 border-orange-200 dark:border-orange-900/40 text-orange-900 dark:text-orange-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Client Decision: {latestReview.decision}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {new Date(latestReview.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300">{latestReview.feedback}</p>
        </div>
      )}

      {/* Action Buttons Bar: Persona-aware with clear meaningful feedback */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {isClient && <span>You are viewing as <strong>Client</strong></span>}
          {isFreelancer && <span>You are viewing as <strong>Freelancer</strong></span>}
          {!isClient && !isFreelancer && <span>You are viewing as <strong>Observer / Arbitrator</strong></span>}
        </div>

        <div className="flex items-center gap-2">
          {/* Dispute Button */}
          {['FUNDED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'REVISION_REQUESTED', 'APPROVED'].includes(
            milestone.status
          ) && (isClient || isFreelancer) && (
            <button
              onClick={() => onOpenDispute(milestone)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 transition flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Raise Dispute
            </button>
          )}

          {/* 1. Client Action: Deposit Escrow */}
          {milestone.status === 'AWAITING_FUNDING' && (
            <button
              onClick={() => onFundEscrow(milestone)}
              disabled={!isClient}
              title={!isClient ? 'Only the client can deposit escrow funds' : ''}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition ${
                isClient
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Fund Escrow ({formatMoney(milestone.amountMinor, project.currency)} [Simulated])
            </button>
          )}

          {/* 2. Freelancer Action: Submit Deliverable */}
          {(milestone.status === 'FUNDED' ||
            milestone.status === 'IN_PROGRESS' ||
            milestone.status === 'REVISION_REQUESTED') && (
            <button
              onClick={() => onSubmitDeliverable(milestone)}
              disabled={!isFreelancer}
              title={!isFreelancer ? 'Only the assigned freelancer can submit deliverables' : ''}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition ${
                isFreelancer
                  ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              {milestone.status === 'REVISION_REQUESTED'
                ? 'Submit Revision'
                : 'Submit Deliverable'}
            </button>
          )}

          {/* 3. Client Action: Review Deliverable */}
          {(milestone.status === 'SUBMITTED' || milestone.status === 'UNDER_REVIEW') &&
            latestDelivery && (
              <button
                onClick={() => onReviewDeliverable(milestone, latestDelivery)}
                disabled={!isClient}
                title={!isClient ? 'Only the client can review deliverables' : ''}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition ${
                  isClient
                    ? 'bg-teal-600 hover:bg-teal-500 text-white cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Review Deliverable (Approve / Revise / Dispute)
              </button>
            )}

          {/* 4. Client Action: Release Escrow Payment */}
          {milestone.status === 'APPROVED' && (
            <button
              onClick={() => onReleasePayment(milestone)}
              disabled={!isClient}
              title={!isClient ? 'Only the client can release payment from escrow' : ''}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition ${
                isClient
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Release Payment ({formatMoney(milestone.amountMinor, project.currency)} [Simulated])
            </button>
          )}

          {/* Terminal state badges */}
          {milestone.status === 'RELEASED' && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>Released &amp; Closed (Double-Release Locked)</span>
            </div>
          )}

          {milestone.status === 'DISPUTED' && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800">
              <Scale className="w-4 h-4" />
              <span>Ordinary Release Locked (Resolution Required)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
