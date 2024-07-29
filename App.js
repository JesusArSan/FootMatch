// React Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StatusBar } from "react-native";
// Screen Imports
import InitialScreen from "./src/screens/General/InitialScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import MainNavigatorScreen from "./src/screens/Home/MainNavigatorScreen";
import BookFieldScreen from "./src/screens/General/BookFieldScreen";
import FieldDetailsScreen from "./src/screens/General/FieldDetailsScreen";
import PitchTimeScreen from "./src/screens/General/PitchTimeScreen";
import FindMatchScreen from "./src/screens/General/FindMatchScreen";
import JoinCompetScreen from "./src/screens/General/JoinCompetScreen";
import TeamsScreen from "./src/screens/General/TeamsScreen";
// My imports
import LoadingManager from "./src/components/LoadingManager";
// My Components
import HeaderTitleScreen from "./src/components/headers/HeaderTitleScreen";

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [userData, setUserData] = useState(null);
	const [isTokenValid, setIsTokenValid] = useState(false);

	const handleLoadingComplete = (valid, data) => {
		setIsTokenValid(valid);
		setUserData(data);
		setLoadingComplete(true);
	};

	if (!loadingComplete) {
		return <LoadingManager onLoadingComplete={handleLoadingComplete} />;
	} else {
		console.log("userData: ", userData);
	}

	// If the token is valid and the user is not null, the initial route is MainNavigatorScreen
	const initialRouteName =
		userData && isTokenValid ? "MainNavigatorScreen" : "InitialScreen";

	return (
		<NavigationContainer>
			<StatusBar translucent backgroundColor={"transparent"} />
			<Stack.Navigator initialRouteName={initialRouteName}>
				<Stack.Screen
					name="InitialScreen"
					component={InitialScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen
					name="MainNavigatorScreen"
					component={MainNavigatorScreen}
					initialParams={{ user: userData }}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="BookFieldScreen"
					component={BookFieldScreen}
					initialParams={{ user: userData }}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Book a Field"} />
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="FieldDetailsScreen"
					component={FieldDetailsScreen}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Field Details"} />
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="PitchTimeScreen"
					component={PitchTimeScreen}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Book a Field"} />
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="FindMatchScreen"
					component={FindMatchScreen}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Find a Match"} />
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="JoinCompetScreen"
					component={JoinCompetScreen}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Join Competitions"} />
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="TeamsScreen"
					component={TeamsScreen}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Teams"} />
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// Name file: App.js
