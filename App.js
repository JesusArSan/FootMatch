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
import CenterDetailsScreen from "./src/screens/General/CenterDetailsScreen";
import PitchTimeScreen from "./src/screens/General/PitchTimeScreen";
import FindMatchScreen from "./src/screens/General/FindMatchScreen";
import CreateCompetitionScreen from "./src/screens/General/CreateCompetitionScreen";
import CompetitionScreen from "./src/screens/General/CompetitionScreen";
import TeamsScreen from "./src/screens/General/TeamsScreen";
import UserProfileScreen from "./src/screens/Home/UserProfileScreen";
import MatchTabNavigator from "./src/navigation/MatchTabNavigator";
// Navigation
import ChatStackNavigator from "./src/navigation/ChatStackNavigator";
import BookingStackNavigator from "./src/navigation/BookingStackNavigator";
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
	}

	// If the token is valid and the user is not null, the initial route is MainNavigatorScreen
	const initialRouteName =
		userData && isTokenValid ? "MainNavigatorScreen" : "InitialScreen";

	console.log("userData en app.js: ", userData);

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
					name="BookingStackNavigator"
					component={BookingStackNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="FindMatchScreen"
					component={FindMatchScreen}
					initialParams={{ user: userData }}
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
					name="CreateCompetitionScreen"
					component={CreateCompetitionScreen}
					initialParams={{ user: userData }}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Competitions"} />
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="CompetitionScreen"
					component={CompetitionScreen}
					initialParams={{ user: userData }}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Competition"} />
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
					initialParams={{ user: userData }}
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
				<Stack.Screen
					name="OtherUserProfile"
					component={UserProfileScreen}
					options={({ route }) => ({
						headerTitle: (props) => (
							<HeaderTitleScreen
								{...props}
								text={route.params.otherUser.username}
							/>
						),
						headerStyle: {
							backgroundColor: "#3562A6",
						},
						headerTintColor: "white",
					})}
				/>
				<Stack.Screen
					name="ChatStackNavigator"
					component={ChatStackNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="MatchTabNavigator"
					component={MatchTabNavigator}
					initialParams={{ user: userData }}
					options={{
						headerTitle: (props) => (
							<HeaderTitleScreen {...props} text={"Match"} />
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
