import React from 'react';
import { Clock, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useTimeline } from '../context/TimelineContext';
import ThemeToggle from './shared/ThemeToggle';
import ExportPanel from './shared/ExportPanel';
import ImportExport from './shared/ImportExport';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  const { config } = useTimeline();

  return (
    <header className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3 z-20">
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
      </button>

      {/* Logo + title */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Clock size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-none">
            Timeline Generator
          </h1>
          {config.title && (
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-none mt-0.5 truncate max-w-48">
              {config.title}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <ImportExport />
        <ExportPanel />
        <ThemeToggle />
      </div>
    </header>
  );
}
