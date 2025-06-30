import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Authentication from "../../Component/Authentication";
import { auth, db } from "../../lib/firebase";

function Signup() {
    const router = useRouter();

    const handleSignup = async (values) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            )

            const user = userCredentials.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                cretedAt: new Date()
            })

            await AsyncStorage.setItem("userEmail", values.email);
            await AsyncStorage.setItem("isGuest", "false");
            Alert.alert("Signup Successful", "You are in");
            router.replace("/home");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                Alert.alert("Signup Failed", "This email address is already in use. Please use a different email.");
            } else {
                Alert.alert("Signup Error", "An unexpected error occurred Please try again later.")
            }
        }
    };

    return (
        <SafeAreaView className="bg-[#2b2b2b]">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <Authentication
                    btntitle="Signup"
                    routerPush="/signin"
                    navigateLink="Sign in"
                    navigateTitle="Already a User?  "
                    handleAuth={handleSignup}
                />
                <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
            </ScrollView>
        </SafeAreaView >
    );
}

export default Signup;