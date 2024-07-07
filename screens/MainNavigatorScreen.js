// React Imports
import React from "react";
// My Imports
import DrawerNavigator from "../navigation/DrawerNavigator.js";

// HOME SCREEN
const MainNavigatorScreen = ({ route }) => {
	// Get the user data from the route params
	const userData = route.params.user || {};

	return <DrawerNavigator userData={userData} />;
};

export default MainNavigatorScreen;

// Name file: MainNavigatorScreen.js
