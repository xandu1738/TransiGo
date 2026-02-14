import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Circle, MapPin, Search, Clock, ChevronRight, Navigation } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function LocationSelect() {
    const router = useRouter();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const canSearch = from.trim().length > 2 && to.trim().length > 2;

    return (
        <ScrollView className="flex-1 bg-slate-50 px-6 pt-14">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-slate-900">Select Route</Text>
                <View className="w-7" />
            </View>

            <View className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                <View className="flex-row items-center bg-slate-50 rounded-xl px-4 py-4 mb-4">
                    <Circle size={20} color="#10b981" className="mr-3" />
                    <TextInput
                        className="flex-1 text-base text-slate-900"
                        placeholder="From (e.g. Kampala Old Taxi Park)"
                        value={from}
                        onChangeText={setFrom}
                    />
                    <Search size={20} color="#94a3b8" />
                </View>

                <View className="flex-row items-center bg-slate-50 rounded-xl px-4 py-4">
                    <MapPin size={20} color="#ef4444" className="mr-3" />
                    <TextInput
                        className="flex-1 text-base text-slate-900"
                        placeholder="To (e.g. Gulu, Jinja, Nairobi)"
                        value={to}
                        onChangeText={setTo}
                    />
                    <Search size={20} color="#94a3b8" />
                </View>
            </View>

            <View className="bg-white rounded-3xl h-48 items-center justify-center border-2 border-dashed border-slate-200 mb-6">
                <Navigation size={48} color="#cbd5e1" />
                <Text className="text-slate-400 mt-4">Interactive map view</Text>
            </View>

            <Text className="text-lg font-semibold text-slate-900 mb-4">Recent Routes</Text>

            {[
                { from: 'Kampala (Old Taxi Park)', to: 'Gulu' },
                { from: 'Kampala', to: 'Nairobi' },
            ].map((route, i) => (
                <TouchableOpacity
                    key={i}
                    className="bg-white rounded-2xl p-5 flex-row items-center justify-between mb-4 shadow-sm active:opacity-90"
                    onPress={() => {
                        // You could store from/to in global state or pass via params
                        router.push('/booking/bus-list');
                    }}
                >
                    <View className="flex-row items-center">
                        <Text className="text-slate-900 font-medium">{route.from}</Text>
                        <ChevronRight size={16} color="#cbd5e1" className="mx-2" />
                        <Text className="text-slate-900 font-medium">{route.to}</Text>
                    </View>
                    <Clock size={20} color="#94a3b8" />
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                className={`rounded-2xl py-5 items-center mt-4 ${canSearch ? 'bg-primary' : 'bg-primary/50'}`}
                disabled={!canSearch}
                onPress={() => router.push('/booking/bus-list')}
            >
                <Text className="text-white font-bold text-lg">Search Buses</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}