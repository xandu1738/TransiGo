import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckCircle, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function BookingConfirm() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Mock data
    const booking = {
        id: '#BK' + Math.floor(100000 + Math.random() * 900000),
        bus: 'Link Express',
        route: 'Kampala → Gulu',
        date: 'Feb 15, 2026',
        departure: '07:00 AM',
        seats: '12, 13, 14, 15',
        total: 340000,
    };

    return (
        <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 pt-14">
            <View className="items-center mt-12 mb-10">
                <CheckCircle size={80} color="#10b981" />
                <Text className="text-3xl font-extrabold text-slate-900 dark:text-white mt-6 text-center">Booking Confirmed!</Text>
                <Text className="text-muted dark:text-slate-400 text-lg mt-2">Your seats have been reserved</Text>
            </View>

            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md mb-8 border border-slate-50 dark:border-slate-800">
                <View className="flex-row justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                    <Text className="text-slate-600 dark:text-slate-400">Booking ID</Text>
                    <Text className="font-bold text-slate-900 dark:text-white">{booking.id}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                    <Text className="text-slate-600 dark:text-slate-400">Bus</Text>
                    <Text className="font-medium text-slate-900 dark:text-white">{booking.bus}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                    <Text className="text-slate-600 dark:text-slate-400">Route</Text>
                    <Text className="font-medium text-slate-900 dark:text-white">{booking.route}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                    <Text className="text-slate-600 dark:text-slate-400">Date</Text>
                    <Text className="font-medium text-slate-900 dark:text-white">{booking.date}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                    <Text className="text-slate-600 dark:text-slate-400">Departure</Text>
                    <Text className="font-medium text-slate-900 dark:text-white">{booking.departure}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                    <Text className="text-slate-600 dark:text-slate-400">Seats</Text>
                    <Text className="font-medium text-slate-900 dark:text-white">{booking.seats}</Text>
                </View>
                <View className="flex-row justify-between pt-5">
                    <Text className="text-lg font-bold text-slate-900 dark:text-white">Total Paid</Text>
                    <Text className="text-2xl font-extrabold text-primary">
                        UGX {booking.total.toLocaleString()}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                className="bg-primary rounded-2xl py-5 items-center mb-4"
                onPress={() => router.push('/')}
            >
                <Text className="text-white font-bold text-lg">Back to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border-2 border-primary rounded-2xl py-5 items-center mb-10">
                <Text className="text-primary font-bold text-lg">Download Ticket</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}