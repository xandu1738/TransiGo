import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { ArrowLeft, Package, Calendar, Navigation, CheckCircle, Circle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const trackingSteps = [
    { status: "Order Received", location: "Kampala Central Hub", time: "Feb 12, 2026 - 09:45 AM", completed: true },
    { status: "In Transit", location: "Jinja Sorting Facility", time: "Feb 13, 2026 - 07:20 AM", completed: true },
    { status: "Out for Delivery", location: "Gulu Local Depot", time: "Feb 14, 2026 - 05:30 AM", completed: true },
    { status: "Delivered", location: "Recipient Address - Gulu", time: "Expected by 6:00 PM today", completed: false },
];

export default function TrackingResults() {
    const router = useRouter();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.12,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => {
            animation.stop();
            pulseAnim.setValue(1); // Reset the value when component unmounts
        };
    }, [pulseAnim]);

    const currentStepIndex = trackingSteps.findIndex(s => !s.completed);

    return (
        <ScrollView className="flex-1 bg-slate-50 px-6 pt-14">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={28} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-slate-900">Parcel Status</Text>
                <View className="w-7" />
            </View>

            {/* Summary Card */}
            <View className="bg-white rounded-3xl p-6 shadow-md mb-6">
                <View className="flex-row items-center mb-5">
                    <View className="w-14 h-14 bg-primary rounded-2xl items-center justify-center mr-4">
                        <Package size={28} color="white" />
                    </View>
                    <View>
                        <Text className="text-lg font-bold text-slate-900">PKG-UG-240214-001</Text>
                        <Text className="text-primary font-medium">Out for Delivery</Text>
                    </View>
                </View>

                <View className="flex-row items-center bg-emerald-50/70 p-4 rounded-2xl">
                    <Calendar size={20} color="#10b981" />
                    <View className="ml-3">
                        <Text className="text-emerald-700 text-sm">Expected Delivery</Text>
                        <Text className="text-emerald-800 font-semibold">Today by 6:00 PM</Text>
                    </View>
                </View>
            </View>

            {/* Timeline */}
            <View className="bg-white rounded-3xl p-6 shadow-md">
                <Text className="text-xl font-bold text-slate-900 mb-6">Shipment Journey</Text>

                {trackingSteps.map((step, idx) => {
                    const isCompleted = step.completed;
                    const isCurrent = idx === currentStepIndex;
                    const isLast = idx === trackingSteps.length - 1;

                    return (
                        <View key={idx} className={`relative ${!isLast ? 'pb-12' : 'pb-0'}`}>
                            {!isLast && (
                                <View className={`absolute left-[27px] top-14 w-[3px] h-[calc(100%-56px)] ${isCompleted ? 'bg-primary' : 'bg-slate-200'}`} />
                            )}

                            <View className="flex-row items-start">
                                <Animated.View
                                    className={`w-14 h-14 rounded-full items-center justify-center shadow-lg mr-5 z-10 ${isCompleted
                                        ? 'bg-success'
                                        : isCurrent
                                            ? 'bg-blue-500'
                                            : 'bg-slate-100 border-2 border-slate-300'
                                        }`}
                                    style={isCurrent ? { transform: [{ scale: pulseAnim }] } : {}}
                                >
                                    {isCompleted ? (
                                        <CheckCircle size={28} color="white" />
                                    ) : (
                                        <Circle size={28} color="#94a3b8" />
                                    )}
                                </Animated.View>

                                <View className="flex-1 pt-2">
                                    <Text
                                        className={`font-semibold text-[17px] ${isCompleted ? 'text-success' : isCurrent ? 'text-blue-600' : 'text-slate-900'
                                            }`}
                                    >
                                        {step.status}
                                        {isCurrent && <Text className="text-blue-600 text-sm font-normal"> (Now)</Text>}
                                    </Text>
                                    <Text className="text-slate-600 mt-1">{step.location}</Text>
                                    <Text className="text-slate-400 text-sm mt-0.5">{step.time}</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>

            <View className="bg-white rounded-3xl h-44 mt-6 mb-8 items-center justify-center border-2 border-dashed border-slate-200">
                <Navigation size={40} color="#cbd5e1" />
                <Text className="text-slate-400 mt-3">Live location tracking (demo)</Text>
            </View>

            <TouchableOpacity
                className="bg-white border-2 border-primary rounded-2xl py-5 items-center mb-10"
                onPress={() => router.push('/tracking-input')}
            >
                <Text className="text-primary font-bold text-lg">Track Another Parcel</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}