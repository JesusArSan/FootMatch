// React Imports
import React from "react";
// My Imports
import MainTabNavigator from "../navigation/MainTabNavigator.js";

// HOME SCREEN
const MainNavigatorScreen = ({ route }) => {
	// Get the user data from the route params
	const userData = route.params || {};

	return <MainTabNavigator user={userData} />;
};

export default MainNavigatorScreen;

// Name file: MainNavigatorScreen.js
