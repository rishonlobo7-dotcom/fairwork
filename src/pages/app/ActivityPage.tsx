import React, { useState } from 'react';
import {
  History,
  FileText,
  CreditCard,
  Upload,
  ShieldCheck,
  Scale,
  Search,
} from 'lucide-react';
import { useFairwork } from '../../context/FairworkContext';
import { Card } from '../../components/ui/Card';
import { ActivityEventType } from '../../types/fairwork';

export const ActivityPage: React.FC = () => {
  const { events } = useFairwork();
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredEvents = events.filter((e) => {
    if (filterType === 'ALL') return true;
    return e.eventType.includes(filterType);
  });

  const getEventIcon = (type: ActivityEventType) => {
    if (type.includes('AGREEMENT')) return <FileText className="w-4 h-4 text-[#264235]" />;
    if (type.includes('DELIVERY')) return <Upload className="w-4 h-4 text-[#B45309]" />;
    if (type.includes('REVIEW')) return <ShieldCheck className="w-4 h-4 text-[#285C42]" />;
    if (type.includes('PAYMENT') || type.includes('FUNDED')) return <CreditCard className="w-4 h-4 text-[#1E429F]" />;
    if (type.includes('DISPUTE')) return <Scale className="w-4 h-4 text-[#991B1B]" />;
    return <History className="w-4 h-4 text-[#8A837A]" />;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1C1917]">
            Verifiable Activity &amp; Audit Trail
          </h1>
          <p className="text-xs text-[#605A53] mt-0.5">
            Immutable, timestamped record of every agreement signature, escrow deposit, proof submission, and decision
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5DFD5] text-xs">
          {['ALL', 'AGREEMENT', 'DELIVERY', 'REVIEW', 'PAYMENT', 'DISPUTE'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                filterType === f
                  ? 'bg-[#264235] text-white'
                  : 'text-[#605A53] hover:text-[#1C1917]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((evt) => (
          <Card key={evt.id} className="p-4 flex items-start gap-3 text-xs">
            <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E5DFD5] shrink-0 mt-0.5">
              {getEventIcon(evt.eventType)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                <span className="font-bold text-[#1C1917]">
                  {evt.eventType.replace(/_/g, ' ')}
                </span>
                <span className="text-[11px] text-[#8A837A] font-mono">
                  {new Date(evt.timestamp).toLocaleString()}
                </span>
              </div>

              <p className="text-[#292524] mb-2 leading-relaxed">
                {evt.details}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#8A837A] font-mono pt-2 border-t border-[#EFECE6]">
                <span>Actor: {evt.actorRole} ({evt.actorId})</span>
                {evt.milestoneId && <span>Milestone: {evt.milestoneId}</span>}
                {evt.transactionReference && (
                  <span className="text-[#264235] font-semibold">
                    Ref: {evt.transactionReference}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
