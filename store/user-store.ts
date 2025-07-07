import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUserName: (name: string) => void;
  updateUserLevel: (level: User['level']) => void;
  updatePreferredResort: (resortId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: '1',
        name: 'James',
        level: 'intermediate',
        preferredResortId: '1',
      },
      setUser: (user) => set({ user }),
      updateUserName: (name) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, name } : null 
        })),
      updateUserLevel: (level) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, level } : null 
        })),
      updatePreferredResort: (preferredResortId) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, preferredResortId } : null 
        })),
    }),
    {
      name: 'snowboard-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);