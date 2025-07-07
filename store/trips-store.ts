import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '@/types';
import { trips as mockTrips } from '@/mocks/trips';

interface TripsState {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  removeTrip: (id: string) => void;
  updateTrip: (id: string, updatedTrip: Partial<Trip>) => void;
  getNextTrip: () => Trip | null;
}

export const useTripsStore = create<TripsState>()(
  persist(
    (set, get) => ({
      trips: mockTrips,
      addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
      removeTrip: (id) => 
        set((state) => ({ 
          trips: state.trips.filter((trip) => trip.id !== id) 
        })),
      updateTrip: (id, updatedTrip) => 
        set((state) => ({ 
          trips: state.trips.map((trip) => 
            trip.id === id ? { ...trip, ...updatedTrip } : trip
          ) 
        })),
      getNextTrip: () => {
        const now = new Date();
        return get().trips
          .filter((trip) => new Date(trip.date) > now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null;
      },
    }),
    {
      name: 'snowboard-trips-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);