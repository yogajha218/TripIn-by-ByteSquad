import { create } from "zustand"

interface BookingFormState {
  origin: string | null;
  destination: string | null;
  date: string | null;
  passenger: number | null;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: string) => void;
  setPassenger: (passenger: number) => void;
  resetBooking: () => void;
}

const useBookingStore = create<BookingFormState>((set) => ({
  origin: null,
  destination: null,
  date: null,
  passenger: null,
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDate: (date) => set({ date }),
  setPassenger: (passenger) => set({ passenger }),
  resetBooking: () => set({ origin: null, destination: null, date: null, passenger: null }),
}));

export default useBookingStore;