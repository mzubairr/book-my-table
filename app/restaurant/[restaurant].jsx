import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Linking, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from '../../Component/restaurant/DatePickerComponent';
import FindSlots from '../../Component/restaurant/FindSlots';
import GuestPickerComponent from '../../Component/restaurant/GuestPickerComponent';
import { db } from '../../lib/firebase';

export default function Restaurant() {
    const { restaurant } = useLocalSearchParams();
    const flatListRef = useRef(null);
    const windowWidth = Dimensions.get("window").width;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [restaurantData, setRestaurantData] = useState({});
    const [carouselData, setCarouselData] = useState({});
    const [slotData, setSlotData] = useState({});
    const [date, setDate] = useState(new Date())
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState(2);
    const getRestaurantData = async () => {
        try {
            const restaurantQuery = query(
                collection(db, "restaurants"),
                where("name", "==", restaurant));

            const restaurantSnapshot = await getDocs(restaurantQuery);

            if (restaurantSnapshot.empty) {
                return;
            }

            for (const doc of restaurantSnapshot.docs) {
                const restaurantData = doc.data();
                setRestaurantData(restaurantData);

                const carouselQuery = query(
                    collection(db, "carouselImages"),
                    where("res_id", "==", doc.ref))

                const carouselSnapshot = await getDocs(carouselQuery);
                const carouselImg = [];
                if (carouselSnapshot.empty) {
                    return;
                }
                carouselSnapshot.forEach((carouselDoc) => {
                    carouselImg.push(carouselDoc.data());
                })
                setCarouselData(carouselImg);

                const slotsQuery = query(
                    collection(db, "slots"),
                    where("ref_id", "==", doc.ref))

                const slotsSnapshot = await getDocs(slotsQuery);
                const slots = [];
                if (slotsSnapshot.empty) {
                    return;
                }
                slotsSnapshot.forEach((slotDoc) => {
                    slots.push(slotDoc.data());
                })
                setSlotData(slots[0]?.slot);
            }
        } catch (error) {
            return
        }
    }

    const handleNextImage = () => {
        const carouselLength = carouselData[0]?.images.length;
        if (currentIndex < carouselLength - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }

        if (currentIndex === carouselLength - 1) {
            const nextIndex = 0
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
    }

    const handlePrevImage = () => {
        const carouselLength = carouselData[0]?.images.length;
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
        }

        if (currentIndex === 0) {
            const prevIndex = carouselLength - 1;
            setCurrentIndex(prevIndex);
            flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
        }
    }

    const carouselItem = ({ item }) => {
        return (
            <View style={{ width: windowWidth - 2 }} className="h-full relative">
                <View
                    style={{
                        position: "absolute",
                        top: "50%",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: 50,
                        padding: 5,
                        zIndex: 10,
                        right: "11%",
                    }}
                >
                    <Ionicons
                        onPress={handleNextImage}
                        name="arrow-forward"
                        size={24}
                        color="white"
                    />
                </View>
                <View
                    style={{
                        position: "absolute",
                        top: "50%",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: 50,
                        padding: 5,
                        zIndex: 10,
                        left: "2%",
                    }}
                >
                    <Ionicons
                        onPress={handlePrevImage}
                        name="arrow-back"
                        size={24}
                        color="white"
                    />
                </View>
                <View
                    style={{
                        position: "absolute",
                        alignItems: "center",
                        flexDirection: "row",
                        left: "50%",
                        transform: [{ translateX: -50 }],
                        zIndex: 10,
                        bottom: 15,
                    }}
                >
                    {carouselData[0]?.images.map((_, i) => {
                        return (
                            <View
                                key={i}
                                className={`bg-white h-2 w-2 ${i == currentIndex && "h-3 w-3"
                                    } p-1 mx-1 rounded-full`}
                            />)
                    })}
                </View>
                <Image
                    source={{ uri: item }}
                    style={{
                        opacity: 0.5,
                        backgroundColor: "black",
                        // marginRight: 20,
                        // marginLeft: 5,
                        borderRadius: 25,
                    }}
                    className="h-full"
                />
            </View>
        )
    }

    const handleLocation = async () => {
        const url = "https://maps.app.goo.gl/K2gKULh8aCiq3pLt7?g_st=ac";
        const suppported = await Linking.canOpenURL(url);
        if (suppported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Error", "Unable to open the map. Please try again later.");
        }
    }

    useEffect(() => {
        getRestaurantData()
    }, [])

    return (
        <SafeAreaView
            style={{ backgroundColor: '#2b2b2b' }}
        >
            <ScrollView className="h-full">
                <View className="flex-1 p-2 my-2">
                    <Text className="text-[#f49b33] text-xl mb-1">{restaurant}</Text>
                    <View className="border-[#f49b33]" style={{ borderBottomWidth: 1 }} />
                </View>
                <View className="h-64 max-w-[100%] mx-2 rounded-[25px]">
                    <FlatList
                        ref={flatListRef}
                        data={carouselData[0]?.images}
                        renderItem={carouselItem}
                        horizontal
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        style={{ borderRadius: 25 }}
                    />
                </View>
                <View className="flex-1 flex-row mt-2 p-1">
                    <Ionicons name="location-sharp" size={24} color="#f49b33" />
                    <Text className="max-w-[75%] text-white">
                        {restaurantData?.address} |{"  "}
                        <Text
                            onPress={handleLocation}
                            className="underline text-[#f49b33] italic font-semibold"
                        >
                            Get Direction
                        </Text>
                    </Text>
                </View>
                <View className="flex-1 flex-row p-[6px]">
                    <Ionicons name="time" size={20} color="#f49b33" className="ml-[1px] mr-[2px]" />
                    <Text className="max-w-[75%] font-semibold text-white">
                        {restaurantData?.opening} - {restaurantData?.closing}
                    </Text>
                </View>
                <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg">
                    <View className="flex-1 flex-row m-2 p-2 justify-end items-center">
                        <View className="flex-1 flex-row">
                            <Ionicons name="calendar" size={20} color="#f49b33" />
                            <Text className="text-white mx-2 text-base">
                                Select booking date
                            </Text>
                        </View>
                        <DatePickerComponent date={date} setDate={setDate} />
                    </View>
                    <View className="flex-1 flex-row bg-[#474747] rounded-lg  m-2 p-2 justify-end items-center">
                        <View className="flex-1 flex-row">
                            <Ionicons name="people" size={20} color="#f49b33" />
                            <Text className="text-white mx-2 text-base">
                                Select number of guests
                            </Text>
                        </View>
                        <GuestPickerComponent
                            selectedNumber={selectedNumber}
                            setSelectedNumber={setSelectedNumber}
                        />
                    </View>
                </View>
                <View className="flex-1">
                    <FindSlots
                        restaurant={restaurant}
                        date={date}
                        selectedNumber={selectedNumber}
                        slots={slotData}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}