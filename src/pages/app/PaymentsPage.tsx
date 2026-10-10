import React from 'react';
import {
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  Scale,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { useFairwork } from '../../context/FairworkContext';
import { Card } from '../../components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatMoney } from '../../core/money';

export const PaymentsPage: React.FC = () => {
  const { payments, financials, activeProject, allUsers } = useFairwork();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1C1917]">
            Payments &amp; Escrow Ledger
          </h1>
          <p className="text-xs text-[#605A53] mt-0.5">
            Relationship #5: Verifiable transaction history, escrow balances, and release records
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
          Simulated Escrow &bull; Prototype Ledger
        </span>
      </div>

      {/* Escrow Balance Metrics (Single Source of Truth) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8A837A] uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#B45309]" />
            Currently in Escrow
          </div>
          <div className="text-2xl font-bold text-[#B45309]">
            {formatMoney(financials.fundedInEscrowMinor, activeProject.currency)}
          </div>
          <div className="text-[11px] text-[#605A53] mt-1">
            Simulated vault hold
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8A837A] uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#285C42]" />
            Total Released
          </div>
          <div className="text-2xl font-bold text-[#285C42]">
            {formatMoney(financials.releasedMinor, activeProject.currency)}
          </div>
          <div className="text-[11px] text-[#605A53] mt-1">
            Paid out upon approved proof
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5DFD5] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8A837A] uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#991B1B]" />
            Locked in Dispute
          </div>
          <div className="text-2xl font-bold text-[#991B1B]">
            {formatMoney(financials.disputedMinor, activeProject.currency)}
          </div>
          <div className="text-[11px] text-[#605A53] mt-1">
            Unilateral release locked
          </div>
        </div>
      </div>

      {/* Transaction Records Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-[#EFECE6] bg-[#FAF7F2] flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
            Immutable Transaction Records ({payments.length})
          </h2>
          <span className="text-[11px] text-[#8A837A]">
            Rule 8: Integer minor units calculations
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payer &rarr; Recipient</TableHead>
              <TableHead>Reference / Tx ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => {
              const isDeposit = p.type === 'ESCROW_DEPOSIT';
              const payerName = allUsers[p.payerId]?.displayName || p.payerId;
              const recipientName = allUsers[p.recipientId]?.displayName || p.recipientId;

              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-1.5 font-semibold text-xs">
                      {isDeposit ? (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-[#B45309]" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#285C42]" />
                      )}
                      <span>{p.type.replace(/_/g, ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-xs">
                    {formatMoney(p.amountMinor, p.currency)}
                  </TableCell>
                  <TableCell className="text-xs text-[#605A53]">
                    <span>{payerName}</span> &rarr; <span>{recipientName}</span>
                  </TableCell>
                  <TableCell>
                    <code className="text-[11px] font-mono text-[#605A53] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#EFECE6]">
                      {p.reference}
                    </code>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} size="sm" />
                  </TableCell>
                  <TableCell className="text-[11px] text-[#8A837A] font-mono">
                    {new Date(p.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
