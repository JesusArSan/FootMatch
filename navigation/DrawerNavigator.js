// React Imports
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
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
// My icons
import AppIcon from "../components/icons/AppIcon";

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props) => (
// 	<DrawerContentScrollView {...props}>
// 		<View style={styles.imageContainer}>
// 			<AppIcon />
// 		</View>
// 		<DrawerItemList {...props} />
// 	</DrawerContentScrollView>
// );

const DrawerNavigator = ({ userData }) => {
	return (
		<Drawer.Navigator
			// drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: false,
				drawerLabelStyle: styles.drawerLabelStyle,
				drawerStyle: styles.drawerContainer,
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

const styles = StyleSheet.create({
	drawerContainer: {
		backgroundColor: "#1E417F",
		padding: 20,
	},
	drawerLabelStyle: {
		fontSize: 15,
		fontFamily: "InriaSans-Bold",
		color: "#ffffff",
	},
});

// Name file: DrawerNavigator.js
