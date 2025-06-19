import logo from "@/assets/images/dinetimelogo.png";
import entryImg from "@/assets/images/Frame.png";
import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const router = useRouter();
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
                            onPress={() => router.push("/home")}
                            className="p-2 my-2 border border-[#f49b33] rounded-lg"
                        >
                            <Text className="text-lg text-[#f49b33] font-semibold text-center">
                                Guest User
                            </Text>
                        </TouchableOpacity>
                        <View className="items-center">
                            <Text className="text-white mb-2 text-xl">
                                <View className="border-b-2 border-[#f49b33] p-2 w-24" />
                                {""} or {""}
                                <View className="border-b-2 border-[#f49b33] p-2 w-24" />
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push("/signin")}
                                className="flex-row"
                            >
                                <Text className="text-white">Already a User? </Text>
                                <Text className="text-[#f49b33]"> Sign in </Text>
                            </TouchableOpacity>
                        </View>
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