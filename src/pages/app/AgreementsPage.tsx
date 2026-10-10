import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Fingerprint,
  Edit3,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useFairwork } from '../../context/FairworkContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { AmendmentModal } from '../../components/AmendmentModal';

export const AgreementsPage: React.FC = () => {
  const {
    agreement,
    activeProject,
    currentUser,
    allUsers,
    handleAcceptAgreement,
    handleProposeAmendment,
  } = useFairwork();

  const [isAmendmentOpen, setIsAmendmentOpen] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const clientUser = allUsers[activeProject.clientId];
  const freelancerUser = allUsers[activeProject.freelancerId];

  const clientAccepted = Boolean(agreement.acceptedBy[activeProject.clientId]);
  const freelancerAccepted = Boolean(agreement.acceptedBy[activeProject.freelancerId]);
  const userHasAccepted = Boolean(agreement.acceptedBy[currentUser.id]);
  const isParticipant =
    currentUser.id === activeProject.clientId || currentUser.id === activeProject.freelancerId;

  const handleCopy = () => {
    if (agreement.agreementHash) {
      navigator.clipboard.writeText(agreement.agreementHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#1C1917]">
              Project Agreement &amp; Versioning
            </h1>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E5DFD5] text-[#264235]">
              v{agreement.versionNumber}
            </span>
          </div>
          <p className="text-xs text-[#605A53] mt-0.5">
            Relationship #1: The accepted agreement, its immutable fingerprint, and version history
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isParticipant && !userHasAccepted && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
              onClick={handleAcceptAgreement}
            >
              Sign v{agreement.versionNumber}
            </Button>
          )}

          {isParticipant && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              onClick={() => setIsAmendmentOpen(true)}
            >
              Propose Amendment (Rule 7)
            </Button>
          )}
        </div>
      </div>

      {/* Dual Signature Consent Cards (Rule 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Client Sign Box */}
        <div
          className={`p-4 rounded-xl border text-xs ${
            clientAccepted
              ? 'bg-[#EBF4EE]/50 border-[#C2DEC9]'
              : 'bg-[#FEF3C7]/40 border-[#FDE68A]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#1C1917]">
              Client: {clientUser?.displayName}
            </span>
            {clientAccepted ? (
              <span className="text-[#285C42] font-semibold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Digitally Signed
              </span>
            ) : (
              <span className="text-[#92400E] font-semibold flex items-center gap-1 text-[11px]">
                <Clock className="w-3.5 h-3.5" /> Awaiting Signature
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#605A53] font-mono">
            {clientAccepted
              ? `Timestamp: ${new Date(
                  agreement.acceptedBy[activeProject.clientId].acceptedAt
                ).toLocaleDateString()} | ${agreement.acceptedBy[activeProject.clientId].signatureHash}`
              : 'Client has not accepted this version yet.'}
          </div>
        </div>

        {/* Freelancer Sign Box */}
        <div
          className={`p-4 rounded-xl border text-xs ${
            freelancerAccepted
              ? 'bg-[#EBF4EE]/50 border-[#C2DEC9]'
              : 'bg-[#FEF3C7]/40 border-[#FDE68A]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#1C1917]">
              Freelancer: {freelancerUser?.displayName}
            </span>
            {freelancerAccepted ? (
              <span className="text-[#285C42] font-semibold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Digitally Signed
              </span>
            ) : (
              <span className="text-[#92400E] font-semibold flex items-center gap-1 text-[11px]">
                <Clock className="w-3.5 h-3.5" /> Awaiting Signature
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#605A53] font-mono">
            {freelancerAccepted
              ? `Timestamp: ${new Date(
                  agreement.acceptedBy[activeProject.freelancerId].acceptedAt
                ).toLocaleDateString()} | ${agreement.acceptedBy[activeProject.freelancerId].signatureHash}`
              : 'Freelancer has not accepted this version yet.'}
          </div>
        </div>
      </div>

      {/* SHA-256 Fingerprint Callout */}
      <div className="p-3.5 rounded-xl bg-white border border-[#E5DFD5] flex items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <Fingerprint className="w-4 h-4 text-[#264235] shrink-0" />
          <span className="font-bold text-[#1C1917] shrink-0">
            Canonical Agreement Hash:
          </span>
          <code className="text-[11px] font-mono text-[#605A53] truncate">
            {agreement.agreementHash}
          </code>
        </div>
        <button
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#EFECE6] border border-[#E5DFD5] text-[#1C1917] text-[11px] font-medium flex items-center gap-1 shrink-0 cursor-pointer"
        >
          {copiedHash ? <Check className="w-3 h-3 text-[#285C42]" /> : <Copy className="w-3 h-3" />}
          {copiedHash ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Structured Terms Document */}
      <Card className="p-6 space-y-5">
        <div>
          <span className="text-[11px] font-bold text-[#8A837A] uppercase tracking-wider block mb-1">
            Section 1: Scope of Work
          </span>
          <p className="text-xs text-[#1C1917] leading-relaxed bg-[#FAF7F2] p-3 rounded-lg border border-[#EFECE6]">
            {agreement.structuredTerms.scopeSummary}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#8A837A] uppercase tracking-wider block mb-1">
            Section 2: Deliverables Specification
          </span>
          <p className="text-xs text-[#1C1917] leading-relaxed bg-[#FAF7F2] p-3 rounded-lg border border-[#EFECE6]">
            {agreement.structuredTerms.deliverablesSummary}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#EFECE6] text-xs">
          <div>
            <span className="text-[11px] font-semibold text-[#8A837A] block">
              IP Transfer Clause
            </span>
            <span className="font-bold text-[#1C1917]">
              {agreement.structuredTerms.intellectualPropertyClause === 'ON_PAYMENT'
                ? 'Transfers Upon Escrow Release'
                : agreement.structuredTerms.intellectualPropertyClause}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-[#8A837A] block">
              Confidentiality
            </span>
            <span className="font-bold text-[#1C1917]">
              {agreement.structuredTerms.confidentiality ? 'Standard NDA Active' : 'Public'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-[#8A837A] block">
              Governing Law
            </span>
            <span className="font-bold text-[#1C1917]">
              {agreement.structuredTerms.governingLaw}
            </span>
          </div>
        </div>

        {agreement.structuredTerms.customClauses && (
          <div className="pt-2 border-t border-[#EFECE6] space-y-2">
            <span className="text-[11px] font-bold text-[#8A837A] uppercase tracking-wider block">
              Custom Clauses
            </span>
            {agreement.structuredTerms.customClauses.map((c, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EFECE6] text-xs">
                <span className="font-bold text-[#1C1917] block mb-0.5">{c.title}</span>
                <p className="text-[#605A53]">{c.content}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Amendment Modal */}
      <AmendmentModal
        currentAgreement={agreement}
        isOpen={isAmendmentOpen}
        onClose={() => setIsAmendmentOpen(false)}
        onProposeAmendment={handleProposeAmendment}
      />
    </div>
  );
};
