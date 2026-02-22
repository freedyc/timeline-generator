export type TimelineStyle = 'vertical' | 'horizontal' | 'alternating' | 'compact' | 'minimal';
export type AnimationEffect = 'none' | 'fade' | 'slide' | 'bounce';
export type Theme = 'light' | 'dark';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  image?: string;
  tags?: string[];
}

export interface TimelineConfig {
  style: TimelineStyle;
  animation: AnimationEffect;
  customCSS: string;
  showConnectors: boolean;
  showDates: boolean;
  title: string;
  subtitle: string;
}

export interface ExportData {
  events: TimelineEvent[];
  config: TimelineConfig;
  version: string;
}
