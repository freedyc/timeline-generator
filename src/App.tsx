import React, { useState } from 'react';
import { TimelineProvider } from './context/TimelineContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TimelinePreview from './components/Timeline/TimelinePreview';
import { PanelLeft } from 'lucide-react';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Header onToggleSidebar={() => setSidebarOpen(p => !p)} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            flex-shrink-0 transition-all duration-300 overflow-hidden
            ${sidebarOpen ? 'w-80' : 'w-0'}
            border-r border-gray-200 dark:border-gray-700
          `}
        >
          <div className="w-80 h-full overflow-y-auto bg-white dark:bg-gray-900">
            <Sidebar />
          </div>
        </div>

        {/* Toggle button for collapsed sidebar */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-r-lg p-2 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Open sidebar"
          >
            <PanelLeft size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}

        {/* Preview */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950">
          <TimelinePreview />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TimelineProvider>
      <AppContent />
    </TimelineProvider>
  );
}
