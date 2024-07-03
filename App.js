// React Imports
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
// Screen Imports
import InitialScreen from "./screens/InitialScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
	// Load multiple fonts
	const [fontsLoaded] = useFonts({
		"InriaSans-Regular": require("./assets/fonts/InriaSans/InriaSans-Regular.ttf"),
		"InriaSans-Bold": require("./assets/fonts/InriaSans/InriaSans-Bold.ttf"),
		"Inter-Bold": require("./assets/fonts/Inter/Inter-Bold.ttf"),
		"Inter-Regular": require("./assets/fonts/Inter/Inter-Regular.ttf"),
	});

	const [showLoadingScreen, setShowLoadingScreen] = useState(true);

	useEffect(() => {
		// 1,5 second timer
		const timer = setTimeout(() => {
			setShowLoadingScreen(false);
		}, 1500);

		// Clear TimeOut
		return () => clearTimeout(timer);
	}, []);

	// If fonts are not loaded or showLoadingScreen is true, show loading screen
	if (!fontsLoaded || showLoadingScreen) {
		return (
			<View style={styles.loadingContainer}>
				<Image
					source={require("./assets/images/logo.png")}
					style={styles.logo}
				/>
				<Text style={styles.loadingText}>Cargando...</Text>
			</View>
		); // Fonts not available
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="InitialScreen" component={InitialScreen} />
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

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
