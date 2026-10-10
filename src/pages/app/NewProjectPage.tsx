import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useFairwork } from '../../context/FairworkContext';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

interface MilestoneDraft {
  title: string;
  description: string;
  amountDollars: number;
  deadline: string;
  acceptanceCriteria: string[];
}

export const NewProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { allUsers, handleCreateProject } = useFairwork();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetDollars, setBudgetDollars] = useState<number>(3000);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'USDC'>('USD');
  const [freelancerId, setFreelancerId] = useState('freelancer_01');

  const [milestones, setMilestones] = useState<MilestoneDraft[]>([
    {
      title: 'Milestone 1: Prototype Foundation',
      description: 'Initial specifications and core component framework.',
      amountDollars: 1500,
      deadline: '2026-04-15',
      acceptanceCriteria: ['Component architecture verified', 'Automated test suite passing'],
    },
    {
      title: 'Milestone 2: Final Verification & Integration',
      description: 'End-to-end integration and security review.',
      amountDollars: 1500,
      deadline: '2026-05-01',
      acceptanceCriteria: ['Zero blocking bugs', 'Full deployment documentation'],
    },
  ]);

  // Live Rule 1 validation calculation
  const totalAllocatedDollars = milestones.reduce((sum, m) => sum + (Number(m.amountDollars) || 0), 0);
  const differenceDollars = budgetDollars - totalAllocatedDollars;
  const isBudgetBalanced = differenceDollars === 0;

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      {
        title: `Milestone ${milestones.length + 1}`,
        description: 'Detail acceptance requirements here.',
        amountDollars: Math.max(0, differenceDollars),
        deadline: '2026-05-15',
        acceptanceCriteria: ['Documented proof of work'],
      },
    ]);
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, idx) => idx !== index));
  };

  const handleUpdateMilestone = (index: number, field: keyof MilestoneDraft, value: unknown) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBudgetBalanced || !title.trim()) return;

    const newId = handleCreateProject({
      title,
      description,
      budgetDollars,
      currency,
      freelancerId,
      milestones,
    });

    navigate(`/app/projects/${newId}`);
  };

  const freelancerOptions = Object.values(allUsers)
    .filter((u) => u.role === 'FREELANCER')
    .map((u) => ({ value: u.id, label: `${u.displayName} (${u.email})` }));

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5]">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            onClick={() => navigate('/app/projects')}
          >
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1C1917]">
              Create New Verifiable Agreement
            </h1>
            <p className="text-xs text-[#605A53]">
              Configure project scope, budget, and verifiable milestones
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Basic Info */}
        <Card className="p-5 space-y-4">
          <h2 className="text-sm font-bold text-[#1C1917] border-b border-[#EFECE6] pb-2">
            1. Project Details
          </h2>

          <Input
            label="Project Title *"
            required
            placeholder="e.g. Smart Contract Security Audit & Frontend"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Scope Overview *"
            required
            rows={3}
            placeholder="Describe the overall project objectives, deliverables, and expectations..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Total Project Budget ($) *"
              type="number"
              min="1"
              required
              value={budgetDollars}
              onChange={(e) => setBudgetDollars(Number(e.target.value) || 0)}
            />

            <Select
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as typeof currency)}
              options={[
                { value: 'USD', label: 'USD ($)' },
                { value: 'EUR', label: 'EUR (€)' },
                { value: 'GBP', label: 'GBP (£)' },
                { value: 'USDC', label: 'USDC (Crypto Stablecoin)' },
              ]}
            />

            <Select
              label="Assigned Freelancer"
              value={freelancerId}
              onChange={(e) => setFreelancerId(e.target.value)}
              options={freelancerOptions}
            />
          </div>
        </Card>

        {/* Milestone Configuration & Rule 1 Enforcer */}
        <Card className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE6] pb-2">
            <div>
              <h2 className="text-sm font-bold text-[#1C1917]">
                2. Milestones &amp; Acceptance Criteria
              </h2>
              <p className="text-xs text-[#605A53]">
                Every milestone must contain verifiable criteria and add up to the total budget
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={handleAddMilestone}
            >
              Add Milestone
            </Button>
          </div>

          {/* Rule 1 Live Budget Indicator */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
              isBudgetBalanced
                ? 'bg-[#EBF4EE] border-[#C2DEC9] text-[#285C42]'
                : 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]'
            }`}
          >
            <div className="flex items-center gap-2">
              {isBudgetBalanced ? (
                <CheckCircle2 className="w-4 h-4 text-[#285C42] shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#92400E] shrink-0" />
              )}
              <span>
                <strong>Rule 1 Status:</strong> Total: ${budgetDollars.toLocaleString()} |
                Allocated: ${totalAllocatedDollars.toLocaleString()}
              </span>
            </div>

            <span className="font-mono font-bold">
              {isBudgetBalanced
                ? 'Exact Match (100%)'
                : differenceDollars > 0
                ? `$${differenceDollars.toLocaleString()} remaining to allocate`
                : `$${Math.abs(differenceDollars).toLocaleString()} overallocated`}
            </span>
          </div>

          {/* Milestones List */}
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#E5DFD5] bg-[#FAF7F2]/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#264235] uppercase font-mono">
                    Milestone #{idx + 1}
                  </span>
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      className="text-[#991B1B] hover:text-[#7F1D1D] p-1 cursor-pointer"
                      title="Remove milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <Input
                      label="Milestone Title"
                      required
                      value={milestone.title}
                      onChange={(e) => handleUpdateMilestone(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Amount ($)"
                      type="number"
                      min="1"
                      required
                      value={milestone.amountDollars}
                      onChange={(e) =>
                        handleUpdateMilestone(idx, 'amountDollars', Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <Input
                      label="Description"
                      value={milestone.description}
                      onChange={(e) =>
                        handleUpdateMilestone(idx, 'description', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Target Deadline"
                      type="date"
                      value={milestone.deadline}
                      onChange={(e) => handleUpdateMilestone(idx, 'deadline', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5DFD5]">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/app/projects')}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={!isBudgetBalanced || !title.trim()}
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          >
            Create &amp; Sign Agreement
          </Button>
        </div>
      </form>
    </div>
  );
};
