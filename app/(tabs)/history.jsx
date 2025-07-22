import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../lib/firebase";

const History = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [expandData, SetexpandData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    getEmail();
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    const q = query(collection(db, "bookings"), where("email", "==", userEmail));
    const unsubscribe = onSnapshot(
      q, (querySnapshot) => {
        const bookingList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);

      },
      (error) => {
        console.error("Error in listener: ", error);
      }
    );

    return unsubscribe;
  }, [userEmail]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#2b2b2b]">
        <ActivityIndicator color="orange" />
      </SafeAreaView>
    );
  }

  const toggleDetails = (item) => {
    setDetails(!details);
    SetexpandData(item.id)
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b] p-5">
      <Text className="text-white text-2xl font-extrabold uppercase">Bookings</Text>
      {userEmail && <Text className="text-white text-lg font-thin">Here's your booking history</Text>}
      {userEmail ? (
        bookings.length === 0 ?
          <View className="flex-1 justify-center items-center mt-10">
            <Ionicons name="calendar-outline" size={60} color="#fb9b33" />
            <Text className="text-white text-lg mt-4 font-semibold">
              No bookings found
            </Text>
          </View>
          : < FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="py-4 px-3 border-b-8 border-[#fb9b33] bg-[#F7F7F7] rounded-xl my-3">
                <View className="flex-row items-center mb-2">
                  <View className="h-5 w-5 items-center">
                    <FontAwesome5 name="calendar-alt" size={16} className="h-[100%]" color="black" />
                  </View>
                  <Text className="ml-2 h-5 min-w-5 text-black">{item?.date?.slice(0, 10)}</Text>
                </View>

                <View className="flex-row items-center mb-2">
                  <View className="h-5 w-5 items-center">
                    <Ionicons name="time-outline" size={16} color="black" />
                  </View>
                  <Text className="ml-2 h-5 min-w-5 text-black">{item?.slot}</Text>
                </View>

                <View className="flex-row items-center mb-2">
                  <View className="h-5 w-5 items-center">
                    <FontAwesome5 name="users" size={16} color="black" />
                  </View>
                  <Text className="ml-2 h-5 min-w-5 text-black">{item?.guests}</Text>
                </View>

                {details && expandData === item.id ? null
                  : <TouchableOpacity onPress={() => toggleDetails(item)}>
                    <Text className="text-[#fb9b33] font-bold">Seemore</Text>
                  </TouchableOpacity>
                }
                {details && expandData === item.id &&
                  <>
                    <View className="flex-row items-center mb-2">
                      <View className="h-5 w-5 items-center">
                        <Ionicons name="restaurant-outline" size={16} color="black" />
                      </View>
                      <Text className="ml-2 h-5 min-w-5 text-black">{item?.restaurant}</Text>
                    </View>

                    <View className="flex-row items-center mb-2">
                      <View className="h-5 w-5 items-center">
                        <Ionicons name="mail-outline" size={16} color="black" />
                      </View>
                      <Text className="ml-2 h-5 min-w-5 text-black leading-none">{item?.email}</Text>
                    </View>
                  </>
                }
                {details && expandData === item.id ?
                  <TouchableOpacity onPress={() => setDetails(!details)}>
                    <Text className="text-[#fb9b33] font-bold">Seeless</Text>
                  </TouchableOpacity>
                  : null
                }
              </View>
            )}
          />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg w-[50%] text-center mb-4">
            Please sign in to view your booking history
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/signin")}
            className="p-2 px-10 my-2 bg-[#f49b33] text-black rounded-lg mt-10"
          >
            <Text className="text-xl font-semibold text-center">Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default History;
