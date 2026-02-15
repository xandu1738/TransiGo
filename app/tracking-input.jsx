import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Package, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function TrackingInput() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [parcelId, setParcelId] = useState('');
    const [trackingCode, setTrackingCode] = useState('');

    const canTrack = parcelId.trim().length > 0 && trackingCode.length === 6;

    return (
        <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 pt-14">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color={isDark ? '#f8fafc' : '#1f2937'} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-slate-900 dark:text-white">Track Parcel</Text>
                <View className="w-7" />
            </View>

            <View className="items-center py-10">
                <Package size={64} color="#4F46E5" />
                <Text className="text-slate-500 dark:text-slate-400 text-center mt-4 text-base max-w-xs">
                    Enter your parcel details to see real-time status
                </Text>
            </View>

            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm mb-6 border border-slate-50 dark:border-slate-800">
                <Text className="text-slate-700 dark:text-slate-300 font-medium mb-2">Parcel ID</Text>
                <TextInput
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-base text-slate-900 dark:text-white"
                    placeholder="e.g. PKG-UG-240214-001"
                    placeholderTextColor={isDark ? '#64748b' : '#cbd5e1'}
                    value={parcelId}
                    onChangeText={setParcelId}
                    autoCapitalize="characters"
                />

                <Text className="text-slate-700 dark:text-slate-300 font-medium mt-5 mb-2">Tracking Code (6 digits)</Text>
                <TextInput
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-base text-slate-900 dark:text-white"
                    placeholder="e.g. 837492"
                    placeholderTextColor={isDark ? '#64748b' : '#cbd5e1'}
                    value={trackingCode}
                    onChangeText={(t) => setTrackingCode(t.replace(/[^0-9]/g, '').slice(0, 6))}
                    keyboardType="numeric"
                    maxLength={6}
                />
            </View>

            <TouchableOpacity
                className={`rounded-2xl py-5 items-center ${canTrack ? 'bg-primary' : 'bg-primary/50'}`}
                disabled={!canTrack}
                onPress={() => router.push('/tracking-results')}
            >
                <Text className="text-white font-bold text-lg">Track Parcel</Text>
            </TouchableOpacity>

            <Text className="text-center text-slate-400 dark:text-slate-500 mt-6 text-sm">
                Find your Parcel ID & code in the SMS/email from the bus company
            </Text>
        </ScrollView>
    );
}