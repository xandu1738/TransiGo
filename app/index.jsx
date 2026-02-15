import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Bus, Package, ChevronRight, Moon, Sun, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from "nativewind";

export default function Welcome() {
    const router = useRouter();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <ScrollView className="flex-1 bg-white dark:bg-slate-950 px-6 pt-16">
            {/* Header */}
            <View className="flex-row justify-between items-start mb-8">
                <View className="w-16 h-16 bg-indigo-600 rounded-3xl items-center justify-center shadow-lg shadow-indigo-300">
                    <Bus size={32} color="white" strokeWidth={2.5} />
                </View>
                <TouchableOpacity
                    onPress={toggleColorScheme}
                    className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full shadow-sm"
                >
                    {isDark ? (
                        <Sun size={24} color="#fbbf24" strokeWidth={2.5} />
                    ) : (
                        <Moon size={24} color="#4f46e5" strokeWidth={2.5} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Title Section */}
            <View className="mb-10">
                <Text className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    TransiGo
                </Text>
                <View className="flex-row items-center mt-2">
                    <MapPin size={16} color="#64748b" />
                    <Text className="text-slate-500 dark:text-slate-400 text-base ml-1">
                        Bus • Parcel • Uganda
                    </Text>
                </View>
            </View>

            {/* Stats Cards */}
            <View className="flex-row justify-between mb-12">
                <View className="bg-white dark:bg-slate-900 w-[47%] p-6 rounded-[32px] border border-slate-50 dark:border-slate-800 shadow-sm shadow-slate-200">
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white">24/7</Text>
                    <Text className="text-slate-400 dark:text-slate-500 text-sm mt-1">Available</Text>
                </View>
                <View className="bg-white dark:bg-slate-900 w-[47%] p-6 rounded-[32px] border border-slate-50 dark:border-slate-800 shadow-sm shadow-slate-200">
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white">1000+</Text>
                    <Text className="text-slate-400 dark:text-slate-500 text-sm mt-1">Happy Users</Text>
                </View>
            </View>

            {/* Services Section */}
            <View>
                <Text className="text-xl font-bold text-slate-900 dark:text-white mb-6">Our Services</Text>

                <TouchableOpacity
                    className="bg-white dark:bg-slate-900 rounded-[32px] p-6 flex-row items-center mb-5 border border-slate-50 dark:border-slate-800 shadow-sm shadow-slate-200 active:opacity-90"
                    onPress={() => router.push('/booking/location-select')}
                >
                    <View className="w-14 h-14 bg-indigo-600 rounded-2xl items-center justify-center mr-4 shadow-md shadow-indigo-200">
                        <Bus size={26} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">Book Bus</Text>
                        <Text className="text-slate-400 dark:text-slate-500 text-sm">Find intercity buses</Text>
                        <View className="bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 mt-2 self-start">
                            <Text className="text-[10px] font-bold text-slate-600 dark:text-slate-400">50+ ROUTES</Text>
                        </View>
                    </View>
                    <ChevronRight size={20} color="#cbd5e1" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-white dark:bg-slate-900 rounded-[32px] p-6 flex-row items-center mb-10 border border-slate-50 dark:border-slate-800 shadow-sm shadow-slate-200 active:opacity-90"
                    onPress={() => router.push('/tracking-input')}
                >
                    <View className="w-14 h-14 bg-emerald-500 rounded-2xl items-center justify-center mr-4 shadow-md shadow-emerald-200">
                        <Package size={26} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">Track Parcel</Text>
                        <Text className="text-slate-400 dark:text-slate-500 text-sm">Monitor your shipment</Text>
                        <View className="bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 mt-2 self-start">
                            <Text className="text-[10px] font-bold text-slate-600 dark:text-slate-400">REAL-TIME TRACKING</Text>
                        </View>
                    </View>
                    <ChevronRight size={20} color="#cbd5e1" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}