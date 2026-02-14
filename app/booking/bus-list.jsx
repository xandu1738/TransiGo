import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const mockBuses = [
    {
        id: 1,
        name: "Link Express",
        type: "AC Luxury",
        departure: "07:00 AM",
        arrival: "01:30 PM",
        duration: "6h 30m",
        availableSeats: 14,
        fare: 85000,
        amenities: ["WiFi", "Charging", "Toilet"],
    },
    {
        id: 2,
        name: "Modern Coast VIP",
        type: "AC Standard",
        departure: "09:30 AM",
        arrival: "04:00 PM",
        duration: "6h 30m",
        availableSeats: 9,
        fare: 65000,
        amenities: ["Charging", "Snacks"],
    },
    {
        id: 3,
        name: "YY Coaches",
        type: "Non-AC Standard",
        departure: "11:00 AM",
        arrival: "06:30 PM",
        duration: "7h 30m",
        availableSeats: 24,
        fare: 45000,
        amenities: ["Water"],
    },
];

export default function BusList() {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-slate-50 px-6 pt-14">
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color="#1f2937" />
                </TouchableOpacity>
                <View>
                    <Text className="text-2xl font-bold text-slate-900">Available Buses</Text>
                    <Text className="text-muted mt-1">Kampala → Gulu</Text>
                </View>
                <View className="w-7" />
            </View>

            <View className="flex-row gap-3 mb-6 overflow-x-auto">
                {['All', 'AC Luxury', 'AC Standard', 'Non-AC'].map((filter, i) => (
                    <TouchableOpacity
                        key={i}
                        className={`px-5 py-2.5 rounded-full border ${i === 0 ? 'bg-primary border-primary' : 'border-slate-300'}`}
                    >
                        <Text className={`${i === 0 ? 'text-white' : 'text-slate-700'} font-medium`}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {mockBuses.map(bus => (
                <TouchableOpacity
                    key={bus.id}
                    className="bg-white rounded-3xl p-5 mb-5 shadow-sm active:opacity-90"
                    onPress={() => router.push('/booking/bus-details')}
                >
                    <View className="flex-row justify-between items-start mb-4">
                        <View>
                            <Text className="text-xl font-bold text-slate-900">{bus.name}</Text>
                            <Text className={`text-sm font-medium px-3 py-1 rounded-full mt-1 ${bus.type.includes('Luxury') ? 'bg-amber-500 text-white' :
                                bus.type.includes('AC') ? 'bg-primary text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                {bus.type}
                            </Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-2xl font-extrabold text-primary">UGX {bus.fare.toLocaleString()}</Text>
                            <Text className="text-sm text-muted">per seat</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center bg-slate-50 rounded-2xl p-4 mb-4">
                        <View className="items-center">
                            <Text className="text-lg font-bold text-slate-900">{bus.departure}</Text>
                            <Text className="text-xs text-muted">Dep</Text>
                        </View>
                        <Text className="text-base font-medium text-slate-600">{bus.duration}</Text>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-slate-900">{bus.arrival}</Text>
                            <Text className="text-xs text-muted">Arr</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <Users size={18} color={bus.availableSeats < 10 ? '#ef4444' : '#10b981'} />
                            <Text className={`ml-2 font-medium ${bus.availableSeats < 10 ? 'text-red-500' : 'text-success'}`}>
                                {bus.availableSeats} seats left
                            </Text>
                        </View>
                        <View className="flex-row gap-2">
                            {bus.amenities.map((a, i) => (
                                <View key={i} className="bg-indigo-50 px-3 py-1 rounded-full">
                                    <Text className="text-xs text-indigo-700 font-medium">{a}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}