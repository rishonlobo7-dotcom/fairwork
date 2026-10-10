import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  Edit3,
} from 'lucide-react';
import { useFairwork } from '../../context/FairworkContext';
import { Button } from '../../components/ui/Button';
import { MilestoneCard } from '../../components/MilestoneCard';
import { DeliverableModal } from '../../components/DeliverableModal';
import { ReviewModal } from '../../components/ReviewModal';
import { DisputeModal } from '../../components/DisputeModal';
import { AmendmentModal } from '../../components/AmendmentModal';
import { Milestone, Delivery } from '../../types/fairwork';
import { formatMoney } from '../../core/money';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    activeProject,
    agreement,
    milestones,
    deliveries,
    reviews,
    disputes,
    currentUser,
    handleFundEscrow,
    handleSubmitDeliverable,
    handleReviewDeliverable,
    handleReleasePayment,
    handleAcceptAgreement,
    handleProposeAmendment,
    handleRaiseDispute,
    handleProposeSettlement,
    handleExecuteSettlement,
  } = useFairwork();

  const project = projects.find((p) => p.id === id) || activeProject;
  const projectMilestones = milestones.filter((m) => m.projectId === project.id);

  // Modals state
  const [activeDeliverableMilestone, setActiveDeliverableMilestone] = useState<Milestone | null>(null);
  const [activeReviewData, setActiveReviewData] = useState<{ milestone: Milestone; delivery: Delivery } | null>(null);
  const [activeDisputeMilestone, setActiveDisputeMilestone] = useState<Milestone | null>(null);
  const [isAmendmentOpen, setIsAmendmentOpen] = useState(false);

  const clientAccepted = Boolean(agreement.acceptedBy[project.clientId]);
  const freelancerAccepted = Boolean(agreement.acceptedBy[project.freelancerId]);
  const isParticipant = currentUser.id === project.clientId || currentUser.id === project.freelancerId;
  const userHasAccepted = Boolean(agreement.acceptedBy[currentUser.id]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5]">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            onClick={() => navigate('/app/projects')}
          >
            All Projects
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#1C1917]">
                {project.title}
              </h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#EBF4EE] text-[#285C42] border border-[#C2DEC9]">
                {project.status}
              </span>
            </div>
            <p className="text-xs text-[#605A53] mt-0.5">
              Budget: {formatMoney(project.totalBudgetMinor, project.currency)} &bull; {projectMilestones.length} Milestones
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isParticipant && !userHasAccepted && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
              onClick={handleAcceptAgreement}
            >
              Sign Agreement v{agreement.versionNumber}
            </Button>
          )}

          {isParticipant && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              onClick={() => setIsAmendmentOpen(true)}
            >
              Amend Terms (Rule 7)
            </Button>
          )}
        </div>
      </div>

      {/* Agreement Status Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#264235]" />
          <span className="font-bold text-[#1C1917]">
            Agreement v{agreement.versionNumber} Status:
          </span>
          {agreement.isActive ? (
            <span className="text-[#285C42] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active &amp; Dual-Signed
            </span>
          ) : (
            <span className="text-[#92400E] font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Awaiting Counterparty Signature
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#605A53]">
          <span>Client: {clientAccepted ? '✓ Signed' : 'Pending'}</span>
          <span>Freelancer: {freelancerAccepted ? '✓ Signed' : 'Pending'}</span>
          <span className="font-mono text-[#8A837A] hidden sm:inline">
            Hash: {agreement.agreementHash?.slice(0, 16)}...
          </span>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1C1917]">
            Milestones ({projectMilestones.length})
          </h2>
          <span className="text-xs text-[#8A837A]">
            Current Actor: <strong>{currentUser.role}</strong>
          </span>
        </div>

        {projectMilestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            project={project}
            currentUser={currentUser}
            deliveries={deliveries}
            reviews={reviews}
            onFundEscrow={(m) => handleFundEscrow(m.id)}
            onSubmitDeliverable={(m) => setActiveDeliverableMilestone(m)}
            onReviewDeliverable={(m, d) => setActiveReviewData({ milestone: m, delivery: d })}
            onReleasePayment={(m) => handleReleasePayment(m.id)}
            onOpenDispute={(m) => setActiveDisputeMilestone(m)}
          />
        ))}
      </div>

      {/* Modals */}
      {activeDeliverableMilestone && (
        <DeliverableModal
          milestone={activeDeliverableMilestone}
          isOpen={Boolean(activeDeliverableMilestone)}
          onClose={() => setActiveDeliverableMilestone(null)}
          onSubmit={async (notes, files, url) => {
            await handleSubmitDeliverable(activeDeliverableMilestone.id, notes, files, url);
          }}
        />
      )}

      {activeReviewData && (
        <ReviewModal
          milestone={activeReviewData.milestone}
          delivery={activeReviewData.delivery}
          isOpen={Boolean(activeReviewData)}
          onClose={() => setActiveReviewData(null)}
          onSubmitReview={(decision, feedback, checklist) => {
            handleReviewDeliverable(
              activeReviewData.milestone.id,
              activeReviewData.delivery.id,
              decision,
              feedback,
              checklist
            );
          }}
        />
      )}

      {activeDisputeMilestone && (
        <DisputeModal
          milestone={activeDisputeMilestone}
          dispute={disputes[activeDisputeMilestone.id]}
          currentUser={currentUser}
          isOpen={Boolean(activeDisputeMilestone)}
          onClose={() => setActiveDisputeMilestone(null)}
          onRaiseDispute={(reason) => {
            handleRaiseDispute(activeDisputeMilestone.id, reason);
          }}
          onProposeSettlement={(proposal) => {
            handleProposeSettlement(activeDisputeMilestone.id, proposal);
          }}
          onExecuteSettlement={(proposal) => {
            handleExecuteSettlement(activeDisputeMilestone.id, proposal);
          }}
        />
      )}

      <AmendmentModal
        currentAgreement={agreement}
        isOpen={isAmendmentOpen}
        onClose={() => setIsAmendmentOpen(false)}
        onProposeAmendment={handleProposeAmendment}
      />
    </div>
  );
};
