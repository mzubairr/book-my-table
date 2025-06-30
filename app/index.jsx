import logo from "@/assets/images/dinetimelogo.png";
import entryImg from "@/assets/images/Frame.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../lib/firebase";

export default function Index() {
    const router = useRouter();
    const pathname = usePathname();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && pathname !== '/home') {
                router.replace("/home");
            } else if (!user && pathname !== '/') {
                router.replace("/");
            }
            setCheckingAuth(false);
        });
    }, []);

    if (checkingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2b2b2b" }}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }

    const handleGuest = async () => {
        const isUser = await AsyncStorage.getItem("userEmail");
        if (isUser) {
            router.push("/home");
        } else {
            router.push("/home");
            await AsyncStorage.setItem("isGuest", "true");
        }
    }



    return (
        <SafeAreaView className="bg-[#2b2b2b]">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="items-center">
                    <Image
                        style={{ width: 300, height: 300 }}
                        source={logo}
                    />
                    <View className="w-3/4">
                        <TouchableOpacity
                            onPress={() => router.push("/signup")}
                            className="p-2 my-2 bg-[#f49b33] rounded-lg"
                        >
                            <Text className="text-lg font-semibold text-center">
                                Singup
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleGuest()}
                            className="p-2 my-2 border border-[#f49b33] rounded-lg"
                        >
                            <Text className="text-lg text-[#f49b33] font-semibold text-center">
                                Guest User
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="items-center">
                        <View className="flex-row items-center mb-2">
                            <View className="border-b-2 border-[#f49b33] p-2 w-24" />
                            <Text className="text-white text-xl"> or </Text>
                            <View className="border-b-2 border-[#f49b33] p-2 w-24" />
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push("/signin")}
                            className="flex-row"
                        >
                            <Text className="text-white font-bold">Already a User? </Text>
                            <Text className="text-[#f49b33] underline font-bold">Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-1">
                    <Image
                        source={entryImg}
                        className="h-full w-full"
                        resizeMode="contain"
                    />
                </View>
                <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
            </ScrollView>
        </SafeAreaView >
    );
}