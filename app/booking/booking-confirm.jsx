import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckCircle, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function BookingConfirm() {
    const router = useRouter();

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
        <ScrollView className="flex-1 bg-slate-50 px-6 pt-14">
            <View className="items-center mt-12 mb-10">
                <CheckCircle size={80} color="#10b981" />
                <Text className="text-3xl font-extrabold text-slate-900 mt-6">Booking Confirmed!</Text>
                <Text className="text-muted text-lg mt-2">Your seats have been reserved</Text>
            </View>

            <View className="bg-white rounded-3xl p-6 shadow-md mb-8">
                <View className="flex-row justify-between py-4 border-b border-slate-100">
                    <Text className="text-slate-600">Booking ID</Text>
                    <Text className="font-bold text-slate-900">{booking.id}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100">
                    <Text className="text-slate-600">Bus</Text>
                    <Text className="font-medium text-slate-900">{booking.bus}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100">
                    <Text className="text-slate-600">Route</Text>
                    <Text className="font-medium text-slate-900">{booking.route}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100">
                    <Text className="text-slate-600">Date</Text>
                    <Text className="font-medium text-slate-900">{booking.date}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100">
                    <Text className="text-slate-600">Departure</Text>
                    <Text className="font-medium text-slate-900">{booking.departure}</Text>
                </View>
                <View className="flex-row justify-between py-4 border-b border-slate-100">
                    <Text className="text-slate-600">Seats</Text>
                    <Text className="font-medium text-slate-900">{booking.seats}</Text>
                </View>
                <View className="flex-row justify-between pt-5">
                    <Text className="text-lg font-bold text-slate-900">Total Paid</Text>
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

            <TouchableOpacity className="border-2 border-primary rounded-2xl py-5 items-center">
                <Text className="text-primary font-bold text-lg">Download Ticket</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}