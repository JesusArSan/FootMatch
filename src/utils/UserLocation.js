import * as Location from "expo-location";
import { Alert } from "react-native";

const userLocation = async () => {
	const { status } = await Location.requestForegroundPermissionsAsync();

	if (status !== "granted") {
		Alert.alert("Permission to access location was denied");
		return;
	}

	try {
		const { coords } = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.High,
			timeout: 5000,
		});

		if (coords) {
			return coords;
		}
	} catch (error) {
		console.error("Error getting location:", error);
		Alert.alert(
			"Error obtaining location",
			"Please try again or check your settings."
		);
	}
};

export default userLocation;

// Name file: UseLocation.js
