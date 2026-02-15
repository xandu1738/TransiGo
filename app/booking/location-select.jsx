import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, Modal } from 'react-native';
import { ArrowLeft, Circle, MapPin, Search, Clock, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { districts } from '../../lib/mock-data';

// Helper for mock distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Mock coordinates for major districts
const districtCoords = {
    "Kampala": { latitude: 0.3476, longitude: 32.5825 },
    "Jinja": { latitude: 0.4479, longitude: 33.2032 },
    "Gulu": { latitude: 2.7747, longitude: 32.2990 },
    "Mbarara": { latitude: -0.6074, longitude: 30.6545 },
    "Entebbe": { latitude: 0.0512, longitude: 32.4637 },
    "Arua": { latitude: 3.0303, longitude: 30.9110 },
    "Mbale": { latitude: 1.0744, longitude: 34.1798 },
    "Fort Portal": { latitude: 0.6548, longitude: 30.2736 },
    "Kabale": { latitude: -1.2504, longitude: 29.9877 },
    "Lira": { latitude: 2.2472, longitude: 32.8998 },
    "Masaka": { latitude: -0.3340, longitude: 31.7330 },
    "Soroti": { latitude: 1.7146, longitude: 33.6111 },
    "Tororo": { latitude: 0.6925, longitude: 34.1811 },
    "Mukono": { latitude: 0.3547, longitude: 32.7553 },
    "Wakiso": { latitude: 0.4042, longitude: 32.4607 },
    "Iganga": { latitude: 0.6094, longitude: 33.4681 },
    "Hoima": { latitude: 1.4331, longitude: 31.3524 },
    "Busia": { latitude: 0.4678, longitude: 34.0894 },
    "Kasese": { latitude: 0.1833, longitude: 30.0833 },
    "Nairobi (Kenya)": { latitude: -1.286389, longitude: 36.817223 },
    "Kigali (Rwanda)": { latitude: -1.944070, longitude: 30.061885 },
    "Juba (South Sudan)": { latitude: 4.8517, longitude: 31.5822 },
};

const darkMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
    { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },
    { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },
    { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }
];

export default function LocationSelect() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const mapRef = useRef(null);

    const filteredFrom = districts.filter(d => d.toLowerCase().includes(from.toLowerCase()) && from.length > 0);
    const filteredTo = districts.filter(d => d.toLowerCase().includes(to.toLowerCase()) && to.length > 0);

    const fromCoord = districtCoords[from] || (from.includes(',') ? { latitude: parseFloat(from.split(',')[0]), longitude: parseFloat(from.split(',')[1]) } : null);
    const toCoord = districtCoords[to] || (to.includes(',') ? { latitude: parseFloat(to.split(',')[0]), longitude: parseFloat(to.split(',')[1]) } : null);

    useEffect(() => {
        if (mapRef.current && fromCoord && toCoord) {
            mapRef.current.fitToCoordinates([fromCoord, toCoord], {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
            });
        }
    }, [fromCoord, toCoord]);

    const distance = useMemo(() => {
        if (fromCoord && toCoord) {
            return calculateDistance(fromCoord.latitude, fromCoord.longitude, toCoord.latitude, toCoord.longitude);
        }
        return 0;
    }, [fromCoord, toCoord]);

    const handleMapPress = (e) => {
        const coord = e.nativeEvent.coordinate;
        const coordStr = `${coord.latitude.toFixed(4)}, ${coord.longitude.toFixed(4)}`;

        if (!from || (from && to)) {
            setFrom(coordStr);
            setTo('');
        } else {
            setTo(coordStr);
        }
    };

    const initialRegion = useMemo(() => ({
        latitude: 0.3476,
        longitude: 32.5825,
        latitudeDelta: 4.0,
        longitudeDelta: 4.0,
    }), []);

    const canSearch = from.trim().length > 2 && to.trim().length > 2;

    const DistrictDropdown = ({ data, onSelect, visible }) => {
        if (!visible || data.length === 0) return null;
        return (
            <View className="absolute top-[4.5rem] left-6 right-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl z-50 border border-slate-100 dark:border-slate-800 max-h-48 overflow-hidden">
                <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="always">
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`p-4 border-b border-slate-50 dark:border-slate-800 active:bg-slate-50 dark:active:bg-slate-800`}
                            onPress={() => onSelect(item)}
                        >
                            <View className="flex-row items-center">
                                <MapPin size={16} color={isDark ? '#64748b' : '#94a3b8'} className="mr-3" />
                                <Text className="text-slate-900 dark:text-white font-medium">{item}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    const MapContent = ({ expanded = false }) => (
        <View className="flex-1 relative">
            <MapView
                ref={mapRef}
                provider={PROVIDER_DEFAULT}
                style={StyleSheet.absoluteFillObject}
                initialRegion={initialRegion}
                customMapStyle={isDark ? darkMapStyle : []}
                onPress={handleMapPress}
            >
                {fromCoord && (
                    <Marker
                        coordinate={fromCoord}
                        title={from}
                        description="Departure point"
                    >
                        <View className="bg-emerald-500 p-2 rounded-full border-2 border-white">
                            <Circle size={12} color="white" />
                        </View>
                    </Marker>
                )}
                {toCoord && (
                    <Marker
                        coordinate={toCoord}
                        title={to}
                        description="Arrival point"
                    >
                        <View className="bg-red-500 p-2 rounded-full border-2 border-white">
                            <MapPin size={12} color="white" />
                        </View>
                    </Marker>
                )}
                {fromCoord && toCoord && (
                    <Polyline
                        coordinates={[fromCoord, toCoord]}
                        strokeColor={isDark ? '#38bdf8' : '#0369a1'}
                        strokeWidth={4}
                        lineDashPattern={[1]}
                    />
                )}
            </MapView>

            {distance > 0 && (
                <View className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
                    <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Route Info</Text>
                    <View className="flex-row items-center">
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">{distance.toFixed(0)} km</Text>
                        <View className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-2" />
                        <Text className="text-slate-600 dark:text-slate-400 font-medium">~{(distance / 60).toFixed(1)} hrs</Text>
                    </View>
                </View>
            )}

            <TouchableOpacity
                className={`absolute ${expanded ? 'top-14 right-6' : 'bottom-4 right-4'} bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800`}
                onPress={() => setIsExpanded(!expanded)}
            >
                {expanded ? (
                    <Text className="text-slate-900 dark:text-white font-bold px-2">Close Map</Text>
                ) : (
                    <View className="flex-row items-center">
                        <Search size={18} color={isDark ? '#f8fafc' : '#1f2937'} />
                        <Text className="text-slate-900 dark:text-white font-bold ml-2">Expand</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 bg-slate-50 dark:bg-slate-950">
            {/* Full Screen Map Modal */}
            <Modal
                visible={isExpanded}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setIsExpanded(false)}
            >
                <View className="flex-1 bg-slate-950">
                    <MapContent expanded={true} />
                </View>
            </Modal>

            <ScrollView className="flex-1 px-6 pt-14" keyboardShouldPersistTaps="handled">
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={28} color={isDark ? '#f8fafc' : '#1f2937'} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white">Select Route</Text>
                    <View className="w-7" />
                </View>

                <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm mb-6 z-40">
                    <View className="relative">
                        <View className="flex-row items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-4 mb-4">
                            <Circle size={20} color="#10b981" className="mr-3" />
                            <TextInput
                                className="flex-1 text-base text-slate-900 dark:text-white"
                                placeholder="From (e.g. Kampala)"
                                placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                                value={from}
                                onChangeText={(text) => {
                                    setFrom(text);
                                    setShowFromDropdown(true);
                                }}
                                onFocus={() => setShowFromDropdown(true)}
                                onBlur={() => setTimeout(() => setShowFromDropdown(false), 300)}
                            />
                        </View>
                        <DistrictDropdown
                            data={filteredFrom}
                            visible={showFromDropdown}
                            onSelect={(val) => {
                                setFrom(val);
                                setShowFromDropdown(false);
                            }}
                        />
                    </View>

                    <View className="relative">
                        <View className="flex-row items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-4">
                            <MapPin size={20} color="#ef4444" className="mr-3" />
                            <TextInput
                                className="flex-1 text-base text-slate-900 dark:text-white"
                                placeholder="To (e.g. Gulu, Jinja)"
                                placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                                value={to}
                                onChangeText={(text) => {
                                    setTo(text);
                                    setShowToDropdown(true);
                                }}
                                onFocus={() => setShowToDropdown(true)}
                                onBlur={() => setTimeout(() => setShowToDropdown(false), 300)}
                            />
                        </View>
                        <DistrictDropdown
                            data={filteredTo}
                            visible={showToDropdown}
                            onSelect={(val) => {
                                setTo(val);
                                setShowToDropdown(false);
                            }}
                        />
                    </View>
                </View>

                <View className="rounded-3xl overflow-hidden h-64 mb-8 border border-slate-100 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
                    {Platform.OS === 'web' ? (
                        <View className="flex-1 items-center justify-center bg-slate-200 dark:bg-slate-800">
                            <MapPin size={48} color={isDark ? '#475569' : '#94a3b8'} />
                            <Text className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Map view not available on web</Text>
                        </View>
                    ) : (
                        <MapContent expanded={false} />
                    )}
                </View>

                <Text className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Routes</Text>

                {[
                    { from: 'Kampala', to: 'Gulu' },
                    { from: 'Kampala', to: 'Nairobi' },
                ].map((route, i) => (
                    <TouchableOpacity
                        key={i}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex-row items-center justify-between mb-4 shadow-sm active:opacity-90"
                        onPress={() => {
                            setFrom(route.from);
                            setTo(route.to);
                        }}
                    >
                        <View className="flex-row items-center">
                            <Text className="text-slate-900 dark:text-white font-medium">{route.from}</Text>
                            <ChevronRight size={16} color="#cbd5e1" className="mx-2" />
                            <Text className="text-slate-900 dark:text-white font-medium">{route.to}</Text>
                        </View>
                        <Clock size={20} color="#94a3b8" />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    className={`rounded-2xl py-5 items-center mt-4 mb-10 ${canSearch ? 'bg-primary' : 'bg-primary/50'}`}
                    disabled={!canSearch}
                    onPress={() => router.push('/booking/bus-list')}
                >
                    <Text className="text-white font-bold text-lg">Search Buses</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}