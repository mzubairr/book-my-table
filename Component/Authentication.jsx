import logo from "@/assets/images/dinetimelogo.png";
import entryImg from "@/assets/images/Frame.png";
import validationSchema from "@/utils/authSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useRef } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

function Authentication(props) {
    const router = useRouter();
    const emailRef = useRef()
    const passwordRef = useRef()

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
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="items-center">
                <View className="items-center mt-10 mb-5">
                    <Image
                        style={{ width: 200, height: 100 }}
                        source={logo}
                    />
                    <Text className="text-white text-lg mb-10">Lets get you started</Text>
                </View>

                <View className="w-5/6">
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={props.handleAuth}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <View className="w-full">
                                <Text className="text-[#f49b33] my-2">Email</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                    onBlur={handleBlur("email")}
                                    keyboardType="email-address"
                                    ref={emailRef}
                                    onSubmitEditing={() => passwordRef.current.focus()}
                                    className="border text-white border-white rounded-lg"
                                />
                                {touched.email && errors.email && <Text className="text-red-500 text-base">{errors.email}</Text>}
                                <Text className="text-[#f49b33] my-2">Password</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    onBlur={handleBlur("password")}
                                    secureTextEntry={true}
                                    ref={passwordRef}
                                    className="border text-white border-white rounded-lg"
                                />
                                {touched.password && errors.password && <Text className="text-red-500 text-base">{errors.password}</Text>}
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    className="p-2 mt-10 bg-[#f49b33] rounded-lg"
                                >
                                    <Text className="text-lg font-semibold text-center">
                                        {props.btntitle}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                    <View className="justify-center items-center">
                        <TouchableOpacity
                            onPress={() => router.push(props.routerPush)}
                            className="flex-row items-center justify-center mt-5 p-2"
                        >
                            <Text className="text-white font-bold">{props.navigateTitle}</Text>
                            <Text className="text-[#f49b33] underline font-bold"> {props.navigateLink} </Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center">
                            <View className="border-b-2 border-[#f49b33]  w-24" />
                            <Text className="text-white text-xl"> or </Text>
                            <View className="border-b-2 border-[#f49b33]  w-24" />
                        </View>
                        <TouchableOpacity
                            onPress={() => handleGuest()}
                            className="flex-row mb-5 p-2"
                        >
                            <Text className="text-white font-bold">Be a </Text>
                            <Text className="text-[#f49b33] underline font-bold">Gust User</Text>
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
        </ScrollView>
    );
}

export default Authentication;