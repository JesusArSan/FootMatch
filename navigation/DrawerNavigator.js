// React Imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// My Sreens
import MainTabNavigator from "./MainTabNavigator";
import ReservationsScreen from "../screens/general/ReservationsScreen";
import FriendsScreen from "../screens/general/FriendsScreen";
import TeamsScreen from "../screens/general/TeamsScreen";
import StatisticsScreen from "../screens/general/StatisticsScreen";
import GamePreferencesScreen from "../screens/general/GamePreferencesScreen";
import SettingsScreen from "../screens/general/SettingsScreen";
import AboutScreen from "../screens/general/AboutScreen";
import FAQScreen from "../screens/general/FAQScreen";
import PrivacyPolicyScreen from "../screens/general/PrivacyPolicyScreen";
import RateAppScreen from "../screens/general/RateAppScreen";
import SupportScreen from "../screens/general/SupportScreen";

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ userData }) => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerLabelStyle: {
					fontSize: 15,
					fontFamily: "InriaSans-Bold", // Font family
				},
			}}
		>
			<Drawer.Screen
				name="Tabs"
				component={MainTabNavigator}
				initialParams={{ user: userData }}
				options={{
					drawerItemStyle: { display: "none" },
				}}
			/>
			<Drawer.Screen name="My Reservations" component={ReservationsScreen} />
			<Drawer.Screen name="My Friends" component={FriendsScreen} />
			<Drawer.Screen name="My Teams" component={TeamsScreen} />
			<Drawer.Screen name="My Statistics" component={StatisticsScreen} />
			<Drawer.Screen
				name="Game Preferences"
				component={GamePreferencesScreen}
			/>
			<Drawer.Screen name="Settings" component={SettingsScreen} />
			<Drawer.Screen name="About" component={AboutScreen} />
			<Drawer.Screen name="FAQ" component={FAQScreen} />
			<Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
			<Drawer.Screen name="Rate The App" component={RateAppScreen} />
			<Drawer.Screen name="Support" component={SupportScreen} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;

// Name file: DrawerNavigator.js
