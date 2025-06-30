import logo from '@/assets/images/dinetimelogo.png'
import banner from '@/assets/images/homeBanner.png'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { collection, getDocs, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../../lib/firebase'

export default function Home() {

  const router = useRouter()
  const [restaurants, setRestaurants] = useState([])

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setRestaurants((prev) => [...prev, doc.data()])
    })
  }

  useEffect(() => {
    getRestaurants();
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant/${item.name}`)}
      className="bg-[#5f5f5f] max-h-64 max-w-xs justify-center rounded-lg p-4 ml-4 shadow-md"
      style={{ margin: 10 }}
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base mb-2">
        Open: {item.opening} - Close: {item.closing}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="bg-[#2b2b2b] py-5">
      <View className="items-center justify-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg p-2">
          <View className="flex-row items-center">
            <Text className="text-white text-base uppercase leading-[48px]">Welcome to</Text>
            <Image className="w-20 h-12" source={logo} />
          </View>
        </View>
      </View>
      <ScrollView
        className="h-full"
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          resizeMode='cover'
          className="w-full h-52 justify-center items-center bg-[#2b2b2b]"
          source={banner}
        >
          <BlurView
            intensity={80}
            className="w-full p-4 shadow-lg"
          >
            <Text className="text-center text-3xl text-white font-bold">Dine with your loved ones</Text>
          </BlurView>
        </ImageBackground>
        <Text className="text-3xl text-white p-4 font-semibold">
          Special Discount %
        </Text>
        {restaurants.length > 0 ? (
          <FlatList
            horizontal
            data={restaurants}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
            keyExtractor={(item, i) => i}
          />
        ) : (
          <ActivityIndicator color="orange" />
        )}
        <Text className="text-3xl text-[#f49b33] p-4 font-semibold">
          Our Restaurants
        </Text>
        {restaurants.length > 0 ? (
          <FlatList
            horizontal
            data={restaurants}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <ActivityIndicator color="orange" />
        )}
      </ScrollView>
      <StatusBar barStyle={"light-content"} />
    </SafeAreaView>
  )
}