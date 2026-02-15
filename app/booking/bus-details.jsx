import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function BusDetails() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Mock seats – 45 seats, some booked
    const seats = Array.from({ length: 45 }, (_, i) => ({
        number: i + 1,
        booked: [3, 7, 12, 18, 22, 29, 34, 41].includes(i + 1),
    }));

    const toggleSeat = (num) => {
        setSelectedSeats(prev =>
            prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
        );
    };

    const total = selectedSeats.length * 85000;

    return (
        <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 pt-14 pb-32">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color={isDark ? '#f8fafc' : '#1f2937'} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-slate-900 dark:text-white">Select Seats</Text>
                <View className="w-7" />
            </View>

            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm mb-6 border border-slate-50 dark:border-slate-800">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-slate-900 dark:text-white">Link Express</Text>
                    <Text className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">AC Luxury</Text>
                </View>
                <Text className="text-slate-600 dark:text-slate-400">07:00 AM → 01:30 PM</Text>
            </View>

            <View className="flex-row justify-around bg-white dark:bg-slate-900 rounded-2xl p-5 mb-6 shadow-sm border border-slate-50 dark:border-slate-800">
                <View className="items-center">
                    <View className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                    <Text className="text-xs text-muted dark:text-slate-500">Available</Text>
                </View>
                <View className="items-center">
                    <View className="w-6 h-6 bg-primary rounded mb-1" />
                    <Text className="text-xs text-muted dark:text-slate-500">Selected</Text>
                </View>
                <View className="items-center">
                    <View className="w-6 h-6 bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded mb-1" />
                    <Text className="text-xs text-muted dark:text-slate-500">Booked</Text>
                </View>
            </View>

            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm mb-6 border border-slate-50 dark:border-slate-800">
                <View className="flex-row flex-wrap gap-3 justify-center">
                    {seats.map(seat => {
                        const isSelected = selectedSeats.includes(seat.number);
                        return (
                            <TouchableOpacity
                                key={seat.number}
                                className={`w-12 h-12 rounded-xl items-center justify-center border-2 ${seat.booked
                                    ? 'bg-slate-100 dark:bg-slate-800 border-dashed border-slate-300 dark:border-slate-700 opacity-50'
                                    : isSelected
                                        ? 'bg-primary border-primary'
                                        : 'bg-slate-5 border-slate-200 dark:border-slate-700 active:bg-indigo-100 dark:active:bg-indigo-900/30'
                                    }`}
                                disabled={seat.booked}
                                onPress={() => !seat.booked && toggleSeat(seat.number)}
                            >
                                <Text
                                    className={`font-medium ${isSelected ? 'text-white' : seat.booked ? 'text-slate-400 dark:text-slate-600' : 'text-slate-700 dark:text-slate-300'
                                        }`}
                                >
                                    {seat.number}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {selectedSeats.length > 0 && (
                <View className="absolute bottom-6 left-6 right-6 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border-t border-slate-100 dark:border-slate-800">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-slate-700 dark:text-slate-400">Selected seats:</Text>
                        <Text className="font-medium text-slate-900 dark:text-white">{selectedSeats.join(', ')}</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">Total:</Text>
                        <Text className="text-2xl font-extrabold text-primary">
                            UGX {total.toLocaleString()}
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="bg-primary rounded-2xl py-5 mt-5 items-center"
                        onPress={() => router.push('/booking/booking-confirm')}
                    >
                        <Text className="text-white font-bold text-lg">Continue to Payment</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}