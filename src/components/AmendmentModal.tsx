import React, { useState } from 'react';
import { Edit3, X, AlertCircle } from 'lucide-react';
import { Agreement, AgreementStructuredTerms } from '../types/fairwork';

interface AmendmentModalProps {
  currentAgreement: Agreement;
  isOpen: boolean;
  onClose: () => void;
  onProposeAmendment: (newTerms: AgreementStructuredTerms) => Promise<void>;
}

export const AmendmentModal: React.FC<AmendmentModalProps> = ({
  currentAgreement,
  isOpen,
  onClose,
  onProposeAmendment,
}) => {
  const [scope, setScope] = useState(currentAgreement.structuredTerms.scopeSummary);
  const [deliverables, setDeliverables] = useState(
    currentAgreement.structuredTerms.deliverablesSummary
  );
  const [ipClause, setIpClause] = useState(
    currentAgreement.structuredTerms.intellectualPropertyClause
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newTerms: AgreementStructuredTerms = {
        ...currentAgreement.structuredTerms,
        scopeSummary: scope,
        deliverablesSummary: deliverables,
        intellectualPropertyClause: ipClause,
      };

      await onProposeAmendment(newTerms);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Propose Agreement Amendment (Rule 7)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rule 7 Explanatory Callout */}
        <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 mb-4 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong>Rule 7 Invariant:</strong> Modifying accepted terms increments the agreement version from{' '}
            <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
              v{currentAgreement.versionNumber}
            </code>{' '}
            to{' '}
            <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
              v{currentAgreement.versionNumber + 1}
            </code>
            . The counterparty&apos;s previous consent is reset, and renewed acceptance is strictly required before the amended version becomes active.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Amended Scope Summary *
            </label>
            <textarea
              required
              rows={3}
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Amended Deliverables Specification *
            </label>
            <textarea
              required
              rows={3}
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Intellectual Property Assignment Clause
            </label>
            <select
              value={ipClause}
              onChange={(e) => setIpClause(e.target.value as AgreementStructuredTerms['intellectualPropertyClause'])}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ON_PAYMENT">ON_PAYMENT (Transfers upon escrow release)</option>
              <option value="UPON_CREATION">UPON_CREATION (Immediate assignment)</option>
              <option value="CUSTOM">CUSTOM (Subject to separate agreement)</option>
            </select>
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
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition disabled:opacity-50"
            >
              {isSubmitting ? 'Computing New Hash...' : `Publish v${currentAgreement.versionNumber + 1} Amendment`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
