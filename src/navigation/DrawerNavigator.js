// React Imports
import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// My Sreens
import MainTabNavigator from "./MainTabNavigator";
import MatchesListScreen from "../screens/General/MatchesListScreen";
import FriendsScreen from "../screens/General/FriendsScreen";
import TeamsScreen from "../screens/General/TeamsScreen";
import StatisticsScreen from "../screens/General/StatisticsScreen";
import SettingsScreen from "../screens/General/SettingsScreen";
import AboutScreen from "../screens/General/AboutScreen";
import SupportScreen from "../screens/General/SupportScreen";
// My icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// My components
import CustomDrawerContent from "../components/CustomDrawerContent";

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ userData }) => {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: false,
				drawerLabelStyle: styles.drawerLabelStyle,
				drawerStyle: styles.drawerContainer,
				drawerActiveTintColor: "#ffffff",
				drawerInactiveTintColor: "#ffffff",
				drawerItemStyle: { paddingLeft: 8 },
				swipeEnabled: false, // Unable swipe
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
			<Drawer.Screen
				name="Matches"
				component={MatchesListScreen}
				initialParams={{ user: userData }}
				options={{
					drawerIcon: ({ color }) => (
						<MaterialIcons name="date-range" size={30} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Friends"
				component={FriendsScreen}
				initialParams={{ user: userData }}
				options={{
					drawerIcon: ({ color }) => (
						<FontAwesome5 name="user-friends" size={24} color={color} />
					),
				}}
			/>
			{/* <Drawer.Screen
				name="Teams"
				component={TeamsScreen}
				initialParams={{ user: userData }}
				options={{
					drawerIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="microsoft-teams"
							size={30}
							color={color}
						/>
					),
				}}
			/> */}
			<Drawer.Screen
				name="Statistics"
				component={StatisticsScreen}
				options={{
					drawerIcon: ({ color }) => (
						<Ionicons name="stats-chart" size={30} color={color} />
					),
				}}
			/>

			<Drawer.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					drawerIcon: ({ color }) => (
						<Ionicons name="settings-sharp" size={30} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="About"
				component={AboutScreen}
				options={{
					drawerIcon: ({ color }) => (
						<AntDesign name="exclamationcircle" size={30} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Support"
				component={SupportScreen}
				options={{
					drawerIcon: ({ color }) => (
						<FontAwesome name="support" size={30} color={color} />
					),
					listeners: {
						drawerItemPress: (e) => {
							e.preventDefault();
							Alert.alert(
								"In development",
								"This feature is currently in development."
							);
						},
					},
				}}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;

const styles = StyleSheet.create({
	drawerContainer: {
		backgroundColor: "#1E417F",
	},
	drawerLabelStyle: {
		fontSize: 15,
		fontFamily: "InriaSans-Bold",
		color: "#ffffff",
		marginLeft: -15,
	},
});

// Name file: DrawerNavigator.js
