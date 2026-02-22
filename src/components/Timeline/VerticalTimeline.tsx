import React from 'react';
import { TimelineEvent, TimelineConfig } from '../../types';
import EventCard from './EventCard';

interface Props {
  events: TimelineEvent[];
  config: TimelineConfig;
}

export default function VerticalTimeline({ events, config }: Props) {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Vertical line */}
      {config.showConnectors && (
        <div className="absolute left-5 top-0 bottom-0 w-0.5 timeline-line" />
      )}

      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex gap-6 pl-12">
            {/* Dot */}
            {config.showConnectors && (
              <div
                className="absolute left-3.5 top-5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-950 shadow-md z-10 flex-shrink-0"
                style={{ backgroundColor: event.color }}
              />
            )}

            {/* Card */}
            <div className="flex-1 min-w-0">
              <EventCard
                event={event}
                animation={config.animation}
                index={index}
                showDate={config.showDates}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
