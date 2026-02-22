# Timeline Generator - Product Requirements Document

## 1. Overview

### 1.1 Product Summary
Timeline Generator is a web-based application that enables users to create, customize, and export beautiful timeline visualizations. Users can define events with rich metadata, choose from multiple visual styles, and export their timelines as images or PDF documents.

### 1.2 Goals
- Provide an intuitive visual editor for timeline creation
- Support multiple timeline styles for different use cases
- Enable easy data import/export for reuse and sharing
- Support dark and light themes for different environments
- Allow high-quality export for presentations and documents

---

## 2. User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|------------|
| US-01 | User | Add events to a timeline | I can document milestones |
| US-02 | User | Edit event details (title, date, description, icon, color) | My timeline is accurate and visually appealing |
| US-03 | User | Reorder events via drag & drop | I can organize events intuitively |
| US-04 | User | Choose a timeline style | My timeline matches the context/audience |
| US-05 | User | Preview changes in real-time | I can iterate quickly |
| US-06 | User | Export timeline as PNG or PDF | I can include it in presentations |
| US-07 | User | Import/Export JSON data | I can save and share my work |
| US-08 | User | Toggle dark/light theme | I can work in different lighting conditions |
| US-09 | User | Apply custom CSS | I can match my brand or style guide |
| US-10 | User | Add animation effects | I can create engaging presentations |

---

## 3. Features

### 3.1 Timeline Styles
The app supports five distinct timeline layouts:

| Style | Description | Best For |
|-------|-------------|----------|
| **Vertical** | Events stacked vertically with a center line | Project milestones, history |
| **Horizontal** | Events arranged along a horizontal axis | Process flows, chronologies |
| **Alternating** | Events alternate left and right of center line | Balanced narratives, comparisons |
| **Compact** | Dense view with smaller cards | High-event-count timelines |
| **Minimal** | Clean, minimal design with just essential info | Presentations, reports |

### 3.2 Event Properties
Each timeline event supports the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Event name/headline |
| `description` | string | No | Detailed description |
| `date` | string | Yes | Event date (ISO format) |
| `icon` | string | No | Emoji or symbol for the event |
| `color` | string | Yes | Accent color (hex) |
| `image` | string | No | Image URL or base64 data |
| `tags` | string[] | No | Categorization tags |

### 3.3 Visual Editor
- **Event List**: Shows all events in order with drag handles for reordering
- **Event Editor Form**: Inline form to create/edit events
- **Live Preview**: Real-time preview updates as the user edits
- **Style Selector**: Visual picker for timeline styles
- **Animation Selector**: Choose animation effects (none, fade, slide, bounce)
- **Custom CSS Editor**: Text area for user-defined CSS overrides

### 3.4 Theme Support
- Light theme (default)
- Dark theme
- One-click toggle in the header
- Theme preference persisted in localStorage

### 3.5 Export
- **Export PNG**: Uses html2canvas to render the timeline and download as PNG
- **Export PDF**: Uses jsPDF + html2canvas to create a PDF document

### 3.6 Data Management
- **Export JSON**: Downloads all event data and config as a JSON file
- **Import JSON**: Loads events and config from a JSON file
- Data validation on import to ensure schema compatibility

### 3.7 Animation Effects

| Effect | Description |
|--------|-------------|
| `none` | No animation |
| `fade` | Events fade in on load |
| `slide` | Events slide in from the side |
| `bounce` | Events bounce in with spring effect |

---

## 4. Technical Architecture

### 4.1 Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 4
- **Styling**: TailwindCSS 3 (with dark mode class strategy)
- **Drag & Drop**: @dnd-kit/core + @dnd-kit/sortable
- **Export**: html2canvas + jsPDF
- **Icons**: lucide-react
- **Testing**: Vitest + @testing-library/react

### 4.2 State Management
- React Context API with useState for global state
- State includes: events[], config, theme, selectedEventId

### 4.3 Data Schema
```typescript
interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  image?: string;
  tags?: string[];
}

interface TimelineConfig {
  style: 'vertical' | 'horizontal' | 'alternating' | 'compact' | 'minimal';
  animation: 'none' | 'fade' | 'slide' | 'bounce';
  customCSS: string;
  showConnectors: boolean;
  showDates: boolean;
  title: string;
  subtitle: string;
}
```

### 4.4 Component Hierarchy
```
App
├── Header
│   ├── ThemeToggle
│   ├── ExportPanel
│   └── ImportExport
├── Sidebar
│   ├── StyleSelector
│   ├── AnimationSelector
│   ├── EventList (with DnD)
│   ├── EventEditor
│   └── CustomCSSEditor
└── TimelinePreview
    ├── VerticalTimeline
    ├── HorizontalTimeline
    ├── AlternatingTimeline
    ├── CompactTimeline
    └── MinimalTimeline
```

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Timeline preview updates within 100ms of user input
- Export operations complete within 5 seconds for typical timelines (up to 50 events)
- App loads within 3 seconds on a modern broadband connection

### 5.2 Accessibility
- All interactive elements have ARIA labels
- Color contrast meets WCAG 2.1 AA standards
- Keyboard navigation supported for all primary actions

### 5.3 Responsive Design
- Fully functional on mobile (320px+), tablet, and desktop
- Sidebar collapses to a drawer on mobile screens
- Horizontal timeline scrollable on mobile

### 5.4 Browser Support
- Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

---

## 6. Out of Scope (v1)
- User accounts / cloud storage
- Real-time collaboration
- Custom fonts upload
- Video/audio attachments
- Timeline sharing via URL
- Print stylesheet optimization
