// React Imports
import React from "react";
import { Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screen Imports
import MainHomeScreen from "../screens/Home/MainHomeScreen";
import UserProfileScreen from "../screens/Home/UserProfileScreen";
import NotificationsScreen from "../screens/Home/NotificationsScreen";
import CommunityScreen from "../screens/Home/CommunityScreen";
// My Componentes
import TabBarIconType from "../components/TabBarIconType";
import HeaderCustom from "../components/headers/HeaderCustom";

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ route }) => {
	// Get the user data from the params
	const userData = route.params.user || {};

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				// Header personalized
				headerShown: true,
				headerStyle: {
					backgroundColor: "#3562A6",
				},
				headerTitle: (props) => <HeaderCustom {...props} />,
				// Background color of the tab and height
				tabBarStyle: {
					backgroundColor: "#3562A6",
					height: "7.5%",
				},
				// Padding of the item tab
				tabBarItemStyle: { paddingVertical: 6, flexDirection: "column" },
				// Font weight of the item tab's text
				tabBarLabelStyle: {
					fontFamily: "InriaSans-Bold",
				},
				// Color of the icon's text of the active tab
				tabBarActiveTintColor: "white",
				// Color of the icon's text of the inactive tab
				tabBarInactiveTintColor: "#D6D6D6",
				// Each tab has a different icon
				tabBarIcon: ({ color }) => (
					<TabBarIconType name={route.name} color={color} />
				),
				// Hide the tab bar when the keyboard is open
				//tabBarHideOnKeyboard: true,
			})}
		>
			<Tab.Screen
				name="Home"
				component={MainHomeScreen}
				initialParams={{ user: userData }}
			/>
			<Tab.Screen
				name="Community"
				component={CommunityScreen}
				initialParams={{ user: userData }}
			/>
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				initialParams={{ user: userData }}
				listeners={({ navigation }) => ({
					tabPress: (e) => {
						// Cancel the tab press
						e.preventDefault();
						// Show an alert
						Alert.alert(
							"In development",
							"This feature is currently in development."
						);
					},
				})}
			/>
			<Tab.Screen
				name="Profile"
				component={UserProfileScreen}
				initialParams={{ userLogged: userData }}
			/>
		</Tab.Navigator>
	);
};

export default MainTabNavigator;
