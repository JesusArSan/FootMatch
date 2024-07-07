// React Imports
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screen Imports
import MainHomeScreen from "../screens/MainHomeScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CommunityScreen from "../screens/CommunityScreen";
// My Componentes
import TabBarIconType from "../components/TabBarIconType";

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ user }) => {
	// Get the user data from the params
	const userData = user || {};

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				// Hide the header
				headerShown: false,
				// Background color of the tab and height
				tabBarStyle: {
					backgroundColor: "#3562A6",
					height: 65,
				},
				// Padding of the item tab
				tabBarItemStyle: { paddingVertical: 6 },
				// Font weight of the item tab's text
				tabBarLabelStyle: { fontWeight: "bold" },
				// Color of the icon's text of the active tab
				tabBarActiveTintColor: "white",
				// Color of the icon's text of the inactive tab
				tabBarInactiveTintColor: "#D6D6D6",
				// Each tab has a different icon
				tabBarIcon: ({ color }) => (
					<TabBarIconType name={route.name} color={color} />
				),
			})}
		>
			<Tab.Screen
				name="Home"
				component={MainHomeScreen}
				initialParams={{ user: userData }}
			/>
			<Tab.Screen name="Community" component={CommunityScreen} />
			<Tab.Screen name="Notifications" component={NotificationsScreen} />
			<Tab.Screen name="Profile" component={UserProfileScreen} />
		</Tab.Navigator>
	);
};

export default MainTabNavigator;
