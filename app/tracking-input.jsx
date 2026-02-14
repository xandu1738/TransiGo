import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Package, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TrackingInput() {
    const router = useRouter();
    const [parcelId, setParcelId] = useState('');
    const [trackingCode, setTrackingCode] = useState('');

    const canTrack = parcelId.trim().length > 0 && trackingCode.length === 6;

    return (
        <ScrollView className="flex-1 bg-slate-50 px-6 pt-14">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-slate-900">Track Parcel</Text>
                <View className="w-7" />
            </View>

            <View className="items-center py-10">
                <Package size={64} color="#4F46E5" />
                <Text className="text-muted text-center mt-4 text-base max-w-xs">
                    Enter your parcel details to see real-time status
                </Text>
            </View>

            <View className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                <Text className="text-slate-700 font-medium mb-2">Parcel ID</Text>
                <TextInput
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-base"
                    placeholder="e.g. PKG-UG-240214-001"
                    value={parcelId}
                    onChangeText={setParcelId}
                    autoCapitalize="characters"
                />

                <Text className="text-slate-700 font-medium mt-5 mb-2">Tracking Code (6 digits)</Text>
                <TextInput
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-base"
                    placeholder="e.g. 837492"
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

            <Text className="text-center text-muted mt-6 text-sm">
                Find your Parcel ID & code in the SMS/email from the bus company
            </Text>
        </ScrollView>
    );
}