import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Code2,
  Scale,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useFairwork } from '../context/FairworkContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { allUsers, setCurrentUser } = useFairwork();

  const handleSelectRole = (userId: string) => {
    const user = allUsers[userId];
    if (user) {
      setCurrentUser(user);
    }
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1C1917] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#264235] flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-base tracking-tight text-[#1C1917]">
            Fairwork
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          onClick={() => navigate('/')}
        >
          Back to Overview
        </Button>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#E5DFD5] text-[#264235] text-[11px] font-semibold mb-3">
            <span>Prototype Sandbox Access</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
            Choose Your Demo Persona
          </h1>
          <p className="text-xs text-[#605A53] mt-1.5 leading-relaxed">
            Select a verified profile to explore role-based permissions, escrow workflows, and decision gates without needing real credentials.
          </p>
        </div>

        <div className="space-y-3">
          {/* Client Persona */}
          <div
            onClick={() => handleSelectRole('client_01')}
            className="p-4 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#264235] hover:shadow-xs transition cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E8F0FE] text-[#1E429F] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C1917] group-hover:text-[#264235] transition">
                    Nexus Ventures (Alice)
                  </h3>
                  <span className="text-[11px] text-[#605A53]">Client Account</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#E8F0FE] text-[#1E429F] border border-[#D0E1FD]">
                CLIENT
              </span>
            </div>
            <p className="text-xs text-[#605A53] mb-3">
              Fund escrow deposits, inspect deliverable criteria checklists, request revisions, and release payouts.
            </p>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#EFECE6] text-[#264235] font-semibold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ID_VERIFIED
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition">
                Enter as Client <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Freelancer Persona */}
          <div
            onClick={() => handleSelectRole('freelancer_01')}
            className="p-4 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#264235] hover:shadow-xs transition cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EBF4EE] text-[#285C42] flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C1917] group-hover:text-[#264235] transition">
                    Bob Martinez
                  </h3>
                  <span className="text-[11px] text-[#605A53]">Senior Engineer</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#EBF4EE] text-[#285C42] border border-[#C2DEC9]">
                FREELANCER
              </span>
            </div>
            <p className="text-xs text-[#605A53] mb-3">
              Sign agreements, submit deliverables with SHA-256 fingerprints, track funded escrow, and manage revision history.
            </p>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#EFECE6] text-[#264235] font-semibold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED_PRO
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition">
                Enter as Freelancer <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Arbitrator Persona */}
          <div
            onClick={() => handleSelectRole('arbitrator_01')}
            className="p-4 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#264235] hover:shadow-xs transition cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#6B21A8] flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C1917] group-hover:text-[#264235] transition">
                    Claire Justice, Esq.
                  </h3>
                  <span className="text-[11px] text-[#605A53]">Commercial Arbitrator</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5FF]">
                ARBITRATOR
              </span>
            </div>
            <p className="text-xs text-[#605A53] mb-3">
              Inspect submitted evidence, evaluate milestone criteria disputes, and rule on structured settlement splits.
            </p>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#EFECE6] text-[#264235] font-semibold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED_PRO
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition">
                Enter as Arbitrator <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#8A837A] text-center mt-6">
          You can switch personas at any time using the header toggle inside the app.
        </p>
      </div>

      {/* Footer text */}
      <div className="max-w-md w-full mx-auto text-center text-[11px] text-[#8A837A]">
        Fairwork &bull; Verifiable Freelance &amp; Milestone Agreement Platform
      </div>
    </div>
  );
};
