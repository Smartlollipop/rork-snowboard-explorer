import { create } from 'zustand';
import { Resort } from '@/types';
import { resorts as mockResorts } from '@/mocks/resorts';

interface ResortsState {
  resorts: Resort[];
  getResortById: (id: string) => Resort | undefined;
  getPreferredResort: (preferredId?: string) => Resort;
}

export const useResortsStore = create<ResortsState>()((set, get) => ({
  resorts: mockResorts,
  getResortById: (id) => {
    return get().resorts.find((resort) => resort.id === id);
  },
  getPreferredResort: (preferredId) => {
    if (preferredId) {
      const resort = get().getResortById(preferredId);
      if (resort) return resort;
    }
    return get().resorts[0];
  },
}));