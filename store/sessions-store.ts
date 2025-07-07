import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SkiSession } from '@/types';
import { sessions as mockSessions } from '@/mocks/sessions';

interface SessionsState {
  sessions: SkiSession[];
  addSession: (session: SkiSession) => void;
  removeSession: (id: string) => void;
  updateSession: (id: string, updatedSession: Partial<SkiSession>) => void;
  getLastSession: () => SkiSession | null;
  getWeeklySessions: () => { date: string; count: number }[];
}

export const useSessionsStore = create<SessionsState>()(
  persist(
    (set, get) => ({
      sessions: mockSessions,
      addSession: (session) => 
        set((state) => ({ sessions: [...state.sessions, session] })),
      removeSession: (id) => 
        set((state) => ({ 
          sessions: state.sessions.filter((session) => session.id !== id) 
        })),
      updateSession: (id, updatedSession) => 
        set((state) => ({ 
          sessions: state.sessions.map((session) => 
            session.id === id ? { ...session, ...updatedSession } : session
          ) 
        })),
      getLastSession: () => {
        return [...get().sessions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] || null;
      },
      getWeeklySessions: () => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        // Get sessions from the last 7 days
        const recentSessions = get().sessions
          .filter(session => new Date(session.date) >= oneWeekAgo);
        
        // Group by day
        const sessionsByDay: Record<string, number> = {};
        for (let i = 0; i < 7; i++) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dateString = date.toISOString().split('T')[0];
          sessionsByDay[dateString] = 0;
        }
        
        // Count sessions per day
        recentSessions.forEach(session => {
          const dateString = session.date;
          if (sessionsByDay[dateString] !== undefined) {
            sessionsByDay[dateString] += 1;
          }
        });
        
        // Convert to array format
        return Object.entries(sessionsByDay)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date));
      },
    }),
    {
      name: 'snowboard-sessions-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);