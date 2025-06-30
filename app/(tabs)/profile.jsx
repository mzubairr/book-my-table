import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { auth } from "../../lib/firebase";

export default function Profile() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);

      Toast.show({
        type: 'success',
        text1: 'Logged out',
        text2: 'You have been logged out successfully',
        visibilityTime: 2000,
        text1Style: {
          fontSize: 17,
        },
        text2Style: {
          fontSize: 14,
        }
      });
      router.push("/signin");
    } catch (error) {
      Alert.alert("Logged Error", "Error while logging out");
    }
  };

  const handleSignin = () => {
    router.push("/signin");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b] p-5">
      <Text className="text-3xl text-[#f49b33] text-center font-semibold my-4 mb-5">
        Profile
      </Text>
      <View className="items-center mb-6">
        <Image
          source={{
            uri: "https://ws.engr.illinois.edu/directory/viewphoto/cmaylmer/250"
          }}
          style={{ height: 100, width: 100, borderRadius: 100 }}
        />
      </View>
      {userEmail ? (
        <View className="flex-1 justify-between items-center">
          <Text className="text-white text-xl text-center my-6 bg-[#3b3b3b] p-4 rounded-full w-full">
            <Text className="text-2xl font-extrabold">Welcome</Text>{" "}
            {userEmail ? `${userEmail.split("@")[0]}` : ""}
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center w-32 p-3 bg-[#f49b33] rounded-lg mx-6 mt-6"
          >
            <Ionicons name="log-out-outline" size={25} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-xl text-center mb-3">
            You're currently using the app as a guest.
          </Text>
          <TouchableOpacity
            onPress={handleSignin}
            className="p-2 w-2/5 my-2 bg-[#f49b33] text-black rounded-lg mt-10"
          >
            <Text className="text-lg font-semibold text-center">Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}