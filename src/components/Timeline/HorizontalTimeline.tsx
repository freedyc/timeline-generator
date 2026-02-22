import React from 'react';
import { TimelineEvent, TimelineConfig } from '../../types';
import EventCard from './EventCard';

interface Props {
  events: TimelineEvent[];
  config: TimelineConfig;
}

export default function HorizontalTimeline({ events, config }: Props) {
  return (
    <div className="horizontal-scroll py-8">
      <div className="inline-flex flex-col min-w-full px-8">
        {/* Connector line row */}
        {config.showConnectors && (
          <div className="flex items-center mb-4">
            {events.map((event, index) => (
              <React.Fragment key={event.id}>
                {/* Dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white dark:border-gray-950 shadow-md z-10"
                    style={{ backgroundColor: event.color }}
                  />
                </div>
                {/* Line segment */}
                {index < events.length - 1 && (
                  <div className="flex-1 h-0.5 timeline-line min-w-16" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Cards row */}
        <div className="flex gap-4 items-start">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="w-56 flex-shrink-0"
            >
              <EventCard
                event={event}
                animation={config.animation}
                index={index}
                showDate={config.showDates}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
