export interface Resort {
  id: string;
  name: string;
  location: string;
  image: string;
  snowDepth: number;
  temperature: number;
  conditions: string;
  openRuns: number;
  totalRuns: number;
}

export interface Trip {
  id: string;
  resortId: string;
  date: string;
  duration: number; // in days
}

export interface SkiSession {
  id: string;
  date: string;
  resortId: string;
  duration: number; // in minutes
  distance: number; // in km
  maxSpeed: number; // in km/h
  feedback?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  category: 'gear' | 'clothing' | 'accessories' | 'documents' | 'other';
}

export interface User {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  preferredResortId?: string;
}