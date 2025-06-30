import { restaurants } from '@/store/restaurants';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from './firebase';

const restaurantData = restaurants;

const uploadData = async () => {
    try {
        for (let i = 0; i < restaurantData.length; i++) {
            let restaurant = restaurantData[i];
            const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
            await setDoc(docRef, restaurant);
            // console.log("data upload");

        }
    } catch (error) {
        // console.error("Error uploading data:", error);
    }

}

export default uploadData;