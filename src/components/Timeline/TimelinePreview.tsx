import React from 'react';
import { useTimeline } from '../../context/TimelineContext';
import VerticalTimeline from './VerticalTimeline';
import HorizontalTimeline from './HorizontalTimeline';
import AlternatingTimeline from './AlternatingTimeline';
import CompactTimeline from './CompactTimeline';
import MinimalTimeline from './MinimalTimeline';

export default function TimelinePreview() {
  const { events, config } = useTimeline();

  const renderTimeline = () => {
    switch (config.style) {
      case 'horizontal':
        return <HorizontalTimeline events={events} config={config} />;
      case 'alternating':
        return <AlternatingTimeline events={events} config={config} />;
      case 'compact':
        return <CompactTimeline events={events} config={config} />;
      case 'minimal':
        return <MinimalTimeline events={events} config={config} />;
      case 'vertical':
      default:
        return <VerticalTimeline events={events} config={config} />;
    }
  };

  return (
    <div className="p-8 min-h-full">
      {/* Title */}
      {config.title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {config.subtitle}
            </p>
          )}
        </div>
      )}

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600">
          <span className="text-4xl mb-3">📭</span>
          <p className="text-sm">暂无事件，点击左侧 + 添加</p>
        </div>
      ) : (
        renderTimeline()
      )}

      {/* Custom CSS */}
      {config.customCSS && <style>{config.customCSS}</style>}
    </div>
  );
}
