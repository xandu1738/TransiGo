import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Bus, Package, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-slate-50 px-6 pt-16">
            <View className="items-center mb-12">
                <View className="w-20 h-20 bg-primary rounded-3xl items-center justify-center shadow-xl">
                    <Bus size={32} color="white" strokeWidth={2.5} />
                </View>
                <Text className="text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">
                    RouteWise
                </Text>
                <Text className="text-muted text-base mt-2">Bus • Parcel • Uganda</Text>
            </View>

            <TouchableOpacity
                className="bg-white rounded-3xl p-6 flex-row items-center mb-5 shadow-sm active:opacity-90"
                onPress={() => router.push('/booking/location-select')} // or keep state if you prefer
            >
                <View className="w-16 h-16 bg-primary rounded-2xl items-center justify-center mr-4">
                    <Bus size={32} color="white" />
                </View>
                <View className="flex-1">
                    <Text className="text-xl font-bold text-slate-900">Book Bus</Text>
                    <Text className="text-muted mt-1">Find intercity buses</Text>
                </View>
                <ChevronRight size={24} color="#cbd5e1" />
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-white rounded-3xl p-6 flex-row items-center shadow-sm active:opacity-90"
                onPress={() => router.push('/tracking-input')}
            >
                <View className="w-16 h-16 bg-success rounded-2xl items-center justify-center mr-4">
                    <Package size={32} color="white" />
                </View>
                <View className="flex-1">
                    <Text className="text-xl font-bold text-slate-900">Track Parcel</Text>
                    <Text className="text-muted mt-1">Monitor your shipment</Text>
                </View>
                <ChevronRight size={24} color="#cbd5e1" />
            </TouchableOpacity>
        </ScrollView>
    );
}