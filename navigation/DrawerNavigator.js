import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// My Sreens
import MainTabNavigator from "./MainTabNavigator";
import UserProfileScreen from "../screens/UserProfileScreen";

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ userData }) => {
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen
				name="Tabs"
				component={MainTabNavigator}
				initialParams={{ user: userData }}
				options={{
					drawerItemStyle: { display: "none" },
				}}
			/>
			<Drawer.Screen name="My Profile" component={UserProfileScreen} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;

// Name file: DrawerNavigator.js
