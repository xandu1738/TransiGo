import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { ArrowLeft, Package, Calendar, Navigation, CheckCircle, Circle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

const trackingSteps = [
    { status: "Order Received", location: "Kampala Central Hub", time: "Feb 12, 2026 - 09:45 AM", completed: true },
    { status: "In Transit", location: "Jinja Sorting Facility", time: "Feb 13, 2026 - 07:20 AM", completed: true },
    { status: "Out for Delivery", location: "Gulu Final Station", time: "Feb 14, 2026 - 11:30 AM", current: true },
    { status: "Delivered", location: "-", time: "-" }
];

export default function TrackingResults() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    return (
        <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 pt-14">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color={isDark ? '#f8fafc' : '#1f2937'} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-slate-900 dark:text-white">Status Details</Text>
                <View className="w-7" />
            </View>

            <View className="bg-indigo-600 rounded-3xl p-6 shadow-xl mb-8">
                <View className="flex-row items-center mb-4">
                    <Package size={24} color="white" />
                    <Text className="text-white/80 font-medium ml-2">PARCEL ID</Text>
                </View>
                <Text className="text-white text-2xl font-bold mb-6">PKG-UG-240214-001</Text>

                <View className="flex-row justify-between border-t border-white/20 pt-6">
                    <View>
                        <View className="flex-row items-center mb-1">
                            <Calendar size={14} color="rgba(255,255,255,0.6)" />
                            <Text className="text-white/60 text-xs ml-1 uppercase">Shipped on</Text>
                        </View>
                        <Text className="text-white font-bold">Feb 12, 2026</Text>
                    </View>
                    <View className="items-end">
                        <View className="flex-row items-center mb-1">
                            <Navigation size={14} color="rgba(255,255,255,0.6)" />
                            <Text className="text-white/60 text-xs ml-1 uppercase">Destination</Text>
                        </View>
                        <Text className="text-white font-bold">Gulu City</Text>
                    </View>
                </View>
            </View>

            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm mb-10 border border-slate-50 dark:border-slate-800">
                <Text className="text-lg font-bold text-slate-900 dark:text-white mb-6">Tracking Timeline</Text>

                {trackingSteps.map((step, index) => {
                    const isLast = index === trackingSteps.length - 1;
                    const isCompleted = step.completed;
                    const isCurrent = step.current;

                    return (
                        <View key={index} className="flex-row min-h-[80px]">
                            {/* Left Line & Indicator */}
                            <View className="items-center mr-4 w-10">
                                <Animated.View
                                    className={`w-10 h-10 rounded-full items-center justify-center z-10 ${isCompleted || isCurrent
                                        ? 'bg-blue-500'
                                        : 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700'
                                        }`}
                                    style={isCurrent ? { transform: [{ scale: pulseAnim }] } : {}}
                                >
                                    {isCompleted ? (
                                        <CheckCircle size={28} color="white" />
                                    ) : isCurrent ? (
                                        <Package size={22} color="white" />
                                    ) : (
                                        <Circle size={22} color={isDark ? '#334155' : '#cbd5e1'} />
                                    )}
                                </Animated.View>
                                {!isLast && (
                                    <View
                                        className={`w-0.5 flex-1 ${isCompleted ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`}
                                    />
                                )}
                            </View>

                            {/* Info */}
                            <View className="pb-8 flex-1">
                                <Text className={`text-lg font-bold ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                                    {step.status}
                                </Text>
                                <Text className="text-slate-500 dark:text-slate-400 font-medium mt-0.5">{step.location}</Text>
                                <Text className="text-slate-400 dark:text-slate-500 text-sm mt-1">{step.time}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            <TouchableOpacity
                className="bg-primary rounded-2xl py-5 items-center mb-10 shadow-lg shadow-indigo-200"
                onPress={() => router.push('/')}
            >
                <Text className="text-white font-bold text-lg">Main Dashboard</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}