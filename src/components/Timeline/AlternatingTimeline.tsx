import React from 'react';
import { TimelineEvent, TimelineConfig } from '../../types';
import EventCard from './EventCard';

interface Props {
  events: TimelineEvent[];
  config: TimelineConfig;
}

export default function AlternatingTimeline({ events, config }: Props) {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Center line */}
      {config.showConnectors && (
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 timeline-line -translate-x-1/2" />
      )}

      <div className="space-y-8">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={event.id} className="relative flex items-center">
              {/* Left side */}
              <div className="flex-1 pr-8">
                {isLeft && (
                  <div className="ml-auto max-w-sm">
                    <EventCard
                      event={event}
                      animation={config.animation}
                      index={index}
                      showDate={config.showDates}
                      side="left"
                    />
                  </div>
                )}
              </div>

              {/* Center dot */}
              {config.showConnectors && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white dark:border-gray-950 shadow-md z-10 flex-shrink-0"
                  style={{ backgroundColor: event.color }}
                />
              )}

              {/* Right side */}
              <div className="flex-1 pl-8">
                {!isLeft && (
                  <div className="max-w-sm">
                    <EventCard
                      event={event}
                      animation={config.animation}
                      index={index}
                      showDate={config.showDates}
                      side="right"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
