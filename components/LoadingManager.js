// React Imports
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
// My Imports
import config from "../config";

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
	const [userData, setUserData] = useState(null);
	const [isTokenValid, setIsTokenValid] = useState(false);

	// Timer 1.5s
	useEffect(() => {
		// 2 second timer
		const timer = setTimeout(() => {
			setShowLoadingScreen(false);
		}, 2000);

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

	// Loading Complete
	useEffect(() => {
		if (!showLoadingScreen && fontsLoaded && (userData || !isTokenValid)) {
			onLoadingComplete(isTokenValid, userData); // Pass additional parameters
		}
	}, [showLoadingScreen, fontsLoaded, userData, isTokenValid]);

	// Load Screen
	if (showLoadingScreen || !fontsLoaded || (!userData && isTokenValid)) {
		return (
			<View style={styles.loadingContainer}>
				<Image
					source={require("../assets/images/logo.png")}
					style={styles.logo}
				/>
				<Text style={styles.loadingText}>Cargando...</Text>
			</View>
		);
	} else {
		return null;
	}
};

export default LoadingManager;

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		backgroundColor: "grey", // Grey
		alignItems: "center",
		justifyContent: "center",
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
});
