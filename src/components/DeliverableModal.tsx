import React, { useState } from 'react';
import { Upload, X, FileText, Fingerprint } from 'lucide-react';
import { FileReference, Milestone } from '../types/fairwork';
import { sha256 } from '../core/crypto';

interface DeliverableModalProps {
  milestone: Milestone;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (notes: string, files: FileReference[], externalUrl?: string) => Promise<void>;
}

export const DeliverableModal: React.FC<DeliverableModalProps> = ({
  milestone,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [notes, setNotes] = useState('');
  const [externalUrl, setExternalUrl] = useState('https://github.com/fairwork-demo/repo');
  const [fileName, setFileName] = useState('fairwork_build_v1.tar.gz');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    setIsSubmitting(true);
    try {
      const mockFileHash = await sha256(`FILE_CONTENT_${fileName}_${Date.now()}`);
      const simulatedFile: FileReference = {
        name: fileName,
        url: `https://storage.fairwork.sim/${fileName}`,
        sizeBytes: 2450000,
        mimeType: 'application/gzip',
        sha256Hash: mockFileHash,
        isSimulated: true,
      };

      await onSubmit(notes, [simulatedFile], externalUrl);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-purple-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Submit Milestone Deliverable
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
          <div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Milestone Target
            </span>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
              {milestone.title} (Revision #{milestone.currentRevisionCount + 1})
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Deliverable Notes &amp; Summary of Work *
            </label>
            <textarea
              required
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detail the completed acceptance criteria, testing instructions, and how the deliverable satisfies requirements..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Repository or External Demo URL
            </label>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              File Attachment (Simulated Upload)
            </label>
            <div className="p-3 rounded-xl border border-dashed border-purple-300 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-500" />
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="text-xs font-mono bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200"
                />
              </div>
              <span className="text-[11px] text-purple-600 dark:text-purple-400 font-mono">
                2.45 MB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Fingerprint className="w-3.5 h-3.5 text-purple-400" />
              A cryptographic SHA-256 fingerprint will be generated automatically upon submission.
            </p>
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
              disabled={isSubmitting || !notes.trim()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition disabled:opacity-50"
            >
              {isSubmitting ? 'Computing Hash & Submitting...' : 'Submit Deliverable'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
