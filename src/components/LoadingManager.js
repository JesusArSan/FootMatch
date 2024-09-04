// React Imports
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
// My Imports
import UserLocation from "../utils/UserLocation";
import config from "../../config";

// LOADING MANAGER COMPONENT
const LoadingManager = ({ onLoadingComplete }) => {
	// Load multiple fonts
	const [fontsLoaded] = useFonts({
		"InriaSans-Regular": require("../assets/fonts/InriaSans/InriaSans-Regular.ttf"),
		"InriaSans-Bold": require("../assets/fonts/InriaSans/InriaSans-Bold.ttf"),
		"Inter-Bold": require("../assets/fonts/Inter/Inter-Bold.ttf"),
		"Inter-Regular": require("../assets/fonts/Inter/Inter-Regular.ttf"),
	});

	const [showLoadingScreen, setShowLoadingScreen] = useState(true);
	let [userData, setUserData] = useState(null);
	const [isTokenValid, setIsTokenValid] = useState(false);
	const [location, setUserLocation] = useState(null);

	// Timer 3.0s
	useEffect(() => {
		// 3.0 second timer
		const timer = setTimeout(() => {
			setShowLoadingScreen(false);
		}, 3000);

		// Clear timeout
		return () => clearTimeout(timer);
	}, []);

	// Check User Token
	useEffect(() => {
		const checkUserToken = async () => {
			const token = await AsyncStorage.getItem("@userToken");
			if (token) {
				try {
					// Make a request to the server to validate the token
					const response = await fetch(`${config.serverUrl}/users/token`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ token }),
					});

					// If the token is valid, navigate to the Home screen
					if (response.status === 200) {
						const data = JSON.parse(
							await AsyncStorage.getItem("@userData")
						);
						if (data) {
							setUserData(data);
							setIsTokenValid(true);
						} else {
							setIsTokenValid(false);
						}
					} else {
						setIsTokenValid(false);
					}
				} catch (error) {
					console.error("Error validating token", error);
				}
			}
		};

		checkUserToken();
	}, []);

	// Load userLocation from asyncStorage if it exists or get it from the device
	useEffect(() => {
		const loadUserLocation = async () => {
			if (userData !== null) {
				try {
					const storedLocation = await AsyncStorage.getItem(
						"@userLocation"
					);
					let location;

					if (storedLocation !== null) {
						location = JSON.parse(storedLocation);
					} else {
						console.log("Getting user location from device....");
						location = await UserLocation();
						const { latitude, longitude } = location;
						location = { latitude, longitude };

						await AsyncStorage.setItem(
							"@userLocation",
							JSON.stringify(location)
						);
					}

					setUserLocation(location);
				} catch (error) {
					console.error("Error loading user location", error);
				}
			}
		};

		loadUserLocation();
	}, [userData]);

	// Loading Complete
	useEffect(() => {
		if (
			!showLoadingScreen &&
			fontsLoaded &&
			(userData || !isTokenValid)
		) {
			// Pass location with UserData
			if (location !== null) userData = { ...userData, location };

			onLoadingComplete(isTokenValid, userData);
		}
	}, [showLoadingScreen, fontsLoaded, userData, isTokenValid, location]);

	// Load Screen
	return (
		<View style={styles.loadingContainer}>
			{/* <StatusBar translucent backgroundColor={"transparent"} />
			<Image
				source={require("../assets/images/icons/logo.png")}
				style={styles.logo}
			/>
			<Text style={styles.loadingText}>Cargando...</Text> */}
			<LottieView
				source={require("../assets/animations/loading.json")}
				style={{
					width: 550,
					height: 550,
					marginTop: 50,
				}}
				autoPlay
				loop
			/>
			<LottieView
				source={require("../assets/animations/loadingAuthor.json")}
				style={[
					styles.lottieView,
					{
						width: 400,
						height: 300,
						marginTop: -80,
						marginLeft: 5,
					},
				]}
				autoPlay
				loop={false}
			/>
			<View style={[styles.waterMark, { top: 480, right: -75 }]} />
			<View style={[styles.waterMark, { bottom: 5, right: 0 }]} />
		</View>
	);
};

export default LoadingManager;

const styles = StyleSheet.create({
	loadingContainer: {
		backgroundColor: "#ecfaff",
		alignItems: "center",
		height: "100%",
	},
	logo: {
		width: 100,
		height: 160,
		marginBottom: 20,
	},
	loadingText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "white",
	},
	lottieView: {},
	waterMark: {
		width: 150,
		height: 80,
		position: "absolute",
		backgroundColor: "#ecfaff",
		borderTopLeftRadius: 20,
	},
});
