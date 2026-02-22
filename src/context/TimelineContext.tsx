import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TimelineEvent, TimelineConfig, Theme, ExportData } from '../types';

const defaultEvents: TimelineEvent[] = [
  {
    id: uuidv4(),
    title: 'Project Kickoff',
    description: 'Initial project planning, team formation, and goal alignment across all departments.',
    date: '2024-01-15',
    icon: '🚀',
    color: '#6366f1',
    tags: ['planning'],
  },
  {
    id: uuidv4(),
    title: 'Design Phase',
    description: 'UI/UX design completed with wireframes and high-fidelity mockups approved by stakeholders.',
    date: '2024-02-10',
    icon: '🎨',
    color: '#ec4899',
    tags: ['design'],
  },
  {
    id: uuidv4(),
    title: 'Development Sprint 1',
    description: 'Core infrastructure and foundational components built. Database schema finalized.',
    date: '2024-03-01',
    icon: '💻',
    color: '#10b981',
    tags: ['development'],
  },
  {
    id: uuidv4(),
    title: 'Beta Launch',
    description: 'Beta version released to a select group of 500 early adopters for testing and feedback.',
    date: '2024-04-20',
    icon: '🧪',
    color: '#f59e0b',
    tags: ['launch'],
  },
  {
    id: uuidv4(),
    title: 'Public Release',
    description: 'Full public launch with marketing campaign. Over 10,000 users signed up in the first week.',
    date: '2024-06-01',
    icon: '🎉',
    color: '#ef4444',
    tags: ['launch', 'milestone'],
  },
];

const defaultConfig: TimelineConfig = {
  style: 'vertical',
  animation: 'fade',
  customCSS: '',
  showConnectors: true,
  showDates: true,
  title: 'Project Timeline',
  subtitle: 'Key milestones and achievements',
};

interface TimelineContextType {
  events: TimelineEvent[];
  config: TimelineConfig;
  theme: Theme;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  addEvent: () => void;
  updateEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  deleteEvent: (id: string) => void;
  reorderEvents: (activeId: string, overId: string) => void;
  updateConfig: (updates: Partial<TimelineConfig>) => void;
  toggleTheme: () => void;
  importData: (data: ExportData) => void;
  exportData: () => ExportData;
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export function TimelineProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<TimelineEvent[]>(defaultEvents);
  const [config, setConfig] = useState<TimelineConfig>(defaultConfig);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('timeline-theme');
    return (saved as Theme) || 'light';
  });
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const addEvent = useCallback(() => {
    const newEvent: TimelineEvent = {
      id: uuidv4(),
      title: 'New Event',
      description: 'Add a description for this event.',
      date: new Date().toISOString().split('T')[0],
      icon: '📌',
      color: '#6366f1',
      tags: [],
    };
    setEvents(prev => [...prev, newEvent]);
    setSelectedEventId(newEvent.id);
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<TimelineEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setSelectedEventId(prev => prev === id ? null : prev);
  }, []);

  const reorderEvents = useCallback((activeId: string, overId: string) => {
    setEvents(prev => {
      const oldIndex = prev.findIndex(e => e.id === activeId);
      const newIndex = prev.findIndex(e => e.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      return next;
    });
  }, []);

  const updateConfig = useCallback((updates: Partial<TimelineConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('timeline-theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  const importData = useCallback((data: ExportData) => {
    setEvents(data.events);
    setConfig(data.config);
    setSelectedEventId(null);
  }, []);

  const exportData = useCallback((): ExportData => ({
    events,
    config,
    version: '1.0.0',
  }), [events, config]);

  // Apply theme on mount
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <TimelineContext.Provider value={{
      events,
      config,
      theme,
      selectedEventId,
      setSelectedEventId,
      addEvent,
      updateEvent,
      deleteEvent,
      reorderEvents,
      updateConfig,
      toggleTheme,
      importData,
      exportData,
    }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error('useTimeline must be used within TimelineProvider');
  return ctx;
}
