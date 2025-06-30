import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Alert, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Authentication from "../../Component/Authentication";
import { auth, db } from "../../lib/firebase";

function Signin() {

    const handleSignin = async (values) => {
        const router = useRouter();

        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const user = userCredentials.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                await AsyncStorage.setItem("userEmail", values.email);
                await AsyncStorage.setItem("isGuest", "false");
                router.replace("/home");
            }
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                Alert.alert(
                    "Signin Failed!",
                    "Incorrect credentials. Please try again."
                );
            } else {
                Alert.alert(
                    "Sign in Error",
                    "An unexpected error occurred. Please try again later."
                );
            }
        }
    };


    return (
        <SafeAreaView className="bg-[#2b2b2b]">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <Authentication
                    btntitle="Signin"
                    routerPush="/signup"
                    navigateLink="Sign up"
                    navigateTitle="Don't have an account? "
                    handleAuth={handleSignin}
                />
                <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
            </ScrollView>
        </SafeAreaView >
    );
}

export default Signin