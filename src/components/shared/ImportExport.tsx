import React, { useRef, useState } from 'react';
import { Upload, FolderOpen, ChevronDown } from 'lucide-react';
import { useTimeline } from '../../context/TimelineContext';
import { ExportData } from '../../types';

export default function ImportExport() {
  const { exportData, importData } = useTimeline();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timeline-data.json';
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = ev.target?.result as string;
        const data = JSON.parse(raw) as ExportData;
        if (!data.events || !data.config) throw new Error('Invalid format');
        importData(data);
        setOpen(false);
      } catch {
        setError('Invalid JSON file. Please use a valid timeline export file.');
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="btn-secondary"
        aria-label="Import or export JSON data"
      >
        <FolderOpen size={15} />
        <span className="hidden sm:inline">Data</span>
        <ChevronDown size={13} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden w-44">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload size={15} className="text-green-500" />
              Import JSON
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-t border-gray-100 dark:border-gray-700"
            >
              <FolderOpen size={15} className="text-blue-500" />
              Export JSON
            </button>
            {error && (
              <div className="px-4 py-2 text-xs text-red-500 border-t border-gray-100 dark:border-gray-700">
                {error}
              </div>
            )}
          </div>
        </>
      )}

      <input
        ref={fileRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  );
}
