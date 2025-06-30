import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from 'expo-router';
import { Colors } from '../../Constant/Color';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInActiveTintColor: Colors.dark.text,
                tabBarStyle: {
                    backgroundColor: Colors.SECONDARY,
                },
                tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: (({ color }) => (
                        <Ionicons name="time" size={24} color={color} />

                    ))
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: (({ color }) => (
                        <FontAwesome name="user" size={24} color={color} />
                    ))
                }}
            />
        </Tabs>
    )
}