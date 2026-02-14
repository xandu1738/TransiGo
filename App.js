import "./global.css";
import { View, Text } from 'react-native';
import { Home } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Home color="blue" size={48} />
      <Text className="text-lg font-bold text-gray-800 mt-4">
        Hello NativeWind + Lucide!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
