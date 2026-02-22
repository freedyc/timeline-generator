import React from 'react';
import { TimelineEvent, AnimationEffect } from '../../types';

interface EventCardProps {
  event: TimelineEvent;
  animation: AnimationEffect;
  index: number;
  compact?: boolean;
  minimal?: boolean;
  showDate?: boolean;
  side?: 'left' | 'right';
}

function getAnimationClass(animation: AnimationEffect, index: number, side?: 'left' | 'right') {
  if (animation === 'none') return '';
  const delay = Math.min(index * 100, 800);
  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';
  switch (animation) {
    case 'fade':
      return `animate-fade-in ${delayClass}`;
    case 'slide':
      return `${side === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'} ${delayClass}`;
    case 'bounce':
      return `animate-bounce-in ${delayClass}`;
    default:
      return '';
  }
}

export default function EventCard({
  event,
  animation,
  index,
  compact = false,
  minimal = false,
  showDate = true,
  side,
}: EventCardProps) {
  const animClass = getAnimationClass(animation, index, side);

  if (minimal) {
    return (
      <div className={`event-card flex items-start gap-3 ${animClass}`}>
        <div
          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
          style={{ backgroundColor: event.color }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {event.title}
            </h3>
            {showDate && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{event.date}</span>
            )}
          </div>
          {event.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`event-card ${animClass}`} style={{ borderLeftColor: event.color, borderLeftWidth: 3 }}>
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{event.icon}</span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {event.title}
            </h3>
            {showDate && (
              <p className="text-xs text-gray-400 dark:text-gray-500">{event.date}</p>
            )}
          </div>
        </div>
        {event.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        )}
        {event.tags && event.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mt-2">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: event.color + '20', color: event.color }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`event-card ${animClass}`}>
      {/* Image */}
      {event.image && (
        <div className="mb-3 -mx-4 -mt-4 rounded-t-xl overflow-hidden h-32">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Icon bubble */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: event.color + '20' }}
        >
          {event.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {event.title}
          </h3>
          {showDate && (
            <p className="text-xs font-medium mt-0.5" style={{ color: event.color }}>
              {event.date}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2.5 leading-relaxed">
          {event.description}
        </p>
      )}

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mt-3">
          {event.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: event.color + '20', color: event.color }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
