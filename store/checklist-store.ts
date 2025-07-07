import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChecklistItem } from '@/types';
import { checklist as mockChecklist } from '@/mocks/checklist';

interface ChecklistState {
  items: ChecklistItem[];
  addItem: (item: ChecklistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  updateItem: (id: string, updatedItem: Partial<ChecklistItem>) => void;
  getCompletionPercentage: () => number;
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      items: mockChecklist,
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => 
        set((state) => ({ 
          items: state.items.filter((item) => item.id !== id) 
        })),
      toggleItem: (id) => 
        set((state) => ({ 
          items: state.items.map((item) => 
            item.id === id ? { ...item, completed: !item.completed } : item
          ) 
        })),
      updateItem: (id, updatedItem) => 
        set((state) => ({ 
          items: state.items.map((item) => 
            item.id === id ? { ...item, ...updatedItem } : item
          ) 
        })),
      getCompletionPercentage: () => {
        const items = get().items;
        if (items.length === 0) return 0;
        const completedItems = items.filter(item => item.completed).length;
        return Math.round((completedItems / items.length) * 100);
      },
    }),
    {
      name: 'snowboard-checklist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);