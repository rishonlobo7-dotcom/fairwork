import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useFairwork } from '../../context/FairworkContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatMoney } from '../../core/money';
import { SettlementProposal } from '../../types/fairwork';

export const DisputesPage: React.FC = () => {
  const {
    disputes,
    milestones,
    activeProject,
    currentUser,
    allUsers,
    handleProposeSettlement,
    handleExecuteSettlement,
  } = useFairwork();

  const disputeList = Object.values(disputes);
  const activeDisputes = disputeList.filter((d) => d.status !== 'RESOLVED_BY_MUTUAL');

  // Settlement draft state for active dispute
  const [freelancerDollars, setFreelancerDollars] = useState(1400);
  const [clientDollars, setClientDollars] = useState(600);
  const [notes, setNotes] = useState('Mutual settlement: 70% payout for completed components, 30% refund to client.');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1C1917]">
            Structured Dispute Resolution
          </h1>
          <p className="text-xs text-[#605A53] mt-0.5">
            Rule 4: When a dispute is active, ordinary release is locked. Payout requires mutual agreement or arbitration.
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
          Ordinary Release Guard Active
        </span>
      </div>

      {disputeList.length === 0 ? (
        <Card className="p-8 text-center bg-white">
          <div className="w-12 h-12 rounded-xl bg-[#EBF4EE] text-[#285C42] flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#1C1917] mb-1">
            No Active Disputes
          </h3>
          <p className="text-xs text-[#605A53] max-w-sm mx-auto mb-4">
            All milestones are operating smoothly under agreed acceptance criteria and revision policies.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {disputeList.map((dispute) => {
            const milestone = milestones.find((m) => m.id === dispute.milestoneId);
            const initiator = allUsers[dispute.initiatorId];
            const isResolved = dispute.status === 'RESOLVED_BY_MUTUAL';

            return (
              <Card key={dispute.id} className="p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#EFECE6] pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status={dispute.status} size="sm" />
                      <span className="text-xs text-[#8A837A]">
                        Initiated by <strong>{initiator?.displayName}</strong> ({initiator?.role})
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1C1917]">
                      {milestone?.title || `Milestone ${dispute.milestoneId}`}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1C1917] font-mono">
                      {milestone ? formatMoney(milestone.amountMinor, activeProject.currency) : '$0'}
                    </span>
                    <span className="block text-[11px] text-[#991B1B] font-semibold">
                      Escrow Release Locked
                    </span>
                  </div>
                </div>

                {/* Dispute Reason */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DFD5] text-xs">
                  <span className="font-bold text-[#1C1917] block mb-1">
                    Dispute Reason / Claim:
                  </span>
                  <p className="text-[#605A53] italic">
                    &ldquo;{dispute.reason}&rdquo;
                  </p>
                </div>

                {/* Resolution Status or Mutual Settlement Box */}
                {isResolved ? (
                  <div className="p-3.5 rounded-xl bg-[#EBF4EE] border border-[#C2DEC9] text-xs text-[#285C42] flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#285C42]" />
                      {dispute.resolutionSummary || 'Dispute mutually settled and executed.'}
                    </span>
                    <span className="text-[11px] text-[#285C42] font-mono">
                      Resolved {new Date(dispute.resolvedAt || '').toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-[#E5DFD5] bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1C1917]">
                        Mutual Settlement Terms
                      </span>
                      <span className="text-[11px] text-[#8A837A] font-mono">
                        Target Escrow: {milestone ? formatMoney(milestone.amountMinor) : '$0'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-medium text-[#605A53] mb-1">
                          Freelancer Payout ($)
                        </label>
                        <input
                          type="number"
                          value={freelancerDollars}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 0;
                            const total = (milestone?.amountMinor || 200000) / 100;
                            setFreelancerDollars(val);
                            setClientDollars(total - val);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFD5] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#605A53] mb-1">
                          Client Refund ($)
                        </label>
                        <input
                          type="number"
                          value={clientDollars}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 0;
                            const total = (milestone?.amountMinor || 200000) / 100;
                            setClientDollars(val);
                            setFreelancerDollars(total - val);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFD5] text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Proposal Status */}
                    {dispute.settlementProposal && (
                      <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DFD5] text-xs space-y-1">
                        <span className="font-semibold text-[#1C1917] block">
                          Consents Recorded:
                        </span>
                        <div className="flex items-center gap-4 text-[11px]">
                          <span className={dispute.settlementProposal.acceptedByClient ? 'text-[#285C42] font-semibold' : 'text-[#8A837A]'}>
                            Client: {dispute.settlementProposal.acceptedByClient ? '✓ Accepted' : 'Pending'}
                          </span>
                          <span className={dispute.settlementProposal.acceptedByFreelancer ? 'text-[#285C42] font-semibold' : 'text-[#8A837A]'}>
                            Freelancer: {dispute.settlementProposal.acceptedByFreelancer ? '✓ Accepted' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          const proposal: SettlementProposal = {
                            proposedBy: currentUser.id,
                            freelancerAmountMinor: freelancerDollars * 100,
                            clientRefundMinor: clientDollars * 100,
                            proposalNotes: notes,
                            acceptedByClient: currentUser.role === 'CLIENT',
                            acceptedByFreelancer: currentUser.role === 'FREELANCER',
                          };
                          handleProposeSettlement(dispute.milestoneId, proposal);
                        }}
                      >
                        Submit / Update Proposal
                      </Button>

                      {dispute.settlementProposal && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            if (!dispute.settlementProposal) return;
                            const updated: SettlementProposal = {
                              ...dispute.settlementProposal,
                              acceptedByClient:
                                currentUser.role === 'CLIENT' ? true : dispute.settlementProposal.acceptedByClient,
                              acceptedByFreelancer:
                                currentUser.role === 'FREELANCER' ? true : dispute.settlementProposal.acceptedByFreelancer,
                            };

                            if (updated.acceptedByClient && updated.acceptedByFreelancer) {
                              handleExecuteSettlement(dispute.milestoneId, updated);
                            } else {
                              handleProposeSettlement(dispute.milestoneId, updated);
                            }
                          }}
                        >
                          Sign Proposal as {currentUser.displayName.split(' ')[0]}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
