// React Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
// Screen Imports
import InitialScreen from "./screens/auth/InitialScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import MainNavigatorScreen from "./screens/home/MainNavigatorScreen";
// My imports
import LoadingManager from "./components/LoadingManager";
import HeaderTabTitle from "./components/HeaderTabTitle";

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

	return (
		<NavigationContainer>
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// Name file: App.js
