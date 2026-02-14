// lib/useBookingStore.ts
import { create } from 'zustand';

// interface BookingStore {
//   booking: BookingData;
//   setFrom: (from: string) => void;
//   setTo: (to: string) => void;
//   setSelectedBus: (bus: Bus | null) => void;
//   toggleSeat: (seatNumber: number) => void;
//   resetBooking: () => void;
// }

export const useBookingStore = create((set) => ({
    booking: {
        from: '',
        to: '',
        selectedBus: null,
        selectedSeats: [],
    },

    setFrom: (from) =>
        set((state) => ({
            booking: { ...state.booking, from },
        })),

    setTo: (to) =>
        set((state) => ({
            booking: { ...state.booking, to },
        })),

    setSelectedBus: (selectedBus) =>
        set((state) => ({
            booking: { ...state.booking, selectedBus, selectedSeats: [] }, // reset seats when bus changes
        })),

    toggleSeat: (seatNumber) =>
        set((state) => {
            const seats = state.booking.selectedSeats;
            const newSeats = seats.includes(seatNumber)
                ? seats.filter((s) => s !== seatNumber)
                : [...seats, seatNumber];

            return {
                booking: { ...state.booking, selectedSeats: newSeats },
            };
        }),

    resetBooking: () =>
        set({
            booking: {
                from: '',
                to: '',
                selectedBus: null,
                selectedSeats: [],
            },
        }),
}));