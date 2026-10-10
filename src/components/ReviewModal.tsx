import React, { useState } from 'react';
import { Eye, X, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { Delivery, Milestone, ReviewDecision } from '../types/fairwork';

interface ReviewModalProps {
  milestone: Milestone;
  delivery: Delivery;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (
    decision: ReviewDecision,
    feedback: string,
    criteriaChecklist: Array<{ criteria: string; satisfied: boolean }>
  ) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  milestone,
  delivery,
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [decision, setDecision] = useState<ReviewDecision>('APPROVED');
  const [feedback, setFeedback] = useState('All acceptance criteria have been verified and confirmed.');
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    milestone.acceptanceCriteria.forEach((c) => {
      initial[c] = true;
    });
    return initial;
  });

  if (!isOpen) return null;

  const toggleCriteria = (criterion: string) => {
    setChecklist((prev) => ({
      ...prev,
      [criterion]: !prev[criterion],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const criteriaChecklist = milestone.acceptanceCriteria.map((c) => ({
      criteria: c,
      satisfied: Boolean(checklist[c]),
    }));

    onSubmitReview(decision, feedback, criteriaChecklist);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-teal-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Review Milestone Deliverable
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Deliverable Snapshot */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Revision #{delivery.revisionNumber} Notes:
            </div>
            <p className="text-slate-600 dark:text-slate-300 italic mb-2">
              &ldquo;{delivery.notes}&rdquo;
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Fingerprint: {delivery.deliveryHash?.slice(0, 32)}...
            </div>
          </div>

          {/* Criteria Checklist Verification */}
          <div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Acceptance Criteria Verification
            </span>
            <div className="space-y-2">
              {milestone.acceptanceCriteria.map((criterion, idx) => (
                <label
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(checklist[criterion])}
                    onChange={() => toggleCriteria(criterion)}
                    className="rounded text-teal-600 mt-0.5 focus:ring-teal-500"
                  />
                  <span className="text-slate-800 dark:text-slate-200">{criterion}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Decision Selection */}
          <div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Review Decision
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDecision('APPROVED')}
                className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition ${
                  decision === 'APPROVED'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Approve</span>
              </button>

              <button
                type="button"
                onClick={() => setDecision('REVISION_REQUESTED')}
                className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition ${
                  decision === 'REVISION_REQUESTED'
                    ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-700 dark:text-orange-400'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <RotateCcw className="w-4 h-4 text-orange-500" />
                <span>Request Revision</span>
              </button>

              <button
                type="button"
                onClick={() => setDecision('DISPUTED')}
                className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition ${
                  decision === 'DISPUTED'
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-400'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Dispute</span>
              </button>
            </div>
          </div>

          {/* Feedback */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Feedback &amp; Rationale *
            </label>
            <textarea
              required
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive, verifiable reasons for approval, revisions, or escalation..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition"
            >
              Submit Review Decision
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
