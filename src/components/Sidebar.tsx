import React from 'react';
import { useTimeline } from '../context/TimelineContext';
import { TimelineStyle, AnimationEffect } from '../types';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const STYLE_OPTIONS: { value: TimelineStyle; label: string; icon: string }[] = [
  { value: 'vertical', label: '垂直', icon: '📏' },
  { value: 'horizontal', label: '水平', icon: '📐' },
  { value: 'alternating', label: '交替', icon: '🔀' },
  { value: 'compact', label: '紧凑', icon: '📋' },
  { value: 'minimal', label: '极简', icon: '✨' },
];

const ANIMATION_OPTIONS: { value: AnimationEffect; label: string }[] = [
  { value: 'none', label: '无' },
  { value: 'fade', label: '淡入' },
  { value: 'slide', label: '滑入' },
  { value: 'bounce', label: '弹跳' },
];

const PRESET_COLORS = [
  '#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#64748b',
];

export default function Sidebar() {
  const {
    events, config, selectedEventId,
    setSelectedEventId, addEvent, updateEvent, deleteEvent, updateConfig,
  } = useTimeline();

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="flex flex-col h-full">
      {/* Style selector */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          时间轴风格
        </h3>
        <div className="grid grid-cols-5 gap-1">
          {STYLE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => updateConfig({ style: opt.value })}
              className={`flex flex-col items-center p-2 rounded-lg text-xs transition-colors ${
                config.style === opt.value
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              title={opt.label}
            >
              <span className="text-lg">{opt.icon}</span>
              <span className="mt-0.5 leading-none">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Config */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          配置
        </h3>
        <input
          type="text"
          value={config.title}
          onChange={e => updateConfig({ title: e.target.value })}
          placeholder="时间轴标题"
          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="text"
          value={config.subtitle}
          onChange={e => updateConfig({ subtitle: e.target.value })}
          placeholder="副标题"
          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <div className="flex gap-2">
          <select
            value={config.animation}
            onChange={e => updateConfig({ animation: e.target.value as AnimationEffect })}
            className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none"
          >
            {ANIMATION_OPTIONS.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={config.showConnectors}
              onChange={e => updateConfig({ showConnectors: e.target.checked })}
              className="rounded"
            />
            连接线
          </label>
          <label className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={config.showDates}
              onChange={e => updateConfig({ showDates: e.target.checked })}
              className="rounded"
            />
            日期
          </label>
        </div>
      </div>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              事件 ({events.length})
            </h3>
            <button
              onClick={addEvent}
              className="p-1 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 transition-colors"
              aria-label="添加事件"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {events.map(event => (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id === selectedEventId ? null : event.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                  event.id === selectedEventId
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-300 dark:ring-indigo-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <GripVertical size={14} className="text-gray-400 flex-shrink-0 cursor-grab" />
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: event.color }}
                />
                <span className="text-lg flex-shrink-0">{event.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 truncate">{event.title}</div>
                  <div className="text-xs text-gray-400">{event.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event editor */}
      {selectedEvent && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              编辑事件
            </h3>
            <button
              onClick={() => { deleteEvent(selectedEvent.id); }}
              className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 transition-colors"
              aria-label="删除事件"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <input
            type="text"
            value={selectedEvent.title}
            onChange={e => updateEvent(selectedEvent.id, { title: e.target.value })}
            placeholder="标题"
            className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea
            value={selectedEvent.description}
            onChange={e => updateEvent(selectedEvent.id, { description: e.target.value })}
            placeholder="描述"
            rows={2}
            className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedEvent.date}
              onChange={e => updateEvent(selectedEvent.id, { date: e.target.value })}
              className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none"
            />
            <input
              type="text"
              value={selectedEvent.icon}
              onChange={e => updateEvent(selectedEvent.id, { icon: e.target.value })}
              placeholder="图标"
              className="w-16 px-3 py-1.5 text-sm text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                onClick={() => updateEvent(selectedEvent.id, { color: c })}
                className={`w-6 h-6 rounded-full transition-transform ${
                  selectedEvent.color === c ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`颜色 ${c}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
