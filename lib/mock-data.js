// lib/mock-data.ts
export const buses = [
    {
        id: 1,
        name: "Link Express",
        type: "AC Luxury",
        departure: "07:00 AM",
        arrival: "01:30 PM",
        duration: "6h 30m",
        availableSeats: 14,
        totalSeats: 45,
        fare: 85000,
        amenities: ["WiFi", "Charging", "Water", "Toilet"],
        bookedSeats: [3, 7, 12, 18, 22, 29, 34, 41],
    },
    {
        id: 2,
        name: "Modern Coast VIP",
        type: "AC Standard",
        departure: "09:30 AM",
        arrival: "04:00 PM",
        duration: "6h 30m",
        availableSeats: 9,
        totalSeats: 49,
        fare: 65000,
        amenities: ["Charging", "Snacks", "Entertainment"],
        bookedSeats: [5, 11, 15, 21, 27, 33, 39, 45],
    },
    {
        id: 3,
        name: "YY Coaches",
        type: "Non-AC Standard",
        departure: "11:00 AM",
        arrival: "06:30 PM",
        duration: "7h 30m",
        availableSeats: 24,
        totalSeats: 52,
        fare: 45000,
        amenities: ["Water"],
        bookedSeats: [2, 8, 14, 20, 26, 32, 38, 44, 50],
    },
];

export const trackingSteps = [
    {
        status: "Order Received",
        location: "Kampala Central Hub (Old Taxi Park)",
        time: "Feb 12, 2026 - 09:45 AM",
        completed: true,
    },
    {
        status: "In Transit",
        location: "Jinja Sorting Facility",
        time: "Feb 13, 2026 - 07:20 AM",
        completed: true,
    },
    {
        status: "Out for Delivery",
        location: "Gulu Local Depot",
        time: "Feb 14, 2026 - 05:30 AM",
        completed: true,
    },
    {
        status: "Delivered",
        location: "Recipient Address - Gulu",
        time: "Expected by 6:00 PM today",
        completed: false,
    },
];