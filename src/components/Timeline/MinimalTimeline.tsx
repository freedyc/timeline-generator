import React from 'react';
import { TimelineEvent, TimelineConfig } from '../../types';
import EventCard from './EventCard';

interface Props {
  events: TimelineEvent[];
  config: TimelineConfig;
}

export default function MinimalTimeline({ events, config }: Props) {
  return (
    <div className="max-w-xl mx-auto">
      {/* Dates column layout */}
      <div className="space-y-1">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-4 items-start py-1">
            {/* Date column */}
            {config.showDates && (
              <div className="w-24 flex-shrink-0 text-right pt-1">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {event.date}
                </span>
              </div>
            )}

            {/* Connector */}
            {config.showConnectors && (
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: event.color }}
                />
                {index < events.length - 1 && (
                  <div className="w-px flex-1 bg-gray-100 dark:bg-gray-800 mt-1 min-h-4" />
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0 pb-2">
              <EventCard
                event={event}
                animation={config.animation}
                index={index}
                minimal={true}
                showDate={!config.showDates}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
