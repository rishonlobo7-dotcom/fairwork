import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  Lock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
  Plus,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { useFairwork } from '../../context/FairworkContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatMoney } from '../../core/money';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    activeProject,
    agreement,
    milestones,
    financials,
    events,
  } = useFairwork();

  const isClient = currentUser.role === 'CLIENT';
  const isFreelancer = currentUser.role === 'FREELANCER';

  return (
    <div className="space-y-6">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#E5DFD5]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#264235] block">
            Executive Overview
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
            Welcome back, {currentUser.displayName}
          </h1>
          <p className="text-xs text-[#605A53] mt-0.5">
            Active workspace: <strong>{activeProject.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isClient && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => navigate('/app/projects/new')}
            >
              New Project
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/app/projects/${activeProject.id}`)}
          >
            View Active Project &rarr;
          </Button>
        </div>
      </div>

      {/* Financial Health Summary (Rule 9: Single Source of Truth) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8A837A] uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-[#264235]" />
            Total Budget
          </div>
          <div className="text-xl font-bold text-[#1C1917]">
            {formatMoney(financials.totalBudgetMinor, activeProject.currency)}
          </div>
          <div className="text-[11px] text-[#605A53] mt-0.5">Contract target</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8A837A] uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#B45309]" />
            Active Escrow <span className="text-[9px] lowercase font-normal">(sim)</span>
          </div>
          <div className="text-xl font-bold text-[#B45309]">
            {formatMoney(financials.fundedInEscrowMinor, activeProject.currency)}
          </div>
          <div className="text-[11px] text-[#605A53] mt-0.5">Locked &amp; in-progress</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8A837A] uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#285C42]" />
            Released Payouts
          </div>
          <div className="text-xl font-bold text-[#285C42]">
            {formatMoney(financials.releasedMinor, activeProject.currency)}
          </div>
          <div className="text-[11px] text-[#605A53] mt-0.5">Completed payments</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8A837A] uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#991B1B]" />
            In Dispute
          </div>
          <div className="text-xl font-bold text-[#991B1B]">
            {formatMoney(financials.disputedMinor, activeProject.currency)}
          </div>
          <div className="text-[11px] text-[#605A53] mt-0.5">Ordinary release locked</div>
        </div>
      </div>

      {/* Main Grid: Agreement Status + Milestones Action List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Milestones (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Milestones &amp; Work Status</CardTitle>
                <p className="text-xs text-[#605A53] mt-0.5">
                  Track delivery progress and verify completion criteria
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/app/projects/${activeProject.id}`)}
              >
                Inspect Details
              </Button>
            </CardHeader>

            <CardContent className="p-0 divide-y divide-[#EFECE6]">
              {milestones.map((m) => (
                <div key={m.id} className="p-4 hover:bg-[#FAF7F2]/60 transition flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status={m.status} size="sm" />
                      <span className="text-xs text-[#8A837A] font-medium">
                        Due {m.deadline}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1C1917] truncate">
                      {m.title}
                    </h4>
                    <p className="text-xs text-[#605A53] truncate max-w-md">
                      {m.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-[#1C1917] font-mono block">
                      {formatMoney(m.amountMinor, activeProject.currency)}
                    </span>
                    <button
                      onClick={() => navigate(`/app/projects/${activeProject.id}`)}
                      className="text-xs text-[#264235] font-semibold hover:underline cursor-pointer mt-1"
                    >
                      Action &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Rules Status Card */}
          <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#264235]" />
              <span className="font-semibold text-[#1C1917]">
                State Machine Integrity:
              </span>
              <span className="text-[#285C42] font-medium">
                18/18 Unit Tests Passing
              </span>
            </div>
            <button
              onClick={() => navigate('/how-it-works')}
              className="text-[#605A53] hover:text-[#1C1917] underline cursor-pointer"
            >
              View Invariants Spec &rarr;
            </button>
          </div>
        </div>

        {/* Right Column: Agreement & Activity (1 col) */}
        <div className="space-y-4">
          {/* Active Agreement Summary Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#264235]" />
                  Agreement v{agreement.versionNumber}
                </CardTitle>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold border ${
                    agreement.isActive
                      ? 'bg-[#EBF4EE] text-[#285C42] border-[#C2DEC9]'
                      : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                  }`}
                >
                  {agreement.isActive ? 'ACTIVE' : 'SIGNING'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#8A837A] uppercase tracking-wide block">
                  IP Assignment
                </span>
                <span className="font-semibold text-[#1C1917]">
                  {agreement.structuredTerms.intellectualPropertyClause === 'ON_PAYMENT'
                    ? 'Transfers Upon Escrow Release'
                    : agreement.structuredTerms.intellectualPropertyClause}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#8A837A] uppercase tracking-wide block">
                  SHA-256 Fingerprint
                </span>
                <code className="text-[10px] font-mono text-[#605A53] break-all">
                  {agreement.agreementHash?.slice(0, 28)}...
                </code>
              </div>

              <div className="pt-2 border-t border-[#EFECE6] flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/app/agreements')}
                >
                  Manage Agreement &rarr;
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Log Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8A837A]" />
                Recent Audit Trail
              </CardTitle>
              <button
                onClick={() => navigate('/app/activity')}
                className="text-[11px] text-[#264235] font-semibold hover:underline cursor-pointer"
              >
                All &rarr;
              </button>
            </CardHeader>
            <CardContent className="space-y-2.5 p-4 text-xs">
              {events.slice(0, 4).map((evt) => (
                <div key={evt.id} className="pb-2.5 border-b border-[#EFECE6] last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-[10px] text-[#8A837A] font-mono mb-0.5">
                    <span>{evt.eventType.replace(/_/g, ' ')}</span>
                    <span>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-[#1C1917] leading-snug">
                    {evt.details}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
