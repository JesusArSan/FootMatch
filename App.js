// React Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
// Screen Imports
import InitialScreen from "./screens/InitialScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import MainNavigatorScreen from "./screens/MainNavigatorScreen";
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

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="InitialScreen"
					component={InitialScreen}
					initialParams={{ user: userData, tokenValid: isTokenValid }}
				/>
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen
					name="MainNavigatorScreen"
					component={MainNavigatorScreen}
					options={{
						headerTitle: () => <HeaderTabTitle />,
						headerStyle: {
							backgroundColor: "#3562A6",
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// Name file: App.js
