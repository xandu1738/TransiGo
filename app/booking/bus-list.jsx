import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Users, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { buses } from '../../lib/mock-data';

export default function BusList() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [selectedType, setSelectedType] = useState('All');
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const busTypes = ['All', 'AC Luxury', 'AC Standard', 'Non-AC Standard'];
    const allAmenities = useMemo(() => {
        const set = new Set();
        buses.forEach(bus => bus.amenities.forEach(a => set.add(a)));
        return Array.from(set);
    }, []);

    const filteredBuses = useMemo(() => {
        return buses.filter(bus => {
            const typeMatch = selectedType === 'All' || bus.type === selectedType;
            const amenityMatch = selectedAmenities.length === 0 ||
                selectedAmenities.every(a => bus.amenities.includes(a));
            return typeMatch && amenityMatch;
        });
    }, [selectedType, selectedAmenities]);

    const toggleAmenity = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    return (
        <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 pt-14">
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color={isDark ? '#f8fafc' : '#1f2937'} />
                </TouchableOpacity>
                <View>
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white">Available Buses</Text>
                    <Text className="text-muted dark:text-slate-400 mt-1">Kampala → Gulu</Text>
                </View>
                <View className="w-7" />
            </View>

            {/* Bus Type Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                <View className="flex-row gap-3">
                    {busTypes.map((type) => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => setSelectedType(type)}
                            className={`px-5 py-2.5 rounded-full border ${selectedType === type
                                    ? 'bg-primary border-primary'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            <Text className={`${selectedType === type ? 'text-white' : 'text-slate-700 dark:text-slate-300'} font-medium`}>
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Amenity Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                <View className="flex-row gap-3">
                    {allAmenities.map((amenity) => {
                        const isActive = selectedAmenities.includes(amenity);
                        return (
                            <TouchableOpacity
                                key={amenity}
                                onPress={() => toggleAmenity(amenity)}
                                className={`px-4 py-2 rounded-xl flex-row items-center border ${isActive
                                        ? 'bg-indigo-500 border-indigo-500'
                                        : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30'
                                    }`}
                            >
                                {isActive && <Check size={14} color="white" className="mr-1.5" />}
                                <Text className={`${isActive ? 'text-white' : 'text-indigo-700 dark:text-indigo-400'} text-xs font-bold`}>
                                    {amenity}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View className="mb-8">
                {filteredBuses.length > 0 ? (
                    filteredBuses.map(bus => (
                        <TouchableOpacity
                            key={bus.id}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-5 mb-5 shadow-sm active:opacity-90 border border-slate-50 dark:border-slate-800"
                            onPress={() => router.push('/booking/bus-details')}
                        >
                            <View className="flex-row justify-between items-start mb-4">
                                <View>
                                    <Text className="text-xl font-bold text-slate-900 dark:text-white">{bus.name}</Text>
                                    <Text className={`text-sm font-medium px-3 py-1 rounded-full mt-1 self-start ${bus.type.includes('Luxury') ? 'bg-amber-500 text-white' :
                                        bus.type.includes('AC') ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                        }`}>
                                        {bus.type}
                                    </Text>
                                </View>
                                <View className="items-end">
                                    <Text className="text-2xl font-extrabold text-primary">UGX {bus.fare.toLocaleString()}</Text>
                                    <Text className="text-sm text-muted dark:text-slate-500">per seat</Text>
                                </View>
                            </View>

                            <View className="flex-row justify-between items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-4">
                                <View className="items-center">
                                    <Text className="text-lg font-bold text-slate-900 dark:text-white">{bus.departure}</Text>
                                    <Text className="text-xs text-muted dark:text-slate-500">Dep</Text>
                                </View>
                                <Text className="text-base font-medium text-slate-600 dark:text-slate-400">{bus.duration}</Text>
                                <View className="items-center">
                                    <Text className="text-lg font-bold text-slate-900 dark:text-white">{bus.arrival}</Text>
                                    <Text className="text-xs text-muted dark:text-slate-500">Arr</Text>
                                </View>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <View className="flex-row items-center">
                                    <Users size={18} color={bus.availableSeats < 10 ? '#ef4444' : '#10b981'} />
                                    <Text className={`ml-2 font-medium ${bus.availableSeats < 10 ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {bus.availableSeats} seats left
                                    </Text>
                                </View>
                                <View className="flex-row gap-2">
                                    {bus.amenities.map((a, i) => (
                                        <View key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                            <Text className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">{a}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View className="items-center justify-center py-20">
                        <Text className="text-slate-400 dark:text-slate-500 text-lg">No buses matching your filters</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedType('All');
                                setSelectedAmenities([]);
                            }}
                            className="mt-4"
                        >
                            <Text className="text-primary font-bold">Clear All Filters</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}