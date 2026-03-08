export type CountdownEvent = {
  id: string;
  name: string;
  description?: string;
  targetDate: string; 
  createdAt: string;
};

export type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
};

export const URGENCY_LEVELS = {
  DANGER: 'danger',   // < 24 hours
  WARNING: 'warning', // < 7 days
  CALM: 'calm',       // > 7 days
} as const;

export type UrgencyLevel = typeof URGENCY_LEVELS[keyof typeof URGENCY_LEVELS];
